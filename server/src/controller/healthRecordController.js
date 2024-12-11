import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const healthRecordController = {
  updateHealthRecord: async (req, res) => {
    try {
      const { healthRecordId, bloodPressure, sugarLevel } = req.body;

      // Validating required fields
      if (!healthRecordId || (!bloodPressure && !sugarLevel)) {
        return res.status(400).json({
          error:
            "Missing required fields: healthRecordId and at least one of bloodPressure or sugarLevel",
        });
      }

      // Find the health record by ID and ensure it belongs to the user
      const healthRecord = await prisma.healthRecord.findUnique({
        where: { id: healthRecordId },
        include: { user: true },
      });

      if (!healthRecord) {
        return res.status(404).json({ error: "Health record not found" });
      }

      // Check if the logged-in user owns the record
      if (healthRecord.user.phone !== req.user.phone) {
        return res.status(403).json({
          error: "You are not authorized to update this health record",
        });
      }

      // Update the health record
      const updatedHealthRecord = await prisma.healthRecord.update({
        where: { id: healthRecordId },
        data: {
          ...(bloodPressure && { bloodPressure }),
          ...(sugarLevel && { sugarLevel }),
        },
      });

      res.status(200).json({
        message: "Health record updated successfully",
        updatedHealthRecord,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while updating the health record",
      });
    }
  },
};
