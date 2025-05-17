import React from "react";
import styled, { keyframes } from "styled-components";
import HeroSection from "../ui/HeroSection";
import FacilityContainer from "../ui/FacilityContainer";
import Recommendation from "../ui/Recommendation";
import BookingListBtn from "../ui/BookingListBtn";
import ObservationInput from "../features/home/ObservationInput";
import TestimoinalSection from "../features/home/TestimoinalSection";

const StyledHome = styled.div`
  padding: 2rem 2rem;
  background-color: var(--color-grey-100);
`;

const Home = () => {
  return (
    <StyledHome>
      <HeroSection />
      <FacilityContainer />
      <Recommendation />
      <BookingListBtn />

      <TestimoinalSection />
      <ObservationInput />
    </StyledHome>
  );
};

export default Home;
