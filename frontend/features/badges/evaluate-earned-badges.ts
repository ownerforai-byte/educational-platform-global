import type { QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import { MERIT_XP_BAND } from "@/features/merit-badges/merit-badges";
import { xpForSets, type XpInput } from "@/lib/practice/xp";
import { overallAccuracy } from "@/lib/analytics";
import { evaluateAchievements, type AchievementInput } from "@/features/achievements";
import { BADGE_RARITY_TIER, getBadgeDefinition } from "@rn/shared/badges";

export interface EarnedBadgeContext {
  quizRows: QuizHistoryRow[];
  xp: number;
  accuracy: number;
  sets: number;
  rank: number | null;
  streak: number;
  topicsCompleted: number;
  percentSyllabus: number;
}

function rowsToXp(rows: QuizHistoryRow[]): XpInput[] {
  return rows.map((row) => ({
    answered: row.answered,
    correct: row.correct,
    scorePct: row.scorePct,
    format: row.format ?? "mcq",
  }));
}

export function buildEarnedBadgeContext(input: {
  quizRows: QuizHistoryRow[];
  rank?: number | null;
  streak?: number;
  topicsCompleted?: number;
  percentSyllabus?: number;
}): EarnedBadgeContext {
  const rows = input.quizRows ?? [];
  const xp = xpForSets(rowsToXp(rows));
  const accuracy = overallAccuracy(rows).accuracy;
  return {
    quizRows: rows,
    xp,
    accuracy,
    sets: rows.length,
    rank: input.rank ?? null,
    streak: input.streak ?? 0,
    topicsCompleted: input.topicsCompleted ?? 0,
    percentSyllabus: input.percentSyllabus ?? 0,
  };
}

function hasPerfectSet(rows: QuizHistoryRow[]): boolean {
  return rows.some((row) => {
    const pct =
      typeof row.scorePct === "number"
        ? row.scorePct
        : row.answered > 0
          ? Math.round((row.correct / row.answered) * 100)
          : 0;
    return pct >= 100;
  });
}

function xpBandLevel(xp: number): number {
  if (xp < MERIT_XP_BAND) return 0;
  return Math.min(5, Math.floor(xp / MERIT_XP_BAND));
}

const EARNED_RULES: Record<string, (ctx: EarnedBadgeContext) => boolean> = {
  "leaderboard-1": (ctx) => ctx.rank === 1,
  "gold-scholar": (ctx) => ctx.xp >= 3000,
  "book-master": (ctx) => ctx.topicsCompleted >= 30,
  "academic-star": (ctx) => ctx.accuracy >= 75 && ctx.sets >= 5,
  "perfect-score": (ctx) => hasPerfectSet(ctx.quizRows),
  "genius-mind": (ctx) => ctx.accuracy >= 92 && ctx.sets >= 8,
  "master-of-exams": (ctx) => ctx.xp >= 5000,
  "streak-7": (ctx) => ctx.streak >= 7,
  "streak-30": (ctx) => ctx.streak >= 30,
  "goal-crusher": (ctx) => ctx.topicsCompleted >= 20,
  "never-give-up": (ctx) => ctx.sets >= 15,
  "curious-mind": (ctx) => ctx.sets >= 3,
  "puzzle-solver": (ctx) => ctx.accuracy >= 70 && ctx.sets >= 5,
  "first-step": (ctx) => ctx.topicsCompleted >= 1,
  "first-chapter": (ctx) => ctx.topicsCompleted >= 3,
  "first-quiz": (ctx) => ctx.sets >= 1,
  beginner: (ctx) => ctx.xp >= MERIT_XP_BAND,
  intermediate: (ctx) => ctx.xp >= MERIT_XP_BAND * 2,
  advanced: (ctx) => ctx.xp >= MERIT_XP_BAND * 3,
  "expert-learner": (ctx) => ctx.xp >= MERIT_XP_BAND * 4 && ctx.accuracy >= 80,
  legend: (ctx) => ctx.xp >= MERIT_XP_BAND * 5,
  "fast-learner": (ctx) => ctx.sets >= 3 && ctx.xp >= MERIT_XP_BAND,
  "course-finisher": (ctx) => ctx.percentSyllabus >= 50,
};

/** Badge ids auto-earned from quiz XP / accuracy (0–100) and study stats. */
export function evaluateEarnedBadgeIds(ctx: EarnedBadgeContext): string[] {
  const ids: string[] = [];
  for (const [id, rule] of Object.entries(EARNED_RULES)) {
    const def = getBadgeDefinition(id);
    if (!def || def.assignment !== "earned") continue;
    if (rule(ctx)) ids.push(id);
  }
  const journey: AchievementInput = {
    streak: ctx.streak,
    topicsCompleted: ctx.topicsCompleted,
    topicsInProgress: 0,
    percent: ctx.percentSyllabus,
  };
  void evaluateAchievements(journey);
  return ids;
}

export function flashTierForEarnedBadge(badgeId: string, ctx: EarnedBadgeContext): number {
  const def = getBadgeDefinition(badgeId);
  const rarityTier = def ? BADGE_RARITY_TIER[def.rarity] : 1;
  const xpTier = xpBandLevel(ctx.xp);
  return Math.min(5, Math.max(rarityTier, xpTier));
}