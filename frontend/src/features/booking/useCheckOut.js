import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../services/apiBooking";

export const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckOut } = useMutation({
    mutationFn: (id) => updateStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (error) => console.log(error?.message),
  });

  return { checkOut, isCheckOut };
};
