/**
 * Shared auth types — single source of truth for the entire backend.
 */

export const USER_ROLES = ["member", "plus", "pro", "owner"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/**
 * Legacy role vocabulary (STUDENT / TEACHER / ADMIN / OWNER) → ladder.
 * New signups are written as `member` (see auth signup + profiles trigger).
 * STUDENT/TEACHER were the old learner roles — never owner. Only ADMIN/OWNER
 * map to the owner rung (assigned operators / root owner rows).
 */
const LEGACY_TO_TIER: Record<string, UserRole> = {
  STUDENT: "member",
  TEACHER: "member",
  ADMIN: "owner",
  OWNER: "owner",
};

/** Normalize any stored role value to the tier ladder (unknown → null). */
export function normalizeRole(value: unknown): UserRole | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if ((USER_ROLES as readonly string[]).includes(v)) return v as UserRole;
  return LEGACY_TO_TIER[v.toUpperCase()] ?? null;
}

/** A validated session user attached to the request after requireAuth. */
export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
  /** Membership plan tier (migration 008): "member" | "plus" | "pro". */
  plan?: "member" | "plus" | "pro" | null;
  /** Legacy PRO flag (profiles.premium_status) — maps to the pro tier. */
  premiumStatus?: boolean | null;
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
  /**
   * Owner-approval flow: present when the account was created PENDING —
   * the client stores this signed token and polls /api/auth/account-status
   * from the status screen (no session is issued in that case).
   */
  statusToken?: string;
  accessStatus?: "PENDING" | "ACTIVE" | "REJECTED";
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
