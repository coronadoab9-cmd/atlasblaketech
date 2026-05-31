from fastapi import APIRouter

from app.schemas.dashboard import AIInsight
from app.services.ai_service import get_ai_insights_data

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/insights", response_model=list[AIInsight])
def get_ai_insights():
    return get_ai_insights_data()