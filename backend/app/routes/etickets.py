from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/etickets", tags=["eTickets"])


TICKETS = [
    {
        "id": 1,
        "company_id": "btc",
        "token": "sample-ticket-1001",
        "ticket_number": "1001",
        "customer_name": "Customer Site",
        "customer_email": "customer@example.com",
        "job_number": "JOB-1048",
        "order_number": "ORD-2048",
        "address": "Dallas, TX",
        "plant": "Plant 1",
        "truck_number": "BTS-01A",
        "driver_id": 1,
        "driver_name": "Driver Assigned",
        "product": "Concrete",
        "mix_number": "3000 PSI",
        "mix_description": "Standard 3000 PSI Mix",
        "quantity": 10,
        "delivered_qty_total": 10,
        "order_total": 30,
        "status": "pending",
        "load_time": "Today, 8:15 AM",
        "signed_at": None,
        "water_allowed": 0,
        "qc_water_added": 0,
        "customer_water_added": 0,
        "ticket_acceptance": None,
        "rejection_reason": None,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
    },
    {
        "id": 2,
        "company_id": "btc",
        "token": "sample-ticket-1002",
        "ticket_number": "1002",
        "customer_name": "Commercial Pour",
        "customer_email": "customer2@example.com",
        "job_number": "JOB-1051",
        "order_number": "ORD-2051",
        "address": "Dallas, TX",
        "plant": "Plant 2",
        "truck_number": "BTS-002",
        "driver_id": 2,
        "driver_name": "Driver Assigned",
        "product": "Concrete",
        "mix_number": "3500 PSI",
        "mix_description": "Standard 3500 PSI Mix",
        "quantity": 9,
        "delivered_qty_total": 9,
        "order_total": 18,
        "status": "signed",
        "load_time": "Today, 9:05 AM",
        "signed_at": "Today, 10:15 AM",
        "water_allowed": 0,
        "qc_water_added": 0,
        "customer_water_added": 0,
        "ticket_acceptance": "Accepted Delivery",
        "rejection_reason": None,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
    },
    {
        "id": 3,
        "company_id": "btc",
        "token": "sample-ticket-1003",
        "ticket_number": "1003",
        "customer_name": "Project Location",
        "customer_email": "customer3@example.com",
        "job_number": "JOB-1054",
        "order_number": "ORD-2054",
        "address": "Dallas, TX",
        "plant": "Plant 3",
        "truck_number": "BTS-003",
        "driver_id": 3,
        "driver_name": "Driver Assigned",
        "product": "Concrete",
        "mix_number": "4000 PSI",
        "mix_description": "Standard 4000 PSI Mix",
        "quantity": 11,
        "delivered_qty_total": 11,
        "order_total": 22,
        "status": "rejected",
        "load_time": "Today, 10:20 AM",
        "signed_at": None,
        "water_allowed": 0,
        "qc_water_added": 0,
        "customer_water_added": 0,
        "ticket_acceptance": "Rejected Delivery",
        "rejection_reason": "Slump",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
    },
]


@router.get("")
def get_etickets():
    return TICKETS


@router.get("/{token}")
def get_eticket_by_token(token: str):
    ticket = next((item for item in TICKETS if item["token"] == token), None)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket