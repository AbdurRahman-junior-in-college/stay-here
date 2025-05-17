import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiAdmin";

export const useCabins = () => {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["search-cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
};
