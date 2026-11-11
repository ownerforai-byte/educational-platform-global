/**
 * Dev-only profile fixtures (tiers). These IDs are illustrative — wire them to
 * real auth users in your local Supabase project before seeding.
 */
export const DEV_SEED_USERS = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    email: "member.dev@example.com",
    role: "STUDENT",
    access_status: "approved",
    premium_status: false,
    credits: 4,
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    email: "plus.dev@example.com",
    role: "STUDENT",
    access_status: "approved",
    premium_status: false,
    credits: 8,
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    email: "pro.dev@example.com",
    role: "STUDENT",
    access_status: "approved",
    premium_status: true,
    credits: 999,
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    email: "owner.dev@example.com",
    role: "OWNER",
    access_status: "approved",
    premium_status: false,
    credits: 4,
  },
] as const;
