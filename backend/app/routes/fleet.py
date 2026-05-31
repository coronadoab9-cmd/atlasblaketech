from fastapi import APIRouter

router = APIRouter(prefix="/fleet", tags=["Fleet"])


@router.get("/stats")
def get_fleet_stats():
    return {
        "active_trucks": 3,
        "active_loads": 3,
        "en_route": 1,
        "pouring": 1,
        "exceptions": 1,
    }


@router.get("/trucks")
def get_trucks():
    return [
        {
            "id": 1,
            "company_id": "btc",
            "truck_number": "BTS-01A",
            "driver_id": 1,
            "driver_name": "Driver Assigned",
            "latitude": 32.7767,
            "longitude": -96.7970,
            "speed_mph": 35,
            "status": "En Route",
            "job_number": "JOB-1048",
            "customer_name": "Customer Site",
            "address": "Dallas, TX",
            "device_uuid": "tablet-bts-01a",
            "last_updated": "Today, 4:18 PM",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": 2,
            "company_id": "btc",
            "truck_number": "BTS-002",
            "driver_id": 2,
            "driver_name": "Driver Assigned",
            "latitude": 32.7555,
            "longitude": -96.8300,
            "speed_mph": 8,
            "status": "Loading",
            "job_number": "JOB-1051",
            "customer_name": "Commercial Pour",
            "address": "Dallas, TX",
            "device_uuid": "tablet-bts-002",
            "last_updated": "Today, 4:10 PM",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": 3,
            "company_id": "btc",
            "truck_number": "BTS-003",
            "driver_id": 3,
            "driver_name": "Driver Assigned",
            "latitude": 32.8000,
            "longitude": -96.7500,
            "speed_mph": 0,
            "status": "Pouring",
            "job_number": "JOB-1054",
            "customer_name": "Project Location",
            "address": "Dallas, TX",
            "device_uuid": "tablet-bts-003",
            "last_updated": "Today, 4:05 PM",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
    ]


@router.get("/drivers")
def get_drivers():
    return [
        {
            "id": 1,
            "company_id": "btc",
            "name": "Driver Assigned",
            "pin": None,
            "active": True,
            "truck_number": "BTS-01A",
            "device_uuid": "tablet-bts-01a",
            "signed_in_at": "Today, 6:45 AM",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": 2,
            "company_id": "btc",
            "name": "Driver Assigned",
            "pin": None,
            "active": True,
            "truck_number": "BTS-002",
            "device_uuid": "tablet-bts-002",
            "signed_in_at": "Today, 7:05 AM",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
    ]


@router.get("/devices")
def get_devices():
    return [
        {
            "id": 1,
            "company_id": "btc",
            "device_uuid": "tablet-bts-01a",
            "device_name": "BTS-01A Tablet",
            "truck_number": "BTS-01A",
            "driver_id": 1,
            "driver_name": "Driver Assigned",
            "active": True,
            "last_seen_at": "Today, 4:18 PM",
        },
        {
            "id": 2,
            "company_id": "btc",
            "device_uuid": "tablet-bts-002",
            "device_name": "BTS-002 Tablet",
            "truck_number": "BTS-002",
            "driver_id": 2,
            "driver_name": "Driver Assigned",
            "active": True,
            "last_seen_at": "Today, 4:10 PM",
        },
    ]