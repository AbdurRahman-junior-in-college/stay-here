import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBooking";

export const useDeletingBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deletingBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      // const seenBookings = JSON.parse(localStorage.getItem("seenBookings"));
      // const filterSeenBookings = seenBookings?.filter(
      //   (storedId) => storedId !== id
      // );
      // localStorage.removeItem("seenBookings");
      // localStorage.setItem("seenBookings", JSON.stringfy(filterSeenBookings));
    },
    onError: (err) => console.log(err),
  });

  return { deletingBooking, isDeleting };
};
