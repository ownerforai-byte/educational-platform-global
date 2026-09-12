import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";
import {
  USER_ROLES,
  type UserRole,
  type SessionUser,
} from "../auth/types";

/** Request augmented with the validated session user after requireAuth. */
export type AuthedRequest = Request & { user: SessionUser };

/** The httpOnly cookie name used for the Supabase access token. */
export const SESSION_COOKIE = "sb-access-token";

const USER_ROLE_SET = new Set<string>(USER_ROLES);

function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && USER_ROLE_SET.has(value.toUpperCase());
}

/**
 * Extract the bearer/cookie token from an incoming request.
 * Preference order: `Authorization: Bearer <token>` header, then the
 * `sb-access-token` cookie (set by the backend on login/signup/refresh).
 */
export function extractToken(req: Request): string | undefined {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    return header.slice(7).trim() || undefined;
  }
  return req.cookies?.[SESSION_COOKIE] as string | undefined;
}

/**
 * Load the persisted role for a user from the `profiles` table.
 * Returns null (not throws) when the profile is missing or the role is unknown.
 */
export async function loadProfileRole(userId: string): Promise<UserRole | null> {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.warn(`[Auth] Unable to load profile for user ${userId}:`, error.message);
      return null;
    }
    return isUserRole(profile?.role) ? (profile!.role as UserRole) : null;
  } catch {
    return null;
  }
}

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

export function buildSessionUser(
  id: string,
  email: string,
  role: UserRole | null,
  fullName: string | null = null,
): SessionUser {
  const effectiveRole: UserRole | null = isOwnerEmail(email) ? "OWNER" : role;
  return { id, email, fullName, role: effectiveRole };
}

/**
 * Validate the request token and resolve the full session user (with role).
 * Returns null when there is no token, the token is invalid, or Supabase
 * rejects it — callers treat null as "unauthenticated".
 */
export async function getUserFromRequest(req: Request): Promise<SessionUser | null> {
  const token = extractToken(req);
  if (!token) return null;

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      if (error) console.warn("[Auth] Token validation failed:", error.message);
      return null;
    }
    const role = await loadProfileRole(data.user.id);
    return buildSessionUser(
      data.user.id,
      data.user.email ?? "",
      role,
      (data.user.user_metadata?.full_name as string) ?? null,
    );
  } catch (err) {
    console.error("[Auth] Unexpected error during getUserFromRequest:", err);
    return null;
  }
}

/**
 * Express middleware: require a valid authenticated user.
 * Attaches the user to `req.user` and 401s otherwise.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    (req as AuthedRequest).user = user;
    next();
  } catch (err) {
    console.error("[Auth] requireAuth caught exception:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
}

/**
 * Express middleware factory: require that the authenticated user holds one
 * of the given roles. Always pairs with `requireAuth` so `req.user` exists.
 *
 *   router.post("/x", requireAuth, requireRole("ADMIN", "OWNER"), handler)
 */
export function requireRole(...roles: UserRole[]) {
  const allowed = new Set(roles.map((r) => r.toUpperCase()));
  return function roleGuard(req: Request, res: Response, next: NextFunction): void {
    const user = (req as AuthedRequest).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!user.role || !allowed.has(user.role.toUpperCase())) {
      res.status(403).json({ error: "Forbidden", requiredRoles: roles });
      return;
    }
    next();
  };
}

/** Convenience: require ADMIN or OWNER (used by admin endpoints). */
export const requireAdmin = requireRole("ADMIN", "OWNER");

/** Convenience: require OWNER only. */
export const requireOwner = requireRole("OWNER");

/**
 * Whether a role qualifies for unconditional premium access.
 * OWNER/ADMIN are always privileged; a `premiumStatus` flag grants it too.
 */
export function hasFullAccess(
  role: string | null | undefined,
  premiumStatus?: boolean | null,
): boolean {
  if (role === "OWNER" || role === "ADMIN") return true;
  return premiumStatus === true;
}
