from fastapi import APIRouter

from app.data.mock_data import DEVICES, DRIVERS, FLEET_STATS, TRUCKS

router = APIRouter(prefix="/fleet", tags=["Fleet"])


@router.get("/stats")
def get_fleet_stats():
    return FLEET_STATS


@router.get("/trucks")
def get_trucks():
    return TRUCKS


@router.get("/drivers")
def get_drivers():
    return DRIVERS


@router.get("/devices")
def get_devices():
    return DEVICES