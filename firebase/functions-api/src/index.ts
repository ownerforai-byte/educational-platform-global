import { onRequest } from "firebase-functions/v2/https";
import type { IncomingMessage, ServerResponse } from "node:http";

// Nothing heavy is imported at module scope ON PURPOSE. The deploy-time
// functions discovery probe ("Loading and analyzing source code … Timeout
// after 10000") loads this module with a ~10s budget, and the full backend
// module graph (express + sharp + aws-sdk + the router tree) can exceed that
// on a cold filesystem cache. Everything heavy is deferred to the first
// request (cold start), where no such budget applies.

type NodeHandler = (req: IncomingMessage, res: ServerResponse) => void;

let handlerPromise: Promise<NodeHandler> | undefined;

function loadHandler(): Promise<NodeHandler> {
  handlerPromise ??= (async () => {
    // Error monitoring parity with backend/src/index.ts: Sentry initializes
    // ONLY when SENTRY_DSN is present — no DSN, no telemetry. DSN values are
    // never committed.
    if (process.env.SENTRY_DSN) {
      const Sentry = await import("@sentry/node");
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV ?? "development",
        // Lean free-tier setup: errors + request context only, no tracing.
        tracesSampleRate: 0,
      });
      // Propagate x-request-id onto every captured event when present.
      Sentry.addEventProcessor((event, hint) => {
        const maybe = hint as { request?: { headers?: Record<string, unknown> } };
        const raw = maybe.request?.headers?.["x-request-id"];
        const requestId = Array.isArray(raw) ? String(raw[0]) : typeof raw === "string" ? raw : undefined;
        if (requestId) {
          event.tags = { ...event.tags, request_id: requestId };
        }
        return event;
      });
    }

    // The compiled backend is staged at ./dist by scripts/build.mjs (a copy of
    // backend/dist), so tsc cannot resolve this module while compiling src/ —
    // the runtime path exists in the deployed bundle layout (main: lib/index.js
    // → lib/dist/**).
    // @ts-ignore - staged module (see scripts/build.mjs).
    const { createFunctionHandler } = await import("./dist/utils/function-entry.js");
    return createFunctionHandler() as NodeHandler;
  })();
  return handlerPromise;
}

// Path normalization + createApp() dispatch live in the backend helper
// (backend/src/utils/function-entry.ts): when Cloud Functions delivers the
// request WITH the function-name prefix ("/api/api/x", "/api/health") the
// first "/api" segment is stripped; WITHOUT the prefix ("/api/x", "/health")
// the URL passes through unchanged. The frontend call shapes
// `${base}/api/<path>` and `${base}/health` therefore hit the same Express
// routes as the Render deployment did.
//
// FIXED CONTRACT: the function is exported as `api`, gen2, region us-central1
// → https://us-central1-rn01-af00b.cloudfunctions.net/api
// - memory ≥ 1GiB: the curriculum corpus + sharp image work run in-process.
// - timeoutSeconds 3600: SSE AI streams can run for minutes.
// - concurrency 10: steady traffic should ride warm instances.
// - minInstances 0: no idle cost while Render still serves production.
export const api = onRequest(
  {
    region: "us-central1",
    memory: "1GiB",
    timeoutSeconds: 3600,
    concurrency: 10,
    minInstances: 0,
    invoker: "public",
  },
  async (req, res) => {
    const handler = await loadHandler();
    handler(req, res);
  },
);
