import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import contact from './about.jpg'

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 3rem;
`;
const Span = styled.span`
  font-family: "sans-serif";
  font-weight: 600;
  font-size: 2.5rem;
  & span {
    font-size: 1.5rem;
    color: var(--color-brand-600);
  }
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
  border-radius: var(--border-radius-md);
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap:1.5rem;
  padding: 2rem;

  & div{
    font-size:1rem;
    color:var(--color-grey-700);
  }

  & span {
    font-weight: 600;
    color: var(--color-brand-600);
  }
`;
const Logo = styled.span`
color:var(--color-brand-600);
`

const Contact = () => {
  return (
    <ContactContainer className="flex flex-col gap-5">
      <Span>
        CONTACT <span>US</span>
      </Span>
      <ImageContainer className="flex flex-col md:flex-row gap-6 justify-center ">
        <Image src={contact} />
        <Text >
          <Heading>OUR OFFICE</Heading>
          <div className="text-gray-700 text-xs">
            <p>Somewhere alongside with</p>
            <p>Kabul From Kunar</p>
          </div>
          <div className="text-gray-700 text-xs">
            <p>+9376675318</p>
            <p>You Can Contact us Directly</p>
          </div>
          <Heading >
            CAREARS AT <Logo>StayHere</Logo>
          </Heading>
          <p >
            Learn more about us and job oppertunities
          </p>
          <Button size="medium">
            Explore jobs
          </Button >
        </Text>
      </ImageContainer>
    </ContactContainer>
  );
};

export default Contact;
