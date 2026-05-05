import { create } from "zustand";
import type { Charger, RouteSummary, VehicleType } from "../types";

type TripInput = {
  source: string;
  destination: string;
  batteryPercent: number;
  selectedVehicle: VehicleType;
};

type AppState = {
  tripInput: TripInput;
  routeSummary?: RouteSummary;
  chargers: Charger[];
  selectedCharger?: Charger;
  bookingDraft: { date: string; slot: string };
  theme: "light" | "dark";
  setTripInput: (payload: Partial<TripInput>) => void;
  setRouteResult: (summary: RouteSummary, chargers: Charger[]) => void;
  selectCharger: (charger?: Charger) => void;
  setBookingDraft: (date: string, slot: string) => void;
  setTheme: (theme: "light" | "dark") => void;
};

export const useAppStore = create<AppState>((set) => ({
  tripInput: {
    source: "",
    destination: "",
    batteryPercent: 65,
    selectedVehicle: "car",
  },
  chargers: [],
  bookingDraft: { date: "", slot: "" },
  theme: "light",
  setTripInput: (payload) =>
    set((state) => ({ tripInput: { ...state.tripInput, ...payload } })),
  setRouteResult: (summary, chargers) => set({ routeSummary: summary, chargers }),
  selectCharger: (charger) => set({ selectedCharger: charger }),
  setBookingDraft: (date, slot) => set({ bookingDraft: { date, slot } }),
  setTheme: (theme) => set({ theme }),
}));

