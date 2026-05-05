export type VehicleType = 'bike' | 'scooter' | 'car' | 'van';

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Charger = {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  powerKw: number;
  pricePerKwh: number;
  parkingFee: number;
  availability: string;
  connectorType: string;
  recommended?: boolean;
};

export type User = {
  username: string;
  role: 'admin' | 'user';
};

export type ChargerRequest = {
  id: string;
  chargerName: string;
  location: string;
  parkingFee: number;
  priceKwh: number;
  timeSlots: string;
  status: 'pending' | 'accepted' | 'denied';
  requestedBy: string;
};

export type TripPlanResponse = {
  polyline: Coordinates[];
  summary: { distanceKm: number; etaMinutes: number; predictedArrivalBattery: number; requiredStops: number };
  chargers: Charger[];
  weather?: any;
};
