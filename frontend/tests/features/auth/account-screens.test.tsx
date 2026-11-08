import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  clearPendingSignup,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";
import { NO_ACCOUNT_MESSAGE } from "@/features/auth/components/no-account-card";

/**
 * Owner request 2026-11-08: TWO pages, chosen by the hardcoded signup
 * identity. A visitor with no account must NEVER see "Your account is on its
 * way"; a pending signup must NEVER see "no active account".
 */

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
  NoAccountScreen,
  WelcomeApprovalScreen,
} from "@/features/auth/components/account-screen-gate";

const WAITING_BODY = <div data-testid="waiting-body">the live status stepper</div>;

beforeEach(() => {
  clearPendingSignup();
  nav.replace.mockClear();
});

describe("approval-status screens", () => {
  it("sends a visitor with NO account away from the waiting page", () => {
    render(<WelcomeApprovalScreen waiting={WAITING_BODY} />);
    expect(screen.queryByText(/Your account is on its way/i)).toBeNull();
    expect(screen.queryByTestId("waiting-body")).toBeNull();
    expect(nav.replace).toHaveBeenCalledWith("/welcome/no-account");
  });

  it("shows the waiting approval page ONLY to a created account", () => {
    rememberPendingSignup("signed-status-token");
    render(<WelcomeApprovalScreen waiting={WAITING_BODY} />);
    expect(screen.getByText(/Your account is on its way/i)).toBeInTheDocument();
    expect(screen.getByTestId("waiting-body")).toBeInTheDocument();
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("shows the exact no-account message and a create-account action", () => {
    render(<NoAccountScreen />);
    expect(screen.getByTestId("no-account-card")).toBeInTheDocument();
    expect(screen.getByTestId("no-account-message").textContent).toBe(NO_ACCOUNT_MESSAGE);
    expect(NO_ACCOUNT_MESSAGE).toBe(
      "There is no record of your active account -- so create one to get access",
    );
    expect(screen.getByRole("link", { name: /create account/i }).getAttribute("href")).toBe(
      "/signup",
    );
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("sends a pending signup away from the no-account page", () => {
    rememberPendingSignup("signed-status-token");
    render(<NoAccountScreen />);
    expect(screen.queryByTestId("no-account-card")).toBeNull();
    expect(nav.replace).toHaveBeenCalledWith("/welcome");
  });
});

describe("account-screen wiring", () => {
  const read = (p: string) => readFileSync(path.resolve(p), "utf8");

  it("keeps the waiting page as the post-signup status screen", () => {
    const src = read("app/welcome/page.tsx");
    expect(src).toContain("WelcomeApprovalScreen");
    expect(src).toContain("WelcomeStatus");
  });

  it("adds the second page route for visitors with no account", () => {
    const src = read("app/welcome/no-account/page.tsx");
    expect(src).toContain("NoAccountScreen");
  });

  it("reads the same hardcoded identity in both gates and the access link", () => {
    const gate = read("features/auth/components/account-screen-gate.tsx");
    expect(gate).toContain("usePendingSignup()");
    expect(gate).toContain("NO_ACCOUNT_ROUTE");
    expect(gate).toContain("WAITING_APPROVAL_ROUTE");
    expect(read("features/auth/components/require-approval.tsx")).toContain(
      "usePendingSignup()",
    );
    expect(read("features/auth/use-pending-signup.ts")).toContain("hasPendingSignup");
  });
});
