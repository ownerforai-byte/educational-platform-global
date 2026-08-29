import { Request, Response, Router } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { signInWithPassword, signUp } from "../auth/supabase";
import {
  extractToken,
  getUserFromRequest,
  loadProfileRole,
  buildSessionUser,
  type SessionUser,
} from "../middleware/auth";

const SESSION_COOKIE = "sb-access-token";

const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function setSessionCookie(res: Response, accessToken: string, expiresInSeconds?: number): void {
  const maxAgeSeconds =
    typeof expiresInSeconds === "number" && Number.isFinite(expiresInSeconds) && expiresInSeconds > 0
      ? expiresInSeconds
      : 3600;
  res.cookie(SESSION_COOKIE, accessToken, {
    ...sessionCookieOptions,
    maxAge: maxAgeSeconds * 1000,
  });
}

function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions);
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

async function resolveSessionUser(userId: string, email: string): Promise<SessionUser> {
  let role = null;
  try {
    role = await loadProfileRole(userId);
  } catch {
    role = null;
  }
  return buildSessionUser(userId, email, role);
}

const router = Router();

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

  setSessionCookie(res, data.session.access_token, data.session.expires_in);

  const user = await resolveSessionUser(data.user.id, data.user.email ?? parsed.data.email);
  res.json({ user });
});

router.post("/signup", async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid signup details" });
    return;
  }

  const { data, error } = await signUp(parsed.data.email, parsed.data.password, parsed.data.fullName);

  if (error) {
    res.status(400).json({ error: "Something went wrong. Please try again." });
    return;
  }

  if (!data.session || !data.user) {
    res.json({
      user: null,
      message: "Check your email to confirm your account before logging in.",
    });
    return;
  }

  setSessionCookie(res, data.session.access_token, data.session.expires_in);

  const user = await resolveSessionUser(data.user.id, data.user.email ?? parsed.data.email);
  res.json({ user });
});

router.post("/logout", async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (token) {
    try {
      const signOutWithToken = supabaseAdmin.auth.signOut as unknown as (
        accessToken: string,
      ) => Promise<unknown>;
      await signOutWithToken(token);
    } catch {
      // best-effort: always clear the cookie regardless of signOut outcome
    }
  }
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get("/me", async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req);

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // Load full profile with credits
  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("credits, premium_status, premium_approved_at")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Failed to load profile:", error.message);
  }

  res.json({
    user: {
      ...user,
      credits: profile?.credits ?? 0,
      premiumStatus: profile?.premium_status ?? false,
    },
  });
});

export default router;
