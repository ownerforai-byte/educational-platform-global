export const USER_ROLES = ["member", "plus", "pro", "owner"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_RANK: Record<UserRole, number> = {
  member: 0,
  plus: 1,
  pro: 2,
  owner: 3,
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
 *  - Role is OWNER or ADMIN (privileged roles).
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
