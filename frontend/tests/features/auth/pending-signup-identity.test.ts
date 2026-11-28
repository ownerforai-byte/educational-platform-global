import { describe, it, expect, beforeEach } from "vitest";
import {
  ACCESS_OUTCOME_KEY,
  APPROVED_ROUTE,
  NORMAL_ROUTE,
  NO_ACCOUNT_ROUTE,
  PENDING_SIGNUP_COOKIE,
  PENDING_SIGNUP_ID,
  DENIED_ROUTE,
  REJECTED_ROUTE,
  WAITING_APPROVAL_ROUTE,
  WAITING_ROUTE,
  approvalStatusHref,
  clearPendingSignup,
  deviceApprovalRoute,
  hasPendingSignup,
  readAccessOutcome,
  rememberAccessOutcome,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";

const LEGACY_TOKEN_KEY = "neb_signup_status_token";

describe("signup marker + sync route hint", () => {
  beforeEach(() => {
    clearPendingSignup();
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("keeps the four page routes and non-secret identity keys", () => {
    expect(PENDING_SIGNUP_ID).toBe("neb-pending-signup-v1");
    expect(PENDING_SIGNUP_COOKIE).toBe("neb_signup_session");
    expect(ACCESS_OUTCOME_KEY).toBe("neb_signup_access_outcome");
    expect(NORMAL_ROUTE).toBe("/welcome/no-account");
    expect(WAITING_ROUTE).toBe("/welcome/pending");
    expect(APPROVED_ROUTE).toBe("/welcome/approved");
    expect(DENIED_ROUTE).toBe("/welcome/denied");
    expect(REJECTED_ROUTE).toBe(DENIED_ROUTE);
    expect(NO_ACCOUNT_ROUTE).toBe(NORMAL_ROUTE);
    expect(WAITING_APPROVAL_ROUTE).toBe(WAITING_ROUTE);
  });

  it("NORMAL — no marker means no-account (outcome alone cannot invent a screen)", () => {
    rememberAccessOutcome("ACTIVE");
    expect(hasPendingSignup()).toBe(false);
    expect(deviceApprovalRoute()).toBe(NORMAL_ROUTE);
    expect(approvalStatusHref()).toBe(NORMAL_ROUTE);
  });

  it("WAITING hint — marker with PENDING outcome", () => {
    rememberPendingSignup();
    expect(hasPendingSignup()).toBe(true);
    expect(readAccessOutcome()).toBe("PENDING");
    expect(deviceApprovalRoute()).toBe(WAITING_ROUTE);
  });

  it("APPROVED hint — ACTIVE outcome with marker", () => {
    rememberPendingSignup();
    rememberAccessOutcome("ACTIVE");
    expect(deviceApprovalRoute()).toBe(APPROVED_ROUTE);
  });

  it("DENIED hint — REJECTED outcome with marker opens denied route", () => {
    rememberPendingSignup();
    rememberAccessOutcome("REJECTED");
    expect(deviceApprovalRoute()).toBe(DENIED_ROUTE);
  });

  it("survives cleared localStorage via the non-secret cookie marker", () => {
    rememberPendingSignup();
    window.localStorage.clear();
    expect(hasPendingSignup()).toBe(true);
    expect(readAccessOutcome()).toBe("PENDING");
    expect(deviceApprovalRoute()).toBe(WAITING_ROUTE);
  });

  it("never stores a signed credential and purges legacy token mirrors", () => {
    window.localStorage.setItem(LEGACY_TOKEN_KEY, "legacy-secret");
    window.sessionStorage.setItem(LEGACY_TOKEN_KEY, "legacy-secret");
    rememberPendingSignup();
    expect(window.localStorage.getItem(LEGACY_TOKEN_KEY)).toBeNull();
    expect(window.sessionStorage.getItem(LEGACY_TOKEN_KEY)).toBeNull();
    expect(document.cookie).not.toContain("legacy-secret");
    expect(document.cookie).toContain(`${PENDING_SIGNUP_COOKIE}=${PENDING_SIGNUP_ID}`);
  });

  it("purges a legacy signed marker cookie without accepting it as a route hint", () => {
    document.cookie = `${PENDING_SIGNUP_COOKIE}=${PENDING_SIGNUP_ID}:legacy-secret; Path=/; SameSite=Lax`;

    expect(hasPendingSignup()).toBe(false);
    expect(document.cookie).not.toContain(`${PENDING_SIGNUP_COOKIE}=`);
    expect(document.cookie).not.toContain("legacy-secret");
  });

  it("clears every non-secret hint", () => {
    rememberPendingSignup();
    rememberAccessOutcome("ACTIVE");
    clearPendingSignup();
    expect(hasPendingSignup()).toBe(false);
    expect(readAccessOutcome()).toBeNull();
    expect(deviceApprovalRoute()).toBe(NORMAL_ROUTE);
  });
});
