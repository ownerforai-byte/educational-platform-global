import type { RequestHandler } from "express";
import helmet from "helmet";
import { isProductionEnv } from "../config/env";

/**
 * Security response headers — pre-deploy checklist (2026-09-25).
 *
 * Previously helmet ran with `frameguard: false` and `contentSecurityPolicy:
 * false`, so responses carried no clickjacking guard and no CSP. Both are now
 * on, with the one deliberate exception below.
 *
 * Scope note: helmet withholds some headers that were never the problem.
 * nosniff (`X-Content-Type-Options`) and `Referrer-Policy` already default on,
 * and `Cross-Origin-Resource-Policy: same-origin` is intentionally left at its
 * default so cross-origin asset loads keep working.
 */

/** 1 year, as required by the pre-deploy checklist. */
export const HSTS_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/**
 * Strict policy for API responses. These are JSON documents that no browser
 * should ever execute, frame, or navigate — so the policy can be minimal.
 */
const STRICT_CSP = {
  useDefaults: false as const,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "blob:"],
    fontSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'none'"],
    upgradeInsecureRequests: [],
  },
};

/**
 * Development CSP: identical except framing is permitted, because preview
 * tooling renders the app inside an iframe and local work must keep flowing.
 */
const DEV_CSP = {
  ...STRICT_CSP,
  directives: { ...STRICT_CSP.directives, frameAncestors: ["*"] as string[] },
};

/**
 * Policy for the one legacy static page we serve (`public/index.html`), which
 * loads the Tailwind CDN and an inline boot script. Applied by the static
 * handler so it overrides the strict API policy for that document only.
 */
export const LEGACY_STATIC_PAGE_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

function build(isProduction: boolean): RequestHandler {
  return helmet({
    contentSecurityPolicy: isProduction ? STRICT_CSP : DEV_CSP,
    // Clickjacking: DENY in production. Locally we stay frameable so the
    // preview panel can embed the running app.
    frameguard: isProduction ? { action: "deny" } : false,
    // HSTS only where HTTPS is guaranteed — sending it over local http://
    // would pin localhost to https in the developer's browser.
    hsts: isProduction
      ? {
          maxAge: HSTS_MAX_AGE_SECONDS,
          includeSubDomains: true,
          preload: true,
        }
      : false,
  });
}

// Two pre-built policies; the right one is chosen per request so that tests and
// runtime env changes (NODE_ENV/RENDER) are honoured without a rebuild.
const productionHeaders = build(true);
const developmentHeaders = build(false);

export const securityHeaders: RequestHandler = (req, res, next) => {
  const handler = isProductionEnv() ? productionHeaders : developmentHeaders;
  handler(req, res, next);
};
