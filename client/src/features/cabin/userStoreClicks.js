import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { storeUserClicks } from "../../services/apiAdmin";

export const useStoreClicks = () => {
  const { mutate: storeClicks, isLoading } = useMutation({
    mutationFn: (id) => storeUserClicks(id),
    onSuccess: () => {
      console.log("Clicks added");
    },
  });

  return { storeClicks, isLoading };
};
