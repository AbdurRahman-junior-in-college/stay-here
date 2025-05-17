import { useQuery } from "@tanstack/react-query";
import { getAllObservations} from "../../services/apiAdmin";

export const useAllTestimonials = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getAllObservations,
  });

  return { testimonials, isLoading };
};