from pydantic import BaseModel, EmailStr
from typing import Optional


class Company(BaseModel):
    id: str
    name: str
    slug: str
    status: str
    logo_url: Optional[str] = None
    primary_color: str
    secondary_color: str
    contact_email: EmailStr
    support_email: EmailStr
    plan: str
    purchased_modules: list[str]
    created_at: str
    updated_at: str


class CompanyUser(BaseModel):
    id: str
    company_id: str
    name: str
    email: EmailStr
    role: str
    active: bool
    allowed_modules: list[str]
    created_at: str
    updated_at: str