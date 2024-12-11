import express from "express";
const router = express.Router();
import { userController } from "../controller/userController.js";
import insuranceCompanyOnly from "../middleware/authmiddleware.js";

router.post("/createuser", /* insuranceCompanyOnly, */ userController.createUser);

export default router;
