import React from "react";
import { useState } from "react";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useAdmin } from "./useAdmin";
import { useUpdateData } from "./useUpdateData";

const UpdateUserDataForm = () => {
  const { admin } = useAdmin();
  const { updateData, isLoading: isUpdating } = useUpdateData();

  const [email, setEmail] = useState(admin?.data?.email);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(admin?.data?.name);

  const submitHandling = (e) => {
    e.preventDefault();

    // if (!name && !avatar) return;
    updateData({ name, avatar });
    setAvatar("");
    e.target.reset();
  };

  return (
    <Form onSubmit={submitHandling}>
      <FormRow label={"Email Address"}>
        <Input type="email" value={email} disabled />
      </FormRow>

      <FormRow label={"Full Name"}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label={"Avatar Image"}>
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
