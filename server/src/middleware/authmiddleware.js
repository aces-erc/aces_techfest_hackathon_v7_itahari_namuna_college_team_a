import verifyToken from "../utils/tokenUtil.js";

/**
 * Middleware to allow only insurance companies to perform certain actions.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const insuranceCompanyOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided." });
  }

  try {
    const decoded = verifyToken(token);

    if (decoded.role !== "INSURANCE_COMPANY") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have the required permissions.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};

export default insuranceCompanyOnly;
