from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = AsyncIOMotorClient(settings.mongo_url)
db = client[settings.db_name]

# Collections (like tables in SQL)
chargers_collection = db["chargers"]
bookings_collection = db["bookings"]
users_collection    = db["users"]