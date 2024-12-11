import e from "express";
const router = express.Router();
import { userController } from "../controller/userController.js";

router.post("/createuser", insuranceCompanyOnly, userController.createPatients);

module.exports = router;

const insuranceCompanyOnly = require("./middleware/authMiddleware");
