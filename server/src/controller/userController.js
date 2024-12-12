import express from "express";
import { PrismaClient } from "@prisma/client";
import statusFunc from "../utils/statusFunc.js";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const createRefreshToken = (res, userData) => {
  const id = userData.id;
  const token = jwtToken(id);
  console.log(token);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.BROWSER_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  });

  statusFunc(res, 201, token);
};

const jwtToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

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
        role,
        gender,
        email,
        address,
        password,
        phone,
        bloodGroup,
        balance,
        insurance_company_id,
      } = req.body;

      if (
        !first_name ||
        !last_name ||
        !dob ||
        !password ||
        !role ||
        !gender ||
        !address ||
        !bloodGroup ||
        !insurance_company_id
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const hashed_password = await bcrypt.hash(password, 12);

      const existingUser = await checkUser(phone);
      if (existingUser) {
        return res.status(409).json({ error: "Phone number already exists" });
      }

      const newUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          dob: new Date(dob),
          password: hashed_password,
          gender,
          email,
          role,
          address,
          phone,
          bloodGroup,
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

  userProfile: async (req, res) => {
    try {
      console.log(req.params.id);
      const userId = req.params.id; // Assume user ID is passed as a URL parameter

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          first_name: true,
          last_name: true,
          dob: true,
          gender: true,
          email: true,
          address: true,
          phone: true,
          role: true,
          balance: true,
          bloodGroup: true,
          insurance_company_id: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the user profile" });
    }
  },

  loginUser: catchAsync(async (req, res) => {
    const { phone, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const createRefreshToken = (res, userData) => {
      const id = userData.id;
      const token = jwtToken(id);
      console.log(token);

      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() +
            process.env.BROWSER_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
      });
    };

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        address: user.address,
        dob: user.dob,
        bloodGroup: user.bloodGroup,
        balance: user.balance,
        insurance_company_id: user.insurance_company_id,
      },
    });
  }),

  logoutUser: async (req, res) => {
    res.clearCookie("jwt");
    // Implement logout logic here, e.g., invalidate token or session
    res.json({ message: "Logged out successfully" });
  },
};
