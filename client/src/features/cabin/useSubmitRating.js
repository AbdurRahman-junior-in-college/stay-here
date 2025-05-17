import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { submitRatings } from "../../services/apiAdmin";

export const useSubmitRating = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate: submitRatingsAndReviews, isLoading } = useMutation({
    mutationFn: ({ rating, review }) => submitRatings({ rating, review, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
  });

  return { submitRatingsAndReviews, isLoading };
};
