import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin as duplicateCabinApi } from "../../services/apiCabins";

export function useDuplicateCabin () {
    // duplicate

    const queryClient = useQueryClient();
    const { mutate: duplicateCabin, isLoading: isDuplicating } = useMutation({
      mutationFn: duplicateCabinApi,
      onSuccess: () => {
        // alert("Cabin added successfully");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: (error) => alert(error.message),
    });
    return {duplicateCabin , isDuplicating}
}