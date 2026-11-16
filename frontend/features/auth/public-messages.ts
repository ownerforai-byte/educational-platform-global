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
    return "This page didn't complete Firebase sign-in. Hard-refresh and try again.";
  }
  if (apiCode === "FIREBASE_ADMIN_NOT_CONFIGURED") {
    return "The API can't verify Firebase tokens yet — server env is incomplete.";
  }
  if (apiCode === "FIREBASE_TOKEN_REJECTED") {
    return kind === "login"
      ? AUTH_INVALID_CREDENTIALS
      : "We couldn't verify your phone or Google session. Try again.";
  }
  if (apiCode === "DEVICE_SIGNUP_LIMIT") {
    return "This device already has an account. Sign in or wait for approval on that account.";
  }
  if (apiCode === "ACCOUNT_REJECTED") {
    return "This account was denied. You can create a new account, or contact us if this looks wrong.";
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
    return "An account already exists with this email or phone. Try signing in instead.";
  }

  if (/too-many-requests|too many requests|too many attempts|quota exceeded|rate limit/.test(code + " " + message)) {
    return "Too many sign-in attempts. Please wait a minute and try again.";
  }
  if (/billing-not-enabled/.test(code)) {
    return "Phone SMS isn't enabled on the Firebase project (Blaze plan required for real numbers).";
  }
  if (/captcha-check-failed|missing-recaptcha|invalid-app-credential|app-not-authorized|missing-client-identifier/.test(code)) {
    return "Phone or Google verification failed (reCAPTCHA / API key / authorized domain). Check Firebase Console settings.";
  }
  if (/invalid-verification-code|invalid-verification-id|session-expired|code-expired/.test(code)) {
    return "That SMS code is wrong or expired. Request a new code.";
  }
  if (/invalid-phone-number|missing-phone-number/.test(code)) {
    return "Enter a valid mobile number in international format (e.g. +97798xxxxxxxx).";
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
  if (/unauthorized-domain/.test(code)) {
    return "This site's origin isn't authorized in Firebase (Auth → Settings → Authorized domains).";
  }
  if (/operation-not-allowed/.test(code)) {
    return "This sign-in method isn't enabled in Firebase (Auth → Sign-in method → turn on Email/Password and Google).";
  }
  if (/invalid-api-key|api-key-not-valid|configuration-not-found/.test(code + " " + message)) {
    return "Firebase web configuration is missing or invalid (check the NEXT_PUBLIC_FIREBASE_* values).";
  }
  if (/FIREBASE_ADMIN_NOT_CONFIGURED/i.test(code + " " + message)) {
    return "Sign-in is offline: the server's Firebase Admin isn't configured (set FIREBASE_SERVICE_ACCOUNT_JSON on the API).";
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
