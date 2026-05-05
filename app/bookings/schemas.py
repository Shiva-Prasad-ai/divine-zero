from pydantic import BaseModel
from datetime import datetime

class BookingCreate(BaseModel):
    charger_id: str
    driver_name: str
    driver_email: str
    start_time: datetime
    end_time: datetime

class BookingResponse(BaseModel):
    id: str
    charger_id: str
    driver_name: str
    driver_email: str
    start_time: datetime
    end_time: datetime
    status: str
    total_price: float
    message: str