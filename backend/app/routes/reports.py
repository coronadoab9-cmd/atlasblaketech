from fastapi import APIRouter

from app.schemas.reports import ReportRow, ReportStats
from app.services.report_service import get_report_stats_data, get_reports_data

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/stats", response_model=ReportStats)
def get_report_stats():
    return get_report_stats_data()


@router.get("", response_model=list[ReportRow])
def get_reports():
    return get_reports_data()