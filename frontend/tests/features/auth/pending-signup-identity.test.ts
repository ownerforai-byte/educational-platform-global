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
  STATUS_TOKEN_KEY,
  WAITING_APPROVAL_ROUTE,
  WAITING_ROUTE,
  approvalStatusHref,
  clearPendingSignup,
  deviceApprovalRoute,
  hasPendingSignup,
  readAccessOutcome,
  readStatusToken,
  rememberAccessOutcome,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";

describe("signup status-token storage + sync route hint", () => {
  beforeEach(() => {
    clearPendingSignup();
  });

  it("keeps the four page routes and identity keys", () => {
    expect(PENDING_SIGNUP_ID).toBe("neb-pending-signup-v1");
    expect(PENDING_SIGNUP_COOKIE).toBe("neb_signup_session");
    expect(STATUS_TOKEN_KEY).toBe("neb_signup_status_token");
    expect(ACCESS_OUTCOME_KEY).toBe("neb_signup_access_outcome");
    expect(NORMAL_ROUTE).toBe("/welcome/no-account");
    expect(WAITING_ROUTE).toBe("/welcome/pending");
    expect(APPROVED_ROUTE).toBe("/welcome/approved");
    expect(DENIED_ROUTE).toBe("/welcome/denied");
    expect(REJECTED_ROUTE).toBe(DENIED_ROUTE);
    expect(NO_ACCOUNT_ROUTE).toBe(NORMAL_ROUTE);
    expect(WAITING_APPROVAL_ROUTE).toBe(WAITING_ROUTE);
  });

  it("NORMAL — no token means no-account (outcome alone cannot invent a screen)", () => {
    rememberAccessOutcome("ACTIVE");
    expect(hasPendingSignup()).toBe(false);
    expect(readStatusToken()).toBeNull();
    expect(deviceApprovalRoute()).toBe(NORMAL_ROUTE);
    expect(approvalStatusHref()).toBe(NORMAL_ROUTE);
  });

  it("WAITING hint — token with PENDING outcome", () => {
    rememberPendingSignup("signed-token-123");
    expect(hasPendingSignup()).toBe(true);
    expect(readAccessOutcome()).toBe("PENDING");
    expect(deviceApprovalRoute()).toBe(WAITING_ROUTE);
  });

  it("APPROVED hint — ACTIVE outcome with token", () => {
    rememberPendingSignup("approved-token");
    rememberAccessOutcome("ACTIVE");
    expect(deviceApprovalRoute()).toBe(APPROVED_ROUTE);
  });

  it("DENIED hint — REJECTED outcome with token opens denied route", () => {
    rememberPendingSignup("denied-token");
    rememberAccessOutcome("REJECTED");
    expect(deviceApprovalRoute()).toBe(DENIED_ROUTE);
  });

  it("survives cleared localStorage via cookie mirrors", () => {
    rememberPendingSignup("survives-refresh");
    rememberAccessOutcome("PENDING");
    window.localStorage.clear();
    expect(hasPendingSignup()).toBe(true);
    expect(readStatusToken()).toBe("survives-refresh");
    expect(readAccessOutcome()).toBe("PENDING");
    expect(deviceApprovalRoute()).toBe(WAITING_ROUTE);
  });

  it("clears every mirror", () => {
    rememberPendingSignup("temporary");
    rememberAccessOutcome("ACTIVE");
    clearPendingSignup();
    expect(hasPendingSignup()).toBe(false);
    expect(readAccessOutcome()).toBeNull();
    expect(deviceApprovalRoute()).toBe(NORMAL_ROUTE);
  });
});
