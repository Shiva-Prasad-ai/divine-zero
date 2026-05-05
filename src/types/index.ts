export interface Charger {
  id: string;
  owner_name: string;
  latitude: number;
  longitude: number;
  address: string;
  price_per_kwh: number;
  effective_price: number;
  max_kw: number;
  is_available: boolean;
  distance_km?: number;
}

export interface TripRequest {
  origin_lat: number;
  origin_lng: number;
  dest_lat: number;
  dest_lng: number;
  battery_soc_percent: number;
  range_km: number;
}

export interface TripResult {
  total_distance_km: number;
  usable_range_km: number;
  needs_charging: boolean;
  weather: {
    condition: string;
    range_reduction_percent: number;
    temperature_c: number;
  };
  suggested_charging_stops: Charger[];
  message: string;
}

export interface BookingRequest {
  charger_id: string;
  driver_name: string;
  driver_email: string;
  start_time: string;
  end_time: string;
}

export interface BookingResponse {
  id: string;
  charger_id: string;
  driver_name: string;
  driver_email: string;
  start_time: string;
  end_time: string;
  status: string;
  total_price: number;
  message: string;
}

export interface ChargerCreate {
  owner_name: string;
  latitude: number;
  longitude: number;
  address: string;
  price_per_kwh: number;
  demand_multiplier: number;
  max_kw: number;
  is_available: boolean;
}