import express from "express";
import { insuranceCompanyController } from "../controller/insuranceCompany.js";
const router = express.Router();

router.post("/create", insuranceCompanyController.createInsuranceCompany);
router.get("/getall", insuranceCompanyController.getInsuranceCompanies);
router.get(
  "/getinsurancecompany/:id",
  insuranceCompanyController.getInsuranceCompanyById,
);
router.put("/update/:id", insuranceCompanyController.updateInsuranceCompany);
router.delete("/delete/:id", insuranceCompanyController.deleteInsuranceCompany);
export default router;
