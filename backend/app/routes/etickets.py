from fastapi import APIRouter, HTTPException, Query

from app.schemas.eticket import ETicket, ETicketCreate
from app.services.eticket_service import (
    create_eticket_data,
    get_eticket_by_token_data,
    get_etickets_data,
)

router = APIRouter(prefix="/etickets", tags=["eTickets"])


@router.get("", response_model=list[ETicket])
def get_etickets(
    status: str | None = Query(default=None),
    truck_number: str | None = Query(default=None),
):
    return get_etickets_data(status=status, truck_number=truck_number)


@router.post("", response_model=ETicket, status_code=201)
def create_eticket(payload: ETicketCreate):
    return create_eticket_data(payload.model_dump())


@router.get("/{token}", response_model=ETicket)
def get_eticket_by_token(token: str):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket