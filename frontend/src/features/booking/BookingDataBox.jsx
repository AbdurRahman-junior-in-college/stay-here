import React from "react";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import styled from "styled-components";
import DataItem from "../../ui/DataItem";
import {
  formatDate,
  formateDistanceFromNow,
} from "../../utils/dateFormatting";
import { useBooking } from "./useBooking";

const StyledBookingDataBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);

  & div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  & span {
    font-family: "sans-serif";
    font-weight: 650;
  }
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  font-size: 1.5rem;
  color: var(--color-grey-500);

  & p:nth-child(2) {
    font-weight: 510;
    font-size: 1.5rem;
    color: var(--color-grey-700);
  }
`;

const Section = styled.section`
  padding: 1.2rem 2.4rem;
`;

const Flage = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};
  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.div`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const BookingDataBox = ({ bookingData }) => {
  const booking = bookingData?.data?.booking;
  const guest = bookingData?.data?.guest;
  const cabin = bookingData?.data?.cabin;

  const format = (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${months[month]} ${day} ${year} | ${hours}:${minutes} `;
  };

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {booking?.nightsNum} nights in Cabin <span>{cabin?.name}</span>
          </p>
        </div>

        <p>
          {formatDate(new Date(booking?.startData))}
          {`(${formateDistanceFromNow(new Date(booking?.startData))})`}
          &mdash; {format(new Date(booking?.endDate))}
        </p>
      </Header>

      <Section>
        <Guest>
          {guest?.country && <Flage>{guest?.country}</Flage>}

          <p>
            {guest?.name}{" "}
            {booking?.guestsNum > 1 ? `+ ${booking?.guestsNum - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{guest?.email}</p>
          <span>&bull;</span>
          <p>National ID {guest?.nationalId}</p>
        </Guest>

        {booking?.observation && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            lable={booking?.observation}
          >
            {/* {observation} */}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} lable="Breakfast included?">
          {booking?.hasBreakFast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={booking?.isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} lable={`Total Price`}>
            {`$${booking?.totalPrice}`}
            {booking?.hasBreakFast &&
              `($${booking?.cabinPrice} cabin + $${booking?.extraPrice} breakfast)`}
          </DataItem>
          <p>{booking?.isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>
      <Footer>
        <p>Booked {format(new Date(booking?.createdAt))}</p>
      </Footer>
    </StyledBookingDataBox>
  );
};

export default BookingDataBox;
