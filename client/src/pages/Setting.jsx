import React from "react";
import UpdateSettingForm from "../settings/UpdateSettingForm";
import Heading from "../ui/Heading";

const Setting = () => {
  return (
    <>
      <Heading as="h1">Settings</Heading>
      <UpdateSettingForm />
    </>
  );
};

export default Setting;
