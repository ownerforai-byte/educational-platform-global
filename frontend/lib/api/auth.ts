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
