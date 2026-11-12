import type { SessionUser, UserRole } from "@/types/api";
import { mergeFixture, type DeepPartial } from "./factory";

const BASE: SessionUser = {
  id: "user-1",
  email: "student@example.com",
  fullName: "Test Student",
  role: "member",
  credits: 10,
  creditsLimit: 100,
  premiumStatus: false,
  plan: "member",
};

/** Session user at each product tier (owner email matches the live allowlist shape). */
export function buildSessionUser(
  role: UserRole = "member",
  overrides?: DeepPartial<SessionUser>,
): SessionUser {
  const byRole: Record<UserRole, DeepPartial<SessionUser>> = {
    member: { role: "member", plan: "member", credits: 10 },
    plus: { role: "plus", plan: "plus", credits: 40 },
    pro: { role: "pro", plan: "pro", credits: 80, premiumStatus: true },
    owner: {
      role: "owner",
      plan: "pro",
      email: "sahrocky81@gmail.com",
      fullName: "Owner",
      credits: 999,
      premiumStatus: true,
    },
  };
  return mergeFixture<SessionUser>(BASE, {
    ...byRole[role],
    ...overrides,
  } as DeepPartial<SessionUser>);
}

export const memberUser = () => buildSessionUser("member");
export const plusUser = () => buildSessionUser("plus");
export const proUser = () => buildSessionUser("pro");
export const ownerUser = () => buildSessionUser("owner");
