export type Coordinates = {
  lat: number;
  lng: number;
};

export type VehicleType = "bike" | "car" | "scooter" | "van";

export type RouteSummary = {
  distanceKm: number;
  etaMinutes: number;
  predictedArrivalBattery: number;
  requiredStops: number;
};

export type Charger = {
  id: string;
  name: string;
  location: string;
  coordinates: Coordinates;
  distanceKm: number;
  pricePerKwh: number;
  availability: "Available" | "Busy" | "Offline";
  powerKw: number;
  connector: string;
  recommended?: boolean;
};

export type TripPlanResponse = {
  polyline: Coordinates[];
  summary: RouteSummary;
  chargers: Charger[];
};

export type BookingRequest = {
  chargerId: string;
  date: string;
  slot: string;
};

