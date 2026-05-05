from app.core.database import chargers_collection
from app.chargers.schemas import ChargerCreate
from datetime import datetime, timezone
from bson import ObjectId

async def create_charger(data: ChargerCreate) -> dict:
    doc = data.model_dump()
    doc["created_at"] = datetime.now(timezone.utc)
    result = await chargers_collection.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

async def get_all_chargers() -> list:
    chargers = []
    async for c in chargers_collection.find():
        c["id"] = str(c["_id"])
        chargers.append(c)
    return chargers