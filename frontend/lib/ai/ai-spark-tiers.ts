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
 *   guest (public, signed out) → 3 messages / UTC day
 *   member                     → 7 messages / UTC day
 *   plus                       → 25 messages / UTC day
 *   pro                        → 50 messages / UTC day
 *   owner (allowlist emails)   → unlimited
 *
 * Pools are day-keyed server-side and refill only at UTC midnight — a
 * refresh or reload never refills them.
 */

export type AiSparkTier = "guest" | "member" | "plus" | "plus_20" | "pro" | "owner";

/** Daily Veer message allowance per tier (owner = unlimited). */
export const AI_SPARK_LIMITS: Record<AiSparkTier, number> = {
  guest: 3,
  member: 7,
  plus: 25,
  plus_20: 25,
  pro: 50,
  owner: Number.POSITIVE_INFINITY,
};

/** USD price of the temporary pass — owner 2026-10-18 "the plan 30$ for 20 days". */
export const PLUS_20_PRICE_USD = 30;
/** Lifetime of the temporary pass in days. */
export const PLUS_20_DURATION_DAYS = 20;

/** Minimal user shape needed to resolve a tier. */
export interface AiSparkUserLike {
  email?: string | null;
  role?: string | null;
  /** Membership plan (profiles.plan — migration 008). */
  plan?: "member" | "plus" | "plus_20" | "pro" | string | null;
  /** Legacy PRO flag; maps to the pro tier when plan is absent. */
  premiumStatus?: boolean | null;
  /** When the temporary plus_20 pass expires (migration 008). */
  planExpiresAt?: string | Date | null;
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
  if (plan === "plus_20") {
    const expires = user.planExpiresAt
      ? new Date(user.planExpiresAt).getTime()
      : 0;
    if (Number.isFinite(expires) && expires > Date.now()) return "plus_20";
    return "member";
  }
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
  plus_20: "Plus 20d",
  pro: "Pro",
  owner: "Owner",
};

/** What the activation UI shows for the temporary pass. */
export const PLUS_20_PITCH =
  `${PLUS_20_PRICE_USD}$ for ${PLUS_20_DURATION_DAYS} days — same daily spark as Plus, auto-expires`;
