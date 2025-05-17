import React from "react";
import { HiBriefcase, HiCheckCircle, HiPresentationChartLine } from "react-icons/hi2";
import styled from "styled-components";
import { useUserProfile } from "../features/authentication/useUserProfile";
import BookingsHeader from "../features/booking/BookingsHeader";
import { useBookingInfo } from "../features/booking/useBookingInfo";
import BookingInfoCard from "../ui/BookingInfoCard";
import Border from "../ui/Border";
import Heading from "../ui/Heading";
import Loader from "../ui/Loader";

const StyledBookings = styled.div`
  background-color: var(--color-grey-100);
`;

const StyledBookingsLayOut = styled.div`
  display: grid;
  grid-template-columns: 60vw 1fr;
  padding: 2rem 4.5rem;
  gap: 2rem;
`;

const BookingsCardLayout = styled.div`
  grid-row: 1/-1;
`;
const BookingCard = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  padding: 2.5rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CongratsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-green-100);
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: var(--border-radius-md);

  & svg {
    color: var(--color-green-700);
  }
`;

const UserInfoPart = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    color: var(--color-grey-700);

    & p {
      font-weight: 600;
      color: var(--color-grey-800);
    }
  }
`;

const CancelationPolicyCard = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  display: flex;
  gap: 1rem;

  & svg {
    color: var(--color-yellow-700);
    font-size: 5rem;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.2rem;
    padding: 0 1rem;
    & h5 {
      color: var(--color-grey-800);
      font-size: 1.5rem;
    }
  }
`;

const PaymentWarningCard = styled.div`
  display: flex;
  align-items:center;
  gap: 1rem;
  padding: 2rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-yellow-100);
  color: var(--color-grey-800);
  font-size:1.3rem;
  margin-bottom:1.5rem;

  & svg{
    font-size:4rem;
    color:var(--color-grey-0);
  }
`;

const Empty = styled.div`
display:flex;
align-items:center;
justify-content:center;

font-size:2.2rem;
font-weight:550;
color:var(--color-grey-800);

padding:2rem;
border-radius:var(--border-radius-md);
background-color:var(--color-grey-0);
`
const Bookings = () => {
  const { bookingInfo, isLoading } = useBookingInfo();
  const { user, isLoading: isLoading1 } = useUserProfile();

  if (isLoading || isLoading1) return <Loader />;

  if(!bookingInfo) return <Empty>
    You have not booked any cabin yet!
  </Empty>

  // const {startData, endDate, } = bookingInfo

  return (
    <StyledBookings>
      {/* The component which include just the header where the checkout and cancel buttons are */}
      <BookingsHeader />

      <StyledBookingsLayOut>
        {/* this will design the layout of cards components */}
        <BookingsCardLayout>
          {/* If the booking is not paid yet */}

          {
            !bookingInfo.isPaid && <PaymentWarningCard>
              <HiBriefcase />

              <p>Your Booking is not paid yet.</p>
            </PaymentWarningCard>
          }



          {/* This will contain the booking brief information */}
          <BookingCard>
            <Heading as="h5">Book Information</Heading>
            <CongratsBox>
              <HiCheckCircle />
              <p>Congratulation we will send your book details to the owner.</p>
            </CongratsBox>
            <Border />

            {/* This is contain the user brief info */}
            <UserInfoPart>
              <div>
                <span>Full Name</span>
                <p>{user?.name}</p>
              </div>
              <div>
                <span>Email</span>
                <p>{user?.email}</p>
              </div>
              <div>
                <span>National ID</span>
                <p>{user?.nationalId}</p>
              </div>
            </UserInfoPart>
          </BookingCard>

          <CancelationPolicyCard>
            <HiPresentationChartLine />
            <div>
              <Heading as="h5">Cancelation Policy</Heading>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                molestiae velit praesentium impedit quo veritatis maiores ipsum,
                corrupti fuga molestias non consequatur quaerat eligendi
                excepturi voluptas odit omnis nemo id.
              </p>
            </div>
          </CancelationPolicyCard>
        </BookingsCardLayout>

        {/* Booking information Card which is use api */}
        <BookingInfoCard bookingInfo={bookingInfo} />
      </StyledBookingsLayOut>
    </StyledBookings>
  );
};

export default Bookings;
