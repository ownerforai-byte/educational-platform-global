"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { SessionUser } from "@/features/auth/types";
import { getSession } from "@/lib/api/auth";

interface AuthState {
  /** The currently authenticated user, or null when logged out. */
  user: SessionUser | null;
  /** True while the initial session check is in-flight. */
  isLoading: boolean;
  /** Re-fetch the session from the API (e.g. after login / logout). */
  refresh: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  refresh: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getSession();
        if (cancelled) return;
        setUser(data.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [tick]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setTick((t) => t + 1);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
