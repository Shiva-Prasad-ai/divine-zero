from pydantic import BaseModel

class TripRequest(BaseModel):
    origin_lat: float
    origin_lng: float
    dest_lat: float
    dest_lng: float
    battery_soc_percent: float
    range_km: float