import { Request, Response, NextFunction } from "express";

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
// Global default per IP per window. Raised from 20 (2026-09-25): a normal
// curriculum page load fires a dozen parallel content calls and was tripping
// the old cap in real use.
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 60);
// Strict tier for credential endpoints: brute-force protection. Override with
// AUTH_RATE_LIMIT_MAX_REQUESTS if needed.
const AUTH_MAX_REQUESTS = Number(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || 10);

const hits = new Map<string, { count: number; reset: number }>();

function getClientId(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : forwarded[0]?.trim()
    : req.ip ?? "unknown";
  return ip;
}

/** Which tier does this request fall into? */
function tierFor(originalUrl: string | undefined): "auth" | "guest-ai" | "default" | "default-unlimited" {
  const url = originalUrl ?? "";
  // Auth endpoints: strictest (brute-force protection).
  if (url.startsWith("/api/auth/login") || url.startsWith("/api/auth/refresh")) {
    return "auth";
  }
  // Guest AI is anonymous and burns paid credits: standard cap. Authenticated
  // AI stays unlimited by design (2026-09-20) — enforced upstream at the
  // provider gateway. Use originalUrl (not req.path) so the check works both
  // at the app level and when this middleware is reused inside a router.
  if (url.startsWith("/api/ai/guest")) return "guest-ai";
  if (url.startsWith("/api/ai")) return "default-unlimited";
  return "default";
}

const TIERS: Record<string, number> = {
  auth: AUTH_MAX_REQUESTS,
  "guest-ai": MAX_REQUESTS,
  default: MAX_REQUESTS,
  "default-unlimited": Infinity,
};

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const tier = tierFor(req.originalUrl);
  const max = TIERS[tier] ?? MAX_REQUESTS;

  if (max === Infinity) {
    next();
    return;
  }

  // Long-lived process guard: drop expired entries before the Map can grow
  // unbounded under distributed-IP traffic (CDN/corp proxies).
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, entry] of hits) {
      if (now > entry.reset) hits.delete(key);
    }
  }

  const id = getClientId(req);
  const entry = hits.get(id);

  if (!entry || now > entry.reset) {
    hits.set(id, { count: 1, reset: now + WINDOW_MS });
    next();
    return;
  }

  entry.count += 1;

  if (entry.count > max) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  next();
}

/** Test hook: clear the in-memory hit counters. */
export function resetRateLimits(): void {
  hits.clear();
}
