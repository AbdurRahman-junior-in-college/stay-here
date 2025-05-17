import styled from "styled-components";

const StyledActivity = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

import React from "react";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Loader from "../../ui/Loader";

import { useTodayActivity } from "./useTodayActivity";
import TodayItem from "./TodayItem";

const TodayActivity = () => {
  const { todayActivity, isLoading } = useTodayActivity();
  console.log(todayActivity);
  return (
    <StyledActivity>
      <Row variation="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!isLoading ? (
        todayActivity?.length > 0 ? (
          <TodayList>
            {todayActivity?.map((activity, i) => (
              <TodayItem key={activity._id} activity={activity} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No Activity...</NoActivity>
        )
      ) : (
        <Loader />
      )}
    </StyledActivity>
  );
};

export default TodayActivity;
