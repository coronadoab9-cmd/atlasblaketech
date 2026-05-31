from fastapi import APIRouter

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/insights")
def get_ai_insights():
    return [
        {
            "id": "ai-001",
            "company_id": "btc",
            "title": "Possible late delivery",
            "summary": "Truck BTS-003 has been on site longer than expected.",
            "confidence": 0.84,
            "category": "late_delivery",
            "recommended_action": "Check dispatch board and call the driver if no update is received.",
            "created_at": "Today, 4:30 PM",
        },
        {
            "id": "ai-002",
            "company_id": "btc",
            "title": "Missing customer signature",
            "summary": "Ticket 1001 has GPS activity but is still missing customer acceptance.",
            "confidence": 0.91,
            "category": "ticket_exception",
            "recommended_action": "Send the public ticket link again or contact the customer.",
            "created_at": "Today, 4:25 PM",
        },
        {
            "id": "ai-003",
            "company_id": "btc",
            "title": "Daily report ready",
            "summary": "The dispatch summary can be generated from today’s ticket and truck activity.",
            "confidence": 0.76,
            "category": "reporting",
            "recommended_action": "Generate the daily dispatch report after the final load is completed.",
            "created_at": "Today, 4:00 PM",
        },
    ]