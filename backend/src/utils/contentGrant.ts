import crypto from "crypto";
import { isProductionEnv } from "../config/env";

/**
 * Stateless unlock grant for spark-gated content bodies.
 *
 * The spark unlock window itself lives on the client, so the server cannot look
 * it up. Instead POST /api/user/credits/unlock (after the tier check and the
 * spend or free path) mints a signed token binding {userId, moduleKey,
 * expiresAt}; POST /api/content/reveal verifies it. Revealing never touches the
 * credits balance.
 */

export interface GrantPayload {
  uid: string;
  key: string;
  exp: number; // epoch seconds
}

function secret(): string {
  const configured =
    process.env.CONTENT_GRANT_SECRET?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (configured) return configured;
  if (isProductionEnv()) {
    throw new Error("CONTENT_GRANT_SECRET (or SUPABASE_SERVICE_ROLE_KEY) is required in production");
  }
  return "dev-only-content-grant-secret";
}

function mac(body: string): string {
  return crypto.createHmac("sha256", secret()).update(body).digest("base64url");
}

export function signGrant(userId: string, moduleKey: string, expiresAt: number): string {
  const body = Buffer.from(JSON.stringify({ uid: userId, key: moduleKey, exp: expiresAt } satisfies GrantPayload)).toString("base64url");
  return `${body}.${mac(body)}`;
}

/** Returns the payload when the signature is valid, else null (never throws on bad input). */
export function verifyGrant(token: unknown): GrantPayload | null {
  if (typeof token !== "string" || token.length > 2048) return null;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot !== token.lastIndexOf(".")) return null;
  const body = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1));
  let expected: Buffer;
  try {
    expected = Buffer.from(mac(body));
  } catch {
    return null;
  }
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as GrantPayload;
    if (typeof p.uid !== "string" || typeof p.key !== "string" || typeof p.exp !== "number") return null;
    return p;
  } catch {
    return null;
  }
}

/** True when the token is valid, for this user and module, and not expired. */
export function grantAllows(token: unknown, userId: string, moduleKey: string, nowSeconds = Math.floor(Date.now() / 1000)): boolean {
  const p = verifyGrant(token);
  return !!p && p.uid === userId && p.key === moduleKey && p.exp > nowSeconds;
}
