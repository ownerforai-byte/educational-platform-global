import { Request, Response, Router } from "express";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { isProductionEnv } from "../../config/env";
import { createAuthClient, supabaseAdmin } from "../../db/supabase";
import {
  getProfileById,
  updateProfileFields,
} from "../../db/repositories/user.repository.js";
import { ensureDailyCredits } from "../../services/credit.service.js";
import {
  DEVICE_SIGNUP_LIMIT_MESSAGE,
  bindDeviceToAccount,
  checkDeviceSignupLimit,
} from "../../utils/deviceSignup";
import { createStatusToken, verifyStatusToken } from "../../utils/statusToken";
import { ensureAccessRequest } from "../../services/access-requests";
import { useFirebaseAuth } from "../../auth/auth-mode.js";
import {
  firebaseCreateUser,
  firebaseSendPasswordResetEmail,
  firebaseUpdatePassword,
  revokeFirebaseSessions,
  verifyFirebaseIdToken,
} from "../../auth/firebase-admin-auth.js";
import { verifyAccessToken } from "../../auth/token-verify.js";
import {
  signInWithPassword,
  signUp,
  signOut,
  AuthProviderError,
} from "../../auth/supabase";
import { ensureAuthProfile } from "../../services/auth-profile.js";
import {
  SESSION_COOKIE,
  extractToken,
  getUserFromRequest,
  loadProfileRole,
  loadProfileAccess,
  loadProfilePlan,
  buildSessionUser,
  isOwnerEmail,
  isApprovedAccount,
} from "../../middleware/auth";
import { isOriginAllowed } from "../../middleware/cors";
import { normalizeRole, type SessionUser } from "../../auth/types";
import type {
  LoginResponse,
  SignupResponse,
  LogoutResponse,
  MeResponse,
  RefreshResponse,
  ExtendedSessionUser,
} from "../../auth/types";

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
const OAUTH_CSRF_COOKIE = "oauth-csrf-token";

/** Social providers the app accepts for OAuth sessions — mirrors the login-form buttons. */
const ALLOWED_OAUTH_PROVIDERS = new Set(["google"]);

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

const loginSchema = z
  .object({
    email: z.string().email().optional(),
    password: z.string().min(1).optional(),
    idToken: z.string().min(1).max(8192).optional(),
  })
  .refine((body) => Boolean(body.idToken?.trim()) || Boolean(body.email && body.password), {
    message: "Invalid email or password format",
  });

const signupSchema = z
  .object({
    fullName: z.string().trim().min(2).max(80).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(72).optional(),
    idToken: z.string().min(1).max(8192).optional(),
  })
  .refine(
    (body) => Boolean(body.idToken?.trim()) || Boolean(body.email && body.password),
    { message: "Invalid signup details" },
  );

const refreshSchema = z.object({
  idToken: z.string().min(1).max(8192).optional(),
});

const oauthSessionSchema = z.object({
  accessToken: z.string().min(1).max(8192),
  refreshToken: z.string().min(1).max(8192).optional(),
  state: z.string().regex(/^[a-f0-9]{64}$/),
});

// ── Helpers ─────────────────────────────────────────────────────────────────

type AccessStatus = "PENDING" | "ACTIVE" | "REJECTED";

async function readAccessStatus(userId: string, email?: string): Promise<AccessStatus> {
  const { role, accessStatus } = await loadProfileAccess(userId);
  if (isApprovedAccount({ email, role }, accessStatus)) return "ACTIVE";
  return accessStatus === "REJECTED" ? "REJECTED" : "PENDING";
}

/**
 * 403 for a non-ACTIVE account — never issues or renews cookies.
 * Carries a signed `statusToken` so the client can bounce the user straight
 * to the /welcome status screen (pending page) instead of stranding them on
 * the login form with an error they cannot act on.
 */
function accessDenied(res: Response, status: AccessStatus, userId?: string): void {
  const pending = status === "PENDING";
  if (pending && userId) {
    // Best-effort: (re)start the timed access-bot clock for FCM automation.
    void ensureAccessRequest(userId);
  }
  res.status(403).json({
    error: pending ? "Account pending approval" : "Account denied",
    code: pending ? "PENDING_APPROVAL" : "ACCOUNT_REJECTED",
    message: pending
      ? "After signing, the account is approved by the system verification and administrative approval."
      : "This account was denied. You can create a new account, or leave a message to sahrocky81@gmail.com.",
    statusToken: userId ? createStatusToken(userId) : undefined,
  });
}

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
  // Persist the display name on signup/first login (the profiles trigger only
  // copies it from raw_user_meta_data; refresh flows may not have it).
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    await updateProfileFields(userId, { full_name: fullName.trim() });
  }

  // Live plan + role folded the same way requireAuth / spark / section gates do —
  // otherwise /me could leave a Plus/Pro plan account stuck as Member in the UI.
  const planInfo = await loadProfilePlan(userId);
  const session = buildSessionUser(
    userId,
    email,
    normalizeRole(role),
    fullName ?? null,
    planInfo.plan,
    planInfo.premiumStatus,
  );
  const isOwner = session.role === "owner";

  // Lazy midnight reset (owner policy): a session fetched after 12:00 AM
  // reports today's daily pool, not yesterday's spent balance.
  await ensureDailyCredits(userId, email, session.role, session.premiumStatus === true);

  const { data: profile } = await getProfileById(
    userId,
    "full_name, credits, credits_limit, premium_status, premium_approved_at",
  );

  const persistedName =
    typeof profile?.full_name === "string" && profile.full_name.trim()
      ? profile.full_name.trim()
      : null;

  return {
    id: session.id,
    email: session.email,
    fullName: fullName ?? persistedName ?? session.fullName,
    role: session.role,
    plan: session.plan ?? planInfo.plan,
    credits: isOwner ? 999999 : ((profile?.credits as number | undefined) ?? 0),
    creditsLimit: isOwner ? 999999 : ((profile?.credits_limit as number | undefined) ?? 100),
    premiumStatus: isOwner
      ? true
      : (planInfo.premiumStatus ?? (profile?.premium_status as boolean | undefined) ?? false),
    premiumApprovedAt: isOwner
      ? ((profile?.premium_approved_at as string | null) ?? new Date().toISOString())
      : ((profile?.premium_approved_at as string | null) ?? null),
  };
}

// ── Routes ─────────────────────────────────────────────────────────────────

const router = Router();

router.use((_req, res, next) => {
  res.set("Cache-Control", "private, no-store");
  next();
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 * 200 → { user: ExtendedSessionUser, accessToken }
 * 400 → invalid payload
 * 401 → bad credentials
 */
router.post("/oauth/csrf", (req: Request, res: Response) => {
  const origin = req.get("origin");
  if (!origin || !isOriginAllowed(origin)) {
    res.setHeader("Cache-Control", "no-store");
    res.status(403).json({ error: "OAuth sign-in is not allowed from this origin" });
    return;
  }

  const csrfToken = randomBytes(32).toString("hex");
  res.cookie(OAUTH_CSRF_COOKIE, csrfToken, {
    ...cookieOptions(),
    maxAge: 10 * 60 * 1000,
  });
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Vary", "Origin");
  res.json({ csrfToken });
});

router.post("/oauth/session", async (req: Request, res: Response) => {
  const parsed = oauthSessionSchema.safeParse(req.body);
  res.setHeader("Cache-Control", "no-store");
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid OAuth session" });
    return;
  }
  const origin = req.get("origin");
  if (!origin || !isOriginAllowed(origin)) {
    res.status(403).json({ error: "OAuth session exchange is not allowed from this origin" });
    return;
  }
  const csrfToken = req.get("x-csrf-token");
  const cookieToken = req.cookies?.[OAUTH_CSRF_COOKIE] as string | undefined;
  const csrfMatches =
    csrfToken &&
    cookieToken &&
    /^[a-f0-9]{64}$/.test(csrfToken) &&
    /^[a-f0-9]{64}$/.test(cookieToken) &&
    timingSafeEqual(Buffer.from(csrfToken, "hex"), Buffer.from(cookieToken, "hex"));
  if (!csrfMatches || parsed.data.state !== csrfToken) {
    res.status(403).json({ error: "OAuth session exchange could not be verified" });
    return;
  }
  try {
    const identity = await verifyAccessToken(parsed.data.accessToken);
    if (!identity?.email) {
      res.clearCookie(OAUTH_CSRF_COOKIE, cookieOptions());
      res.status(401).json({ error: "OAuth authentication could not be verified" });
      return;
    }
    const hasAllowedProvider =
      identity.providerIds.some((p) => p === "google" || p === "google.com") ||
      (!useFirebaseAuth() && identity.providerIds.some((p) => ALLOWED_OAUTH_PROVIDERS.has(p)));
    if (parsed.data.state !== csrfToken || !hasAllowedProvider) {
      res.clearCookie(OAUTH_CSRF_COOKIE, cookieOptions());
      res.status(401).json({ error: "OAuth authentication could not be verified" });
      return;
    }

    await ensureAuthProfile(identity.id, {
      email: identity.email,
      fullName: identity.fullName,
    });

    const accessStatus = await readAccessStatus(identity.id, identity.email);
    if (accessStatus !== "ACTIVE") {
      res.clearCookie(OAUTH_CSRF_COOKIE, cookieOptions());
      const pending = accessStatus === "PENDING";
      // A pending OAuth account is also the device's one account: refuse a
      // DIFFERENT unapproved account on this device, otherwise bind this one
      // (the same account re-signing in must not block itself).
      if (pending) {
        const device = await checkDeviceSignupLimit(req, res, identity.id);
        if (device.limited) {
          res.status(403).json({ error: DEVICE_SIGNUP_LIMIT_MESSAGE, code: "DEVICE_SIGNUP_LIMIT" });
          return;
        }
        await bindDeviceToAccount(device.deviceId, identity.id);
        await ensureAccessRequest(identity.id);
      }
      const statusToken = pending ? createStatusToken(identity.id) : undefined;
      res.status(403).json({
        error: pending ? "Account pending approval" : "Account denied",
        code: pending ? "PENDING_APPROVAL" : "ACCOUNT_REJECTED",
        message: pending
          ? "After signing, the account is approved by the system verification and administrative approval."
          : "This account was denied. You can create a new account, or leave a message to sahrocky81@gmail.com.",
        ...(statusToken ? { statusToken } : {}),
        ...(pending ? { user: null, accessToken: null } : {}),
      });
      return;
    }

    const role = await loadProfileRole(identity.id);
    const user = await buildExtendedUser(
      identity.id,
      identity.email,
      role,
      identity.fullName,
    );
    setSessionCookie(res, parsed.data.accessToken);
    if (!useFirebaseAuth() && parsed.data.refreshToken) {
      setRefreshCookie(res, parsed.data.refreshToken);
    }
    res.clearCookie(OAUTH_CSRF_COOKIE, cookieOptions());
    res.json({ user, accessToken: parsed.data.accessToken });
  } catch (err) {
    console.error("[auth] OAuth session validation failed:", err);
    res.status(500).json({ error: "Could not complete sign-in" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email or password format" });
    return;
  }

  if (useFirebaseAuth()) {
    const idToken = parsed.data.idToken?.trim();
    if (!idToken) {
      res.status(400).json({
        error: "Sign in with the Firebase client SDK and send idToken",
        code: "FIREBASE_CLIENT_AUTH",
      });
      return;
    }
    const verified = await verifyFirebaseIdToken(idToken);
    if (!verified?.email) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    await ensureAuthProfile(verified.uid, { email: verified.email, fullName: verified.displayName });
    const accessStatus = await readAccessStatus(verified.uid, verified.email);
    if (accessStatus !== "ACTIVE") {
      accessDenied(res, accessStatus, verified.uid);
      return;
    }
    const user = await resolveSessionUser(verified.uid, verified.email);
    const extended = await buildExtendedUser(user.id, user.email, user.role, verified.displayName);
    setSessionCookie(res, idToken);
    const body: LoginResponse = { user: extended, accessToken: idToken };
    res.json(body);
    return;
  }

  const email = parsed.data.email!;
  const password = parsed.data.password!;
  const { data, error } = await signInWithPassword(email, password);

  if (error || !data.user || !data.session) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Credentials are valid, but access may not be: PENDING/REJECTED accounts
  // never receive a session (no cookies are set on this path).
  const accessStatus = await readAccessStatus(data.user.id, data.user.email);
  if (accessStatus !== "ACTIVE") {
    accessDenied(res, accessStatus, data.user.id);
    return;
  }

  const user = await resolveSessionUser(data.user.id, data.user.email ?? email);
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

  if (useFirebaseAuth()) {
    const idToken = parsed.data.idToken?.trim();
    let uid: string;
    let email: string;
    let fullName = parsed.data.fullName ?? null;
    let accessToken = idToken ?? "";

    if (idToken) {
      const verified = await verifyFirebaseIdToken(idToken);
      if (!verified?.email) {
        res.status(401).json({ error: "Invalid signup session" });
        return;
      }
      uid = verified.uid;
      email = verified.email;
      fullName = fullName ?? verified.displayName;
    } else if (parsed.data.email && parsed.data.password) {
      const created = await firebaseCreateUser({
        email: parsed.data.email,
        password: parsed.data.password,
        displayName: fullName,
        emailVerified: isOwnerEmail(parsed.data.email),
      });
      if (!created) {
        res.status(400).json({ error: "Something went wrong. Please try again." });
        return;
      }
      uid = created.uid;
      email = created.email;
      res.status(202).json({
        user: null,
        accessToken: null,
        message: "Account created — sign in to continue.",
      } satisfies SignupResponse);
      await ensureAuthProfile(uid, { email, fullName, isSignup: true });
      return;
    } else {
      res.status(400).json({ error: "Invalid signup details" });
      return;
    }

    const ownerSignup = isOwnerEmail(email);
    let deviceId: string | null = null;
    if (!ownerSignup) {
      const device = await checkDeviceSignupLimit(req, res);
      if (device.limited) {
        res.status(403).json({ error: DEVICE_SIGNUP_LIMIT_MESSAGE, code: "DEVICE_SIGNUP_LIMIT" });
        return;
      }
      deviceId = device.deviceId;
    }

    await ensureAuthProfile(uid, { email, fullName, isSignup: true });
    if (deviceId) await bindDeviceToAccount(deviceId, uid);

    const { error: profileErr } = await updateProfileFields(
      uid,
      ownerSignup
        ? { access_status: "ACTIVE", role: "owner", plan: "pro", premium_status: true, full_name: fullName }
        : {
            access_status: "PENDING",
            role: "member",
            plan: "member",
            premium_status: false,
            full_name: fullName,
          },
    );
    if (profileErr) console.error("[auth] signup profile tier write failed:", profileErr.message);
    if (!ownerSignup) await ensureAccessRequest(uid);

    const accessStatus = await readAccessStatus(uid, email);
    if (accessStatus !== "ACTIVE") {
      if (accessStatus === "REJECTED") {
        accessDenied(res, accessStatus, uid);
        return;
      }
      const body: SignupResponse = {
        user: null,
        accessToken: null,
        message:
          "After signing, the account is approved by the system verification and administrative approval.",
        statusToken: createStatusToken(uid),
        accessStatus: "PENDING",
      };
      res.json(body);
      return;
    }

    const user = await resolveSessionUser(uid, email);
    const extended = await buildExtendedUser(user.id, user.email, user.role, fullName);
    if (!accessToken) {
      res.status(400).json({ error: "Missing idToken for signup session" });
      return;
    }
    setSessionCookie(res, accessToken);
    res.json({ user: extended, accessToken } satisfies SignupResponse);
    return;
  }

  // One account per device without approval (owner 2026-11-09).
  // Operator accounts bypass the device gate — direct login.
  const ownerSignup = isOwnerEmail(parsed.data.email);
  let deviceId: string | null = null;
  if (!ownerSignup) {
    const device = await checkDeviceSignupLimit(req, res);
    if (device.limited) {
      res.status(403).json({ error: DEVICE_SIGNUP_LIMIT_MESSAGE, code: "DEVICE_SIGNUP_LIMIT" });
      return;
    }
    deviceId = device.deviceId;
  }

  try {
    const result = await signUp({
      email: parsed.data.email!,
      password: parsed.data.password!,
      fullName: parsed.data.fullName,
    });

    if (result.error) {
      res.status(400).json({ error: "Something went wrong. Please try again." });
      return;
    }

    // Bind the new account to this device before any early return, so a
    // pending or email-confirmation signup still counts as the device's one
    // account. Best-effort — never fails the signup response.
    if (result.user && deviceId) {
      await bindDeviceToAccount(deviceId, result.user.id);
    }

    // Force the live profile tier on every signup. The profiles.role column
    // must accept ladder text (member/plus/pro/owner); a leftover user_role
    // enum made these writes fail silently and left STUDENT/OWNER defaults
    // that graded as owner. Non-owner emails always enter as PENDING members.
    if (result.user) {
      const { error: profileErr } = await updateProfileFields(
        result.user.id,
        ownerSignup
          ? { access_status: "ACTIVE", role: "owner", plan: "pro", premium_status: true }
          : {
              access_status: "PENDING",
              role: "member",
              plan: "member",
              premium_status: false,
            },
      );
      if (profileErr) {
        console.error("[auth] signup profile tier write failed:", profileErr.message);
      }
      // Start the timed access-bot clock (Firebase Functions + FCM).
      if (!ownerSignup) {
        await ensureAccessRequest(result.user.id);
      }
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

    // ── Account creation flow: new accounts start PENDING ──
    // NO session cookies are issued; the client gets a signed status token
    // and is sent to the status screen instead of being logged in.
    const accessStatus = await readAccessStatus(result.user.id, result.user.email);
    if (accessStatus !== "ACTIVE") {
      if (accessStatus === "REJECTED") {
        accessDenied(res, accessStatus, result.user.id);
        return;
      }
      await ensureAccessRequest(result.user.id);
      const body: SignupResponse = {
        user: null,
        accessToken: null,
        message:
          "After signing, the account is approved by the system verification and administrative approval.",
        statusToken: createStatusToken(result.user.id),
        accessStatus: "PENDING",
      };
      res.json(body);
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
  if (useFirebaseAuth()) {
    const parsed = refreshSchema.safeParse(req.body ?? {});
    const idToken = parsed.success ? parsed.data.idToken?.trim() : undefined;
    const token = idToken || extractToken(req);
    if (!token) {
      res.status(401).json({ error: "No session to refresh" });
      return;
    }
    const user = await getUserFromRequest(
      { headers: { authorization: `Bearer ${token}` } } as unknown as Request,
      { allowUnapproved: true },
    );
    if (!user) {
      res.status(401).json({ error: "Invalid or expired session" });
      return;
    }
    const accessStatus = await readAccessStatus(user.id, user.email);
    if (accessStatus !== "ACTIVE") {
      clearSessionCookie(res);
      accessDenied(res, accessStatus, user.id);
      return;
    }
    const extended = await buildExtendedUser(user.id, user.email, user.role);
    setSessionCookie(res, token);
    const body: RefreshResponse = { user: extended, accessToken: token };
    res.json(body);
    return;
  }

  const refreshToken =
    (req.cookies?.[REFRESH_COOKIE] as string | undefined) || undefined;

  if (refreshToken) {
    // Throwaway client: refreshSession stores the new user session on the
    // client, which would downgrade the shared supabaseAdmin client's later
    // data writes to the user's RLS rights (silent 0-row updates).
    const { data, error } = await createAuthClient().auth.refreshSession({ refresh_token: refreshToken });
    const session = data?.session;

    if (!error && session?.access_token) {
      const user = await getUserFromRequest({
        headers: { authorization: `Bearer ${session.access_token}` },
      } as unknown as Request, { allowUnapproved: true });
      if (user) {
        // A revoked (PENDING/REJECTED) account must not renew its session.
        const accessStatus = await readAccessStatus(user.id, user.email);
        if (accessStatus !== "ACTIVE") {
          clearSessionCookie(res);
          accessDenied(res, accessStatus, user.id);
          return;
        }
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

  const user = await getUserFromRequest(req, { allowUnapproved: true });
  if (!user) {
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }

  // Legacy branch: same approval gate as the refresh-token path.
  const legacyAccess = await readAccessStatus(user.id, user.email);
  if (legacyAccess !== "ACTIVE") {
    clearSessionCookie(res);
    accessDenied(res, legacyAccess, user.id);
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
    if (useFirebaseAuth()) {
      const verified = await verifyFirebaseIdToken(token);
      if (verified) await revokeFirebaseSessions(verified.uid);
    } else {
      await signOut(token);
    }
  }
  clearSessionCookie(res);
  const body: LogoutResponse = { ok: true };
  res.json(body);
});

/**
 * GET /api/auth/account-status?token=<statusToken>&bump=1
 * Poll endpoint for the post-signup status screen — works WITHOUT a session
 * (the signup response carries the signed token) and cannot be used to probe
 * whether an arbitrary email is registered (a valid token is required).
 * `status_check_count` increments ONLY when bump=1 ("Check now"); timed polls
 * read the live tally without changing it.
 * 200 → { accessStatus, fullName, checkCount }
 * 401 → invalid/expired token
 * 404 → token valid but account row missing
 */
router.get("/account-status", async (req: Request, res: Response) => {
  const token = typeof req.query.token === "string" ? req.query.token : null;
  const userId = verifyStatusToken(token);
  if (!userId) {
    res.status(401).json({ error: "Invalid or expired status token" });
    return;
  }

  const bump =
    req.query.bump === "1" ||
    req.query.bump === "true" ||
    req.query.bump === "yes";

  const { data: profile } = await getProfileById(
    userId,
    "access_status, full_name, status_check_count",
  );

  if (!profile) {
    res.status(404).json({ error: "Account not found" });
    return;
  }

  const prev =
    typeof profile.status_check_count === "number" && Number.isFinite(profile.status_check_count)
      ? (profile.status_check_count as number)
      : 0;
  let checkCount = prev;
  if (bump) {
    checkCount = prev + 1;
    const { error: bumpErr } = await updateProfileFields(userId, {
      status_check_count: checkCount,
    });
    if (bumpErr) {
      console.error("[auth] status_check_count bump failed:", bumpErr.message);
      checkCount = prev;
    }
  }

  const raw = (profile.access_status as string | undefined) ?? "PENDING";
  res.json({
    accessStatus: raw === "ACTIVE" || raw === "REJECTED" ? raw : "PENDING",
    fullName: (profile.full_name as string | null) ?? null,
    checkCount,
  });
});

/**
 * GET /api/auth/me
 * 200 → { user: ExtendedSessionUser | null }
 * 401 → no valid session
 */
router.get("/me", async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req, { allowUnapproved: true });

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // Live approval gate: an account revoked mid-session loses its profile
  // immediately (the client clears state on this 403).
  const accessStatus = await readAccessStatus(user.id, user.email);
  if (accessStatus !== "ACTIVE") {
    clearSessionCookie(res);
    accessDenied(res, accessStatus, user.id);
    return;
  }

  const extended = await buildExtendedUser(user.id, user.email, user.role);
  const body: MeResponse = { user: extended };
  res.json(body);
});

// ── Password recovery (owner feature 2026-09-28) ─────────────────────────────

const forgotPasswordSchema = z.object({ email: z.string().trim().email() });

/**
 * POST /api/auth/forgot-password — { email }
 * 200 always (anti-enumeration): Supabase emails the recovery link when the
 * account exists; the response is identical when it does not. Rate-limited
 * by middleware (password-reset tier, 3/hour).
 */
router.post("/forgot-password", async (req: Request, res: Response) => {
  const parsed = forgotPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Enter a valid email address" });
    return;
  }

  const base = (
    process.env.FRONTEND_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:5173"
  ).replace(/\/+$/, "");
  const redirectTo = `${base}/reset-password`;

  try {
    if (useFirebaseAuth()) {
      const ok = await firebaseSendPasswordResetEmail(parsed.data.email, redirectTo);
      if (!ok) {
        console.warn("[auth] Firebase resetPasswordForEmail failed");
      }
    } else {
      const { error } = await supabaseAdmin.auth.resetPasswordForEmail(parsed.data.email, {
        redirectTo,
      });
      if (error) {
        // Never leak whether the address exists; log for ops instead.
        console.warn("[auth] resetPasswordForEmail failed:", error.message);
      }
    }
  } catch (err: unknown) {
    console.warn(
      "[auth] resetPasswordForEmail error:",
      err instanceof Error ? err.message : err,
    );
  }

  res.json({ sent: true });
});

/**
 * POST /api/auth/reset-password — { password, code?, token? }
 * The recovery email lands on /reset-password, which forwards either the
 * PKCE `code` (query) or the implicit `access_token` (hash) here. The user
 * id behind that proof is resolved server-side and the password is set
 * through the Supabase admin API — no session is issued on this path.
 */
router.post("/reset-password", async (req: Request, res: Response) => {
  const body = req.body as { password?: unknown; code?: unknown; token?: unknown };
  const password = typeof body.password === "string" ? body.password : "";
  const code = typeof body.code === "string" && body.code ? body.code : null;
  const token = typeof body.token === "string" && body.token ? body.token : null;

  if (password.length < 8 || password.length > 72) {
    res.status(400).json({ error: "Password must be between 8 and 72 characters" });
    return;
  }
  if (!code && !token) {
    res
      .status(400)
      .json({ error: "This reset link is missing or malformed. Please request a new one." });
    return;
  }

  try {
    let userId: string | null = null;

    if (code) {
      const { data, error } = await supabaseAdmin.auth.exchangeCodeForSession(code);
      if (error || !data?.user) {
        console.warn("[auth] exchangeCodeForSession failed:", error?.message ?? "no user");
        res
          .status(400)
          .json({ error: "This reset link is invalid or has expired. Please request a new one." });
        return;
      }
      userId = data.user.id;
    } else if (token) {
      if (useFirebaseAuth()) {
        const verified = await verifyFirebaseIdToken(token);
        if (!verified) {
          console.warn("[auth] Firebase recovery token rejected");
          res
            .status(400)
            .json({ error: "This reset link is invalid or has expired. Please request a new one." });
          return;
        }
        userId = verified.uid;
      } else {
        const { data, error } = await supabaseAdmin.auth.getUser(token);
        if (error || !data?.user) {
          console.warn("[auth] recovery token rejected:", error?.message ?? "no user");
          res
            .status(400)
            .json({ error: "This reset link is invalid or has expired. Please request a new one." });
          return;
        }
        userId = data.user.id;
      }
    }

    if (!userId) {
      res
        .status(400)
        .json({ error: "This reset link is invalid or has expired. Please request a new one." });
      return;
    }

    let passwordOk = false;
    if (useFirebaseAuth()) {
      passwordOk = await firebaseUpdatePassword(userId, password);
    } else {
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password,
      });
      passwordOk = !updateError;
    }
    if (!passwordOk) {
      console.error("[auth] password reset failed for user", userId);
      res.status(400).json({
        error:
          "Could not update the password. The link may have expired — please request a new one.",
      });
      return;
    }

    console.info(`[auth] password reset completed for user ${userId}`);
    res.json({ success: true });
  } catch (err: any) {
    console.error("[auth] reset-password error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
