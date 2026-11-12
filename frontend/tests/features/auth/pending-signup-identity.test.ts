import { describe, it, expect, beforeEach } from "vitest";
import {
  ACCESS_OUTCOME_KEY,
  APPROVED_ROUTE,
  NORMAL_ROUTE,
  NO_ACCOUNT_ROUTE,
  PENDING_SIGNUP_COOKIE,
  PENDING_SIGNUP_ID,
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

describe("hardcoded device approval screens", () => {
  beforeEach(() => {
    clearPendingSignup();
  });

  it("hardcodes the four page routes and identity keys", () => {
    expect(PENDING_SIGNUP_ID).toBe("neb-pending-signup-v1");
    expect(PENDING_SIGNUP_COOKIE).toBe("neb_signup_session");
    expect(STATUS_TOKEN_KEY).toBe("neb_signup_status_token");
    expect(ACCESS_OUTCOME_KEY).toBe("neb_signup_access_outcome");
    expect(NORMAL_ROUTE).toBe("/welcome/no-account");
    expect(WAITING_ROUTE).toBe("/welcome/pending");
    expect(APPROVED_ROUTE).toBe("/welcome/approved");
    expect(REJECTED_ROUTE).toBe("/welcome/rejected");
    expect(NO_ACCOUNT_ROUTE).toBe(NORMAL_ROUTE);
    expect(WAITING_APPROVAL_ROUTE).toBe(WAITING_ROUTE);
  });

  it("NORMAL — no signup record on this device", () => {
    expect(hasPendingSignup()).toBe(false);
    expect(readStatusToken()).toBeNull();
    expect(readAccessOutcome()).toBeNull();
    expect(deviceApprovalRoute()).toBe(NORMAL_ROUTE);
    expect(approvalStatusHref()).toBe(NORMAL_ROUTE);
  });

  it("WAITING — token on device defaults to PENDING", () => {
    rememberPendingSignup("signed-token-123");
    expect(hasPendingSignup()).toBe(true);
    expect(readAccessOutcome()).toBe("PENDING");
    expect(deviceApprovalRoute()).toBe(WAITING_ROUTE);
  });

  it("APPROVED — ACTIVE outcome wins for this device", () => {
    rememberPendingSignup("approved-token");
    rememberAccessOutcome("ACTIVE");
    expect(deviceApprovalRoute()).toBe(APPROVED_ROUTE);
  });

  it("REJECTED — REJECTED outcome wins even after token heal", () => {
    rememberPendingSignup("rejected-token");
    rememberAccessOutcome("REJECTED");
    expect(deviceApprovalRoute()).toBe(REJECTED_ROUTE);
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
