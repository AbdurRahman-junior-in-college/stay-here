import { useQuery } from "@tanstack/react-query";
import { getAdmin } from "../../services/apiAdmin";

export function useAdmin() {
  const {
    isLoading,
    data: admin,
    error,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });

  return { isLoading, admin, error };
}
