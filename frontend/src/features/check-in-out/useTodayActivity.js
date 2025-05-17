import { useQuery } from "@tanstack/react-query";
import { getTodayActivities } from "../../services/apiBooking";

export const useTodayActivity = () => {
  const { data: todayActivity, isLoading } = useQuery({
    queryFn: getTodayActivities,
    queryKey: ["todayActivity"],
  });

  return { todayActivity, isLoading };
};
