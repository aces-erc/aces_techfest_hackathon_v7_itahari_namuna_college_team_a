import { PrismaClient } from "@prisma/client/extension";
import path from "path";
import fs from "fs";
import { defaultMaxListeners } from "events";

const HospitalReportController = {
  /**
   * Add a new hospital report for a user
   * @param {Request} req
   * @param {Response} res
   */
  async addReport(req, res) {
    try {
      const { userId } = req.body;

      // Ensuring the user ID is provided here
      if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
      }

      // Ensure a file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: "File upload is required." });
      }

      const newReport = await prisma.hospitalReport.create({
        data: {
          user_id: parseInt(userId),
          fileName: req.file.filename,
          url: `/uploads/${req.file.filename}`,
          uploadedAt: new Date(),
        },
      });

      res.status(201).json({
        message: "Hospital report added successfully.",
        report: newReport,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add hospital report." });
    }
  },

  /**
   * Delete a hospital report by ID
   * @param {Request} req
   * @param {Response} res
   */
  async deleteReport(req, res) {
    try {
      const { reportId } = req.params;

      // Find the report to delete
      const report = await prisma.hospitalReport.findUnique({
        where: { id: parseInt(reportId) },
      });

      if (!report) {
        return res.status(404).json({ error: "Hospital report not found." });
      }

      // Delete the file from the server
      const filePath = path.join(__dirname, "../uploads", report.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete the report from the database
      await prisma.hospitalReport.delete({
        where: { id: parseInt(reportId) },
      });

      res
        .status(200)
        .json({ message: "Hospital report deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete hospital report." });
    }
  },
};
export default HospitalReportController;
