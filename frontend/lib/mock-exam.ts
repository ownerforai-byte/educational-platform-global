/**
 * Mock exam assembler + scorer (pure).
 *
 * Section A (objective, OMR sheet): MCQs from the entrance-questions bank,
 * options shuffled with a seeded RNG so a paper is reproducible; auto-scored
 * against the answer key. Section B (written): NEB PYQs from the pyq-bank
 * reader, marked by the student against the model solution (no auto-grading of
 * free text). 1 mark per objective question, no negative marking.
 */

import type { EntranceQuestion } from "@/lib/entrance-questions/types";
import type { PyqYear } from "@/lib/pyq-bank";

export interface ObjectiveItem {
  id: string;
  q: string;
  options: string[];
  /** Index of the correct option AFTER shuffling. */
  answer: number;
  why: string;
  exam?: string;
}

export interface WrittenItem {
  id: string;
  question: string;
  solution?: string;
  marks: number;
  year: number;
}

export interface MockPaper {
  seed: number;
  objective: ObjectiveItem[];
  written: WrittenItem[];
  durationMinutes: number;
  totalMarks: number;
}

export const OMR_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rnd: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function parseMarks(marks: string | number | undefined, fallback = 5): number {
  const n = typeof marks === "number" ? marks : Number.parseFloat(String(marks ?? ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export interface AssembleOptions {
  mcqPool: EntranceQuestion[];
  pyqs: PyqYear[];
  objectiveCount?: number;
  writtenCount?: number;
  seed?: number;
}

/** Build a paper. Counts are capped by what the pools actually hold. */
export function assembleMock({
  mcqPool,
  pyqs,
  objectiveCount = 20,
  writtenCount = 4,
  seed = 1,
}: AssembleOptions): MockPaper {
  const rnd = mulberry32(seed);
  const objective = shuffle(mcqPool, rnd)
    .slice(0, Math.max(0, objectiveCount))
    .map((item, i): ObjectiveItem => {
      const order = shuffle(item.options.map((_, idx) => idx), rnd);
      return {
        id: `o${i + 1}`,
        q: item.q,
        options: order.map((idx) => item.options[idx]),
        answer: order.indexOf(item.answer),
        why: item.why,
        exam: item.exam,
      };
    });
  const flat = pyqs.flatMap((y) => y.questions.map((q) => ({ q, year: y.year })));
  const written = shuffle(flat, rnd)
    .slice(0, Math.max(0, writtenCount))
    .map(
      ({ q, year }, i): WrittenItem => ({
        id: `w${i + 1}`,
        question: q.question,
        solution: q.solution,
        marks: parseMarks(q.marks),
        year,
      }),
    );
  const writtenMarks = written.reduce((sum, w) => sum + w.marks, 0);
  return {
    seed,
    objective,
    written,
    // 1 minute per MCQ, 2 minutes per written mark.
    durationMinutes: objective.length + writtenMarks * 2,
    totalMarks: objective.length + writtenMarks,
  };
}

/** OMR answers: question id -> chosen option index (absent = left blank). */
export type OmrAnswers = Record<string, number>;

export interface MockScore {
  correct: number;
  wrong: number;
  blank: number;
  objectiveMarks: number;
  writtenMarks: number;
  total: number;
  outOf: number;
  percent: number;
}

/** Auto-score the OMR sheet; `selfMarks` is written-section marks awarded per id (clamped). */
export function scoreMock(paper: MockPaper, answers: OmrAnswers, selfMarks: Record<string, number> = {}): MockScore {
  let correct = 0;
  let wrong = 0;
  let blank = 0;
  for (const item of paper.objective) {
    const picked = answers[item.id];
    if (picked === undefined || picked < 0) blank += 1;
    else if (picked === item.answer) correct += 1;
    else wrong += 1;
  }
  const writtenMarks = paper.written.reduce(
    (sum, w) => sum + Math.min(w.marks, Math.max(0, selfMarks[w.id] ?? 0)),
    0,
  );
  const total = correct + writtenMarks;
  return {
    correct,
    wrong,
    blank,
    objectiveMarks: correct,
    writtenMarks,
    total,
    outOf: paper.totalMarks,
    percent: paper.totalMarks > 0 ? Math.round((total / paper.totalMarks) * 100) : 0,
  };
}

/** Answer key as printable rows, e.g. "1. B". */
export function answerKey(paper: MockPaper): Array<{ id: string; number: number; letter: string }> {
  return paper.objective.map((item, i) => ({ id: item.id, number: i + 1, letter: OMR_LETTERS[item.answer] ?? "?" }));
}
