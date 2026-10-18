import type { Request } from "express";

/**
 * Client identity for rate limiting and guest quotas — single source of truth.
 *
 * Always use Express's `req.ip`: `app.set("trust proxy", TRUST_PROXY_HOPS)`
 * (config/server.ts) already derives it from X-Forwarded-For, trusting only
 * the entries the proxy chain appended.
 *
 * NEVER parse `x-forwarded-for` by hand and take the FIRST entry (2026-10-18
 * cleanup): that entry is client-controlled, so an attacker rotating fake
 * values would mint a fresh identity per request and walk straight past every
 * per-IP tier — the auth brute-force cap, the 3/hour password-reset limit,
 * guest quotas, and the global default. This util replaced three drifted
 * hand-rolled copies of exactly that bug (middleware/rateLimit.ts,
 * api/ai-guest.ts, api/ai-generate.ts).
 *
 * `req.ip` is undefined only when the socket address is unavailable; the
 * "unknown" fallback then buckets those rare requests together, which fails
 * CLOSED (one shared budget) instead of open.
 */
export function getClientIp(req: Request): string {
  return req.ip ?? "unknown";
}
