import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-default-secret"; // Replace with your actual secret key
const TOKEN_EXPIRATION = "1h";

/**
 *
 * @param {Object} payload - The data to encode in the token.
 * @returns {string} The generated token.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

/**
 *
 * @param {string} token - The token to verify.
 * @returns {Object} The decoded payload if the token is valid.
 * @throws {Error} If the token is invalid or expired.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};

export default {
  generateToken,
  verifyToken,
};
