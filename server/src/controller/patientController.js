import { PrismaClient } from "@prisma/client";
import catchAsync from "../utils/catchAsync.js";
import statusFunc from "../utils/statusFunc.js";

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
    suger_level: 105,
    description: "Feeling slightly fatigued today, but no significant discomfort. Mild headache.",
  },
  {
    day: 3,
    blood_pressure: {
      SBP: 118,
      DBP: 78,
      HP: 70,
    },
    suger_level: 98,
    description: "Feeling better, energy levels are back to normal. No major symptoms today.",
  },
  {
    day: 4,
    blood_pressure: {
      SBP: 130,
      DBP: 85,
      HP: 80,
    },
    suger_level: 110,
    description: "Slight dizziness today. Blood pressure was a bit high in the morning.",
  },
  {
    day: 5,
    blood_pressure: {
      SBP: 115,
      DBP: 75,
      HP: 70,
    },
    suger_level: 102,
    description: "Feeling great, no issues with blood pressure or sugar level today. Active and energetic.",
  },
]


export const record_medical_status = catchAsync(async (req, res) => {
  const user = res.user;

  if (!user || !user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User not found in the request.",
    });
  }

  const report = req.body;

  if (!report) {
    return res.status(400).json({
      success: false,
      message: "Please insert data!",
    });
  }

  // Ensure valid data for each field
  try {
    for (let data of Medical_Report) {
      // Validate data before processing
      if (!data) {
        console.error("Invalid data entry:", data);
        continue;
      }

      await prisma.healthRecord.create({
        data: {
          user_id: user.id, // Set the authenticated user's ID
          date: new Date(), // Use current date and time
          bloodPressure: data.bloodPressure
            ? JSON.stringify(data.bloodPressure) // Convert to JSON if provided
            : null,
          sugarLevel: data.sugarLevel ? parseInt(data.sugarLevel) : null,
          description: data.description || null, // Use null if not provided
        },
      });
    }

    console.log("Medical reports saved successfully!");
  } catch (error) {
    console.error("Error saving medical reports:", error.message);
  }

  // Respond with success
  res.status(201).json({
    success: true,
    message: "Medical record created successfully.",
    data: "uploaded",
  });
});

export default { record_medical_status };
