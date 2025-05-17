import React from "react";
import UpdateAdminPassword from "../features/authentication/UpdateAdminPassword";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Account = () => {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdateAdminPassword />
      </Row>
    </>
  );
};

export default Account;
