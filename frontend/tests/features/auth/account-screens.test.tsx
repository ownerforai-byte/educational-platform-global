import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  clearPendingSignup,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";
import { NO_ACCOUNT_MESSAGE } from "@/features/auth/components/no-account-card";

const nav = vi.hoisted(() => ({ replace: vi.fn() }));
const apiFetch = vi.hoisted(() => vi.fn());

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

vi.mock("@/lib/api-client", () => ({
  apiFetch: (...args: unknown[]) => apiFetch(...args),
}));

import {
  ApprovedScreen,
  NoAccountScreen,
  DeniedScreen,
  WelcomeApprovalScreen,
} from "@/features/auth/components/account-screen-gate";

const WAITING_BODY = <div data-testid="waiting-body">the live status stepper</div>;

beforeEach(() => {
  clearPendingSignup();
  nav.replace.mockClear();
  apiFetch.mockReset();
});

describe("live approval screens", () => {
  it("NORMAL — visitor with no live signup stays on no-account", async () => {
    render(<NoAccountScreen />);
    await waitFor(() => {
      expect(screen.getByTestId("no-account-card")).toBeInTheDocument();
    });
    expect(screen.getByTestId("no-account-message").textContent).toBe(NO_ACCOUNT_MESSAGE);
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("WAITING — only a live PENDING signup sees the waiting shell", async () => {
    rememberPendingSignup("signed-status-token");
    apiFetch.mockResolvedValue({ accessStatus: "PENDING", fullName: "Ada" });
    render(<WelcomeApprovalScreen waiting={WAITING_BODY} />);
    await waitFor(() => {
      expect(screen.getByText(/Your account is on its way/i)).toBeInTheDocument();
    });
    expect(screen.getByTestId("waiting-body")).toBeInTheDocument();
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("WAITING — no-account visitor is redirected off the waiting page", async () => {
    render(<WelcomeApprovalScreen waiting={WAITING_BODY} />);
    await waitFor(() => {
      expect(nav.replace).toHaveBeenCalledWith("/welcome/no-account");
    });
    expect(screen.queryByTestId("waiting-body")).toBeNull();
  });

  it("APPROVED — live ACTIVE opens the approved screen", async () => {
    rememberPendingSignup("tok");
    apiFetch.mockResolvedValue({ accessStatus: "ACTIVE" });
    render(<ApprovedScreen />);
    await waitFor(() => {
      expect(screen.getByTestId("approved-account-card")).toBeInTheDocument();
    });
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("DENIED — live REJECTED opens the denied screen", async () => {
    rememberPendingSignup("tok");
    apiFetch.mockResolvedValue({ accessStatus: "REJECTED" });
    render(<DeniedScreen />);
    await waitFor(() => {
      expect(screen.getByTestId("denied-account-card")).toBeInTheDocument();
    });
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("sends a live PENDING signup away from the no-account page", async () => {
    rememberPendingSignup("signed-status-token");
    apiFetch.mockResolvedValue({ accessStatus: "PENDING" });
    render(<NoAccountScreen />);
    await waitFor(() => {
      expect(nav.replace).toHaveBeenCalledWith("/welcome/pending");
    });
    expect(screen.queryByTestId("no-account-card")).toBeNull();
  });

  it("stale token for a deleted account is cleared to no-account", async () => {
    rememberPendingSignup("dead-token");
    apiFetch.mockRejectedValue(Object.assign(new Error("gone"), { status: 404 }));
    render(<WelcomeApprovalScreen waiting={WAITING_BODY} />);
    await waitFor(() => {
      expect(nav.replace).toHaveBeenCalledWith("/welcome/no-account");
    });
  });
});

describe("account-screen wiring", () => {
  const read = (p: string) => readFileSync(path.resolve(p), "utf8");

  it("wires all four routes plus the /welcome dispatcher", () => {
    expect(read("app/welcome/page.tsx")).toContain("ApprovalDispatch");
    expect(read("app/welcome/no-account/page.tsx")).toContain("NoAccountScreen");
    expect(read("app/welcome/pending/page.tsx")).toContain("WelcomeApprovalScreen");
    expect(read("app/welcome/approved/page.tsx")).toContain("ApprovedScreen");
    expect(read("app/welcome/denied/page.tsx")).toContain("DeniedScreen");
    expect(read("app/welcome/rejected/page.tsx")).toContain("DENIED_ROUTE");
  });

  it("gates and access link use live resolution", () => {
    const gate = read("features/auth/components/account-screen-gate.tsx");
    expect(gate).toContain("useLiveApprovalRoute");
    expect(read("features/auth/components/require-approval.tsx")).toContain(
      "APPROVAL_DISPATCH_ROUTE",
    );
    expect(read("features/auth/components/approval-dispatch.tsx")).toContain(
      "useLiveApprovalRoute",
    );
  });
});
