import React from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";

const BookingTimeSlotsLayOut = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
`;

const StyledBookingSlots = styled.div`
  display: flex;
  gap: 3.5rem;
`;

const BookingTimeSlots = ({ isBooked }) => {
  const isToday = (date) => {
    const today = new Date();
    // console.log(new Date(date))
    // console.log(today)

    if (new Date(date).getDate() === today.getDate()) {
      return true;
    }
    return false;
  };
  return (
    <BookingTimeSlotsLayOut>
      <Heading as="h4">You are welcome </Heading>
      <StyledBookingSlots>
        <div>
          <p>
            Your Booking is Start from :{" "}
            <span>{new Date(isBooked?.startData).toLocaleString()}</span>
          </p>

          <p>
            Your Booking is End with :{" "}
            <span>{new Date(isBooked?.endDate).toLocaleString()}</span>
          </p>
        </div>

        <div>
          {isToday(isBooked?.startData) && <span>You are incomming.</span>}
        </div>
      </StyledBookingSlots>
    </BookingTimeSlotsLayOut>
  );
};

export default BookingTimeSlots;
