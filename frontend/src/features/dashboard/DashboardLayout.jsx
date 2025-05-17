import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from "react";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import Loader from "../../ui/Loader";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const DashboardLayout = () => {
  const {
    recentBookings,
    isLoading: isLoading1,
    numDays,
  } = useRecentBookings();
  const { recentStays, isLoading: isLoading2 } = useRecentStays();

  const { cabins, isLoading: isLoading3 } = useCabin();

  if (isLoading1 || isLoading2 || isLoading3) {
    return <Loader />;
  }
  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        recentStays={recentStays}
        numDays={numDays}
        cabinsCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart recentStays={recentStays} />
      <SalesChart numDays={numDays} bookings={recentBookings} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
