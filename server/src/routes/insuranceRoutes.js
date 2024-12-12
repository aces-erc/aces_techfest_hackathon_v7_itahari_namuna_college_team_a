import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import InsuranceCompanyMiddleware from "../middleware/InsuranceCompanyMiddleware.js";
import { insuranceCompanyController } from "../controller/insuranceCompany.js";
import { userController } from "../controller/userController.js";

const router = express.Router();

// yesle insurance company create garney
router.post("/create", insuranceCompanyController.createInsuranceCompany);

// login insurance company
router.post("/login", insuranceCompanyController.loginInsuranceCompany);

// yo route le hospital create garney [but needs to be logged-in first as InsuranceCompany]
router.post(
  "/create_hospital",
  InsuranceCompanyMiddleware,
  insuranceCompanyController.createHospital,
);

// this routes get all the hospital
router.get(
  "/all_hospital",
  InsuranceCompanyMiddleware,
  insuranceCompanyController.getAllHospital,
);

// Update a hospital by ID
router.put(
  "/update_hospital/:id",
  InsuranceCompanyMiddleware,
  insuranceCompanyController.updateHospital,
);

// Delete a hospital by ID
router.delete(
  "/delete_hospital/:id",
  InsuranceCompanyMiddleware,
  insuranceCompanyController.DeleteHospital,
);

router.get(
  "/getall",
  InsuranceCompanyMiddleware,
  insuranceCompanyController.getInsuranceCompanies,
);
router.get(
  "/getinsurancecompany/:id",
  insuranceCompanyController.getInsuranceCompanyById,
);
router.put("/update/:id", insuranceCompanyController.updateInsuranceCompany);
router.delete("/delete/:id", insuranceCompanyController.deleteInsuranceCompany);

// USER INFORMATION
router.post(
  "/createuser",
  InsuranceCompanyMiddleware,
  userController.createUser,
);

router.get(
  "/getallusers",
  InsuranceCompanyMiddleware,
  userController.getAllUsers,
);

export default router;
