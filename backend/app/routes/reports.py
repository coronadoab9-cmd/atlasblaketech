from fastapi import APIRouter

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/stats")
def get_report_stats():
    return {
        "reports_today": 4,
        "ready": 2,
        "processing": 1,
        "needs_review": 1,
    }


@router.get("")
def get_reports():
    return [
        {
            "id": "report-001",
            "company_id": "btc",
            "report_name": "Daily Dispatch Summary",
            "module": "Dispatch",
            "period": "Today",
            "status": "Ready",
            "last_generated": "Today, 4:15 PM",
            "file_url": None,
            "created_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": "report-002",
            "company_id": "btc",
            "report_name": "Signed eTicket Export",
            "module": "eTickets",
            "period": "Today",
            "status": "Ready",
            "last_generated": "Today, 4:10 PM",
            "file_url": None,
            "created_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": "report-003",
            "company_id": "btc",
            "report_name": "Fleet Activity Summary",
            "module": "Fleet",
            "period": "Today",
            "status": "Processing",
            "last_generated": "Today, 3:55 PM",
            "file_url": None,
            "created_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": "report-004",
            "company_id": "btc",
            "report_name": "Rejected Delivery Exceptions",
            "module": "eTickets",
            "period": "This Week",
            "status": "Needs Review",
            "last_generated": "Today, 2:40 PM",
            "file_url": None,
            "created_at": "2026-01-01T00:00:00Z",
        },
    ]