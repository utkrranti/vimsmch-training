// Real photos from Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital,
// mapped by course slug. Falls back to a general hospital photo when a slug isn't listed.
const COURSE_IMAGES: Record<string, string> = {
  "operation-theatre-assistant": "/images/course-ot-assistant.webp",
  "ecg-technology": "/images/course-ecg.webp",
  "dialysis-technician": "/images/course-dialysis.webp",
  "medical-laboratory-technology": "/images/course-medical-lab.webp",
  "radiology-and-imaging-technology": "/images/course-radiology.webp",
};

export function getCourseImage(slug: string): string {
  return COURSE_IMAGES[slug] ?? "/images/hospital-hero.webp";
}
