from fastapi import APIRouter

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.get("/company")
def get_company():
    return {
        "id": "btc",
        "name": "Big Town Concrete",
        "slug": "big-town-concrete",
        "status": "active",
        "logo_url": None,
        "primary_color": "#005BFF",
        "secondary_color": "#020817",
        "contact_email": "office@bigtownconcrete.com",
        "support_email": "support@atlasblaketech.com",
        "plan": "enterprise",
        "purchased_modules": [
            "dispatch",
            "fleet",
            "etickets",
            "reports",
            "ai_assistant",
            "admin",
        ],
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
    }


@router.get("/modules")
def get_modules():
    return [
        "dispatch",
        "fleet",
        "etickets",
        "reports",
        "ai_assistant",
        "admin",
    ]


@router.get("/users")
def get_users():
    return [
        {
            "id": "user-001",
            "company_id": "btc",
            "name": "BTC Admin",
            "email": "admin@bigtownconcrete.com",
            "role": "admin",
            "active": True,
            "allowed_modules": [
                "dispatch",
                "fleet",
                "etickets",
                "reports",
                "ai_assistant",
                "admin",
            ],
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
        {
            "id": "user-002",
            "company_id": "btc",
            "name": "Dispatcher",
            "email": "dispatch@bigtownconcrete.com",
            "role": "dispatcher",
            "active": True,
            "allowed_modules": ["dispatch", "fleet", "etickets"],
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
        },
    ]


@router.get("/alerts")
def get_alerts():
    return [
        {
            "id": "alert-001",
            "company_id": "btc",
            "title": "Missing customer signature",
            "message": "Ticket 1001 is still waiting for customer acceptance.",
            "severity": "warning",
            "module": "etickets",
            "created_at": "Today, 4:25 PM",
            "resolved_at": None,
        }
    ]


@router.get("/recent-activity")
def get_recent_activity():
    return [
        {
            "id": "activity-001",
            "company_id": "btc",
            "title": "Ticket created",
            "description": "Ticket 1001 was created for Customer Site.",
            "module": "etickets",
            "actor_name": "System",
            "created_at": "Today, 4:20 PM",
        },
        {
            "id": "activity-002",
            "company_id": "btc",
            "title": "Truck status updated",
            "description": "Truck BTS-01A changed status to En Route.",
            "module": "fleet",
            "actor_name": "Driver Tablet",
            "created_at": "Today, 4:18 PM",
        },
    ]