import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import image from "../pages/image.jpeg";
import UserAvatar from "./UserAvatar";

const StyledUserProfileCard = styled.div`
  padding-top: 2.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2.5rem 0;
  gap: 1rem;
`;

const InfoBox = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    color: var(--color-grey-700);
  }

  & h5 {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const Border = styled.hr`
  width: 100%;
  color: var(--color-grey-100);
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & span {
    color: var(--color-grey-400);
  }
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserProfileCard = ({ user }) => {
  return (
    <StyledUserProfileCard>
      <Container>
        {/* <ProfileImage src={image} />
       */}
       <UserAvatar />
        <Border />
      </Container>
      <InfoBox>
        <Heading as="h5">Personal Info</Heading>
        <InfoContainer>
          <p>Name:</p>
          <span>{user?.name}</span>
        </InfoContainer>
        <InfoContainer>
          <p>Country:</p>
          <span>{user?.country}</span>
        </InfoContainer>
        <InfoContainer>
          <p>National id:</p>
          <span>{user?.nationalId}</span>
        </InfoContainer>

        <Border />
      </InfoBox>

      <InfoBox>
        <Heading as="h5">Booking Info</Heading>

        <InfoContainer>
          <p>Booked Cabin:</p>
          <span>Not Yet</span>
        </InfoContainer>

        <InfoContainer>
          <p>Booked Date:</p>
          <span>Not Yet</span>
        </InfoContainer>

        <InfoContainer>
          <p>End Date:</p>
          <span>Not Yet</span>
        </InfoContainer>
      </InfoBox>
    </StyledUserProfileCard>
  );
};

export default UserProfileCard;
