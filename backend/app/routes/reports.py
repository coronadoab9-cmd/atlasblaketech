from fastapi import APIRouter

from app.data.mock_data import REPORTS, REPORT_STATS
from app.schemas.reports import ReportRow, ReportStats

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/stats", response_model=ReportStats)
def get_report_stats():
    return REPORT_STATS


@router.get("", response_model=list[ReportRow])
def get_reports():
    return REPORTS