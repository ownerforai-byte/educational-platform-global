/**
 * XP — the single earning rule behind the leaderboard.
 *
 * A "set" is one completed quiz (one row of `quiz_history`). XP is earned from
 * how well the student did in that set, never from how many sets they opened
 * and never from time spent. The rule is deliberately small enough to state in
 * one card on the leaderboard:
 *
 *   • Every correct choice question ........ 10 XP
 *   • Every wrong choice question answered ... 2 XP   (effort, not accuracy)
 *   • Writing questions ..................... up to 40 XP per question,
 *                                             scaled by the set's score %
 *                                             (halved below 50 %)
 *   • Set accuracy bonus .................... +25 at ≥80 %, +15 at ≥60 %,
 *                                             +5 at ≥40 %
 *
 * ⚠️ `backend/src/utils/xp.ts` is the mirror of this file — the server ranks
 * students with it. Both are pinned by tests to the same worked examples, so a
 * change on one side without the other fails a test instead of silently
 * producing two different leaderboards.
 */

export type XpFormat =
  | "mcq"
  | "true-false"
  | "fill-blank"
  | "short-answer"
  | "long-answer"
  | null
  | undefined;

export const XP_RULE = {
  correctChoice: 10,
  wrongChoice: 2,
  writingPerQuestion: 40,
  writingWeakMultiplier: 0.5,
  writingWeakBelowPct: 50,
  bonus: { at80: 25, at60: 15, at40: 5 },
} as const;

/** Choice formats are auto-scored right/wrong; the rest are marked writing. */
export function isWritingFormat(format: XpFormat): boolean {
  return format === "short-answer" || format === "long-answer";
}

export interface XpInput {
  answered: number;
  correct: number;
  scorePct: number | null;
  format?: XpFormat;
}

/** Accuracy of a set in whole percent, from the stored score or the raw counts. */
export function setAccuracy(input: Pick<XpInput, "answered" | "correct" | "scorePct">): number {
  const answered = Math.max(0, Math.floor(input.answered || 0));
  if (answered === 0) return 0;
  if (typeof input.scorePct === "number" && Number.isFinite(input.scorePct)) {
    return clampPct(input.scorePct);
  }
  const correct = Math.max(0, Math.min(answered, Math.floor(input.correct || 0)));
  return Math.round((correct / answered) * 100);
}

function clampPct(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function accuracyBonus(pct: number): number {
  if (pct >= 80) return XP_RULE.bonus.at80;
  if (pct >= 60) return XP_RULE.bonus.at60;
  if (pct >= 40) return XP_RULE.bonus.at40;
  return 0;
}

/** XP earned by one completed set. */
export function xpForSet(input: XpInput): number {
  const answered = Math.max(0, Math.floor(input.answered || 0));
  if (answered === 0) return 0;
  const pct = setAccuracy(input);
  const correct = Math.max(0, Math.min(answered, Math.floor(input.correct || 0)));

  let base: number;
  if (isWritingFormat(input.format)) {
    const multiplier = pct < XP_RULE.writingWeakBelowPct ? XP_RULE.writingWeakMultiplier : 1;
    base = Math.round(answered * XP_RULE.writingPerQuestion * (pct / 100) * multiplier);
  } else {
    base = correct * XP_RULE.correctChoice + (answered - correct) * XP_RULE.wrongChoice;
  }

  return base + accuracyBonus(pct);
}

/** Total XP across every set a student has completed. */
export function xpForSets(rows: readonly XpInput[]): number {
  return rows.reduce((sum, row) => sum + xpForSet(row), 0);
}

export interface XpLevel {
  level: number;
  title: string;
  /** XP at which this level starts. */
  floor: number;
  /** XP needed to reach the next level (0 at the top level). */
  nextAt: number;
}

const LEVELS: Array<{ title: string; floor: number }> = [
  { title: "Starter", floor: 0 },
  { title: "Learner", floor: 250 },
  { title: "Practiser", floor: 700 },
  { title: "Sharp", floor: 1500 },
  { title: "Scholar", floor: 3000 },
  { title: "Top Scholar", floor: 6000 },
];

/** Level title + progress band for a total XP count. */
export function xpLevel(totalXp: number): XpLevel {
  const xp = Math.max(0, Math.floor(totalXp || 0));
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].floor) index = i;
  }
  const current = LEVELS[index];
  const next = LEVELS[index + 1];
  return {
    level: index + 1,
    title: current.title,
    floor: current.floor,
    nextAt: next ? next.floor : 0,
  };
}
