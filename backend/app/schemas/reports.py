from pydantic import BaseModel
from typing import Optional


class ReportStats(BaseModel):
    reports_today: int
    ready: int
    processing: int
    needs_review: int


class ReportRow(BaseModel):
    id: str
    company_id: str
    report_name: str
    module: str
    period: str
    status: str
    last_generated: str
    file_url: Optional[str] = None
    created_at: str