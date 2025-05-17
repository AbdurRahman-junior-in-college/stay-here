import React from "react";
import { sendBookingDetails } from "../../services/apiBooking";
import Button from "../../ui/Button";
import { useCheckOut } from "../booking/useCheckOut";

const CheckOutButton = ({ bookingId, details }) => {
  const { checkOut, isCheckOut } = useCheckOut();

  const sendBooking = async () => {
    await sendBookingDetails(details);
  };

  return (
    <Button
      variation="primary"
      onClick={() => {
        checkOut(bookingId);
        sendBooking();
      }}
      disabled={isCheckOut}
    >
      Check Out
    </Button>
  );
};

export default CheckOutButton;
