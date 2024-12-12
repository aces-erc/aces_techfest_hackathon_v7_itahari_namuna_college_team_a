import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import { insuranceCompanyController } from "../controller/insuranceCompany.js";
const router = express.Router();

router.post("/create", insuranceCompanyController.createInsuranceCompany);

router.post("/create_hospital", authMiddleware, insuranceCompanyController.createHospital);

router.get("/all_hospital", authMiddleware, insuranceCompanyController.getAllHospital)

// Update a hospital by ID
router.put("/update_hospital/:id", authMiddleware, insuranceCompanyController.updateHospital);

// Delete a hospital by ID
router.delete("/delete_hospital/:id", authMiddleware, insuranceCompanyController.DeleteHospital);


router.get("/getall", insuranceCompanyController.getInsuranceCompanies);
router.get(
  "/getinsurancecompany/:id",
  insuranceCompanyController.getInsuranceCompanyById,
);
router.put("/update/:id", insuranceCompanyController.updateInsuranceCompany);
router.delete("/delete/:id", insuranceCompanyController.deleteInsuranceCompany);
export default router;
