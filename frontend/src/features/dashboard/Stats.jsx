import React from "react";
import Stat from "../../ui/Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

const Stats = ({ recentBookings, recentStays, numDays, cabinsCount }) => {
  // 1. No of Bookings
  const numBookings = recentBookings?.length;

  //   2. Sales
  const sales = recentBookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  //   3. Check ins
  const checkins = recentStays?.length;

  // 4. occupation rete
  const occupation =
    recentStays?.reduce((acc, cur) => acc + cur?.nightsNum, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={`$${sales}`}
      />

      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />

      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100)}%`}
      />
    </>
  );
};

export default Stats;
