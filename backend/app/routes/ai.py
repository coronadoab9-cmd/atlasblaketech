from fastapi import APIRouter

from app.data.mock_data import AI_INSIGHTS
from app.schemas.dashboard import AIInsight

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/insights", response_model=list[AIInsight])
def get_ai_insights():
    return AI_INSIGHTS