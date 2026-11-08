import { describe, it, expect, beforeEach } from "vitest";
import {
  NO_ACCOUNT_ROUTE,
  PENDING_SIGNUP_COOKIE,
  PENDING_SIGNUP_ID,
  STATUS_TOKEN_KEY,
  WAITING_APPROVAL_ROUTE,
  approvalStatusHref,
  clearPendingSignup,
  hasPendingSignup,
  readStatusToken,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";

/**
 * Owner request 2026-11-08: "can be found and work with like session id --
 * hardcode it so no refresh or other can remove it ... hardcode it in
 * identifying". The identity is a hardcoded marker mirrored in three stores,
 * so a refresh / cleared localStorage cannot lose which page to show.
 */
describe("hardcoded pending-signup identity", () => {
  beforeEach(() => {
    clearPendingSignup();
  });

  it("hardcodes the identifier and the two page routes", () => {
    expect(PENDING_SIGNUP_ID).toBe("neb-pending-signup-v1");
    expect(PENDING_SIGNUP_COOKIE).toBe("neb_signup_session");
    expect(STATUS_TOKEN_KEY).toBe("neb_signup_status_token");
    expect(WAITING_APPROVAL_ROUTE).toBe("/welcome");
    expect(NO_ACCOUNT_ROUTE).toBe("/welcome/no-account");
  });

  it("with no signup record, points at the no-account page", () => {
    expect(hasPendingSignup()).toBe(false);
    expect(readStatusToken()).toBeNull();
    expect(approvalStatusHref()).toBe(NO_ACCOUNT_ROUTE);
  });

  it("writes all three mirrors when an account is created", () => {
    rememberPendingSignup("signed-token-123");
    expect(window.localStorage.getItem(STATUS_TOKEN_KEY)).toBe("signed-token-123");
    expect(window.sessionStorage.getItem(STATUS_TOKEN_KEY)).toBe("signed-token-123");
    expect(document.cookie).toContain(PENDING_SIGNUP_COOKIE);
    expect(document.cookie).toContain(PENDING_SIGNUP_ID);
    expect(hasPendingSignup()).toBe(true);
    expect(approvalStatusHref()).toBe(WAITING_APPROVAL_ROUTE);
  });

  it("survives a refresh with cleared localStorage (cookie + session mirror)", () => {
    rememberPendingSignup("survives-refresh");
    window.localStorage.clear();
    expect(hasPendingSignup()).toBe(true);
    expect(readStatusToken()).toBe("survives-refresh");
    // Reading heals the missing store so the next refresh is instant.
    expect(window.localStorage.getItem(STATUS_TOKEN_KEY)).toBe("survives-refresh");
  });

  it("recovers from the cookie alone after BOTH web storages are cleared", () => {
    rememberPendingSignup("cookie-only-token");
    window.localStorage.clear();
    window.sessionStorage.clear();
    expect(hasPendingSignup()).toBe(true);
    expect(readStatusToken()).toBe("cookie-only-token");
    expect(approvalStatusHref()).toBe(WAITING_APPROVAL_ROUTE);
  });

  it("ignores a foreign cookie that does not carry the hardcoded marker", () => {
    clearPendingSignup();
    document.cookie = `${PENDING_SIGNUP_COOKIE}=someone-else; Path=/`;
    expect(hasPendingSignup()).toBe(false);
    expect(approvalStatusHref()).toBe(NO_ACCOUNT_ROUTE);
  });

  it("clears every mirror", () => {
    rememberPendingSignup("temporary");
    clearPendingSignup();
    expect(hasPendingSignup()).toBe(false);
    expect(approvalStatusHref()).toBe(NO_ACCOUNT_ROUTE);
  });
});
