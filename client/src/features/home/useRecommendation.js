import { useQuery } from "@tanstack/react-query";
import { getRecommendedCabins } from "../../services/apiAdmin";

export const useRecommendation = () => {
  const { data: recommended, isLoading } = useQuery({
    queryKey: ["recommendation"],
    queryFn: getRecommendedCabins,
  });

  return { recommended, isLoading };
};
