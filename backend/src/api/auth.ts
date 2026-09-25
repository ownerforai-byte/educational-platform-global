import { Request, Response, Router } from "express";
import { z } from "zod";
import { isProductionEnv } from "../config/env";
import { supabaseAdmin } from "../db/supabase";
import {
  signInWithPassword,
  signUp,
  signOut,
  AuthProviderError,
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

// Secure flag evaluated per-call (isProductionEnv, not raw NODE_ENV): Render's
// runtime may not set NODE_ENV, and cross-site OAuth redirects require the
// Secure flag in production.
const cookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: isProductionEnv(),
  path: "/",
});

function setSessionCookie(res: Response, token: string, expiresInSec?: number): void {
  const maxAge =
    typeof expiresInSec === "number" && Number.isFinite(expiresInSec) && expiresInSec > 0
      ? expiresInSec
      : 3600;
  res.cookie(SESSION_COOKIE, token, { ...cookieOptions(), maxAge: maxAge * 1000 });
}

/** The refresh token lives 30 days so users stay signed in past the 1h access token. */
const REFRESH_COOKIE = "sb-refresh-token";
const REFRESH_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 30;

function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE, token, {
    ...cookieOptions(),
    maxAge: REFRESH_COOKIE_MAX_AGE_SEC * 1000,
  });
}

function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, cookieOptions());
  res.clearCookie(REFRESH_COOKIE, cookieOptions());
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

async function buildExtendedUser(
  userId: string,
  email: string,
  role: string | null,
  fullName?: string | null,
): Promise<ExtendedSessionUser> {
  const isOwner = isOwnerEmail(email) || role === "OWNER";

  // Persist the display name on signup/first login (the profiles trigger only
  // copies it from raw_user_meta_data; refresh flows may not have it).
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    await supabaseAdmin
      .from("profiles")
      .update({ full_name: fullName.trim() })
      .eq("id", userId);
  }

  const profile = await supabaseAdmin
    .from("profiles")
    .select("full_name, credits, credits_limit, premium_status, premium_approved_at")
    .eq("id", userId)
    .maybeSingle();

  const persistedName =
    typeof profile?.data?.full_name === "string" && profile.data.full_name.trim()
      ? profile.data.full_name.trim()
      : null;

  return {
    id: userId,
    email,
    fullName: fullName ?? persistedName,
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
  if (data.session.refresh_token) setRefreshCookie(res, data.session.refresh_token);

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

  try {
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
    const extended = await buildExtendedUser(
      user.id,
      user.email,
      user.role,
      parsed.data.fullName ?? null,
    );

    setSessionCookie(res, result.session.access_token, result.session.expires_in);
    if (result.session.refresh_token) setRefreshCookie(res, result.session.refresh_token);

    const body: SignupResponse = { user: extended, accessToken: result.session.access_token };
    res.json(body);
  } catch (err) {
    if (err instanceof AuthProviderError) {
      const tooMany = err.code === "over_email_send_rate_limit" || err.status === 429;
      res.status(err.status === 429 ? 429 : err.status || 400).json({
        error: tooMany
          ? "Too many signup attempts right now — please wait a minute and try again."
          : err.message,
        code: err.code ?? undefined,
      });
      return;
    }
    throw err;
  }
});

/**
 * POST /api/auth/refresh
 * Preferred path: rotate the session using the long-lived `sb-refresh-token`
 * cookie (set at login/signup). Supabase returns a fresh access token, so
 * users stay signed in past the 1-hour access-token expiry instead of being
 * hard-logged-out (the 2026-09-25 "still auth failing" report).
 *
 * Legacy fallback: no refresh cookie → re-validate the still-valid access
 * token and re-set it (keeps older clients working).
 *
 * 200 → { user, accessToken }
 * 401 → no valid session to refresh
 */
router.post("/refresh", async (req: Request, res: Response) => {
  const refreshToken =
    (req.cookies?.[REFRESH_COOKIE] as string | undefined) || undefined;

  if (refreshToken) {
    const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token: refreshToken });
    const session = data?.session;

    if (!error && session?.access_token) {
      const user = await getUserFromRequest({
        headers: { authorization: `Bearer ${session.access_token}` },
      } as unknown as Request);
      if (user) {
        const extended = await buildExtendedUser(user.id, user.email, user.role);
        setSessionCookie(res, session.access_token, session.expires_in);
        // Supabase rotates refresh tokens on use — persist the new one.
        if (session.refresh_token) setRefreshCookie(res, session.refresh_token);

        const body: RefreshResponse = { user: extended, accessToken: session.access_token };
        res.json(body);
        return;
      }
    }
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }

  // ── Legacy fallback: access token still valid → re-set it ──
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
