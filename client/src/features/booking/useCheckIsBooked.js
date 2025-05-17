import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { checkBooking } from "../../services/apiAdmin";

export const useCheckIsBooked = () => {
  const { id } = useParams();
  const {
    error,
    isLoading,
    data: isBooked,
  } = useQuery({
    queryKey: ["is-booked", "booking", id],
    queryFn: () => checkBooking(id),
    retry: false,
  });

  return { error, isLoading, isBooked };
};