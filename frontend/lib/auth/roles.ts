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
