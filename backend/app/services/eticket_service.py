from datetime import datetime, timezone
from uuid import uuid4

from app.data.mock_data import ETICKET_ACTIVITY, TICKETS


def get_current_timestamp():
    return datetime.now(timezone.utc).isoformat()


def add_eticket_activity(ticket: dict, action: str, message: str, actor_name: str = "System"):
    activity = {
        "id": f"activity-{uuid4().hex[:12]}",
        "company_id": ticket["company_id"],
        "ticket_token": ticket["token"],
        "ticket_number": ticket["ticket_number"],
        "action": action,
        "message": message,
        "actor_name": actor_name,
        "created_at": get_current_timestamp(),
    }

    ETICKET_ACTIVITY.append(activity)

    return activity


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


def get_eticket_stats_data():
    return {
        "total": len(TICKETS),
        "pending": len([ticket for ticket in TICKETS if ticket["status"] == "pending"]),
        "signed": len([ticket for ticket in TICKETS if ticket["status"] == "signed"]),
        "rejected": len([ticket for ticket in TICKETS if ticket["status"] == "rejected"]),
        "archived": len([ticket for ticket in TICKETS if ticket["status"] == "archived"]),
    }


def get_eticket_by_token_data(token: str):
    return next((ticket for ticket in TICKETS if ticket["token"] == token), None)


def get_eticket_activity_data(token: str):
    return [
        item
        for item in ETICKET_ACTIVITY
        if item["ticket_token"] == token
    ]


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

    add_eticket_activity(
        new_ticket,
        action="created",
        message=f"Ticket {new_ticket['ticket_number']} was created.",
    )

    return new_ticket


def update_eticket_status_data(token: str, payload: dict):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        return None

    status = payload.get("status")
    now = get_current_timestamp()

    old_status = ticket["status"]

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

    add_eticket_activity(
        ticket,
        action="status_updated",
        message=f"Ticket {ticket['ticket_number']} changed from {old_status} to {status}.",
    )

    return ticket


def archive_eticket_data(token: str):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        return None

    ticket["status"] = "archived"
    ticket["updated_at"] = get_current_timestamp()

    add_eticket_activity(
        ticket,
        action="archived",
        message=f"Ticket {ticket['ticket_number']} was archived.",
    )

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

    add_eticket_activity(
        ticket,
        action="restored",
        message=f"Ticket {ticket['ticket_number']} was restored to pending.",
    )

    return ticket


def delete_archived_eticket_data(token: str):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        return {
            "deleted": False,
            "status_code": 404,
            "message": "Ticket not found",
        }

    if ticket["status"] != "archived":
        return {
            "deleted": False,
            "status_code": 400,
            "message": "Only archived tickets can be deleted",
        }

    add_eticket_activity(
        ticket,
        action="deleted",
        message=f"Ticket {ticket['ticket_number']} was permanently deleted.",
    )

    TICKETS.remove(ticket)

    return {
        "deleted": True,
        "status_code": 200,
        "message": "Ticket deleted",
        "token": token,
    }