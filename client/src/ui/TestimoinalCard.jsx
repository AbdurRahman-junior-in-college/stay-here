import React from "react";
import styled from "styled-components";
import image from '../pages/image.jpeg'

const StyledTestimoniaCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justiyf-content: center;
  padding:2rem;
  gap: 1.5rem;
  width:25vw;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  padding-bottom: 2rem;
  box-shadow: var(--shadow-md);

  & p{
    font-size:1.2rem;
    color:var(--color-grey-800);
    font-weight:550;
  }
`;

const UserImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const TestimoinalCard = ({testimoney}) => {
    const host = 'http://localhost:5000/images'
  return <StyledTestimoniaCard>
    <UserImage  src={`${host}/${testimoney?.image}`}/>
    <p>{testimoney?.observation}</p>
  </StyledTestimoniaCard>;
};

export default TestimoinalCard;
