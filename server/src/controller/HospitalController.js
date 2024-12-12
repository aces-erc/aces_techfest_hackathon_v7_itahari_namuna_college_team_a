import { PrismaClient } from "@prisma/client";
import statusFunc from "../utils/statusFunc.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync.js";

const prisma = new PrismaClient();

const createRefreshToken = (res, userData) => {
    const id = userData.id;
    const token = jwtToken(id);

    res.cookie("Hospital_Login", token, {
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

export const Hospital_Login = async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) return statusFunc(res, 400, "Please Enter Username or Password");

    const check_user = await prisma.hospital.findUnique({ where: { username: username } });

    if (!check_user) return statusFunc(res, 200, "User Not Found");

    const verify_loggedin_user = await bcrypt.compare(password, check_user.password);
    console.log(verify_loggedin_user)

    console.log(check_user)

    if (verify_loggedin_user)
        // Hospital_Auth for hospital Authentication
        createRefreshToken(res, check_user)
    else
        return statusFunc(res, 200, "Password Doesnot Matched");
}

export const Create_Doctor_Auth = catchAsync(async (req, res) => {
    const hospital_id = res.user.id; // Assuming `res.user.id` gives the logged-in hospital's ID
    console.log(hospital_id);

    const { username, password, phone } = req.body;

    const new_username = username.replaceAll(" ", "_");

    // Validate the required fields
    if (!username || !password || !phone) {
        return statusFunc(res, 400, "All fields are required!");
    }

    // Check if the doctor already exists (using the Doctor model)
    const check_doctor = await prisma.doctor.findUnique({ where: { username: username } });
    if (check_doctor) return statusFunc(res, 400, "Doctor with this username already exists");

    // Hash the password before saving
    const hashed_password = await bcrypt.hash(password, 12);

    // Create the new doctor in the Doctor table
    const newDoctor = await prisma.doctor.create({
        data: {
            username: new_username,
            phone,
            password: hashed_password,
            hospital_id: hospital_id, // Connect the hospital to an existing insurance company by ID

        },
    });

    // Send success response
    return statusFunc(res, 200, "Doctor Created Successfully", newDoctor);
});

export const Update_Doctor = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { username, phone, password } = req.body;
    let updateData = {};

    if (username) updateData.username = username.replaceAll(" ", "");
    if (phone) updateData.phone = phone;
    if (password) updateData.password = await bcrypt.hash(password, 12); // Only hash if a new password is provided

    const updatedDoctor = await prisma.doctor.update({
        where: { id: Number(id) },
        data: updateData,
    });

    return statusFunc(res, 200, "Doctor updated successfully", updatedDoctor);
});

// Delete Doctor
export const Delete_Doctor = catchAsync(async (req, res) => {
    const { id } = req.params;

    await prisma.doctor.delete({
        where: { id: Number(id) },
    });

    return statusFunc(res, 200, "Doctor deleted successfully");
});

export const Get_All_Doctors = catchAsync(async (req, res) => {
    const doctors = await prisma.doctor.findMany();
    return statusFunc(res, 200, "Doctors retrieved successfully", doctors);
});