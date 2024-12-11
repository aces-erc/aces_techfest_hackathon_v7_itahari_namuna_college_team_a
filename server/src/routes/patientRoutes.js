import express from "express";
import { patientController } from "../controller/patientController.js";
const router = express.Router();

router.post("/create", patientController.createPatients);

export default router;
