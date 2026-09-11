import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "OWNER";

export type SessionUser = {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
};

export type AuthedRequest = Request & { user: SessionUser };

const USER_ROLES = ["STUDENT", "TEACHER", "ADMIN", "OWNER"] as const;

function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && (USER_ROLES as ReadonlyArray<string>).includes(value);
}

export function extractToken(req: Request): string | undefined {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    return header.slice(7);
  }
  return req.cookies?.["sb-access-token"] as string | undefined;
}

export async function loadProfileRole(userId: string): Promise<UserRole | null> {
  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.warn(`[Auth] Unable to load profile for user ${userId}:`, error.message);
    return null;
  }

  const rawRole = typeof profile?.role === "string" ? profile.role.toUpperCase() : null;

  return isUserRole(rawRole) ? rawRole : null;
}

export function buildSessionUser(
  id: string,
  email: string,
  role: UserRole | null,
): SessionUser {
  return {
    id,
    email,
    fullName: null,
    role,
  };
}

export async function getUserFromRequest(req: Request): Promise<SessionUser | null> {
  const token = extractToken(req);

  if (!token) {
    return null;
  }

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
      if (error) {
        console.warn("[Auth] Token validation failed:", error.message);
      }
      return null;
    }

    let role: UserRole | null = null;
    try {
      role = await loadProfileRole(data.user.id);
    } catch (roleErr) {
      console.warn(`[Auth] Failed to resolve role for user ${data.user.id}:`, roleErr);
      role = null;
    }

    return buildSessionUser(data.user.id, data.user.email ?? "", role);
  } catch (err) {
    console.error("[Auth] Unexpected error during getUserFromRequest:", err);
    return null;
  }
}

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
