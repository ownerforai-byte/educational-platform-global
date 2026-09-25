import { Request, Response, NextFunction } from "express";

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 20);

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

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  // AI endpoints are unlimited by design (2026-09-20): skip the per-IP cap for
  // authenticated /api/ai/*. Use originalUrl (not req.path) so the check works
  // both at the app level and when this middleware is reused inside a router.
  // Hardening 2026-09-25: /api/ai/guest is anonymous and still burns paid AI
  // credits, so it is NOT exempt — it gets the standard per-IP cap.
  if (req.originalUrl?.startsWith("/api/ai")) {
    if (!req.originalUrl.startsWith("/api/ai/guest")) {
      next();
      return;
    }
  }

  const id = getClientId(req);
  const now = Date.now();
  const entry = hits.get(id);

  if (!entry || now > entry.reset) {
    hits.set(id, { count: 1, reset: now + WINDOW_MS });
    next();
    return;
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  next();
}
