import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCabin } from "../../services/apiAdmin";

export const useCabin = () => {
  const { id } = useParams();
  const { data: cabin, isLoading } = useQuery({
    queryKey: ["cabin"],
    queryFn: () => getCabin(id),
  });

  return { cabin, isLoading };
};
