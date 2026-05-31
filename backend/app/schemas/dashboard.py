from pydantic import BaseModel
from typing import Optional


class DashboardAlert(BaseModel):
    id: str
    company_id: str
    title: str
    message: str
    severity: str
    module: str
    created_at: str
    resolved_at: Optional[str] = None


class RecentActivity(BaseModel):
    id: str
    company_id: str
    title: str
    description: str
    module: str
    actor_name: str
    created_at: str


class AIInsight(BaseModel):
    id: str
    company_id: str
    title: str
    summary: str
    confidence: float
    category: str
    recommended_action: str
    created_at: str