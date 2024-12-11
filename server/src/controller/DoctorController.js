import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    const { username, phone, password, hospital_name } = req.body;

    // Ensure the hospital exists by name
    const hospital = await prisma.hospital.findUnique({
      where: { hospital_name },
    });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Create the doctor
    const doctor = await prisma.doctor.create({
      data: {
        username,
        phone,
        password,
        hospital_id: hospital.id, // Use the hospital's id for the relation
      },
    });

    return res.status(201).json(doctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get doctor info along with the associated hospital
export const getDoctorWithHospital = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Fetch the doctor along with the hospital details
    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(doctorId) },
      include: {
        hospital: true, // This will fetch the hospital info related to the doctor
      },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
