import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const HospitalReportController = {
  /**
   * Add a new hospital report for a user
   * @param {Request} req
   * @param {Response} res
   */
  addReport: async (req, res) => {
    try {
      const userId = parseInt(res.user.id);

      // Ensure the user ID is provided
      if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
      }

      // Ensure files are uploaded
      if (!req.files || (!req.files.xray && !req.files.report)) {
        return res.status(400).json({ error: "File upload is required." });
      }

      // Fetch the user's existing reports
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Initialize reports array
      const reports = user.hostpital_Report || [];

      // Process uploaded X-ray files
      if (req.files.xray) {
        for (const file of req.files.xray) {
          reports.push({
            id: Date.now(), // Generate unique ID
            fileName: file.filename,
            url: `/uploads/${file.filename}`,
            uploadedAt: new Date(),
            type: "xray",
          });
        }
      }

      // Process uploaded report files
      if (req.files.report) {
        for (const file of req.files.report) {
          reports.push({
            id: Date.now(), // Generate unique ID
            fileName: file.filename,
            url: `/uploads/${file.filename}`,
            uploadedAt: new Date(),
            type: "report",
          });
        }
      }

      // Update the user's hospital reports
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { hostpital_Report: reports },
      });

      res.status(201).json({
        message: "Hospital report added successfully.",
        reports,
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
  deleteReport: async (req, res) => {
    try {
      const { reportId } = req.params;
      const { userId } = req.body;

      // Fetch the user's reports
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!user || !user.hostpital_Report) {
        return res
          .status(404)
          .json({ error: "Report not found for the user." });
      }

      // Find and remove the report from JSON
      const reports = user.hostpital_Report.filter(
        (report) => report.id !== parseInt(reportId),
      );

      // Check if the report existed
      if (reports.length === user.hostpital_Report.length) {
        return res.status(404).json({ error: "Hospital report not found." });
      }

      // Delete the file from the server
      const reportToDelete = user.hostpital_Report.find(
        (report) => report.id === parseInt(reportId),
      );

      if (reportToDelete) {
        const filePath = path.join(
          __dirname,
          "../uploads",
          reportToDelete.fileName,
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Update the user's hospital reports
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { hostpital_Report: reports },
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
