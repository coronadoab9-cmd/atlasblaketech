from fastapi import APIRouter

from app.data.mock_data import DISPATCH_LOADS, DISPATCH_STATS

router = APIRouter(prefix="/dispatch", tags=["Dispatch"])


@router.get("/stats")
def get_dispatch_stats():
    return DISPATCH_STATS


@router.get("/loads")
def get_dispatch_loads():
    return DISPATCH_LOADS