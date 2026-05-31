from fastapi import APIRouter

from app.data.mock_data import AI_INSIGHTS

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/insights")
def get_ai_insights():
    return AI_INSIGHTS