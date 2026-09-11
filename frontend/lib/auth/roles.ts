export const USER_ROLES = ["STUDENT", "TEACHER", "ADMIN", "OWNER"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_RANK: Record<UserRole, number> = {
  STUDENT: 0,
  TEACHER: 1,
  ADMIN: 2,
  OWNER: 3,
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
  return atLeast(role, "ADMIN");
}

export function canAccessController(role: UserRole | null | undefined): boolean {
  if (!role) return false;
  return atLeast(role, "ADMIN");
}

export function canManageContent(role: UserRole | null | undefined): boolean {
  if (!role) return false;
  return atLeast(role, "TEACHER");
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
  if (role === "OWNER" || role === "ADMIN") return true;
  return premiumStatus === true;
}
