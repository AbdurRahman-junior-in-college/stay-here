import { useQuery} from "@tanstack/react-query";
import { getUserProfile } from "../../services/apiAdmin";

export function useUserProfile() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    
  });

  return { isLoading, user, error };
}
