"use client";

/**
 * CreditProvider — the credit/access layer for the whole portal.
 *
 * Responsibilities:
 *   - expose the signed-in (Gmail-equivalent) session,
 *   - expose the coin balance,
 *   - unlock modules for coins and start the 2-hour window,
 *   - run ONE global capture-phase click interceptor that catches any
 *     interaction with a locked element while unauthenticated and raises the
 *     AdminApprovalModal notice,
 *   - render the notice modal itself so every consumer shares a single instance.
 *
 * The home baseline and main navigation are never touched by this provider —
 * it only reacts to elements explicitly marked with `data-gate`.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/providers/auth-provider";
import type { SessionUser } from "@/features/auth/types";
import {
  TOKEN_MATRIX,
  type ContentCategory,
} from "./constants";
import {
  isUnlocked as isUnlockedIn,
  lockModule,
  unlockModuleAt,
  useUnlocks,
  type UnlockMap,
} from "./unlock-store";
import { unlockContent } from "@/lib/api/credits";
import { useSessionTimer } from "./use-session-timer";
import { AdminApprovalModal } from "./admin-approval-modal";

/** data-gate value that marks an element as requiring only authentication. */
export type GateKind = ContentCategory | "auth";

export interface CreditContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  /** Coins available (user.credits); owners see a large floor. */
  coins: number;
  /** Every active unlock window. */
  unlocks: UnlockMap;
  /** True when the signed-in user has passed the session check. */
  isAuthenticated: boolean;
  /** True while `key`'s 2-hour window is open. */
  isUnlocked: (key: string) => boolean;
  /** HH:MM:SS remaining for `key`. */
  remainingClock: (key: string) => string;
  /** Coin cost for a category (null if unknown). */
  costOf: (category: ContentCategory) => number | null;
  /**
   * Open a module. Unauthenticated → notice modal (returns false).
   * Authenticated + already open → true (free refresh).
   * Authenticated + closed → deducts coins, starts the 2-hour window.
   */
  openModule: (key: string, category: ContentCategory) => Promise<boolean>;
  /** Force the notice modal open (used by direct handlers). */
  requestAccess: () => void;
  /** Close the notice modal. */
  dismissNotice: () => void;
  /** True while the notice modal is visible. */
  noticeOpen: boolean;
  /** Reason shown above the notice copy. */
  noticeTitle: string;
  /** Last error from a failed unlock attempt (e.g. insufficient coins). */
  error: string | null;
}

const CreditContext = createContext<CreditContextValue | null>(null);

export function useCredit(): CreditContextValue {
  const ctx = useContext(CreditContext);
  if (!ctx) {
    throw new Error("useCredit must be used within <CreditProvider>");
  }
  return ctx;
}

const OWNER_COIN_FLOOR = 999999;

export function CreditProvider({ children }: { children: ReactNode }) {
  const { user, isLoading, refresh } = useAuth();
  const timer = useSessionTimer();
  const unlocks = timer.unlocks;

  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("Access Notice");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<Set<string>>(() => new Set());

  // Keep the latest state available to the DOM event listener without
  // re-attaching it on every render.
  const stateRef = useRef({ user, noticeOpen });
  stateRef.current = { user, noticeOpen };

  const isAuthenticated = user !== null;

  const coins = useMemo(() => {
    if (!user) return 0;
    if (user.role === "OWNER" || user.role === "ADMIN") return OWNER_COIN_FLOOR;
    return user.credits ?? 0;
  }, [user]);

  const requestAccess = useCallback(() => {
    setNoticeTitle("Access Notice");
    setNoticeOpen(true);
  }, []);

  const dismissNotice = useCallback(() => setNoticeOpen(false), []);

  /**
   * Global action interceptor — capture phase, registered once.
   *
   * Any click on (or inside) an element carrying `data-gate` is intercepted.
   * If there is no session, navigation/activation is cancelled and the notice
   * modal is raised instead. Elements already handled by their own React
   * handler set `data-gate-handled` so nothing fires twice.
   */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      const gated = target.closest<HTMLElement>("[data-gate]");
      if (!gated) return;
      if (gated.dataset.gateHandled === "true") return;

      if (stateRef.current.user) return; // authenticated → let the UI handle it

      // Unauthenticated: intercept immediately.
      event.preventDefault();
      event.stopPropagation();
      setNoticeTitle(
        gated.dataset.gateTitle ?? "Sign in to continue",
      );
      setNoticeOpen(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const costOf = useCallback((category: ContentCategory) => {
    return TOKEN_MATRIX[category]?.cost ?? null;
  }, []);

  const isUnlocked = useCallback(
    (key: string) => isUnlockedIn(unlocks, key),
    [unlocks],
  );

  const openModule = useCallback(
    async (key: string, category: ContentCategory): Promise<boolean> => {
      setError(null);

      // 1. Unauthenticated → intercept with the notice.
      if (!stateRef.current.user) {
        setNoticeTitle("Sign in to continue");
        setNoticeOpen(true);
        return false;
      }

      // 2. Window already open → free (no double charge).
      if (isUnlockedIn(unlocks, key)) return true;

      const rule = TOKEN_MATRIX[category];
      if (!rule) {
        setError("Unknown content category.");
        return false;
      }

      // 3. Fast client-side pre-check (server re-validates authoritatively).
      const balance = stateRef.current.user.credits ?? 0;
      const isPrivileged =
        stateRef.current.user.role === "OWNER" ||
        stateRef.current.user.role === "ADMIN";

      if (!isPrivileged && balance < rule.cost) {
        setError(
          `Not enough coins — ${rule.cost} required, ${balance} available.`,
        );
        return false;
      }

      // 4. Deduct on the server, then open the 2-hour window.
      if (pending.has(key)) return false;
      setPending((prev) => new Set(prev).add(key));

      try {
        const res = await unlockContent(category, key);
        // Server returns the canonical expiration (epoch + 7200).
        unlockModuleAt(key, res.expiresAt);
        refresh(); // re-sync the session balance
        return true;
      } catch (err) {
        const message =
          err instanceof Error && err.message
            ? err.message
            : "Unlock failed. Please try again.";
        setError(message);
        lockModule(key);
        return false;
      } finally {
        setPending((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [unlocks, pending, refresh],
  );

  const value: CreditContextValue = {
    user,
    isLoading,
    coins,
    unlocks,
    isAuthenticated,
    isUnlocked,
    remainingClock: timer.remainingClock,
    costOf,
    openModule,
    requestAccess,
    dismissNotice,
    noticeOpen,
    noticeTitle,
    error,
  };

  return (
    <CreditContext.Provider value={value}>
      {children}
      <AdminApprovalModal
        open={noticeOpen}
        onClose={dismissNotice}
        title={noticeTitle}
      />
    </CreditContext.Provider>
  );
}
