import React from "react";
import styled from "styled-components";
import UpdateAdminPassword from "../features/authentication/UpdateAdminPassword";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import { useUserProfile } from "../features/authentication/useUserProfile";
import Heading from "../ui/Heading";
import Loader from "../ui/Loader";
import Row from "../ui/Row";
import UserProfileCard from "../ui/UserProfileCard";

const StyledAccountLayOut = styled.div`
  display: grid;
  grid-template-columns: 65vw 1fr;
  padding: 2rem;
  background-color:var(--color-grey-50);
  gap:2rem;
`;

const Forms = styled.div`
  grid-row: 1/-1;
  padding:2rem;
  background-color:var(--color-grey-0);
  border-radius:var(--border-radius-md);
  box-shadow:var(--shadow-md);
`;

const Account = () => {

  const {user, isLoading} = useUserProfile();
  if(isLoading) return <Loader />

  return (
    <StyledAccountLayOut>
      <Forms>
        <Row>
          <Heading as="h3">Update user data</Heading>
          <UpdateUserDataForm user={user} />
        </Row>

        <Row>
          <Heading as="h3">Update password</Heading>
          <UpdateAdminPassword />
        </Row>
      </Forms>
      <div>
        <UserProfileCard user={user} />
      </div>
    </StyledAccountLayOut>
  );
};

export default Account;
