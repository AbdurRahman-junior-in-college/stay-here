import React from "react";
import { useState } from "react";
import FileInput from "../../ui/FileInput";
import Loader from "../../ui/Loader";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useUserProfile } from "./useUserProfile";
import { useUpdateData } from "./useUpdateData";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const UpdateUserDataForm = ({ user }) => {
  const { updateData, isLoading: isUpdating } = useUpdateData();
  const [image, setImage] = useState("");
  const [name, setName] = useState(user.name);

  const submitHandling = (e) => {
    e.preventDefault();
    if (!name && !image) return;
    updateData({ name, image });
    setImage("");
    e.target.reset();
  };

  return (
    <Form onSubmit={submitHandling}>
      <FormRow label={"Email Address"}>
        <Input type="email" value={user?.email} disabled />
      </FormRow>

      <FormRow label={"Full Name"}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label={"image Image"}>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          size="medium"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button size="medium">Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
