/**
 * Unified syllabus history data interface.
 * All subject data files (biology, physics, chemistry, mathematics, english, nepali)
 * conform to this interface so the UI can render them uniformly.
 */

export type SyllabusTopicChange = {
  slug: string;
  title: string;
  hours?: number;
  addedInYear?: number;
  removedInYear?: number;
  modifiedInYear?: number;
};

export type SyllabusUnit = {
  id: string;
  title: string;
  hours: number;
  topics: SyllabusTopicChange[];
};

export type SyllabusVersion = {
  year: number;
  bsYear: string;
  isLatest: boolean;
  notes?: string;
  units: SyllabusUnit[];
};

export type SyllabusSubjectData = {
  grade: "11" | "12";
  subjectCode: string;
  versions: SyllabusVersion[];
};

export type SubjectKey = "biology" | "physics" | "chemistry" | "mathematics" | "english" | "nepali";
export type ClassKey = "class-11-notes" | "class-12-notes";

export type SubjectDataMap = Record<SubjectKey, Record<ClassKey, SyllabusSubjectData>>;

// Re-export all subject data maps for convenience
export { BIOLOGY_DATA_MAP } from "./biology";
export { PHYSICS_DATA_MAP } from "./physics";
export { CHEMISTRY_DATA_MAP } from "./chemistry";
export { MATH_DATA_MAP } from "./mathematics";
export { ENGLISH_DATA_MAP } from "./english";
export { NEPALI_DATA_MAP } from "./nepali";
