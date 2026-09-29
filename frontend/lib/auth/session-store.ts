"use client";

/**
 * Persisted session ("stay signed in") store.
 *
 * The access token already lived in localStorage (`sb-access-token`), but the
 * *validated user* did not. So on every reload the app started out believing it
 * was signed out and waitied for `GET /api/auth/me` — and because that call is
 * an `auth/*` path the api-client deliberately never refreshes, an expired
 * (1 hour) access token answered 401 and the provider cleared the session even
 * though the 30-day refresh cookie was still valid. Result: log in again.
 *
 * This module keeps the last server-validated user beside the token so:
 *   • the UI renders the correct state immediately on reload (no flicker,
 *     no spurious "Sign in" button),
 *   • the provider can tell "definitely signed out" apart from "we could not
 *     reach the backend" (cold start, offline) and keep the session in the
 *     second case,
 *   • the access token's own `exp` is readable, so renewal can happen *before*
 *     a request is ever rejected.
 *
 * The cache is a *display* concern only: every real request still carries the
 * cookie/bearer token and the backend stays the only authority on access.
 */
import type { SessionUser } from "@/features/auth/types";

/** localStorage key holding the last validated session. */
const SESSION_KEY = "rvk:session";

export interface CachedSession {
  user: SessionUser;
  accessToken: string | null;
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
    const parsed = JSON.parse(raw) as Partial<CachedSession>;
    if (!isSessionUser(parsed.user)) return null;
    return {
      user: parsed.user,
      accessToken: typeof parsed.accessToken === "string" ? parsed.accessToken : null,
      expiresAt: typeof parsed.expiresAt === "number" ? parsed.expiresAt : null,
      savedAt: typeof parsed.savedAt === "number" ? parsed.savedAt : 0,
    };
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
    const token = accessToken ?? null;
    const record: CachedSession = {
      user,
      accessToken: token,
      expiresAt: decodeTokenExpiryMs(token),
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
  const candidate = token ?? readCachedSession()?.accessToken ?? null;
  const expiresAt = decodeTokenExpiryMs(candidate);
  if (expiresAt === null) return true;
  return expiresAt - Date.now() <= skewMs;
}
