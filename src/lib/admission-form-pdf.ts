import PDFDocument from "pdfkit";

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
const MUTED = "#5A6B75";
const LINE = "#D8E5EA";
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

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    const heading = (text: string) => {
      doc.moveDown(0.7);
      doc.fontSize(13).font("Helvetica-Bold").fillColor(BLUE).text(text, { width: pageWidth });
      doc.moveTo(doc.page.margins.left, doc.y + 2).lineTo(doc.page.width - doc.page.margins.right, doc.y + 2).strokeColor(LINE).lineWidth(1).stroke();
      doc.moveDown(0.4);
    };

    const row = (label: string, value: unknown) => {
      doc.fontSize(9).font("Helvetica-Bold").fillColor(MUTED).text(`${label.toUpperCase()}:  `, { continued: true, width: pageWidth });
      doc.font("Helvetica").fillColor(NAVY).text(val(value));
    };

    const rows = (items: Array<[string, unknown]>) => items.forEach(([label, value]) => row(label, value));

    const subjectsTable = (title: string, type: unknown, subjectData: Subject[]) => {
      if (!subjectData.length) {
        doc.fontSize(9).font("Helvetica-Oblique").fillColor(MUTED).text(`${title} subject-wise details: Not provided`);
        return;
      }
      const grades = type === "GRADES";
      const headers = grades ? ["Subject", "Grade"] : ["Subject", "Max marks", "Obtained"];
      const widths = grades ? [pageWidth * 0.7, pageWidth * 0.3] : [pageWidth * 0.5, pageWidth * 0.25, pageWidth * 0.25];

      doc.moveDown(0.3);
      doc.fontSize(9).font("Helvetica-Bold").fillColor(BLUE).text(`${title} subject-wise ${grades ? "grades" : "marks"}`);
      doc.moveDown(0.15);

      const startX = doc.page.margins.left;
      let y = doc.y;
      const rowHeight = 17;

      const drawRow = (values: string[], header = false) => {
        if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          y = doc.y;
        }
        let x = startX;
        if (header) doc.rect(startX, y, widths.reduce((sum, w) => sum + w, 0), rowHeight).fill(HEADER_FILL);
        values.forEach((v, i) => {
          doc.fillColor(header ? BLUE : NAVY).font(header ? "Helvetica-Bold" : "Helvetica").fontSize(9).text(v, x + 4, y + 4, { width: widths[i] - 8 });
          x += widths[i];
        });
        y += rowHeight;
      };

      drawRow(headers, true);
      subjectData.forEach((r) => drawRow(grades ? [val(r.subject), val(r.grade)] : [val(r.subject), val(r.maximum), val(r.obtained)]));

      doc.x = startX;
      doc.y = y + 8;
    };

    doc.fontSize(10).font("Helvetica-Bold").fillColor(MUTED).text("DR. VITHALRAO VIKHE PATIL FOUNDATION'S", { align: "center" });
    doc.fontSize(20).font("Helvetica-Bold").fillColor(BLUE).text("PARAMEDICAL INSTITUTE", { align: "center" });
    doc.fontSize(9).font("Helvetica").fillColor(MUTED).text("Opp. Govt. Milk Dairy, MIDC, Ahilyanagar - 414111", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(15).font("Helvetica-Bold").fillColor(BLUE).text("APPLICATION FOR ADMISSION", { align: "center" });
    doc.moveDown(0.7);

    rows([
      ["Application number", a.applicationNo],
      ["Application status", val(a.status).replaceAll("_", " ")],
      ["Course applied for", a.course.title],
      ["Batch", a.batch?.label],
      ["Submitted on", fmtDate(a.submittedAt)],
      ["Generated on", new Date().toLocaleString("en-IN")],
    ]);

    heading("1. Applicant & Identity Details");
    rows([
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
    rows([
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
    rows([
      ["Present address", address(a.addressLine, a.city, a.district, a.state, a.pinCode)],
      ["Present residence phone", a.residencePhone],
      ["Permanent address", address(a.permanentAddressLine, a.permanentCity, a.permanentDistrict, a.permanentState, a.permanentPinCode)],
      ["Permanent residence phone", a.permanentResidencePhone],
      ["Permanent same as present", yesNo(a.permanentSameAsPresent)],
      ["District", a.district],
    ]);

    heading("4. Educational Details");
    rows([
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
      rows([
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
    rows([
      ["Application fee", `Rs. ${val(a.paymentAmount ?? 100)}`],
      ["Payment status", val(a.paymentStatus).replaceAll("_", " ")],
      ["Payment proof", a.paymentProofUrl ? "Included in this ZIP" : "Not uploaded"],
      ["Declaration accepted", yesNo(a.declarationAccepted)],
    ]);

    heading("6. Declaration");
    doc.fontSize(10).font("Helvetica").fillColor(NAVY).text(
      "I declare that the information and documents supplied in this application are genuine. I have reviewed the course details, fee structure, institute rules and disciplinary requirements. I understand that incorrect, misleading or forged information may result in rejection or discontinuation from the institute.",
      { width: pageWidth },
    );
    doc.moveDown(0.4);
    rows([
      ["Applicant", a.name],
      ["Declaration date", fmtDate(a.submittedAt ?? a.updatedAt)],
      ["Electronic acceptance", a.declarationAccepted ? "Accepted during online submission" : "Not accepted"],
      ["Application number", a.applicationNo],
    ]);

    heading("7. Uploaded Document Checklist");
    if (a.documents.length) {
      a.documents.forEach((d, i) => row(`${i + 1}. ${d.label}`, `${d.status} (${d.fileName})`));
    } else {
      doc.fontSize(10).font("Helvetica").fillColor(MUTED).text("No documents uploaded");
    }

    doc.moveDown(0.7);
    doc.fontSize(8).font("Helvetica-Oblique").fillColor(MUTED).text(
      "Generated from the applicant's submitted online record. Uploaded files are supplied separately in the accompanying ZIP archive.",
      { align: "center", width: pageWidth },
    );

    doc.end();
  });
}
