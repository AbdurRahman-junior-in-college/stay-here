import mongoose from "mongoose";

const appSettingSchema = new mongoose.Schema(
  {
    minNights: {
      type: Number,
      required: true,
    },
    maxNights: {
      type: Number,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    breakfastPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AppSetting = mongoose.model("AppSetting", appSettingSchema);
export default AppSetting;
