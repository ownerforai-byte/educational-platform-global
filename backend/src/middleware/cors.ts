import { isProductionEnv } from "../config/env";

/**
 * FRONTEND_URL may be a single origin or a comma-separated list, e.g.
 *   FRONTEND_URL=https://app.example.com,https://admin.example.com
 * The request Origin is reflected only when it matches an entry; no wildcard
 * is ever emitted (credentials are always allowed).
 *
 * In non-production builds, *.vercel.app origins are still accepted for legacy
 * preview hosts. Production must list every live frontend origin in
 * FRONTEND_URL (comma-separated) and/or the apex default below.
 */
export const PRODUCTION_APEX_ORIGIN = "https://harindrasah.com.np";

/** Default App Hosting URL — allow API credentialed calls during cutover smoke. */
export const APP_HOSTING_DEFAULT_ORIGIN =
  "https://harindrasah-web--rn01-af00b.asia-southeast1.hosted.app";

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
    origins.push(
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
      "http://0.0.0.0:3000"
    );
  }
  if (!origins.includes(PRODUCTION_APEX_ORIGIN)) {
    origins.push(PRODUCTION_APEX_ORIGIN);
  }
  if (!origins.includes(APP_HOSTING_DEFAULT_ORIGIN)) {
    origins.push(APP_HOSTING_DEFAULT_ORIGIN);
  }
  return Array.from(new Set(origins));
}

/**
 * Hardening 2026-09-25: in production only the configured FRONTEND_URL
 * allowlist is accepted — preview-host wildcard rules let anyone host a
 * phishing frontend that talks to this API with credentials.
 * Development stays permissive (localhost ports, preview wildcards) so local
 * work and previews keep flowing.
 */
export function isOriginAllowed(origin: string): boolean {
  if (!origin) return true;
  const allowed = getAllowedOrigins();
  if (allowed.length > 0 && allowed.includes(origin)) return true;
  try {
    const url = new URL(origin);
    const isLocalhost =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "0.0.0.0";
    const isPreviewHost =
      url.hostname.endsWith(".vercel.app") ||
      url.hostname.endsWith(".google.com") ||
      url.hostname.endsWith(".googleusercontent.com");

    if (!isProductionEnv()) {
      return isLocalhost || isPreviewHost;
    }

    // Production: exact allowlist only (isOriginAllowed callers reflect the
    // origin, so no wildcard match can smuggle credentials through).
    return false;
  } catch {
    // not a valid URL — fall through
  }
  return false;
}

