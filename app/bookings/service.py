from app.core.database import bookings_collection, chargers_collection
from app.bookings.schemas import BookingCreate
from datetime import datetime, timezone
from bson import ObjectId

async def create_booking(data: BookingCreate) -> dict:
    charger = await chargers_collection.find_one({"_id": ObjectId(data.charger_id)})
    if not charger:
        return {"id": "", "charger_id": data.charger_id, "driver_name": data.driver_name,
                "driver_email": data.driver_email, "start_time": data.start_time,
                "end_time": data.end_time, "status": "rejected", "total_price": 0,
                "message": "Charger not found"}

    conflict = await bookings_collection.find_one({
        "charger_id": data.charger_id,
        "status": "confirmed",
        "$or": [{"start_time": {"$lt": data.end_time}, "end_time": {"$gt": data.start_time}}]
    })

    if conflict:
        return {"id": "", "charger_id": data.charger_id, "driver_name": data.driver_name,
                "driver_email": data.driver_email, "start_time": data.start_time,
                "end_time": data.end_time, "status": "rejected", "total_price": 0,
                "message": f"Already booked from {conflict['start_time']} to {conflict['end_time']}"}

    duration_hours = (data.end_time - data.start_time).seconds / 3600
    effective_price = charger["price_per_kwh"] * charger.get("demand_multiplier", 1.0)
    total_price = round(effective_price * charger["max_kw"] * duration_hours, 2)

    doc = data.model_dump()
    doc["status"] = "confirmed"
    doc["total_price"] = total_price
    doc["created_at"] = datetime.now(timezone.utc)
    result = await bookings_collection.insert_one(doc)

    return {"id": str(result.inserted_id), **data.model_dump(),
            "status": "confirmed", "total_price": total_price,
            "message": "Booking confirmed! Charger owner will be notified."}

async def get_bookings_for_charger(charger_id: str) -> list:
    bookings = []
    async for b in bookings_collection.find({"charger_id": charger_id}):
        b["id"] = str(b["_id"])
        bookings.append(b)
    return bookings