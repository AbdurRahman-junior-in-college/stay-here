import React from "react";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOpperation from "../../ui/TableOpperation";

const CabinTableOpperation = () => {
  return (
    <TableOpperation>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", lable: "All" },
          { value: "no-discount", lable: "No discount" },
          { value: "with-discount", lable: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", lable: "Sort by name (A-Z)" },
          { value: "name-desc", lable: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", lable: "Sort by Price (low first)" },
          { value: "regularPrice-desc", lable: "Sort by price (high first)" },
          {
            value: "maxCapacity-asc",
            lable: "Sort by Max Capacity (low first)",
          },
          {
            value: "maxCapacity-desc",
            lable: "Sort by Max Capacity (high first)",
          },
        ]}
      />
    </TableOpperation>
  );
};

export default CabinTableOpperation;
