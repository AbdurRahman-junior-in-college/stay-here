import React from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import about from "./about.jpg";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 3rem;
`;

const Span = styled.span`
  font-family: "sans-serif";
  font-weight: 550;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  gap: 2rem;
  width: 100%;
`;

const Image = styled.img`
  width: 50%;
  height: 50%;
  border-radius: var(--border-radius-md);
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  & span {
    font-weight: 600;
    color: var(--color-brand-600);
  }
`;

const ChoosingPart = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.5rem;
  padding: 0 4rem;
`;

const Card = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-800);
  border-radius:var(--border-radius-sm);
  gap: 2rem;

  & span{
    font-weight:550;
  }
`;

const About = () => {
  return (
    <AboutContainer className="flex flex-col gap-3 sm:mx-4">
      <Heading>
        ABOUT <Span>US</Span>
      </Heading>
      <ImageContainer>
        <Image src={about} />
        <Text>
          <p>
            This company which is already papular in all over the world will
            give you feel comfortable.
          </p>
          <p>
            This will give you the cure with care because we have the community
            of well-educated and mankind personalitie. All of them are good in
            thier career.We will be the top of the next.
          </p>
          <span>Our view</span>
          <p>
            Our vision for the next is with full trust we will give the service
            with more cure and we are in full effort to come with new
            technologies
          </p>
        </Text>
      </ImageContainer>
      <Heading>
        WHY <Span>CHOOSE US</Span>
      </Heading>
      <ChoosingPart className="grid grid-row sm:grid-cols-3">
        <Card >
          <span>Efficiency:</span>
          <p>
            Something about this company which is serviceable to the society
          </p>
        </Card>
        <Card>
          <span >Convenience</span>
          <p>
            Something about this company which is serviceable to the society
          </p>
        </Card>
        <Card>
          <span >Personalization</span>
          <p>
            Something about this company which is serviceable to the society
          </p>
        </Card>
      </ChoosingPart>
    </AboutContainer>
  );
};

export default About;
