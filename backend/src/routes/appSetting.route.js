import express from "express";
import { getAppSetting, updateSetting } from "../controllers/appSetting.controller.js";

const router = express.Router();
router.get('/get-setting', getAppSetting)
router.patch('/update', updateSetting)

export default router;