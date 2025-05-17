import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../services/apiSetting";

export function useSetting() {
  const {
    isLoading,
    data: setting,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSetting,
  });
  return {isLoading, setting, error}
}
