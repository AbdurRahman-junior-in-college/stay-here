import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useBookingInfo } from "../features/booking/useBookingInfo";

const StyledBookingListBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const BookingListBtn = () => {
  // const { bookingInfo } = useBookingInfo();

  const navigate = useNavigate();
  return (
    <StyledBookingListBtn>
      <Button
        size="medium"
        variation="primary"
        onClick={() => navigate("/bookings")}
      >
        See Your List of bookings
      </Button>
    </StyledBookingListBtn>
  );
};

export default BookingListBtn;
