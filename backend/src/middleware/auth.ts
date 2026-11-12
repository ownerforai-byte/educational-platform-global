import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";
import {
  USER_ROLES,
  normalizeRole,
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

export async function loadProfileAccess(userId: string): Promise<{
  role: UserRole | null;
  accessStatus: string | null;
}> {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("role, access_status")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.warn(`[Auth] Unable to load profile for user ${userId}:`, error.message);
      return { role: null, accessStatus: null };
    }
    return {
      role: normalizeRole(profile?.role),
      accessStatus: typeof profile?.access_status === "string" ? profile.access_status : null,
    };
  } catch {
    return { role: null, accessStatus: null };
  }
}

export async function loadProfileRole(userId: string): Promise<UserRole | null> {
  return (await loadProfileAccess(userId)).role;
}

/**
 * Load the display name from the user's `profiles` row (best-effort).
 * Returns null when the profile is missing or has no name set.
 */
export async function loadProfileFullName(userId: string): Promise<string | null> {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .maybeSingle();

    if (error) return null;
    const name = profile?.full_name;
    return typeof name === "string" && name.trim() ? name.trim() : null;
  } catch {
    return null;
  }
}

/**
 * Load the membership plan tier (migration 008) for the AI-spark allowance.
 * Tolerant of an un-migrated `profiles` table: when the `plan` column does
 * not exist yet, the legacy `premium_status` PRO flag maps to the pro tier.
 */
export async function loadProfilePlan(
  userId: string,
): Promise<{ plan: "member" | "plus" | "pro" | null; premiumStatus: boolean | null }> {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("plan, premium_status")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      // `plan` column missing (migration 008 not applied) → legacy read.
      const { data: legacy } = await supabaseAdmin
        .from("profiles")
        .select("premium_status")
        .eq("id", userId)
        .maybeSingle();
      const premium = legacy?.premium_status === true;
      return { plan: premium ? "pro" : null, premiumStatus: premium };
    }
    const raw = typeof profile?.plan === "string" ? profile.plan.toLowerCase() : "";
    const plan = raw === "pro" ? "pro" : raw === "plus" || raw === "plus_20" ? "plus" : "member";
    return { plan, premiumStatus: profile?.premium_status === true };
  } catch {
    return { plan: null, premiumStatus: null };
  }
}

/**
 * Root owner email. Always owner. Additional operators become owners only
 * when this address (or another owner) grants `role: "owner"` live in DB.
 */
export const OWNER_EMAIL = "sahrocky81@gmail.com";

export const OWNER_EMAILS = new Set<string>([OWNER_EMAIL]);

export function isOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  return OWNER_EMAILS.has(email.trim().toLowerCase());
}

/**
 * Owner console / owner APIs: root email OR a live `role: "owner"` grant.
 */
export function isOwnerAccount(
  user?: { email?: string | null; role?: UserRole | string | null } | null,
): boolean {
  if (!user) return false;
  return isOwnerEmail(user.email) || normalizeRole(user.role) === "owner";
}

/**
 * Live approval: root owner + assigned owners always in; everyone else needs
 * profiles.access_status === ACTIVE (set from the owner console).
 */
export function isApprovedAccount(
  user: { email?: string | null; role?: string | null },
  accessStatus: unknown,
): boolean {
  return isOwnerAccount(user) || accessStatus === "ACTIVE";
}

export function buildSessionUser(
  id: string,
  email: string,
  role: UserRole | null,
  fullName: string | null = null,
  plan: "member" | "plus" | "pro" | null = null,
  premiumStatus: boolean | null = null,
): SessionUser {
  // ONE effective rung: the owner allowlist wins, otherwise the higher of the
  // stored role and the plan/premium flag. Folding plan into role here means
  // an owner-console role grant and the AI-spark quota always agree — there is
  // no second tier vocabulary downstream.
  let effectiveRole: UserRole;
  if (isOwnerEmail(email)) {
    effectiveRole = "owner";
  } else {
    const roleTier = normalizeRole(role) ?? "member";
    const planTier: UserRole =
      plan === "pro" || premiumStatus === true ? "pro" : plan === "plus" ? "plus" : "member";
    effectiveRole =
      USER_ROLES[Math.max(USER_ROLES.indexOf(roleTier), USER_ROLES.indexOf(planTier))];
  }
  return { id, email, fullName, role: effectiveRole, plan, premiumStatus };
}

/**
 * Validate the request token and resolve an approved session user (with role).
 * Returns null for invalid sessions or unapproved non-owner accounts.
 */
export async function getUserFromRequest(
  req: Request,
  { allowUnapproved = false }: { allowUnapproved?: boolean } = {},
): Promise<SessionUser | null> {
  const token = extractToken(req);
  if (!token) return null;

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      if (error) console.warn("[Auth] Token validation failed:", error.message);
      return null;
    }
    const [profileAccess, profileName, planInfo] = await Promise.all([
      loadProfileAccess(data.user.id),
      loadProfileFullName(data.user.id),
      loadProfilePlan(data.user.id),
    ]);
    if (
      !allowUnapproved &&
      !isApprovedAccount({ email: data.user.email, role: profileAccess.role }, profileAccess.accessStatus)
    ) {
      return null;
    }
    return buildSessionUser(
      data.user.id,
      data.user.email ?? "",
      profileAccess.role,
      profileName ?? (data.user.user_metadata?.full_name as string) ?? null,
      planInfo.plan,
      planInfo.premiumStatus,
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
  res.set("Cache-Control", "private, no-store");
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
 *   router.post("/x", requireAuth, requireRole("pro", "owner"), handler)
 */
export function requireRole(...roles: UserRole[]) {
  const allowed = new Set(roles.map((r) => r.toUpperCase()));
  return function roleGuard(req: Request, res: Response, next: NextFunction): void {
    const user = (req as AuthedRequest).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    // normalizeRole first: legacy role values grade as their mapped rung
    // (the single legacy map in auth/types.ts), never as a hard reject.
    const role = normalizeRole(user.role);
    if (!role || !allowed.has(role.toUpperCase())) {
      res.status(403).json({ error: "Forbidden", requiredRoles: roles });
      return;
    }
    next();
  };
}

/**
 * Express middleware factory: require a minimum rung of the tier ladder —
 * the API side of the section registry's `minTier` (plan.md §8 P4,
 * "tier-scoped APIs"). Pairs with `requireAuth`; roles arrive normalized
 * (loadProfileRole), so legacy rows are graded on their normalized rung.
 *
 *   router.get("/x", requireAuth, requireTier("plus"), handler)
 */
export function requireTier(minTier: UserRole) {
  return requireRole(...USER_ROLES.slice(USER_ROLES.indexOf(minTier)));
}

/** Convenience: require pro or owner (used by admin endpoints). */
export const requireAdmin = requireRole("pro", "owner");

/** Convenience: require owner only. */
export const requireOwner = requireRole("owner");

/**
 * Express middleware: require an owner account (root email or live owner grant).
 * Pairs with `requireAuth` so `req.user` exists.
 */
export function requireOwnerEmail(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const user = (req as AuthedRequest).user;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!isOwnerAccount(user)) {
    res.status(403).json({ error: "Forbidden — owner accounts only" });
    return;
  }
  next();
}

/**
 * Whether a role qualifies for unconditional premium access.
 * owner/pro are always privileged; a `premiumStatus` flag grants it too.
 */
export function hasFullAccess(
  role: string | null | undefined,
  premiumStatus?: boolean | null,
): boolean {
  if (role === "owner" || role === "pro") return true;
  return premiumStatus === true;
}
