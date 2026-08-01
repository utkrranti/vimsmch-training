import PDFDocument from "pdfkit";
import { readFileSync } from "fs";
import { join } from "path";

let foundationLogo: Buffer | null = null;
let instituteLogo: Buffer | null = null;
try {
  foundationLogo = readFileSync(join(process.cwd(), "public", "images", "foundation-logo-pdf.png"));
  instituteLogo = readFileSync(join(process.cwd(), "public", "images", "paramedical-institute-logo-pdf.png"));
} catch {
  // Logos are decorative — the form still generates correctly without them.
}

type Subject = { subject?: string; maximum?: number | string | null; obtained?: number | string | null; grade?: string | null };
type Admission = Record<string, unknown> & {
  applicationNo: string;
  name: string;
  phone: string;
  email?: string | null;
  course: { title: string };
  batch?: { label: string } | null;
  documents: Array<{ label: string; status: string; fileName: string }>;
};

const NAVY = "#172B3A";
const BLUE = "#075985";
const ACCENT = "#3A718C";
const MUTED = "#5A6B75";
const LINE = "#D8E5EA";
const CELL_FILL = "#F7FAFC";
const CELL_BORDER = "#E3EAEE";
const HEADER_FILL = "#DFF2F8";

const val = (v: unknown) => (v === null || v === undefined || v === "" ? "—" : String(v));
const fmtDate = (v: unknown) => (v instanceof Date ? v.toLocaleDateString("en-IN") : val(v));
const yesNo = (v: unknown) => (v === true ? "Yes" : v === false ? "No" : "—");
const address = (...parts: unknown[]) => parts.filter(Boolean).join(", ") || "—";
const subjectRows = (v: unknown): Subject[] => (Array.isArray(v) ? (v as Subject[]) : []);

export function createAdmissionFormPdf(a: Admission): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 42, bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const marginLeft = doc.page.margins.left;
    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const gap = 10;
    const colWidth = (pageWidth - gap) / 2;
    const cellPad = 8;
    const labelSize = 7.5;
    const valueSize = 9.5;

    const heading = (text: string) => {
      doc.moveDown(0.7);
      const pageBefore = doc.page;
      const y = doc.y;
      doc.fontSize(12.5).font("Helvetica-Bold").fillColor(BLUE).text(text, marginLeft + 8, y, { width: pageWidth - 8, lineBreak: false });
      if (doc.page !== pageBefore) {
        // The heading text itself triggered a page break — redraw it at the top of the new page so the bar and text stay together.
        const newY = doc.y - 16;
        doc.rect(marginLeft, newY, 3, 14).fill(BLUE);
      } else {
        doc.rect(marginLeft, y, 3, 14).fill(BLUE);
      }
      doc.moveDown(0.35);
    };

    const cellHeight = (value: string) => {
      const valueHeight = doc.font("Helvetica-Bold").fontSize(valueSize).heightOfString(value, { width: colWidth - cellPad * 2 });
      return cellPad + labelSize + 4 + valueHeight + cellPad;
    };

    const drawCell = (x: number, y: number, height: number, label: string, value: string) => {
      doc.roundedRect(x, y, colWidth, height, 3).fillAndStroke(CELL_FILL, CELL_BORDER);
      doc.fontSize(labelSize).font("Helvetica-Bold").fillColor(ACCENT).text(label.toUpperCase(), x + cellPad, y + cellPad, { width: colWidth - cellPad * 2 });
      doc.fontSize(valueSize).font("Helvetica-Bold").fillColor(NAVY).text(value, x + cellPad, y + cellPad + labelSize + 4, { width: colWidth - cellPad * 2 });
    };

    const grid = (items: Array<[string, unknown]>) => {
      for (let i = 0; i < items.length; i += 2) {
        const [leftLabel, leftValueRaw] = items[i];
        const rightItem = items[i + 1];
        const leftValue = val(leftValueRaw);
        const rightValue = rightItem ? val(rightItem[1]) : "";
        const rowHeight = Math.max(cellHeight(leftValue), rightItem ? cellHeight(rightValue) : 0, 32);

        if (doc.y + rowHeight > doc.page.height - doc.page.margins.bottom) doc.addPage();
        const y = doc.y;
        drawCell(marginLeft, y, rowHeight, leftLabel, leftValue);
        if (rightItem) drawCell(marginLeft + colWidth + gap, y, rowHeight, rightItem[0], rightValue);
        doc.y = y + rowHeight + 6;
      }
    };

    const subjectsTable = (title: string, type: unknown, subjectData: Subject[]) => {
      if (!subjectData.length) {
        doc.fontSize(9).font("Helvetica-Oblique").fillColor(MUTED).text(`${title} subject-wise details: Not provided`);
        return;
      }
      const grades = type === "GRADES";
      const headers = grades ? ["Subject", "Grade"] : ["Subject", "Max marks", "Obtained"];
      const widths = grades ? [pageWidth * 0.7, pageWidth * 0.3] : [pageWidth * 0.5, pageWidth * 0.25, pageWidth * 0.25];

      doc.moveDown(0.2);
      doc.fontSize(9.5).font("Helvetica-Bold").fillColor(BLUE).text(`${title} subject-wise ${grades ? "grades" : "marks"}`);
      doc.moveDown(0.15);

      const startX = marginLeft;
      let y = doc.y;
      const rowHeight = 18;

      const drawRow = (values: string[], header = false) => {
        if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          y = doc.y;
        }
        let x = startX;
        doc.rect(startX, y, widths.reduce((sum, w) => sum + w, 0), rowHeight).fillAndStroke(header ? HEADER_FILL : "#FFFFFF", CELL_BORDER);
        values.forEach((v, i) => {
          doc.fillColor(header ? BLUE : NAVY).font(header ? "Helvetica-Bold" : "Helvetica").fontSize(9).text(v, x + 6, y + 5, { width: widths[i] - 10 });
          x += widths[i];
        });
        y += rowHeight;
      };

      drawRow(headers, true);
      subjectData.forEach((r) => drawRow(grades ? [val(r.subject), val(r.grade)] : [val(r.subject), val(r.maximum), val(r.obtained)]));

      doc.x = startX;
      doc.y = y + 8;
    };

    const documentList = () => {
      if (!a.documents.length) {
        doc.fontSize(9.5).font("Helvetica").fillColor(MUTED).text("No documents uploaded");
        return;
      }
      const rowHeight = 22;
      a.documents.forEach((d, i) => {
        if (doc.y + rowHeight > doc.page.height - doc.page.margins.bottom) doc.addPage();
        const y = doc.y;
        doc.rect(marginLeft, y, pageWidth, rowHeight).fillAndStroke(i % 2 === 0 ? CELL_FILL : "#FFFFFF", CELL_BORDER);
        doc.fontSize(9.5).font("Helvetica-Bold").fillColor(NAVY).text(`${i + 1}. ${d.label}`, marginLeft + 8, y + 6, { width: pageWidth * 0.55, continued: false });
        doc.fontSize(9).font("Helvetica-Bold").fillColor(ACCENT).text(d.status, marginLeft + pageWidth * 0.6, y + 6.5, { width: pageWidth * 0.15 });
        doc.fontSize(8.5).font("Helvetica").fillColor(MUTED).text(d.fileName, marginLeft + pageWidth * 0.76, y + 6.5, { width: pageWidth * 0.22 });
        doc.y = y + rowHeight;
      });
      doc.moveDown(0.3);
    };

    // Header
    doc.rect(0, 0, doc.page.width, 92).fill(HEADER_FILL);

    const logoSize = 62;
    const logoTop = 14;
    const drawLogo = (buffer: Buffer | null, centerX: number) => {
      if (!buffer) return;
      const r = logoSize / 2;
      doc.save();
      doc.circle(centerX, logoTop + r, r + 2.5).lineWidth(2.5).strokeColor("#22c55e").stroke();
      doc.circle(centerX, logoTop + r, r).fill("#FFFFFF");
      doc.circle(centerX, logoTop + r, r - 2).clip();
      doc.image(buffer, centerX - r, logoTop, { fit: [logoSize, logoSize], align: "center", valign: "center" });
      doc.restore();
    };
    drawLogo(foundationLogo, marginLeft + logoSize / 2 + 6);
    drawLogo(instituteLogo, doc.page.width - doc.page.margins.right - logoSize / 2 - 6);

    doc.fontSize(10).font("Helvetica-Bold").fillColor(ACCENT).text("DR. VITHALRAO VIKHE PATIL FOUNDATION'S", 0, 24, { align: "center" });
    doc.fontSize(21).font("Helvetica-Bold").fillColor(BLUE).text("PARAMEDICAL INSTITUTE", { align: "center" });
    doc.fontSize(8.5).font("Helvetica").fillColor(MUTED).text("Opp. Govt. Milk Dairy, MIDC, Ahilyanagar - 414111", { align: "center" });
    doc.y = 100;
    doc.rect(marginLeft, doc.y, pageWidth, 26).fill(BLUE);
    doc.fontSize(13).font("Helvetica-Bold").fillColor("#FFFFFF").text("APPLICATION FOR ADMISSION", marginLeft, doc.y + 7, { align: "center", width: pageWidth });
    doc.y += 26 + 14;

    grid([
      ["Application number", a.applicationNo],
      ["Application status", val(a.status).replaceAll("_", " ")],
      ["Course applied for", a.course.title],
      ["Batch", a.batch?.label],
      ["Submitted on", fmtDate(a.submittedAt)],
      ["Generated on", new Date().toLocaleString("en-IN")],
    ]);

    heading("1. Applicant & Identity Details");
    grid([
      ["Full name (surname first)", a.name],
      ["Student mobile", a.phone],
      ["Email address", a.email],
      ["Date of birth", fmtDate(a.dateOfBirth)],
      ["Gender", a.gender],
      ["Place of birth", a.placeOfBirth],
      ["Nationality", a.nationality],
      ["Domicile", val(a.domicile).replaceAll("_", " ")],
      ["Blood group", a.bloodGroup],
      ["Aadhaar number", a.aadhaarNumber],
      ["Caste / category", a.category],
      ["Contact consent", yesNo(a.contactConsent)],
    ]);

    heading("2. Parent Details");
    grid([
      ["Father's name", a.fatherName],
      ["Father's age", a.fatherAge],
      ["Father's occupation", a.fatherOccupation],
      ["Father's mobile", a.fatherPhone],
      ["Father's email", a.fatherEmail],
      ["Mother's name", a.motherName],
      ["Mother's age", a.motherAge],
      ["Mother's mobile", a.motherPhone],
      ["Mother's email", a.motherEmail],
      ["Emergency / guardian contact", a.emergencyPhone ?? a.guardianPhone],
    ]);

    heading("3. Address Details");
    grid([
      ["Present address", address(a.addressLine, a.city, a.district, a.state, a.pinCode)],
      ["Present residence phone", a.residencePhone],
      ["Permanent address", address(a.permanentAddressLine, a.permanentCity, a.permanentDistrict, a.permanentState, a.permanentPinCode)],
      ["Permanent residence phone", a.permanentResidencePhone],
      ["Permanent same as present", yesNo(a.permanentSameAsPresent)],
      ["District", a.district],
    ]);

    heading("4. Educational Details");
    grid([
      ["SSC school", a.schoolName],
      ["SSC board", a.board],
      ["SSC year of passing", a.passingYear],
      ["SSC seat / roll number", a.seatNumber],
      ["SSC result format", a.sscResultType],
      ["SSC marks", a.sscResultType === "GRADES" ? "Grade based" : `${val(a.sscMarksObtained)} / ${val(a.sscMaximumMarks)}`],
      ["SSC percentage", a.percentage == null ? "—" : `${a.percentage}%`],
      ["Science studied in SSC", yesNo(a.scienceConfirmed)],
    ]);
    subjectsTable("SSC", a.sscResultType, subjectRows(a.sscSubjects));

    doc.moveDown(0.3);
    if (a.hscApplicable) {
      grid([
        ["HSC school / college", a.hscSchoolName],
        ["HSC board", a.hscBoard],
        ["HSC year of passing", a.hscPassingYear],
        ["HSC result format", a.hscResultType],
        ["HSC marks", a.hscResultType === "GRADES" ? "Grade based" : `${val(a.hscMarksObtained)} / ${val(a.hscMaximumMarks)}`],
        ["HSC percentage", a.hscPercentage == null ? "—" : `${a.hscPercentage}%`],
      ]);
      subjectsTable("HSC", a.hscResultType, subjectRows(a.hscSubjects));
    } else {
      doc.fontSize(10).font("Helvetica-Bold").fillColor(MUTED).text("HSC (12th): Not applicable");
    }

    heading("5. Payment Details");
    grid([
      ["Application fee", `Rs. ${val(a.paymentAmount ?? 100)}`],
      ["Payment status", val(a.paymentStatus).replaceAll("_", " ")],
      ["Payment proof", a.paymentProofUrl ? "Included in this ZIP" : "Not uploaded"],
      ["Declaration accepted", yesNo(a.declarationAccepted)],
    ]);

    heading("6. Declaration");
    doc.fontSize(9.5).font("Helvetica").fillColor(NAVY).text(
      "I declare that the information and documents supplied in this application are genuine. I have reviewed the course details, fee structure, institute rules and disciplinary requirements. I understand that incorrect, misleading or forged information may result in rejection or discontinuation from the institute.",
      { width: pageWidth },
    );
    doc.moveDown(0.4);
    grid([
      ["Applicant", a.name],
      ["Declaration date", fmtDate(a.submittedAt ?? a.updatedAt)],
      ["Electronic acceptance", a.declarationAccepted ? "Accepted during online submission" : "Not accepted"],
      ["Application number", a.applicationNo],
    ]);

    heading("7. Uploaded Document Checklist");
    documentList();

    doc.moveDown(0.5);
    doc.fontSize(8).font("Helvetica-Oblique").fillColor(MUTED).text(
      "Generated from the applicant's submitted online record. Uploaded files are supplied separately in the accompanying ZIP archive.",
      { align: "center", width: pageWidth },
    );

    doc.end();
  });
}
