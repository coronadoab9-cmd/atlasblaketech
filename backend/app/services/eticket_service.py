from datetime import datetime, timezone
from uuid import uuid4

from app.data.mock_data import TICKETS


def get_etickets_data(status: str | None = None, truck_number: str | None = None):
    tickets = TICKETS

    if status:
        tickets = [
            ticket
            for ticket in tickets
            if ticket["status"].lower() == status.lower()
        ]

    if truck_number:
        tickets = [
            ticket
            for ticket in tickets
            if ticket["truck_number"].lower() == truck_number.lower()
        ]

    return tickets


def get_eticket_by_token_data(token: str):
    return next((ticket for ticket in TICKETS if ticket["token"] == token), None)


def create_eticket_data(payload: dict):
    now = datetime.now(timezone.utc).isoformat()

    next_id = max((ticket["id"] for ticket in TICKETS), default=0) + 1

    new_ticket = {
        **payload,
        "id": next_id,
        "token": f"ticket-{uuid4().hex[:12]}",
        "created_at": now,
        "updated_at": now,
    }

    TICKETS.append(new_ticket)

    return new_ticket