from fastapi import APIRouter

from app.schemas.company import Company, CompanyUser
from app.schemas.dashboard import DashboardAlert, RecentActivity
from app.services.platform_service import (
    get_alerts_data,
    get_company_data,
    get_modules_data,
    get_recent_activity_data,
    get_users_data,
)

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.get("/company", response_model=Company)
def get_company():
    return get_company_data()


@router.get("/modules", response_model=list[str])
def get_modules():
    return get_modules_data()


@router.get("/users", response_model=list[CompanyUser])
def get_users():
    return get_users_data()


@router.get("/alerts", response_model=list[DashboardAlert])
def get_alerts():
    return get_alerts_data()


@router.get("/recent-activity", response_model=list[RecentActivity])
def get_recent_activity():
    return get_recent_activity_data()