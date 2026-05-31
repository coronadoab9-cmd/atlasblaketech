from fastapi import APIRouter, HTTPException

from app.data.mock_data import TICKETS

router = APIRouter(prefix="/etickets", tags=["eTickets"])


@router.get("")
def get_etickets():
    return TICKETS


@router.get("/{token}")
def get_eticket_by_token(token: str):
    ticket = next((item for item in TICKETS if item["token"] == token), None)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket