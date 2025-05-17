import React from "react";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useRecentBookings } from "../features/dashboard/useRecentBookings";
import { useRecentStays } from "../features/dashboard/useRecentStays";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Dashboard = () => {
  // const { recentBookings, isLoading: isLoading1 } = useRecentBookings();
  // const { recentStays, isLoading: isLoading2 } = useRecentStays();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
