import { isOwnerEmail } from "@/lib/owner";

/**
 * AI SPARK tiers — the daily Veer (AI chat) message allowance per access rung.
 * MIRROR of backend/src/utils/aiSpark.ts (keep both tables equal — the
 * backend enforces, this copy drives the badge and profile meter).
 *
 * Owner request 2026-11-07: one clean ladder, one number per rung. This union
 * IS the platform access ladder (lib/access-level.ts aliases it):
 *
 *   guest  (signed out)        → no Veer access (home guide widget only)
 *   member (signed-in base)    → 13 messages / UTC day
 *   plus   (granted plan/role) → 25 messages / UTC day
 *   pro    (granted plan/role) → 50 messages / UTC day
 *   owner  (allowlist/role)    → unlimited (never counted, never blocked)
 *
 * The retired visitor name is now guest, and the phantom plus_20 pass is
 * gone — legacy plus_20 plan rows resolve to Plus. Member's allowance was
 * previously inconsistent (3 in copy, 15 in tables); it is 13 everywhere now.
 *
 * Pools are day-keyed server-side and refill only at UTC midnight — a
 * refresh or reload never refills them.
 */

export type AiSparkTier = "guest" | "member" | "plus" | "pro" | "owner";

/** Daily Veer message allowance per tier (owner = unlimited). */
export const AI_SPARK_LIMITS: Record<AiSparkTier, number> = {
  guest: 0,
  member: 13,
  plus: 25,
  pro: 50,
  owner: Number.POSITIVE_INFINITY,
};

/** Minimal user shape needed to resolve a tier. */
export interface AiSparkUserLike {
  email?: string | null;
  role?: string | null;
  /** Membership plan (profiles.plan). Legacy plus_20 rows read as Plus. */
  plan?: string | null;
  /** Legacy PRO flag; maps to the pro tier. */
  premiumStatus?: boolean | null;
}

/**
 * Resolve the tier for a session user — the ONE resolver both the access
 * ladder and the spark allowance use. Order: configured operator account or live
 * role:"owner" grant, then pro, then plus, then Member.
 */
export function aiSparkTierFor(
  user: AiSparkUserLike | null | undefined,
): AiSparkTier {
  if (!user) return "guest";
  if (isOwnerEmail(user.email)) return "owner";
  const role = (user.role ?? "").toLowerCase();
  if (role === "owner") return "owner";
  const plan = (user.plan ?? "").toLowerCase();
  if (role === "pro" || plan === "pro" || user.premiumStatus === true) return "pro";
  if (role === "plus" || plan === "plus" || plan === "plus_20") return "plus";
  return "member";
}

/** Display label for a tier's daily allowance ("50" / "Unlimited"). */
export function aiSparkLimitLabel(tier: AiSparkTier): string {
  const limit = AI_SPARK_LIMITS[tier];
  return Number.isFinite(limit) ? String(limit) : "Unlimited";
}

/** Human tier name for badges and the profile card. */
export const AI_SPARK_TIER_LABELS: Record<AiSparkTier, string> = {
  guest: "Guest",
  member: "Member",
  plus: "Plus",
  pro: "Pro",
  owner: "Owner",
};