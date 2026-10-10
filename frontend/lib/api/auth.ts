import { apiFetch, refreshSessionShared, setStoredToken, clearStoredToken, getStoredToken } from "../api-client";
import {
  clearCachedSession,
  writeCachedSession,
} from "../auth/session-store";
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthLogoutResponse,
  AuthMeResponse,
  AuthRefreshResponse,
  AuthSignupRequest,
  AuthSignupResponse,
  SessionUser,
} from "../../types/api";

/**
 * Authenticate a user with email and password.
 */
export async function login(
  data: AuthLoginRequest
): Promise<AuthLoginResponse> {
  const res = await apiFetch<AuthLoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res?.accessToken) {
    setStoredToken(res.accessToken);
  }
  // Persist the validated user + expiry so a reload starts out signed in.
  if (res?.user) {
    writeCachedSession(res.user, res.accessToken ?? null);
  }
  return res;
}

/**
 * Register a new user account. May resolve with 202 (user needs email
 * confirmation) — the response shape carries `needsEmailConfirmation`.
 */
export async function signup(
  data: AuthSignupRequest
): Promise<AuthSignupResponse> {
  const res = await apiFetch<AuthSignupResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res?.accessToken) {
    setStoredToken(res.accessToken);
  }
  if (res?.user) {
    writeCachedSession(res.user, res.accessToken ?? null);
  }
  return res;
}

/**
 * Refresh the current session (revalidates the active token).
 *
 * Routed through the app-wide single-flight refresh: a burst of concurrent
 * 401s (this call, the apiFetch retry, the AuthProvider renewal) collapses
 * into ONE POST /api/auth/refresh instead of one per caller.
 */
export async function refreshSession(): Promise<AuthRefreshResponse> {
  const r = await refreshSessionShared();
  if (!r.ok) {
    throw Object.assign(new Error("Session refresh failed"), {
      status: 401,
      code: "UNAUTHORIZED",
    });
  }
  if (r.user) {
    writeCachedSession(r.user as SessionUser, r.accessToken ?? getStoredToken());
  }
  return { user: r.user as SessionUser, accessToken: r.accessToken };
}

/**
 * Log out the current user.
 */
export async function logout(): Promise<AuthLogoutResponse> {
  clearStoredToken();
  clearCachedSession();
  return apiFetch<AuthLogoutResponse>("/api/auth/logout", {
    method: "POST",
  });
}

/**
 * Get the current authenticated session.
 */
export async function getSession(): Promise<AuthMeResponse> {
  return apiFetch<AuthMeResponse>("/api/auth/me");
}

/**
 * Get the current authenticated user profile.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const res = await getSession();
  return res.user;
}

/**
 * Resolve the current session, silently renewing a expired access token first.
 *
 * Why this exists: the access token lives ~1 hour while the refresh cookie lives
 * 30 days, so a returning visitor is almost always holding an expired access
 * token. `api-client` never refreshes `auth/*` paths, so a bare `/api/auth/me`
 * answered 401 and the app treated a perfectly renewable session as a logout —
 * the "I have to sign in again after a while" report. Here a rejected access
 * token is renewed through the refresh cookie and the new session is returned.
 *
 * Throws on transport failures (offline, cold start, 5xx) so callers can keep
 * the cached session instead of mistaking an unreachable backend for a logout.
 * Returns null only when the backend explicitly refuses the session.
 */
export async function ensureSession(): Promise<SessionUser | null> {
  const adopt = (user: SessionUser | null | undefined, token?: string | null): SessionUser | null => {
    if (!user) return null;
    writeCachedSession(user, token ?? getStoredToken());
    return user;
  };

  try {
    const me = await getSession();
    // 200 with `user: null` is a definitive "not signed in".
    if (!me?.user) {
      clearStoredToken();
      clearCachedSession();
      return null;
    }
    return adopt(me.user);
  } catch (err) {
    const status = (err as { status?: number }).status;
    // Anything that is not an auth refusal is the network's problem, not ours:
    // let the provider fall back to the cached session.
    if (status !== 401 && status !== 403) throw err;
    try {
      const renewed = await refreshSession();
      const user = adopt(renewed?.user, renewed?.accessToken ?? getStoredToken());
      if (user) return user;
    } catch {
      // Refresh refused (expired/revoked) → fall through to signed out.
    }
    clearStoredToken();
    clearCachedSession();
    return null;
  }
}

/**
 * Request a password-reset email (Supabase recovery link).
 * The server answers identically whether or not the account exists
 * (anti-enumeration), so this resolves `sent: true` for any valid email.
 */
export async function forgotPassword(
  email: string
): Promise<{ sent: boolean }> {
  return apiFetch<{ sent: boolean }>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/**
 * Finish a password reset. The recovery link lands on /reset-password with
 * either a PKCE `code` (query string) or an implicit `access_token` (hash);
 * the page forwards whichever it received together with the new password.
 */
export async function resetPassword(data: {
  password: string;
  code?: string;
  token?: string;
}): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
