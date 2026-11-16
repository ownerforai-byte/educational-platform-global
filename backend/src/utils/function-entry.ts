import type { IncomingMessage, ServerResponse } from "node:http";
import type { Express } from "express";
import { createApp } from "../app";
import { checkStartupEnv } from "../config/env";

/**
 * Cloud Functions entry support (Firebase migration, Task A).
 *
 * The backend API is deployed as the gen2 HTTP function `api` (region
 * us-central1), so its public base URL already ends in `/api`:
 * `https://us-central1-rn01-af00b.cloudfunctions.net/api`. The frontend calls
 * `${base}/api/<path>` and `${base}/health`, i.e. the browser paths are
 * `/api/api/<path>` and `/api/health`.
 *
 * Cloud Functions may deliver the request path to the handler either WITH the
 * function-name prefix (`/api/api/x`, `/api/health`) or WITHOUT it (`/api/x`,
 * `/health`). Express must see the original app path (`/api/x`, `/health`).
 *
 * Normalization contract (fixed): when the delivered URL starts with
 * `/api/api` or `/api/health`, strip the FIRST `/api` segment; otherwise pass
 * the URL through unchanged.
 */

/** Normalize a Cloud Functions request URL to the original app path. */
export function normalizeFunctionPath(url: string): string {
  if (url.startsWith("/api/api") || url.startsWith("/api/health")) {
    return url.slice("/api".length) || "/";
  }
  return url;
}

/** Minimal Node handler shape an Express app satisfies. */
export type NodeHandler = (req: IncomingMessage, res: ServerResponse) => void;

/**
 * Wrap an Express app so it can be handed Cloud Functions requests verbatim:
 * normalize `req.url`, then dispatch to the app (which routes on the updated
 * URL exactly as it would behind a plain `app.listen` server).
 */
export function wrapAppForFunctions(app: Express): NodeHandler {
  return (req, res) => {
    if (req.url) {
      req.url = normalizeFunctionPath(req.url);
    }
    app(req, res);
  };
}

/**
 * Build the request handler for the `api` function. Mirrors the startup
 * sequence of `src/index.ts` minus `app.listen`: the config gate runs first
 * and, when it fails in production, every request gets a clean 503 instead of
 * the process crash-looping (pre-cutover deploys run with dummy env on
 * purpose — see firebase/functions-api).
 */
export function createFunctionHandler(): NodeHandler {
  const startupOk = checkStartupEnv();
  const handler: NodeHandler | null = startupOk ? wrapAppForFunctions(createApp()) : null;

  return (req, res) => {
    if (!handler) {
      res.statusCode = 503;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: "error", error: "Backend configuration is incomplete." }));
      return;
    }
    handler(req, res);
  };
}
