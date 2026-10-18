import type { Request } from "express";

/**
 * Client identity for rate limiting and guest quotas — single source of truth.
 *
 * Always use Express's `req.ip`: `app.set("trust proxy", TRUST_PROXY_HOPS)`
 * (config/server.ts) already derives it from X-Forwarded-For, trusting only
 * the entries the proxy chain appended.
 *
 * Never parse `x-forwarded-for` by hand and take the FIRST entry: that entry
 * is client-controlled, so rotating fake values would mint a fresh identity
 * per request and walk past every per-IP tier (the auth brute-force cap, the
 * password-reset limit, guest quotas, the global default).
 *
 * `req.ip` is undefined only when the socket address is unavailable; the
 * "unknown" fallback then buckets those rare requests together, which fails
 * CLOSED (one shared budget) instead of open.
 *
 * Deploy note: TRUST_PROXY_HOPS (config/server.ts) must match the real proxy
 * chain (browser -> Vercel proxy -> Render is TWO hops, not one); too few
 * trusted hops over-cluster users onto shared identities and throttle them
 * collectively instead of per user.
 */
export function getClientIp(req: Request): string {
  return req.ip ?? "unknown";
}
