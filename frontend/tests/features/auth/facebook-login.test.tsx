import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
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
  useSearchParams: () => new URLSearchParams("code=oauth-code&next=%2Fprofile"),
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
  vi.unstubAllEnvs();
  sessionStorage.clear();
  localStorage.clear();
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
  it("successful password login always opens the user's tier welcome before any next path", async () => {
    mocks.loginAction.mockResolvedValue({
      ok: true,
      user: { id: "user-1", email: "student@example.com" },
    });
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "student@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "correct horse battery staple" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/welcome/member"));
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("renders Google sign-in alongside the password form (Facebook temporarily hidden)", () => {
    render(<LoginForm />);
    // Facebook is intentionally hidden behind SHOW_FACEBOOK=false until the
    // Meta code-exchange credentials are fixed (see social-auth-buttons.tsx);
    // the button must stay absent rather than render broken.
    expect(screen.queryByRole("button", { name: /continue with facebook/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows a useful message when the provider is disabled", async () => {
    // Same handler branch the Facebook button used: while Facebook is hidden
    // (SHOW_FACEBOOK=false) the disabled-provider message is exercised through
    // the visible Google button.
    mocks.isOAuthProviderEnabled.mockResolvedValue(false);
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));
    expect(await screen.findByText(/Google sign-in is temporarily unavailable/i)).toBeInTheDocument();
    expect(mocks.apiFetch).not.toHaveBeenCalled();
    expect(mocks.signInWithOAuth).not.toHaveBeenCalled();
  });

  it("does not forward a requested destination that could skip the tier welcome", async () => {
    // A supplied next path must not bypass the required tier welcome screen.
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));

    await waitFor(() => expect(mocks.signInWithOAuth).toHaveBeenCalledOnce());
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/csrf", { method: "POST" });
    expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    expect(
      mocks.signInWithOAuth.mock.calls.every(([args]) => args.provider !== "facebook"),
    ).toBe(true);
  });

  it("starts Google OAuth with the same CSRF and callback flow", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));

    await waitFor(() => expect(mocks.signInWithOAuth).toHaveBeenCalledOnce());
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/csrf", { method: "POST" });
    expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  });

  it("exchanges the callback code and always shows the resolved tier welcome before home", async () => {
    const state = "f".repeat(64);
    sessionStorage.setItem("neb_oauth_csrf", state);
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://testproj.supabase.co");
    localStorage.setItem("sb-testproj-auth-token", "{}");
    localStorage.setItem("sb-testproj-auth-token-code-verifier", "{}");
    localStorage.setItem("unrelated-key", "keep");
    // The callback ignores the legacy next path and chooses by the returned user tier.
    mocks.apiFetch.mockResolvedValueOnce({ user: { id: "user-1", email: "student@example.com" }, accessToken: "app-access" });

    render(<AuthCallbackPage />);

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/welcome/member"));
    expect(mocks.exchangeCodeForSession).toHaveBeenCalledWith("oauth-code");
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/session", {
      method: "POST",
      headers: { "X-CSRF-Token": state },
      body: JSON.stringify({ accessToken: "supabase-access", refreshToken: "supabase-refresh", state }),
    });
    // The supabase-js local record is swept WITHOUT signOut: signOut still hits
    // /auth/v1/logout and GoTrue deletes the server session the backend just
    // minted (see auth/callback/page.tsx clearSupabaseLocalSession).
    expect(mocks.signOut).not.toHaveBeenCalled();
    expect(localStorage.getItem("sb-testproj-auth-token")).toBeNull();
    expect(localStorage.getItem("sb-testproj-auth-token-code-verifier")).toBeNull();
    expect(localStorage.getItem("unrelated-key")).toBe("keep");
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
