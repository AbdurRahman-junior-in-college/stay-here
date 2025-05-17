import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreatting } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      // alert("Cabin added successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => alert(error.message),
  });
  return {createCabin , isCreatting}
}
