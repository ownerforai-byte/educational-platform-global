/**
 * Entrance Question Bank — data model + resolver.
 *
 * Real entrance-style MCQs (CEE medical/engineering, IOE, NEB board),
 * authored per SUBJECT → UNIT (matching the syllabus-notes unitSlugs), so
 * every topic page's notes section can render its unit's question set.
 *
 * Each question carries: the exam it appeared in (style/year), 4 options,
 * the correct index, and a one-line solving trick (the "why").
 */

export interface EntranceQuestion {
  q: string;
  options: string[];
  /** Index into options of the correct answer. */
  answer: number;
  /** One-line reason/trick — shown after reveal. */
  why: string;
  /** Exam tag, e.g. "CEE 2080", "IOE 2079", "NEB Board". */
  exam?: string;
}

export type EntranceSubject =
  | "physics"
  | "chemistry"
  | "biology"
  | "mathematics"
  | "english"
  | "nepali";

export interface EntranceUnitBank {
  /** Unit slugs this bank serves (aliases included). */
  units: string[];
  questions: EntranceQuestion[];
}

export type EntranceBank = Record<EntranceSubject, EntranceUnitBank[]>;
