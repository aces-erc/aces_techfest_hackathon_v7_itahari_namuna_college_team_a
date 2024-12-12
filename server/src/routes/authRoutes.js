import express from "express";
const router = express.Router();
import { userController } from "../controller/userController.js";
import authMiddleware from "../middleware/authmiddleware.js";

// router.post("/createuser", authMiddleware, userController.createUser);

export default router;  