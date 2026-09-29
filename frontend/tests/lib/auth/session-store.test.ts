import { describe, it, expect, beforeEach } from "vitest";
import {
  clearCachedSession,
  decodeTokenExpiryMs,
  isTokenExpiringSoon,
  readCachedSession,
  writeCachedSession,
} from "@/lib/auth/session-store";
import type { SessionUser } from "@/features/auth/types";

/** Builds an unsigned JWT with the given claims (only the payload is read). */
function fakeJwt(claims: Record<string, unknown>): string {
  const base64url = (value: unknown) =>
    Buffer.from(JSON.stringify(value))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  return `${base64url({ alg: "HS256", typ: "JWT" })}.${base64url(claims)}.signature`;
}

const USER: SessionUser = {
  id: "user-1",
  email: "student@example.com",
  fullName: "A Student",
  role: "STUDENT",
};

describe("session-store", () => {
  beforeEach(() => {
    clearCachedSession();
  });

  it("decodes the JWT exp claim to epoch ms", () => {
    const token = fakeJwt({ exp: 1_700_000_000 });
    expect(decodeTokenExpiryMs(token)).toBe(1_700_000_000_000);
  });

  it("returns null for opaque or malformed tokens", () => {
    expect(decodeTokenExpiryMs(null)).toBeNull();
    expect(decodeTokenExpiryMs(undefined)).toBeNull();
    expect(decodeTokenExpiryMs("")).toBeNull();
    expect(decodeTokenExpiryMs("not-a-jwt")).toBeNull();
    expect(decodeTokenExpiryMs("a.@@not-base64@@.c")).toBeNull();
    expect(decodeTokenExpiryMs(fakeJwt({ sub: "no-exp-claim" }))).toBeNull();
  });

  it("round-trips a user and its token expiry", () => {
    const token = fakeJwt({ exp: 1_800_000_000 });
    writeCachedSession(USER, token);

    const cached = readCachedSession();
    expect(cached?.user).toEqual(USER);
    expect(cached?.accessToken).toBe(token);
    expect(cached?.expiresAt).toBe(1_800_000_000_000);
    expect(typeof cached?.savedAt).toBe("number");
  });

  it("ignores writes without a usable user and survives corrupt storage", () => {
    writeCachedSession(null, "token");
    expect(readCachedSession()).toBeNull();

    writeCachedSession(undefined, "token");
    expect(readCachedSession()).toBeNull();

    localStorage.setItem("rvk:session", "{not json");
    expect(readCachedSession()).toBeNull();

    localStorage.setItem("rvk:session", JSON.stringify({ user: { email: "x" } }));
    expect(readCachedSession()).toBeNull();
  });

  it("clears the cached session", () => {
    writeCachedSession(USER, fakeJwt({ exp: 1_800_000_000 }));
    expect(readCachedSession()).not.toBeNull();
    clearCachedSession();
    expect(readCachedSession()).toBeNull();
  });

  describe("isTokenExpiringSoon", () => {
    const skew = 5 * 60 * 1000;

    it("is true for a token expiring inside the skew window", () => {
      const soon = fakeJwt({ exp: Math.floor((Date.now() + 60_000) / 1000) });
      expect(isTokenExpiringSoon(soon, skew)).toBe(true);
    });

    it("is true for an already expired token", () => {
      const expired = fakeJwt({ exp: Math.floor((Date.now() - 60_000) / 1000) });
      expect(isTokenExpiringSoon(expired, skew)).toBe(true);
    });

    it("is false for a token that is still comfortably valid", () => {
      const healthy = fakeJwt({ exp: Math.floor((Date.now() + 45 * 60_000) / 1000) });
      expect(isTokenExpiringSoon(healthy, skew)).toBe(false);
    });

    it("falls back to the cached token, and treats 'unknown' as renew-now", () => {
      expect(isTokenExpiringSoon(null, skew)).toBe(true);

      const healthy = fakeJwt({ exp: Math.floor((Date.now() + 45 * 60_000) / 1000) });
      writeCachedSession(USER, healthy);
      expect(isTokenExpiringSoon(undefined, skew)).toBe(false);
    });
  });
});
