import React from "react";
import Row from "../../ui/Row";
import { useBooking } from "./useBooking";
import { styled } from "styled-components";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import BookingDataBox from "./BookingDataBox";
import Loader from "../../ui/Loader";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "./useCheckOut";
import Modal from "../../ui/Modal";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
import { useDeletingBooking } from "./useDeleting";
import { useMoveBack } from "../../utils/navigating";

export const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
export const ButtonTextGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
`;
export const ButtonText = styled.button`
  border: none;
  outline: none;
  color: var(--color-brand-600);
  background: none;
  font-size: 12px;
  font-weight: 550;
`;

const Empty = styled.div`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  margin: auto auto;
  & p {
    text-align: center;
  }
`;

const BookingDetail = () => {
  const navigate = useNavigate();

  const { error, bookingData, isLoading } = useBooking();
  const { checkOut, isCheckOut } = useCheckOut();
  const { deletingBooking, isDeleting } = useDeletingBooking();
  const moveBack = () => navigate(-1);
  // const moveBack = useMoveBack();

  const { booking, guest, cabin } = bookingData?.data || {};
  // const { status } = booking;

  const statusTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) {
    return <Loader />;
  }
  if (!bookingData) {
    return (
      <Empty>
        <p>Booking Not Found</p>
        <Button size="large" onClick={moveBack}>
          Back
        </Button>
      </Empty>
    );
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading>Booking #{cabin?.name}</Heading>
          <Tag
            type={statusTagName[booking?.status ? "checked-in" : "unconfirmed"]}
          >
            {booking?.status ? "Checked In" : "Unconfirmed"}
          </Tag>
        </HeadingGroup>
        <ButtonTextGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </ButtonTextGroup>
      </Row>
      <BookingDataBox bookingData={bookingData} />
      <ButtonTextGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        {!booking?.status && (
          <Button onClick={() => navigate(`/checkin/${booking?._id}`)}>
            Check In
          </Button>
        )}
        {booking?.status && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkOut(booking?._id)}
            disabled={isCheckOut}
          >
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deletingBooking(booking?._id, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>
      </ButtonTextGroup>
    </>
  );
};

export default BookingDetail;
