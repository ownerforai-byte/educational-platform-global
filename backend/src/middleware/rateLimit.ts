import { Request, Response, NextFunction } from "express";
import type { AuthedRequest } from "./auth";
import { getClientIp } from "../utils/clientIp";

/**
 * Positive-number env parsing. `Number("abc")` is NaN, and a NaN limit
 * silently disables the limiter (`count > NaN` is always false), so anything
 * unusable falls back to the built-in default instead of failing open.
 */
function positiveNumber(raw: string | undefined, fallback: number): number {
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

const WINDOW_MS = positiveNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000);
// Global default per IP per window. Raised from 20 (2026-09-25): a normal
// curriculum page load fires a dozen parallel content calls and was tripping
// the old cap in real use.
const MAX_REQUESTS = positiveNumber(process.env.RATE_LIMIT_MAX_REQUESTS, 60);
// Strict tier for credential endpoints: brute-force protection. Override with
// AUTH_RATE_LIMIT_MAX_REQUESTS if needed.
//
// Lowered 10 → 5 (2026-09-25 security pass): the pre-deploy checklist asks for
// at most 5 login attempts per minute per IP.
const AUTH_MAX_REQUESTS = positiveNumber(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 5);
// OAuth needs its own bucket. One Google sign-in costs a CSRF POST + a session
// POST (and a retry on a cold backend), so sharing the 5/min password bucket
// rate-limited legitimate social logins after two or three attempts. These
// endpoints are not password brute-force vectors: the session exchange is
// validated against a Supabase access token.
const OAUTH_MAX_REQUESTS = positiveNumber(process.env.OAUTH_RATE_LIMIT_MAX_REQUESTS, 20);
// Password reset gets its own, much longer window: the checklist asks for 3
// attempts per hour per IP (email-bombing + reset-token guessing).
const PASSWORD_RESET_MAX_REQUESTS = positiveNumber(
  process.env.PASSWORD_RESET_RATE_LIMIT_MAX_REQUESTS,
  3,
);
const PASSWORD_RESET_WINDOW_MS = positiveNumber(
  process.env.PASSWORD_RESET_RATE_LIMIT_WINDOW_MS,
  60 * 60 * 1000,
);

// Image generation burns the platform image key per drawing and is open to
// EVERY signed-in user (owner request 2026-10-04) — its own modest tier keeps
// one account/IP from draining the key while a normal study session still
// draws freely (one figure-mode drawing = the vector pass + a raster retry).
const AI_IMAGE_MAX_REQUESTS = positiveNumber(
  process.env.AI_IMAGE_RATE_LIMIT_MAX_REQUESTS,
  12,
);

const hits = new Map<string, { count: number; reset: number }>();

function pruneExpiredHits(now: number): void {
  if (hits.size <= 5000) return;
  for (const [key, entry] of hits) {
    if (now > entry.reset) hits.delete(key);
  }
}

type Tier = "support" | "auth" | "oauth" | "password-reset" | "guest-ai" | "ai-image" | "default" | "default-unlimited";

/** Which tier does this request fall into? */
function tierFor(originalUrl: string | undefined): Tier {
  const url = originalUrl ?? "";
  // Social sign-in handshake: its own bucket, checked BEFORE the credential
  // tier so a CSRF/session call never burns a password-attempt slot.
  if (
    url.startsWith("/api/auth/oauth/csrf") ||
    url.startsWith("/api/auth/oauth/session")
  ) {
    return "oauth";
  }
  // Password reset first: its own long window (3/hour).
  if (url.startsWith("/api/auth/reset-password") || url.startsWith("/api/auth/forgot-password")) {
    return "password-reset";
  }
  // Credential endpoints: strictest (brute-force protection). signup belongs
  // here too — mass account creation is the same abuse class as credential
  // stuffing, and it used to sit on the 60/min default tier.
  if (
    url.startsWith("/api/auth/login") ||
    url.startsWith("/api/auth/refresh") ||
    url.startsWith("/api/auth/signup")
  ) {
    return "auth";
  }
  // Guest AI is anonymous and burns paid credits: standard cap. Authenticated
  // AI stays unlimited by design (2026-09-20) — enforced upstream at the
  // provider gateway. Use originalUrl (not req.path) so the check works both
  // at the app level and when this middleware is reused inside a router.
  if (url.startsWith("/api/ai/guest")) return "guest-ai";
  if (url.startsWith("/api/ai/platform-guide")) return "guest-ai";
  // Matched on the exact path so the cheap image-history CRUD below it is
  // not charged against the drawing budget. The Google image search joins
  // this tier: it burns the free CSE quota (100/day) instead of a generation.
  const pathOnly = (url.split("?")[0] ?? "").replace(/\/+$/, "");
  if (
    pathOnly === "/api/ai/image" ||
    pathOnly === "/api/ai/figure" ||
    pathOnly === "/api/ai/image-search"
  ) {
    return "ai-image";
  }
  if (url.startsWith("/api/ai")) return "default-unlimited";
  return "default";
}

interface TierLimit {
  max: number;
  windowMs: number;
}

const TIERS: Record<Tier, TierLimit> = {
  // Support mail is a real outbound email: bound it per ACCOUNT (not per IP)
  // so a shared school network cannot mute legitimate deletion requests.
  support: { max: 5, windowMs: 60 * 60 * 1000 },
  auth: { max: AUTH_MAX_REQUESTS, windowMs: WINDOW_MS },
  oauth: { max: OAUTH_MAX_REQUESTS, windowMs: WINDOW_MS },
  "password-reset": { max: PASSWORD_RESET_MAX_REQUESTS, windowMs: PASSWORD_RESET_WINDOW_MS },
  "guest-ai": { max: MAX_REQUESTS, windowMs: WINDOW_MS },
  "ai-image": { max: AI_IMAGE_MAX_REQUESTS, windowMs: WINDOW_MS },
  default: { max: MAX_REQUESTS, windowMs: WINDOW_MS },
  "default-unlimited": { max: Infinity, windowMs: WINDOW_MS },
};

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  if (
    req.originalUrl.startsWith("/api/auth/oauth/csrf") ||
    req.originalUrl.startsWith("/api/auth/oauth/session")
  ) {
    res.setHeader("Cache-Control", "no-store");
  }
  applyLimit(req, res, next, tierFor(req.originalUrl), getClientIp(req));
}

/**
 * Account-scoped budget for support mail. Mount ONLY after `requireAuth`, so
 * `req.user` is trusted server state — never a client-supplied id.
 */
export function supportRequestLimit(req: Request, res: Response, next: NextFunction) {
  const user = (req as AuthedRequest).user;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  applyLimit(req, res, next, "support", user.id);
}

function applyLimit(
  req: Request,
  res: Response,
  next: NextFunction,
  tier: Tier,
  identity: string,
) {
  const limit = TIERS[tier] ?? TIERS.default;

  if (!Number.isFinite(limit.max)) {
    next();
    return;
  }

  // Long-lived process guard: drop expired entries before the Map can grow
  // unbounded under distributed-IP traffic (CDN/corp proxies).
  const now = Date.now();
  pruneExpiredHits(now);

  // Per-tier isolation (Greptile review 2026-09-25): one shared counter let a
  // heavy curriculum page (>10 content calls) consume the login/refresh budget
  // and 429 the user's next authentication attempt.
  const id = `${tier}:${identity}`;
  const entry = hits.get(id);

  if (!entry || now > entry.reset) {
    hits.set(id, { count: 1, reset: now + limit.windowMs });
    next();
    return;
  }

  entry.count += 1;

  if (entry.count > limit.max) {
    const retryAfterSec = Math.max(1, Math.ceil((entry.reset - now) / 1000));
    res.setHeader("Retry-After", String(retryAfterSec));
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  next();
}

/** Test hook: clear the in-memory hit counters. */
export function resetRateLimits(): void {
  hits.clear();
}
