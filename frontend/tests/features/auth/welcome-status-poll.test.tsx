/**
 * Waiting screen (/welcome/pending) — the belt-and-suspenders path of the
 * automated account-approval flow.
 *
 * The status poll reads GET /api/auth/account-status and flips the device to
 * the approved screen the moment the account is ACTIVE — even when the FCM
 * push never arrives. Contract: the server flips PENDING → ACTIVE ~5 minutes
 * after creation.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const apiFetch = vi.hoisted(() => vi.fn());

vi.mock("@/lib/api-client", () => ({
  apiFetch: (...args: unknown[]) => apiFetch(...args),
}));

import { WelcomeStatus } from "@/features/auth/components/welcome-status";
import {
  clearPendingSignup,
  readAccessOutcome,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";

const locationReplace = vi.hoisted(() => vi.fn());
const originalLocation = window.location;

function stubLocation(pathname = "/welcome/pending") {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: {
      href: `http://localhost${pathname}`,
      pathname,
      search: "",
      replace: locationReplace,
    },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  clearPendingSignup();
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: originalLocation,
  });
});

describe("WelcomeStatus poll → approved screen", () => {
  it("flips to /welcome/approved when the poll returns ACTIVE", async () => {
    stubLocation();
    rememberPendingSignup("signed-status-token");
    apiFetch.mockResolvedValue({ accessStatus: "ACTIVE", fullName: "Ada Lovelace" });

    render(<WelcomeStatus />);

    await waitFor(() =>
      expect(locationReplace).toHaveBeenCalledWith("/welcome/approved"),
    );
    expect(apiFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/account-status?"),
    );
    expect(readAccessOutcome()).toBe("ACTIVE");
  });

  it("stays on the waiting screen while the account is PENDING", async () => {
    stubLocation();
    rememberPendingSignup("signed-status-token");
    apiFetch.mockResolvedValue({ accessStatus: "PENDING", fullName: "Ada" });

    render(<WelcomeStatus />);

    await waitFor(() =>
      expect(screen.getByTestId("account-status")).toBeInTheDocument(),
    );
    expect(screen.getByTestId("account-status").textContent).toContain(
      "Awaiting approval",
    );
    expect(screen.getByTestId("account-status").textContent).toContain(
      "This page re-checks on its own",
    );
    expect(apiFetch).toHaveBeenCalledWith(
      expect.stringContaining("token=signed-status-token"),
    );
    expect(locationReplace).not.toHaveBeenCalled();
  });

  it("routes REJECTED to the denied screen", async () => {
    stubLocation();
    rememberPendingSignup("signed-status-token");
    apiFetch.mockResolvedValue({ accessStatus: "REJECTED" });

    render(<WelcomeStatus />);

    await waitFor(() =>
      expect(locationReplace).toHaveBeenCalledWith("/welcome/denied"),
    );
  });

  it("clears a dead signup token and leaves for the no-account screen", async () => {
    stubLocation();
    rememberPendingSignup("dead-token");
    apiFetch.mockRejectedValue(Object.assign(new Error("gone"), { status: 404 }));

    render(<WelcomeStatus />);

    await waitFor(() =>
      expect(locationReplace).toHaveBeenCalledWith("/welcome/no-account"),
    );
  });

  it("recovers after a transient failure and still flips on ACTIVE", async () => {
    stubLocation();
    rememberPendingSignup("signed-status-token");
    apiFetch.mockRejectedValueOnce(Object.assign(new Error("blip"), { status: 503 }));
    apiFetch.mockResolvedValueOnce({ accessStatus: "ACTIVE" });

    render(<WelcomeStatus />);

    // First check fails transiently — the screen keeps its "Check now" retry.
    const retry = await screen.findByRole("button", { name: /check now/i });
    fireEvent.click(retry);

    await waitFor(() =>
      expect(locationReplace).toHaveBeenCalledWith("/welcome/approved"),
    );
    expect(apiFetch).toHaveBeenCalledTimes(2);
  });
});
