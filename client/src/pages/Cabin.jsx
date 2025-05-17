import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiArrowLeft, HiOutlineLifebuoy, HiStar } from "react-icons/hi2";
import { useCabin } from "../features/cabin/useCabin";
import Heading from "../ui/Heading";
import Loader from "../ui/Button";
import { useState } from "react";
import StarRating from "../features/cabin/StarRating";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import BookingForm from "../features/booking/BookingForm";
import { useCheckIsBooked } from "../features/booking/useCheckIsBooked";
import BookingTimeSlots from "./BookingTimeSlots";
import { useCheckin } from "../features/booking/useCheckIn";
import { useCheckOut } from "../features/booking/useCheckOut";
import { host } from "../utils/constants";

const StyledCabin = styled.div`
  padding: 1rem 4rem;
  background-color: var(--color-grey-100);
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;

  & span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const StyledHeaderButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;

  color: var(--color-grey-800);
  & span {
    color: var(--color-grey-700);
  }
`;

const StyledBox = styled.div`
  padding: 1rem 2rem;
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  & svg {
    font-size: 2.5rem;
  }
`;



const StyledCabinDetails = styled.div`
  dispaly: flex;
  flex-direction: column;
  padding: 4rem 5rem;
`;

const CabinImage = styled.img`
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-md);
  width: 100%;
  height: 70vh;
`;

const CabinDetails = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  padding: 5rem 3rem;

  & svg {
    font-size: 1.5rem;
    color: var(--color-yellow-700);
  }
  & p {
    font-size: 1.2rem;
    color: var(--color-grey-500);
    font-weight: 550;
  }
`;

const CabinDescriptionName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Cabin = () => {
  const navigate = useNavigate();

  const { cabin, isLoading } = useCabin();
  const { isBooked, isLoading: isLoading1 } = useCheckIsBooked();
  const { checkIn, isChecking } = useCheckin();
  const { checkOut, isCheckOut } = useCheckOut();

  if (isLoading || isLoading1) return <Loader />;

  const ratingsCalculation = () => {
    const ratingsArr = cabin?.ratings;
    const avgRatings =
      ratingsArr.reduce((acc, occ) => acc + occ.rating, 0) / ratingsArr.length;
    return avgRatings;
  };

  // const {ratings, review, _id, name, description, location} = cabin

  return (
    <StyledCabin>
      {/* It is contain of check-in and check-out buttons and back button */}
      <StyledHeader>
        <span>
          <HiArrowLeft onClick={() => navigate(-1)} /> Back
        </span>

        <StyledHeaderButtons>
          {isBooked?.active ? (
            <>
              {/* TODO: rendering through condition after modifying the schema structure */}
              <Button variation="primary" size="small">
                Resvered
              </Button>
              {isBooked?.activeBooking?.status !== "checked-in" && (
                <Button
                  variation="primary"
                  size="small"
                  disabled={isChecking}
                  onClick={() => checkIn(isBooked?.activeBooking?._id)}
                >
                  Check-in
                </Button>
              )}
              <Button
                variation="primary"
                size="small"
                disabled={isCheckOut}
                onClick={() => checkOut(isBooked?.activeBooking?._id)}
              >
                Check-out
              </Button>

              <Button variation="danger" size="small">
                Cancel
              </Button>
            </>
          ) : (
            <Modal>
              <Modal.Open opens="cabin-form">
                <Button variation="primary" size="small">
                  Book the Cabin
                </Button>
              </Modal.Open>
              <Modal.Window name="cabin-form">
                <BookingForm />
              </Modal.Window>
            </Modal>
          )}
        </StyledHeaderButtons>
      </StyledHeader>

      <StyledCabinDetails>
        <CabinImage src={`${host}/images/${cabin?.image}`} />

        <CabinDetails>
          <CabinDescriptionName>
            <Heading as="h2">Name : {cabin?.name}</Heading>
            <span>Description:</span>
            <p> {cabin?.description}</p>

            <p>
              Ratings <HiStar /> {ratingsCalculation()}
            </p>
          </CabinDescriptionName>
          <StarRating />
          {isBooked?.active && (
            <BookingTimeSlots isBooked={isBooked?.activeBooking} />
          )}
        </CabinDetails>

        {/* This component will show the time of booking for the user if it is booked */}
      </StyledCabinDetails>
    </StyledCabin>
  );
};

export default Cabin;
