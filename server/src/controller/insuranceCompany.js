import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import statusFunc from "../utils/statusFunc.js";
import catchAsync from "../utils/catchAsync.js";

const prisma = new PrismaClient();

const createRefreshToken = (res, userData) => {
  const id = userData.id;
  const token = jwtToken(id);
  console.log(token)

  res.cookie("Insurance_Company", token, {
    expires: new Date(
      Date.now() + process.env.BROWSER_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  })

  statusFunc(res, 201, token)
}

const jwtToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const checkUser = async (phone) => {
  return prisma.user.findUnique({ where: { phone } });
};

export const insuranceCompanyController = {
  createInsuranceCompany: catchAsync(async (req, res) => {
    const { company_name, password } = req.body;
    console.log(company_name, password);


    if (!company_name || !password) {
      return res.status(400).json({ error: "Company name and Password is required" });
    }

    const hashed_password = await bcrypt.hash(password, 12);

    const newInsuranceCompany = await prisma.iNSURANCE_COMPANY.create({
      data: {
        company_name,
        password: hashed_password
      },
    });

    console.log(newInsuranceCompany);

    // res.status(201).json(newInsuranceCompany);
    createRefreshToken(res, newInsuranceCompany);

  }),

  loginInsuranceCompany: async (req, res) => {
    const { company_name, password } = req.body;

    if (!company_name || !password) {
      return res.status(400).json({ error: "Company name and Password is required" });
    }

    try {
      // Find the insurance company by company name
      const insuranceCompany = await prisma.iNSURANCE_COMPANY.findUnique({
        where: {
          company_name,
        },
      });

      // If the company doesn't exist, return an error
      if (!insuranceCompany) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare the hashed passwords
      const passwordMatch = await bcrypt.compare(password, insuranceCompany.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // If the credentials are valid, create a refresh token and send it back
      createRefreshToken(res, insuranceCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while logging in",
      });
    }
  },

  createHospital: async (req, res) => {
    const insurance_id = res.user.id; // Gets the Insurance company ID from the authenticated user

    const { hospital_name, password, hospital_address } = req.body;

    // Validate required fields
    if (!hospital_name || !password || !hospital_address) {
      return res.status(400).json({ error: "Hospital name, password, and address are required" });
    }

    // Generate a unique username based on the hospital name
    const username = hospital_name.replace(/\s+/g, "_").toLowerCase();

    try {
      // Hash the password
      const hashed_password = await bcrypt.hash(password, 12);

      // Create the new hospital entry in the database
      const newHospital = await prisma.hospital.create({
        data: {
          hospital_name,
          username,
          password: hashed_password,
          hospital_address,
          insurance_company: {
            connect: { id: insurance_id }, // Connect the hospital to the existing insurance company by ID
          },
        },
      });

      console.log("New hospital created:", newHospital);

      // Respond with the created hospital data (excluding sensitive info like password)
      res.status(201).json({
        message: "Hospital created successfully.",
        hospital: {
          id: newHospital.id,
          hospital_name: newHospital.hospital_name,
          username: newHospital.username,
          hospital_address: newHospital.hospital_address,
          insurance_company_id: newHospital.insurance_company_id,
          createdAt: newHospital.createdAt,
          updatedAt: newHospital.updatedAt,
        },
      });
    } catch (error) {
      console.error("Error creating hospital:", error);
      res.status(500).json({
        error: "An error occurred while creating the hospital",
      });
    }
  },

  getAllHospital: async (req, res) => {
    const insurance_id = req.user.id; // The authenticated insurance company ID

    try {
      const hospitals = await prisma.hospital.findMany({
        where: {
          insurance_companies: {
            some: {
              id: insurance_id, // Filter hospitals that have a connection to this insurance company
            },
          },
        },
        include: {
          doctors: true, // Optionally include related data (e.g., doctors)
        },
      });

      res.status(200).json(hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error.message);
      res.status(500).json({
        error: "An error occurred while fetching the hospitals.",
      });
    }
  },

  updateHospital: async (req, res) => {
    const hospitalId = req.params.id;
    console.log(hospitalId);
    const { hospital_name, username, password, hospital_address } = req.body;

    try {
      // Check if the hospital exists
      const existingHospital = await prisma.hospital.findUnique({
        where: { id: parseInt(hospitalId) },
      });

      if (!existingHospital) {
        return res.status(404).json({ error: "Hospital not found" });
      }

      // Hash the password if it is provided in the request
      let hashed_password = existingHospital.password;
      if (password) {
        hashed_password = await bcrypt.hash(password, 12);
      }

      // Update the hospital record
      const updatedHospital = await prisma.hospital.update({
        where: { id: parseInt(hospitalId) },
        data: {
          hospital_name,
          username,
          password: hashed_password,
          hospital_address,
        },
      });

      res.status(200).json(updatedHospital);
    } catch (error) {
      console.error("Error updating hospital:", error.message);
      res.status(500).json({
        error: "An error occurred while updating the hospital.",
      });
    }
  },

  DeleteHospital: async (req, res) => {
    const hospitalId = req.params.id; // Hospital ID from the request parameters

    try {
      // Check if the hospital exists
      const existingHospital = await prisma.hospital.findUnique({
        where: { id: parseInt(hospitalId) },
      });

      if (!existingHospital) {
        return res.status(404).json({ error: "Hospital not found" });
      }

      // Delete the hospital
      await prisma.hospital.delete({
        where: { id: parseInt(hospitalId) },
      });

      res.status(200).json({ message: "Hospital deleted successfully" });
    } catch (error) {
      console.error("Error deleting hospital:", error.message);
      res.status(500).json({
        error: "An error occurred while deleting the hospital.",
      });
    }
  },


  getInsuranceCompanies: async (req, res) => {
    try {
      const insuranceCompanies = await prisma.iNSURANCE_COMPANY.findMany();
      res.status(200).json(insuranceCompanies);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching insurance companies",
      });
    }
  },

  getInsuranceCompanyById: async (req, res) => {
    const { id } = req.params;

    try {
      const insuranceCompany = await prisma.iNSURANCE_COMPANY.findUnique({
        where: { id: Number(id) },
      });

      if (!insuranceCompany) {
        return res.status(404).json({ error: "Insurance company not found" });
      }

      res.status(200).json(insuranceCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching the insurance company",
      });
    }
  },

  // Update an insurance company by ID
  updateInsuranceCompany: async (req, res) => {
    const { id } = req.params;
    const { company_name } = req.body;

    if (!company_name) {
      return res.status(400).json({ error: "Company name is required" });
    }

    try {
      const updatedInsuranceCompany = await prisma.iNSURANCE_COMPANY.update({
        where: { id: Number(id) },
        data: {
          company_name,
        },
      });
      res.status(200).json(updatedInsuranceCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while updating the insurance company",
      });
    }
  },

  // Delete an insurance company by ID
  deleteInsuranceCompany: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedInsuranceCompany = await prisma.iNSURANCE_COMPANY.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({
        message: "Insurance company deleted successfully",
        deletedInsuranceCompany,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while deleting the insurance company",
      });
    }
  },
};
