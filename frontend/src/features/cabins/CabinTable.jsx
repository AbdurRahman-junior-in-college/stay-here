import React from "react";
import styled from "styled-components";
import { useCabin } from "./useCabin";
import CabinRow from "./CabinRow";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import Menus from "../../ui/Menu";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-md);
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const { isLoading, cabins, error } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Loader />;
  const fileterValue = searchParams.get("discount") || "all";

  let filterCabins;
  if (fileterValue === "all") filterCabins = cabins;
  if (fileterValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (fileterValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2 Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin, i) => <CabinRow cabin={cabin} key={i} />}
        />
        {/* {cabins?.map((cabin, i) => (
        <CabinRow cabin={cabin} key={i} />
      ))} */}
      </Table>
    </Menus>
  );
};

export default CabinTable;
