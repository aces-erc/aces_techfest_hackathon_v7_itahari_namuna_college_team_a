import bcrypt from "bcrypt.js";
import { PrismaClient } from "@prisma/client";
import { generateJwtToken } from "../utils/tokenUtil.js";
import { statusFunc } from "../utils/statusFunc.js";

const prisma = new PrismaClient();

// INSURANCE COMPANY CREATES USER / PATIENTS [USER LOGIN DETAILS ]
export const registerController = async (req, res) => {
  const {
    role,
    phone,
    password,
    email,
    first_name,
    last_name,
    dob,
    gender,
    address,
    insurance_company_id,
  } = req.body;

  if (!phone || !password || !role) {
    return statusFunc(res, 400, "Phone, password, and role are required.");
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return statusFunc(res, 400, "Phone number already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "PATIENTS") {
      const newPatient = await prisma.patients.create({
        data: {
          first_name,
          last_name,
          dob,
          gender,
          address,
          phone,
          email,
          role,
          balance: 0,
          insurance_company_id,
          password: hashedPassword,
        },
      });
      return statusFunc(res, 201, "Patient registered successfully.", {
        id: newPatient.id,
      });
    } else {
      return statusFunc(
        res,
        400,
        "Only patient registration is supported in this endpoint.",
      );
    }
  } catch (error) {
    console.error(error);
    return statusFunc(res, 500, "Error during registration.");
  }
};

export const loginController = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return statusFunc(res, 400, "Phone and password are required.");
  }

  try {
    // Check if user exists in the Patients table
    const patient = await prisma.patients.findUnique({
      where: { phone },
    });

    if (!patient) {
      return statusFunc(res, 404, "User not found.");
    }

    // Validate the password
    const isPasswordCorrect = await bcrypt.compare(password, patient.password);
    if (!isPasswordCorrect) {
      return statusFunc(res, 403, "Invalid credentials.");
    }

    // Generate JWT token
    const token = generateJwtToken(patient.id, patient.role);
    return statusFunc(res, 200, "Login successful.", {
      token,
      role: patient.role,
    });
  } catch (error) {
    console.error(error);
    return statusFunc(res, 500, "Error during login.");
  }
};

export const logoutController = async (_req, res) => {

  return statusFunc(res, 200, "Logged out successfully.");
};
