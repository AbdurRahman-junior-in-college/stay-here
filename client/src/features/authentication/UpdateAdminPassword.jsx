import React from "react";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { usePasswordUpdate } from "./usePasswordUpdate";

const UpdateAdminPassword = () => {
  const { formState, getValues, register, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { updatePassword, isLoading } = usePasswordUpdate();

  const onSubmit = (data) => {
    if (!data) return;
    console.log(data);
    const { oldPassword, newPassword } = data;
    updatePassword(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Old Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="oldPassword"
          {...register("oldPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "password must be at least 8 chars",
            },
          })}
        />
      </FormRow>
      <FormRow label="New Password" error={errors?.newPassword?.message}>
        <Input
          type="password"
          id="newPassword"
          {...register("newPassword", {
            required: "newPassword is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          size="medium"
          variation="secondary"
          type="reset"
          onClick={reset}
        >
          Cancel
        </Button>
        <Button size="medium">Update password</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateAdminPassword;
