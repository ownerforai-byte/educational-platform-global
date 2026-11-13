import { loginSchema, signupSchema } from "./schema";
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from "@/lib/api/auth";
import type { SessionUser } from "./types";
import {
  AUTH_INVALID_CREDENTIALS,
  AUTH_TRY_AGAIN,
  authFailureMessage,
} from "./public-messages";

export type AuthActionResult =
  | { ok: true; user?: SessionUser | null; message?: string; statusToken?: string }
  | {
      ok: false;
      error: string;
      /** Machine-readable failure reason (PENDING_APPROVAL / ACCOUNT_REJECTED). */
      code?: string;
      /** Signed token that opens the /welcome pending-status screen. */
      statusToken?: string;
    };

export async function loginAction(input: unknown): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: AUTH_INVALID_CREDENTIALS };
  }

  try {
    const res = await apiLogin(parsed.data);
    return { ok: true, user: res.user ?? null };
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
    return { ok: true, user: res.user ?? null, message: res.message, statusToken: res.statusToken };
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
