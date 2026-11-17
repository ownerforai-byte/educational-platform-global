import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => {
  const refresh = vi.fn();
  return {
    push: vi.fn(),
    replace: vi.fn(),
    refresh,
    signInWithOAuth: vi.fn(),
    exchangeCodeForSession: vi.fn(),
    signOut: vi.fn(),
    setStoredToken: vi.fn(),
    writeCachedSession: vi.fn(),
    apiFetch: vi.fn(),
    isOAuthProviderEnabled: vi.fn(),
    firebaseGoogleSignIn: vi.fn(),
    firebaseConsumeRedirectResult: vi.fn(),
    publicUrl: vi.fn((p: string) => `http://localhost:3000${p}`),
    firebaseMode: false,
    loginAction: vi.fn(),
    authState: { user: null as unknown, isLoading: false, refresh },
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push, replace: mocks.replace }),
  useSearchParams: () => new URLSearchParams("code=oauth-code&next=%2Fprofile"),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
    <a href={href} {...rest}>{children}</a>,
}));
vi.mock("@/providers/auth-provider", () => ({ useAuth: () => mocks.authState }));
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
vi.mock("@/lib/site-url", () => ({ publicUrl: mocks.publicUrl }));
vi.mock("@/lib/firebase/client-auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/firebase/client-auth")>();
  return {
    ...actual,
    useFirebaseClientAuth: () => mocks.firebaseMode,
    firebaseGoogleSignIn: mocks.firebaseGoogleSignIn,
    firebaseConsumeRedirectResult: mocks.firebaseConsumeRedirectResult,
    firebaseCurrentUserToken: vi.fn(async () => "firebase-id-token"),
  };
});

import { LoginForm } from "@/features/auth/components/login-form";
import AuthCallbackPage from "@/app/auth/callback/page";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.authState.user = null;
  mocks.authState.isLoading = false;
  mocks.firebaseMode = false;
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
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "student@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "correct horse battery staple" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/welcome/member"));
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("renders Google sign-in alongside the password form", () => {
    render(<LoginForm />);
    expect(screen.queryByRole("button", { name: /continue with facebook/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  it("keeps Google sign-in available while the session probe is still loading", () => {
    // Regression: LoginForm used to render only "Checking your session" while
    // isLoading was true. A cold /api/auth/me hid "Continue with Google"
    // indefinitely even though Supabase OAuth was healthy.
    mocks.authState.isLoading = true;
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.queryByText(/Checking your session/i)).not.toBeInTheDocument();
  });

  it("starts Firebase Google OAuth without checking Supabase provider settings", async () => {
    mocks.firebaseMode = true;
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));

    await waitFor(() => expect(mocks.apiFetch).toHaveBeenCalledWith(
      "/api/auth/oauth/csrf",
      expect.objectContaining({ method: "POST" }),
    ));
    expect(mocks.isOAuthProviderEnabled).not.toHaveBeenCalled();
    expect(mocks.signInWithOAuth).not.toHaveBeenCalled();
  });

  it("does not forward a requested destination that could skip the tier welcome", async () => {
    // A supplied next path must not bypass the required tier welcome screen.
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));

    await waitFor(() => expect(mocks.publicUrl).toHaveBeenCalledWith("/auth/callback?firebase_start=1"));
    expect(mocks.apiFetch).toHaveBeenCalledWith(
      "/api/auth/oauth/csrf",
      expect.objectContaining({ method: "POST" }),
    );
    // Firebase-only: the handoff is a FIXED callback URL with no next/destination
    // param, so a requested path can never skip the tier welcome.
    expect(mocks.signInWithOAuth).not.toHaveBeenCalled();
  });

  it("completes Firebase Google popup login directly and navigates to welcome screen", async () => {
    mocks.firebaseMode = true;
    mocks.firebaseGoogleSignIn.mockResolvedValueOnce("firebase-popup-id-token");
    mocks.apiFetch
      .mockResolvedValueOnce({ csrfToken: "b".repeat(64) }) // /api/auth/oauth/csrf
      .mockResolvedValueOnce({ user: { id: "user-popup", email: "popup@example.com" }, accessToken: "popup-access" }); // /api/auth/oauth/session

    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue with google/i }));

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/welcome/member"));
    expect(mocks.firebaseGoogleSignIn).toHaveBeenCalledWith("popup");
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/session", {
      method: "POST",
      headers: { "X-CSRF-Token": "b".repeat(64) },
      body: JSON.stringify({ accessToken: "firebase-popup-id-token", state: "b".repeat(64) }),
    });
    expect(mocks.setStoredToken).toHaveBeenCalledWith("popup-access");
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("exchanges the Firebase token and always shows the resolved tier welcome before home", async () => {
    // Firebase-only callback (Supabase auth removed 2026-01): the page consumes
    // the Firebase redirect credential and hands the ID token to the app backend.
    mocks.firebaseMode = true;
    const state = "f".repeat(64);
    sessionStorage.setItem("neb_oauth_csrf", state);
    mocks.firebaseConsumeRedirectResult.mockResolvedValueOnce("firebase-id-token");
    // The callback ignores the legacy next path and chooses by the returned user tier.
    mocks.apiFetch.mockResolvedValueOnce({ user: { id: "user-1", email: "student@example.com" }, accessToken: "app-access" });

    render(<AuthCallbackPage />);

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/welcome/member"));
    expect(mocks.apiFetch).toHaveBeenCalledWith("/api/auth/oauth/session", {
      method: "POST",
      headers: { "X-CSRF-Token": state },
      body: JSON.stringify({ accessToken: "firebase-id-token", state }),
    });
    expect(mocks.setStoredToken).toHaveBeenCalledWith("app-access");
    expect(mocks.writeCachedSession).toHaveBeenCalledWith(
      { id: "user-1", email: "student@example.com" },
      "app-access",
    );
    expect(sessionStorage.getItem("neb_oauth_csrf")).toBeNull();
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("sends pending social accounts to the owner-approval status screen", async () => {
    mocks.firebaseMode = true;
    const state = "c".repeat(64);
    sessionStorage.setItem("neb_oauth_csrf", state);
    const pendingError = Object.assign(new Error("Account pending approval"), {
      code: "PENDING_APPROVAL",
      statusToken: "signed-status-token",
    });
    mocks.apiFetch.mockRejectedValueOnce(pendingError);

    render(<AuthCallbackPage />);

    await waitFor(() =>
      expect(mocks.replace).toHaveBeenCalledWith("/welcome/pending"),
    );
    expect(localStorage.getItem("neb_signup_status_token")).toBe("signed-status-token");
    expect(mocks.signOut).not.toHaveBeenCalled();
    expect(mocks.setStoredToken).not.toHaveBeenCalled();
  });

  it("routes a brand-new Google account (200 + PENDING_APPROVAL body) to the waiting screen", async () => {
    // The OAuth exchange answers a new PENDING account with HTTP 200 and
    // { code: "PENDING_APPROVAL", statusToken } and NO app session — the
    // callback must treat that as the waiting-screen handoff, not an error.
    mocks.firebaseMode = true;
    const state = "d".repeat(64);
    sessionStorage.setItem("neb_oauth_csrf", state);
    mocks.apiFetch.mockResolvedValueOnce({ code: "PENDING_APPROVAL", statusToken: "signed-status-token" });

    render(<AuthCallbackPage />);

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/welcome/pending"));
    expect(localStorage.getItem("neb_signup_status_token")).toBe("signed-status-token");
    expect(localStorage.getItem("neb_signup_access_outcome")).toBe("PENDING");
    expect(mocks.setStoredToken).not.toHaveBeenCalled();
  });

  it("sends a PENDING password login to the waiting screen instead of signing in", async () => {
    mocks.loginAction.mockResolvedValue({
      ok: true,
      code: "PENDING_APPROVAL",
      statusToken: "signed-status-token",
    });
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "new.student@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "correct horse battery staple" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/welcome/pending"));
    expect(localStorage.getItem("neb_signup_status_token")).toBe("signed-status-token");
    expect(mocks.refresh).not.toHaveBeenCalled();
  });
});
