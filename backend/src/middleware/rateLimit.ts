import { Request, Response, NextFunction } from "express";

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 20);
const MAX_KEYS = Number(process.env.RATE_LIMIT_MAX_KEYS || 5000);
const hits = new Map<string, { count: number; reset: number }>();
let cleanupInterval: NodeJS.Timeout;

function cleanupHits() {
  const now = Date.now();
  for (const [key, entry] of hits.entries()) {
    if (now > entry.reset) hits.delete(key);
  }
}

function initializeCleanup() {
  cleanupInterval = setInterval(cleanupHits, 60000);
}

initializeCleanup();

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
  const id = getClientId(req);
  const now = Date.now();
  const entry = hits.get(id);

  if (!entry || now > entry.reset) {
    hits.set(id, { count: 1, reset: now + WINDOW_MS });
    
    if (hits.size > MAX_KEYS) {
      const oldestKey = hits.keys().next().value;
      hits.delete(oldestKey);
    }
    
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
