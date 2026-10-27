/**
 * Server instrumentation (Next.js 16 — runs BEFORE the server boots).
 *
 * Error monitoring (owner request 2026-10-27): Sentry initializes ONLY when a
 * DSN is present — no DSN, no telemetry, so local dev and CI stay untouched.
 * - SENTRY_DSN            → this server-side runtime (set on Vercel / .env.local).
 * - NEXT_PUBLIC_SENTRY_DSN → the browser runtime (see instrumentation-client.ts).
 *
 * Modern Next 16 wiring: no manual router wrap — `onRequestError` below is the
 * router-level error hook (it replaces the old withSentryConfig-router wrap).
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.SENTRY_DSN) {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV ?? "development",
      // Lean free-tier setup: errors + request context only, no tracing.
      tracesSampleRate: 0,
    });
    console.log("[Sentry] server error monitoring enabled");
  }
}

/**
 * Next.js route-handler error hook (App Router): forwards every unhandled
 * request error — server components, route handlers, server actions — to
 * Sentry. Only active once a server DSN initialized register() above.
 */
export async function onRequestError(
  request: Request,
  error: unknown,
  context: { routerKind: "app" | "pages"; routePath: string; routeType: string },
): Promise<void> {
  if (process.env.SENTRY_DSN) {
    const Sentry = await import("@sentry/nextjs");
    // Sentry's captureRequestError takes (error, requestInfo, context) —
    // the reverse of Next's hook order — with its own requestInfo shape
    // ({ path, method, headers }), built here from Next's Request.
    Sentry.captureRequestError(
      error,
      {
        path: new URL(request.url).pathname,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
      },
      context,
    );
  }
}