/**
 * Practice — one shared question model for the whole section.
 *
 * The section has exactly two question types (owner decision 2026-11-07):
 *
 *   1. `mcq`     — a stem with exactly FOUR options. After the student picks
 *                  one, every option must explain itself: why the right one is
 *                  right and why each wrong one is wrong, in plain language.
 *   2. `writing` — a free-response prompt. After submission the student sees
 *                  the model answer, the marking points, and a contrast table
 *                  naming every easily-confused concept pair involved.
 *
 * Nothing else belongs here. True/False, flip-card and "flip until you feel
 * confident" modes were removed from Practice on purpose: they produced no
 * explanation surface, which is the entire point of practice.
 */

export type PracticeMode = "mcq" | "writing";

import type { SubjectSlug } from "@/types/content";
export type { SubjectSlug } from "@/types/content";

export type Difficulty = "easy" | "intermediate" | "hard";

export type OptionId = "A" | "B" | "C" | "D";

export const OPTION_IDS: readonly OptionId[] = ["A", "B", "C", "D"];

export interface McqOption {
  id: OptionId;
  text: string;
}

export interface McqQuestion {
  id: string;
  classLevel: "class-11" | "class-12";
  subject: SubjectSlug;
  unit: string;
  topic: string;
  difficulty: Difficulty;
  stem: string;
  /** Always four, in A–D order. Enforced by the bank tests. */
  options: [McqOption, McqOption, McqOption, McqOption];
  correctId: OptionId;
  /**
   * One explanation for EVERY option (not just the right one). Plain words,
   * no markdown, no "see above". Keys must cover all four options.
   */
  explanations: Record<OptionId, string>;
  /** The single line a student should walk away with. */
  conceptAnchor: string;
  /** Keys into `CONTRASTS` — the confusable ideas this question touches. */
  contrasts?: string[];
}

export interface WritingQuestion {
  id: string;
  classLevel: "class-11" | "class-12";
  subject: SubjectSlug;
  unit: string;
  topic: string;
  marks: number;
  prompt: string;
  /** The full-credit answer, written the way a strong student would. */
  modelAnswer: string;
  /** What the marker looks for, one point per line. */
  markingPoints: string[];
  /** Keys into `CONTRASTS` — shown as the post-submit contrast table. */
  contrasts: string[];
  /** Optional one-line nudge shown before submission. */
  tip?: string;
}

/**
 * A pair of concepts students routinely fuse into one. The UI renders these
 * as a comparison table after a writing submission: what A is, what B is, and
 * the one sentence that separates them.
 */
export interface ContrastPair {
  id: string;
  a: string;
  b: string;
  aIs: string;
  bIs: string;
  /** The difference, stated so it cannot be missed. */
  difference: string;
  subject: SubjectSlug;
}

/** One graded answer inside a session. */
export interface AnswerRecord {
  questionId: string;
  /** MCQ: the chosen option. Writing: the submitted text. */
  value: string;
  /** MCQ only. Writing is self-marked against the model answer. */
  correct?: boolean;
}

export interface SessionSummary {
  total: number;
  correct: number;
  answered: number;
  accuracy: number;
  xp: number;
}
