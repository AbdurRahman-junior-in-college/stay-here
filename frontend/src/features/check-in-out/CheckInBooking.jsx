import styled from "styled-components";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

import React, { useEffect, useState } from "react";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import { ButtonText, ButtonTextGroup } from "../booking/BookingDetail";
import BookingDataBox from "../booking/BookingDataBox";
import { useBooking } from "../booking/useBooking";
import Button from "../../ui/Button";
import CheckBox from "../../ui/CheckBox";
import { useCheckin, useCheckinBreakfast } from "../booking/useCheckIn";
import Loader from "../../ui/Loader";
import { useSetting } from "../../settings/useSetting";
import { useNavigate } from "react-router";

const CheckInBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const navigate = useNavigate();

  const { bookingData } = useBooking();
  const guest = bookingData?.data?.guest;
  const booking = bookingData?.data?.booking;

  const { checkIn, isChecking } = useCheckin();
  const { setting } = useSetting();
  const { checkInBreakfast } = useCheckinBreakfast();

  const optionalBreakfastPrice =
    setting?.breakfastPrice * booking?.guestsNum * booking?.nightsNum;

  const bookingId = booking?._id;
  const totalPrice = booking?.totalPrice;

  const handleCheckIn = () => {
    if (!confirmPaid && !addBreakfast) return;
    if (addBreakfast) {
      const breakfast = {
        hasBreakFast: true,
        totalPrice: totalPrice + optionalBreakfastPrice,
        extraPrice: optionalBreakfastPrice,
      };
      checkInBreakfast({ bookingId, breakfast });
    } else {
      checkIn(bookingId);
    }
  };

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [bookingData]);
  if (isChecking) return <Loader />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in Booking #</Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox bookingData={bookingData} />

      {!booking?.hasBreakFast && (
        <Box>
          <CheckBox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            disabled={addBreakfast}
          >
            Want to add breakfast for {optionalBreakfastPrice}
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          id={"confirm"}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
        >
          I confirm that {guest?.name} has paid the total amount of{" "}
          {!addBreakfast
            ? booking?.totalPrice
            : `${booking?.totalPrice + optionalBreakfastPrice} (${
                booking?.totalPrice
              } + ${optionalBreakfastPrice})`}
        </CheckBox>
      </Box>

      <ButtonTextGroup>
        <Button onClick={handleCheckIn}>Check in Booking</Button>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </ButtonTextGroup>
    </>
  );
};

export default CheckInBooking;
