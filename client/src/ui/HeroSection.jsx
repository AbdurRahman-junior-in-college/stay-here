import React from "react";
import styled, { keyframes } from "styled-components";
import Heading from "./Heading";
import { HiAcademicCap } from "react-icons/hi2";

const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(20px);
}to{
  opacity: 1;
  transform: translateY(0);
}
`;

const HeroContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;

  background: linear-gradient(
    to left,
    var(--color-hero-first),
    var(--color-hero-second)
  );

  background-size: cover;
  background-postion: center;
  border-radius: 15px;
  color: var(--color-grey-900);
  animation: ${fadeIn} 1s ease-in-out;
`;

const HeroContent = styled.div`
  max-width: 50%;
  color: var(--color-grey-900);

  p {
    margin-top: 10px;
    font-size: 1.5rem;
    opacity: 0.8;
  }
  animation: ${fadeIn} 1s ease-in-out;
`;

// const ImageContainer = styled.div`
//   width: 45%;
//   background-size: cover;
//   background-postion: center;
//   border-radius: 10px;
//   margin-right: -3.5rem;
//   animation: ${fadeIn} 1s ease-in-out;
//   position:relative;
//   z-index:-99;
// `;

// const HeroImage = styled.img`
//   border-top-right-radius: 10px;
//   border-bottom-right-radius: 10px;
//   opacity: 0.7;
// `;

const SpecialAnnounce = styled.div`
  display: flex;

  gap: 1.5rem;

  & p {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-green-700);
    font-weight: 550;
  }
`;

const CircleBox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid var(--color-grey-0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;

  & svg {
    color: var(--color-grey-900);
    font-size: 2.5rem;
  }

  & span {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Heading as="h1">Enjoy Your Night Stay With Friends</Heading>
        <p>
          There is, For What you are seeking; secure, calm and healthy. Good
          Night.{" "}
        </p>

        <SpecialAnnounce>
          <CircleBox>
            <HiAcademicCap />
            <span>Check</span>
          </CircleBox>
          <p>Check Your List & Book Cabin</p>
        </SpecialAnnounce>
      </HeroContent>
      {/* 
      <ImageContainer>
        <HeroImage src={image} />
      </ImageContainer> */}
    </HeroContainer>
  );
};

export default HeroSection;
