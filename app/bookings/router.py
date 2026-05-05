from fastapi import APIRouter
from app.bookings.schemas import BookingCreate, BookingResponse
from app.bookings import service

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

@router.post("/", response_model=BookingResponse)
async def book_charger(data: BookingCreate):
    return await service.create_booking(data)

@router.get("/charger/{charger_id}")
async def charger_bookings(charger_id: str):
    return await service.get_bookings_for_charger(charger_id)