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
import { getSession } from "@/lib/api/auth";

/**
 * Auth state shared across the app.
 * - `user`       – the validated session user (null when logged out)
 * - `isLoading`  – true while the initial /api/auth/me round-trip is in flight
 * - `refresh`    – force a re-fetch (call after login, signup, logout)
 * - `logoutUser` – clear local state *and* call the backend logout endpoint
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSession();
        if (mounted.current) setUser(data.user ?? null);
      } catch {
        // 401 → logged out / never logged in
        if (mounted.current) setUser(null);
      } finally {
        if (mounted.current) setIsLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setTick((t) => t + 1);
  }, []);

  const logoutUser = useCallback(async () => {
    // Fire the backend call (best-effort); clear local state immediately.
    const { logout } = await import("@/lib/api/auth");
    try {
      await logout();
    } catch {
      // Even if the endpoint fails, the cookie is already being cleared.
    }
    setUser(null);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refresh, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
