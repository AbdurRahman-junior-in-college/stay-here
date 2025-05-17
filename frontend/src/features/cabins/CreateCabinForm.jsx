import React from "react";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import TextArea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const CreateCabinForm = ({ cabin = {}, onCloseModal }) => {
  const { _id: editId, ...editValues } = cabin;
  const isEditSession = Boolean(editId);
  // const [image, setImage] = useState("");

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { editingCabin, isUpdating } = useEditCabin();
  const { createCabin, isCreatting } = useCreateCabin();

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editingCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            // console.log("created");
            reset();
            onCloseModal?.();
          },
        }
      );
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is required",
          })}
          placeholder="Write Cabin Name.."
        />
      </FormRow>
      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          placeholder="How Much guests can reserve this cabin.."
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "The Capacity should be at least one",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="text"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "The Capacity should be at least one",
            },
          })}
          placeholder="Regular Price.."
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="text"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            // validate: (value) => {
            //   return (
            //     value <= getValues.regularPrice ||
            //     "The Discount should be less than regular Price"
            //   );
            // },
          })}
          placeholder="Discount"
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <TextArea
          id="description"
          {...register("description", {
            required: "This Field is required",
          })}
          defaultValue={"Write something"}
        />
      </FormRow>

      {/* Image */}
      <FormRow label={"Cabin Image"} error={errors?.image?.message}>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin Image is required",
          })}
          // onChange={(e) => setImage(e.target.files[0])}
        />

        {/* <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreatting}>
          {isEditSession ? "Edit" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
