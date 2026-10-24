/**
 * Deployment-environment detection.
 *
 * Render injects `RENDER=true` and `RENDER_EXTERNAL_URL` into the runtime but
 * historically NODE_ENV has not been guaranteed there, and several security
 * behaviors (Secure cookie flag, strict CORS) key off "is this production".
 * Treat either signal as production so behavior is deterministic per platform.
 *
 * Use `isProductionEnv()` (re-evaluated per call) in request paths; the
 * `isProduction` constant is a boot-time snapshot for module-level defaults.
 */
export function isProductionEnv(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.RENDER === "true" ||
    !!process.env.RENDER_EXTERNAL_URL
  );
}

export const isProduction = isProductionEnv();
export const isDevelopment = !isProduction;

/**
 * Startup configuration gate (pre-deploy checklist, 2026-09-25).
 *
 * Previously a missing critical variable did not stop the process: the Supabase
 * client silently swapped in the in-memory mock store, so a misconfigured
 * production deploy would boot "successfully" and serve empty data instead of
 * failing loudly. Production now refuses to start; development still warns,
 * because the mock store is the documented offline-dev path.
 */

/** Never optional — auth, data, and storage all run through Supabase. */
export const CRITICAL_ENV_VARS = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

/** Any one of these is enough to answer AI requests. */
export const AI_PROVIDER_KEY_VARS = ["AGNES_API_KEY"] as const;

/**
 * The Cloudflare R2 overflow layer (src/storage/r2.ts) — OPTIONAL, but all
 * four must be present together: a partial set silently keeps the overflow
 * disabled, so the startup report calls that out.
 */
export const R2_OVERFLOW_ENV_VARS = [
  "R2_ACCOUNT_ID",
  "R2_BUCKET",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
] as const;

/** Numeric tuning knobs that silently disable a control when malformed. */
const OPTIONAL_NUMBER_ENV_VARS = [
  "RATE_LIMIT_MAX_REQUESTS",
  "RATE_LIMIT_WINDOW_MS",
  "AUTH_RATE_LIMIT_MAX_REQUESTS",
] as const;

export interface StartupEnvReport {
  /** Critical variables that are absent. Non-empty blocks production boot. */
  missingCritical: string[];
  /** No AI provider key at all — AI endpoints will fail at request time. */
  noAIProvider: boolean;
  /** Tuning variables present but not usable (would weaken a control). */
  malformedNumbers: string[];
  /** All four R2 vars set — the Supabase → R2 quota-overflow backup is live. */
  r2OverflowReady: boolean;
  /** R2 vars set while others are missing — overflow stays off until fixed. */
  r2Partial: string[];
}

/** Inspect the environment without side effects (safe to call from tests). */
export function inspectStartupEnv(env: NodeJS.ProcessEnv = process.env): StartupEnvReport {
  const scope = env as Record<string, string | undefined>;
  const has = (name: string) => {
    const value = scope[name];
    return typeof value === "string" && value.trim().length > 0;
  };

  return {
    missingCritical: CRITICAL_ENV_VARS.filter((name) => !has(name)),
    noAIProvider: !AI_PROVIDER_KEY_VARS.some((name) => has(name)),
    malformedNumbers: OPTIONAL_NUMBER_ENV_VARS.filter((name) => {
      if (!has(name)) return false;
      const value = Number(scope[name]);
      return !Number.isFinite(value) || value <= 0;
    }),
    r2OverflowReady: R2_OVERFLOW_ENV_VARS.every((name) => has(name)),
    r2Partial: R2_OVERFLOW_ENV_VARS.every((name) => has(name))
      ? []
      : R2_OVERFLOW_ENV_VARS.filter((name) => has(name)),
  };
}

/**
 * Log the startup report and decide whether the process may serve traffic.
 * Returns false only when a critical variable is missing in production.
 */
export function checkStartupEnv(env: NodeJS.ProcessEnv = process.env): boolean {
  const report = inspectStartupEnv(env);
  const production = isProductionEnv();

  for (const name of report.malformedNumbers) {
    console.error(
      `[Config] ${name} is not a positive number — ignoring it and using the built-in default.`,
    );
  }

  if (report.noAIProvider) {
    console.warn(
      `[Config] No AI provider key set (${AI_PROVIDER_KEY_VARS.join(", ")}) — AI endpoints will fail.`,
    );
  }

  if (report.r2OverflowReady) {
    console.info(
      "[Config] R2 overflow backup: ready (Supabase → Cloudflare R2 on quota).",
    );
  } else if (report.r2Partial.length > 0) {
    console.warn(
      `[Config] R2 overflow partially configured — set ALL of ${R2_OVERFLOW_ENV_VARS.join(", ")} (found only: ${report.r2Partial.join(", ")}). Overflow stays disabled.`,
    );
  } else {
    console.info(
      "[Config] R2 overflow backup: not configured — Supabase-only storage.",
    );
  }

  if (report.missingCritical.length === 0) return true;

  const message = `[Config] Missing required environment variable(s): ${report.missingCritical.join(", ")}`;
  if (production) {
    console.error(
      `${message}. Refusing to start in production — set them and redeploy (the mock database fallback is development-only).`,
    );
    return false;
  }

  console.warn(`${message}. Continuing in development with the in-memory mock store.`);
  return true;
}

/**
 * Canonical public frontend URL used in AI prompts, search fallbacks, and
 * AI referer headers. Single source of truth; override with FRONTEND_URL.
 */
export const PUBLIC_SITE_URL = (
  process.env.FRONTEND_URL ||
  process.env.PUBLIC_SITE_URL ||
  "https://ravikisan.vercel.app"
).replace(/\/$/, "");
