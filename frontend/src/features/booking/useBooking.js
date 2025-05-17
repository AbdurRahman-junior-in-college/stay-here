import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBooking";

export const useBooking = () => {
  const { id } = useParams();
  const {
    error,
    isLoading,
    data: bookingData,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  return { error, isLoading, bookingData };
};
