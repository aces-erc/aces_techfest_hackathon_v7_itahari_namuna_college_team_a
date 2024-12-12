import express from "express";
import { userController } from "../controller/userController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import { record_medical_status } from "../controller/patientController.js";

const router = express.Router();


// USER LE K K ACCESS GARNU PAUNE 
router.post("/login",  userController.loginUser);
router.get("/logout",  userController.logoutUser);

// upload medical report blood pressure, sugar level and description
router.post("/upload_medical_report", authMiddleware, record_medical_status);


export default router;  