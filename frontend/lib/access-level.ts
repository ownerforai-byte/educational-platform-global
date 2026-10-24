import { aiSparkTierFor, type AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

/**
 * ACCESS LEVELS — the single source of truth for "who can see what".
 *
 * Owner request (2026-10-17): "assign the roles visitor, plus, pro member and
 * owner everywhere … different interfaces … add features according to access
 * level." The platform already had five AI-spark tiers; this module turns those
 * tiers into the platform's ACCESS LADDER and gives every surface one helper to
 * ask "may this viewer reach this?".
 *
 * Ladder (low → high) — plan.md §2/§3 is the rung definition of record (it
 * supersedes the earlier "search-only member" wording):
 *
 *   visitor  → signed-out guest. Public overview, the Plans page, free-always
 *              labs & visuals, AI quiz pool, spark-metered chat trial.
 *   member   → signed-in base. Search, Class 11 core notes, formula sheets,
 *              resources & reference, practice basics + Student Desk.
 *   plus     → + Class 12, journal, worked numericals, PYQ banks, CEE track
 *              and the board-exam suite.
 *   pro      → + all indexes: derivations & theorems, PDF library, graph
 *              banks, knowledge hubs, Loksewa & entrance tracks.
 *   owner    → everything: all indexes, owner rails, owner console, unlimited
 *              Veer sparks.
 *
 * Which LINK opens at which rung lives in lib/navigation.ts (per-index
 * `minLevel`, plan.md §3), filtered by the sidebar + drawer. This module only
 * resolves a viewer's rung and compares it — it renders nothing, so tests can
 * import it without a DOM.
 */

export type AccessLevel = "visitor" | "member" | "plus" | "pro" | "owner";

export const ACCESS_LEVELS: readonly AccessLevel[] = [
  "visitor",
  "member",
  "plus",
  "pro",
  "owner",
] as const;

/** Numeric rung — a viewer may reach anything at or below their rank. */
export const ACCESS_RANK: Record<AccessLevel, number> = {
  visitor: 0,
  member: 1,
  plus: 2,
  pro: 3,
  owner: 4,
};

/** Human tier name for badges, the profile card, and the public overview. */
export const ACCESS_LABELS: Record<AccessLevel, string> = {
  visitor: "Visitor",
  member: "Member",
  plus: "Plus",
  pro: "Pro",
  owner: "Owner",
};

/** The same rung in plain words, shown on the public overview + /plans. */
export const ACCESS_TAGLINES: Record<AccessLevel, string> = {
  visitor: "A simple overview for visitors",
  member: "Search the whole library",
  plus: "Home, Class 11 and Search",
  pro: "Every index, no daily cap",
  owner: "Everything, plus the rails and console",
};

/**
 * Resolve the viewer's access rung. This mirrors aiSparkTierFor exactly (same
 * owner-allowlist-first rule) but reports the signed-out state as "visitor"
 * instead of "guest", so UI copy reads naturally.
 */
export function accessLevelFor(
  user: AiSparkUserLike | null | undefined,
): AccessLevel {
  const tier = aiSparkTierFor(user);
  if (tier === "guest") return "visitor";
  // The temporary plus_20 pass IS the Plus rung with an expiry — same
  // interface, same access — so it resolves to "plus", never a phantom rung.
  return tier === "plus_20" ? "plus" : (tier as AccessLevel);
}

/**
 * The hardcoded per-tier home pages (owner direction 2026-10-23: "create
 * those pages for all tiers and hardcode them"). Every signed-in rung has
 * its own interface route; the login flows land the viewer directly on
 * theirs so "once logged in then no visitor page".
 */
export const TIER_HOME_PATHS: Record<Exclude<AccessLevel, "visitor">, string> = {
  member: "/home/member",
  plus: "/home/plus",
  pro: "/home/pro",
  owner: "/home/owner",
};

/**
 * The exact home interface path for this viewer — their tier page when
 * signed in, "/" (the tier router / public overview) for a visitor.
 */
export function tierHomePathFor(
  user: AiSparkUserLike | null | undefined,
): string {
  const level = accessLevelFor(user);
  return level === "visitor" ? "/" : TIER_HOME_PATHS[level];
}

/** Veer AI sparks per UTC day, hardcoded by rung (client-safe display map). */
export const TIER_SPARKS: Record<AccessLevel, string> = {
  visitor: "3 / day",
  member: "7 / day",
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
  visitor: "/welcome/guest",
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

/** Whether this viewer reaches at least `min` (visitor = 0, owner = 4). */
export function hasLevel(
  user: AiSparkUserLike | null | undefined,
  min: AccessLevel,
): boolean {
  return ACCESS_RANK[accessLevelFor(user)] >= ACCESS_RANK[min];
}
