import { loginSchema, signupSchema } from "./schema";
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from "@/lib/api/auth";
import { FirebaseMfaRequiredError } from "@/lib/firebase/client-auth";
import type { SessionUser } from "./types";
import {
  AUTH_INVALID_CREDENTIALS,
  AUTH_TRY_AGAIN,
  authFailureMessage,
} from "./public-messages";
import { isAccessApprovalRequired } from "@/lib/core/access-approval";

export type AuthActionResult =
  | {
      ok: true;
      user?: SessionUser | null;
      message?: string;
      statusToken?: string;
      /**
       * Machine-readable outcome code. The HTTP status is NOT authoritative:
       * `code: "PENDING_APPROVAL"` arrives as HTTP 200 from the login/signup
       * create paths AND as HTTP 403 from the session-gate paths (/me,
       * /refresh) — and `code: "ACCOUNT_REJECTED"` arrives as HTTP 403.
       * Callers must route on the `code` value, never on the HTTP status.
       * PENDING is not a hard deny: the bot approves automatically within
       * ~5 minutes.
       */
      code?: string;
    }
  | {
      ok: false;
      error: string;
      /**
       * Machine-readable failure reason (PENDING_APPROVAL / ACCOUNT_REJECTED).
       * Same status-agnostic contract as above: PENDING_APPROVAL can arrive
       * here with HTTP 200 or 403 depending on the route, ACCOUNT_REJECTED
       * with HTTP 403. Route on this value, not on the HTTP status.
       */
      code?: string;
      /** Signed token that opens the /welcome pending-status screen. */
      statusToken?: string;
    };

/**
 * Detect a PENDING account on the RESOLVED response body so the caller routes
 * to the waiting screen instead of treating it as a sign-in.
 *
 * Status-agnostic contract: `code: "PENDING_APPROVAL"` can arrive as HTTP 200
 * (login/signup create) or HTTP 403 (session-gate on /me|/refresh), and
 * `code: "ACCOUNT_REJECTED"` always arrives as HTTP 403 — so callers must
 * route on the `code` value, never on the HTTP status. Both carrier shapes
 * here preserve that contract:
 *  - RESOLVED body (HTTP 200 create paths): handled below.
 *  - THROWN error (non-2xx, e.g. the 403 session-gate): `apiFetch` copies the
 *    body's `code`/`statusToken` onto the thrown Error, and `loginAction`/
 *    `signupAction`'s catch blocks surface them on the returned result — so
 *    callers can route on `result.code` regardless of `ok`.
 */
function pendingApprovalResult(res: unknown): AuthActionResult | null {
  if (!isAccessApprovalRequired()) return null;
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
    if (err instanceof FirebaseMfaRequiredError) throw err;
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
        code: res.code,
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
