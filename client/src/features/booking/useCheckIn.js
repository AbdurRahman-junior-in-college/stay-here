import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { checked_in_Status } from "../../services/apiAdmin";
import { updatePrices, updateStatus } from "../../services/apiBooking";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isChecking } = useMutation({
    mutationFn: (id) => checked_in_Status(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["booking-info", "booking"] });
      // navigate("/");
    },
    onError: (error) => console.log(error?.message),
  });

  return { checkIn, isChecking };
};

export const useCheckinBreakfast = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkInBreakfast, isLoading: isCheckingBreakfast } =
    useMutation({
      mutationFn: ({ bookingId, breakfast }) =>
        updatePrices(bookingId, { ...breakfast }),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["bookings", "booking"] });
        navigate("/");
      },
      onError: (error) => console.log(error?.message),
    });

  return { isCheckingBreakfast, checkInBreakfast };
};
