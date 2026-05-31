from fastapi import APIRouter, HTTPException, Query

from app.schemas.eticket import ETicket, ETicketCreate, ETicketStats, ETicketStatusUpdate
from app.services.eticket_service import (
    archive_eticket_data,
    create_eticket_data,
    delete_archived_eticket_data,
    get_eticket_by_token_data,
    get_eticket_stats_data,
    get_etickets_data,
    restore_eticket_data,
    update_eticket_status_data,
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


@router.get("/stats", response_model=ETicketStats)
def get_eticket_stats():
    return get_eticket_stats_data()


@router.get("/{token}", response_model=ETicket)
def get_eticket_by_token(token: str):
    ticket = get_eticket_by_token_data(token)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket


@router.patch("/{token}/status", response_model=ETicket)
def update_eticket_status(token: str, payload: ETicketStatusUpdate):
    ticket = update_eticket_status_data(token, payload.model_dump())

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket


@router.patch("/{token}/archive", response_model=ETicket)
def archive_eticket(token: str):
    ticket = archive_eticket_data(token)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket


@router.patch("/{token}/restore", response_model=ETicket)
def restore_eticket(token: str):
    ticket = restore_eticket_data(token)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket


@router.delete("/{token}")
def delete_eticket(token: str):
    result = delete_archived_eticket_data(token)

    if not result["deleted"]:
        raise HTTPException(
            status_code=result["status_code"],
            detail=result["message"],
        )

    return result