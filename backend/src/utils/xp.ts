/**
 * XP — the server's copy of the leaderboard earning rule.
 *
 * ⚠️ `frontend/lib/practice/xp.ts` is the mirror. The numbers must stay
 * identical: the UI promises a rule, and this file is what actually ranks
 * students. Both files are pinned by tests to the same worked examples
 * (5/5 → 75, 3/5 → 49, 4/10 → 57, 3 writing at 100 % → 145, 2 writing at
 * 40 % → 21). Change one without the other and a test fails.
 *
 * Rule:
 *   • correct choice question .......... 10 XP
 *   • wrong choice question answered ... 2 XP
 *   • writing questions ................ up to 40 XP per question × score %
 *                                        (halved below 50 %)
 *   • accuracy bonus ................... +25 at ≥80 %, +15 at ≥60 %, +5 at ≥40 %
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

export function isWritingFormat(format: XpFormat): boolean {
  return format === "short-answer" || format === "long-answer";
}

export interface XpInput {
  answered: number;
  correct: number;
  scorePct: number | null;
  format?: XpFormat;
}

function clampPct(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function setAccuracy(input: Pick<XpInput, "answered" | "correct" | "scorePct">): number {
  const answered = Math.max(0, Math.floor(input.answered || 0));
  if (answered === 0) return 0;
  if (typeof input.scorePct === "number" && Number.isFinite(input.scorePct)) {
    return clampPct(input.scorePct);
  }
  const correct = Math.max(0, Math.min(answered, Math.floor(input.correct || 0)));
  return Math.round((correct / answered) * 100);
}

function accuracyBonus(pct: number): number {
  if (pct >= 80) return XP_RULE.bonus.at80;
  if (pct >= 60) return XP_RULE.bonus.at60;
  if (pct >= 40) return XP_RULE.bonus.at40;
  return 0;
}

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

export function xpForSets(rows: readonly XpInput[]): number {
  return rows.reduce((sum, row) => sum + xpForSet(row), 0);
}
