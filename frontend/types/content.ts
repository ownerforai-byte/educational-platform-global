/**
 * Shared content / curriculum display types for the frontend hub.
 *
 * Feature-specific models (practice MCQ shapes, knowledge kind pages,
 * mindmap trees, syllabus page VMs) stay under features/<name>/types.ts.
 * Cross-cutting subject/class refs and note lifecycle words live here.
 */

export type {
  SubjectSlug,
  AcademicClass,
  SubjectMeta,
} from "@rn/shared";
export {
  OFFICIAL_SUBJECT_SLUGS,
  OFFICIAL_CLASSES,
  SUBJECT_METADATA,
} from "@rn/shared";
export type { CurriculumTopicRef, CurriculumUnitRef } from "@rn/shared";

/** Syllabus note-route class folder slugs used across topic/registry paths. */
export type ClassNotesSlug = "class-11-notes" | "class-12-notes";

export type { NoteStatus, NoteBody } from "@/lib/content/note-status";
export { NOTE_STATUS, NOTE_STATUS_HINTS, getNoteStatus } from "@/lib/content/note-status";
