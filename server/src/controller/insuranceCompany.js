import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insuranceCompanyController = {
  createInsuranceCompany: async (req, res) => {
    const { company_name } = req.body;

    if (!company_name) {
      return res.status(400).json({ error: "Company name is required" });
    }

    try {
      const newInsuranceCompany = await prisma.iNSURANCE_COMPANY.create({
        data: {
          company_name,
        },
      });
      res.status(201).json(newInsuranceCompany);
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
