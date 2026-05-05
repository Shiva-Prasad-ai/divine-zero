from fastapi import APIRouter
from app.chargers.schemas import ChargerCreate, ChargerResponse
from app.chargers import service

router = APIRouter(prefix="/api/chargers", tags=["Chargers"])

@router.get("/nearby", response_model=list[ChargerResponse])
async def nearby(lat: float, lng: float, radius_km: float = 10):
    return await service.get_nearby_chargers(lat, lng, radius_km)

@router.post("/", response_model=ChargerResponse, status_code=201)
async def add_charger(data: ChargerCreate):
    return await service.create_charger(data)

@router.patch("/{charger_id}/availability")
async def set_availability(charger_id: str, is_available: bool):
    return await service.toggle_availability(charger_id, is_available)