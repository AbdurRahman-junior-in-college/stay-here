import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      // alert("Cabin Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => alert("Cabin Cannot Deleted"),
  });

  return { isDeleting, deleteCabin };
}
