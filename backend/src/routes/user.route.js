import express from "express";
import {
  cabinIsAlreadyBookedFromYou,
  cancelBooking,
  checked_IN_Status_Arrive,
  checked_out_Status_leaving,
  getAllCabins,
  getCabin,
  getRatings,
  getRecommendation,
  getUserProfile,
  loginUser,
  ratingsToCabin,
  recommendOneCabin,
  registerUser,
  searchCabins,
  storeUserViews,
  updateProfileOrImage,
  userBookingInformation,
  userObservation,
  getUsersObservations
} from "../controllers/user.controller.js";
import { userAuthentication } from "../middlewares/userAuth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { addBooking } from "../controllers/booking.controller.js";

// import userAuthentication from "../middlewares/userAuth.middleware.js";

const router = express.Router();

router.post("/user-register", registerUser);
router.post("/user-login", loginUser);
router.get("/get-user-profile", userAuthentication, getUserProfile);
router.post(
  "/user-update-profile",
  userAuthentication,
  upload.single("image"),
  updateProfileOrImage
);

router.get("/search-cabins/:search", userAuthentication, searchCabins);
router.get("/get-cabins", getAllCabins);
router.get("/get-recommend", recommendOneCabin);
// when user click the cabin
router.get("/get-cabin/:id", getCabin);
router.post("/submit-ratings/:id", userAuthentication, ratingsToCabin);
router.get("/get-ratings/:id", getRatings);
router.get("/get-recommendation", userAuthentication, getRecommendation);
router.post("/cabin-view/:id", userAuthentication, storeUserViews);
router.post("/add-booking/:id", userAuthentication, addBooking);
router.get("/get-booking-info", userAuthentication, userBookingInformation);
router.delete("/cancel-booking", userAuthentication, cancelBooking);
router.get("/is-cabin-booked/:id", userAuthentication, cabinIsAlreadyBookedFromYou);

// the api for confirming the use arrival or approach to the cabin
router.post("/checked-in/:id", userAuthentication, checked_IN_Status_Arrive)
router.patch("/checked-out/:id", userAuthentication, checked_out_Status_leaving)
router.post("/observation", userAuthentication, userObservation)
router.get("/observations",  getUsersObservations)





export default router;
