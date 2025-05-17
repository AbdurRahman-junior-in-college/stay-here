import React from "react";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import FormRow from "../../ui/FormRow";
import { useForm , Controller} from "react-hook-form";
import { useParams } from "react-router";
import { useAddBooking } from "./useAddBooking";

const BookingForm = ({ onCloseModal }) => {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { addBooking } = useAddBooking();

  const { id } = useParams();
  const { errors } = formState;

  const sumbit = (data) => {
    addBooking({id, data},{
      onSuccess: () => {
        reset();
        onCloseModal?.()
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit(sumbit)}>
      <FormRow label="Start date" error={errors?.start?.message}>
        <Input
          type="date"
          id="start"
          {...register("start", {
            required: "start date is required",
            // validate: (date) => {
            //   return (
            //     date > new Date() || "start should be greater than todays"
            //   )
            // }
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.end?.message}>
        <Input
          type="date"
          id="end"
          {...register("end", {
            required: "end date is required",
            // validate: (value) => {
            //   return value > getValues.start || "End should be less than start";
            // },
          })}
        />
      </FormRow>

      <FormRow label="Guests in Number" error={errors?.guestsNum?.message}>
        <Input
          type="number"
          placeholder="How Much you are"
          id="guestsNum"
          {...register("guestsNum", {
            required: "guest number is required",
          })}
        />
      </FormRow>

      <FormRow label="Nights in Number" error={errors?.nightsNum?.message}>
        <Input
          type="number"
          placeholder="how much nights you want to stay"
          id="nightsNum"
          {...register("nightsNum", {
            required: "Nights numbers is required",
          })}
        />
      </FormRow>

      <FormRow label="Nights in Number" error={errors?.hasBreakFast?.message}>
        <Input
          type="checkbox"
          id="hasBreakFast"
          {...register("hasBreakFast")}
          defaultChecked={false}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          size="medium"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary">
          Booking
        </Button>
      </FormRow>
    </Form>
  );
};

export default BookingForm;
