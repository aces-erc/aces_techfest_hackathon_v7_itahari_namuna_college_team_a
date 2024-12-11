import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkPatients = async (phone) => {
  return prisma.patients.findUnique({ where: { phone } });
};

export const patientController = {
  createPatients: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        dob,
        gender,
        email,
        address,
        phone,
        balance,
        insurance_company_id,
      } = req.body;

      if (
        !first_name ||
        !last_name ||
        !dob ||
        !gender ||
        !address ||
        !insurance_company_id
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existingPatient = await checkPatients(phone);
      if (existingPatient) {
        return res.status(409).json({ error: "Phone number already exists" });
      }

      const newPatient = await prisma.patients.create({
        data: {
          first_name,
          last_name,
          dob: new Date(dob),
          gender,
          email,
          address,
          phone,
          balance: balance || 0,
          insurance_company_id,
        },
      });

      res.status(201).json(newPatient);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the patient" });
    }
  },
};
