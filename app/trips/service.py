from app.trips.schemas import TripRequest
from app.chargers.service import get_nearby_chargers
import math

def get_weather_range_reduction(lat: float, lng: float) -> dict:
    return {
        "condition": "rain",
        "range_reduction_percent": 15,
        "temperature_c": 18
    }

def _distance_km(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

async def plan_trip(data: TripRequest) -> dict:
    total_distance = _distance_km(
        data.origin_lat, data.origin_lng,
        data.dest_lat, data.dest_lng
    )
    weather = get_weather_range_reduction(data.origin_lat, data.origin_lng)
    reduction = weather["range_reduction_percent"] / 100
    adjusted_range = data.range_km * (1 - reduction)
    usable_range = adjusted_range * (data.battery_soc_percent / 100)
    needs_charging = usable_range < total_distance
    charging_stops = []

    if needs_charging:
        mid_lat = (data.origin_lat + data.dest_lat) / 2
        mid_lng = (data.origin_lng + data.dest_lng) / 2
        nearby = await get_nearby_chargers(mid_lat, mid_lng, radius_km=20)
        charging_stops = nearby[:2]

    return {
        "total_distance_km": round(total_distance, 2),
        "usable_range_km": round(usable_range, 2),
        "needs_charging": needs_charging,
        "weather": weather,
        "suggested_charging_stops": charging_stops,
        "message": (
            f"Weather ({weather['condition']}) reduces range by {weather['range_reduction_percent']}%. "
            f"Your usable range is {round(usable_range)}km for a {round(total_distance)}km trip."
        )
    }