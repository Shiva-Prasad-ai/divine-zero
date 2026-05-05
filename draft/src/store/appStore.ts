import { create } from "zustand";
import type { Charger, ChargerRequest, User, Coordinates } from "../types";

type TripInput = {
  source: string;
  destination: string;
  batteryPercent: number;
  batteryCapacity: number;
  selectedVehicle: string;
};

type AppState = {
  user: User | null;
  tripInput: TripInput;
  routeSummary?: any;
  routePolyline?: Coordinates[];
  weather?: any;
  chargers: Charger[];
  chargerRequests: ChargerRequest[];
  setUser: (user: User | null) => void;
  setTripInput: (payload: Partial<TripInput>) => void;
  setRouteResult: (summary: any, chargers: Charger[], polyline?: Coordinates[], weather?: any) => void;
  submitChargerRequest: (req: Omit<ChargerRequest, 'id' | 'status' | 'requestedBy'>) => void;
  acceptRequest: (id: string) => void;
  denyRequest: (id: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  tripInput: {
    source: "",
    destination: "",
    batteryPercent: 65,
    batteryCapacity: 50,
    selectedVehicle: "car",
  },
  chargers: [],
  chargerRequests: [],
  setUser: (user) => set({ user }),
  setTripInput: (payload) => set((state) => ({ tripInput: { ...state.tripInput, ...payload } })),
  setRouteResult: (summary, chargers, polyline, weather) => set({ routeSummary: summary, chargers, routePolyline: polyline, weather }),
  submitChargerRequest: (req) => set((state) => {
    if (!state.user) return state;
    const newReq: ChargerRequest = {
      ...req,
      id: Date.now().toString(),
      status: 'pending',
      requestedBy: state.user.username
    };
    return { chargerRequests: [...state.chargerRequests, newReq] };
  }),
  acceptRequest: (id) => set((state) => {
    const requests = state.chargerRequests.map(r => r.id === id ? { ...r, status: 'accepted' as const } : r);
    const req = requests.find(r => r.id === id);
    if (!req) return { chargerRequests: requests };
    const newCharger: Charger = {
      id: req.id,
      name: req.chargerName,
      address: req.location,
      coordinates: { lat: 12.9307, lng: 77.5833 },
      powerKw: 50,
      pricePerKwh: req.priceKwh,
      parkingFee: req.parkingFee,
      availability: 'Available',
      connectorType: 'Type 2'
    };
    return { chargerRequests: requests, chargers: [...state.chargers, newCharger] };
  }),
  denyRequest: (id) => set((state) => ({
    chargerRequests: state.chargerRequests.map(r => r.id === id ? { ...r, status: 'denied' } : r)
  }))
}));
