import { useQuery } from "@tanstack/react-query";
import { getBookingInformations } from "../../services/apiAdmin";

export const useBookingInfo = () => {
  const {
    error,
    isLoading,
    data: bookingInfo,
  } = useQuery({
    queryKey: ["booking-info"],
    queryFn: getBookingInformations,
    retry: false,
  });

  return { error, isLoading, bookingInfo };
};
