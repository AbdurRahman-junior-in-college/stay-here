import React from "react";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useEditSetting } from "./useEditSetting";
import { useSetting } from "./useSetting";

const UpdateSettingForm = () => {
  const { isLoading, setting = {}, error } = useSetting();
  const { maxGuests, maxNights, minNights, breakfastPrice } = setting;
  const { updateSetting, isUpdating } = useEditSetting();

  const updateHandle = (e, field) => {
    const { value } = e.target;
    if (!value) return;
    console.log(value);
    updateSetting({ [field]: Number(value) });
  };
  return (
    <Form>
      <FormRow lable="Minimum nights/booking">
        <Input
          type="number"
          id="minNights"
          defaultValue={minNights}
          onBlur={(e) => updateHandle(e, "minNights")}
        />
      </FormRow>
      <FormRow lable="Maximum nights/booking">
        <Input type="number" id="maxNights" defaultValue={maxNights} 
          onBlur={(e) => updateHandle(e, "maxNights")}
        
        />
      </FormRow>
      <FormRow lable="Maximum guests/booking">
        <Input type="number" id="maxGuests" defaultValue={maxGuests}
        onBlur={(e)=> updateHandle(e, "maxGuests")}
        />
      </FormRow>
      <FormRow lable="Breakfast Price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(e)=> updateHandle(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingForm;
