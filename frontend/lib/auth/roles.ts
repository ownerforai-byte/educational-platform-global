import { ACCESS_RANK } from "@/lib/core/access-level";

export const USER_ROLES = ["member", "plus", "pro", "owner"] as const;

export type UserRole = (typeof USER_ROLES)[number];

/**
 * RANK SOURCE (plan.md §8 P1: "lib/access-level.ts as the only rank source").
 * This map is a typed VIEW over ACCESS_RANK for the signed-in rungs — it never
 * carries its own numbers, so the ladder is defined exactly once.
 */
export const ROLE_RANK: Record<UserRole, number> = {
  member: ACCESS_RANK.member,
  plus: ACCESS_RANK.plus,
  pro: ACCESS_RANK.pro,
  owner: ACCESS_RANK.owner,
};

export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as ReadonlyArray<string>).includes(value)
  );
}

export function atLeast(role: UserRole, minimum: UserRole): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[minimum];
}

export function canAccessAdminPanel(role: UserRole | null | undefined): boolean {
  if (!role) return false;
  return atLeast(role, "pro");
}

export function canAccessController(role: UserRole | null | undefined): boolean {
  if (!role) return false;
  return atLeast(role, "pro");
}

export function canManageContent(role: UserRole | null | undefined): boolean {
  if (!role) return false;
  return atLeast(role, "plus");
}

/**
 * Returns true when the user has unrestricted access to all platform features.
 *
 * A user qualifies when ANY of the following is true:
 *  - Rung is owner or pro (the privileged rungs of the tier ladder).
 *  - `premiumStatus` is true (verified / approved by the owner).
 *
 * Use this to bypass credit checks in the UI and to show/hide
 * premium-gated elements.
 */
export function hasFullAccess(
  role: UserRole | null | undefined,
  premiumStatus?: boolean | null,
): boolean {
  if (role === "owner" || role === "pro") return true;
  return premiumStatus === true;
}
