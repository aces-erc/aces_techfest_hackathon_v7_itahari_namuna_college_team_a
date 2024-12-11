import express from "express";
const router = express.Router();
import {
  createDoctor,
  getDoctorWithHospital,
} from "../controller/DoctorController.js";

router.post("/create", createDoctor);
router.get("/:doctorId", getDoctorWithHospital);

export default router;
