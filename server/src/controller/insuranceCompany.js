import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import statusFunc from "../utils/statusFunc.js";

const prisma = new PrismaClient();

const createRefreshToken = (res, userData) => {
  const id = userData.id;
  const token = jwtToken(id);
  console.log(token)

  res.cookie("jwt", token, {
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
  createInsuranceCompany: async (req, res) => {
    const { company_name, password } = req.body;

    if (!company_name || !password) {
      return res.status(400).json({ error: "Company name and Password is required" });
    }

    try {
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
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while creating the insurance company",
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
