from pydantic import BaseModel


class DispatchStats(BaseModel):
    scheduled_loads: int
    dispatched: int
    on_site: int
    needs_attention: int


class DispatchLoad(BaseModel):
    id: str
    company_id: str
    order_number: str
    customer_name: str
    job_number: str
    plant: str
    truck_number: str
    driver_name: str
    mix: str
    quantity: float
    status: str
    scheduled_time: str
    ticket_token: str
    ticket_number: str
    created_at: str
    updated_at: str