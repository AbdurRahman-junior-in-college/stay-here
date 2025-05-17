import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    observation: {
      type: String,
      default: "",
    },
    searchHistory: [String],
    viewedCabins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cabin" }],
    bookedCabins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cabin" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.users || mongoose.model("User", userSchema);
export default User;
