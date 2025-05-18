import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/mongoDb.js";
import { server,app } from "./socket.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import cabinRouter from "./routes/cabin.route.js";
import settingRouter from "./routes/appSetting.route.js";
import bookingRouter from "./routes/booking.route.js";
import adminRouter from "./routes/admin.route.js";

import { addAppSetting } from "./controllers/appSetting.controller.js";
import { addBooking } from "./controllers/booking.controller.js";
import {recommendOneCabin, searchCabins } from "./controllers/user.controller.js";
import {  registerAdmin } from "./controllers/admin.controller.js";
import { extractSearchParams } from "./utills/extractSearchParams.js";
import { exractSearchData } from "./utills/extractSearchNLP.js";

dotenv.config({
  path: "./.env",
});

// const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(
  cors({
    // origin: ["https://stay-here-frontend.onrender.com","http://localhost:5174"],
    origin: "*",
    methods: ["GET", "DELETE", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use("/images", express.static("upload"));

//connection or configuration
dbConnection()
  .then((res) => {
    console.log(`DB CONNECTED ${res}`);
  })
  .catch((err) => {
    console.log(`DB CONNECTION FAILED${err.message}`);
  });

connectCloudinary();

//api endpoints

app.get("/", async (req, res) => {
  res.json("Something Checking");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cabin", cabinRouter);
app.use("/api/v1/setting", settingRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/admin", adminRouter);


server.listen(PORT, () => {
  // register();
  console.log(`Server running at port http://localhost:${PORT}`);
});
