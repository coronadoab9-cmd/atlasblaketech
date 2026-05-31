from fastapi import APIRouter

from app.data.mock_data import DEVICES, DRIVERS, FLEET_STATS, TRUCKS
from app.schemas.fleet import Device, Driver, FleetDashboardStats, Truck

router = APIRouter(prefix="/fleet", tags=["Fleet"])


@router.get("/stats", response_model=FleetDashboardStats)
def get_fleet_stats():
    return FLEET_STATS


@router.get("/trucks", response_model=list[Truck])
def get_trucks():
    return TRUCKS


@router.get("/drivers", response_model=list[Driver])
def get_drivers():
    return DRIVERS


@router.get("/devices", response_model=list[Device])
def get_devices():
    return DEVICES