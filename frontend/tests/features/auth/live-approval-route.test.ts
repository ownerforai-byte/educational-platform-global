import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  APPROVED_ROUTE,
  NORMAL_ROUTE,
  DENIED_ROUTE,
  WAITING_ROUTE,
  clearPendingSignup,
  hasPendingSignup,
  rememberAccessOutcome,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";

const apiFetch = vi.hoisted(() => vi.fn());

vi.mock("@/lib/api-client", () => ({
  apiFetch: (...args: unknown[]) => apiFetch(...args),
}));

import {
  resolveLiveApprovalRoute,
  routeForLiveAccess,
} from "@/features/auth/live-approval-route";

describe("resolveLiveApprovalRoute", () => {
  beforeEach(() => {
    clearPendingSignup();
    apiFetch.mockReset();
  });

  it("maps live statuses to the four screens", () => {
    expect(routeForLiveAccess("PENDING")).toBe(WAITING_ROUTE);
    expect(routeForLiveAccess("ACTIVE")).toBe(APPROVED_ROUTE);
    expect(routeForLiveAccess("REJECTED")).toBe(DENIED_ROUTE);
  });

  it("NORMAL when there is no token — clears stale outcomes", async () => {
    rememberAccessOutcome("ACTIVE");
    await expect(resolveLiveApprovalRoute()).resolves.toBe(NORMAL_ROUTE);
    expect(apiFetch).not.toHaveBeenCalled();
    expect(hasPendingSignup()).toBe(false);
  });

  it("WAITING when live status is PENDING", async () => {
    rememberPendingSignup("tok");
    apiFetch.mockResolvedValue({ accessStatus: "PENDING", fullName: "Ada" });
    await expect(resolveLiveApprovalRoute()).resolves.toBe(WAITING_ROUTE);
  });

  it("APPROVED when live status is ACTIVE", async () => {
    rememberPendingSignup("tok");
    apiFetch.mockResolvedValue({ accessStatus: "ACTIVE" });
    await expect(resolveLiveApprovalRoute()).resolves.toBe(APPROVED_ROUTE);
  });

  it("DENIED when live status is REJECTED", async () => {
    rememberPendingSignup("tok");
    apiFetch.mockResolvedValue({ accessStatus: "REJECTED" });
    await expect(resolveLiveApprovalRoute()).resolves.toBe(DENIED_ROUTE);
  });

  it("clears identity and returns NORMAL when the account is gone", async () => {
    rememberPendingSignup("dead-token");
    const err = Object.assign(new Error("gone"), { status: 404 });
    apiFetch.mockRejectedValue(err);
    await expect(resolveLiveApprovalRoute()).resolves.toBe(NORMAL_ROUTE);
    expect(hasPendingSignup()).toBe(false);
  });
});
