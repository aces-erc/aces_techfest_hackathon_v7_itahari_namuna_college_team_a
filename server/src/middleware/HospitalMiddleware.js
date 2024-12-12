import verifyToken from "../utils/tokenUtil.js";
import jwt, { decode } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Middleware to allow only insurance companies to perform certain actions.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const hospitalMiddleware = async (req, res, next) => {
  const cookies = req.cookies.Hospital_Login;

  if (!cookies) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided." });
  };


  const decoded_hospital = jwt.verify(cookies, process.env.JWT_SECRET);



  try {
    const decoded = await prisma.hospital.findUnique({ where: { id: decoded_hospital.id } })
    decoded.role = "HOSPITAL";

    if (decoded.role !== "HOSPITAL") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have the required permissions.",
      });
    }

    res.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};

export default hospitalMiddleware;
