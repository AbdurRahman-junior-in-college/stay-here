import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { cancelUserBooking } from "../../services/apiAdmin";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: cancelBooking, isLoading: isCanceling } = useMutation({
    mutationFn: cancelUserBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking-info"] });
      navigate("/");

      // const seenBookings = JSON.parse(localStorage.getItem("seenBookings"));
      // const filterSeenBookings = seenBookings?.filter(
      //   (storedId) => storedId !== id
      // );
      // localStorage.removeItem("seenBookings");
      // localStorage.setItem("seenBookings", JSON.stringfy(filterSeenBookings));
    },
    onError: (err) => console.log(err),
  });

  return { cancelBooking, isCanceling };
};
