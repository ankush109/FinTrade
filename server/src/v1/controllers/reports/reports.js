import { mailService } from "../../services/mailService";
import { uploadGeneratedPdfToS3 } from "../../services/s3UploadManager";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const reportController = {
  async generateReport(req, res) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(400).json({
          message: "user not found",
        });
      }
      const expenses = await prisma.expense.findMany({
        where: {
          userId,
        },
      });
      console.log(expenses, "expense of the user ");
      const pdfUrl = await uploadGeneratedPdfToS3(userId, expenses);

      const info = await mailService.sendEmail(user.email, pdfUrl);
      console.log(info, "mail sent info");
      res.status(200).json({
        success: true,
        message: "PDF generated and uploaded successfully",
        url: pdfUrl,
      });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate report",
        error: error.message,
      });
    }
  },
};
