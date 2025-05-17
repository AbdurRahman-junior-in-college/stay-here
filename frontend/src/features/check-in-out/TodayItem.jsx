import styled from "styled-components";

const StyledTodayItem = styled.li`
  display: grid;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
import React from "react";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckOutButton from "./CheckOutButton";

const TodayItem = ({ activity }) => {
  const isDeparting = (date) => {
    const today = new Date();
    const endDate = new Date(date);
    return today === endDate ? true : false;
  };

  const isArriving = (date) => {
    const today = new Date();
    const startDate = new Date(date);
    return today > startDate ? true : false;
  };
  return (
    <StyledTodayItem>
      {!activity?.status && isArriving(activity?.startData) && (
        <Tag type="green">Arriving</Tag>
      )}
      {activity?.status && isDeparting(activity?.endDate) && (
        <Tag type="blue">Departing</Tag>
      )}
      {activity?.status && <Tag type="blue">Paid</Tag>}
      <Guest>
        {activity?.guest?.name} {activity?.guest?.country}
      </Guest>
      <div>{activity?.nightsNum} nights</div>

      {!activity?.status && (
        <Button variation="primary" as={Link} to={`/checkin/${activity?._id}`}>
          Check In
        </Button>
      )}

      {activity?.status && (
        <CheckOutButton bookingId={activity._id} details={activity} />
      )}
    </StyledTodayItem>
  );
};

export default TodayItem;
