/** User-facing auth errors — never echo server, Firebase, or provider text. */

export const AUTH_INVALID_CREDENTIALS =
  "Invalid email or password. Please try again.";

export const AUTH_NO_CONNECTION =
  "No internet connection. Check your network and try again.";

export const AUTH_TEMPORARILY_UNAVAILABLE =
  "Temporarily unavailable. Please try again.";

export const AUTH_TRY_AGAIN = "Please try again.";

export type AuthFailureKind = "login" | "signup" | "oauth" | "password";

function errorStatus(err: unknown): number | undefined {
  const status = (err as { status?: number })?.status;
  return typeof status === "number" ? status : undefined;
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message.toLowerCase();
  return String(err).toLowerCase();
}

function looksLikeOffline(message: string): boolean {
  return /failed to fetch|networkerror|network error|load failed|offline|internet|enotfound|econnrefused/.test(
    message,
  );
}

function looksLikeInvalidLogin(message: string, status: number | undefined): boolean {
  if (status === 401) return true;
  return /auth\/(wrong-password|invalid-credential|invalid-email|user-not-found|invalid-login-credentials)/.test(
    message,
  );
}

/**
 * Map an internal failure to safe copy for the auth UI.
 */
export function authFailureMessage(
  err: unknown,
  kind: AuthFailureKind = "login",
): string {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean" &&
    !navigator.onLine
  ) {
    return AUTH_NO_CONNECTION;
  }

  const message = errorMessage(err);
  const status = errorStatus(err);

  if (looksLikeOffline(message)) {
    return AUTH_NO_CONNECTION;
  }

  if (kind === "login" && looksLikeInvalidLogin(message, status)) {
    return AUTH_INVALID_CREDENTIALS;
  }

  // Signup form validation only — not a server outage.
  if (kind === "signup" && status === undefined && message === "validation") {
    return AUTH_TRY_AGAIN;
  }

  return AUTH_TEMPORARILY_UNAVAILABLE;
}
