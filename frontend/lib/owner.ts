/**
 * Root owner email — mirrors backend/src/middleware/auth.ts.
 * This address always owns the platform and cannot be replaced by another
 * coded allowlist entry. Additional operators work as owner only when the
 * root owner grants them `role: "owner"` live in the database.
 */
export const OWNER_EMAIL = "sahrocky81@gmail.com";

export const OWNER_EMAILS = new Set<string>([OWNER_EMAIL]);

export function isOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  return OWNER_EMAILS.has(email.trim().toLowerCase());
}

/**
 * May open the owner console / act as owner:
 *   - the root owner email, or
 *   - any account the root owner assigned `role: "owner"` (live DB grant).
 */
export function isOwnerAccount(
  user: { email?: string | null; role?: string | null } | null | undefined
): boolean {
  if (!user) return false;
  return isOwnerEmail(user.email) || user.role === "owner";
}

/** Same as `isOwnerAccount` — assigned owners count. */
export function isOwnerUser(
  user: { email?: string | null; role?: string | null } | null | undefined
): boolean {
  return isOwnerAccount(user);
}
