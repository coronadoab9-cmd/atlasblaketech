from fastapi import APIRouter

from app.data.mock_data import ALERTS, COMPANY, MODULES, RECENT_ACTIVITY, USERS

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.get("/company")
def get_company():
    return COMPANY


@router.get("/modules")
def get_modules():
    return MODULES


@router.get("/users")
def get_users():
    return USERS


@router.get("/alerts")
def get_alerts():
    return ALERTS


@router.get("/recent-activity")
def get_recent_activity():
    return RECENT_ACTIVITY