import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import apiRouter from "./api/index.js";
import { rateLimit } from "./middleware/rateLimit";
import { isOriginAllowed } from "./middleware/cors";
import { securityHeaders, LEGACY_STATIC_PAGE_CSP } from "./middleware/securityHeaders";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { requestId } from "./middleware/request-id";
import { requestLogger } from "./middleware/request-logger";
import { logRegisteredRoutes } from "./utils/routeDebug";
import { hasAnyLlmKey } from "./ai/config";
import { describeFreeLlmPresence } from "./ai/free-llm-providers";
import {
  JSON_BODY_LIMIT,
  STATIC_PUBLIC_DIRS,
  TRUST_PROXY_HOPS,
} from "./config/server";

export function createApp(): express.Express {
  const app = express();

  app.set("trust proxy", TRUST_PROXY_HOPS);
  app.use(requestId);
  app.use(securityHeaders);
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin || isOriginAllowed(origin)) return cb(null, true);
        return cb(null, false);
      },
      credentials: true,
      // The OAuth callback POSTs X-CSRF-Token. When a deployment calls the
      // backend directly (instead of the same-origin Next.js proxy), the CORS
      // preflight must allow that header or the exchange is blocked.
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-CSRF-Token",
        "X-Request-Id",
        "X-Upload-Filename",
        "X-Storage-Path",
      ],
    }),
  );
  app.use(requestLogger);
  // gzip/deflate JSON responses (perf pass 2026-10-27): the curriculum
  // endpoints return large JSON bodies; compression shrinks them several-fold
  // on the wire for students on slow Nepali mobile networks. The middleware
  // skips responses that are already compressed or have no Accept-Encoding.
  app.use(compression());
  app.use(rateLimit);
  // Body limit rationale lives in config/server.ts (JSON_BODY_LIMIT).
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use(cookieParser());

  // Serve static assets from public directory
  for (const p of STATIC_PUBLIC_DIRS) {
    app.use(
      express.static(p, {
        setHeaders(res) {
          // public/index.html loads the Tailwind CDN plus an inline boot script,
          // so it needs a wider policy than the strict one every API response
          // carries. Scoped to static files only.
          res.setHeader("Content-Security-Policy", LEGACY_STATIC_PAGE_CSP);
        },
      }),
    );
  }

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      // Render injects the deployed revision — lets the live smoke test confirm
      // it is checking the release that triggered it (not the previous one).
      commit: process.env.RENDER_GIT_COMMIT ?? null,
    });
  });

  // Lightweight AI *configuration* probe for the chat status dot: a boolean
  // only, no key material. Registered before /api so it stays public. A
  // keyless free-tier link (LLM7.io / OVHcloud) counts as configured too.
  // CodeRabbit: this only proves a key/provider is wired up — it does NOT
  // prove the provider is reachable right now. `configured` is the honest
  // name; `online` is kept so older clients keep rendering instead of going
  // dark. The dot's label says "configured", not "online".
  app.get("/api/ai/status", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const configured = hasAnyLlmKey() || describeFreeLlmPresence().live.length > 0;
    res.json({ configured, online: configured });
  });

  // Route-table dump: opt-in only (ROUTE_DEBUG=true) and never in production.
  logRegisteredRoutes(app, "BEFORE API REGISTRATION");

  app.use("/api", apiRouter);

  logRegisteredRoutes(app, "AFTER API REGISTRATION");

  app.use(notFoundHandler);
  // Terminal handler: internal detail goes to the server log under a
  // correlation id; the client gets a generic message plus that id.
  app.use(errorHandler);

  return app;
}
