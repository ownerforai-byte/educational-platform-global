"use client";

/**
 * Attempt hold: lets a view with an in-progress, state-only attempt (a timed
 * mock paper) survive the 20-minute spark window ending.
 *
 * RouteCreditGate provides the context. While a view holds, the gate keeps
 * the SAME element tree mounted after the window closes (no remount, so
 * paper/answers/marks/timer survive) and reports `windowOpen: false` so the
 * view can refuse to START a new attempt without a fresh unlock. Outside a
 * gate the default context is "open, no-op", so views stay testable alone.
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
