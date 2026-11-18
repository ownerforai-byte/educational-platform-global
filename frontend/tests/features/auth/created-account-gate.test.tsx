import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { clearPendingSignup, rememberPendingSignup } from "@/features/auth/pending-signup-identity";

const nav = vi.hoisted(() => ({ replace: vi.fn() }));
const apiFetch = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: nav.replace, push: vi.fn() }),
}));

vi.mock("@/lib/api-client", () => ({
  apiFetch: (...args: unknown[]) => apiFetch(...args),
}));

import { CreatedAccountGate } from "@/features/auth/components/created-account-gate";

beforeEach(() => {
  clearPendingSignup();
  nav.replace.mockClear();
  apiFetch.mockReset();
});

describe("CreatedAccountGate", () => {
  it("renders login immediately when this device has no signup status token", () => {
    render(
      <CreatedAccountGate mode="login">
        <div data-testid="auth-form">sign-in form</div>
      </CreatedAccountGate>,
    );
    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    expect(screen.queryByText(/Checking your account status/i)).toBeNull();
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it("redirects pending signups away from login", async () => {
    rememberPendingSignup("device-token");
    apiFetch.mockResolvedValue({ accessStatus: "PENDING" });
    render(
      <CreatedAccountGate mode="login">
        <div data-testid="auth-form">sign-in form</div>
      </CreatedAccountGate>,
    );
    await waitFor(() => expect(nav.replace).toHaveBeenCalledWith("/welcome/pending"));
    expect(screen.queryByTestId("auth-form")).toBeNull();
  });

  it("renders signup form immediately even if device has a status token so user can create an account", () => {
    rememberPendingSignup("device-token");
    apiFetch.mockResolvedValue({ accessStatus: "ACTIVE" });
    render(
      <CreatedAccountGate mode="signup">
        <div data-testid="signup-form">create account form</div>
      </CreatedAccountGate>,
    );
    expect(screen.getByTestId("signup-form")).toBeInTheDocument();
    expect(nav.replace).not.toHaveBeenCalled();
  });
});