import { create } from "zustand";
import type { Charger, TripResult, BookingResponse } from "../types";

interface AppStore {
  // Chargers
  chargers: Charger[];
  selectedCharger: Charger | null;
  setChargers: (chargers: Charger[]) => void;
  setSelectedCharger: (charger: Charger | null) => void;

  // Trip
  tripResult: TripResult | null;
  setTripResult: (result: TripResult) => void;

  // Booking
  lastBooking: BookingResponse | null;
  setLastBooking: (booking: BookingResponse) => void;

  // User location
  userLat: number;
  userLng: number;
  setUserLocation: (lat: number, lng: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  chargers: [],
  selectedCharger: null,
  setChargers: (chargers) => set({ chargers }),
  setSelectedCharger: (selectedCharger) => set({ selectedCharger }),

  tripResult: null,
  setTripResult: (tripResult) => set({ tripResult }),

  lastBooking: null,
  setLastBooking: (lastBooking) => set({ lastBooking }),

  userLat: 12.9352,
  userLng: 77.6245,
  setUserLocation: (userLat, userLng) => set({ userLat, userLng }),
}));