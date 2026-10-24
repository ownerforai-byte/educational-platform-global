/**
 * Owner allowlist — mirrors backend/src/middleware/auth.ts OWNER_EMAILS.
 * Keep both lists in sync. The frontend list is a UX convenience only; the
 * backend gate (`/api/owner/*`) is the real security boundary.
 */
const DEFAULT_OWNER_EMAILS = [
  "harindarsah98172@gmail.com",
  "yashsah231@gmail.com",
  "sahrocky81@gmail.com",
  "ravikisan1814@gmail.com",
  "planephoto88@gmail.com",
];

const envOwnerEmails = process.env.NEXT_PUBLIC_OWNER_EMAILS
  ? process.env.NEXT_PUBLIC_OWNER_EMAILS.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean)
  : [];

export const OWNER_EMAILS = new Set<string>([
  ...DEFAULT_OWNER_EMAILS,
  ...envOwnerEmails,
]);

export function isOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  return OWNER_EMAILS.has(email.trim().toLowerCase());
}

/**
 * Whether this session may open the owner console. Only true for allowlisted
 * owner emails — regular ADMIN role is NOT enough for /owner.
 */
export function isOwnerUser(
  user: { email?: string | null; role?: string | null } | null | undefined
): boolean {
  if (!user) return false;
  return isOwnerEmail(user.email);
}
