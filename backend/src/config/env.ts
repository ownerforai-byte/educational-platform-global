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
