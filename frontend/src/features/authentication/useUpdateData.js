import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdmin } from "../../services/apiAdmin";

export const useUpdateData = () => {
  const queryClient = useQueryClient();

  const { mutate: updateData, isLoading } = useMutation({
    mutationFn: ({ name, avatar }) => updateAdmin({ name, avatar }),
    onSuccess: (data) => {
      queryClient.setQueryData(["admin"], data?.data);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  return { updateData, isLoading };
};
