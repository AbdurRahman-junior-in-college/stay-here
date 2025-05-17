import React from "react";
import BookingTable from "../features/booking/BookingTable";
import BookingTableOperation from "../features/booking/BookingTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingTableOperation />
      </Row>

      <BookingTable />
    </>
  );
};

export default Bookings;
