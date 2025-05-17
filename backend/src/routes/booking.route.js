import express from "express";
import {
  checkOutAndSendEmail,
  deleteBooking,
  getBooking,
  getBookings,
  getStaysAfterDate,
  getTodayActivity,
  updateBookingPrices,
  updateStatusAndPaid,
} from "../controllers/booking.controller.js";
import { adminAuthentication } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-bookings", getBookings);
router.get("/booking/:id", getBooking);
router.patch("/booking/:id", updateStatusAndPaid);
router.post("/update-prices/:id", updateBookingPrices);
router.delete("/delete-booking/:id", deleteBooking);
router.post("/get-latest-bookings", getStaysAfterDate);
router.get("/get-today-activity", adminAuthentication, getTodayActivity);
router.post("/send-booking-details", adminAuthentication, checkOutAndSendEmail);

export default router;
