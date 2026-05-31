from fastapi import APIRouter, HTTPException

from app.data.mock_data import TICKETS
from app.schemas.eticket import ETicket

router = APIRouter(prefix="/etickets", tags=["eTickets"])


@router.get("", response_model=list[ETicket])
def get_etickets():
    return TICKETS


@router.get("/{token}", response_model=ETicket)
def get_eticket_by_token(token: str):
    ticket = next((item for item in TICKETS if item["token"] == token), None)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket