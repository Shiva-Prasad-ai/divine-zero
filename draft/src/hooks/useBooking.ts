import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../services/apiClient";

export const useBooking = () =>
  useMutation({
    mutationFn: apiClient.createBooking,
  });

