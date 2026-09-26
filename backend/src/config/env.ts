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
 * Canonical public frontend URL used in AI prompts, search fallbacks, and
 * OpenRouter referer headers.
 *
 * 2026-09-25: hardcoded copies pointed at the DEAD deployment URL
 * (ravikisan-7phkshvvk-…vercel.app → 410), so the AI handed students links
 * to a dead site in every answer — same bug class as the stale Vercel env
 * var that broke /api. Single source of truth here; override with FRONTEND_URL.
 */
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
export const AI_PROVIDER_KEY_VARS = [
  "OPENROUTER_API_KEY",
  "AGNES_API_KEY",
  "GEMINI_API_KEY",
] as const;

/** Numeric tuning knobs that silently disable a control when malformed. */
const OPTIONAL_NUMBER_ENV_VARS = [
  "RATE_LIMIT_MAX_REQUESTS",
  "RATE_LIMIT_WINDOW_MS",
  "AUTH_RATE_LIMIT_MAX_REQUESTS",
] as const;

function isSet(name: string): boolean {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveNumber(name: string): boolean {
  if (!isSet(name)) return true; // unset is fine — the code default applies
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0;
}

export interface StartupEnvReport {
  /** Critical variables that are absent. Non-empty blocks production boot. */
  missingCritical: string[];
  /** No AI provider key at all — AI endpoints will fail at request time. */
  noAIProvider: boolean;
  /** Tuning variables present but not usable (would weaken a control). */
  malformedNumbers: string[];
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

export const PUBLIC_SITE_URL = (
  process.env.FRONTEND_URL ||
  process.env.PUBLIC_SITE_URL ||
  "https://ravikisan.vercel.app"
).replace(/\/$/, "");
