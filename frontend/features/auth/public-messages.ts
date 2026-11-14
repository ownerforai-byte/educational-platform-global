/** User-facing auth errors — never echo server, Firebase, or provider text. */

export const AUTH_INVALID_CREDENTIALS =
  "Invalid email or password. Please try again.";

export const AUTH_NO_CONNECTION =
  "No internet connection. Check your network and try again.";

export const AUTH_TEMPORARILY_UNAVAILABLE =
  "Temporarily unavailable. Please try again.";

/** How long transient outage copy stays visible before the form clears it. */
export const AUTH_TEMPORARY_ERROR_MS = 3000;

export const AUTH_TRY_AGAIN = "Please try again.";

export function isTemporaryAuthError(message: string): boolean {
  return message === AUTH_TEMPORARILY_UNAVAILABLE;
}

export type AuthFailureKind = "login" | "signup" | "oauth" | "password";

function errorStatus(err: unknown): number | undefined {
  const status = (err as { status?: number })?.status;
  return typeof status === "number" ? status : undefined;
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message.toLowerCase();
  return String(err).toLowerCase();
}

/** Firebase attaches a machine code (`auth/invalid-credential`, …) on `err.code`. */
function authErrorCode(err: unknown): string {
  return String((err as { code?: string } | null)?.code ?? "").toLowerCase();
}

function looksLikeOffline(message: string): boolean {
  return /failed to fetch|networkerror|network error|load failed|offline|internet|enotfound|econnrefused|network-request-failed/.test(
    message,
  );
}

function looksLikeInvalidLogin(message: string, status: number | undefined, code: string): boolean {
  if (status === 401) return true;
  // Firebase machine codes for bad credentials.
  if (/^auth\/(wrong-password|invalid-credential|invalid-email|user-not-found|invalid-login-credentials)$/.test(code)) {
    return true;
  }
  // Message fallbacks — the modern SDK returns "The supplied auth credential
  // is incorrect…" with no `auth/...` code in the text, which the old regex
  // missed and wrongly reported as a server outage.
  return /wrong[- ]password|invalid[- ]credential|invalid[- ]email|user[- ]not[- ]found|invalid[- ]login[- ]credentials|supplied auth credential|no account|user does not exist|incorrect.*password|email.*password.*invalid/i.test(
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
  const code = authErrorCode(err);

  if (looksLikeOffline(message)) {
    return AUTH_NO_CONNECTION;
  }

  if (kind === "login" && looksLikeInvalidLogin(message, status, code)) {
    return AUTH_INVALID_CREDENTIALS;
  }

  // Signup form validation only — not a server outage.
  if (kind === "signup" && status === undefined && message === "validation") {
    return AUTH_TRY_AGAIN;
  }

  // Specific, actionable copy for the common non-credential failures so the
  // user is never shown a vague "temporarily unavailable" for a real cause.
  if (/too-many-requests|too many requests|too many attempts|quota exceeded|rate limit/.test(code + " " + message)) {
    return "Too many sign-in attempts. Please wait a minute and try again.";
  }
  if (/user-disabled/.test(code)) {
    return "This account has been disabled. Contact us if this looks wrong.";
  }
  if (/unauthorized-domain|operation-not-allowed|invalid-api-key|configuration-not-found|api-key-not-valid/.test(code + " " + message)) {
    return "Sign-in isn't reachable from this site yet. Please contact us.";
  }

  return AUTH_TEMPORARILY_UNAVAILABLE;
}
