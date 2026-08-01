type Data = Record<string, unknown>;
type SubjectRow = { subject?: unknown; maximum?: unknown; obtained?: unknown; grade?: unknown };
const present = (v: unknown) => typeof v === "string" && v.trim().length > 0;
const phone = (v: unknown) => typeof v === "string" && /^\d{10}$/.test(v.trim());
const email = (v: unknown) => !present(v) || (typeof v === "string" && /^\S+@\S+\.\S+$/.test(v.trim()));
const numeric = (v: unknown) => v !== "" && Number.isFinite(Number(v));
const percent = (v: unknown) => numeric(v) && Number(v) > 0 && Number(v) <= 100;
const year = (v: unknown) => Number.isInteger(Number(v)) && Number(v) >= 1980 && Number(v) <= new Date().getFullYear();
const validDate = (v: unknown) => present(v) && !Number.isNaN(new Date(`${v}T00:00:00`).getTime());

function validateSubjects(value: unknown, resultType: unknown, level: string) {
  if (!Array.isArray(value)) return "";
  if (value.length > 6) return `${level} can contain a maximum of 6 subjects.`;
  for (let index = 0; index < value.length; index += 1) {
    const row = (value[index] ?? {}) as SubjectRow;
    const hasAny = [row.subject, row.maximum, row.obtained, row.grade].some(item => present(item) || numeric(item));
    if (!hasAny) continue;
    if (!present(row.subject)) return `Enter the subject name in ${level} row ${index + 1}.`;
    if (resultType === "GRADES") {
      if (!present(row.grade)) return `Enter the grade for ${row.subject}.`;
    } else {
      if (!numeric(row.maximum) || Number(row.maximum) <= 0) return `Enter valid maximum marks for ${row.subject}.`;
      if (!numeric(row.obtained) || Number(row.obtained) < 0) return `Enter valid marks obtained for ${row.subject}.`;
      if (Number(row.obtained) > Number(row.maximum)) return `Marks obtained for ${row.subject} cannot be greater than maximum marks.`;
    }
  }
  return "";
}

export function validateAdmissionStep(data: Data, step: number): string {
  if (step === 1) {
    if (!present(data.courseId) || !present(data.name)) return "Select a course and enter the student's full name.";
    if (!phone(data.phone)) return "Enter a valid student phone number.";
    if (!email(data.email)) return "Enter a valid student email address.";
  } else if (step === 2) {
    if (!validDate(data.dateOfBirth)) return "Enter a valid date of birth.";
    const birth = new Date(`${data.dateOfBirth}T00:00:00`);
    if (birth >= new Date() || birth.getFullYear() < 1900) return "Date of birth must be a valid past date.";
    if (!present(data.gender) || !present(data.placeOfBirth) || !present(data.nationality) || !present(data.domicile) || !present(data.bloodGroup)) return "Complete all required identity details.";
    if (!/^\d{12}$/.test(String(data.aadhaarNumber ?? ""))) return "Enter a valid 12-digit Aadhaar number.";
  } else if (step === 3) {
    if (!present(data.fatherName) || !present(data.motherName)) return "Enter both parents' names.";
    if (!phone(data.fatherPhone) || !phone(data.motherPhone)) return "Enter valid mobile numbers for both parents.";
    if (!email(data.fatherEmail) || !email(data.motherEmail)) return "Enter valid parent email addresses.";
    for (const [label, value] of [["Father's", data.fatherAge], ["Mother's", data.motherAge]] as const) if (present(value) && (!Number.isInteger(Number(value)) || Number(value) < 18 || Number(value) > 120)) return `${label} age must be between 18 and 120 years.`;
    if (!present(data.addressLine) || !present(data.city) || !present(data.district) || !present(data.state)) return "Complete the present address, including city, district, and state.";
    if (!/^\d{6}$/.test(String(data.pinCode ?? ""))) return "Enter a valid six-digit present-address PIN code.";
    if (data.permanentSameAsPresent !== true && (!present(data.permanentAddressLine) || !present(data.permanentCity) || !present(data.permanentDistrict) || !present(data.permanentState) || !/^\d{6}$/.test(String(data.permanentPinCode ?? "")))) return "Complete the permanent address with a valid six-digit PIN code.";
  } else if (step === 4) {
    if (!present(data.board) || !present(data.schoolName) || !year(data.passingYear)) return "Enter a valid SSC board, school, and passing year.";
    if (!percent(data.percentage)) return "SSC percentage must be greater than 0 and no more than 100.";
    if (data.sscResultType !== "GRADES") {
      if (!numeric(data.sscMaximumMarks) || Number(data.sscMaximumMarks) <= 0) return "SSC maximum marks must be greater than 0.";
      if (!numeric(data.sscMarksObtained) || Number(data.sscMarksObtained) < 0) return "Enter valid SSC marks obtained.";
      if (Number(data.sscMarksObtained) > Number(data.sscMaximumMarks)) return "SSC marks obtained cannot be greater than maximum marks.";
    }
    const sscError = validateSubjects(data.sscSubjects, data.sscResultType, "SSC"); if (sscError) return sscError;
    if (data.scienceConfirmed !== true) return "Confirm that Science was one of the SSC subjects.";
    if (data.hscApplicable === true) {
      if (!present(data.hscBoard) || !present(data.hscSchoolName) || !year(data.hscPassingYear)) return "Enter a valid HSC board, school or college, and passing year.";
      if (!percent(data.hscPercentage)) return "HSC percentage must be greater than 0 and no more than 100.";
      if (data.hscResultType !== "GRADES") {
        if (!numeric(data.hscMaximumMarks) || Number(data.hscMaximumMarks) <= 0) return "HSC maximum marks must be greater than 0.";
        if (!numeric(data.hscMarksObtained) || Number(data.hscMarksObtained) < 0) return "Enter valid HSC marks obtained.";
        if (Number(data.hscMarksObtained) > Number(data.hscMaximumMarks)) return "HSC marks obtained cannot be greater than maximum marks.";
      }
      const hscError = validateSubjects(data.hscSubjects, data.hscResultType, "HSC"); if (hscError) return hscError;
    }
  } else if (step === 6) {
    if (data.declarationAccepted !== true) return "Accept the declaration before submitting.";
    if (!present(data.paymentTxnRef) || String(data.paymentTxnRef).trim().length < 4) return "Enter a valid payment transaction reference.";
    if (!validDate(data.paymentDate)) return "Enter a valid payment date.";
    if (new Date(`${data.paymentDate}T23:59:59`) > new Date()) return "Payment date cannot be in the future.";
    if (!present(data.paymentProofUrl)) return "Upload the application-fee payment proof.";
  }
  return "";
}
