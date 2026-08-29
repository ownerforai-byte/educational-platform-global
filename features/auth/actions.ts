import { loginSchema, signupSchema } from "@/features/auth/schema";
import type { SessionUser } from "@/features/auth/types";

export type AuthActionResult =
  | { ok: true; user?: SessionUser | null; message?: string }
  | { ok: false; error: string };

type ApiPayload = {
  user?: SessionUser | null;
  message?: string;
  error?: string;
};

async function postAuth(url: string, body?: unknown): Promise<AuthActionResult> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }

  let payload: unknown = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  const data =
    payload && typeof payload === "object" ? (payload as ApiPayload) : null;

  if (!res.ok || !data) {
    return {
      ok: false,
      error:
        data?.error ?? "Something went wrong. Please try again.",
    };
  }

  return { ok: true, user: data.user ?? null, message: data.message };
}

export async function loginAction(input: unknown): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid email or password format" };
  }
  return postAuth("/api/auth/login", parsed.data);
}

export async function signupAction(input: unknown): Promise<AuthActionResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check your details and try again.",
    };
  }
  return postAuth("/api/auth/signup", parsed.data);
}

export async function logoutAction(): Promise<AuthActionResult> {
  return postAuth("/api/auth/logout");
}
