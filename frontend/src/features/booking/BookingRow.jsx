import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
import Loader from "../../ui/Loader";
import Menus from "../../ui/Menu";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import {
  formatDate,
  formateDistanceFromNow,
} from "../../utils/dateFormatting";
import { useCheckOut } from "./useCheckOut";
import { useDeletingBooking } from "./useDeleting";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const StyledNew = styled.div`
  background: ${(props) =>
    props.isNew &&
    css`
var(--color-grey-300);
`};
  border: ${(props) =>
    props.isNew &&
    css`
1px solid var(--color-grey-0);
`};
  &:hover {
    cursor: pointer;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const BookingRow = ({
  booking: {
    _id: bookingId,
    startData,
    endDate,
    guestsNum,
    totalPrice,
    status,
    nightsNum,
  },
}) => {
  const { checkOut, isCheckOut } = useCheckOut();
  const { deletingBooking, isDeleting, onSuccess } = useDeletingBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const seenBookings = JSON.parse(localStorage.getItem("seenBookings")) || [];
    setIsNew(!seenBookings?.includes(bookingId));
  }, [bookingId]);

  const handleClick = () => {
    setIsNew(false);
    const seenBookings = JSON.parse(localStorage.getItem("seenBookings")) || [];

    if (!seenBookings.includes(bookingId)) {
      localStorage.setItem(
        "seenBookings",
        JSON.stringify([...seenBookings, bookingId])
      );
    }
  };

  return (
    <StyledNew isNew={isNew} onClick={handleClick}>
      <Table.Row>
        <Cabin>001</Cabin>

        <Stacked>
          <span>Khan</span>
          <span>abd@gmail.com</span>
        </Stacked>

        <Stacked>
          <span>
            {formateDistanceFromNow(new Date(startData))}
            &rarr; {nightsNum} nights stay
          </span>

          <span>
            {formatDate(new Date(startData))}
            &mdash; {formatDate(new Date(endDate))}
          </span>
        </Stacked>
        <Tag type={statusToTagName[status]}>{status}</Tag>

        <Amount>{`$${totalPrice}`}</Amount>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/booking/${bookingId}`)}
              >
                See details
              </Menus.Button>

              {!status && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check In
                </Menus.Button>
              )}

              {status && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkOut(bookingId)}
                  disabled={isCheckOut}
                >
                  Check Out
                </Menus.Button>
              )}

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                  Delete Booking
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deletingBooking(bookingId)}
            />
          </Modal.Window>
        </Modal>
      </Table.Row>
    </StyledNew>
  );
};

export default BookingRow;
