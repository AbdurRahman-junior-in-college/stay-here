import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAdmin";

export const useUpdateData = () => {
  const queryClient = useQueryClient();

  const { mutate: updateData, isLoading } = useMutation({
    mutationFn: ({ name, image }) => updateUser({ name, image }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateData, isLoading };
};
