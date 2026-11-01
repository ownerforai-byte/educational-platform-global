/**
 * Browser instrumentation (Next.js 16 — evaluated in the client bundle).
 *
 * Error monitoring (owner request 2026-10-27): Sentry initializes ONLY when
 * the public DSN is present — no DSN, no telemetry, so local dev and CI stay
 * untouched. The DSN is public by design (client-side Sentry); the server DSN
 * lives in SENTRY_DSN (see instrumentation.ts).
 */
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  void import("@sentry/nextjs")
    .then((Sentry) => {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        environment: process.env.NODE_ENV ?? "development",
        // Lean free-tier setup: errors only, no tracing.
        tracesSampleRate: 0,
      });
    })
    .catch(() => {
      // Optional monitoring must never block client hydration.
    });
}

export {};
