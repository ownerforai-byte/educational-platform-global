/**
 * Owner allowlist — mirrors backend/src/middleware/auth.ts OWNER_EMAILS.
 * Keep both lists in sync. The frontend list is a UX convenience only; the
 * backend gate (`/api/owner/*`) is the real security boundary.
 */
export const OWNER_EMAILS = new Set([
  "harindarsah98172@gmail.com",
  "yashsah231@gmail.com",
  "sahrocky81@gmail.com",
  "ravikisan1814@gmail.com",
  "planephoto88@gmail.com",
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
