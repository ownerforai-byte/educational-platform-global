import { loginSchema, signupSchema } from "./schema";
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from "@/lib/api/auth";
import type { SessionUser } from "./types";

export type AuthActionResult =
  | { ok: true; user?: SessionUser | null; message?: string }
  | { ok: false; error: string };

export async function loginAction(input: unknown): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid email or password format" };
  }

  try {
    const res = await apiLogin(parsed.data);
    return { ok: true, user: res.user ?? null };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
    };
  }
}

export async function signupAction(input: unknown): Promise<AuthActionResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check your details and try again." };
  }

  try {
    const res = await apiSignup(parsed.data);
    return { ok: true, user: res.user ?? null, message: res.message };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
    };
  }
}

export async function logoutAction(): Promise<AuthActionResult> {
  try {
    await apiLogout();
    return { ok: true, user: null };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
    };
  }
}
