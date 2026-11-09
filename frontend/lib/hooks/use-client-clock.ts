"use client";

/**
 * Client-only wall clock for time-sensitive chrome (the desk greeting, the
 * date line). Returns `null` on the server and during hydration, then a Date
 * as soon as the browser snapshot is available.
 *
 * The old `useState(null) + useEffect(() => setNow(new Date()), [])` pair was
 * a synchronous setState in an effect (react-hooks/set-state-in-effect) and
 * cost one extra render on every page load. The snapshot here is a minute
 * bucket — a stable primitive between ticks — so `useSyncExternalStore` can
 * cache it safely, and the only subscription is one interval per mounted
 * consumer that keeps the greeting correct past midnight.
 */
import { useSyncExternalStore } from "react";

const MINUTE_MS = 60_000;

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const id = window.setInterval(onChange, MINUTE_MS);
  return () => window.clearInterval(id);
}

/** Minute-bucketed so repeated calls in one render return the same value. */
function getSnapshot(): number {
  return Math.floor(Date.now() / MINUTE_MS);
}

/** Stable server snapshot keeps static HTML and hydration deterministic. */
function getServerSnapshot(): number {
  return 0;
}

export function useClientClock(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === 0 ? null : new Date(minute * MINUTE_MS);
}
