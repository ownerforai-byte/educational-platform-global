export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "OWNER";

export const USER_ROLES = ["STUDENT", "TEACHER", "ADMIN", "OWNER"] as const;

/**
 * Extended session user returned by GET /api/auth/me.
 * Includes credit and premium fields so the UI can gate features.
 */
export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
  /** Available credits (deducted on feature usage). */
  credits?: number;
  /** Maximum credits the user may hold. */
  creditsLimit?: number;
  /** True when the owner has approved this user for premium access. */
  premiumStatus?: boolean;
  /** ISO timestamp of premium approval, when premiumStatus is true. */
  premiumApprovedAt?: string | null;
}

export const ROLE_RANK: Record<UserRole, number> = {
  STUDENT: 0,
  TEACHER: 1,
  ADMIN: 2,
  OWNER: 3,
};
