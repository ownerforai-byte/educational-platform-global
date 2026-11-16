import {
  parseAssignedBadgeIds,
  PROFILE_EXTRAS_BADGE_KEY,
  BADGE_RARITY_TIER,
  getBadgeDefinition,
} from "@rn/shared/badges";
import type { DisplayBadge } from "./platform-badge";
import {
  buildEarnedBadgeContext,
  evaluateEarnedBadgeIds,
  flashTierForEarnedBadge,
  type EarnedBadgeContext,
} from "./evaluate-earned-badges";
import type { QuizHistoryRow } from "@/lib/api/ai-quiz-history";

export function readAssignedBadgeIds(extras: Record<string, unknown> | undefined): string[] {
  return parseAssignedBadgeIds(extras?.[PROFILE_EXTRAS_BADGE_KEY]);
}

export function resolveProfileBadges(input: {
  quizRows: QuizHistoryRow[];
  rank?: number | null;
  streak?: number;
  topicsCompleted?: number;
  percentSyllabus?: number;
  assignedIds?: string[];
  roleBadges?: string[];
}): DisplayBadge[] {
  const ctx = buildEarnedBadgeContext(input);
  const earned = evaluateEarnedBadgeIds(ctx);
  const assigned = (input.assignedIds ?? []).filter((id) => !earned.includes(id));
  const role = input.roleBadges ?? [];
  const merged = [...role, ...earned, ...assigned];
  const unique = [...new Set(merged)];
  return unique.map((id) => ({
    id,
    flashTier: earned.includes(id)
      ? flashTierForEarnedBadge(id, ctx)
      : BADGE_RARITY_TIER[getBadgeDefinition(id)?.rarity ?? "common"],
  }));
}

export function resolveLeaderboardBadges(entry: {
  xp: number;
  accuracy: number;
  sets: number;
  rank: number;
}): DisplayBadge[] {
  const ctx: EarnedBadgeContext = {
    quizRows: [],
    xp: entry.xp,
    accuracy: entry.accuracy,
    sets: entry.sets,
    rank: entry.rank,
    streak: 0,
    topicsCompleted: 0,
    percentSyllabus: 0,
  };
  return evaluateEarnedBadgeIds(ctx).map((id) => ({
    id,
    flashTier: flashTierForEarnedBadge(id, ctx),
  }));
}