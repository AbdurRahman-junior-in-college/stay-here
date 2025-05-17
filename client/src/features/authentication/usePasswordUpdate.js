import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../services/apiAdmin";

export const usePasswordUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      updatePasswordApi({ oldPassword, newPassword }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  return { updatePassword, isLoading };
};
