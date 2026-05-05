from app.core.database import chargers_collection
from app.chargers.schemas import ChargerCreate
from datetime import datetime, timezone
from bson import ObjectId
import math

def _distance_km(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

def _format(c: dict) -> dict:
    c["id"] = str(c["_id"])
    c["effective_price"] = round(c["price_per_kwh"] * c.get("demand_multiplier", 1.0), 2)
    return c

async def create_charger(data: ChargerCreate) -> dict:
    doc = data.model_dump()
    doc["created_at"] = datetime.now(timezone.utc)
    result = await chargers_collection.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc["effective_price"] = round(doc["price_per_kwh"] * doc["demand_multiplier"], 2)
    return doc

async def get_nearby_chargers(lat: float, lng: float, radius_km: float = 10) -> list:
    chargers = []
    async for c in chargers_collection.find({"is_available": True}):
        dist = _distance_km(lat, lng, c["latitude"], c["longitude"])
        if dist <= radius_km:
            c = _format(c)
            c["distance_km"] = round(dist, 2)
            chargers.append(c)
    return sorted(chargers, key=lambda x: x["distance_km"])

async def toggle_availability(charger_id: str, status: bool):
    await chargers_collection.update_one(
        {"_id": ObjectId(charger_id)},
        {"$set": {"is_available": status}}
    )
    return {"updated": True}