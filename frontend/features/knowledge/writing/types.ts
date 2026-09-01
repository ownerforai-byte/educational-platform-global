/**
 * Writing Hub — shared types for all NEB Class 11/12 exam writing formats.
 * Each WritingType carries the full exam-prep recipe:
 *   concept   — what it is, in plain words (understandable, not memorized)
 *   format    — the structure/blocks with an explanation per block
 *   startings — ready "opening lines" an examiner expects to see
 *   connectors— glue phrases that show structure-sense
 *   grammar   — conceptual grammar powering that format
 *   tips      — exam-smart do/don't
 */
export type WritingBlock = {
  label: string;
  detail: string;
  example?: string;
};

export type WritingType = {
  id: string;
  name: string;
  category: WritingCategory;
  icon: string;
  marks?: string;
  concept: string;
  format: WritingBlock[];
  startings: string[];
  connectors: string[];
  example?: string;
  grammar: string[];
  tips: string[];
};

export type WritingCategory =
  | "Paragraphs & Essays"
  | "Letters & Emails"
  | "Reports & Articles"
  | "Creative Writing"
  | "Textual Skills"
  | "Grammar for Writing";