export type UserRole = "member" | "plus" | "pro" | "owner";

export const USER_ROLES = ["member", "plus", "pro", "owner"] as const;

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
  /** Membership plan tier (member | plus | pro). */
  plan?: "member" | "plus" | "pro" | null;
  /** True when the owner has approved this user for premium access. */
  premiumStatus?: boolean;
  /** ISO timestamp of premium approval, when premiumStatus is true. */
  premiumApprovedAt?: string | null;
}

export const ROLE_RANK: Record<UserRole, number> = {
  member: 0,
  plus: 1,
  pro: 2,
  owner: 3,
};
