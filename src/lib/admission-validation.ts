type Data = Record<string, unknown>;
type SubjectRow = { subject?: unknown; maximum?: unknown; obtained?: unknown; grade?: unknown };
type Translate = (key: string, values?: Record<string, string | number>) => string;

const present = (v: unknown) => typeof v === "string" && v.trim().length > 0;
const phone = (v: unknown) => typeof v === "string" && /^\d{10}$/.test(v.trim());
const email = (v: unknown) => !present(v) || (typeof v === "string" && /^\S+@\S+\.\S+$/.test(v.trim()));
const numeric = (v: unknown) => v !== "" && Number.isFinite(Number(v));
const percent = (v: unknown) => numeric(v) && Number(v) > 0 && Number(v) <= 100;
const year = (v: unknown) => Number.isInteger(Number(v)) && Number(v) >= 1980 && Number(v) <= new Date().getFullYear();
const validDate = (v: unknown) => present(v) && !Number.isNaN(new Date(`${v}T00:00:00`).getTime());

function validateSubjects(value: unknown, resultType: unknown, level: string, t: Translate) {
  if (!Array.isArray(value)) return "";
  if (value.length > 6) return t("validSubjectsMax6", { level });
  for (let index = 0; index < value.length; index += 1) {
    const row = (value[index] ?? {}) as SubjectRow;
    const hasAny = [row.subject, row.maximum, row.obtained, row.grade].some(item => present(item) || numeric(item));
    if (!hasAny) continue;
    if (!present(row.subject)) return t("validSubjectName", { level, n: index + 1 });
    if (resultType === "GRADES") {
      if (!present(row.grade)) return t("validSubjectGrade", { subject: String(row.subject) });
    } else {
      if (!numeric(row.maximum) || Number(row.maximum) <= 0) return t("validSubjectMaxMarks", { subject: String(row.subject) });
      if (!numeric(row.obtained) || Number(row.obtained) < 0) return t("validSubjectObtained", { subject: String(row.subject) });
      if (Number(row.obtained) > Number(row.maximum)) return t("validSubjectExceed", { subject: String(row.subject) });
    }
  }
  return "";
}

export function validateAdmissionStep(data: Data, step: number, t: Translate): string {
  if (step === 1) {
    if (!present(data.courseId) || !present(data.name)) return t("validSelectCourseAndName");
    if (!present(data.batchId)) return t("validSelectBatch");
    if (!phone(data.phone)) return t("validStudentPhone");
    if (!email(data.email)) return t("validStudentEmail");
  } else if (step === 2) {
    if (!validDate(data.dateOfBirth)) return t("validDob");
    const birth = new Date(`${data.dateOfBirth}T00:00:00`);
    if (birth >= new Date() || birth.getFullYear() < 1900) return t("validDobPast");
    if (!present(data.gender) || !present(data.placeOfBirth) || !present(data.nationality) || !present(data.domicile) || !present(data.bloodGroup)) return t("validIdentityDetails");
    if (!/^\d{12}$/.test(String(data.aadhaarNumber ?? ""))) return t("validAadhaar");
  } else if (step === 3) {
    if (!present(data.fatherName) || !present(data.motherName)) return t("validParentNames");
    if (!phone(data.fatherPhone) || !phone(data.motherPhone)) return t("validParentMobiles");
    if (!email(data.fatherEmail) || !email(data.motherEmail)) return t("validParentEmails");
    for (const [label, value] of [[t("validParentAgeFather"), data.fatherAge], [t("validParentAgeMother"), data.motherAge]] as const) if (present(value) && (!Number.isInteger(Number(value)) || Number(value) < 18 || Number(value) > 120)) return t("validParentAge", { label });
    if (!present(data.addressLine) || !present(data.city) || !present(data.district) || !present(data.state)) return t("validPresentAddress");
    if (!/^\d{6}$/.test(String(data.pinCode ?? ""))) return t("validPresentPin");
    if (data.permanentSameAsPresent !== true && (!present(data.permanentAddressLine) || !present(data.permanentCity) || !present(data.permanentDistrict) || !present(data.permanentState) || !/^\d{6}$/.test(String(data.permanentPinCode ?? "")))) return t("validPermanentAddress");
  } else if (step === 4) {
    if (!present(data.board) || !present(data.schoolName) || !year(data.passingYear)) return t("validSscBoardSchoolYear");
    if (!percent(data.percentage)) return t("validSscPercentage");
    if (data.sscResultType !== "GRADES") {
      if (!numeric(data.sscMaximumMarks) || Number(data.sscMaximumMarks) <= 0) return t("validSscMaxMarks");
      if (!numeric(data.sscMarksObtained) || Number(data.sscMarksObtained) < 0) return t("validSscMarksObtained");
      if (Number(data.sscMarksObtained) > Number(data.sscMaximumMarks)) return t("validSscMarksExceed");
      const calculated = Number(((Number(data.sscMarksObtained) / Number(data.sscMaximumMarks)) * 100).toFixed(2));
      if (Math.abs(Number(data.percentage) - calculated) > 0.01) return t("validSscPercentageCalc", { calculated });
    }
    const sscError = validateSubjects(data.sscSubjects, data.sscResultType, "SSC", t); if (sscError) return sscError;
    if (data.scienceConfirmed !== true) return t("validScienceConfirm");
    if (data.hscApplicable === true) {
      if (!present(data.hscBoard) || !present(data.hscSchoolName) || !year(data.hscPassingYear)) return t("validHscBoardSchoolYear");
      if (!percent(data.hscPercentage)) return t("validHscPercentage");
      if (data.hscResultType !== "GRADES") {
        if (!numeric(data.hscMaximumMarks) || Number(data.hscMaximumMarks) <= 0) return t("validHscMaxMarks");
        if (!numeric(data.hscMarksObtained) || Number(data.hscMarksObtained) < 0) return t("validHscMarksObtained");
        if (Number(data.hscMarksObtained) > Number(data.hscMaximumMarks)) return t("validHscMarksExceed");
        const calculated = Number(((Number(data.hscMarksObtained) / Number(data.hscMaximumMarks)) * 100).toFixed(2));
        if (Math.abs(Number(data.hscPercentage) - calculated) > 0.01) return t("validHscPercentageCalc", { calculated });
      }
      const hscError = validateSubjects(data.hscSubjects, data.hscResultType, "HSC", t); if (hscError) return hscError;
    }
  } else if (step === 6) {
    if (data.declarationAccepted !== true) return t("validDeclarationRequired");
    if (!present(data.paymentProofUrl)) return t("validPaymentProofRequired");
  }
  return "";
}
