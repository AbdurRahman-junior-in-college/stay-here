import express from "express";
import {
  getAdmin,
  loginAdmin,
  registerAdmin,
  updateAdminData,
} from "../controllers/admin.controller.js";
import { adminAuthentication } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();
router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);
router.get("/get-admin", adminAuthentication, getAdmin);
router.post(
  "/update-admin",
  adminAuthentication,
  upload.single("avatar"),
  updateAdminData
);

export default router;
