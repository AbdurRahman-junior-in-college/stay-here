import React from "react";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOpperation from "../../ui/TableOpperation";

const BookingTableOperation = () => {
  return (
    <TableOpperation>
      <Filter
        filterField={"status"}
        options={[
          { value: "all", lable: "All" },
          { value: "checked-in", lable: "Checked in" },
          { value: "checked-out", lable: "Checked Out" },
          { value: "unconfirmed", lable: "Unconfirmed" },
        ]}
      />
      <SortBy
        options={[
          { value: "startData-desc", lable: "Sort by date (recent first)" },
          { value: "startData-asc", lable: "Sort by date (earlier first)" },
          { value: "totalPrice-desc", lable: "Sort by amount (high first)" },
          { value: "totalPrice-asc", lable: "Sort by amount (low first)" },
        ]}
      />
    </TableOpperation>
  );
};

export default BookingTableOperation;
