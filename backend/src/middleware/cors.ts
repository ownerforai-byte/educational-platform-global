import type { Request, Response, NextFunction } from "express";

/**
 * FRONTEND_URL may be a single origin or a comma-separated list, e.g.
 *   FRONTEND_URL=https://app.example.com,https://admin.example.com
 * The request Origin is reflected only when it matches an entry; no wildcard
 * is ever emitted (credentials are always allowed).
 *
 * On Vercel, each deployment gets a unique *.vercel.app URL, so we also
 * accept any *.vercel.app origin when FRONTEND_URL is not set.  For
 * production, always set FRONTEND_URL to your custom domain.
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
    origins.push("http://localhost:5173", "http://localhost:3000", "http://0.0.0.0:3000");
  }
  return Array.from(new Set(origins));
}

/** Check if a given origin is allowed. */
export function isOriginAllowed(origin: string): boolean {
  if (!origin) return true;
  const allowed = getAllowedOrigins();
  if (allowed.includes(origin)) return true;
  try {
    const url = new URL(origin);
    if (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "0.0.0.0"
    ) {
      return true;
    }
    if (
      url.hostname.endsWith(".vercel.app") ||
      url.hostname.endsWith(".onrender.com") ||
      url.hostname.endsWith(".google.com") ||
      url.hostname.endsWith(".googleusercontent.com")
    ) {
      return true;
    }
    // In development or preview environments, allow cross-origin requests
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
  } catch {
    // not a valid URL — fall through
  }
  return false;
}

export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
}
