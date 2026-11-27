import { authDebugLoggingEnabled, logAuthFailureDetail } from "./auth-debug";

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
  return /failed to fetch|networkerror|network error|load failed|offline|internet|enotfound|econnrefused|network-request-failed|service_unreachable|econnreset|socket hang up/.test(
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

function apiErrorCode(err: unknown): string {
  return String((err as { code?: string } | null)?.code ?? "").toUpperCase();
}

/** Short technical line for dev / NEXT_PUBLIC_AUTH_DEBUG — never includes secrets. */
export function authFailureDetail(err: unknown): string | null {
  if (!authDebugLoggingEnabled()) return null;
  // `err.code` is one field: `auth/...` is a Firebase SDK code, anything else
  // is an API machine code (FIREBASE_TOKEN_REJECTED, DEVICE_SIGNUP_LIMIT, …).
  const raw = String((err as { code?: string } | null)?.code ?? "");
  const status = errorStatus(err);
  const parts = [
    raw.includes("/")
      ? `firebase:${raw.toLowerCase()}`
      : raw
        ? `api:${raw.toUpperCase()}`
        : null,
    status ? `http:${status}` : null,
  ].filter(Boolean);
  if (!parts.length && err instanceof Error && err.message) {
    return err.message.slice(0, 160);
  }
  return parts.length ? parts.join(" · ") : null;
}

function resolveAuthFailureMessage(err: unknown, kind: AuthFailureKind): string {
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
  const apiCode = apiErrorCode(err);

  if (looksLikeOffline(message) || message.includes("service_unreachable")) {
    return AUTH_NO_CONNECTION;
  }

  if (apiCode === "FIREBASE_CLIENT_AUTH") {
    return "Sign-in didn't complete. Hard-refresh and try again.";
  }
  if (apiCode === "FIREBASE_ADMIN_NOT_CONFIGURED") {
    return AUTH_TEMPORARILY_UNAVAILABLE;
  }
  if (apiCode === "FIREBASE_TOKEN_REJECTED") {
    return kind === "login" ? AUTH_INVALID_CREDENTIALS : "We couldn't verify your session. Try again.";
  }
  if (apiCode === "DEVICE_SIGNUP_LIMIT") {
    return "This device already has an account. Please sign in to continue.";
  }
  if (apiCode === "ACCOUNT_REJECTED") {
    return "This account wasn't approved. You're welcome to create a new account, or contact us if this looks wrong.";
  }
  if (apiCode === "PENDING_APPROVAL") {
    return AUTH_TRY_AGAIN;
  }

  if (kind === "login" && looksLikeInvalidLogin(message, status, code)) {
    return AUTH_INVALID_CREDENTIALS;
  }
  if (kind === "login" && status === 401) {
    return AUTH_INVALID_CREDENTIALS;
  }

  if (kind === "signup" && status === undefined && message === "validation") {
    return AUTH_TRY_AGAIN;
  }
  if (/email-already-in-use|account-exists-with-different-credential|credential-already-in-use/.test(code)) {
    return "An account already exists with this email. Try signing in instead.";
  }

  if (/too-many-requests|too many requests|too many attempts|quota exceeded|rate limit/.test(code + " " + message)) {
    return "Too many sign-in attempts. Please wait a minute and try again.";
  }
  if (/invalid-verification-code|invalid-verification-id|session-expired|code-expired/.test(code)) {
    return "That SMS code is wrong or expired. Request a new code.";
  }
  if (/user-disabled/.test(code)) {
    return "This account has been disabled. Contact us if this looks wrong.";
  }
  if (/multi-factor-auth-required/.test(code)) {
    return "Enter the verification code sent to your phone to finish signing in.";
  }
  if (/popup-closed-by-user|cancelled-popup-request/.test(code)) {
    return "Sign-in was cancelled. Tap Continue with Google to try again.";
  }
  // Infrastructure / configuration failures (unauthorized-domain,
  // operation-not-allowed, invalid-api-key, configuration-not-found,
  // FIREBASE_ADMIN_NOT_CONFIGURED, billing-not-enabled, reCAPTCHA / API-key
  // verification) intentionally collapse to the SAME friendly fallback below.
  // They describe internal setup and must never be surfaced to the signed-in
  // user. The precise cause is logged for developers via logAuthFailureDetail
  // (NEXT_PUBLIC_AUTH_DEBUG) and in the API's server logs.

  if (kind === "oauth") {
    if (status === 401 || message.includes("oauth authentication could not be verified")) {
      return "We couldn't verify your Google session. Please try signing in again.";
    }
    if (status === 403 || message.includes("oauth session exchange could not be verified") || message.includes("expired or failed")) {
      return "Sign-in verification expired or failed. Please try again.";
    }
    if (message.includes("did not return a valid session")) {
      return "Google did not return a valid session. Please try signing in again.";
    }
  }

  if (status === 503 || status === 502 || status === 504) {
    return AUTH_TEMPORARILY_UNAVAILABLE;
  }

  return AUTH_TEMPORARILY_UNAVAILABLE;
}

/**
 * Map an internal failure to safe copy for the auth UI.
 * In dev (or with `NEXT_PUBLIC_AUTH_DEBUG`), also logs `code` / status to the console.
 */
export function authFailureMessage(
  err: unknown,
  kind: AuthFailureKind = "login",
): string {
  const userMessage = resolveAuthFailureMessage(err, kind);
  logAuthFailureDetail(err, kind, userMessage);
  return userMessage;
}
