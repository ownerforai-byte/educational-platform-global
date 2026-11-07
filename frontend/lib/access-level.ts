import {
  aiSparkTierFor,
  type AiSparkTier,
  type AiSparkUserLike,
} from "@/lib/ai/ai-spark-tiers";

/**
 * ACCESS LEVELS — the single source of truth for "who can see what".
 *
 * Owner request 2026-11-07: "remove the confusion between tiers … make it
 * guest, [member,] plus, pro, owner … owner all access … for member 13".
 * The retired visitor name is now guest and the phantom plus_20 pass is gone.
 * The access ladder IS the AI-spark ladder (one union, one resolver) — no
 * translation layer, no drift between what the profile shows and what gates
 * enforce.
 *
 * Ladder (low → high):
 *
 *   guest  → signed out. The home chat widget only; no notes, labs, or Veer.
 *   member → any signed-in account. The study desk: dashboard, settings,
 *              streaks, ask, my notes, billing, and the three chat consoles —
 *              13 Veer sparks a day.
 *   plus   → search, Student Desk, Class 11 + 12 notes, formula sheets,
 *              practice sets, the notice board, labs, simulations, and Veer
 *              studio — 25 Veer sparks a day.
 *   pro    → journal, worked numericals, the CEE and board-exam suite, plus
 *              all indexes: derivations, theorems, the PDF library, graph
 *              banks, knowledge hubs, and Loksewa — 50 Veer sparks a day.
 *   owner  → everything: all indexes, owner rails, owner console, unlimited
 *              Veer sparks. Resolved first and bypasses every gate.
 *
 * Which LINK opens at which rung lives in lib/navigation.ts (per-index
 * `minLevel`, plan.md §3), filtered by the sidebar + drawer. This module only
 * resolves a viewer's rung and compares it — it renders nothing, so tests can
 * import it without a DOM.
 */

export type AccessLevel = AiSparkTier;

export const ACCESS_LEVELS: readonly AccessLevel[] = [
  "guest",
  "member",
  "plus",
  "pro",
  "owner",
] as const;

/** Numeric rung — a viewer may reach anything at or below their rank. */
export const ACCESS_RANK: Record<AccessLevel, number> = {
  guest: 0,
  member: 1,
  plus: 2,
  pro: 3,
  owner: 4,
};

/** Human tier name for badges, the profile card, and the public overview. */
export const ACCESS_LABELS: Record<AccessLevel, string> = {
  guest: "Guest",
  member: "Member",
  plus: "Plus",
  pro: "Pro",
  owner: "Owner",
};

/** The same rung in plain words, shown on the public overview + /plans. */
export const ACCESS_TAGLINES: Record<AccessLevel, string> = {
  guest: "Home chat widget only",
  member: "13 Veer chats a day",
  plus: "Search, notes, labs, and Veer studio",
  pro: "Every index, 50 Veer sparks a day",
  owner: "Everything, plus the rails and console",
};

/**
 * Resolve the viewer's access rung — identical to aiSparkTierFor (owner
 * allowlist/role first, then pro, then plus, then the signed-in Member base;
 * signed out is guest).
 */
export function accessLevelFor(
  user: AiSparkUserLike | null | undefined,
): AccessLevel {
  return aiSparkTierFor(user);
}

/**
 * The hardcoded per-tier home pages (owner direction 2026-10-23: "create
 * those pages for all tiers and hardcode them"). Every signed-in rung has
 * its own interface route; the login flows land the viewer directly on
 * theirs so "once logged in then no guest page".
 */
export const TIER_HOME_PATHS: Record<Exclude<AccessLevel, "guest">, string> = {
  member: "/home/member",
  plus: "/home/plus",
  pro: "/home/pro",
  owner: "/home/owner",
};

/**
 * The exact home interface path for this viewer — their tier page when
 * signed in, "/" (the tier router / public overview) for a guest.
 */
export function tierHomePathFor(
  user: AiSparkUserLike | null | undefined,
): string {
  const level = accessLevelFor(user);
  return level === "guest" ? "/" : TIER_HOME_PATHS[level];
}

/** Veer AI sparks per UTC day, hardcoded by rung (client-safe display map). */
export const TIER_SPARKS: Record<AccessLevel, string> = {
  guest: "Home guide",
  member: "13 / day",
  plus: "25 / day",
  pro: "50 / day",
  owner: "Unlimited",
};

/**
 * The hardcoded per-tier WELCOME screens (owner direction 2026-10-23: "create
 * one welcome pages for each tier then after that home page … opening direct
 * welcome page after getting/knowing the tier access then after clicking go -
 * home page appears then all study materials"). The post-auth flow lands on
 * the viewer's welcome FIRST — its Go button opens TIER_HOME_PATHS.
 */
export const TIER_WELCOME_PATHS: Record<AccessLevel, string> = {
  guest: "/welcome/guest",
  member: "/welcome/member",
  plus: "/welcome/plus",
  pro: "/welcome/pro",
  owner: "/welcome/owner",
};

/** The welcome screen for this viewer — the first page once the tier is known. */
export function tierWelcomePathFor(
  user: AiSparkUserLike | null | undefined,
): string {
  return TIER_WELCOME_PATHS[accessLevelFor(user)];
}

/** Whether this viewer reaches at least `min` (guest = 0, owner = 4). */
export function hasLevel(
  user: AiSparkUserLike | null | undefined,
  min: AccessLevel,
): boolean {
  return ACCESS_RANK[accessLevelFor(user)] >= ACCESS_RANK[min];
}
