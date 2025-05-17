import styled from "styled-components";

const RecommendationLayout = styled.div`
  display: flex;
  gap: 2rem;
  overflow: scroll;
  overflow-y: hidden;
  margin-top: 1.5rem;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2rem 3rem;
  cursor:pointer;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const StyledRecommendation = styled.div`
  display: flex;
  gap: 3rem;
`;

import React from "react";
import {CabinCard} from './CabinCard'
import { useRecommendation } from "../features/home/useRecommendation";
import Loader from "./Loader";
import Heading from "./Heading";
import { useNavigate } from "react-router";

const Recommendation = () => {
  const { recommended, isLoading } = useRecommendation();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  // const cabin = recommended[0];
  return (
    <>
      <Heading as="h2">Recommended Cabin for you</Heading>
      <RecommendationLayout>
        <StyledRecommendation>
          {/* <RecommendCard cabin={cabin} />
        {/* <RecommendCard /> */}
          {/* <RecommendCard />  */}

          {recommended?.map((cabin) => (
            <CabinCard
              cabin={cabin}
              key={cabin._id}
            //   onClick={() => navigate(`/cabin/${cabin?._id}`)}
            />
          ))}
        </StyledRecommendation>
      </RecommendationLayout>
    </>
  );
};

export default Recommendation;
