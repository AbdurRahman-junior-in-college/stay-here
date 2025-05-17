import React from "react";
import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOpperation from "../features/cabins/CabinTableOpperation";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Cabins = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        {/* <Filter /> */}
        <CabinTableOpperation />
      </Row>

      <Row>
        <CabinTable />
      
          {/* <Button onClick={() => setShowCabinCreatingForm((show)=> !show)}>
            {!showCabinCreatingForm ? "Add New Cabin":"hide Form"}
          </Button>
          {showCabinCreatingForm && <CreateCabinForm />} */}
          <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
