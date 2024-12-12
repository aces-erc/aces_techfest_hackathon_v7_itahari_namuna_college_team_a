import express from "express";
import { userController } from "../controller/userController.js";
const router = express.Router();




// USER LE K K ACCESS GARNU PAUNE 
router.post("/login",  userController.loginUser);
router.get("/logout",  userController.logoutUser);

export default router;