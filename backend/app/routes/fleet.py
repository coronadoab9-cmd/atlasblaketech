from fastapi import APIRouter, Query

from app.schemas.fleet import Device, Driver, FleetDashboardStats, Truck
from app.services.fleet_service import (
    get_devices_data,
    get_drivers_data,
    get_fleet_stats_data,
    get_trucks_data,
)

router = APIRouter(prefix="/fleet", tags=["Fleet"])


@router.get("/stats", response_model=FleetDashboardStats)
def get_fleet_stats():
    return get_fleet_stats_data()


@router.get("/trucks", response_model=list[Truck])
def get_trucks(status: str | None = Query(default=None)):
    return get_trucks_data(status=status)


@router.get("/drivers", response_model=list[Driver])
def get_drivers(active: bool | None = Query(default=None)):
    return get_drivers_data(active=active)


@router.get("/devices", response_model=list[Device])
def get_devices(active: bool | None = Query(default=None)):
    return get_devices_data(active=active)