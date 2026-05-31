from fastapi import APIRouter

from app.data.mock_data import ALERTS, COMPANY, MODULES, RECENT_ACTIVITY, USERS
from app.schemas.company import Company, CompanyUser
from app.schemas.dashboard import DashboardAlert, RecentActivity

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.get("/company", response_model=Company)
def get_company():
    return COMPANY


@router.get("/modules", response_model=list[str])
def get_modules():
    return MODULES


@router.get("/users", response_model=list[CompanyUser])
def get_users():
    return USERS


@router.get("/alerts", response_model=list[DashboardAlert])
def get_alerts():
    return ALERTS


@router.get("/recent-activity", response_model=list[RecentActivity])
def get_recent_activity():
    return RECENT_ACTIVITY