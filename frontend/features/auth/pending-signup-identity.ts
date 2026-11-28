/**
 * Non-secret route hints for the four welcome screens. The signed status
 * credential stays in the backend's HttpOnly cookie and is never exposed to
 * JavaScript. Live API status remains authoritative for every route.
 */

export const ACCESS_OUTCOME_KEY = "neb_signup_access_outcome";
export const PENDING_SIGNUP_ID = "neb-pending-signup-v1";
export const PENDING_SIGNUP_COOKIE = "neb_signup_session";
export const ACCESS_OUTCOME_COOKIE = "neb_signup_outcome";

export const NORMAL_ROUTE = "/welcome/no-account";
export const WAITING_ROUTE = "/welcome/pending";
export const APPROVED_ROUTE = "/welcome/approved";
export const DENIED_ROUTE = "/welcome/denied";
/** @deprecated Use DENIED_ROUTE — kept for older imports/tests. */
export const REJECTED_ROUTE = DENIED_ROUTE;
export const APPROVAL_DISPATCH_ROUTE = "/welcome";
/** @deprecated Use NORMAL_ROUTE — kept for older imports/tests. */
export const NO_ACCOUNT_ROUTE = NORMAL_ROUTE;
/** @deprecated Use WAITING_ROUTE — kept for older imports/tests. */
export const WAITING_APPROVAL_ROUTE = WAITING_ROUTE;

export type AccessOutcome = "PENDING" | "ACTIVE" | "REJECTED";

const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const LEGACY_STATUS_TOKEN_KEY = "neb_signup_status_token";
const OUTCOMES = new Set<AccessOutcome>(["PENDING", "ACTIVE", "REJECTED"]);

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function writeCookie(name: string, value: string): void {
  if (!isBrowser()) return;
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
  } catch {
    /* cookie blocked */
  }
}

function clearCookie(name: string): void {
  if (!isBrowser()) return;
  try {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  } catch {
    /* cookie blocked */
  }
}

function readCookieValue(name: string): string | null {
  if (!isBrowser()) return null;
  try {
    const raw = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${name}=`));
    if (!raw) return null;
    return decodeURIComponent(raw.slice(name.length + 1)) || null;
  } catch {
    return null;
  }
}

function writeTriple(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage blocked */
  }
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* storage blocked */
  }
}

function readTriple(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    const local = window.localStorage.getItem(key);
    if (local) return local;
  } catch {
    /* storage blocked */
  }
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function clearTriple(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* storage blocked */
  }
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    /* storage blocked */
  }
}

function healTriple(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    if (window.localStorage.getItem(key) !== value) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    /* storage blocked */
  }
  try {
    if (window.sessionStorage.getItem(key) !== value) {
      window.sessionStorage.setItem(key, value);
    }
  } catch {
    /* storage blocked */
  }
}

function purgeLegacyStatusToken(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(LEGACY_STATUS_TOKEN_KEY);
  } catch {
    /* storage blocked */
  }
  try {
    window.sessionStorage.removeItem(LEGACY_STATUS_TOKEN_KEY);
  } catch {
    /* storage blocked */
  }
  const marker = readCookieValue(PENDING_SIGNUP_COOKIE);
  if (marker && marker !== PENDING_SIGNUP_ID) {
    clearCookie(PENDING_SIGNUP_COOKIE);
  }
}

/** Record only a non-secret marker; the API owns the signed credential. */
export function rememberPendingSignup(): void {
  if (!isBrowser()) return;
  purgeLegacyStatusToken();
  writeCookie(PENDING_SIGNUP_COOKIE, PENDING_SIGNUP_ID);
  rememberAccessOutcome("PENDING");
}

export function rememberAccessOutcome(outcome: AccessOutcome): void {
  if (!isBrowser() || !OUTCOMES.has(outcome)) return;
  writeTriple(ACCESS_OUTCOME_KEY, outcome);
  writeCookie(ACCESS_OUTCOME_COOKIE, `${PENDING_SIGNUP_ID}:${outcome}`);
}

function readOutcomeCookie(): AccessOutcome | null {
  const value = readCookieValue(ACCESS_OUTCOME_COOKIE);
  if (!value?.startsWith(`${PENDING_SIGNUP_ID}:`)) return null;
  const raw = value.slice(PENDING_SIGNUP_ID.length + 1);
  return OUTCOMES.has(raw as AccessOutcome) ? (raw as AccessOutcome) : null;
}

export function readAccessOutcome(): AccessOutcome | null {
  if (!isBrowser()) return null;
  const stored = readTriple(ACCESS_OUTCOME_KEY);
  if (stored && OUTCOMES.has(stored as AccessOutcome)) {
    healTriple(ACCESS_OUTCOME_KEY, stored);
    if (!readOutcomeCookie()) {
      writeCookie(ACCESS_OUTCOME_COOKIE, `${PENDING_SIGNUP_ID}:${stored}`);
    }
    return stored as AccessOutcome;
  }
  const fromCookie = readOutcomeCookie();
  if (fromCookie) {
    healTriple(ACCESS_OUTCOME_KEY, fromCookie);
    return fromCookie;
  }
  return null;
}

export function hasPendingSignup(): boolean {
  purgeLegacyStatusToken();
  return readCookieValue(PENDING_SIGNUP_COOKIE) === PENDING_SIGNUP_ID;
}

/** Cache hint only; gates must prefer resolveLiveApprovalRoute. */
export function deviceApprovalRoute(): string {
  if (!hasPendingSignup()) return NORMAL_ROUTE;
  const outcome = readAccessOutcome();
  if (outcome === "REJECTED") return DENIED_ROUTE;
  if (outcome === "ACTIVE") return APPROVED_ROUTE;
  return WAITING_ROUTE;
}

/** @deprecated Prefer deviceApprovalRoute — kept for older call sites. */
export function approvalStatusHref(): string {
  return deviceApprovalRoute();
}

/** Remove non-secret hints; the backend clears its HttpOnly status cookie. */
export function clearPendingSignup(): void {
  purgeLegacyStatusToken();
  clearTriple(ACCESS_OUTCOME_KEY);
  clearCookie(PENDING_SIGNUP_COOKIE);
  clearCookie(ACCESS_OUTCOME_COOKIE);
}
