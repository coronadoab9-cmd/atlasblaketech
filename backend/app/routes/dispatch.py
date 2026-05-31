from fastapi import APIRouter

router = APIRouter(prefix="/dispatch", tags=["Dispatch"])


@router.get("/stats")
def get_dispatch_stats():
    return {
        "scheduled_loads": 12,
        "dispatched": 7,
        "on_site": 3,
        "needs_attention": 1,
    }


@router.get("/loads")
def get_dispatch_loads():
    return [
        {
            "id": "load-1001",
            "company_id": "btc",
            "order_number": "ORD-2048",
            "customer_name": "Customer Site",
            "job_number": "JOB-1048",
            "plant": "Plant 1",
            "truck_number": "BTS-01A",
            "driver_name": "Driver Assigned",
            "mix": "3000 PSI",
            "quantity": 10,
            "status": "En Route",
            "scheduled_time": "8:15 AM",
            "ticket_token": "sample-ticket-1001",
            "ticket_number": "1001",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": "load-1002",
            "company_id": "btc",
            "order_number": "ORD-2051",
            "customer_name": "Commercial Pour",
            "job_number": "JOB-1051",
            "plant": "Plant 2",
            "truck_number": "BTS-002",
            "driver_name": "Driver Assigned",
            "mix": "3500 PSI",
            "quantity": 9,
            "status": "Loading",
            "scheduled_time": "9:05 AM",
            "ticket_token": "sample-ticket-1002",
            "ticket_number": "1002",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": "load-1003",
            "company_id": "btc",
            "order_number": "ORD-2054",
            "customer_name": "Project Location",
            "job_number": "JOB-1054",
            "plant": "Plant 3",
            "truck_number": "BTS-003",
            "driver_name": "Driver Assigned",
            "mix": "4000 PSI",
            "quantity": 11,
            "status": "On Site",
            "scheduled_time": "10:20 AM",
            "ticket_token": "sample-ticket-1003",
            "ticket_number": "1003",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
    ]