from pydantic import BaseModel

class ChargerCreate(BaseModel):
    owner_name: str
    latitude: float
    longitude: float
    address: str
    price_per_kwh: float
    demand_multiplier: float = 1.0
    max_kw: float
    is_available: bool = True

class ChargerResponse(BaseModel):
    id: str
    owner_name: str
    latitude: float
    longitude: float
    address: str
    price_per_kwh: float
    effective_price: float
    max_kw: float
    is_available: bool