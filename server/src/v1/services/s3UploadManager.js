import { S3 } from "aws-sdk";
import PDFDocument from "pdfkit";
import { convertDateTimeStamp } from "../../utils/func-utils";

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadGeneratedPdfToS3 = async (userId, expenses) => {
  try {
    const pdfUrl = await createAndUploadPdfToS3(userId, expenses);
    console.log("PDF URL:", pdfUrl);
    return pdfUrl;
  } catch (err) {
    console.error("Error generating/uploading PDF:", err);
  }
};

async function createAndUploadPdfToS3(userId, expenses) {
  const fileName = `report_${userId}_${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;
  const s3Key = `reports/${userId}/${fileName}`;

  const pdfBuffer = await generatePdfBuffer(expenses);

  const s3Params = {
    Bucket: "fintrade-bucket",
    Key: s3Key, // S3 object key
    Body: pdfBuffer, // The PDF buffer
    ContentType: "application/pdf", // MIME type
  };

  const { Location } = await s3.upload(s3Params).promise();
  return Location;
}

function generatePdfBuffer(pdfData) {
  return new Promise(async (resolve, reject) => {
    if (!pdfData || pdfData.length === 0) {
      return reject(new Error("No pdfData provided"));
    }

    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(25).text("Expense Report", { align: "center" });
    doc.moveDown();

    let total = 0;
    const categoryTotals = {};

    for (let i = 0; i < pdfData.length; i++) {
      const expense = pdfData[i];
      const formattedDate = await convertDateTimeStamp(expense.createdAt);
      const price = Number(expense.price);

      total += price;
      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) + price;

      doc
        .fontSize(12)
        .text(
          `${i + 1}. ${expense.category} - Rs ${price.toFixed(
            2
          )} on ${formattedDate}`
        );
    }

    doc.moveDown(1);

    doc.fontSize(13).text("Total Per Category:", { underline: true });
    doc.font("Helvetica");

    Object.entries(categoryTotals).forEach(([category, sum]) => {
      doc.fontSize(12).text(`- ${category}: Rs ${sum.toFixed(2)}`);
    });
    doc.moveDown(1);
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(`Total Expense: Rs ${total.toFixed(2)}`);

    doc.end();
  });
}
