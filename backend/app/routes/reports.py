from fastapi import APIRouter

from app.data.mock_data import REPORTS, REPORT_STATS

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/stats")
def get_report_stats():
    return REPORT_STATS


@router.get("")
def get_reports():
    return REPORTS