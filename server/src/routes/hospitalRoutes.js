import express from "express";
const router = express.Router();
import { Hospital_Login, Create_Doctor_Auth, Update_Doctor, Delete_Doctor, Get_All_Doctors } from "../controller/HospitalController.js";
import hospitalMiddleware from "../middleware/HospitalMiddleware.js";

router.post("/hospital_login", Hospital_Login);
router.post("/create_doctor", hospitalMiddleware, Create_Doctor_Auth);
router.get("/get_all_doctor", hospitalMiddleware, Get_All_Doctors)
router.put("/update_doctor/:id", hospitalMiddleware, Update_Doctor);
router.delete("/delete_doctor/:id", hospitalMiddleware, Delete_Doctor);

export default router;