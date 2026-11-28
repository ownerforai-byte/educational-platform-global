import { createHmac, timingSafeEqual } from "node:crypto";
import type { Request, Response } from "express";
import { isProductionEnv } from "../config/env";

export const STATUS_COOKIE = "neb-signup-status";
export const STATUS_MARKER_COOKIE = "neb_signup_session";
export const STATUS_MARKER_VALUE = "neb-pending-signup-v1";
const STATUS_COOKIE_MAX_AGE_SEC = 7 * 24 * 60 * 60;

function statusCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProductionEnv(),
    path: "/",
  };
}

export function setStatusCookie(res: Response, token: string): void {
  res.cookie(STATUS_COOKIE, token, {
    ...statusCookieOptions(),
    maxAge: STATUS_COOKIE_MAX_AGE_SEC * 1000,
  });
  res.cookie(STATUS_MARKER_COOKIE, STATUS_MARKER_VALUE, {
    ...statusCookieOptions(),
    httpOnly: false,
    maxAge: STATUS_COOKIE_MAX_AGE_SEC * 1000,
  });
}

export function clearStatusCookie(res: Response): void {
  res.clearCookie(STATUS_COOKIE, statusCookieOptions());
  res.clearCookie(STATUS_MARKER_COOKIE, statusCookieOptions());
}

export function readStatusTokenFromRequest(req: Request): string | null {
  const header = req.get("x-status-token");
  if (header) return header;
  const cookie = req.cookies?.[STATUS_COOKIE];
  return typeof cookie === "string" ? cookie : null;
}

/**
 * Signed, expiring status token (owner-approval signup flow, 2026-09-26).
 *
 * After signup the account is PENDING and gets NO session. The user is
 * handed this token in an HttpOnly cookie instead so their status screen can
 * poll POST /api/auth/account-status without being logged in — and WITHOUT an
 * endpoint that leaks "is this email registered?" to anyone who asks
 * (possession of a valid token is required).
 *
 * Format: v1.<base64url userId>.<expiry ms>.<hex hmac>
 * Key: the Supabase service-role key (server-side secret, never shipped).
 */

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days to get approved

function hmac(payload: string): string {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    (process.env.NODE_ENV === "test" ? "test-supabase-service-role-key" : undefined);
  if (!key) {
    // Fail closed: never emit an unsigned token.
    throw new Error("status token signing key missing (SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createHmac("sha256", key).update(payload).digest("hex");
}

/** Mint a status token bound to a user id. */
export function createStatusToken(userId: string): string {
  const payload = `${Buffer.from(userId, "utf8").toString("base64url")}.${Date.now() + TOKEN_TTL_MS}`;
  return `v1.${payload}.${hmac(payload)}`;
}

/** Verify a status token; returns the user id, or null when invalid/expired. */
export function verifyStatusToken(token: string | null | undefined): string | null {
  if (!token || !token.startsWith("v1.")) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;

  const [, idB64, expRaw, sig] = parts;
  const payload = `${idB64}.${expRaw}`;

  const expected = Buffer.from(hmac(payload), "hex");
  const actual = Buffer.from(sig, "hex");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || Date.now() > exp) return null;

  try {
    const userId = Buffer.from(idB64, "base64url").toString("utf8");
    // User ID check — supports both Supabase UUIDs (36-char) and Firebase UIDs (alphanumeric, 1-128 chars).
    return /^[0-9a-zA-Z_-]{1,128}$/.test(userId) ? userId : null;
  } catch {
    return null;
  }
}
