import express from "express";
import { userController } from "../controller/userController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import { record_medical_status } from "../controller/patientController.js";
import HospitalReportController from "../controller/HospitalReportController.js";
import { multer, storage } from "./../Helper/Multer.js";

const router = express.Router();

const upload = multer({
  storage,
});

// USER LE K K ACCESS GARNU PAUNE
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

// upload medical report blood pressure, sugar level and description
router.post("/upload_medical_report", authMiddleware, record_medical_status);

// Upload hospital report with X-ray and report attachments
router.post(
  "/hospital_report",
  authMiddleware,
  upload.fields([
    { name: "xray", maxCount: 5 },
    { name: "report", maxCount: 5 },
  ]),
  HospitalReportController.addReport
);
router.delete(
  "/delete_medical_report",
  authMiddleware,
  HospitalReportController.deleteReport
);
router.get("/userprofile/:id", userController.userProfile);

router.get("/show_latest_report", authMiddleware, userController.show_latest_report);

export default router;
