import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import * as Sentry from "@sentry/node";
import { checkStartupEnv } from "./config/env";
import { HOST, PORT } from "./config/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

// Error monitoring (owner request 2026-10-27): Sentry initializes BEFORE
// Express listens, and ONLY when SENTRY_DSN is present — no DSN, no
// telemetry, so local dev and CI stay untouched. DSN values are never
// committed (see backend/.env.example for the placeholder).
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV ?? "development",
    // Lean free-tier setup: errors + request context only, no tracing.
    tracesSampleRate: 0,
  });
  // Propagate x-request-id onto every captured event when present on the hint.
  Sentry.addEventProcessor((event, hint) => {
    const maybe = hint as { request?: { headers?: Record<string, unknown> } };
    const raw = maybe.request?.headers?.["x-request-id"];
    const requestId = Array.isArray(raw) ? String(raw[0]) : typeof raw === "string" ? raw : undefined;
    if (requestId) {
      event.tags = { ...event.tags, request_id: requestId };
    }
    return event;
  });
  console.log("[Sentry] error monitoring enabled");
}

// Fail fast: a production deploy missing its critical configuration must not
// boot and serve empty data from a mock store (see config/env.ts).
if (!checkStartupEnv()) {
  process.exit(1);
}

const { createApp } = await import("./app");

const app = createApp();

// Daily CONTENT spark refill runs as Firebase scheduled Function
// `creditsDailyReset` (see firebase/functions/src/jobs/resetCredits.ts).
// Lazy ensureDailyCredits on each request remains the safety net.

const server = app.listen(PORT, HOST, () => {
  console.log(`Backend server running on http://${HOST}:${PORT}`);
});

let isShuttingDown = false;
function gracefulShutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`[Lifecycle] Received ${signal}. Draining connections and shutting down gracefully...`);

  server.close((err) => {
    if (err) {
      console.error("[Lifecycle] Error during server close:", err);
      process.exit(1);
    }
    console.log("[Lifecycle] HTTP server closed gracefully.");
    process.exit(0);
  });

  // Force close if connections take longer than 10 seconds to drain
  setTimeout(() => {
    console.error("[Lifecycle] Forced shutdown due to timeout (in-flight requests didn't finish).");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason: unknown) => {
  console.error("[Lifecycle] Unhandled Rejection at promise:", reason);
});

process.on("uncaughtException", (error: Error) => {
  console.error("[Lifecycle] Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});
