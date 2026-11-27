"use client";

/**
 * Persisted session ("stay signed in") store.
 *
 * The access and refresh tokens live in httpOnly cookies; this store only
 * caches the last server-validated user and the access token's expiry hint.
 * Keeping the expiry without the token lets the provider renew before a
 * request fails without creating an XSS-exfiltratable credential copy.
 *
 * The cache is a display/renewal concern only: every real request still
 * carries the cookie/bearer token and the backend remains the sole authority.
 */
import type { SessionUser } from "@/features/auth/types";

/** localStorage key holding the last validated session. */
const SESSION_KEY = "rvk:session";

export interface CachedSession {
  user: SessionUser;
  /** Epoch ms at which the access token stops being accepted (JWT `exp`). */
  expiresAt: number | null;
  /** Epoch ms this record was written. */
  savedAt: number;
}

/**
 * Reads the `exp` claim out of a JWT and returns it as epoch milliseconds.
 * Returns null for anything that is not a decodable JWT (opaque tokens), so
 * callers can fall back to letting the server decide.
 */
export function decodeTokenExpiryMs(token: string | null | undefined): number | null {
  if (!token) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json =
      typeof atob === "function"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("binary");
    const claims = JSON.parse(json) as { exp?: number };
    return typeof claims.exp === "number" ? claims.exp * 1000 : null;
  } catch {
    return null;
  }
}

function isSessionUser(value: unknown): value is SessionUser {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SessionUser>;
  return typeof candidate.id === "string" && typeof candidate.email === "string";
}

/** Last validated session, or null when there is nothing usable cached. */
export function readCachedSession(): CachedSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedSession> & { accessToken?: unknown };
    if (!isSessionUser(parsed.user)) return null;
    const cached: CachedSession = {
      user: parsed.user,
      expiresAt: typeof parsed.expiresAt === "number" ? parsed.expiresAt : null,
      savedAt: typeof parsed.savedAt === "number" ? parsed.savedAt : 0,
    };
    if (typeof parsed.accessToken === "string") {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(cached));
    }
    return cached;
  } catch {
    return null;
  }
}

/** Stores a freshly validated user (login, signup, refresh, /me). */
export function writeCachedSession(
  user: SessionUser | null | undefined,
  accessToken?: string | null,
): void {
  if (typeof window === "undefined") return;
  if (!isSessionUser(user)) return;
  try {
    const record: CachedSession = {
      user,
      expiresAt: decodeTokenExpiryMs(accessToken),
      savedAt: Date.now(),
    };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(record));
  } catch {
    // Private mode / quota exceeded — the session simply is not cached.
  }
}

/** Forgets the cached session (ignored by the backend, which stays authoritative). */
export function clearCachedSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

/**
 * True when the access token expires within `skewMs`, is already expired, or
 * has an expiry we cannot determine. Unknown must count as "renew now": the
 * cookie may still be valid even when localStorage was cleared.
 */
export function isTokenExpiringSoon(
  token: string | null | undefined,
  skewMs: number,
): boolean {
  const expiresAt = token
    ? decodeTokenExpiryMs(token)
    : readCachedSession()?.expiresAt ?? null;
  if (expiresAt === null) return true;
  return expiresAt - Date.now() <= skewMs;
}
