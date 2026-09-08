import { loginSchema, signupSchema } from "./schema";
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from "@/lib/api/auth";
import { setAccessToken } from "@/lib/api-client";
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
    // Persist the access token for cross-origin Bearer auth.
    if (res.accessToken) {
      setAccessToken(res.accessToken);
    }
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
    // Persist the access token for cross-origin Bearer auth.
    if (res.accessToken) {
      setAccessToken(res.accessToken);
    }
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
    // Clear the stored access token.
    setAccessToken(null);
    return { ok: true, user: null };
  } catch (err) {
    // Clear token even if the API call fails (e.g. network error).
    setAccessToken(null);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
    };
  }
}
