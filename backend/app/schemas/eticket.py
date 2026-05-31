from pydantic import BaseModel, EmailStr
from typing import Optional


class ETicketBase(BaseModel):
    company_id: str = "btc"
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
    product: str = "Concrete"
    mix_number: str
    mix_description: str
    quantity: float
    delivered_qty_total: float
    order_total: float
    status: str = "pending"
    load_time: str
    signed_at: Optional[str] = None
    water_allowed: float = 0
    qc_water_added: float = 0
    customer_water_added: float = 0
    ticket_acceptance: Optional[str] = None
    rejection_reason: Optional[str] = None


class ETicketCreate(ETicketBase):
    pass


class ETicket(ETicketBase):
    id: int
    token: str
    created_at: str
    updated_at: str