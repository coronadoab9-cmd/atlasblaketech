from pydantic import BaseModel
from typing import Optional


class FleetDashboardStats(BaseModel):
    active_trucks: int
    active_loads: int
    en_route: int
    pouring: int
    exceptions: int


class Truck(BaseModel):
    id: int
    company_id: str
    truck_number: str
    driver_id: Optional[int] = None
    driver_name: Optional[str] = None
    latitude: float
    longitude: float
    speed_mph: int
    status: str
    job_number: Optional[str] = None
    customer_name: Optional[str] = None
    address: Optional[str] = None
    device_uuid: Optional[str] = None
    last_updated: str
    created_at: str
    updated_at: str


class Driver(BaseModel):
    id: int
    company_id: str
    name: str
    pin: Optional[str] = None
    active: bool
    truck_number: Optional[str] = None
    device_uuid: Optional[str] = None
    signed_in_at: Optional[str] = None
    created_at: str
    updated_at: str


class Device(BaseModel):
    id: int
    company_id: str
    device_uuid: str
    device_name: str
    truck_number: Optional[str] = None
    driver_id: Optional[int] = None
    driver_name: Optional[str] = None
    active: bool
    last_seen_at: Optional[str] = None