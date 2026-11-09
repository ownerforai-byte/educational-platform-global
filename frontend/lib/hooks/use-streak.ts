"use client";

/**
 * Live study-streak count with no effect-delayed first reading.
 *
 * `useEffect(() => setStreak(getStreak().count), [])` renders a fake zero on
 * the first pass and only then reads localStorage — a cascading render
 * (react-hooks/set-state-in-effect) and a flash of "Start your streak!" for a
 * student who already has a 12-day run. `useSyncExternalStore` reads the
 * browser snapshot right after hydration, keeps the server snapshot at 0 so
 * static HTML stays deterministic, and re-reads on cross-tab writes or when
 * the tab regains focus. Same pattern as `use-online-status.ts` and the
 * `useUnlocks()` binding in features/credits/unlock-store.ts.
 */
import { useSyncExternalStore } from "react";
import { getStreak } from "@/lib/streaks";

const STREAK_KEY_PREFIX = "neb-streak:";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    // A null key means the whole store was cleared — that can reset a streak.
    if (!event.key || event.key.startsWith(STREAK_KEY_PREFIX)) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", onChange);
  };
}

/** A number is its own cache, so React can never loop on a fresh reference. */
function getSnapshot(): number {
  return getStreak().count;
}

/** Stable server snapshot keeps static HTML and hydration deterministic. */
function getServerSnapshot(): number {
  return 0;
}

export function useStreakCount(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
