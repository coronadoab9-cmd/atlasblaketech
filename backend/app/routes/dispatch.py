from fastapi import APIRouter, Query

from app.schemas.dispatch import DispatchLoad, DispatchStats
from app.services.dispatch_service import (
    get_dispatch_loads_data,
    get_dispatch_stats_data,
)

router = APIRouter(prefix="/dispatch", tags=["Dispatch"])


@router.get("/stats", response_model=DispatchStats)
def get_dispatch_stats():
    return get_dispatch_stats_data()


@router.get("/loads", response_model=list[DispatchLoad])
def get_dispatch_loads(
    status: str | None = Query(default=None),
    truck_number: str | None = Query(default=None),
):
    return get_dispatch_loads_data(status=status, truck_number=truck_number)