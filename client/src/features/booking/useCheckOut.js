import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checked_out_Status } from "../../services/apiAdmin";

export const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckOut } = useMutation({
    mutationFn: (id) => checked_out_Status(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (error) => console.log(error?.message),
  });

  return { checkOut, isCheckOut };
};
