import React from "react";
import styled from "styled-components";
import Border from "./Border";
import Heading from "./Heading";

const StyledBookingInfoCard = styled.div`
  padding: 1.5rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 90vh;
  &:first-child {
    padding: 1.5rem 0;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-grey-800);
  font-size: 1.2rem;
  font-weight: 600;

  & span {
    color: var(--color-grey-400);
  }
`;

const SummaryPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const BookingInfoCard = ({ bookingInfo }) => {
  return (
    <StyledBookingInfoCard>
      <Heading as="h5">Summary</Heading>
      <Border />

      <SummaryPart>
        <Box>
          <p>Start Date</p>
          <span>{new Date(bookingInfo?.startData).toLocaleString()}</span>
        </Box>

        <Box>
          <p>End Date</p>
          <span> {new Date(bookingInfo?.endDate).toLocaleString()}</span>
        </Box>

        <Box>
          <p>Nights</p>
          <span>{bookingInfo?.nightsNum}</span>
        </Box>

        <Box>
          <p>Total Guests</p>
          <span>{bookingInfo?.guestsNum}</span>
        </Box>
      </SummaryPart>

      <Border />

      <SummaryPart>
        <Box>
          <p>Cabin Price</p>
          <span>{`$${bookingInfo?.cabinPrice}`}</span>
        </Box>

        <Box>
          <p>Extra Price {`(breakfast)`}</p>
          <span>{`$${bookingInfo?.extraPrice}`}</span>
        </Box>

        <Box>
          <p>Break Fast</p>
          <span>{bookingInfo?.hasBreakFast ? "Allowed" : "Not allowed"}</span>
        </Box>

        <Box>
          <p>Payment Status</p>
          <span>{bookingInfo?.isPaid ? "Paid" : "Not Yet"}</span>
        </Box>
      </SummaryPart>

      <Border />

      <Box>
        <p>Total</p>
        <span>{`$${bookingInfo?.totalPrice}`}</span>
      </Box>
    </StyledBookingInfoCard>
  );
};

export default BookingInfoCard;
