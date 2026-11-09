/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HARDCODED PENDING-SIGNUP IDENTIFICATION — owner request 2026-11-08
 * ═══════════════════════════════════════════════════════════════════════════
 * "make two pages ... this can be found and work with like session id --
 *  hardcode it so no refresh or other can remove it ... hardcode it in
 *  identifying ... so you need to create one page for those who have no
 *  account still they click the link"
 *
 * Two mutually exclusive screens:
 *   /welcome             → ONLY browsers that CREATED an account and are
 *                          waiting for approval ("Your account is on its way")
 *   /welcome/no-account  → browsers with NO account record
 *
 * The decision is made from a HARDCODED identity marker written the moment a
 * pending account is created. It is mirrored in three independent browser
 * stores (localStorage + sessionStorage + a 7-day cookie). A reload, a closed
 * tab, a cleared localStorage or lost React state cannot remove all three, so
 * the platform always knows which page to show. The cookie also carries the
 * signed status token, so the waiting page can still poll after a refresh.
 *
 * NOTE: this identity belongs to SIGNED-OUT visitors, so it cannot go through
 * lib/user-state.ts (that endpoint derives identity from an ACTIVE session).
 * No new localStorage key is introduced — the existing `neb_signup_status_token`
 * key is reused; only a sessionStorage mirror and a cookie are added.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/** Existing key — kept so signups saved before this change still resolve. */
export const STATUS_TOKEN_KEY = "neb_signup_status_token";

/** Hardcoded identity marker embedded in the session cookie. */
export const PENDING_SIGNUP_ID = "neb-pending-signup-v1";

/** Hardcoded cookie key — the session-id-like identifier that survives refresh. */
export const PENDING_SIGNUP_COOKIE = "neb_signup_session";

/** Hardcoded routes — the two screens. */
export const WAITING_APPROVAL_ROUTE = "/welcome";
export const NO_ACCOUNT_ROUTE = "/welcome/no-account";

/** Matches the server's 7-day status-token lifetime (backend/src/utils/statusToken.ts). */
const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/** Read the signed token out of OUR hardcoded cookie, ignoring anything else. */
function readCookie(): string | null {
  if (!isBrowser()) return null;
  try {
    const raw = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${PENDING_SIGNUP_COOKIE}=`));
    if (!raw) return null;
    const value = decodeURIComponent(raw.slice(PENDING_SIGNUP_COOKIE.length + 1));
    // Hardcoded identification: only our own marker counts as an account.
    if (!value.startsWith(`${PENDING_SIGNUP_ID}:`)) return null;
    return value.slice(PENDING_SIGNUP_ID.length + 1) || null;
  } catch {
    return null;
  }
}

/**
 * Call the moment an account is created / a PENDING account signs in.
 * Writes all three mirrors so nothing short of clearing ALL browser data can
 * lose the identity.
 */
export function rememberPendingSignup(statusToken: string): void {
  if (!isBrowser() || !statusToken) return;
  try {
    window.localStorage.setItem(STATUS_TOKEN_KEY, statusToken);
  } catch {
    /* storage blocked — the other two mirrors still hold the identity */
  }
  try {
    window.sessionStorage.setItem(STATUS_TOKEN_KEY, statusToken);
  } catch {
    /* storage blocked */
  }
  try {
    document.cookie = `${PENDING_SIGNUP_COOKIE}=${encodeURIComponent(
      `${PENDING_SIGNUP_ID}:${statusToken}`,
    )}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
  } catch {
    /* cookie blocked */
  }
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

  let token: string | null = null;
  try {
    token = window.localStorage.getItem(STATUS_TOKEN_KEY);
  } catch {
    /* storage blocked */
  }
  if (!token) {
    try {
      token = window.sessionStorage.getItem(STATUS_TOKEN_KEY);
    } catch {
      /* storage blocked */
    }
  }
  if (!token) token = readCookie();
  if (!token) return null;

  // Heal whichever mirror was lost, so a refresh / cleared store cannot erode
  // the identity over time. No rewrite when all three are already healthy.
  try {
    if (window.localStorage.getItem(STATUS_TOKEN_KEY) !== token) {
      window.localStorage.setItem(STATUS_TOKEN_KEY, token);
    }
  } catch {
    /* storage blocked */
  }
  try {
    if (window.sessionStorage.getItem(STATUS_TOKEN_KEY) !== token) {
      window.sessionStorage.setItem(STATUS_TOKEN_KEY, token);
    }
  } catch {
    /* storage blocked */
  }
  if (!readCookie()) {
    try {
      document.cookie = `${PENDING_SIGNUP_COOKIE}=${encodeURIComponent(
        `${PENDING_SIGNUP_ID}:${token}`,
      )}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
    } catch {
      /* cookie blocked */
    }
  }
  return token;
}

/** The hardcoded identification: has this browser created an account? */
export function hasPendingSignup(): boolean {
  return readStatusToken() !== null;
}

/** Which of the two pages this browser must be shown. */
export function approvalStatusHref(): string {
  return hasPendingSignup() ? WAITING_APPROVAL_ROUTE : NO_ACCOUNT_ROUTE;
}

/** Used on sign-out / tests. Removes all three mirrors. */
export function clearPendingSignup(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STATUS_TOKEN_KEY);
  } catch {
    /* storage blocked */
  }
  try {
    window.sessionStorage.removeItem(STATUS_TOKEN_KEY);
  } catch {
    /* storage blocked */
  }
  try {
    document.cookie = `${PENDING_SIGNUP_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  } catch {
    /* cookie blocked */
  }
}
