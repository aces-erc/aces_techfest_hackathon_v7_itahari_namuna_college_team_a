import express from "express";
import { userController } from "../controller/userController.js";
import insuranceCompanyOnly from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/create", /* insuranceCompanyOnly, */ userController.createUser);

export default router;
