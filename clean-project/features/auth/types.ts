import type { UserRole } from "@/lib/auth/roles";

export type SessionUser = {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
};
