import { PrismaClient } from "@prisma/client";
import catchAsync from "../utils/catchAsync.js";

const prisma = new PrismaClient();

const Medical_Report = [
  {
    day: 1,
    blood_pressure: {
      SBP: 120,
      DBP: 80,
      HP: 72,
    },
  },
  {
    day: 2,
    blood_pressure: {
      SBP: 125,
      DBP: 85,
      HP: 75,
    },
    sugar_level: 105,
    description:
      "Feeling slightly fatigued today, but no significant discomfort. Mild headache.",
  },
  {
    day: 3,
    blood_pressure: {
      SBP: 118,
      DBP: 78,
      HP: 70,
    },
    sugar_level: 98,
    description:
      "Feeling better, energy levels are back to normal. No major symptoms today.",
  },
  {
    day: 4,
    blood_pressure: {
      SBP: 130,
      DBP: 85,
      HP: 80,
    },
    sugar_level: 110,
    description:
      "Slight dizziness today. Blood pressure was a bit high in the morning.",
  },
  {
    day: 5,
    blood_pressure: {
      SBP: 115,
      DBP: 75,
      HP: 70,
    },
    sugar_level: 102,
    description:
      "Feeling great, no issues with blood pressure or sugar level today. Active and energetic.",
  },
];
export const record_medical_status = catchAsync(async (req, res) => {
  const user = res.user;

  if (!user || !user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User not found in the request.",
    });
  }

  try {
    // Loop through the predefined medical reports
    for (let data of Medical_Report) {
      // Create health records in the database
      await prisma.healthRecord.create({
        data: {
          user_id: user.id, // User ID from the request
          date: new Date(), // Current date
          bloodPressure: data.blood_pressure
            ? JSON.stringify(data.blood_pressure)
            : null, // Convert object to JSON if present
          sugarLevel: data.sugar_level || null, // Default to null if not provided
          description: data.description || null, // Default to null if not provided
        },
      });
    }

    res.status(201).json({
      success: true,
      message: "Medical records created successfully.",
    });
  } catch (error) {
    console.error("Error saving medical records:", error.message);
    res.status(500).json({
      success: false,
      message: "Error saving medical records.",
      error: error.message,
    });
  }
});

export default { record_medical_status };
