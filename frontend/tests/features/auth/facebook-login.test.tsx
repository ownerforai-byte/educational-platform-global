import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  useSearchParams: vi.fn(),
  signInWithOAuth: vi.fn(),
  exchangeCodeForSession: vi.fn(),
  signOut: vi.fn(),
  setStoredToken: vi.fn(),
  writeCachedSession: vi.fn(),
  apiFetch: vi.fn(),
  isOAuthProviderEnabled: vi.fn(),
  loginAction: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push, replace: mocks.replace }),
  useSearchParams: mocks.useSearchParams,
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
    <a href={href} {...rest}>{children}</a>,
}));
vi.mock("@/providers/auth-provider", () => ({ useAuth: () => ({ refresh: mocks.refresh }) }));
vi.mock("@/features/auth/actions", () => ({ loginAction: mocks.loginAction }));
vi.mock("@/lib/api-client", () => ({ apiFetch: mocks.apiFetch, setStoredToken: mocks.setStoredToken }));
vi.mock("@/lib/auth/session-store", () => ({ writeCachedSession: mocks.writeCachedSession }));
vi.mock("@/lib/supabase/browser", () => ({
  getSupabaseBrowserClient: () => ({ auth: {
    signInWithOAuth: mocks.signInWithOAuth,
    exchangeCodeForSession: mocks.exchangeCodeForSession,
    signOut: mocks.signOut,
  } }),
  isOAuthProviderEnabled: mocks.isOAuthProviderEnabled,
}));

import { LoginForm } from "@/features/auth/components/login-form";
import AuthCallbackPage from "@/app/auth/callback/page";

beforeEach(() => {
  vi.clearAllMocks();
  sessionStorage.clear();
  localStorage.clear();
  mocks.useSearchParams.mockReturnValue(new URLSearchParams("next=%2Fprofile"));
  mocks.isOAuthProviderEnabled.mockResolvedValue(true);
  mocks.apiFetch.mockResolvedValue({ csrfToken: "a".repeat(64) });
  mocks.signInWithOAuth.mockResolvedValue({ data: {}, error: null });
  mocks.exchangeCodeForSession.mockResolvedValue({
    data: { session: { access_token: "supabase-access", refresh_token: "supabase-refresh" } },
    error: null,
  });
  mocks.signOut.mockResolvedValue({ error: null });
});

describe("Social login", () => {
  it("renders Facebook and Google sign-in alongside the password form", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /continue with facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows a useful message when the project has Facebook disabled", async () => {
    mocks.isOAuthProviderEnabled.mockResolvedValue(false);
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with facebook/i }));
    expect(await screen.findByText(/Facebook sign-in is not enabled yet/i)).toBeInTheDocument();
    expect(mocks.apiFetch).not.toHaveBeenCalled();
    expect(mocks.signInWithOAuth).not.toHaveBeenCalled();
  });

  it("requests the CSRF token and starts Facebook OAuth with the local callback and safe next path", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with facebook/i }));

    await waitFor(() => expect(mocks.signInWithOAuth).toHaveBeenCalledOnce());
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/csrf", { method: "POST" });
    expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=%2Fprofile`,
      },
    });
  });

  it("starts Google OAuth with the same CSRF and callback flow", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));

    await waitFor(() => expect(mocks.signInWithOAuth).toHaveBeenCalledOnce());
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/csrf", { method: "POST" });
    expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=%2Fprofile`,
      },
    });
  });

  it("exchanges the callback code, creates the app session, and returns to a safe next path", async () => {
    const state = "f".repeat(64);
    sessionStorage.setItem("neb_oauth_csrf", state);
    mocks.useSearchParams.mockReturnValue(new URLSearchParams("code=oauth-code&next=%2Fprofile"));
    mocks.apiFetch.mockResolvedValueOnce({ user: { id: "user-1", email: "student@example.com" }, accessToken: "app-access" });

    render(<AuthCallbackPage />);

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/profile"));
    expect(mocks.exchangeCodeForSession).toHaveBeenCalledWith("oauth-code");
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/session", {
      method: "POST",
      headers: { "X-CSRF-Token": state },
      body: JSON.stringify({ accessToken: "supabase-access", refreshToken: "supabase-refresh", state }),
    });
    expect(mocks.signOut).toHaveBeenCalledWith({ scope: "local" });
    expect(mocks.setStoredToken).toHaveBeenCalledWith("app-access");
    expect(mocks.writeCachedSession).toHaveBeenCalledWith(
      { id: "user-1", email: "student@example.com" },
      "app-access",
    );
    expect(sessionStorage.getItem("neb_oauth_csrf")).toBeNull();
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("sends pending social accounts to the owner-approval status screen", async () => {
    const state = "c".repeat(64);
    sessionStorage.setItem("neb_oauth_csrf", state);
    mocks.useSearchParams.mockReturnValue(new URLSearchParams("code=oauth-code"));
    const pendingError = Object.assign(new Error("Account pending approval"), {
      code: "PENDING_APPROVAL",
      statusToken: "signed-status-token",
    });
    mocks.apiFetch.mockRejectedValueOnce(pendingError);

    render(<AuthCallbackPage />);

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/welcome"));
    expect(localStorage.getItem("neb_signup_status_token")).toBe("signed-status-token");
    expect(mocks.signOut).not.toHaveBeenCalled();
    expect(mocks.setStoredToken).not.toHaveBeenCalled();
  });
});
