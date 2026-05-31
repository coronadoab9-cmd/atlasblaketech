from datetime import datetime, timezone
from uuid import uuid4

from app.data.mock_data import TICKETS


def get_current_timestamp():
    return datetime.now(timezone.utc).isoformat()


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
    now = get_current_timestamp()

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


def update_eticket_status_data(token: str, payload: dict):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        return None

    status = payload.get("status")
    now = get_current_timestamp()

    ticket["status"] = status
    ticket["updated_at"] = now

    if status == "signed":
        ticket["signed_at"] = payload.get("signed_at") or now
        ticket["ticket_acceptance"] = payload.get("ticket_acceptance") or "Accepted Delivery"
        ticket["rejection_reason"] = None

    if status == "rejected":
        ticket["signed_at"] = None
        ticket["ticket_acceptance"] = payload.get("ticket_acceptance") or "Rejected Delivery"
        ticket["rejection_reason"] = payload.get("rejection_reason")

    if status == "pending":
        ticket["signed_at"] = None
        ticket["ticket_acceptance"] = None
        ticket["rejection_reason"] = None

    if status == "archived":
        ticket["ticket_acceptance"] = payload.get("ticket_acceptance") or ticket.get("ticket_acceptance")
        ticket["rejection_reason"] = payload.get("rejection_reason") or ticket.get("rejection_reason")

    return ticket


def archive_eticket_data(token: str):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        return None

    ticket["status"] = "archived"
    ticket["updated_at"] = get_current_timestamp()

    return ticket


def restore_eticket_data(token: str):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        return None

    ticket["status"] = "pending"
    ticket["signed_at"] = None
    ticket["ticket_acceptance"] = None
    ticket["rejection_reason"] = None
    ticket["updated_at"] = get_current_timestamp()

    return ticket