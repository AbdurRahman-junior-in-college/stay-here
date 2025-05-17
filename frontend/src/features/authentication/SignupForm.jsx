import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useRegister } from "./useRegister";

const SignupForm = () => {
  const { formState, getValues, register, handleSubmit } = useForm();
  const { errors } = formState;

  const { adminRegister, isLoadig } = useRegister();

  const onSubmit = (data) => {
    if (!data) return;
    adminRegister(data);
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoadig}
          {...register("name", { required: "Name is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoadig}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please Provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoadig}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "password must be at least 8 chars",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Confirm Password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          id="confirmPassword"
          disabled={isLoadig}
          {...register("confirmPassword", {
            required: "confirmPassword is required",
            validate: (value) =>
              getValues().password === value || "password must be macth",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoadig}>
          Cancel
        </Button>
        <Button disabled={isLoadig}>Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
