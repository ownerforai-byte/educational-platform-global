/**
 * Signup status-token storage for the four welcome screens.
 *
 * Local mirrors (localStorage / sessionStorage / cookie) only keep the signed
 * status token so GET /api/auth/account-status can be polled. Which screen
 * opens is decided LIVE by `resolveLiveApprovalRoute` — never by a cached
 * outcome alone (stale cookies after deleted accounts must not invent
 * "account created").
 *
 *   NORMAL   /welcome/no-account  → no live account for this token
 *   WAITING  /welcome/pending     → live access_status PENDING
 *   APPROVED /welcome/approved    → live access_status ACTIVE
 *   REJECTED /welcome/rejected    → live access_status REJECTED
 */

/** Existing key — kept so signups saved before this change still resolve. */
export const STATUS_TOKEN_KEY = "neb_signup_status_token";

/** Hardcoded last-known access outcome for this device. */
export const ACCESS_OUTCOME_KEY = "neb_signup_access_outcome";

/** Hardcoded identity marker embedded in the session cookie. */
export const PENDING_SIGNUP_ID = "neb-pending-signup-v1";

/** Hardcoded cookie key — the session-id-like identifier that survives refresh. */
export const PENDING_SIGNUP_COOKIE = "neb_signup_session";

/** Hardcoded cookie for the last live access outcome. */
export const ACCESS_OUTCOME_COOKIE = "neb_signup_outcome";

/**
 * Hardcoded routes — exactly four approval screens.
 *   1. NORMAL   — no signup on this device
 *   2. WAITING  — PENDING (created, awaiting owner)
 *   3. APPROVED — ACTIVE (sign in)
 *   4. REJECTED — REJECTED (continue as guest / new signup)
 * `/welcome` itself is only a dispatcher onto one of these four.
 */
export const NORMAL_ROUTE = "/welcome/no-account";
export const WAITING_ROUTE = "/welcome/pending";
export const APPROVED_ROUTE = "/welcome/approved";
export const REJECTED_ROUTE = "/welcome/rejected";
/** Dispatcher — never a fifth content screen; always redirects. */
export const APPROVAL_DISPATCH_ROUTE = "/welcome";

/** @deprecated Use NORMAL_ROUTE — kept for older imports/tests. */
export const NO_ACCOUNT_ROUTE = NORMAL_ROUTE;
/** @deprecated Use WAITING_ROUTE — kept for older imports/tests. */
export const WAITING_APPROVAL_ROUTE = WAITING_ROUTE;

export type AccessOutcome = "PENDING" | "ACTIVE" | "REJECTED";

/** Matches the server's 7-day status-token lifetime. */
const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

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

/** Read the signed token out of OUR hardcoded cookie, ignoring anything else. */
function readTokenCookie(): string | null {
  const value = readCookieValue(PENDING_SIGNUP_COOKIE);
  if (!value) return null;
  if (!value.startsWith(`${PENDING_SIGNUP_ID}:`)) return null;
  return value.slice(PENDING_SIGNUP_ID.length + 1) || null;
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
    const session = window.sessionStorage.getItem(key);
    if (session) return session;
  } catch {
    /* storage blocked */
  }
  return null;
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

/**
 * Call the moment an account is created / a PENDING account signs in.
 * Writes all three mirrors so nothing short of clearing ALL browser data can
 * lose the identity. Defaults the outcome to PENDING (waiting screen).
 */
export function rememberPendingSignup(statusToken: string): void {
  if (!isBrowser() || !statusToken) return;
  writeTriple(STATUS_TOKEN_KEY, statusToken);
  writeCookie(PENDING_SIGNUP_COOKIE, `${PENDING_SIGNUP_ID}:${statusToken}`);
  rememberAccessOutcome("PENDING");
}

/** Persist the live access outcome this device last saw from the API. */
export function rememberAccessOutcome(outcome: AccessOutcome): void {
  if (!isBrowser() || !OUTCOMES.has(outcome)) return;
  writeTriple(ACCESS_OUTCOME_KEY, outcome);
  writeCookie(ACCESS_OUTCOME_COOKIE, `${PENDING_SIGNUP_ID}:${outcome}`);
}

function readOutcomeCookie(): AccessOutcome | null {
  const value = readCookieValue(ACCESS_OUTCOME_COOKIE);
  if (!value) return null;
  if (!value.startsWith(`${PENDING_SIGNUP_ID}:`)) return null;
  const raw = value.slice(PENDING_SIGNUP_ID.length + 1);
  return OUTCOMES.has(raw as AccessOutcome) ? (raw as AccessOutcome) : null;
}

/** Last live access outcome for this device (PENDING / ACTIVE / REJECTED). */
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

/**
 * Recover the signed token from ANY of the three mirrors, or from the URL
 * hand-off the Google OAuth callback uses. Heals the other stores whenever a
 * mirror is missing, so a later refresh still resolves the identity.
 */
export function readStatusToken(): string | null {
  if (!isBrowser()) return null;

  try {
    const fromUrl = new URL(window.location.href).searchParams.get("status_token");
    if (fromUrl) {
      rememberPendingSignup(fromUrl);
      return fromUrl;
    }
  } catch {
    /* window.location unavailable */
  }

  let token = readTriple(STATUS_TOKEN_KEY);
  if (!token) token = readTokenCookie();
  if (!token) return null;

  healTriple(STATUS_TOKEN_KEY, token);
  if (!readTokenCookie()) {
    writeCookie(PENDING_SIGNUP_COOKIE, `${PENDING_SIGNUP_ID}:${token}`);
  }
  return token;
}

/** The hardcoded identification: has this browser created an account? */
export function hasPendingSignup(): boolean {
  return readStatusToken() !== null;
}

/**
 * Sync cache hint only — gates/CTAs must prefer `resolveLiveApprovalRoute`.
 * Without a status token, always NORMAL (never trust a leftover outcome).
 */
export function deviceApprovalRoute(): string {
  if (!readStatusToken()) return NORMAL_ROUTE;
  const outcome = readAccessOutcome();
  if (outcome === "REJECTED") return REJECTED_ROUTE;
  if (outcome === "ACTIVE") return APPROVED_ROUTE;
  return WAITING_ROUTE;
}

/** @deprecated Prefer deviceApprovalRoute — kept for older call sites. */
export function approvalStatusHref(): string {
  return deviceApprovalRoute();
}

/** Used on successful sign-in / tests. Removes token + outcome mirrors. */
export function clearPendingSignup(): void {
  clearTriple(STATUS_TOKEN_KEY);
  clearTriple(ACCESS_OUTCOME_KEY);
  clearCookie(PENDING_SIGNUP_COOKIE);
  clearCookie(ACCESS_OUTCOME_COOKIE);
}
