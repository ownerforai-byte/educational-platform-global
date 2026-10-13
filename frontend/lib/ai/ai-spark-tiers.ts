import { isOwnerEmail } from "@/lib/owner";

/**
 * AI SPARK tiers — the daily Veer (AI chat) message allowance per membership
 * tier. MIRROR of backend/src/utils/aiSpark.ts (keep both tables equal — the
 * backend enforces, this copy drives the badge and profile meter).
 *
 * Owner policy 2026-10-13: "restrict the ai spark to 1 for public, 7 for
 * member and unlimited for owner" plus "create for plus and pro member also
 * like 25 and 50":
 *
 *   guest (public, signed out) → 1 message / UTC day
 *   member                     → 7 messages / UTC day
 *   plus                       → 25 messages / UTC day
 *   pro                        → 50 messages / UTC day
 *   owner (allowlist emails)   → unlimited
 *
 * Pools are day-keyed server-side and refill only at UTC midnight — a
 * refresh or reload never refills them.
 */

export type AiSparkTier = "guest" | "member" | "plus" | "pro" | "owner";

/** Daily Veer message allowance per tier (owner = unlimited). */
export const AI_SPARK_LIMITS: Record<AiSparkTier, number> = {
  guest: 1,
  member: 7,
  plus: 25,
  pro: 50,
  owner: Number.POSITIVE_INFINITY,
};

/** Minimal user shape needed to resolve a tier. */
export interface AiSparkUserLike {
  email?: string | null;
  role?: string | null;
  /** Membership plan (profiles.plan — migration 008). */
  plan?: "member" | "plus" | "pro" | string | null;
  /** Legacy PRO flag; maps to the pro tier when plan is absent. */
  premiumStatus?: boolean | null;
}

/**
 * Resolve the tier for a session user. Order matters: the hardcoded owner
 * allowlist always wins, then the plan tier, then plain membership. A
 * signed-out visitor is a guest.
 */
export function aiSparkTierFor(
  user: AiSparkUserLike | null | undefined,
): AiSparkTier {
  if (!user) return "guest";
  if (isOwnerEmail(user.email)) return "owner";
  const plan = (user.plan ?? "").toLowerCase();
  if (plan === "pro" || user.premiumStatus === true) return "pro";
  if (plan === "plus") return "plus";
  return "member";
}

/** Display label for a tier's daily allowance ("50" / "Unlimited"). */
export function aiSparkLimitLabel(tier: AiSparkTier): string {
  const limit = AI_SPARK_LIMITS[tier];
  return Number.isFinite(limit) ? String(limit) : "Unlimited";
}

/** Human tier name for badges and the profile card. */
export const AI_SPARK_TIER_LABELS: Record<AiSparkTier, string> = {
  guest: "Public",
  member: "Member",
  plus: "Plus",
  pro: "Pro",
  owner: "Owner",
};
