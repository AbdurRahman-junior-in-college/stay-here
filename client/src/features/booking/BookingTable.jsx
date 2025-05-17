import React from "react";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Loader from "../../ui/Loader";
import Menus from "../../ui/Menu";
import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

const BookingTable = () => {
  //   const bookings = [];

  const { error, bookings = [], isLoading, count } = useBookings();

  // const [searchParams] = useSearchParams();
  // const filterValue = searchParams.get("status") || "all";

  // let filterBookings = [];
  // if (filterValue === "all") filterBookings = bookings;
  // if (filterValue === "checked-in")
  //   filterBookings = bookings.filter((booking) => booking.status);
  // if (filterValue === "unconfirmed")
  //   filterBookings = bookings.filter((booking) => !booking.status);

  // const sortBy = searchParams.get("sortBy") || "startDate-desc";
  // console.log(sortBy);

  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedBookings = filterBookings.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

  return (
    <Menus>
      <Table columns="0.8fr 2fr 2.5fr 1.8fr 1fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
