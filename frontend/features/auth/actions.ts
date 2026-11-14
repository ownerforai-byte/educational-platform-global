import { loginSchema, signupSchema } from "./schema";
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from "@/lib/api/auth";
import type { SessionUser } from "./types";
import {
  AUTH_INVALID_CREDENTIALS,
  AUTH_TRY_AGAIN,
  authFailureMessage,
} from "./public-messages";

export type AuthActionResult =
  | {
      ok: true;
      user?: SessionUser | null;
      message?: string;
      statusToken?: string;
      /**
       * PENDING accounts resolve HTTP 200 with `code: "PENDING_APPROVAL"` —
       * not a hard deny. The bot approves automatically within ~5 minutes.
       */
      code?: string;
    }
  | {
      ok: false;
      error: string;
      /** Machine-readable failure reason (PENDING_APPROVAL / ACCOUNT_REJECTED). */
      code?: string;
      /** Signed token that opens the /welcome pending-status screen. */
      statusToken?: string;
    };

/**
 * The login/signup API answers a PENDING account with HTTP 200 and
 * `{ code: "PENDING_APPROVAL", statusToken }` (never a hard deny) — the bot
 * flips `access_status` to ACTIVE ~5 minutes after creation. Detect that body
 * on the RESOLVED response so the caller routes to the waiting screen instead
 * of treating it as a sign-in.
 */
function pendingApprovalResult(res: unknown): AuthActionResult | null {
  const body = res as { code?: string; statusToken?: string } | null;
  if (!body || body.code !== "PENDING_APPROVAL") return null;
  return { ok: true, code: "PENDING_APPROVAL", statusToken: body.statusToken };
}

export async function loginAction(input: unknown): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: AUTH_INVALID_CREDENTIALS };
  }

  try {
    const res = await apiLogin(parsed.data);
    return pendingApprovalResult(res) ?? { ok: true, user: res.user ?? null };
  } catch (err) {
    const e = err as Error & { code?: string; statusToken?: string };
    return {
      ok: false,
      error: authFailureMessage(err, "login"),
      code: e.code,
      statusToken: e.statusToken,
    };
  }
}

export async function signupAction(input: unknown): Promise<AuthActionResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: AUTH_TRY_AGAIN }; // weak client validation only
  }

  try {
    const res = await apiSignup(parsed.data);
    return (
      pendingApprovalResult(res) ?? {
        ok: true,
        user: res.user ?? null,
        message: res.message,
        statusToken: res.statusToken,
      }
    );
  } catch (err) {
    const e = err as Error & { code?: string; statusToken?: string };
    return {
      ok: false,
      error: authFailureMessage(err, "signup"),
      code: e.code,
      statusToken: e.statusToken,
    };
  }
}

export async function logoutAction(): Promise<AuthActionResult> {
  try {
    await apiLogout();
    return { ok: true, user: null };
  } catch {
    return { ok: false, error: AUTH_TRY_AGAIN };
  }
}
