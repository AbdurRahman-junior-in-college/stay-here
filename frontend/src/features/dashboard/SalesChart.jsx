import React from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../conext/DarkModeContext";
import DashboardBox from "./DashboardBox";
import { formatDate } from "../../utils/dateFormatting";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = ({ numDays, bookings }) => {
  const { isDarkMode } = useDarkMode();
  // const { numDays } = useRecentBookings();

  let allDates = [];
  const today = new Date();

  for (let i = 0; i < numDays; i++) {
    let currDate = new Date(today);
    currDate.setDate(today.getDate() - i);
    allDates.push(currDate.toISOString());
  }
  const format = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let formatDate = new Date(date);
    const currDate = formatDate.getDate();
    const month = formatDate.getMonth();
    return `${months[month]} ${currDate}`;
  };

  const isSameDay = (lableDate, createDate) => {
    const today = new Date(lableDate).setHours(0, 0, 0, 0);
    const bookingCreation = new Date(createDate).setHours(0, 0, 0, 0);
    return today === bookingCreation ? true : false;
  };
  const data = allDates.map((date) => {
    return {
      lable: format(date),
      totalSales: bookings
        ?.filter((booking) => isSameDay(date, booking?.createdAt))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extraSales: bookings
        ?.filter((booking) => isSameDay(date, booking?.createdAt))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraSales: { stroke: "#16a34a", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h1">
        Sales from 
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="lable"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey="extraSales"
            type="monotone"
            stroke={colors.extraSales.stroke}
            fill={colors.extraSales.fill}
            strokeWidth={2}
            name="Extra Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
