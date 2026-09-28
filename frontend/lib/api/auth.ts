import { apiFetch, setStoredToken, clearStoredToken } from "../api-client";
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
  return res;
}

/**
 * Refresh the current session (revalidates the active token).
 */
export async function refreshSession(): Promise<AuthRefreshResponse> {
  const res = await apiFetch<AuthRefreshResponse>("/api/auth/refresh", {
    method: "POST",
  });
  if (res?.accessToken) {
    setStoredToken(res.accessToken);
  }
  return res;
}

/**
 * Log out the current user.
 */
export async function logout(): Promise<AuthLogoutResponse> {
  clearStoredToken();
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
