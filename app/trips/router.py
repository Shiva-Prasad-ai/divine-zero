from fastapi import APIRouter
from app.trips.schemas import TripRequest
from app.trips import service

router = APIRouter(prefix="/api/trips", tags=["Trip Planner"])

@router.post("/plan")
async def plan_trip(data: TripRequest):
    return await service.plan_trip(data)