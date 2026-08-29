import type { Request, Response, NextFunction } from "express";

/**
 * FRONTEND_URL may be a single origin or a comma-separated list, e.g.
 *   FRONTEND_URL=https://app.example.com,https://admin.example.com
 * The request Origin is reflected only when it matches an entry; no wildcard
 * is ever emitted (credentials are always allowed).
 */
export function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((o) => o.trim())
    .filter((o) => o.length > 0 && o !== "*");
}

export function getAllowedOrigins(): string[] {
  const origins = parseAllowedOrigins(process.env.FRONTEND_URL);
  if (origins.length === 0) {
    origins.push("http://localhost:5173");
  }
  return Array.from(new Set(origins));
}

export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  if (origin) {
    const allowed = getAllowedOrigins();
    if (allowed.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
}
