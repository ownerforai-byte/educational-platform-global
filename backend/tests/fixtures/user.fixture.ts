import { mergeFixture, type DeepPartial } from "./factory";

export type ProfileFixture = {
  id: string;
  email: string;
  full_name: string | null;
  role: "member" | "plus" | "pro" | "owner";
  access_status: "ACTIVE" | "PENDING" | "REJECTED";
  credits: number;
  credits_limit: number;
  premium_status: boolean;
  plan: "member" | "plus" | "pro";
};

const BASE: ProfileFixture = {
  id: "11111111-1111-4111-8111-111111111111",
  email: "student@example.com",
  full_name: "Test Student",
  role: "member",
  access_status: "ACTIVE",
  credits: 10,
  credits_limit: 100,
  premium_status: false,
  plan: "member",
};

export function buildProfile(overrides?: DeepPartial<ProfileFixture>): ProfileFixture {
  return mergeFixture(BASE, overrides);
}

export function buildOwnerProfile(overrides?: DeepPartial<ProfileFixture>): ProfileFixture {
  return buildProfile({
    email: "sahrocky81@gmail.com",
    full_name: "Owner",
    role: "owner",
    plan: "pro",
    premium_status: true,
    credits: 999,
    ...overrides,
  });
}

/** Shape returned by mocked `auth.getUser` for OAuth/session tests. */
export function buildAuthUser(overrides?: {
  id?: string;
  email?: string;
  full_name?: string;
  provider?: string;
}) {
  const id = overrides?.id ?? BASE.id;
  const email = overrides?.email ?? BASE.email;
  return {
    id,
    email,
    user_metadata: { full_name: overrides?.full_name ?? BASE.full_name },
    app_metadata: { provider: overrides?.provider ?? "google" },
  };
}
