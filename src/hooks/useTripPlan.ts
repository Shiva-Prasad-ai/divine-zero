import { useState } from "react";
import { planTrip } from "../services/apiClient";
import { useAppStore } from "../store/appStore";
import type { TripRequest, TripResult } from "../types";

export const useTripPlan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setTripResult = useAppStore((s) => s.setTripResult);
  const setChargers = useAppStore((s) => s.setChargers);

  const submitTrip = async (data: TripRequest): Promise<TripResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await planTrip(data);
      setTripResult(result);
      // Also store suggested stops as chargers on map
      if (result.suggested_charging_stops?.length) {
        setChargers(result.suggested_charging_stops);
      }
      return result;
    } catch (err) {
      setError("Could not plan trip. Is the backend running?");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitTrip, loading, error };
};