import express from "express";
import {
  addCabin,
  deleteCabin,
  getAllCabins,
  updateCabin,
} from "../controllers/cabin.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { userAuthentication } from "../middlewares/userAuth.middleware.js";

const router = express.Router();
// userAuthentication, upload.single("image"),
router.post("/add-cabin", upload.single("image"), addCabin);

//  userAuthentication,
router.delete("/delete/:id", deleteCabin);
//  userAuthentication,
router.patch("/update-cabin/:id", updateCabin);
router.get("/get-cabins", getAllCabins);


export default router;
