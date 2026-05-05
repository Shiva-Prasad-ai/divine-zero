from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ChargerCreate(BaseModel):
    name: str
    latitude: float
    longitude: float
    price_per_kwh: float
    is_available: bool = True

class ChargerResponse(BaseModel):
    id: str
    name: str
    latitude: float
    longitude: float
    price_per_kwh: float
    is_available: bool
    created_at: datetime