// utils/PDFGenerator.ts
import html2pdf from "html2pdf.js";

export const generatePDF = (element: HTMLElement, filename = "resume.pdf") => {
  const opt = {
    margin: 0.5,
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
    },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
};
