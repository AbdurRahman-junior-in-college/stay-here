import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getLatesBooking } from "../../services/apiBooking";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const latest = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const { data: recentBookings, isLoading } = useQuery({
    queryFn: () => getLatesBooking(latest),
    queryKey: ["bookings", `last-${latest}`],
  });

  return { recentBookings, isLoading, numDays: latest };
};
