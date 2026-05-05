import type { BookingRequest, TripPlanResponse } from "../types";

const mockTripResponse: TripPlanResponse = {
  polyline: [
    { lat: 12.9307, lng: 77.5833 }, // Jayanagar
    { lat: 12.9152, lng: 77.5921 }, // Ragigudda
    { lat: 12.9250, lng: 77.5739 }, // Banashankari
  ],
  summary: {
    distanceKm: 12,
    etaMinutes: 25,
    predictedArrivalBattery: 78,
    requiredStops: 0,
  },
  chargers: [
    {
      id: "chg-1",
      name: "Ragigudda EV Hub",
      location: "9th Block, Jayanagar",
      coordinates: { lat: 12.9152, lng: 77.5921 },
      distanceKm: 0.8,
      pricePerKwh: 18,
      availability: "Available",
      powerKw: 50,
      connector: "CCS2",
      recommended: true,
    },
    {
      id: "chg-2",
      name: "Banashankari Fast Charge",
      location: "Outer Ring Rd, Banashankari",
      coordinates: { lat: 12.9250, lng: 77.5739 },
      distanceKm: 1.5,
      pricePerKwh: 19,
      availability: "Available",
      powerKw: 60,
      connector: "Type 2",
    },
  ],
};

export const apiClient = {
  async planTrip(): Promise<TripPlanResponse> {
    return new Promise((resolve) => setTimeout(() => resolve(mockTripResponse), 900));
  },
  async fetchChargerById(id: string) {
    return mockTripResponse.chargers.find((c) => c.id === id);
  },
  async createBooking(payload: BookingRequest) {
    return new Promise<{ bookingId: string; status: string }>((resolve, reject) => {
      setTimeout(() => {
        if (payload.slot === "18:00") {
          reject(new Error("Time slot unavailable. Try another slot."));
          return;
        }
        resolve({ bookingId: `BK-${Date.now()}`, status: "confirmed" });
      }, 700);
    });
  },
};

