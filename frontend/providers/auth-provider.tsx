"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { SessionUser } from "@/features/auth/types";
import { ensureSession, logout as apiLogout, refreshSession } from "@/lib/api/auth";
import { getStoredToken } from "@/lib/api-client";
import {
  clearCachedSession,
  isTokenExpiringSoon,
  readCachedSession,
} from "@/lib/auth/session-store";

/**
 * Auth state shared across the app.
 * - `user`       – the validated session user (null when logged out)
 * - `isLoading`  – true until the first session resolution finishes; already
 *                  false when a cached session is present, so a signed-in
 *                  reload never flashes the signed-out UI
 * - `refresh`    – force a re-fetch (call after login, signup, logout)
 * - `logoutUser` – clear local state *and* call the backend logout endpoint
 *
 * Auto-detection model (2026-09-29): the app must know "signed in / not" by
 * itself, with no extra password prompt. Three rules make that hold:
 *   1. Hydrate from the persisted session immediately (session-store).
 *   2. Revalidate through `ensureSession()`, which silently renews an expired
 *      access token with the 30-day refresh cookie before giving up.
 *   3. Only a definite refusal (401/403) signs the user out. An unreachable
 *      backend (Render cold start), offline mode or a 5xx keeps the cached
 *      session — a network blip is not a logout.
 */
export interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  refresh: () => void;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  refresh: () => {},
  logoutUser: async () => {},
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

/** Renew the access token this long before it expires. */
const RENEW_SKEW_MS = 5 * 60 * 1000;
/** Safety net: also check the token's age this often while the app is open. */
const RENEW_CHECK_INTERVAL_MS = 10 * 60 * 1000;
/**
 * Never hit /api/auth/refresh more than once per this window. Tokens without a
 * readable `exp` are treated as "renew now", and without this floor that would
 * re-refresh on every re-render.
 */
const MIN_RENEW_GAP_MS = 30 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Read once, lazily — a synchronous localStorage read on every render would
  // be wasted work (and the value is only the *starting* state).
  const [cached] = useState(readCachedSession);

  const [user, setUser] = useState<SessionUser | null>(cached?.user ?? null);
  // A cached session is already trustworthy enough to render — the background
  // revalidation below corrects it if the backend disagrees.
  const [isLoading, setIsLoading] = useState(cached === null);
  const [tick, setTick] = useState(0);
  const mounted = useRef(true);
  /** Epoch ms of the last silent renewal attempt (throttle, see MIN_RENEW_GAP_MS). */
  const lastRenewAt = useRef(0);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  /**
   * Loads the session. Definite refusals clear state; transport failures keep
   * whatever we already had.
   */
  const load = useCallback(async () => {
    try {
      const next = await ensureSession();
      if (!mounted.current) return;
      setUser(next ?? null);
      if (!next) clearCachedSession();
    } catch {
      // Backend unreachable / cold start / offline. Trust the cache and let the
      // next focus or interval tick try again.
      if (mounted.current && !readCachedSession()) setUser(null);
    } finally {
      if (mounted.current) setIsLoading(false);
    }
  }, []);

  // Initial load, and every manual `refresh()`.
  useEffect(() => {
    void load();
  }, [load, tick]);

  /**
   * Silent renewal loop. Runs when the app opens, when the tab regains focus
   * (the common case: a student returns hours later with an expired access
   * token) and on a slow interval as a safety net.
   */
  useEffect(() => {
    if (!user) return;
    let stopped = false;

    const renewIfNeeded = async () => {
      if (stopped) return;
      if (Date.now() - lastRenewAt.current < MIN_RENEW_GAP_MS) return;
      if (!isTokenExpiringSoon(getStoredToken(), RENEW_SKEW_MS)) return;
      lastRenewAt.current = Date.now();
      try {
        await refreshSession();
        if (!stopped) await load();
      } catch {
        // Keep the cached session: the token may still be accepted, and the
        // next request revalidates anyway.
      }
    };

    void renewIfNeeded();
    const timer = window.setInterval(() => void renewIfNeeded(), RENEW_CHECK_INTERVAL_MS);
    const onFocus = () => void renewIfNeeded();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      stopped = true;
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [user, load]);

  const refresh = useCallback(() => {
    setIsLoading((current) => (user ? current : true));
    setTick((t) => t + 1);
  }, [user]);

  const logoutUser = useCallback(async () => {
    // Fire the backend call (best-effort); clear local state immediately.
    try {
      await apiLogout();
    } catch {
      // Even if the endpoint fails, the cookie is already being cleared.
    }
    // apiLogout() drops the persisted token + cached user; make sure the UI
    // state follows even when the request threw.
    clearCachedSession();
    setUser(null);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refresh, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
