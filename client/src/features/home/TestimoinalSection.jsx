import React from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Loader from "../../ui/Loader";
import TestimoinalCard from "../../ui/TestimoinalCard";
import { useUserProfile } from "../authentication/useUserProfile";
import { useAllTestimonials } from "./useAllTestimonials";

const StyledTestimonialLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;

  background-color: var(--color-grey-200);
  padding: 2rem;
  border-radius: var(--border-radius-md);
`;

const StyledTestimonialSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const TestimoinalSection = () => {
  // const {user, isLoading} = useUserProfile()
  const { testimonials, isLoading } = useAllTestimonials();
  if (isLoading) return <Loader />;
  return (
    <StyledTestimonialLayout>
      <Heading as="h5">We Trusted Already!</Heading>
      <StyledTestimonialSection>
        {testimonials?.map((testimoney) => (
          <TestimoinalCard testimoney={testimoney} key={testimoney._id} />
        ))}
      </StyledTestimonialSection>
    </StyledTestimonialLayout>
  );
};

export default TestimoinalSection;
