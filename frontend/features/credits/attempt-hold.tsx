"use client";

/**
 * Attempt hold: lets a view with an in-progress, state-only attempt (a timed
 * mock paper) survive the 20-minute spark window ending.
 *
 * The route gates that used to provide the context are gone (the coin gate
 * was removed 2026-11-06), so every view now runs on the default context:
 * "open, no-op". The hook stays because the timed-attempt views still call it,
 * and because a future timed gate can supply a real window without touching
 * the views.
 */

import { createContext, useContext, useEffect } from "react";

export interface AttemptHoldContextValue {
  /** True while the spark unlock window is open (or the route is not gated). */
  windowOpen: boolean;
  /** Ask the gate to keep the view mounted past window expiry. */
  setHold: (held: boolean) => void;
}

export const AttemptHoldContext = createContext<AttemptHoldContextValue>({
  windowOpen: true,
  setHold: () => {},
});

/**
 * Hold the gate open while `active`. Returns whether a NEW attempt may start
 * (the unlock window is open).
 */
export function useAttemptHold(active: boolean): { canStart: boolean } {
  const { windowOpen, setHold } = useContext(AttemptHoldContext);
  useEffect(() => {
    setHold(active);
    return () => setHold(false);
  }, [active, setHold]);
  return { canStart: windowOpen };
}
