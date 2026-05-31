from fastapi import APIRouter

from app.data.mock_data import DISPATCH_LOADS, DISPATCH_STATS
from app.schemas.dispatch import DispatchLoad, DispatchStats

router = APIRouter(prefix="/dispatch", tags=["Dispatch"])


@router.get("/stats", response_model=DispatchStats)
def get_dispatch_stats():
    return DISPATCH_STATS


@router.get("/loads", response_model=list[DispatchLoad])
def get_dispatch_loads():
    return DISPATCH_LOADS