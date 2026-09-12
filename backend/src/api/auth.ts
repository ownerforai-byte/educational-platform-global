import { Request, Response, Router } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import {
  signInWithPassword,
  signUp,
  signOut,
} from "../auth/supabase";
import {
  SESSION_COOKIE,
  extractToken,
  getUserFromRequest,
  loadProfileRole,
  buildSessionUser,
  isOwnerEmail,
} from "../middleware/auth";
import type { SessionUser } from "../auth/types";
import type {
  LoginResponse,
  SignupResponse,
  LogoutResponse,
  MeResponse,
  RefreshResponse,
  ExtendedSessionUser,
} from "../auth/types";

// ── Cookie helpers ─────────────────────────────────────────────────────────

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function setSessionCookie(res: Response, token: string, expiresInSec?: number): void {
  const maxAge =
    typeof expiresInSec === "number" && Number.isFinite(expiresInSec) && expiresInSec > 0
      ? expiresInSec
      : 3600;
  res.cookie(SESSION_COOKIE, token, { ...cookieOptions, maxAge: maxAge * 1000 });
}

function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, cookieOptions);
}

// ── Validation schemas ─────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

// ── Helpers ─────────────────────────────────────────────────────────────────

async function resolveSessionUser(userId: string, email: string): Promise<SessionUser> {
  const role = await loadProfileRole(userId);
  return buildSessionUser(userId, email, role);
}

async function buildExtendedUser(userId: string, email: string, role: string | null): Promise<ExtendedSessionUser> {
  const isOwner = isOwnerEmail(email) || role === "OWNER";
  const profile = await supabaseAdmin
    .from("profiles")
    .select("credits, credits_limit, premium_status, premium_approved_at")
    .eq("id", userId)
    .maybeSingle();

  return {
    id: userId,
    email,
    fullName: null,
    role: isOwner ? "OWNER" : ((role as ExtendedSessionUser["role"]) ?? null),
    credits: isOwner ? 999999 : (profile?.data?.credits ?? 0),
    creditsLimit: isOwner ? 999999 : (profile?.data?.credits_limit ?? 100),
    premiumStatus: isOwner ? true : (profile?.data?.premium_status ?? false),
    premiumApprovedAt: isOwner ? (profile?.data?.premium_approved_at ?? new Date().toISOString()) : (profile?.data?.premium_approved_at ?? null),
  };
}

// ── Routes ─────────────────────────────────────────────────────────────────

const router = Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 * 200 → { user: ExtendedSessionUser, accessToken }
 * 400 → invalid payload
 * 401 → bad credentials
 */
router.post("/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email or password format" });
    return;
  }

  const { data, error } = await signInWithPassword(parsed.data.email, parsed.data.password);

  if (error || !data.user || !data.session) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const user = await resolveSessionUser(data.user.id, data.user.email ?? parsed.data.email);
  const extended = await buildExtendedUser(user.id, user.email, user.role);

  setSessionCookie(res, data.session.access_token, data.session.expires_in);

  const body: LoginResponse = { user: extended, accessToken: data.session.access_token };
  res.json(body);
});

/**
 * POST /api/auth/signup
 * Body: { email, password, fullName? }
 * 200 → { user, accessToken, message? }
 * 202 → user created but needs email confirmation
 */
router.post("/signup", async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid signup details" });
    return;
  }

  const result = await signUp(parsed.data);

  if (result.error) {
    res.status(400).json({ error: "Something went wrong. Please try again." });
    return;
  }

  if (result.needsEmailConfirmation || !result.user || !result.session) {
    const body: SignupResponse = {
      user: null,
      accessToken: null,
      message: "Check your email to confirm your account before logging in.",
    };
    res.status(202).json(body);
    return;
  }

  const user = await resolveSessionUser(result.user.id, result.user.email);
  const extended = await buildExtendedUser(user.id, user.email, user.role);

  setSessionCookie(res, result.session.access_token, result.session.expires_in);

  const body: SignupResponse = { user: extended, accessToken: result.session.access_token };
  res.json(body);
});

/**
 * POST /api/auth/refresh
 * Refreshes the session when the current token is still valid but about
 * to expire, or when called with a valid refresh token via the cookie.
 * 200 → { user, accessToken }
 * 401 → no valid session to refresh
 */
router.post("/refresh", async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: "No session to refresh" });
    return;
  }

  const user = await getUserFromRequest(req);
  if (!user) {
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }

  const extended = await buildExtendedUser(user.id, user.email, user.role);
  setSessionCookie(res, token);

  const body: RefreshResponse = { user: extended, accessToken: token };
  res.json(body);
});

/**
 * POST /api/auth/logout
 * Clears the session cookie and best-effort invalidates the token.
 * 200 → { ok: true }
 */
router.post("/logout", async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (token) {
    await signOut(token);
  }
  clearSessionCookie(res);
  const body: LogoutResponse = { ok: true };
  res.json(body);
});

/**
 * GET /api/auth/me
 * 200 → { user: ExtendedSessionUser | null }
 * 401 → no valid session
 */
router.get("/me", async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req);

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const extended = await buildExtendedUser(user.id, user.email, user.role);
  const body: MeResponse = { user: extended };
  res.json(body);
});

export default router;
