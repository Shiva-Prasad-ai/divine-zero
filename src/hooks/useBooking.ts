import { useState } from "react";
import { bookCharger } from "../services/apiClient";
import { useAppStore } from "../store/appStore";
import type { BookingRequest, BookingResponse } from "../types";

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setLastBooking = useAppStore((s) => s.setLastBooking);

  const submitBooking = async (
    data: BookingRequest
  ): Promise<BookingResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await bookCharger(data);
      setLastBooking(result);
      return result;
    } catch (err) {
      setError("Booking failed. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitBooking, loading, error };
};