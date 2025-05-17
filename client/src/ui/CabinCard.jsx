import React from "react";
import { HiBeaker } from "react-icons/hi2";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useStoreClicks } from "../features/cabin/userStoreClicks";
import { storeUserClicks } from "../services/apiAdmin";
import { host } from "../utils/constants";

const StyledCabinCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  width: 20vw;
  padding-bottom: 2rem;
  box-shadow: var(--shadow-md);
`;

const CabinImage = styled.img`
  width: 100%;
  height: 20rem;
  border-top-right-radius: var(--border-radius-sm);
  border-top-left-radius: var(--border-radius-sm);
`;

const CabinInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  & span {
    color: var(--color-red-700);
    font-size: 1.5rem;
  }
  & p {
    color: var(--color-grey-700);
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

const Location = styled.h6`
  color: var(--color-blue-700);
  font-size: 1rem;
`;

const VerifiedSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border: 1px solid var(--color-blue-700);
  border-radius: 50%;

  & svg {
    font-size: 2.5rem;
    color: var(--color-blue-700);
  }
`;

export const CabinCard = ({ cabin }) => {
  const navigate = useNavigate();

  const { storeClicks, isLoading } = useStoreClicks();

  //   const handleClickViews = (id) => {
  //     if (!id) return;
  //     storeUserClicks(id);
  //   };
  return (
    <StyledCabinCard
      onClick={() => {
        storeClicks(cabin?._id);
        navigate(`/cabin/${cabin?._id}`);
      }}
    >
      <CabinImage src={`${host}/images/${cabin?.image}`} />
      <CabinInfo>
        <div>
          <span>{`$${cabin?.regularPrice}.00`}</span>
          <p>{cabin?.name}</p>
          <Location>{`Location: ${cabin?.location}`}</Location>
        </div>
        <VerifiedSvg>
          <HiBeaker />
        </VerifiedSvg>
      </CabinInfo>
    </StyledCabinCard>
  );
};
