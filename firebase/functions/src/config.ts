/**
 * Tunables for the timed access bot. Override via Firebase Functions params /
 * environment config — never hardcode secrets here.
 */
function intEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const ACCESS_BOT = {
  /** Hold pending requests this long before auto-approval. */
  approvalDelayMinutes: intEnv("APPROVAL_DELAY_MINUTES", 5),
  /** Approved access lasts this long. */
  accessTtlMinutes: intEnv("ACCESS_TTL_MINUTES", 60),
  /** Warn this many minutes before expires_at. */
  reminderBeforeExpiryMinutes: intEnv("REMINDER_BEFORE_EXPIRY_MINUTES", 10),
  /** Send first onboarding tip this many minutes after approval. */
  guidanceAfterApprovalMinutes: intEnv("GUIDANCE_AFTER_APPROVAL_MINUTES", 15),
  /** Absolute site origin used to build deep links in push payloads. */
  siteUrl: (process.env.SITE_URL || "https://ravikisan.vercel.app").replace(/\/$/, ""),
} as const;
