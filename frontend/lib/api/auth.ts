import { apiFetch } from "../api-client";
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthLogoutResponse,
  AuthMeResponse,
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
  return apiFetch<AuthLoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Register a new user account.
 */
export async function signup(
  data: AuthSignupRequest
): Promise<AuthSignupResponse> {
  return apiFetch<AuthSignupResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Log out the current user.
 */
export async function logout(): Promise<AuthLogoutResponse> {
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
