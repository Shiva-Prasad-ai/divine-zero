from fastapi import FastAPI
from app.chargers.router import router as chargers_router
from app.bookings.router import router as bookings_router
from app.trips.router import router as trips_router

app = FastAPI(
    title="Smart EV Networking API",
    version="0.1.0",
    description="EV route planning, charger discovery and booking platform"
)

app.include_router(chargers_router)
app.include_router(bookings_router)
app.include_router(trips_router)

@app.get("/health")
async def health():
    return {"status": "ok"}