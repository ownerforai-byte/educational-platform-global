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
 * Whether this session may open the owner console and its management
 * surfaces. An owner ACCOUNT is either an allowlisted owner email or an
 * account on the owner rung (owner grant / normalized legacy operator).
 * Approve/reject is restricted to owner accounts; owner-to-owner changes are
 * blocked server-side separately.
 */
export function isOwnerAccount(
  user: { email?: string | null; role?: string | null } | null | undefined
): boolean {
  if (!user) return false;
  return isOwnerEmail(user.email) || user.role === "owner";
}

/**
 * Email-allowlist gate for owner-exclusive CONTENT (R1, Diagram Hub, owner
 * design surfaces). Those backend routes still authorize by allowlisted email,
 * so this stays narrower than `isOwnerAccount`.
 */
export function isOwnerUser(
  user: { email?: string | null; role?: string | null } | null | undefined
): boolean {
  if (!user) return false;
  return isOwnerEmail(user.email);
}
