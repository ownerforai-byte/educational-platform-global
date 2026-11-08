"use client";

import { useSyncExternalStore } from "react";
import { hasPendingSignup } from "./pending-signup-identity";

/**
 * Hydration-safe read of the HARDCODED pending-signup identity.
 *
 * useSyncExternalStore is deliberate: the identity lives in browser storage,
 * so the server snapshot is `null` (unknown) and React re-renders with the real
 * boolean right after hydration. That avoids both a hydration mismatch and the
 * `react-hooks/set-state-in-effect` finding an effect + setState would add
 * (the lint ratchet fails on any NEW finding).
 *
 * The identity does not change while one of these screens is mounted — it is
 * written on signup, then the router navigates — so a no-op subscription is
 * enough; `getSnapshot` is a stable module-level function.
 */
const subscribe = () => () => {};
const serverSnapshot = () => null;

/** `null` while hydrating, otherwise whether this browser created an account. */
export function usePendingSignup(): boolean | null {
  return useSyncExternalStore<boolean | null>(
    subscribe,
    hasPendingSignup,
    serverSnapshot,
  );
}
