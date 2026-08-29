export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "OWNER";

export const USER_ROLES = ["STUDENT", "TEACHER", "ADMIN", "OWNER"] as const;

export const ROLE_RANK: Record<UserRole, number> = {
  STUDENT: 0,
  TEACHER: 1,
  ADMIN: 2,
  OWNER: 3,
};

export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
  credits?: number;
  premiumStatus?: boolean;
}
