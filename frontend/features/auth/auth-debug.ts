import { getPublicEnv } from "@/lib/env";
import type { AuthFailureKind } from "./public-messages";

/** Dev or `NEXT_PUBLIC_AUTH_DEBUG=true` — log Firebase/API codes, never passwords. */
export function authDebugLoggingEnabled(): boolean {
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    return true;
  }
  const flag = getPublicEnv().NEXT_PUBLIC_AUTH_DEBUG?.trim().toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

type AuthFailureSnapshot = {
  kind: AuthFailureKind;
  userMessage: string;
  code?: string;
  status?: number;
  name?: string;
};

function safeErrorFields(err: unknown): Pick<AuthFailureSnapshot, "code" | "status" | "name"> {
  if (!err || typeof err !== "object") return {};
  const e = err as { code?: string; status?: number; name?: string };
  return {
    code: typeof e.code === "string" && e.code ? e.code : undefined,
    status: typeof e.status === "number" ? e.status : undefined,
    name: typeof e.name === "string" ? e.name : undefined,
  };
}

/**
 * Console detail for auth troubleshooting. Never logs passwords, tokens, or email.
 */
export function logAuthFailureDetail(
  err: unknown,
  kind: AuthFailureKind,
  userMessage: string,
): void {
  if (!authDebugLoggingEnabled()) return;
  const fields = safeErrorFields(err);
  const payload: AuthFailureSnapshot = { kind, userMessage, ...fields };
  if (err instanceof Error && err.message && !/password|token|secret/i.test(err.message)) {
    console.warn("[auth]", payload, { message: err.message });
  } else {
    console.warn("[auth]", payload, err);
  }
}