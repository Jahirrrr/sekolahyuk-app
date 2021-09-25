/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const ExcelJS = require("exceljs");
const Result = require("../models/result");

const generateExcel = async (testId) => {
  const workbook = new ExcelJS.Workbook();

  const result = await Result.find({ testId })
    .select("score studentId testId")
    .populate("studentId testId");

  //console.log(result);
  const worksheet = workbook.addWorksheet("Results", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
  });
  worksheet.columns = [
    { header: "Subject", key: "Subject", width: 30 },
    { header: "Test Title", key: "TestTitle", width: 30 },
    { header: "Name", key: "Name", width: 30 },
    { header: "Email", key: "Email", width: 50 },

    { header: "Obtained Marks", key: "Marks", width: 17 },
    { header: "Max Marks", key: "MaxMarks", width: 15 },
  ];
  result.map((r) => {
    worksheet.addRow({
      Subject: r.testId.subject,
      TestTitle: r.testId.title,
      Name: r.studentId.name,
      Email: r.studentId.email,

      Score: r.score,
      MaxScore: r.testId.maxMarks,
    });
  });

  return workbook;
};

module.exports = { generateExcel };
