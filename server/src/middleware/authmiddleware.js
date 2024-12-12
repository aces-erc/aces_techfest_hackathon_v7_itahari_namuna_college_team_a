import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import catchAsync from "../utils/catchAsync.js";

const prisma = new PrismaClient();

/**
 * Middleware to allow only PATIENTS to perform certain actions.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authMiddleware = catchAsync(async (req, res, next) => {
  const cookies = req.cookies.jwt;

  // Check if token exists
  if (!cookies) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided." });
  }

  let decoded_user;
  try {
    // Verify JWT token
    decoded_user = jwt.verify(cookies, process.env.JWT_SECRET);
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid or expired token." });
  }

  // Fetch user from the database
  const decoded = await prisma.user.findUnique({ where: { id: decoded_user.id } });

  // Handle missing user
  if (!decoded) {
    return res.status(404).json({
      success: false,
      message: "User not found in the database.",
    });
  }

  // Check if the user has the correct role
  if (decoded.role !== "PATIENTS") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You do not have the required permissions.",
    });
  }

  // Attach user to the request object
  res.user = decoded;
  next();
});

export default authMiddleware;
