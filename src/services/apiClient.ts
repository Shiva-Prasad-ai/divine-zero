import type {
  Charger,
  TripRequest,
  TripResult,
  BookingRequest,
  BookingResponse,
  ChargerCreate,
} from "../types";

const BASE = "/api";

// ── Chargers ───────────────────────────────────────────
export const getNearbyChargers = async (
  lat: number,
  lng: number,
  radius = 10
): Promise<Charger[]> => {
  const res = await fetch(
    `${BASE}/chargers/nearby?lat=${lat}&lng=${lng}&radius_km=${radius}`
  );
  if (!res.ok) throw new Error("Failed to fetch chargers");
  return res.json();
};

export const addCharger = async (
  data: ChargerCreate
): Promise<Charger> => {
  const res = await fetch(`${BASE}/chargers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add charger");
  return res.json();
};

export const setChargerAvailability = async (
  chargerId: string,
  is_available: boolean
): Promise<void> => {
  await fetch(
    `${BASE}/chargers/${chargerId}/availability?is_available=${is_available}`,
    { method: "PATCH" }
  );
};

// ── Trip Planner ───────────────────────────────────────
export const planTrip = async (
  data: TripRequest
): Promise<TripResult> => {
  const res = await fetch(`${BASE}/trips/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to plan trip");
  return res.json();
};

// ── Bookings ───────────────────────────────────────────
export const bookCharger = async (
  data: BookingRequest
): Promise<BookingResponse> => {
  const res = await fetch(`${BASE}/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to book charger");
  return res.json();
};

export const getChargerBookings = async (
  chargerId: string
): Promise<BookingResponse[]> => {
  const res = await fetch(`${BASE}/bookings/charger/${chargerId}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};