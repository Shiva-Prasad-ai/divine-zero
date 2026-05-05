from fastapi import APIRouter
from app.chargers.schemas import ChargerCreate, ChargerResponse
from app.chargers import service

router = APIRouter(prefix="/api/chargers", tags=["Chargers"])

@router.get("/", response_model=list[ChargerResponse])
async def list_chargers():
    return await service.get_all_chargers()

@router.post("/", response_model=ChargerResponse, status_code=201)
async def add_charger(data: ChargerCreate):
    return await service.create_charger(data)