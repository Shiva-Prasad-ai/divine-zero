import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../services/apiClient";
import { useAppStore } from "../store/appStore";

export const useTripPlan = () => {
  const setRouteResult = useAppStore((s) => s.setRouteResult);
  return useMutation({
    mutationFn: apiClient.planTrip,
    onSuccess: (data) => {
      setRouteResult(data.summary, data.chargers);
    },
  });
};

