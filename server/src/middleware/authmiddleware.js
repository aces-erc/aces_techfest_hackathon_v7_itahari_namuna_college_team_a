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
const authMiddleware = async(req, res, next) => {
  const cookies = req.cookies.jwt;
  

  if (!cookies) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided." });
  };

  const decoded_user = jwt.verify(cookies, process.env.JWT_SECRET);
  console.log(decoded_user);

  try {
    const decoded = await prisma.iNSURANCE_COMPANY.findUnique({where: {id: decoded_user.id}})

    if (decoded.role !== "INSURANCE_COMPANY") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have the required permissions.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};

export default authMiddleware;
