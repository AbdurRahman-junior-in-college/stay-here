import React from "react";
import CabinsPageOperations from "../features/cabin/CabinsPageOperations";
import styled from "styled-components";
import { useCabins } from "../features/cabin/useCabins";
import Loader from "../ui/Loader";
import { CabinCard } from "../ui/CabinCard";

const StyledCabins = styled.div`
  padding: 3rem;
  background-color:var(--color-grey-100);

  display:flex;
  flex-direction:column;
  gap:2rem;
`;

const StyledCabinsFrames = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap:2.5rem;
`

const Cabins = () => {

  const {cabins, isLoading} = useCabins()

  if(isLoading) return <Loader />

  return (
    <StyledCabins>
      <CabinsPageOperations />

      <StyledCabinsFrames>
        {
          cabins.map((cabin)=> (
            <CabinCard  key={cabin._id} cabin={cabin}/>
          ))
        }
      </StyledCabinsFrames>
    </StyledCabins>
  );
};

export default Cabins;
