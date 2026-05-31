from pydantic import BaseModel, EmailStr
from typing import Optional


class ETicket(BaseModel):
    id: int
    company_id: str
    token: str
    ticket_number: str
    customer_name: str
    customer_email: EmailStr
    job_number: str
    order_number: str
    address: str
    plant: str
    truck_number: str
    driver_id: Optional[int] = None
    driver_name: Optional[str] = None
    product: str
    mix_number: str
    mix_description: str
    quantity: float
    delivered_qty_total: float
    order_total: float
    status: str
    load_time: str
    signed_at: Optional[str] = None
    water_allowed: float
    qc_water_added: float
    customer_water_added: float
    ticket_acceptance: Optional[str] = None
    rejection_reason: Optional[str] = None
    created_at: str
    updated_at: str