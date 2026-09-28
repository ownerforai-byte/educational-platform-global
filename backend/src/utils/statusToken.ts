import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed, expiring status token (owner-approval signup flow, 2026-09-26).
 *
 * After signup the account is PENDING and gets NO session. The user is
 * handed this token instead so their status screen can poll
 * GET /api/auth/account-status without being logged in — and WITHOUT an
 * endpoint that leaks "is this email registered?" to anyone who asks
 * (possession of a valid token is required).
 *
 * Format: v1.<base64url userId>.<expiry ms>.<hex hmac>
 * Key: the Supabase service-role key (server-side secret, never shipped).
 */

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days to get approved

function hmac(payload: string): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
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
    // uuid-shaped sanity check — the token must name exactly one user.
    return /^[0-9a-f-]{36}$/i.test(userId) ? userId : null;
  } catch {
    return null;
  }
}
