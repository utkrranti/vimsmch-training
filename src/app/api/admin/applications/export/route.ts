import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDateIST, formatDateTimeIST } from "@/lib/date";

const yesNo = (v: boolean) => (v ? "Yes" : "No");
const dt = (v: Date | null | undefined) => (v ? formatDateTimeIST(v, { dateStyle: "medium", timeStyle: "short" }) : "");
const d = (v: Date | null | undefined) => (v ? formatDateIST(v) : "");

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const applications = await prisma.admissionApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { course: { select: { title: true } }, batch: { select: { label: true } } },
  });

  const rows = applications.map((a) => ({
    "Application No": a.applicationNo,
    "Name": a.name,
    "Phone": a.phone,
    "Email": a.email ?? "",
    "Course": a.course.title,
    "Batch": a.batch?.label ?? "",
    "Status": a.status,
    "Callback Status": a.callbackStatus,
    "Payment Status": a.paymentStatus,
    "Current Step": a.currentStep,
    "Completion %": a.completionPercent,
    "Assigned To": a.assignedTo ?? "",
    "Applied On": dt(a.submittedAt ?? a.createdAt),
    "Next Callback": dt(a.nextCallbackAt),
    "Last Contacted": dt(a.lastContactedAt),
    "Date of Birth": d(a.dateOfBirth),
    "Place of Birth": a.placeOfBirth ?? "",
    "Gender": a.gender ?? "",
    "Nationality": a.nationality ?? "",
    "Domicile": a.domicile ?? "",
    "Blood Group": a.bloodGroup ?? "",
    "Aadhaar Number": a.aadhaarNumber ?? "",
    "Category": a.category ?? "",
    "Religion": a.religion ?? "",
    "Present Address": a.addressLine ?? "",
    "Present City": a.city ?? "",
    "Present District": a.district ?? "",
    "Present State": a.state ?? "",
    "Present Pin Code": a.pinCode ?? "",
    "Residence Phone": a.residencePhone ?? "",
    "Permanent Same As Present": yesNo(a.permanentSameAsPresent),
    "Permanent Address": a.permanentAddressLine ?? "",
    "Permanent City": a.permanentCity ?? "",
    "Permanent District": a.permanentDistrict ?? "",
    "Permanent State": a.permanentState ?? "",
    "Permanent Pin Code": a.permanentPinCode ?? "",
    "Permanent Residence Phone": a.permanentResidencePhone ?? "",
    "Guardian Name": a.guardianName ?? "",
    "Guardian Relation": a.guardianRelation ?? "",
    "Guardian Phone": a.guardianPhone ?? "",
    "Emergency Phone": a.emergencyPhone ?? "",
    "Father Name": a.fatherName ?? "",
    "Father Age": a.fatherAge ?? "",
    "Father Occupation": a.fatherOccupation ?? "",
    "Father Annual Income": a.fatherAnnualIncome ?? "",
    "Father Phone": a.fatherPhone ?? "",
    "Father Email": a.fatherEmail ?? "",
    "Mother Name": a.motherName ?? "",
    "Mother Age": a.motherAge ?? "",
    "Mother Phone": a.motherPhone ?? "",
    "Mother Email": a.motherEmail ?? "",
    "SSC Board": a.board ?? "",
    "SSC School": a.schoolName ?? "",
    "SSC Passing Year": a.passingYear ?? "",
    "SSC Result Type": a.sscResultType ?? "",
    "SSC Marks Obtained": a.sscMarksObtained ?? "",
    "SSC Maximum Marks": a.sscMaximumMarks ?? "",
    "SSC Percentage": a.percentage ?? "",
    "HSC Applicable": yesNo(a.hscApplicable),
    "HSC Board": a.hscBoard ?? "",
    "HSC School": a.hscSchoolName ?? "",
    "HSC Passing Year": a.hscPassingYear ?? "",
    "HSC Result Type": a.hscResultType ?? "",
    "HSC Marks Obtained": a.hscMarksObtained ?? "",
    "HSC Maximum Marks": a.hscMaximumMarks ?? "",
    "HSC Percentage": a.hscPercentage ?? "",
    "Science Confirmed": yesNo(a.scienceConfirmed),
    "Contact Consent": yesNo(a.contactConsent),
    "Declaration Accepted": yesNo(a.declarationAccepted),
    "Payment Amount": a.paymentAmount ?? "",
    "Payment Txn Ref": a.paymentTxnRef ?? "",
    "Payment Date": d(a.paymentDate),
    "Enrollment ID": a.enrollmentId ?? "",
    "Created On": dt(a.createdAt),
    "Updated On": dt(a.updatedAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  const filename = `admission-applications-${new Date().toISOString().slice(0, 10)}.xlsx`;
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
