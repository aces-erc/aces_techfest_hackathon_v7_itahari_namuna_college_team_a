import express from "express";
import { PrismaClient } from "@prisma/client";

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



// REGISTER USER BY INSURANCE COMPANY 
export const userController = {
  createUser: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        dob,
        gender,
        email,
        address,
        password,
        phone,
        balance,
        insurance_company_id,
      } = req.body;

      if (
        !first_name ||
        !last_name ||
        !dob ||
        !password ||
        !gender ||
        !address ||
        !insurance_company_id
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existngUser = await checkUser(phone);
      if (existngUser) {
        return res.status(409).json({ error: "Phone number already exists" });
      }

      const newUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          dob: new Date(dob),
          password,
          gender,
          email,
          address,
          phone,
          balance: balance || 0,
          insurance_company_id,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the user" });
    }
  },
};
