import mongoose from "mongoose";

const cabinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      // required: true,
      default: "Kabul",
    },
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    views: {
      type: Number,
      default: 0,
    },
    bookings: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        review: String,
      },
    ],
    image: {
      type: String,
      // required: true,
      default: "",
    },
  },
  { timestamps: true }
);

cabinSchema.virtual("averageRate").get(function () {
  if (this.ratings.length === 0) return 0;

  const sum = this.ratings.reduce((acc, r) => acc + r.rating, 0);
  return sum / this.ratings.length;
});

export const Cabin = mongoose.model("Cabin", cabinSchema);
