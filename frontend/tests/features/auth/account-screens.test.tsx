import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  clearPendingSignup,
  rememberAccessOutcome,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";
import { NO_ACCOUNT_MESSAGE } from "@/features/auth/components/no-account-card";

const nav = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      replace: nav.replace,
      push: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

import {
  ApprovedScreen,
  NoAccountScreen,
  RejectedScreen,
  WelcomeApprovalScreen,
} from "@/features/auth/components/account-screen-gate";

const WAITING_BODY = <div data-testid="waiting-body">the live status stepper</div>;

beforeEach(() => {
  clearPendingSignup();
  nav.replace.mockClear();
});

describe("four hardcoded approval screens", () => {
  it("NORMAL — visitor with no account stays on no-account", () => {
    render(<NoAccountScreen />);
    expect(screen.getByTestId("no-account-card")).toBeInTheDocument();
    expect(screen.getByTestId("no-account-message").textContent).toBe(NO_ACCOUNT_MESSAGE);
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("WAITING — only a PENDING device sees the waiting shell", () => {
    rememberPendingSignup("signed-status-token");
    render(<WelcomeApprovalScreen waiting={WAITING_BODY} />);
    expect(screen.getByText(/Your account is on its way/i)).toBeInTheDocument();
    expect(screen.getByTestId("waiting-body")).toBeInTheDocument();
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("WAITING — no-account visitor is redirected off the waiting page", () => {
    render(<WelcomeApprovalScreen waiting={WAITING_BODY} />);
    expect(screen.queryByTestId("waiting-body")).toBeNull();
    expect(nav.replace).toHaveBeenCalledWith("/welcome/no-account");
  });

  it("APPROVED — ACTIVE outcome opens the approved screen", () => {
    rememberPendingSignup("tok");
    rememberAccessOutcome("ACTIVE");
    render(<ApprovedScreen />);
    expect(screen.getByTestId("approved-account-card")).toBeInTheDocument();
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("REJECTED — REJECTED outcome opens the rejected screen", () => {
    rememberPendingSignup("tok");
    rememberAccessOutcome("REJECTED");
    render(<RejectedScreen />);
    expect(screen.getByTestId("rejected-account-card")).toBeInTheDocument();
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("sends a PENDING device away from the no-account page", () => {
    rememberPendingSignup("signed-status-token");
    render(<NoAccountScreen />);
    expect(screen.queryByTestId("no-account-card")).toBeNull();
    expect(nav.replace).toHaveBeenCalledWith("/welcome/pending");
  });
});

describe("account-screen wiring", () => {
  const read = (p: string) => readFileSync(path.resolve(p), "utf8");

  it("wires all four routes plus the /welcome dispatcher", () => {
    expect(read("app/welcome/page.tsx")).toContain("ApprovalDispatch");
    expect(read("app/welcome/no-account/page.tsx")).toContain("NoAccountScreen");
    expect(read("app/welcome/pending/page.tsx")).toContain("WelcomeApprovalScreen");
    expect(read("app/welcome/approved/page.tsx")).toContain("ApprovedScreen");
    expect(read("app/welcome/rejected/page.tsx")).toContain("RejectedScreen");
  });

  it("uses the hardcoded device router in gates and the access link", () => {
    const gate = read("features/auth/components/account-screen-gate.tsx");
    expect(gate).toContain("deviceApprovalRoute()");
    expect(read("features/auth/components/require-approval.tsx")).toContain(
      "deviceApprovalRoute()",
    );
  });
});
