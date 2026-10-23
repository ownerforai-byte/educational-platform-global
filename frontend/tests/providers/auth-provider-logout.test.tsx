import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

/**
 * INSTANT LOGOUT
 * (owner request 2026-10-16: "when I clicked logout it must work now, like I
 * am a customer — not an owner or a paid user").
 *
 * `logoutUser` must flip the app to the signed-out state in the click itself —
 * owner console, premium surfaces and every spark gate re-lock immediately —
 * and only then revoke the backend session in the background. A cold or dead
 * backend (the revoke never resolves) may not hold the UI signed in.
 */

const ensureSession = vi.fn();
const apiLogout = vi.fn();
const refreshSession = vi.fn();

vi.mock("@/lib/api/auth", () => ({
  ensureSession: (...args: unknown[]) => ensureSession(...args),
  logout: (...args: unknown[]) => apiLogout(...args),
  refreshSession: (...args: unknown[]) => refreshSession(...args),
}));

import { AuthProvider, useAuth } from "@/providers/auth-provider";

const OWNER_USER = {
  id: "u1",
  email: "owner@example.com",
  fullName: "Test Owner",
  role: "owner",
  credits: 9,
  creditsLimit: 10,
};

/** Exposes the provider's logoutUser so the test can await it directly. */
let logoutUserRef: (() => Promise<void>) | null = null;

function Probe() {
  const { user, logoutUser } = useAuth();
  logoutUserRef = logoutUser;
  return (
    <div>
      <span data-testid="who">{user ? `${user.role}:${user.email}` : "guest"}</span>
      <button onClick={() => void logoutUser()}>Log out</button>
    </div>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  logoutUserRef = null;
  // No silent renewal in this harness: a missing/expiring token triggers the
  // provider's renewal effect, and a rejected renewal keeps the session.
  refreshSession.mockRejectedValue(new Error("no renewal in tests"));
});

describe("instant logout", () => {
  it("flips to the signed-out customer in the click, while the revoke hangs", async () => {
    ensureSession.mockResolvedValue(OWNER_USER);
    // The backend revoke NEVER resolves — Render cold start / offline.
    apiLogout.mockReturnValue(new Promise(() => {}));

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("who")).toHaveTextContent("owner:owner@example.com"),
    );

    // No awaits: the click itself must land.
    fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    expect(screen.getByTestId("who")).toHaveTextContent("guest");
    // …and the background revoke still went out.
    expect(apiLogout).toHaveBeenCalledTimes(1);
  });

  it("logoutUser resolves without waiting on the network", async () => {
    ensureSession.mockResolvedValue(OWNER_USER);
    apiLogout.mockReturnValue(new Promise(() => {}));

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("who")).toHaveTextContent("owner:owner@example.com"),
    );

    // Would hang forever if logoutUser still awaited apiLogout().
    await act(async () => {
      await logoutUserRef!();
    });
    expect(screen.getByTestId("who")).toHaveTextContent("guest");
    expect(apiLogout).toHaveBeenCalledTimes(1);
  });

  it("stays signed out even when the revoke fails", async () => {
    ensureSession.mockResolvedValue(OWNER_USER);
    apiLogout.mockRejectedValue(new Error("backend unreachable"));

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("who")).toHaveTextContent("owner:owner@example.com"),
    );

    await act(async () => {
      await logoutUserRef!();
    });
    expect(screen.getByTestId("who")).toHaveTextContent("guest");
  });
});
