import React from "react";
import Filter from "../../ui/Filter";

const DashboardFilter = () => {
  return (
    <Filter
    filterField="last"
      options={[
        { value: "7", lable: "Last 7 days" },
        { value: "30", lable: "Last 30 days" },
        { value: "90", lable: "Last 90 days" },
      ]}
    />
  );
};

export default DashboardFilter;
