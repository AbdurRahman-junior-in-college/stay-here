import React from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useCancelBooking } from "./useCancelBooking";

const StyledBookingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4.5rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-sm);
`;

const BookingsHeader = () => {
  const { cancelBooking, isCanceling } = useCancelBooking();
  return (
    <StyledBookingsHeader>
      <Heading as="h3">Checkout</Heading>
      <Button size="medium" onClick={cancelBooking} disabled={isCanceling}>
        Cancel
      </Button>
    </StyledBookingsHeader>
  );
};

export default BookingsHeader;
