import base64
import hashlib
import io
import json
import os
import re
import secrets
import smtplib
import textwrap
import sqlite3
import uuid
import boto3
from datetime import datetime, timedelta
from email.message import EmailMessage
from pathlib import Path
from pypdf import PdfWriter, PdfReader
from typing import Optional, List
from urllib.parse import quote
from urllib.request import urlopen
from zoneinfo import ZoneInfo
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from botocore.exceptions import BotoCoreError, ClientError

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.pdfgen import canvas
from PIL import Image

DB_PATH = Path(os.getenv("DB_PATH", "fleet.db"))
PDF_DIR = Path(os.getenv("PDF_DIR", "generated_etickets"))
PIN_REGEX = re.compile(r"^\d{6}$")
LOGO_PATH = Path("big_town_logo.png")
FONT_PATH = os.getenv("FONT_PATH", "")
FONT_BOLD_PATH = os.getenv("FONT_BOLD_PATH", "")

if FONT_PATH and Path(FONT_PATH).exists():
    pdfmetrics.registerFont(TTFont("ArialUnicode", FONT_PATH))

if FONT_BOLD_PATH and Path(FONT_BOLD_PATH).exists():
    pdfmetrics.registerFont(TTFont("ArialUnicodeBold", FONT_BOLD_PATH))



SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
EMAIL_FROM = os.getenv("EMAIL_FROM", SMTP_USERNAME)

API_QR_BATCH = "https://btc-fleet-backend.onrender.com/qr/batch-weights"
API_QR_TERMS = "https://btc-fleet-backend.onrender.com/qr/terms"

FRONTEND_BASE_URL = "https://app.btcfleet.app"
ETICKET_FRONTEND_BASE_URL = os.getenv(
    "ETICKET_FRONTEND_BASE_URL",
    "https://app.btcfleet.app",
).rstrip("/")


R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID", "")
R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME", "")
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID", "")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY", "")
R2_ENDPOINT_URL = os.getenv(
    "R2_ENDPOINT_URL",
    f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
)
R2_PUBLIC_URL = os.getenv("R2_PUBLIC_URL", "").rstrip("/")

weather_cache = {}


def get_r2_client():
    if not all([R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL]):
        return None

    return boto3.client(
        "s3",
        endpoint_url=R2_ENDPOINT_URL,
        aws_access_key_id=R2_ACCESS_KEY_ID,
        aws_secret_access_key=R2_SECRET_ACCESS_KEY,
        region_name="auto",
    )


def upload_bytes_to_r2(data: bytes, key: str, content_type: str) -> str:
    client = get_r2_client()
    if not client:
        raise RuntimeError("R2 is not configured")

    client.put_object(
        Bucket=R2_BUCKET_NAME,
        Key=key,
        Body=data,
        ContentType=content_type,
    )

    return f"{R2_PUBLIC_URL}/{key}"

def upload_pdf_to_r2(pdf_path: Path, token: str, pdf_type: str = "final") -> str:
    key = f"etickets/{token}/pdfs/{pdf_type}_{pdf_path.name}"

    with open(pdf_path, "rb") as f:
        return upload_bytes_to_r2(
            f.read(),
            key,
            "application/pdf",
        )


def data_url_to_r2_url(data_url: Optional[str], folder: str, token: str) -> Optional[str]:
    if not data_url:
        return None

    if data_url.startswith("http://") or data_url.startswith("https://"):
        return data_url

    if "," not in data_url:
        return data_url

    header, encoded = data_url.split(",", 1)

    content_type = "image/png"
    ext = "png"

    if "image/jpeg" in header or "image/jpg" in header:
        content_type = "image/jpeg"
        ext = "jpg"
    elif "image/webp" in header:
        content_type = "image/webp"
        ext = "webp"

    image_bytes = base64.b64decode(encoded)
    key = f"etickets/{token}/{folder}/{uuid.uuid4()}.{ext}"

    return upload_bytes_to_r2(image_bytes, key, content_type)


def build_eticket_frontend_url(token: str) -> str:
    return f"{ETICKET_FRONTEND_BASE_URL}/eticket/{token}"


VISUAL_CROSSING_API_KEY = os.getenv("VISUAL_CROSSING_API_KEY", "")
VISUAL_CROSSING_UNIT_GROUP = "us"
APP_TIMEZONE = ZoneInfo("America/Chicago")

# KEEP YOUR EXISTING BIG_TOWN_LOGO_B64 STRING EXACTLY AS-IS HERE
BIG_TOWN_LOGO_B64 = """PASTE YOUR CURRENT LONG BASE64 STRING HERE EXACTLY AS IT ALREADY EXISTS"""

app = FastAPI(title="BTC Fleet API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://app.btcfleet.app",
        "https://btc-fleet-backend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ADMIN_TOKENS: dict[str, int] = {}


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_column(conn, table_name: str, column_name: str, column_sql: str):
    cur = conn.cursor()
    cols = cur.execute(f"PRAGMA table_info({table_name})").fetchall()
    names = {row[1] for row in cols}
    if column_name not in names:
        cur.execute(f"ALTER TABLE {table_name} ADD COLUMN {column_sql}")
        conn.commit()

def ensure_eticket_columns(conn):
    columns = [
        ("curb_line_signed_at", "curb_line_signed_at TEXT"),
        ("curb_line_signature_data_url", "curb_line_signature_data_url TEXT"),
        ("qc_water_added", "qc_water_added REAL DEFAULT 0"),
        ("customer_water_added", "customer_water_added REAL DEFAULT 0"),
        ("curb_line_status", "curb_line_status TEXT DEFAULT 'Not Needed'"),
        ("photo_data_url", "photo_data_url TEXT"),
        ("terms_qr_url", "terms_qr_url TEXT"),
        ("ticket_acceptance", "ticket_acceptance TEXT"),
        ("qc_signed_latitude", "qc_signed_latitude REAL"),
        ("qc_signed_longitude", "qc_signed_longitude REAL"),
        ("qc_weather_summary", "qc_weather_summary TEXT"),
        ("qc_weather_link", "qc_weather_link TEXT"),
        ("qc_weather_at", "qc_weather_at TEXT"),
    ]

    for column_name, column_sql in columns:
        ensure_column(conn, "etickets", column_name, column_sql)

def utc_now():
    return datetime.now(APP_TIMEZONE).isoformat()

def auto_archive_old_pending_etickets(conn):
    cutoff_dt = datetime.now(APP_TIMEZONE) - timedelta(hours=48)
    cutoff_iso = cutoff_dt.isoformat()
    now = utc_now()

    cur = conn.cursor()

    cur.execute(
        """
        UPDATE etickets
        SET archived_at = ?,
            archived_by = ?
        WHERE LOWER(COALESCE(status, 'pending')) <> 'signed'
          AND COALESCE(archived_at, '') = ''
          AND COALESCE(assigned_to_id, '') = ''
          AND COALESCE(load_time, '') <> ''
          AND load_time <= ?
        """,
        (
            now,
            "Auto Archive - 48 Hours",
            cutoff_iso,
        ),
    )

    conn.commit()


def parse_iso(ts: Optional[str]):
    if not ts:
        return None
    try:
        raw = str(ts).strip().replace("Z", "+00:00")
        dt = datetime.fromisoformat(raw)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=APP_TIMEZONE)
        return dt.astimezone(APP_TIMEZONE)
    except Exception:
        return None


def format_central_display(ts: Optional[str], fmt: str = "%m/%d/%Y %I:%M %p") -> str:
    dt = parse_iso(ts)
    if not dt:
        return "-"
    return dt.astimezone(APP_TIMEZONE).strftime(fmt)


def central_date_parts(ts: Optional[str]):
    dt = parse_iso(ts)
    if not dt:
        return None, None
    local_dt = dt.astimezone(APP_TIMEZONE)
    return local_dt.date().isoformat(), local_dt


def minutes_between(start: Optional[str], end: Optional[str]) -> Optional[float]:
    dt_start = parse_iso(start)
    dt_end = parse_iso(end)
    if not dt_start or not dt_end:
        return None
    return round((dt_end - dt_start).total_seconds() / 60.0, 1)


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def require_admin(x_admin_token: str = Header(default="")):
    admin_id = ADMIN_TOKENS.get(x_admin_token)
    if not admin_id:
        raise HTTPException(status_code=401, detail="Admin login required")

    conn = get_conn()
    cur = conn.cursor()
    admin = cur.execute(
        "SELECT id, name, username, role, active FROM admin_users WHERE id = ?",
        (admin_id,),
    ).fetchone()
    conn.close()

    if not admin or int(admin["active"]) != 1:
        raise HTTPException(status_code=401, detail="Admin login required")

    return dict(admin)


def seed_admins():
    conn = get_conn()
    cur = conn.cursor()

    admins = [
        ("Adam Coronado", "adam.coronado", hash_password("ChangeMe123!"), "admin"),
        ("Todd Lewis", "todd.lewis", hash_password("BTC123"), "admin"),
        ("Mickey Schoenhals", "mickey.schoenhals", hash_password("BTC123"), "admin"),
        ("Rich Szecsy", "rich.szecsy", hash_password("BTC123"), "admin"),
        ("Steve Morris", "steve.morris", hash_password("BTC123"), "admin"),
        ("Jeff Murray", "jeff.murray", hash_password("BTC123"), "admin"),
        ("Lance Sadecky", "lance.sadecky", hash_password("BTC123"), "admin"),
    ]

    for name, username, password_hash, role in admins:
        username = username.strip().lower()

        existing = cur.execute(
            "SELECT id FROM admin_users WHERE username = ?",
            (username,),
        ).fetchone()

        if not existing:
            cur.execute(
                """
                INSERT INTO admin_users (name, username, password_hash, role, active, created_at)
                VALUES (?, ?, ?, ?, 1, ?)
                """,
                (name, username, password_hash, role, utc_now()),
            )

    ensure_column(conn, "etickets", "job_number", "job_number TEXT")
    ensure_column(conn, "etickets", "curb_line_signature_data_url", "curb_line_signature_data_url TEXT")
    ensure_column(conn, "etickets", "curb_line_signed_at", "curb_line_signed_at TEXT")

    ensure_column(conn, "etickets", "mix_number", "mix_number TEXT")
    ensure_column(conn, "etickets", "mix_description", "mix_description TEXT")

    ensure_column(conn, "etickets", "assigned_to_type", "assigned_to_type TEXT")
    ensure_column(conn, "etickets", "assigned_to_id", "assigned_to_id TEXT")
    ensure_column(conn, "etickets", "assigned_to_name", "assigned_to_name TEXT")
    ensure_column(conn, "etickets", "assigned_at", "assigned_at TEXT")
    ensure_column(conn, "etickets", "assigned_by", "assigned_by TEXT")

    ensure_column(conn, "etickets", "digitalfleet_ticket_id", "digitalfleet_ticket_id TEXT")
    ensure_column(conn, "etickets", "digitalfleet_order_id", "digitalfleet_order_id TEXT")
    ensure_column(conn, "etickets", "digitalfleet_message_id", "digitalfleet_message_id TEXT")

    ensure_column(conn, "etickets", "archived_at", "archived_at TEXT")
    ensure_column(conn, "etickets", "archived_by", "archived_by TEXT")

    ensure_column(conn, "etickets", "delivered_qty_total", "delivered_qty_total REAL DEFAULT 0")
    ensure_column(conn, "etickets", "order_total", "order_total REAL DEFAULT 0")

    ensure_column(conn, "etickets", "qc_water_added", "qc_water_added REAL DEFAULT 0")
    ensure_column(conn, "etickets", "customer_water_added", "customer_water_added REAL DEFAULT 0")
    ensure_column(conn, "etickets", "curb_line_status", "curb_line_status TEXT DEFAULT 'Not Needed'")

    ensure_column(conn, "etickets", "qc_weather_summary", "qc_weather_summary TEXT")
    ensure_column(conn, "etickets", "qc_weather_link", "qc_weather_link TEXT")
    ensure_column(conn, "etickets", "qc_signed_latitude", "qc_signed_latitude REAL")
    ensure_column(conn, "etickets", "qc_signed_longitude", "qc_signed_longitude REAL")
    ensure_column(conn, "etickets", "qc_weather_at", "qc_weather_at TEXT")

    conn.commit()
    conn.close()


def decode_data_url_image(data_url: Optional[str]):
    if not data_url:
        return None

    try:
        if data_url.startswith("http://") or data_url.startswith("https://"):
            with urlopen(data_url, timeout=20) as response:
                return response.read()

        if "," not in data_url:
            return None

        _, encoded = data_url.split(",", 1)
        return base64.b64decode(encoded)
    except Exception as e:
        print("Image decode failed:", str(e))
        return None

def normalize_signature_image(img_bytes: Optional[bytes]) -> Optional[bytes]:
    if not img_bytes:
        return None
    try:
        img = Image.open(io.BytesIO(img_bytes)).convert("RGBA")
        width, height = img.size
        out = Image.new("RGBA", (width, height), (255, 255, 255, 255))

        for y in range(height):
            for x in range(width):
                r, g, b, a = img.getpixel((x, y))
                if a < 10:
                    out.putpixel((x, y), (255, 255, 255, 255))
                    continue

                luminance = (0.299 * r) + (0.587 * g) + (0.114 * b)

                if luminance > 135:
                    out.putpixel((x, y), (0, 0, 0, 255))
                else:
                    out.putpixel((x, y), (255, 255, 255, 255))

        buf = io.BytesIO()
        out.save(buf, format="PNG")
        return buf.getvalue()
    except Exception:
        return img_bytes


def send_eticket_email(
    to_email: str,
    customer_name: str,
    eticket_link: str,
    truck_number: str,
    job_number: str,
):
    if (
        not SMTP_USERNAME
        or not SMTP_PASSWORD
        or "PASTE_YOUR_CURRENT_WORKING_APP_PASSWORD_HERE" in SMTP_PASSWORD
    ):
        raise RuntimeError("SMTP credentials are not configured")

    msg = EmailMessage()
    msg["Subject"] = f"BTC Fleet Delivery eTicket - Truck {truck_number}"
    msg["From"] = EMAIL_FROM
    msg["To"] = to_email

    body = f"""Hello {customer_name or "Customer"},

Your BTC Fleet delivery ticket is ready for review and signature.

Truck: {truck_number}
Job Number: {job_number or "-"}

Open your eTicket here:
{eticket_link}

Thank you,
BTC Fleet
"""
    msg.set_content(body)

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)


def create_new_assignment_token() -> str:
    return str(uuid.uuid4())


def build_visual_crossing_lookup_link(lat: float, lon: float) -> str:
    return "https://www.visualcrossing.com/weather-history/"


def parse_mix_details_backend(product: Optional[str]):
    product_text = str(product or "")
    text = product_text.upper()

    strength_match = re.search(r"(\d{4})\s*PSI", text)
    if not strength_match:
        strength_match = re.search(r"(\d{4})PSI", text)

    sack_match = re.search(r"(\d+(?:\.\d+)?)\s*SK", text)
    if not sack_match:
        sack_match = re.search(r"(\d+(?:\.\d+)?)SK", text)

    has_slag = "SLAG" in text
    has_ash = "ASH" in text
    no_air = "NO AIR" in text
    has_air = bool(re.search(r"\bAIR\b", text)) and not no_air

    strength = f"{strength_match.group(1)} PSI" if strength_match else "-"
    sack = f"{sack_match.group(1)} SK" if sack_match else "-"
    ash_or_slag = "Slag" if has_slag else "Ash"
    air_type = "Air" if has_air else "No Air"
    air_content = "4.5% ± 1.5%" if has_air else "1.5% ± 1.5%"
    parts = []

    if sack != "-":
        parts.append(sack)

    if has_slag:
        parts.append("Slag")
    elif has_ash:
        parts.append("Ash")

    # Always include air type
    parts.append(air_type)

    description = " | ".join(parts)

    return {
        "strength": strength,
        "sack": sack,
        "ash_or_slag": ash_or_slag,
        "air_type": air_type,
        "slump": "4.5 in ± 1.5 in",
        "air_content": air_content,
        "description": description,
    }


def extract_water_allowed_from_choice(water_choice: Optional[str]) -> str:
    txt = str(water_choice or "")
    match = re.search(r"(\d+(?:\.\d+)?)\s*gal", txt, re.I)
    if match:
        return f"{match.group(1)} gal"
    return "25 gal"


def draw_qr_code(c, value: str, x: float, y: float, size: float):
    qr_widget = qr.QrCodeWidget(value or "-")
    bounds = qr_widget.getBounds()
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    drawing.add(qr_widget)
    renderPDF.draw(drawing, c, x, y)


def flatten_weather_summary(summary: Optional[str]) -> str:
    txt = str(summary or "-").replace("Visual Crossing historical weather near sign time | ", "")
    txt = txt.replace("Visual Crossing | ", "")
    txt = txt.replace("\n", " | ")
    txt = re.sub(r"\s+", " ", txt).strip()
    return txt or "-"


def fetch_historical_weather_snapshot(lat: float, lon: float, signed_at_iso: str):
    if (
        not VISUAL_CROSSING_API_KEY
        or "PASTE_YOUR_VISUAL_CROSSING_API_KEY_HERE" in VISUAL_CROSSING_API_KEY
    ):
        return None

    signed_dt = parse_iso(signed_at_iso)
    if not signed_dt:
        return None
    
    cache_key = f"{round(lat,3)}-{round(lon,3)}-{signed_at_iso[:13]}"

    if cache_key in weather_cache:
        return weather_cache[cache_key]

    start_date = (signed_dt - timedelta(days=1)).date().isoformat()
    end_date = (signed_dt + timedelta(days=1)).date().isoformat()

    location = f"{lat},{lon}"
    location_encoded = quote(location, safe=",")

    url = (
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        f"{location_encoded}/{start_date}/{end_date}"
        f"?unitGroup={VISUAL_CROSSING_UNIT_GROUP}"
        "&include=hours"
        "&contentType=json"
        "&elements=datetimeEpoch,temp,feelslike,humidity,windspeed,winddir,precip,precipprob,conditions,description,cloudcover"
        f"&key={VISUAL_CROSSING_API_KEY}"
    )

    with urlopen(url, timeout=20) as response:
        payload = json.loads(response.read().decode("utf-8"))

    target_epoch = int(signed_dt.timestamp())

    nearest_hour = None
    nearest_diff = None

    for day in payload.get("days", []):
        for hour in day.get("hours", []):
            epoch = hour.get("datetimeEpoch")
            if epoch is None:
                continue

            diff = abs(int(epoch) - target_epoch)
            if nearest_diff is None or diff < nearest_diff:
                nearest_diff = diff
                nearest_hour = hour

    if not nearest_hour:
        return None

    temp = nearest_hour.get("temp")
    feelslike = nearest_hour.get("feelslike")
    humidity = nearest_hour.get("humidity")
    windspeed = nearest_hour.get("windspeed")
    winddir = nearest_hour.get("winddir")
    precip = nearest_hour.get("precip")
    precipprob = nearest_hour.get("precipprob")
    conditions = nearest_hour.get("conditions")
    description = nearest_hour.get("description")
    cloudcover = nearest_hour.get("cloudcover")

    summary = (
        f"Visual Crossing historical weather near sign time | "
        f"Temp: {temp if temp is not None else '-'}°F | "
        f"Feels Like: {feelslike if feelslike is not None else '-'}°F | "
        f"Conditions: {conditions or '-'} | "
        f"Description: {description or '-'} | "
        f"Humidity: {humidity if humidity is not None else '-'}% | "
        f"Wind: {windspeed if windspeed is not None else '-'} mph"
        f"{f' @ {winddir}°' if winddir is not None else ''} | "
        f"Precip: {precip if precip is not None else '-'} in | "
        f"Precip Prob: {precipprob if precipprob is not None else '-'}% | "
        f"Cloud Cover: {cloudcover if cloudcover is not None else '-'}% | "
        f"Coords: ({round(lat, 5)}, {round(lon, 5)}) | "
        f"Signed Time CDT: {format_central_display(signed_at_iso)}"
    )

    result = {
        "weather_summary": summary,
        "weather_link": build_visual_crossing_lookup_link(lat, lon),
    }

    weather_cache[cache_key] = result

    return result

def normalize_df_truck_name(value: Optional[str]) -> str:
    txt = str(value or "").strip()
    if not txt:
        return ""

    # If Digital Fleet sends B-06, keep it.
    if "-" in txt:
        return txt.upper()

    # If Digital Fleet sends 06 or 6, convert to B-06 for your current truck names.
    digits = re.sub(r"\D", "", txt)
    if digits:
        return f"B-{int(digits):02d}"

    return txt.upper()


def digitalfleet_status_from_event(event: dict) -> str:
    event_type = str(event.get("EventType") or "").upper()

    if event_type == "POSITION":
        return ""

    ticket_code = event.get("TicketEventCode")
    truck_code = event.get("TruckEventCode")

    ticket_status_map = {
        0: "At Plant",          # Ticket Created
        1: "At Plant",          # Ticket Assigned
        2: "Loading",           # Begin Load
        3: "En Route",          # To Job
        4: "Arrived On Site",   # Arrive Job
        5: "Pouring",           # Begin Pour
        6: "Post Pour",         # Stop Pour
        7: "Returning",         # To Yard
        9: "Returning",         # Completed
        12: "At Plant",         # Load Complete
    }

    truck_status_map = {
        3: "Idle",
        8: "Washed Out",
        15: "En Route",
        16: "Arrived On Site",
        22: "Washed Out",
        23: "Washed Out",
        24: "At Plant",
    }

    if ticket_code is not None:
        try:
            return ticket_status_map.get(int(ticket_code), "")
        except Exception:
            return ""

    if truck_code is not None:
        try:
            return truck_status_map.get(int(truck_code), "")
        except Exception:
            return ""

    return ""


def create_or_update_eticket_from_digitalfleet(conn, event: dict):
    cur = conn.cursor()

    ticket_number = str(event.get("TicketNumber") or "").strip()
    order_number = str(event.get("OrderNumber") or "").strip()
    truck_number = normalize_df_truck_name(event.get("TruckName"))
    event_time = event.get("EventTime") or utc_now()
    load_size = float(event.get("Quantity") or event.get("LoadSize") or 10)
    load_number = float(event.get("LoadNumber") or event.get("LoadNo") or 1)
    order_total = float(event.get("OrderTotal") or event.get("TotalOrderedQty") or 0)
    delivered_total = float(event.get("TotalShippedQty") or event.get("DeliveredQtyTotal") or (load_size * load_number))

    if not ticket_number or not truck_number:
        return None

    existing = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE ticket_number = ?
        LIMIT 1
        """,
        (ticket_number,),
    ).fetchone()

    if existing:
        cur.execute(
            """
            UPDATE etickets
            SET truck_number = COALESCE(NULLIF(?, ''), truck_number),
                job_number = COALESCE(NULLIF(?, ''), job_number),
                digitalfleet_ticket_id = ?,
                digitalfleet_order_id = ?,
                digitalfleet_message_id = ?,
                load_time = COALESCE(load_time, ?)
            WHERE id = ?
            """,
            (
                truck_number,
                order_number,
                str(event.get("TicketId") or ""),
                str(event.get("OrderId") or ""),
                str(event.get("MessageId") or ""),
                event_time,
                existing["id"],
            ),
        )

        updated = cur.execute(
            "SELECT * FROM etickets WHERE id = ?",
            (existing["id"],),
        ).fetchone()

        return dict(updated) if updated else dict(existing)

    token = str(uuid.uuid4())

    cur.execute(
        """
        INSERT INTO etickets (
            job_instance_id,
            ticket_number,
            customer_name,
            job_number,
            address,
            plant,
            truck_number,
            product,
            mix_number,
            mix_description,
            quantity,
            delivered_qty_total,
            order_total,
            token,
            status,
            load_time,
            time_limit_minutes,
            batch_weights_qr_url,
            terms_qr_url,
            digitalfleet_ticket_id,
            digitalfleet_order_id,
            digitalfleet_message_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            f"digitalfleet-{ticket_number}",
            ticket_number,
            "Customer",
            order_number,
            "",
            "",
            truck_number,
            "Concrete Mix",
            "",
            "",
            load_size,
            delivered_total,
            order_total,
            token,
            "pending",
            event_time,
            100,
            API_QR_BATCH,
            API_QR_TERMS,
            str(event.get("TicketId") or ""),
            str(event.get("OrderId") or ""),
            str(event.get("MessageId") or ""),
        ),
    )

    eticket_id = cur.lastrowid

    new_ticket = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE id = ?
        """,
        (eticket_id,),
    ).fetchone()

    return dict(new_ticket) if new_ticket else None

def generate_eticket_pdf(ticket: dict) -> Path:
    PDF_DIR.mkdir(parents=True, exist_ok=True)

    token = str(ticket.get("token") or uuid.uuid4())
    filename = f"eticket_{token}.pdf"
    out_path = PDF_DIR / filename

    c = canvas.Canvas(str(out_path), pagesize=letter)
    page_w, page_h = letter

    white = colors.white
    black = colors.HexColor("#111111")
    dark_gray = colors.HexColor("#333333")
    line_gray = colors.HexColor("#777777")
    btc_red = colors.HexColor("#B9473A")

    def safe(v, fallback="-"):
        if v is None:
            return fallback
        txt = str(v).strip()
        return txt if txt else fallback

    def clean_text(v, fallback="-"):
        txt = safe(v, fallback)
        replacements = {
            "Â±": "±",
            "Â°": "°",
            "â€“": "–",
            "â€”": "—",
            "â€˜": "'",
            "â€™": "'",
            "â€œ": '"',
            "â€": '"',
            "\u00a0": " ",
        }
        for bad, good in replacements.items():
            txt = txt.replace(bad, good)
        return txt

    def qty(v):
        try:
            return f"{float(v):.1f}"
        except Exception:
            return "0.0"

    def gallons(v):
        try:
            return f"{float(v):.1f} gal"
        except Exception:
            return "0.0 gal"

    def fit_text(text, max_chars):
        txt = clean_text(text)
        if len(txt) <= max_chars:
            return txt
        return txt[: max_chars - 3] + "..."

    def draw_centered_text(x, y, w, text, font="Helvetica", size=8, color=black):
        c.setFillColor(color)
        c.setFont(font, size)
        c.drawCentredString(x + w / 2, y, clean_text(text))

    def draw_left_text(x, y, text, font="Helvetica", size=8, color=black):
        c.setFillColor(color)
        c.setFont(font, size)
        c.drawString(x, y, clean_text(text))

    def box(x, y, w, h, fill=None, radius=5, stroke_color=line_gray):
        c.setStrokeColor(stroke_color)
        c.setLineWidth(0.75)
        if fill:
            c.setFillColor(fill)
            c.roundRect(x, y, w, h, radius, stroke=1, fill=1)
        else:
            c.roundRect(x, y, w, h, radius, stroke=1, fill=0)

    def titled_box(x, y, w, h, title, fill=None, header_h=18, title_size=7.5):
        box(x, y, w, h, fill=fill)
        c.setStrokeColor(line_gray)
        c.line(x, y + h - header_h, x + w, y + h - header_h)
        draw_centered_text(
            x,
            y + h - 12,
            w,
            title,
            font="Helvetica-Bold",
            size=title_size,
            color=black,
        )

    def value_box(x, y, w, h, title, value):
        box(x, y, w, h)

        draw_centered_text(
            x,
            y + h - 10,
            w,
            title,
            font="Helvetica-Bold",
            size=6.8,
            color=black,
        )

        draw_centered_text(
            x,
            y + 8,
            w,
            value,
            font="Helvetica-Bold",
            size=10,
            color=black,
        )

    def info_block(x, y, w, h, title, rows):
        titled_box(x, y, w, h, title, header_h=18, title_size=7.8)

        row_y = y + h - 28
        label_x = x + 10
        value_x = x + 138

        for label, value in rows:
            draw_left_text(
                label_x,
                row_y,
                f"{label}:",
                font="Helvetica-Bold",
                size=9.,
            )

            draw_left_text(
                value_x,
                row_y,
                fit_text(value, 34),
                font="Helvetica",
                size=8.0,
            )

            c.setStrokeColor(colors.Color(0, 0, 0, alpha=0.10))
            c.line(x + 8, row_y - 5, x + w - 8, row_y - 5)

            row_y -= 16

    def draw_qr_code(pdf_canvas, value: str, x: float, y: float, size: float):
        qr_widget = qr.QrCodeWidget(value or "-")
        bounds = qr_widget.getBounds()
        qr_width = bounds[2] - bounds[0]
        qr_height = bounds[3] - bounds[1]

        drawing = Drawing(
            size,
            size,
            transform=[size / qr_width, 0, 0, size / qr_height, 0, 0],
        )
        drawing.add(qr_widget)
        renderPDF.draw(drawing, pdf_canvas, x, y)

    def decode_data_url_image(data_url: Optional[str]):
        if not data_url:
            return None

        try:
            if data_url.startswith("http://") or data_url.startswith("https://"):
                from urllib.request import Request, urlopen

                req = Request(
                    data_url,
                    headers={
                        "User-Agent": "Mozilla/5.0"
                    },
                )

                with urlopen(req, timeout=20) as response:
                    img_bytes = response.read()
                    print("FETCHED IMAGE BYTES:", len(img_bytes), data_url)
                    return img_bytes

            if "," not in data_url:
                return None

            _, encoded = data_url.split(",", 1)
            img_bytes = base64.b64decode(encoded)
            print("DECODED BASE64 BYTES:", len(img_bytes))
            return img_bytes

        except Exception as e:
            print("Image decode failed:", str(e), data_url)
            return None

    def normalize_signature_image(img_bytes: Optional[bytes]) -> Optional[bytes]:
        if not img_bytes:
            return None

        try:
            img = Image.open(io.BytesIO(img_bytes)).convert("RGBA")
            width, height = img.size
            out = Image.new("RGBA", (width, height), (255, 255, 255, 255))

            for y_px in range(height):
                for x_px in range(width):
                    r, g, b, a = img.getpixel((x_px, y_px))

                    if a < 10:
                        out.putpixel((x_px, y_px), (255, 255, 255, 255))
                        continue

                    luminance = (0.299 * r) + (0.587 * g) + (0.114 * b)

                    if luminance > 135:
                        out.putpixel((x_px, y_px), (0, 0, 0, 255))
                    else:
                        out.putpixel((x_px, y_px), (255, 255, 255, 255))

            buf = io.BytesIO()
            out.save(buf, format="PNG")
            return buf.getvalue()
        except Exception:
            return img_bytes

    def fit_image(img_bytes, x, y, w, h):
        try:
            img = ImageReader(io.BytesIO(img_bytes))
            iw, ih = img.getSize()
            scale = min(w / iw, h / ih)
            dw = iw * scale
            dh = ih * scale
            dx = x + (w - dw) / 2
            dy = y + (h - dh) / 2

            c.drawImage(
                img,
                dx,
                dy,
                width=dw,
                height=dh,
                preserveAspectRatio=True,
                mask="auto",
            )
        except Exception:
            draw_centered_text(
                x,
                y + h / 2,
                w,
                "Image unavailable",
                font="Helvetica",
                size=6,
                color=dark_gray,
            )

    def fit_image_fill(img_bytes, x, y, w, h):
        try:
            img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
            iw, ih = img.size

            target_ratio = w / h
            img_ratio = iw / ih

            if img_ratio > target_ratio:
                new_w = int(ih * target_ratio)
                left = (iw - new_w) // 2
                img = img.crop((left, 0, left + new_w, ih))
            else:
                new_h = int(iw / target_ratio)
                top = (ih - new_h) // 2
                img = img.crop((0, top, iw, top + new_h))

            buf = io.BytesIO()
            img.save(buf, format="JPEG", quality=92)
            buf.seek(0)

            c.drawImage(
                ImageReader(buf),
                x,
                y,
                width=w,
                height=h,
                preserveAspectRatio=False,
                mask="auto",
            )
        except Exception:
            fit_image(img_bytes, x, y, w, h)

    def draw_logo(x, y, w, h):
        try:
            logo_file = Path("big_town_logo.png")

            if logo_file.exists():
                with open(logo_file, "rb") as f:
                    fit_image(f.read(), x, y, w, h)
                return

            if "BIG_TOWN_LOGO_B64" in globals() and BIG_TOWN_LOGO_B64:
                logo_bytes = base64.b64decode(BIG_TOWN_LOGO_B64)
                fit_image(logo_bytes, x, y, w, h)
                return

            draw_left_text(
                x,
                y + h / 2,
                "BIG TOWN CONCRETE",
                "Helvetica-Bold",
                12,
                btc_red,
            )
        except Exception:
            draw_left_text(
                x,
                y + h / 2,
                "BIG TOWN CONCRETE",
                "Helvetica-Bold",
                12,
                btc_red,
            )

    # ---------- DATA SETUP ----------
    product = ticket.get("product")
    mix_number = ticket.get("mix_number") or ""
    mix_description = ticket.get("mix_description") or ""

    mix = parse_mix_details_backend(product)

    product_parts = str(product or "").strip().split()

    if not mix_number:
        mix_number = product_parts[0] if product_parts else "-"

    if not mix_description:
        mix_description = " ".join(product_parts[1:]) if len(product_parts) > 1 else mix.get("description") or "-"

    ticket_number = (
        ticket.get("ticket_number")
        or ticket.get("job_number")
        or ticket.get("id")
        or "-"
    )

    customer_name = ticket.get("customer_name")
    address = ticket.get("address")
    job_number = ticket.get("job_number")
    reference_number = ticket.get("reference_number")
    truck_number = ticket.get("truck_number")
    quantity = ticket.get("quantity") or ticket.get("ordered_qty") or 0

    water_allowed_value = extract_water_allowed_from_choice(ticket.get("water_choice"))
    qc_water_added_value = ticket.get("qc_water_added") or 0
    customer_water_added_value = (
        ticket.get("customer_water_added")
        or ticket.get("water_added")
        or ticket.get("water_added_gallons")
        or 0
    )

    raw_weather_text = clean_text(
        flatten_weather_summary(
            ticket.get("weather_summary")
            or ticket.get("qc_weather_summary")
        )
    )
    raw_weather_text = raw_weather_text.replace("Signed Time UTC:", "Signed Time CDT:")

    signed_time_display = safe(ticket.get("signed_at"), "")
    weather_text = raw_weather_text

    if "Signed Time CDT:" in weather_text:
        before_signed, signed_part = weather_text.split("Signed Time CDT:", 1)
        weather_text = before_signed.strip().rstrip("|").strip()

    weather_text = weather_text.replace("Description: - | ", "")
    weather_text = weather_text.replace("Precip Prob:", "Rain Chance:")
    weather_text = weather_text.replace("Cloud Cover:", "Clouds:")

    curb_line_display = clean_text(ticket.get("water_choice") or "")
    if "|" in curb_line_display:
        curb_line_display = curb_line_display.split("|")[0].strip()

    if not curb_line_display:
        curb_line_display = "Customer / Contractor Signature"

    acceptance_display = clean_text(ticket.get("ticket_acceptance") or "")
    if "|" in acceptance_display:
        acceptance_display = acceptance_display.split("|")[0].strip()

    if not acceptance_display:
        acceptance_display = "Accepted"

    ticket_acceptance_full = clean_text(ticket.get("ticket_acceptance") or "")

    rejection_reason = "-"
    if "Reason:" in ticket_acceptance_full:
        try:
            rejection_reason = ticket_acceptance_full.split("Reason:", 1)[1].split("|", 1)[0].strip()
        except Exception:
            rejection_reason = "-"

    curb_sig_bytes = decode_data_url_image(ticket.get("curb_line_signature_data_url"))
    final_sig_bytes = decode_data_url_image(ticket.get("signature_data_url"))
    photo_bytes = decode_data_url_image(ticket.get("photo_data_url"))

    print("PDF SIGNATURE URL:", ticket.get("signature_data_url"))
    print("PDF PHOTO URL:", ticket.get("photo_data_url"))
    print("PDF FINAL SIG BYTES:", len(final_sig_bytes) if final_sig_bytes else 0)
    print("PDF PHOTO BYTES:", len(photo_bytes) if photo_bytes else 0)

    curb_sig_bytes = normalize_signature_image(curb_sig_bytes)
    final_sig_bytes = normalize_signature_image(final_sig_bytes)

    batch_rows = ticket.get("batch_weights") or ticket.get("batch_weights_json") or None

    default_batch_rows = [
        ["01-Cement", "388.00", "3,880.00", "3,940.00", "1.55", "lb", "", ""],
        ["04-Slag", "129.00", "1,290.00", "1,310.00", "1.55", "lb", "", ""],
        ["06-Natural Sand", "1,400.00", "14,263.11", "14,230.00", "-0.23", "lb", "3.00", "31.46"],
        ["09-Water", "28.50", "230.19", "226.44", "-1.63", "gal", "", ""],
        ["10-#57 Crushed Rock", "1,885.00", "18,793.90", "18,760.00", "-0.18", "lb", "0.50", "-6.71"],
        ["36-SIKA 686 (MRWR)", "41.36", "413.60", "414.00", "0.10", "floz", "0.00", "0.00"],
        ["37-SIKA Air", "2.12", "21.20", "21.00", "-0.94", "floz", "0.00", "0.00"],
    ]



    try:
        if isinstance(batch_rows, str) and batch_rows.strip():
            parsed = json.loads(batch_rows)
            batch_rows = parsed if isinstance(parsed, list) else default_batch_rows
        elif not isinstance(batch_rows, list):
            batch_rows = default_batch_rows
    except Exception:
        batch_rows = default_batch_rows

    # ---------- PAGE BACKGROUND ----------
    c.setFillColor(white)
    c.rect(0, 0, page_w, page_h, stroke=0, fill=1)

        # ---------- HEADER ----------
    draw_logo(42, page_h - 78, 125, 46)

    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 23)
    c.drawCentredString(page_w / 2, page_h - 60, "BTC ETICKET")

    ticket_box_x = page_w - 182
    ticket_box_y = page_h - 80
    ticket_box_w = 140
    ticket_box_h = 48

    box(ticket_box_x, ticket_box_y, ticket_box_w, ticket_box_h)

    c.line(
        ticket_box_x,
        ticket_box_y + 26,
        ticket_box_x + ticket_box_w,
        ticket_box_y + 26,
    )

    draw_centered_text(
        ticket_box_x,
        ticket_box_y + 34,
        ticket_box_w,
        "TICKET NUMBER",
        font="Helvetica-Bold",
        size=7.6,
    )

    draw_centered_text(
        ticket_box_x,
        ticket_box_y + 9,
        ticket_box_w,
        safe(ticket_number),
        font="Helvetica-Bold",
        size=13,
    )

    # ---------- MAIN INFO BLOCKS ----------
    margin_x = 40
    gap = 14
    content_w = page_w - (margin_x * 2)

    block_w = (content_w - gap) / 2

    # moved down so it no longer overlaps logo/ticket box
    block_y = page_h - 225
    block_h = 118

    load_dt = parse_iso(ticket.get("load_time"))

    date_str = load_dt.strftime("%m/%d/%Y") if load_dt else "-"
    time_str = load_dt.strftime("%I:%M %p") if load_dt else "-"

    customer_rows = [
        ("Customer / Job Name", customer_name),
        ("Address", address),
        ("Job Number", job_number),
        ("PO / Reference", reference_number),
        ("Date", date_str),
        ("Load Time", time_str),
    ]

    strength_value = mix.get("strength") or ""

    if strength_value and "PSI" in strength_value:
        strength_value = f"{strength_value} in 28 Days"

    mix_rows = [
        ("Mix #", mix_number),
        ("Truck", truck_number),
        ("Description", mix_description),
        ("Strength (ASTM C31)", strength_value),
        ("Slump (ASTM C143)", mix.get("slump")),
        ("Air Content (ASTM C231)", mix.get("air_content")),
    ]

    info_block(
        margin_x,
        block_y,
        block_w,
        block_h,
        "CUSTOMER / JOB INFORMATION",
        customer_rows,
    )

    info_block(
        margin_x + block_w + gap,
        block_y,
        block_w,
        block_h,
        "MIX / TRUCK INFORMATION",
        mix_rows,
    )

    # ---------- METRICS ROW ----------
    metric_y = block_y - 42
    metric_h = 31
    metric_gap = 10
    metric_w = (content_w - (metric_gap * 2)) / 3

    load_size = ticket.get("quantity") or 0
    delivered_total = ticket.get("delivered_qty_total") or load_size
    order_total = ticket.get("order_total") or load_size

    metrics = [
        ("LOAD SIZE", f"{qty(load_size)} cys"),
        ("QTY DELIVERED TOTAL", f"{qty(delivered_total)} cys"),
        ("ORDER TOTAL", f"{qty(order_total)} cys"),
    ]

    start_x = margin_x

    for i, (title, value) in enumerate(metrics):
        value_box(
            start_x + (metric_w + metric_gap) * i,
            metric_y,
            metric_w,
            metric_h,
            title,
            value,
        )

    # ---------- WEATHER ----------
    weather_y = metric_y - 52
    weather_h = 46

    titled_box(
        margin_x,
        weather_y,
        content_w,
        weather_h,
        "WEATHER CONDITIONS",
        header_h=18,
        title_size=7.5,
    )

    weather_lines = textwrap.wrap(weather_text, width=135)[:2]
    weather_start_y = weather_y + 16

    c.setFillColor(black)
    c.setFont("Helvetica", 7.2)

    for i, line in enumerate(weather_lines):
        c.drawCentredString(
            margin_x + content_w / 2,
            weather_start_y - (i * 9),
            clean_text(line),
        )

# ---------- WATER BOXES ----------
    water_y = weather_y - 52
    water_h = 38
    water_gap = 8
    water_w = (content_w - (water_gap * 3)) / 4

    total_water_added_value = float(qc_water_added_value or 0) + float(customer_water_added_value or 0)

    value_box(
        margin_x,
        water_y,
        water_w,
        water_h,
        "WATER ALLOWED",
        gallons(
            water_allowed_value.replace(" gal", "")
            if isinstance(water_allowed_value, str)
            else water_allowed_value
        ),
    )

    value_box(
        margin_x + water_w + water_gap,
        water_y,
        water_w,
        water_h,
        "QC WATER ADDED",
        gallons(qc_water_added_value),
    )

    value_box(
        margin_x + ((water_w + water_gap) * 2),
        water_y,
        water_w,
        water_h,
        "CUSTOMER WATER ADDED",
        gallons(customer_water_added_value),
    )

    value_box(
        margin_x + ((water_w + water_gap) * 3),
        water_y,
        water_w,
        water_h,
        "TOTAL WATER ADDED",
        gallons(total_water_added_value),
    )

    # ---------- BATCH WEIGHTS ----------
    batch_y = water_y - 172
    batch_h = 156

    titled_box(
        margin_x,
        batch_y,
        content_w,
        batch_h,
        "BATCH WEIGHTS",
        header_h=19,
        title_size=7.4,
    )

    table_x = margin_x + 8
    table_y = batch_y + batch_h - 31
    table_w = content_w - 16

    headers = [
        "Description",
        "Design",
        "Target",
        "Actual",
        "UOM",
        "% Var",
        "Moisture (%)",
        "Water (gal)",
    ]

    col_widths = [
        120,
        60,
        68,
        68,
        36,  # UOM (moved up)
        48,  # % Var (moved after UOM)
        55,
        52,
    ]

    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 6.5)

    current_x = table_x
    for i, header in enumerate(headers):
        if i == 0:
            c.drawString(current_x + 2, table_y, header)
        else:
            c.drawRightString(current_x + col_widths[i] - 3, table_y, header)
        current_x += col_widths[i]

    c.setStrokeColor(line_gray)
    c.line(table_x, table_y - 4, table_x + table_w, table_y - 4)

    row_y = table_y - 14
    c.setFont("Helvetica", 6.25)

    for row in batch_rows[:7]:
        current_x = table_x

        # Re-map columns (swap UOM and % Var)
        # Original: [Desc, Design, Target, Actual, %Var, UOM, Moist, Water]
        reordered = [
            row[0],  # Description
            row[1],  # Design
            row[2],  # Target
            row[3],  # Actual
            row[5],  # UOM (moved up)
            row[4],  # % Var (moved after UOM)
            row[6],  # Moisture
            row[7],  # Water
        ]

        for i, value in enumerate(reordered):

            # ---- FORMAT NUMBERS ----
            if i in [1, 2, 3]:  # Design, Target, Actual
                try:
                    num = float(str(value).replace(",", ""))
                    value = f"{int(round(num)):,}"
                except:
                    pass

            elif i == 5:  # % Var
                try:
                    value = f"{float(value):.1f}"
                except:
                    pass

            text = fit_text(value, 22 if i == 0 else 11)

            if i == 0:
                c.drawString(current_x + 2, row_y, text)
            else:
                c.drawRightString(current_x + col_widths[i] - 3, row_y, text)

            current_x += col_widths[i]

        c.setStrokeColor(colors.Color(0, 0, 0, alpha=0.10))
        c.line(table_x, row_y - 5, table_x + table_w, row_y - 5)

        row_y -= 15.8

    # ---------- BOTTOM SECTION ----------
    bottom_y = 32
    bottom_h = 205

    left_col_w = 220
    photo_w = 150
    terms_w = content_w - left_col_w - photo_w - (gap * 2)

    left_col_x = margin_x
    photo_x = left_col_x + left_col_w + gap
    terms_x = photo_x + photo_w + gap

    sig_gap = 10
    sig_box_h = (bottom_h - sig_gap) / 2

    def signature_box(x, y, w, h, title, img_bytes, footer_text):
        titled_box(x, y, w, h, title, fill=None, header_h=18, title_size=6.45)

        footer_h = 15
        image_area_y = y + footer_h
        image_area_h = h - 18 - footer_h

        if img_bytes:
            fit_image(img_bytes, x + 8, image_area_y + 2, w - 16, image_area_h - 4)
        else:
            draw_centered_text(
                x,
                image_area_y + image_area_h / 2,
                w,
                "No signature captured",
                font="Helvetica",
                size=6,
                color=dark_gray,
            )

        c.setStrokeColor(line_gray)
        c.line(x, y + footer_h, x + w, y + footer_h)

        draw_centered_text(
            x,
            y + 5,
            w,
            footer_text,
            font="Helvetica-Bold",
            size=5.1,
            color=black,
        )

    def format_cdt(value):
        if not value:
            return ""

        try:
            dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))

            try:
                dt = dt.astimezone(ZoneInfo("America/Chicago"))
            except Exception:
                pass

            return dt.strftime("%m/%d/%Y %I:%M %p")

        except Exception:
            return str(value)

    curb_signed_display = format_cdt(
        ticket.get("curb_line_signed_at")
    )

    curb_sig_title = "CURB LINE SIGNATURE"
    if curb_signed_display:
        curb_sig_title = f"CURB LINE SIGNATURE - {fit_text(curb_signed_display, 22)}"

    final_signed_display = format_cdt(ticket.get("signed_at"))

    final_sig_title = "FINAL SIGNATURE"
    if final_signed_display:
        final_sig_title = f"FINAL SIGNATURE - {fit_text(final_signed_display, 22)}"

    signature_box(
        left_col_x,
        bottom_y + sig_box_h + sig_gap,
        left_col_w,
        sig_box_h,
        curb_sig_title,
        curb_sig_bytes,
        fit_text(curb_line_display, 38),
    )

    signature_box(
        left_col_x,
        bottom_y,
        left_col_w,
        sig_box_h,
        final_sig_title,
        final_sig_bytes,
        fit_text(
            f"{acceptance_display} | Reason: {rejection_reason}"
            if rejection_reason != "-"
            else acceptance_display,
            38,
        ),
    )

    # ---------- SIGNER PHOTO ----------
    titled_box(
        photo_x,
        bottom_y,
        photo_w,
        bottom_h,
        "FINAL SIGNATURE PHOTO",
        fill=None,
        header_h=18,
        title_size=7,
    )

    if photo_bytes:
        fit_image_fill(
            photo_bytes,
            photo_x + 4,
            bottom_y + 4,
            photo_w - 8,
            bottom_h - 26,
        )
    else:
        draw_centered_text(
            photo_x,
            bottom_y + bottom_h / 2,
            photo_w,
            "No photo captured",
            font="Helvetica",
            size=6,
            color=dark_gray,
        )

    # ---------- TERMS QR ----------
    titled_box(
        terms_x,
        bottom_y,
        terms_w,
        bottom_h,
        "BTC TERMS & CONDITIONS",
        fill=None,
        header_h=18,
        title_size=7,
    )

    terms_url = ticket.get("terms_qr_url") or "https://btc-fleet-backend.onrender.com/qr/terms"

    qr_size = min(terms_w - 12, bottom_h - 44)
    qr_x = terms_x + (terms_w - qr_size) / 2
    qr_y = bottom_y + 35

    draw_qr_code(c, terms_url, qr_x, qr_y, qr_size)

    draw_centered_text(
        terms_x,
        bottom_y + 10,
        terms_w,
        "Scan for terms",
        font="Helvetica",
        size=5.6,
        color=dark_gray,
    )

    # ---------- FOOTER ----------
    c.setFillColor(dark_gray)
    c.setFont("Helvetica", 5.5)
    c.drawCentredString(
        page_w / 2,
        12,
        "Generated by BTC eTicket System",
    )

    c.save()
    return out_path

def generate_qc_eticket_pdf(ticket: dict) -> Path:
    PDF_DIR.mkdir(parents=True, exist_ok=True)

    token = str(ticket.get("token") or uuid.uuid4())
    filename = f"qc_eticket_{token}.pdf"
    out_path = PDF_DIR / filename

    c = canvas.Canvas(str(out_path), pagesize=letter)
    page_w, page_h = letter

    white = colors.white
    black = colors.HexColor("#111111")
    dark_gray = colors.HexColor("#333333")
    line_gray = colors.HexColor("#777777")

    def safe(v, fallback="-"):
        if v is None:
            return fallback
        txt = str(v).strip()
        return txt if txt else fallback

    def clean_text(v, fallback="-"):
        txt = safe(v, fallback)
        replacements = {
            "Â±": "±",
            "Â°": "°",
            "â€“": "–",
            "â€”": "—",
            "\u00a0": " ",
        }
        for bad, good in replacements.items():
            txt = txt.replace(bad, good)
        return txt

    def qty(v):
        try:
            return f"{float(v):.1f}"
        except Exception:
            return "0.0"

    def fit_text(text, max_chars):
        txt = clean_text(text)
        return txt if len(txt) <= max_chars else txt[: max_chars - 3] + "..."

    def draw_centered_text(x, y, w, text, font="Helvetica", size=8, color=black):
        c.setFillColor(color)
        c.setFont(font, size)
        c.drawCentredString(x + w / 2, y, clean_text(text))

    def draw_left_text(x, y, text, font="Helvetica", size=8, color=black):
        c.setFillColor(color)
        c.setFont(font, size)
        c.drawString(x, y, clean_text(text))

    def box(x, y, w, h, fill=None, radius=5, stroke_color=line_gray):
        c.setStrokeColor(stroke_color)
        c.setLineWidth(0.75)
        if fill:
            c.setFillColor(fill)
            c.roundRect(x, y, w, h, radius, stroke=1, fill=1)
        else:
            c.roundRect(x, y, w, h, radius, stroke=1, fill=0)

    def titled_box(x, y, w, h, title, fill=None, header_h=18, title_size=7.5):
        box(x, y, w, h, fill=fill)
        c.setStrokeColor(line_gray)
        c.line(x, y + h - header_h, x + w, y + h - header_h)
        draw_centered_text(
            x,
            y + h - 12,
            w,
            title,
            font="Helvetica-Bold",
            size=title_size,
            color=black,
        )

    def value_box(x, y, w, h, title, value):
        box(x, y, w, h)
        draw_centered_text(x, y + h - 10, w, title, font="Helvetica-Bold", size=6.8)
        draw_centered_text(x, y + 8, w, value, font="Helvetica-Bold", size=10)

    def info_block(x, y, w, h, title, rows):
        titled_box(x, y, w, h, title, header_h=18, title_size=7.8)

        row_y = y + h - 28
        label_x = x + 10
        value_x = x + 138

        for label, value in rows:
            draw_left_text(label_x, row_y, f"{label}:", font="Helvetica-Bold", size=9)
            draw_left_text(value_x, row_y, fit_text(value, 34), font="Helvetica", size=8)
            c.setStrokeColor(colors.Color(0, 0, 0, alpha=0.10))
            c.line(x + 8, row_y - 5, x + w - 8, row_y - 5)
            row_y -= 16

    def draw_logo(x, y, w, h):
        try:
            logo_file = Path("big_town_logo.png")
            if logo_file.exists():
                with open(logo_file, "rb") as f:
                    img = ImageReader(io.BytesIO(f.read()))
                    iw, ih = img.getSize()
                    scale = min(w / iw, h / ih)
                    dw = iw * scale
                    dh = ih * scale
                    c.drawImage(
                        img,
                        x + (w - dw) / 2,
                        y + (h - dh) / 2,
                        width=dw,
                        height=dh,
                        preserveAspectRatio=True,
                        mask="auto",
                    )
                    return
        except Exception:
            pass

        draw_left_text(x, y + h / 2, "BIG TOWN CONCRETE", "Helvetica-Bold", 12)

    product = ticket.get("product")
    mix_number = ticket.get("mix_number") or ""
    mix_description = ticket.get("mix_description") or ""
    mix = parse_mix_details_backend(product)

    product_parts = str(product or "").strip().split()

    if not mix_number:
        mix_number = product_parts[0] if product_parts else "-"

    if not mix_description:
        mix_description = (
            " ".join(product_parts[1:])
            if len(product_parts) > 1
            else mix.get("description") or "-"
        )

    ticket_number = ticket.get("ticket_number") or ticket.get("job_number") or ticket.get("id") or "-"
    customer_name = ticket.get("customer_name")
    address = ticket.get("address")
    job_number = ticket.get("job_number")
    reference_number = ticket.get("reference_number")
    truck_number = ticket.get("truck_number")

    load_dt = parse_iso(ticket.get("load_time"))
    date_str = load_dt.strftime("%m/%d/%Y") if load_dt else "-"
    time_str = load_dt.strftime("%I:%M %p") if load_dt else "-"

    strength_value = mix.get("strength") or ""
    if strength_value and "PSI" in strength_value:
        strength_value = f"{strength_value} in 28 Days"

    raw_weather_text = clean_text(flatten_weather_summary(ticket.get("qc_weather_summary")))
    raw_weather_text = raw_weather_text.replace("Description: - | ", "")
    raw_weather_text = raw_weather_text.replace("Precip Prob:", "Rain Chance:")
    raw_weather_text = raw_weather_text.replace("Cloud Cover:", "Clouds:")

    if "Signed Time CDT:" in raw_weather_text:
        raw_weather_text = raw_weather_text.split("Signed Time CDT:", 1)[0].strip().rstrip("|").strip()

    batch_rows = ticket.get("batch_weights") or ticket.get("batch_weights_json") or None

    default_batch_rows = [
        ["01-Cement", "388.00", "3,880.00", "3,940.00", "1.55", "lb", "", ""],
        ["04-Slag", "129.00", "1,290.00", "1,310.00", "1.55", "lb", "", ""],
        ["06-Natural Sand", "1,400.00", "14,263.11", "14,230.00", "-0.23", "lb", "3.00", "31.46"],
        ["09-Water", "28.50", "230.19", "226.44", "-1.63", "gal", "", ""],
        ["10-#57 Crushed Rock", "1,885.00", "18,793.90", "18,760.00", "-0.18", "lb", "0.50", "-6.71"],
        ["36-SIKA 686 (MRWR)", "41.36", "413.60", "414.00", "0.10", "floz", "0.00", "0.00"],
        ["37-SIKA Air", "2.12", "21.20", "21.00", "-0.94", "floz", "0.00", "0.00"],
    ]

    try:
        if isinstance(batch_rows, str) and batch_rows.strip():
            parsed = json.loads(batch_rows)
            batch_rows = parsed if isinstance(parsed, list) else default_batch_rows
        elif not isinstance(batch_rows, list):
            batch_rows = default_batch_rows
    except Exception:
        batch_rows = default_batch_rows

    c.setFillColor(white)
    c.rect(0, 0, page_w, page_h, stroke=0, fill=1)

    draw_logo(42, page_h - 78, 125, 46)

    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 23)
    c.drawCentredString(page_w / 2, page_h - 60, "BTC QC ETICKET")

    ticket_box_x = page_w - 182
    ticket_box_y = page_h - 80
    ticket_box_w = 140
    ticket_box_h = 48

    box(ticket_box_x, ticket_box_y, ticket_box_w, ticket_box_h)

    c.line(ticket_box_x, ticket_box_y + 26, ticket_box_x + ticket_box_w, ticket_box_y + 26)

    draw_centered_text(
        ticket_box_x,
        ticket_box_y + 34,
        ticket_box_w,
        "TICKET NUMBER",
        font="Helvetica-Bold",
        size=7.6,
    )

    draw_centered_text(
        ticket_box_x,
        ticket_box_y + 9,
        ticket_box_w,
        safe(ticket_number),
        font="Helvetica-Bold",
        size=13,
    )

    margin_x = 40
    gap = 14
    content_w = page_w - (margin_x * 2)
    block_w = (content_w - gap) / 2
    block_y = page_h - 225
    block_h = 118

    customer_rows = [
        ("Customer / Job Name", customer_name),
        ("Address", address),
        ("Job Number", job_number),
        ("PO / Reference", reference_number),
        ("Date", date_str),
        ("Load Time", time_str),
    ]

    mix_rows = [
        ("Mix #", mix_number),
        ("Truck", truck_number),
        ("Description", mix_description),
        ("Strength (ASTM C31)", strength_value),
        ("Slump (ASTM C143)", mix.get("slump")),
        ("Air Content (ASTM C231)", mix.get("air_content")),
    ]

    info_block(margin_x, block_y, block_w, block_h, "CUSTOMER / JOB INFORMATION", customer_rows)
    info_block(margin_x + block_w + gap, block_y, block_w, block_h, "MIX / TRUCK INFORMATION", mix_rows)

    metric_y = block_y - 42
    metric_h = 31
    metric_gap = 10
    metric_w = (content_w - (metric_gap * 2)) / 3

    load_size = ticket.get("quantity") or 0
    delivered_total = ticket.get("delivered_qty_total") or load_size
    order_total = ticket.get("order_total") or load_size

    metrics = [
        ("LOAD SIZE", f"{qty(load_size)} cys"),
        ("QTY DELIVERED TOTAL", f"{qty(delivered_total)} cys"),
        ("ORDER TOTAL", f"{qty(order_total)} cys"),
    ]

    for i, (title, value) in enumerate(metrics):
        value_box(
            margin_x + (metric_w + metric_gap) * i,
            metric_y,
            metric_w,
            metric_h,
            title,
            value,
        )

    weather_y = metric_y - 52
    weather_h = 46

    titled_box(
        margin_x,
        weather_y,
        content_w,
        weather_h,
        "WEATHER CONDITIONS",
        header_h=18,
        title_size=7.5,
    )

    weather_lines = textwrap.wrap(raw_weather_text, width=135)[:2]
    weather_start_y = weather_y + 16

    c.setFillColor(black)
    c.setFont("Helvetica", 7.2)

    for i, line in enumerate(weather_lines):
        c.drawCentredString(
            margin_x + content_w / 2,
            weather_start_y - (i * 9),
            clean_text(line),
        )
    batch_gap = 18
    batch_h = 165
    batch_y = weather_y - batch_gap - batch_h

    titled_box(
        margin_x,
        batch_y,
        content_w,
        batch_h,
        "BATCH WEIGHTS",
        header_h=19,
        title_size=7.4,
    )

    table_x = margin_x + 8
    table_y = batch_y + batch_h - 31
    table_w = content_w - 16

    headers = [
        "Description",
        "Design",
        "Target",
        "Actual",
        "UOM",
        "% Var",
        "Moisture (%)",
        "Water (gal)",
    ]

    col_widths = [120, 60, 68, 68, 36, 48, 55, 52]

    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 6.5)

    current_x = table_x
    for i, header in enumerate(headers):
        if i == 0:
            c.drawString(current_x + 2, table_y, header)
        else:
            c.drawRightString(current_x + col_widths[i] - 3, table_y, header)
        current_x += col_widths[i]

    c.setStrokeColor(line_gray)
    c.line(table_x, table_y - 4, table_x + table_w, table_y - 4)

    row_y = table_y - 14
    c.setFont("Helvetica", 6.25)

    for row in batch_rows[:7]:
        c.setFont("Helvetica-Bold", 6.25)
        current_x = table_x

        reordered = [
            row[0],
            row[1],
            row[2],
            row[3],
            row[5],
            row[4],
            row[6],
            row[7],
        ]

        for i, value in enumerate(reordered):
            if i in [1, 2, 3]:
                try:
                    num = float(str(value).replace(",", ""))
                    value = f"{int(round(num)):,}"
                except Exception:
                    pass
            elif i == 5:
                try:
                    value = f"{float(value):.1f}"
                except Exception:
                    pass

            text = fit_text(value, 22 if i == 0 else 11)

            if i == 0:
                c.drawString(current_x + 2, row_y, text)
            else:
                c.drawRightString(current_x + col_widths[i] - 3, row_y, text)

            current_x += col_widths[i]

        c.setStrokeColor(colors.Color(0, 0, 0, alpha=0.10))
        c.line(table_x, row_y - 5, table_x + table_w, row_y - 5)
        row_y -= 15.8

    # ---------- QC DISCLAIMER ----------
    disclaimer_text = (
        'This "BTC QC ETICKET" is for INFORMATIONAL PURPOSES ONLY and does not constitute '
        "the final or official delivery ticket signed by Customer for the specific load of "
        "concrete being sampled. If the final and official delivery ticket is needed, it can "
        "be obtained from the Customer/Purchaser indicated at the top of this BTC QC ETICKET."
    )

    disclaimer_y = batch_y - 58
    disclaimer_h = 44

    box(margin_x, disclaimer_y, content_w, disclaimer_h)

    wrapped_disclaimer = textwrap.wrap(disclaimer_text, width=130)

    c.setFillColor(dark_gray)
    c.setFont("Helvetica-Bold", 6.6)

    line_y = disclaimer_y + disclaimer_h - 14

    for line in wrapped_disclaimer[:3]:
        c.drawCentredString(
            margin_x + content_w / 2,
            line_y,
            clean_text(line),
        )
        line_y -= 11

    c.setFillColor(dark_gray)
    c.setFont("Helvetica", 5.5)
    c.drawCentredString(page_w / 2, 12, "Generated by BTC eTicket System")

    c.save()
    return out_path

def create_eticket_from_job_if_needed(conn, truck_number: str):
    cur = conn.cursor()

    job_row = cur.execute(
        """
        SELECT *
        FROM job_assignments
        WHERE truck_number = ?
        """,
        (truck_number,),
    ).fetchone()

    if not job_row:
        return None

    job = dict(job_row)
    assignment_token = (job.get("assignment_token") or "").strip()

    if not assignment_token:
        return None

    existing = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE job_instance_id = ?
        AND LOWER(COALESCE(status, 'pending')) <> 'signed'
        ORDER BY id DESC
        LIMIT 1
        """,
        (assignment_token,),
    ).fetchone()

    if existing:
        return dict(existing)

    existing_for_truck = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE truck_number = ?
        AND LOWER(COALESCE(status, 'pending')) <> 'signed'
        ORDER BY id DESC
        LIMIT 1
        """,
        (truck_number,),
    ).fetchone()

    if existing_for_truck:
        existing_ticket = dict(existing_for_truck)

        cur.execute(
            """
            UPDATE etickets
            SET job_instance_id = ?,
                customer_name = ?,
                job_number = ?,
                address = ?,
                plant = ?,
                truck_number = ?,
                product = ?,
                quantity = ?,
                delivered_qty_total = ?,
                order_total = ?,
                load_time = COALESCE(load_time, ?)
            WHERE id = ?
            """,
            (
                assignment_token,
                job.get("customer_name") or existing_ticket.get("customer_name") or "Customer",
                job.get("job_number") or existing_ticket.get("job_number") or "",
                job.get("address") or existing_ticket.get("address") or "",
                job.get("plant") or existing_ticket.get("plant") or "",
                truck_number,
                job.get("product") or existing_ticket.get("product") or "Concrete Mix",

                float(job.get("ordered_qty") or existing_ticket.get("quantity") or 0),

                float(job.get("delivered_qty") or existing_ticket.get("delivered_qty_total") or 0),

                float(job.get("ordered_qty") or existing_ticket.get("order_total") or 0),

                utc_now(),
                existing_ticket["id"],
            ),
        )

        rebound = cur.execute(
            """
            SELECT *
            FROM etickets
            WHERE id = ?
            """,
            (existing_ticket["id"],),
        ).fetchone()

        return dict(rebound) if rebound else existing_ticket

    token = str(uuid.uuid4())
    ticket_number = (
        job.get("job_number")
        if job.get("job_number")
        else f"{re.sub(r'\\D', '', truck_number)[:4]}{str(int(datetime.now(APP_TIMEZONE).timestamp()))[-6:]}"
    )

    cur.execute(
        """
        INSERT INTO etickets (
            job_instance_id,
            ticket_number,
            customer_name,
            job_number,
            address,
            plant,
            truck_number,
            product,
            mix_number,
            mix_description,
            quantity,
            delivered_qty_total,
            order_total,
            token,
            status,
            load_time,
            time_limit_minutes,
            batch_weights_qr_url,
            terms_qr_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            assignment_token,
            ticket_number,
            job.get("customer_name") or "Customer",
            job.get("job_number") or "",
            job.get("address") or "",
            job.get("plant") or "",
            truck_number,
            job.get("product") or "Concrete Mix",
            "",
            "",
            float(job.get("ordered_qty") or existing_ticket.get("quantity") or 0),
            float(job.get("delivered_qty") or existing_ticket.get("delivered_qty_total") or 0),
            float(job.get("ordered_qty") or existing_ticket.get("order_total") or 0),
            token,
            "pending",
            utc_now(),
            90,
            "https://btc-fleet-backend.onrender.com/qr/batch-weights",
            "https://btc-fleet-backend.onrender.com/qr/terms",
        ),
    )

    eticket_id = cur.lastrowid
    new_ticket = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE id = ?
        """,
        (eticket_id,),
    ).fetchone()

    return dict(new_ticket) if new_ticket else None


def init_db():
    PDF_DIR.mkdir(parents=True, exist_ok=True)

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'admin',
            active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS truck_locations (
            truck_number TEXT PRIMARY KEY,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            status TEXT,
            job_number TEXT,
            speed_mph REAL DEFAULT 0,
            driver_id INTEGER,
            device_uuid TEXT,
            last_updated TEXT NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS job_assignments (
            truck_number TEXT PRIMARY KEY,
            assignment_token TEXT NOT NULL,
            job_number TEXT,
            customer_name TEXT,
            customer_email TEXT,
            address TEXT NOT NULL,
            plant TEXT,
            product TEXT,
            ordered_qty REAL DEFAULT 0,
            delivered_qty REAL DEFAULT 0,
            assigned_at TEXT NOT NULL,
            en_route_started_at TEXT,
            arrived_on_site_at TEXT,
            pouring_started_at TEXT,
            pouring_completed_at TEXT,
            washed_out_at TEXT,
            returning_at TEXT,
            completed_at TEXT
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS truck_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            truck_number TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            status TEXT,
            job_number TEXT,
            speed_mph REAL DEFAULT 0,
            recorded_at TEXT NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS truck_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            truck_number TEXT NOT NULL,
            event_type TEXT NOT NULL,
            details TEXT,
            created_at TEXT NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS digitalfleet_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id TEXT UNIQUE,
            event_type TEXT,
            event_time TEXT,
            truck_name TEXT,
            ticket_number TEXT,
            ticket_id TEXT,
            order_number TEXT,
            order_id TEXT,
            ticket_event_code INTEGER,
            ticket_status_code INTEGER,
            truck_event_code INTEGER,
            truck_status_code INTEGER,
            latitude REAL,
            longitude REAL,
            speed REAL,
            raw_json TEXT,
            created_at TEXT NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS drivers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            pin TEXT NOT NULL UNIQUE,
            active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_uuid TEXT NOT NULL UNIQUE,
            device_name TEXT,
            assigned_truck_number TEXT UNIQUE,
            current_driver_id INTEGER,
            active INTEGER NOT NULL DEFAULT 1,
            last_seen TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY(current_driver_id) REFERENCES drivers(id)
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS driver_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            driver_id INTEGER NOT NULL,
            device_uuid TEXT NOT NULL,
            truck_number TEXT,
            signed_in_at TEXT NOT NULL,
            signed_out_at TEXT,
            active INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY(driver_id) REFERENCES drivers(id)
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS etickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_instance_id TEXT,
            ticket_number TEXT,
            customer_name TEXT,
            job_number TEXT,
            address TEXT,
            plant TEXT,
            truck_number TEXT,
            product TEXT,
            quantity REAL,
            token TEXT UNIQUE,
            status TEXT DEFAULT 'pending',
            signed_name TEXT,
            signed_at TEXT,
            signed_latitude REAL,
            signed_longitude REAL,
            water_choice TEXT,
            water_added REAL,
            ticket_acceptance TEXT,
            email_sent_to TEXT,
            email_sent_at TEXT,
            signature_data_url TEXT,
            curb_line_signature_data_url TEXT,
            photo_data_url TEXT,
            weather_summary TEXT,
            weather_link TEXT,
            batch_weights_qr_url TEXT,
            terms_qr_url TEXT,
            load_time TEXT,
            time_limit_minutes INTEGER DEFAULT 90
        )
        """
    )

    try:
        cur.execute("ALTER TABLE etickets ADD COLUMN curb_line_signed_at TEXT")
    except:
        pass

    try:
        cur.execute("ALTER TABLE etickets ADD COLUMN curb_line_signature_data_url TEXT")
    except:
        pass

    try:
        cur.execute("ALTER TABLE etickets ADD COLUMN qc_water_added REAL DEFAULT 0")
    except:
        pass

    try:
        cur.execute("ALTER TABLE etickets ADD COLUMN customer_water_added REAL DEFAULT 0")
    except:
        pass

    try:
        cur.execute("ALTER TABLE etickets ADD COLUMN photo_data_url TEXT")
    except:
        pass

    try:
        cur.execute("ALTER TABLE etickets ADD COLUMN terms_qr_url TEXT")
    except:
        pass

    try:
        cur.execute("ALTER TABLE etickets ADD COLUMN ticket_acceptance TEXT")
    except:
        pass

    ensure_eticket_columns(conn)

    conn.commit()
    conn.close()


@app.on_event("startup")
def startup():
    init_db()
    seed_admins()


class AdminLoginRequest(BaseModel):
    username: str
    password: str

class AdminCreateRequest(BaseModel):
    name: str
    username: str
    password: str
    role: Optional[str] = "admin"
    active: Optional[bool] = True

class AdminChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@app.post("/admin/change-password")
def change_admin_password(
    payload: AdminChangePasswordRequest,
    admin=Depends(require_admin),
):
    current_password = payload.current_password.strip()
    new_password = payload.new_password.strip()

    if len(new_password) < 8:
        raise HTTPException(status_code=400, detail="New password must be at least 8 characters")

    conn = get_conn()
    cur = conn.cursor()

    row = cur.execute(
        """
        SELECT id, password_hash
        FROM admin_users
        WHERE id = ?
        """,
        (admin["id"],),
    ).fetchone()

    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Admin not found")

    if row["password_hash"] != hash_password(current_password):
        conn.close()
        raise HTTPException(status_code=401, detail="Current password is incorrect")

    cur.execute(
        """
        UPDATE admin_users
        SET password_hash = ?
        WHERE id = ?
        """,
        (hash_password(new_password), admin["id"]),
    )

    conn.commit()
    conn.close()

    return {"success": True}


class GPSUpdate(BaseModel):
    truck_number: str
    latitude: float
    longitude: float
    status: Optional[str] = None
    job_number: Optional[str] = ""
    device_uuid: Optional[str] = ""
    driver_id: Optional[int] = None
    speed_mph: Optional[float] = 0


class AssignJobRequest(BaseModel):
    truck_number: str
    job_number: Optional[str] = ""
    customer_name: Optional[str] = ""
    customer_email: Optional[str] = ""
    address: str
    plant: Optional[str] = ""
    product: Optional[str] = ""
    ordered_qty: Optional[float] = 0

class QCWeatherRequest(BaseModel):
    latitude: float
    longitude: float


class DeliveredQtyRequest(BaseModel):
    delivered_qty: float


class EventRequest(BaseModel):
    details: Optional[str] = ""


class DriverCreateRequest(BaseModel):
    name: str
    pin: str
    active: Optional[bool] = True


class DriverLoginRequest(BaseModel):
    pin: str
    device_uuid: str
    device_name: Optional[str] = ""


class DriverLogoutRequest(BaseModel):
    device_uuid: str


class DeviceAssignRequest(BaseModel):
    device_uuid: str
    device_name: Optional[str] = ""
    truck_number: str


class DispatchStatusRequest(BaseModel):
    status: str
    details: Optional[str] = ""


class ETicketCreateRequest(BaseModel):
    ticket_number: str
    customer_name: str
    address: str
    plant: str
    truck_number: str
    product: str
    mix_number: Optional[str] = None
    mix_description: Optional[str] = None
    quantity: float
    delivered_qty_total: Optional[float] = None
    order_total: Optional[float] = None


class ETicketSignRequest(BaseModel):
    name: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    water_choice: Optional[str] = None
    water_added: Optional[float] = None
    qc_water_added: Optional[float] = None
    customer_water_added: Optional[float] = None
    ticket_acceptance: Optional[str] = None
    curb_line_status: Optional[str] = None
    signature_data_url: Optional[str] = None
    curb_line_signature_data_url: Optional[str] = None
    curb_line_signed_at: Optional[str] = None
    photo_data_url: Optional[str] = None
    weather_summary: Optional[str] = None
    weather_link: Optional[str] = None
    batch_weights_qr_url: Optional[str] = None
    terms_qr_url: Optional[str] = None
    load_time: Optional[str] = None
    time_limit_minutes: Optional[int] = 90


class ETicketReassignRequest(BaseModel):
    ticket_id: int
    assigned_to_type: str
    assigned_to_id: str
    assigned_to_name: str

class ETicketPdfExportRequest(BaseModel):
    ticket_ids: list[int]


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/api/digitalfleet/push")
async def digitalfleet_push(payload: dict):

    print("\n==============================")
    print("DIGITAL FLEET EVENT RECEIVED")
    print(json.dumps(payload, indent=2))
    print("==============================\n")

    events = payload.get("Events") or []

    conn = get_conn()
    cur = conn.cursor()

    created_or_updated = []

    try:
        for event in events:
            message_id = str(event.get("MessageId") or "")

            try:
                cur.execute(
                    """
                    INSERT OR IGNORE INTO digitalfleet_events (
                        message_id,
                        event_type,
                        event_time,
                        truck_name,
                        ticket_number,
                        ticket_id,
                        order_number,
                        order_id,
                        ticket_event_code,
                        ticket_status_code,
                        truck_event_code,
                        truck_status_code,
                        latitude,
                        longitude,
                        speed,
                        raw_json,
                        created_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        message_id,
                        event.get("EventType"),
                        event.get("EventTime"),
                        event.get("TruckName"),
                        event.get("TicketNumber"),
                        str(event.get("TicketId") or ""),
                        event.get("OrderNumber"),
                        str(event.get("OrderId") or ""),
                        event.get("TicketEventCode"),
                        event.get("TicketStatusCode"),
                        event.get("TruckEventCode"),
                        event.get("TruckStatusCode"),
                        event.get("Latitude"),
                        event.get("Longitude"),
                        event.get("Speed"),
                        json.dumps(event),
                        utc_now(),
                    ),
                )
            except Exception as log_error:
                print("Digital Fleet log insert failed:", log_error)

            truck_number = normalize_df_truck_name(event.get("TruckName"))
            status = digitalfleet_status_from_event(event)

            if truck_number and event.get("Latitude") is not None and event.get("Longitude") is not None:
                cur.execute(
                    """
                    INSERT INTO truck_locations (
                        truck_number,
                        latitude,
                        longitude,
                        status,
                        job_number,
                        speed_mph,
                        last_updated
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(truck_number) DO UPDATE SET
                        latitude = excluded.latitude,
                        longitude = excluded.longitude,
                        status = COALESCE(NULLIF(excluded.status, ''), truck_locations.status),
                        job_number = COALESCE(NULLIF(excluded.job_number, ''), truck_locations.job_number),
                        speed_mph = excluded.speed_mph,
                        last_updated = excluded.last_updated
                    """,
                    (
                        truck_number,
                        float(event.get("Latitude")),
                        float(event.get("Longitude")),
                        status,
                        str(event.get("OrderNumber") or ""),
                        float(event.get("Speed") or 0),
                        event.get("EventTime") or utc_now(),
                    ),
                )

            if str(event.get("EventType") or "").upper() == "TICKET":
                ticket = create_or_update_eticket_from_digitalfleet(conn, event)
                if ticket:
                    created_or_updated.append({
                        "ticket_number": ticket.get("ticket_number"),
                        "truck_number": ticket.get("truck_number"),
                        "token": ticket.get("token"),
                        "url": build_eticket_frontend_url(ticket.get("token")),
                    })

        conn.commit()

    except Exception as e:
        conn.rollback()
        print("DIGITAL FLEET PUSH ERROR:", str(e))
        return {"ok": False, "error": str(e)}

    finally:
        conn.close()

    return {
        "ok": True,
        "events_received": len(events),
        "etickets_created_or_updated": created_or_updated,
    }

@app.post("/admin/login")
def admin_login(payload: AdminLoginRequest):
    conn = get_conn()
    cur = conn.cursor()

    admin = cur.execute(
        """
        SELECT id, name, username, password_hash, role, active
        FROM admin_users
        WHERE username = ?
        """,
        (payload.username.strip().lower(),),
    ).fetchone()

    conn.close()

    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if int(admin["active"]) != 1:
        raise HTTPException(status_code=403, detail="Admin inactive")

    if admin["password_hash"] != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = secrets.token_urlsafe(32)
    ADMIN_TOKENS[token] = int(admin["id"])

    return {
        "success": True,
        "token": token,
        "admin": {
            "id": int(admin["id"]),
            "name": admin["name"],
            "username": admin["username"],
            "role": admin["role"],
        },
    }


@app.post("/admin/users")
def create_admin_user(payload: AdminCreateRequest, admin=Depends(require_admin)):
    name = payload.name.strip()
    username = payload.username.strip().lower()
    password = payload.password.strip()
    role = (payload.role or "admin").strip().lower()

    if not name:
        raise HTTPException(status_code=400, detail="Name is required")

    if not username:
        raise HTTPException(status_code=400, detail="Username is required")

    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    conn = get_conn()
    cur = conn.cursor()

    existing = cur.execute(
        """
        SELECT id
        FROM admin_users
        WHERE LOWER(username) = ?
        """,
        (username,),
    ).fetchone()

    if existing:
        conn.close()
        raise HTTPException(status_code=409, detail="Username already exists")

    cur.execute(
        """
        INSERT INTO admin_users (
            name,
            username,
            password_hash,
            role,
            active,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            name,
            username,
            hash_password(password),
            role,
            1 if payload.active else 0,
            utc_now(),
        ),
    )

    conn.commit()
    admin_id = cur.lastrowid
    conn.close()

    return {
        "success": True,
        "admin_id": admin_id,
        "username": username,
    }


@app.get("/admin/me")
def admin_me(admin=Depends(require_admin)):
    return admin

@app.get("/admin/users")
def get_admin_users(admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT id, name, username, role, active, created_at
        FROM admin_users
        ORDER BY name
        """
    ).fetchall()

    conn.close()
    return [dict(row) for row in rows]


@app.post("/admin/drivers")
def create_driver(payload: DriverCreateRequest, admin=Depends(require_admin)):
    name = payload.name.strip()
    pin = payload.pin.strip()

    if not name:
        raise HTTPException(status_code=400, detail="Driver name required")

    if not PIN_REGEX.match(pin):
        raise HTTPException(status_code=400, detail="PIN must be exactly 6 digits")

    conn = get_conn()
    cur = conn.cursor()

    existing = cur.execute("SELECT id FROM drivers WHERE pin = ?", (pin,)).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=409, detail="PIN is already assigned to another driver")

    cur.execute(
        """
        INSERT INTO drivers (name, pin, active, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (name, pin, 1 if payload.active else 0, utc_now()),
    )

    conn.commit()
    driver_id = cur.lastrowid
    conn.close()

    return {"success": True, "driver_id": driver_id}


@app.put("/admin/drivers/{driver_id}")
def update_driver(driver_id: int, payload: DriverCreateRequest, admin=Depends(require_admin)):
    pin = payload.pin.strip()
    name = payload.name.strip()

    if not name:
        raise HTTPException(status_code=400, detail="Driver name required")

    if not PIN_REGEX.match(pin):
        raise HTTPException(status_code=400, detail="PIN must be exactly 6 digits")

    conn = get_conn()
    cur = conn.cursor()

    existing = cur.execute(
        "SELECT id FROM drivers WHERE pin = ? AND id != ?",
        (pin, driver_id),
    ).fetchone()

    if existing:
        conn.close()
        raise HTTPException(status_code=409, detail="PIN already in use")

    cur.execute(
        """
        UPDATE drivers
        SET name = ?, pin = ?, active = ?
        WHERE id = ?
        """,
        (name, pin, 1 if payload.active else 0, driver_id),
    )

    conn.commit()
    conn.close()

    return {"success": True}


@app.delete("/admin/drivers/{driver_id}")
def delete_driver(driver_id: int, admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM drivers WHERE id = ?", (driver_id,))
    conn.commit()
    conn.close()
    return {"success": True}


@app.get("/admin/drivers")
def get_drivers(admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT id, name, pin, active, created_at
        FROM drivers
        ORDER BY name
        """
    ).fetchall()

    conn.close()
    return [dict(r) for r in rows]


@app.get("/admin/devices")
def get_devices(admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT d.id,
               d.device_uuid,
               d.device_name,
               d.assigned_truck_number,
               d.active,
               d.last_seen,
               dr.name AS driver_name
        FROM devices d
        LEFT JOIN drivers dr ON d.current_driver_id = dr.id
        ORDER BY d.device_name, d.device_uuid
        """
    ).fetchall()

    conn.close()
    return [dict(r) for r in rows]


@app.post("/admin/devices/assign")
def assign_device(payload: DeviceAssignRequest, admin=Depends(require_admin)):
    device_uuid = payload.device_uuid.strip()
    truck_number = payload.truck_number.strip()
    now = utc_now()

    if not device_uuid:
        raise HTTPException(status_code=400, detail="device_uuid required")
    if not truck_number:
        raise HTTPException(status_code=400, detail="truck_number required")

    conn = get_conn()
    cur = conn.cursor()

    existing = cur.execute(
        """
        SELECT device_uuid
        FROM devices
        WHERE assigned_truck_number = ?
          AND device_uuid != ?
          AND active = 1
        """,
        (truck_number, device_uuid),
    ).fetchone()

    if existing:
        conn.close()
        raise HTTPException(
            status_code=409,
            detail=f"Truck {truck_number} is already assigned to another active tablet",
        )

    cur.execute(
        """
        INSERT INTO devices (device_uuid, device_name, assigned_truck_number, active, last_seen, created_at)
        VALUES (?, ?, ?, 1, ?, ?)
        ON CONFLICT(device_uuid) DO UPDATE SET
            device_name=excluded.device_name,
            assigned_truck_number=excluded.assigned_truck_number,
            active=1,
            last_seen=excluded.last_seen
        """,
        (device_uuid, payload.device_name or "", truck_number, now, now),
    )

    conn.commit()
    conn.close()

    return {"success": True}

@app.post("/admin/etickets/reassign")
def reassign_eticket(
    payload: ETicketReassignRequest,
    admin=Depends(require_admin),
):
    assigned_to_type = (payload.assigned_to_type or "").strip().lower()
    assigned_to_id = (payload.assigned_to_id or "").strip()
    assigned_to_name = (payload.assigned_to_name or "").strip()

    if assigned_to_type not in ["truck", "admin"]:
        raise HTTPException(
            status_code=400,
            detail="assigned_to_type must be truck or admin",
        )

    if not assigned_to_id:
        raise HTTPException(
            status_code=400,
            detail="assigned_to_id is required",
        )

    if not assigned_to_name:
        raise HTTPException(
            status_code=400,
            detail="assigned_to_name is required",
        )

    conn = get_conn()
    cur = conn.cursor()

    ticket = cur.execute(
        """
        SELECT id, ticket_number, status
        FROM etickets
        WHERE id = ?
        """,
        (payload.ticket_id,),
    ).fetchone()

    if not ticket:
        conn.close()
        raise HTTPException(status_code=404, detail="eTicket not found")

    if str(ticket["status"] or "").lower() == "signed":
        conn.close()
        raise HTTPException(
            status_code=400,
            detail="Signed tickets cannot be reassigned",
        )

    cur.execute(
        """
        UPDATE etickets
        SET assigned_to_type = ?,
            assigned_to_id = ?,
            assigned_to_name = ?,
            assigned_at = ?,
            assigned_by = ?
        WHERE id = ?
        """,
        (
            assigned_to_type,
            assigned_to_id,
            assigned_to_name,
            utc_now(),
            admin.get("name") or admin.get("username") or "Admin",
            payload.ticket_id,
        ),
    )

    conn.commit()

    updated = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE id = ?
        """,
        (payload.ticket_id,),
    ).fetchone()

    conn.close()

    return dict(updated)

@app.get("/admin/etickets")
def admin_get_etickets(
    tab: str = "pending",
    admin=Depends(require_admin),
):
    tab = (tab or "pending").strip().lower()

    conn = get_conn()
    auto_archive_old_pending_etickets(conn)
    cur = conn.cursor()

    if tab == "pending":
        rows = cur.execute(
            """
            SELECT *
            FROM etickets
            WHERE LOWER(COALESCE(status, 'pending')) <> 'signed'
                AND COALESCE(archived_at, '') = ''
            ORDER BY id DESC
            """
        ).fetchall()

    elif tab == "assigned":
        rows = cur.execute(
            """
            SELECT *
            FROM etickets
            WHERE LOWER(COALESCE(status, 'pending')) <> 'signed'
                AND COALESCE(archived_at, '') = ''
            AND COALESCE(assigned_to_id, '') <> ''
            AND assigned_to_type = 'admin'
            AND assigned_to_id = ?
            ORDER BY assigned_at DESC, id DESC
            """,
            (str(admin.get("id")),),
        ).fetchall()

    elif tab == "signed":
        rows = cur.execute(
            """
            SELECT *
            FROM etickets
            WHERE LOWER(COALESCE(status, '')) = 'signed'
                AND COALESCE(archived_at, '') = ''
            ORDER BY signed_at DESC, id DESC
            """
        ).fetchall()

    elif tab == "archived":
        rows = cur.execute(
            """
            SELECT *
            FROM etickets
            WHERE COALESCE(archived_at, '') <> ''
            ORDER BY archived_at DESC, id DESC
            """
        ).fetchall()

    else:
        conn.close()
        raise HTTPException(
            status_code=400,
            detail="tab must be pending, signed, assigned, or archived",
        )

    conn.close()
    return [dict(row) for row in rows]

@app.post("/admin/etickets/export-pdfs")
def export_eticket_pdfs(payload: ETicketPdfExportRequest, admin=Depends(require_admin)):
    if not payload.ticket_ids:
        raise HTTPException(status_code=400, detail="No tickets selected")

    conn = get_conn()
    cur = conn.cursor()

    placeholders = ",".join(["?"] * len(payload.ticket_ids))

    rows = cur.execute(
        f"""
        SELECT *
        FROM etickets
        WHERE id IN ({placeholders})
          AND LOWER(COALESCE(status, '')) = 'signed'
        ORDER BY signed_at ASC, id ASC
        """,
        payload.ticket_ids,
    ).fetchall()

    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail="No signed tickets found")

    PDF_DIR.mkdir(parents=True, exist_ok=True)

    writer = PdfWriter()

    added = 0

    for row in rows:
        ticket = dict(row)

        pdf_path = generate_eticket_pdf(ticket)

        if pdf_path.exists():
            reader = PdfReader(str(pdf_path))

            for page in reader.pages:
                writer.add_page(page)

            added += 1

    if added == 0:
        raise HTTPException(status_code=404, detail="No PDFs could be generated")

    output_name = f"filtered_signed_etickets_{int(datetime.now().timestamp())}.pdf"
    output_path = PDF_DIR / output_name

    with open(output_path, "wb") as f:
        writer.write(f)

    return FileResponse(
        path=str(output_path),
        media_type="application/pdf",
        filename=output_name,
    )

@app.get("/admin/etickets/reassign-options")
def get_eticket_reassign_options(admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    admin_rows = cur.execute(
        """
        SELECT id, name, username
        FROM admin_users
        WHERE active = 1
        ORDER BY name
        """
    ).fetchall()

    truck_rows = cur.execute(
        """
        SELECT DISTINCT truck_number
        FROM truck_locations
        WHERE truck_number IS NOT NULL
        AND TRIM(truck_number) <> ''
        ORDER BY truck_number
        """
    ).fetchall()

    conn.close()

    admins = [
        {
            "type": "admin",
            "id": str(row["id"]),
            "name": row["name"] or row["username"],
            "label": f"Admin - {row['name'] or row['username']}",
        }
        for row in admin_rows
    ]

    trucks = [
        {
            "type": "truck",
            "id": row["truck_number"],
            "name": row["truck_number"],
            "label": f"Truck - {row['truck_number']}",
        }
        for row in truck_rows
    ]

    return {
        "admins": admins,
        "trucks": trucks,
    }

@app.post("/api/etickets/{token}/qc-weather")
def save_qc_weather(token: str, payload: QCWeatherRequest):
    now = utc_now()

    weather_summary = None
    weather_link = None

    try:
        weather_snapshot = fetch_historical_weather_snapshot(
            lat=float(payload.latitude),
            lon=float(payload.longitude),
            signed_at_iso=now,
        )

        if weather_snapshot:
            weather_summary = weather_snapshot.get("weather_summary")
            weather_link = weather_snapshot.get("weather_link")

    except Exception as e:
        print("QC weather lookup failed:", str(e))
        weather_summary = "Weather unavailable"
        weather_link = None

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE etickets
        SET qc_signed_latitude = ?,
            qc_signed_longitude = ?,
            qc_weather_summary = ?,
            qc_weather_link = ?,
            qc_weather_at = ?
        WHERE token = ?
        """,
        (
            payload.latitude,
            payload.longitude,
            weather_summary,
            weather_link,
            now,
            token,
        ),
    )

    conn.commit()
    conn.close()

    return {"success": True}


@app.post("/admin/devices/unassign/{device_uuid}")
def unassign_device(device_uuid: str, admin=Depends(require_admin)):
    now = utc_now()
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE devices
        SET assigned_truck_number = NULL,
            current_driver_id = NULL,
            active = 0,
            last_seen = ?
        WHERE device_uuid = ?
        """,
        (now, device_uuid.strip()),
    )

    cur.execute(
        """
        UPDATE driver_sessions
        SET active = 0, signed_out_at = ?
        WHERE device_uuid = ? AND active = 1
        """,
        (now, device_uuid.strip()),
    )

    conn.commit()
    conn.close()

    return {"success": True}


@app.delete("/admin/devices/{device_uuid}")
def delete_device(device_uuid: str, admin=Depends(require_admin)):
    now = utc_now()
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE driver_sessions
        SET active = 0, signed_out_at = ?
        WHERE device_uuid = ? AND active = 1
        """,
        (now, device_uuid.strip()),
    )

    cur.execute("DELETE FROM devices WHERE device_uuid = ?", (device_uuid.strip(),))

    conn.commit()
    conn.close()

    return {"success": True}


@app.get("/admin/sessions")
def get_driver_sessions(admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT s.id,
               s.device_uuid,
               s.truck_number,
               s.signed_in_at,
               s.signed_out_at,
               s.active,
               d.name AS driver_name
        FROM driver_sessions s
        LEFT JOIN drivers d ON s.driver_id = d.id
        ORDER BY s.signed_in_at DESC
        """
    ).fetchall()

    conn.close()
    return [dict(r) for r in rows]

@app.get("/api/digitalfleet/events-debug")
def digitalfleet_events_debug(limit: int = 20):
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT *
        FROM digitalfleet_events
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()

    conn.close()

    return [dict(row) for row in rows]


@app.get("/devices/{device_uuid}")
def get_device(device_uuid: str):
    conn = get_conn()
    cur = conn.cursor()

    row = cur.execute(
        """
        SELECT d.device_uuid,
               d.device_name,
               d.assigned_truck_number,
               d.current_driver_id,
               d.active,
               d.last_seen,
               dr.name AS driver_name
        FROM devices d
        LEFT JOIN drivers dr ON d.current_driver_id = dr.id
        WHERE d.device_uuid = ?
        """,
        (device_uuid.strip(),),
    ).fetchone()

    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Device not found")

    return dict(row)

@app.get("/api/etickets/{token}/qc-pdf")
def get_qc_eticket_pdf(token: str):
    conn = get_conn()
    cur = conn.cursor()

    row = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE token = ?
        """,
        (token,),
    ).fetchone()

    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Ticket not found")

    ticket = dict(row)
    pdf_path = generate_qc_eticket_pdf(ticket)

    try:
        upload_pdf_to_r2(pdf_path, ticket["token"], "qc")
    except Exception as e:
        print("QC PDF R2 upload failed:", str(e))

    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=pdf_path.name,
    )


@app.post("/drivers/login")
def driver_login(payload: DriverLoginRequest):
    pin = payload.pin.strip()
    device_uuid = payload.device_uuid.strip()

    if not PIN_REGEX.match(pin):
        raise HTTPException(status_code=400, detail="PIN must be exactly 6 digits")

    if not device_uuid:
        raise HTTPException(status_code=400, detail="device_uuid required")

    now = utc_now()

    conn = get_conn()
    cur = conn.cursor()

    driver = cur.execute(
        """
        SELECT id, name, active
        FROM drivers
        WHERE pin = ?
        """,
        (pin,),
    ).fetchone()

    if not driver:
        conn.close()
        raise HTTPException(status_code=401, detail="Invalid PIN")

    if int(driver["active"]) != 1:
        conn.close()
        raise HTTPException(status_code=403, detail="Driver inactive")

    device = cur.execute(
        """
        SELECT device_uuid, device_name, assigned_truck_number, active
        FROM devices
        WHERE device_uuid = ?
        """,
        (device_uuid,),
    ).fetchone()

    if not device:
        conn.close()
        raise HTTPException(status_code=404, detail="Tablet is not registered. Assign it from Admin first.")

    truck_number = device["assigned_truck_number"]
    if not truck_number:
        conn.close()
        raise HTTPException(status_code=409, detail="Tablet is not assigned to a truck")

    cur.execute(
        """
        UPDATE devices
        SET current_driver_id = ?,
            active = 1,
            last_seen = ?,
            device_name = ?
        WHERE device_uuid = ?
        """,
        (int(driver["id"]), now, payload.device_name or device["device_name"] or "", device_uuid),
    )

    cur.execute(
        """
        UPDATE driver_sessions
        SET active = 0, signed_out_at = ?
        WHERE device_uuid = ? AND active = 1
        """,
        (now, device_uuid),
    )

    cur.execute(
        """
        INSERT INTO driver_sessions (driver_id, device_uuid, truck_number, signed_in_at, active)
        VALUES (?, ?, ?, ?, 1)
        """,
        (int(driver["id"]), device_uuid, truck_number, now),
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "driver_id": int(driver["id"]),
        "driver_name": driver["name"],
        "truck_number": truck_number,
        "signed_in_at": now,
    }


@app.post("/drivers/logout")
def driver_logout(payload: DriverLogoutRequest):
    device_uuid = payload.device_uuid.strip()
    now = utc_now()

    if not device_uuid:
        raise HTTPException(status_code=400, detail="device_uuid required")

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE driver_sessions
        SET active = 0, signed_out_at = ?
        WHERE device_uuid = ? AND active = 1
        """,
        (now, device_uuid),
    )

    cur.execute(
        """
        UPDATE devices
        SET current_driver_id = NULL,
            last_seen = ?
        WHERE device_uuid = ?
        """,
        (now, device_uuid),
    )

    conn.commit()
    conn.close()

    return {"success": True, "signed_out_at": now}


@app.post("/gps")
def post_gps(payload: GPSUpdate):
    now = utc_now()
    truck_number = payload.truck_number.strip()
    incoming_status = (payload.status or "").strip()
    incoming_job_number = (payload.job_number or "").strip()
    device_uuid = (payload.device_uuid or "").strip()
    speed_mph = round(float(payload.speed_mph or 0), 1)

    conn = get_conn()
    cur = conn.cursor()

    if device_uuid:
        device = cur.execute(
            """
            SELECT assigned_truck_number
            FROM devices
            WHERE device_uuid = ?
            """,
            (device_uuid,),
        ).fetchone()

        if device and device["assigned_truck_number"] and device["assigned_truck_number"] != truck_number:
            conn.close()
            raise HTTPException(status_code=409, detail="Truck number does not match device assignment")

        cur.execute(
            """
            UPDATE devices
            SET last_seen = ?, active = 1
            WHERE device_uuid = ?
            """,
            (now, device_uuid),
        )

    existing_row = cur.execute(
        """
        SELECT status, job_number
        FROM truck_locations
        WHERE truck_number = ?
        """,
        (truck_number,),
    ).fetchone()

    existing_status = ((existing_row["status"] if existing_row else "") or "").strip()
    existing_job_number = ((existing_row["job_number"] if existing_row else "") or "").strip()

    final_status = existing_status or incoming_status or "Idle"
    final_job_number = existing_job_number or incoming_job_number or ""

    cur.execute(
        """
        INSERT INTO truck_locations (
            truck_number, latitude, longitude, status, job_number, speed_mph, driver_id, device_uuid, last_updated
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(truck_number) DO UPDATE SET
            latitude=excluded.latitude,
            longitude=excluded.longitude,
            status=excluded.status,
            job_number=excluded.job_number,
            speed_mph=excluded.speed_mph,
            driver_id=excluded.driver_id,
            device_uuid=excluded.device_uuid,
            last_updated=excluded.last_updated
        """,
        (
            truck_number,
            payload.latitude,
            payload.longitude,
            final_status,
            final_job_number,
            speed_mph,
            payload.driver_id,
            device_uuid or None,
            now,
        ),
    )

    cur.execute(
        """
        INSERT INTO truck_history (
            truck_number, latitude, longitude, status, job_number, speed_mph, recorded_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            truck_number,
            payload.latitude,
            payload.longitude,
            final_status,
            final_job_number,
            speed_mph,
            now,
        ),
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "last_updated": now,
        "status": final_status,
        "job_number": final_job_number,
    }


@app.get("/trucks/live")
def get_live_trucks():
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT tl.truck_number,
               tl.latitude,
               tl.longitude,
               tl.status,
               tl.job_number,
               tl.speed_mph,
               tl.last_updated,
               d.device_name,
               dr.name AS driver_name
        FROM truck_locations tl
        LEFT JOIN devices d ON tl.device_uuid = d.device_uuid
        LEFT JOIN drivers dr ON tl.driver_id = dr.id
        ORDER BY tl.truck_number
        """
    ).fetchall()

    conn.close()

    result = []
    for r in rows:
        row = dict(r)
        row["stale_minutes"] = minutes_between(row.get("last_updated"), utc_now())
        row["is_stale"] = (row["stale_minutes"] or 0) >= 3
        result.append(row)

    return result


@app.get("/trucks/history/{truck_number}")
def get_truck_history(truck_number: str, limit: int = 50):
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT truck_number, latitude, longitude, status, job_number, speed_mph, recorded_at
        FROM truck_history
        WHERE truck_number = ?
        ORDER BY id DESC
        LIMIT ?
        """,
        (truck_number.strip(), limit),
    ).fetchall()

    conn.close()
    return [dict(r) for r in rows]


@app.get("/trucks/events/{truck_number}")
def get_truck_events(truck_number: str, limit: int = 25):
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT truck_number, event_type, details, created_at
        FROM truck_events
        WHERE truck_number = ?
        ORDER BY id DESC
        LIMIT ?
        """,
        (truck_number.strip(), limit),
    ).fetchall()

    conn.close()
    return [dict(r) for r in rows]


@app.get("/trucks/details/{truck_number}")
def get_truck_details(truck_number: str):
    truck_number = truck_number.strip()

    conn = get_conn()
    cur = conn.cursor()

    truck = cur.execute(
        """
        SELECT tl.truck_number,
               tl.latitude,
               tl.longitude,
               tl.status,
               tl.job_number,
               tl.speed_mph,
               tl.last_updated,
               d.device_name,
               dr.name AS driver_name
        FROM truck_locations tl
        LEFT JOIN devices d ON tl.device_uuid = d.device_uuid
        LEFT JOIN drivers dr ON tl.driver_id = dr.id
        WHERE tl.truck_number = ?
        """,
        (truck_number,),
    ).fetchone()

    job = cur.execute(
        """
        SELECT *
        FROM job_assignments
        WHERE truck_number = ?
        """,
        (truck_number,),
    ).fetchone()

    conn.close()

    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found")

    truck_dict = dict(truck)
    last_seen = minutes_between(truck_dict.get("last_updated"), utc_now())

    return {
        "truck": truck_dict,
        "job": dict(job) if job else None,
        "last_gps_signal_minutes_ago": last_seen,
        "is_stale": (last_seen or 0) >= 3,
    }


@app.delete("/trucks/{truck_number}")
def delete_truck(truck_number: str):
    truck_number = truck_number.strip()

    conn = get_conn()
    cur = conn.cursor()

    cur.execute("DELETE FROM truck_locations WHERE truck_number = ?", (truck_number,))
    deleted_count = cur.rowcount

    cur.execute("DELETE FROM job_assignments WHERE truck_number = ?", (truck_number,))

    cur.execute(
        """
        INSERT INTO truck_events (truck_number, event_type, details, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (truck_number, "truck_deleted", "Truck removed from live view", utc_now()),
    )

    conn.commit()
    conn.close()

    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Truck not found")

    return {"success": True, "message": f"Truck {truck_number} deleted"}


@app.post("/jobs/assign")
def assign_job(payload: AssignJobRequest):
    truck_number = payload.truck_number.strip()
    address = payload.address.strip()

    if not truck_number:
        raise HTTPException(status_code=400, detail="truck_number is required")
    if not address:
        raise HTTPException(status_code=400, detail="address is required")

    now = utc_now()
    assignment_token = create_new_assignment_token()

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO job_assignments (
            truck_number, assignment_token, job_number, customer_name, customer_email, address, plant, product,
            ordered_qty, delivered_qty, assigned_at,
            en_route_started_at, arrived_on_site_at, pouring_started_at,
            pouring_completed_at, washed_out_at, returning_at, completed_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
        ON CONFLICT(truck_number) DO UPDATE SET
            assignment_token=excluded.assignment_token,
            job_number=excluded.job_number,
            customer_name=excluded.customer_name,
            customer_email=excluded.customer_email,
            address=excluded.address,
            plant=excluded.plant,
            product=excluded.product,
            ordered_qty=excluded.ordered_qty,
            delivered_qty=0,
            assigned_at=excluded.assigned_at,
            en_route_started_at=NULL,
            arrived_on_site_at=NULL,
            pouring_started_at=NULL,
            pouring_completed_at=NULL,
            washed_out_at=NULL,
            returning_at=NULL,
            completed_at=NULL
        """,
        (
            truck_number,
            assignment_token,
            payload.job_number or "",
            payload.customer_name or "",
            payload.customer_email or "",
            address,
            payload.plant or "",
            payload.product or "",
            payload.ordered_qty or 0,
            0,
            now,
        ),
    )

    cur.execute(
        """
        UPDATE truck_locations
        SET job_number = ?,
            status = CASE
                WHEN status IS NULL OR TRIM(status) = '' OR status = 'Idle' THEN 'At Plant'
                ELSE status
            END
        WHERE truck_number = ?
        """,
        (payload.job_number or "", truck_number),
    )

    cur.execute(
        """
        INSERT INTO truck_events (truck_number, event_type, details, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            truck_number,
            "job_assigned",
            f"Job {payload.job_number or '-'} assigned to {address} (assignment {assignment_token[:8]})",
            now,
        ),
    )

    conn.commit()
    conn.close()

    return {"success": True, "assigned_at": now, "assignment_token": assignment_token}


@app.get("/jobs/current/{truck_number}")
def get_current_job(truck_number: str):
    conn = get_conn()
    cur = conn.cursor()

    row = cur.execute(
        """
        SELECT *
        FROM job_assignments
        WHERE truck_number = ?
        """,
        (truck_number.strip(),),
    ).fetchone()

    conn.close()

    if not row:
        return {
            "truck_number": truck_number,
            "assignment_token": "",
            "job_number": "",
            "customer_name": "",
            "customer_email": "",
            "address": "",
            "plant": "",
            "product": "",
            "ordered_qty": 0,
            "delivered_qty": 0,
            "assigned_at": None,
            "en_route_started_at": None,
            "arrived_on_site_at": None,
            "pouring_started_at": None,
            "pouring_completed_at": None,
            "washed_out_at": None,
            "returning_at": None,
            "completed_at": None,
        }

    return dict(row)


@app.post("/jobs/complete/{truck_number}")
def complete_job(truck_number: str):
    truck_number = truck_number.strip()
    now = utc_now()

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE job_assignments
        SET completed_at = ?
        WHERE truck_number = ?
        """,
        (now, truck_number),
    )

    cur.execute(
        """
        UPDATE truck_locations
        SET job_number = ?, status = ?
        WHERE truck_number = ?
        """,
        ("", "Idle", truck_number),
    )

    updated_count = cur.rowcount

    cur.execute(
        """
        INSERT INTO truck_events (truck_number, event_type, details, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (truck_number, "job_completed", "Job completed and truck reset to Idle", now),
    )

    conn.commit()
    conn.close()

    if updated_count == 0:
        raise HTTPException(status_code=404, detail="Truck not found")

    return {"success": True, "message": f"Job completed for truck {truck_number}"}


@app.post("/jobs/delivered/{truck_number}")
def update_delivered_qty(truck_number: str, payload: DeliveredQtyRequest):
    truck_number = truck_number.strip()
    now = utc_now()

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE job_assignments
        SET delivered_qty = ?
        WHERE truck_number = ?
        """,
        (payload.delivered_qty, truck_number),
    )

    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Job not found for truck")

    cur.execute(
        """
        INSERT INTO truck_events (truck_number, event_type, details, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            truck_number,
            "delivered_qty_updated",
            f"Delivered quantity updated to {payload.delivered_qty}",
            now,
        ),
    )

    conn.commit()
    conn.close()

    return {"success": True}


@app.post("/trucks/event/{truck_number}/{event_type}")
def add_truck_event(truck_number: str, event_type: str, payload: EventRequest):
    truck_number = truck_number.strip()
    now = utc_now()

    allowed_events = {
        "en_route_started",
        "arrived_on_site",
        "pouring_started",
        "pouring_completed",
        "washed_out",
        "returning",
        "out_of_service",
        "back_in_service",
    }

    if event_type not in allowed_events:
        raise HTTPException(status_code=400, detail="Unsupported event_type")

    conn = get_conn()
    cur = conn.cursor()

    timestamp_column_map = {
        "en_route_started": "en_route_started_at",
        "arrived_on_site": "arrived_on_site_at",
        "pouring_started": "pouring_started_at",
        "pouring_completed": "pouring_completed_at",
        "washed_out": "washed_out_at",
        "returning": "returning_at",
    }

    if event_type in timestamp_column_map:
        col = timestamp_column_map[event_type]
        cur.execute(
            f"""
            UPDATE job_assignments
            SET {col} = ?
            WHERE truck_number = ?
            """,
            (now, truck_number),
        )

    status_map = {
        "en_route_started": "En Route",
        "arrived_on_site": "Arrived On Site",
        "pouring_started": "Pouring",
        "pouring_completed": "Post Pour",
        "washed_out": "Washed Out",
        "returning": "Returning",
        "out_of_service": "Out Of Service",
        "back_in_service": "Idle",
    }

    if event_type in status_map:
        cur.execute(
            """
            UPDATE truck_locations
            SET status = ?
            WHERE truck_number = ?
            """,
            (status_map[event_type], truck_number),
        )

    # IMPORTANT:
    # never create a new eTicket from tablet status changes
    if event_type == "arrived_on_site":
        job_row = cur.execute(
            """
            SELECT *
            FROM job_assignments
            WHERE truck_number = ?
            """,
            (truck_number,),
        ).fetchone()

        job = dict(job_row) if job_row else None

        existing_ticket = cur.execute(
            """
            SELECT *
            FROM etickets
            WHERE truck_number = ?
            AND token IS NOT NULL
            AND TRIM(token) <> ''
            AND LOWER(COALESCE(status, 'pending')) <> 'signed'
            ORDER BY id DESC
            LIMIT 1
            """,
            (truck_number,),
        ).fetchone()

        ticket = dict(existing_ticket) if existing_ticket else None

        if ticket and job:
            customer_email = (job.get("customer_email") or "").strip()

            if customer_email and not ticket.get("email_sent_at"):
                eticket_link = build_eticket_frontend_url(ticket["token"])
                try:
                    send_eticket_email(
                        to_email=customer_email,
                        customer_name=job.get("customer_name") or ticket.get("customer_name") or "Customer",
                        eticket_link=eticket_link,
                        truck_number=truck_number,
                        job_number=job.get("job_number") or "",
                    )

                    cur.execute(
                        """
                        UPDATE etickets
                        SET email_sent_to = ?, email_sent_at = ?, load_time = COALESCE(load_time, ?)
                        WHERE id = ?
                        """,
                        (customer_email, now, now, ticket["id"]),
                    )

                    cur.execute(
                        """
                        INSERT INTO truck_events (truck_number, event_type, details, created_at)
                        VALUES (?, ?, ?, ?)
                        """,
                        (
                            truck_number,
                            "eticket_email_sent",
                            f"Existing eTicket emailed to {customer_email}",
                            now,
                        ),
                    )
                except Exception as e:
                    cur.execute(
                        """
                        INSERT INTO truck_events (truck_number, event_type, details, created_at)
                        VALUES (?, ?, ?, ?)
                        """,
                        (
                            truck_number,
                            "eticket_email_failed",
                            f"Email failed: {str(e)}",
                            now,
                        ),
                    )
        elif not ticket:
            cur.execute(
                """
                INSERT INTO truck_events (truck_number, event_type, details, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (
                    truck_number,
                    "eticket_missing",
                    "Arrived on site but no existing eTicket was found",
                    now,
                ),
            )

    cur.execute(
        """
        INSERT INTO truck_events (truck_number, event_type, details, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (truck_number, event_type, payload.details or "", now),
    )

    conn.commit()
    conn.close()

    return {"success": True, "event_type": event_type, "created_at": now}


@app.post("/dispatch/trucks/{truck_number}/status")
def dispatch_set_status(truck_number: str, payload: DispatchStatusRequest, admin=Depends(require_admin)):
    truck_number = truck_number.strip()
    desired_status = payload.status.strip()

    allowed_statuses = {
        "Idle",
        "At Plant",
        "En Route",
        "Arrived On Site",
        "Pouring",
        "Post Pour",
        "Returning",
        "Washed Out",
        "Out Of Service",
    }

    if desired_status not in allowed_statuses:
        raise HTTPException(status_code=400, detail="Unsupported status")

    now = utc_now()
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE truck_locations
        SET status = ?, last_updated = ?
        WHERE truck_number = ?
        """,
        (desired_status, now, truck_number),
    )

    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Truck not found")

    cur.execute(
        """
        INSERT INTO truck_events (truck_number, event_type, details, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            truck_number,
            "dispatch_status_override",
            payload.details or f"Dispatch changed status to {desired_status}",
            now,
        ),
    )

    conn.commit()
    conn.close()

    return {"success": True}


@app.get("/trucks/metrics/{truck_number}")
def get_truck_metrics(truck_number: str):
    truck_number = truck_number.strip()

    conn = get_conn()
    cur = conn.cursor()

    job = cur.execute(
        """
        SELECT *
        FROM job_assignments
        WHERE truck_number = ?
        """,
        (truck_number,),
    ).fetchone()

    conn.close()

    if not job:
        return {
            "truck_number": truck_number,
            "ordered_qty": 0,
            "delivered_qty": 0,
            "delivered_percent": 0,
            "time_to_job_minutes": None,
            "waiting_minutes": None,
            "pouring_minutes": None,
            "after_pour_minutes": None,
        }

    job = dict(job)

    ordered_qty = float(job.get("ordered_qty") or 0)
    delivered_qty = float(job.get("delivered_qty") or 0)

    delivered_percent = 0
    if ordered_qty > 0:
        delivered_percent = round((delivered_qty / ordered_qty) * 100, 1)

    time_to_job = minutes_between(job.get("en_route_started_at"), job.get("arrived_on_site_at"))
    waiting_minutes = minutes_between(job.get("arrived_on_site_at"), job.get("pouring_started_at"))
    pouring_minutes = minutes_between(job.get("pouring_started_at"), job.get("pouring_completed_at"))
    after_pour_minutes = minutes_between(job.get("pouring_completed_at"), job.get("washed_out_at"))

    return {
        "truck_number": truck_number,
        "ordered_qty": ordered_qty,
        "delivered_qty": delivered_qty,
        "delivered_percent": delivered_percent,
        "time_to_job_minutes": time_to_job,
        "waiting_minutes": waiting_minutes,
        "pouring_minutes": pouring_minutes,
        "after_pour_minutes": after_pour_minutes,
    }


@app.post("/api/etickets/create-test")
def create_test_eticket():
    conn = get_conn()
    cur = conn.cursor()

    token = str(uuid.uuid4())

    cur.execute(
        """
        INSERT INTO etickets (
            job_instance_id,
            ticket_number,
            customer_name,
            address,
            plant,
            truck_number,
            product,
            mix_number,
            mix_description,
            quantity,
            delivered_qty_total,
            order_total,
            token,
            status,
            load_time,
            time_limit_minutes,
            weather_summary,
            weather_link,
            batch_weights_qr_url,
            terms_qr_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            "test-job-instance",
            "1010869210",
            "Texas Concrete LLC",
            "7611 Park Lane, Dallas",
            "BTS-01A - CX",
            "B-31",
            "3600 PSI 5.5SK SLAG AIR",
            6.00,
            token,
            "pending",
            utc_now(),
            90,
            "Sunny, 78°F, light wind",
            "https://weather.example.com/test",
            "https://btc-fleet-backend.onrender.com/qr/batch-weights",
            "https://btc-fleet-backend.onrender.com/qr/terms",
        ),
    )

    conn.commit()
    conn.close()

    return {"link": build_eticket_frontend_url(token), "token": token}


@app.get("/api/etickets/create-test")
def create_test_eticket_get():
    return create_test_eticket()

@app.post("/admin/etickets/{ticket_id}/archive")
def archive_eticket(ticket_id: int, admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    ticket = cur.execute(
        """
        SELECT id
        FROM etickets
        WHERE id = ?
        """,
        (ticket_id,),
    ).fetchone()

    if not ticket:
        conn.close()
        raise HTTPException(status_code=404, detail="eTicket not found")

    cur.execute(
        """
        UPDATE etickets
        SET archived_at = ?,
            archived_by = ?
        WHERE id = ?
        """,
        (
            utc_now(),
            admin.get("name") or admin.get("username") or "Admin",
            ticket_id,
        ),
    )

    conn.commit()
    conn.close()

    return {"success": True}


@app.post("/admin/etickets/{ticket_id}/restore")
def restore_eticket(ticket_id: int, admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    ticket = cur.execute(
        """
        SELECT id
        FROM etickets
        WHERE id = ?
        """,
        (ticket_id,),
    ).fetchone()

    if not ticket:
        conn.close()
        raise HTTPException(status_code=404, detail="eTicket not found")

    cur.execute(
        """
        UPDATE etickets
        SET archived_at = NULL,
            archived_by = NULL
        WHERE id = ?
        """,
        (ticket_id,),
    )

    conn.commit()
    conn.close()

    return {"success": True}

@app.delete("/admin/etickets/{ticket_id}/delete")
def delete_archived_eticket(ticket_id: int, admin=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()

    ticket = cur.execute(
        """
        SELECT id, token, archived_at
        FROM etickets
        WHERE id = ?
        """,
        (ticket_id,),
    ).fetchone()

    if not ticket:
        conn.close()
        raise HTTPException(status_code=404, detail="eTicket not found")

    if not ticket["archived_at"]:
        conn.close()
        raise HTTPException(
            status_code=400,
            detail="eTicket must be archived before it can be permanently deleted",
        )

    token = ticket["token"]

    cur.execute("DELETE FROM etickets WHERE id = ?", (ticket_id,))
    conn.commit()
    conn.close()

    # Optional: delete generated PDF too
    try:
        pdf_path = PDF_DIR / f"eticket_{token}.pdf"
        if pdf_path.exists():
            pdf_path.unlink()
    except Exception:
        pass

    return {"success": True}


@app.post("/api/etickets/create")
def create_eticket(payload: ETicketCreateRequest):
    conn = get_conn()
    cur = conn.cursor()

    truck_number = payload.truck_number.strip()
    mix_number = (payload.mix_number or "").strip()
    mix_description = (payload.mix_description or "").strip()
    product_value = f"{mix_number} {mix_description}".strip()

    if not product_value:
        product_value = (payload.product or "").strip()

    job_row = cur.execute(
        """
        SELECT *
        FROM job_assignments
        WHERE truck_number = ?
        """,
        (truck_number,),
    ).fetchone()

    job = dict(job_row) if job_row else None
    assignment_token = (job.get("assignment_token") or "").strip() if job else ""

    if assignment_token:
        existing = cur.execute(
            """
            SELECT *
            FROM etickets
            WHERE job_instance_id = ?
            AND LOWER(COALESCE(status, 'pending')) <> 'signed'
            ORDER BY id DESC
            LIMIT 1
            """,
            (assignment_token,),
        ).fetchone()

        if existing:
            existing = dict(existing)

            cur.execute(
                """
                UPDATE etickets
                SET ticket_number = ?,
                    customer_name = ?,
                    address = ?,
                    plant = ?,
                    truck_number = ?,
                    product = ?,
                    mix_number = ?,
                    mix_description = ?,
                    quantity = ?,
                    delivered_qty_total = ?,
                    order_total = ?
                WHERE id = ?
                """,
                (
                    payload.ticket_number,
                    payload.customer_name,
                    payload.address,
                    payload.plant,
                    truck_number,
                    product_value,
                    mix_number,
                    mix_description,
                    payload.quantity,
                    payload.delivered_qty_total or payload.quantity,
                    payload.order_total or payload.quantity,
                    existing["id"],
                ),
            )

            conn.commit()
            conn.close()

            return {
                "link": build_eticket_frontend_url(existing["token"]),
                "token": existing["token"],
                "ticket_id": existing["id"],
                "reused": True,
            }

    existing_truck = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE truck_number = ?
        AND LOWER(COALESCE(status, 'pending')) <> 'signed'
        ORDER BY id DESC
        LIMIT 1
        """,
        (truck_number,),
    ).fetchone()

    if existing_truck:
        existing_truck = dict(existing_truck)

        cur.execute(
            """
            UPDATE etickets
            SET job_instance_id = ?,
                ticket_number = ?,
                customer_name = ?,
                job_number = ?,
                address = ?,
                plant = ?,
                truck_number = ?,
                product = ?,
                mix_number = ?,
                mix_description = ?,
                quantity = ?,
                delivered_qty_total = ?,
                order_total = ?,
                load_time = COALESCE(load_time, ?)
            WHERE id = ?
            """,
            (
                assignment_token or existing_truck.get("job_instance_id"),
                payload.ticket_number,
                payload.customer_name or (job.get("customer_name") if job else "") or "Customer",
                (job.get("job_number") if job else "") or "",
                payload.address or (job.get("address") if job else "") or "",
                payload.plant or (job.get("plant") if job else "") or "",
                truck_number,
                product_value,
                mix_number,
                mix_description,

                payload.quantity if payload.quantity is not None else float(job.get("ordered_qty") or 0) if job else 0,

                float(payload.delivered_qty_total or (job.get("delivered_qty") if job else 0) or payload.quantity),
                float(payload.order_total or (job.get("ordered_qty") if job else 0) or payload.quantity),

                utc_now(),
                existing_truck["id"],
            ),
        )

        conn.commit()
        token = existing_truck["token"]
        conn.close()
        return {"link": build_eticket_frontend_url(token), "token": token, "reused": True}

    token = str(uuid.uuid4())
    job_instance_id = assignment_token or f"manual-{uuid.uuid4()}"

    cur.execute(
        """
        INSERT INTO etickets (
            job_instance_id,
            ticket_number,
            customer_name,
            job_number,
            address,
            plant,
            truck_number,
            product,
            quantity,
            delivered_qty_total,
            order_total,
            token,
            status,
            load_time,
            time_limit_minutes,
            batch_weights_qr_url,
            terms_qr_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            job_instance_id,
            payload.ticket_number,
            payload.customer_name or (job.get("customer_name") if job else "") or "Customer",
            (job.get("job_number") if job else "") or "",
            payload.address or (job.get("address") if job else "") or "",
            payload.plant or (job.get("plant") if job else "") or "",
            truck_number,
            payload.product or (job.get("product") if job else "") or "",
            payload.quantity if payload.quantity is not None else float(job.get("ordered_qty") or 0) if job else 0,

            float(payload.delivered_qty_total or (job.get("delivered_qty") if job else 0) or payload.quantity),
            float(payload.order_total or (job.get("ordered_qty") if job else 0) or payload.quantity),

            token,
            "pending",
            utc_now(),
            90,
            "https://btc-fleet-backend.onrender.com/qr/batch-weights",
            "https://btc-fleet-backend.onrender.com/qr/terms",
        ),
    )

    conn.commit()
    conn.close()

    return {"link": build_eticket_frontend_url(token), "token": token, "reused": False}

@app.get("/api/etickets/active-list/{truck_number}")
def get_active_etickets_for_truck(truck_number: str):
    truck_number = (truck_number or "").strip()

    if not truck_number:
        return []

    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE LOWER(COALESCE(status, 'pending')) <> 'signed'
          AND token IS NOT NULL
          AND TRIM(token) <> ''
          AND (
                truck_number = ?
                OR (
                    assigned_to_type = 'truck'
                    AND assigned_to_id = ?
                )
              )
        ORDER BY
            CASE
                WHEN truck_number = ? THEN 0
                ELSE 1
            END,
            assigned_at DESC,
            id DESC
        """,
        (truck_number, truck_number, truck_number),
    ).fetchall()

    conn.close()

    return [
        {
            "exists": True,
            "id": row["id"],
            "token": row["token"],
            "status": row["status"] or "pending",
            "ticket_number": row["ticket_number"] or "",
            "customer_name": row["customer_name"] or "",
            "truck_number": row["truck_number"] or "",
            "assigned_to_type": row["assigned_to_type"] or "",
            "assigned_to_id": row["assigned_to_id"] or "",
            "assigned_to_name": row["assigned_to_name"] or "",
            "is_reassigned": bool(
                row["assigned_to_type"] == "truck"
                and row["assigned_to_id"] == truck_number
                and row["truck_number"] != truck_number
            ),
            "url": build_eticket_frontend_url(row["token"]),
        }
        for row in rows
    ]

@app.get("/api/etickets/active/{truck_number}")
def get_active_eticket_for_truck(truck_number: str):
    truck_number = (truck_number or "").strip()

    if not truck_number:
        return {
            "exists": False,
            "token": "",
            "status": "",
            "ticket_number": "",
            "customer_name": "",
            "truck_number": "",
            "url": "",
            "open_url": "",
        }

    conn = get_conn()
    cur = conn.cursor()

    row = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE truck_number = ?
        AND token IS NOT NULL
        AND TRIM(token) <> ''
        AND LOWER(COALESCE(status, 'pending')) <> 'signed'
        ORDER BY id DESC
        LIMIT 1
        """,
        (truck_number,),
    ).fetchone()

    conn.close()

    if not row:
        return {
            "exists": False,
            "token": "",
            "status": "",
            "ticket_number": "",
            "customer_name": "",
            "truck_number": truck_number,
            "url": "",
            "open_url": "",
        }

    ticket = dict(row)
    token = (ticket.get("token") or "").strip()
    final_url = build_eticket_frontend_url(token) if token else ""

    return {
        "exists": True,
        "token": token,
        "status": ticket.get("status") or "pending",
        "ticket_number": ticket.get("ticket_number") or "",
        "customer_name": ticket.get("customer_name") or "",
        "truck_number": ticket.get("truck_number") or truck_number,
        "url": final_url,
        "open_url": final_url,
    }


@app.get("/api/etickets/{token}")
def get_eticket(token: str):
    conn = get_conn()
    cur = conn.cursor()

    row = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE token = ?
        """,
        (token,),
    ).fetchone()

    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return dict(row)

@app.post("/api/cemco/push")
async def cemco_push(payload: dict):
    print("CEMCO MESSAGE RECEIVED")
    print(payload)

    return {"ok": True}


@app.post("/api/etickets/{token}/sign")
def sign_eticket(token: str, payload: ETicketSignRequest):

    if "driver" in (payload.ticket_acceptance or "").lower():
        name = "Driver Signed - No One Available"
    else:
        name = "Customer / Contractor Signature"

    conn = get_conn()
    ensure_eticket_columns(conn)
    cur = conn.cursor()

   
    existing = cur.execute(
        """
        SELECT id, status
        FROM etickets
        WHERE token = ?
        """,
        (token,),
    ).fetchone()

    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Ticket not found")

    now = utc_now()

    final_weather_summary = payload.weather_summary
    final_weather_link = payload.weather_link

    if payload.latitude is not None and payload.longitude is not None:
        try:
            weather_snapshot = fetch_historical_weather_snapshot(
                lat=float(payload.latitude),
                lon=float(payload.longitude),
                signed_at_iso=now,
            )
            if weather_snapshot:
                final_weather_summary = weather_snapshot.get("weather_summary") or final_weather_summary
                final_weather_link = weather_snapshot.get("weather_link") or final_weather_link
        except Exception as e:
            print("Final weather lookup failed:", str(e))

            existing_weather = cur.execute(
                """
                SELECT qc_weather_summary, qc_weather_link
                FROM etickets
                WHERE token = ?
                """,
                (token,),
            ).fetchone()

            if existing_weather:
                final_weather_summary = (
                    final_weather_summary
                    or existing_weather["qc_weather_summary"]
                    or "Weather unavailable"
                )
                final_weather_link = (
                    final_weather_link
                    or existing_weather["qc_weather_link"]
                    or None
                )
            else:
                final_weather_summary = final_weather_summary or "Weather unavailable"
                final_weather_link = final_weather_link or None

    try:
        signature_url = data_url_to_r2_url(
            payload.signature_data_url,
            "signatures",
            token,
        )

        curb_signature_url = data_url_to_r2_url(
            payload.curb_line_signature_data_url,
            "curb-signatures",
            token,
        )

        photo_url = data_url_to_r2_url(
            payload.photo_data_url,
            "photos",
            token,
        )
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"R2 upload failed: {str(e)}")
    
    print("FINAL SIG:", signature_url)
    print("CURB SIG:", curb_signature_url)
    print("PHOTO:", photo_url)

    cur.execute(
        """
        UPDATE etickets
        SET status = 'signed',
            signed_name = ?,
            signed_at = ?,
            signed_latitude = ?,
            signed_longitude = ?,
            water_choice = ?,
            water_added = ?,
            qc_water_added = ?,
            customer_water_added = ?,
            ticket_acceptance = ?,
            curb_line_status = ?,
            signature_data_url = ?,
            curb_line_signature_data_url = ?,
            curb_line_signed_at = ?,
            photo_data_url = ?,
            weather_summary = ?,
            weather_link = ?,
            batch_weights_qr_url = ?,
            terms_qr_url = ?,
            load_time = COALESCE(?, load_time),
            time_limit_minutes = COALESCE(?, time_limit_minutes)
        WHERE token = ?
        """,
        (
            payload.ticket_acceptance or "Customer / Contractor Signature",
            now,
            payload.latitude,
            payload.longitude,
            payload.water_choice,
            payload.water_added,
            payload.qc_water_added,
            payload.customer_water_added,
            payload.ticket_acceptance,
            payload.curb_line_status,
            signature_url,
            curb_signature_url,
            payload.curb_line_signed_at,
            photo_url,
            final_weather_summary,
            final_weather_link,
            payload.batch_weights_qr_url,
            payload.terms_qr_url,
            payload.load_time,
            payload.time_limit_minutes,
            token,
        ),
    )

    conn.commit()
    conn.close()

    return {"success": True}


@app.get("/api/etickets")
def list_etickets():
    conn = get_conn()
    cur = conn.cursor()

    rows = cur.execute(
        """
        SELECT *
        FROM etickets
        ORDER BY id DESC
        """
    ).fetchall()

    conn.close()
    return [dict(r) for r in rows]


@app.get("/api/etickets/{token}/pdf")
def get_eticket_pdf(token: str):
    conn = get_conn()
    cur = conn.cursor()

    row = cur.execute(
        """
        SELECT *
        FROM etickets
        WHERE token = ?
        """,
        (token,),
    ).fetchone()

    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Ticket not found")

    ticket = dict(row)

    if ticket.get("status") != "signed":
        raise HTTPException(status_code=400, detail="Ticket must be signed before PDF is available")

    pdf_path = PDF_DIR / f"eticket_{token}.pdf"
    if pdf_path.exists():
        pdf_path.unlink()

    pdf_path = generate_eticket_pdf(ticket)

    try:
        upload_pdf_to_r2(pdf_path, ticket["token"], "final")
    except Exception as e:
        print("Final PDF R2 upload failed:", str(e))

    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=pdf_path.name,
    )