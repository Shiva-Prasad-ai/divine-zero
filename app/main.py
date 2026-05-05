from fastapi import FastAPI
from app.chargers.router import router as chargers_router

app = FastAPI(
    title="Smart EV Networking API",
    version="0.1.0"
)

app.include_router(chargers_router)

@app.get("/health")
async def health():
    return {"status": "ok"}