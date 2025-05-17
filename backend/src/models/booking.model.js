import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    startData: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    nightsNum: {
      type: Number,
      // required: true
    },
    guestsNum: {
      type: Number,
    },
    cabinPrice: {
      type: Number,
    },
    extraPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      default: "unconfirmed"
    },
    hasBreakFast: {
      type: Boolean,
    },
    isPaid: {
      type: Boolean,
    },
    observation: {
      type: String,
    },
    cabinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cabin",
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
