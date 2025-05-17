import { useQuery } from "@tanstack/react-query";
import { getRcommend } from "../../services/apiAdmin";

export const useRecommend = () => {
  const { data: recommend, isLoading } = useQuery({
    queryKey: ["recommend"],
    queryFn: getRcommend,
  });

  return { recommend, isLoading };
};
