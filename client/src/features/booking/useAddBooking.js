import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addBooking as addBookingApi } from "../../services/apiAdmin";

export const useAddBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { mutate: addBooking, isLoading } = useMutation({
    mutationFn: addBookingApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active:true });
      navigate('/bookings')
    },
  });

  return { addBooking, isLoading };
};
