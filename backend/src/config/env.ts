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
export const PUBLIC_SITE_URL = (
  process.env.FRONTEND_URL ||
  process.env.PUBLIC_SITE_URL ||
  "https://ravikisan.vercel.app"
).replace(/\/$/, "");
