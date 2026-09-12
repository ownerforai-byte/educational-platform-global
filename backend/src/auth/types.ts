/**
 * Shared auth types — single source of truth for the entire backend.
 */

export const USER_ROLES = ["STUDENT", "TEACHER", "ADMIN", "OWNER"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** A validated session user attached to the request after requireAuth. */
export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
}

/** Extended user returned by GET /api/auth/me (includes profile fields). */
export interface ExtendedSessionUser extends SessionUser {
  credits: number;
  creditsLimit: number;
  premiumStatus: boolean;
  premiumApprovedAt: string | null;
}

/** Response shape for login. */
export interface LoginResponse {
  user: ExtendedSessionUser;
  accessToken: string;
}

/** Response shape for signup. */
export interface SignupResponse {
  user: ExtendedSessionUser | null;
  accessToken: string | null;
  message?: string;
}

/** Response shape for logout. */
export interface LogoutResponse {
  ok: true;
}

/** Response shape for GET /me. */
export interface MeResponse {
  user: ExtendedSessionUser | null;
}

/** Response shape for refresh. */
export interface RefreshResponse {
  user: ExtendedSessionUser;
  accessToken: string;
}
