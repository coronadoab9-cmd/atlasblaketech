from fastapi import APIRouter, HTTPException

from app.schemas.eticket import ETicket
from app.services.eticket_service import get_eticket_by_token_data, get_etickets_data

router = APIRouter(prefix="/etickets", tags=["eTickets"])


@router.get("", response_model=list[ETicket])
def get_etickets():
    return get_etickets_data()


@router.get("/{token}", response_model=ETicket)
def get_eticket_by_token(token: str):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket