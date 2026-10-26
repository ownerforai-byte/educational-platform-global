/**
 * Canonical copy for the two independent spark pools (owner policy 2026-10-12+).
 * Import these strings anywhere user-facing copy must stay consistent.
 */

/** Veer chat, math solver, deep-dive, quiz generation — server: guestQuota + aiSpark. */
export const AI_SPARK_METERING_BLURB =
  "AI sparks meter every Veer message and AI Studio tool. Your allowance depends on plan tier and resets at 12:00 AM UTC.";

/** Note/PYQ unlock windows — server: POST /api/user/credits/unlock. */
export const CONTENT_SPARK_METERING_BLURB =
  "Content sparks unlock actual notes and question sets for 20 minutes. Labs, visuals, and Veer chat never spend content sparks.";

/** One line for notice boards, credits headers, and profile hints. */
export const DUAL_SPARK_SUMMARY =
  "Two separate meters: AI sparks for Veer and AI tools; content sparks for note and PYQ unlocks. They never mix.";
