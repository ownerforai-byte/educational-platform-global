"use client";

/**
 * useSessionTimer — frame-by-frame unlock countdown.
 *
 * Runs a requestAnimationFrame loop that:
 *   1. recomputes remaining seconds for a module every rendered frame,
 *   2. prunes every expired unlock so all dependent UI re-locks in one pass,
 *   3. fires `onExpire(moduleKey)` exactly once when a window hits 0,
 *      letting the caller blur the display layer and raise the credit overlay
 *      WITHOUT a full browser tab reload.
 *
 * Pass "all" via the returned helpers to track every active window at once
 * (used by the directory card and the global credit overlay).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  currentEpochSeconds,
  pruneExpired,
  useUnlocks,
  type UnlockMap,
} from "./unlock-store";

export interface SessionTimerState {
  /** Live snapshot of every active unlock window. */
  unlocks: UnlockMap;
  /** Seconds left for `key` (0 when locked / never unlocked). */
  remaining: (key: string) => number;
  /** HH:MM:SS for `key` — "00:00:00" when locked. */
  remainingClock: (key: string) => string;
  /** True while `key`'s 2-hour window is open. */
  isOpen: (key: string) => boolean;
  /** Frame counter — lets consumers re-render on every animation frame. */
  frame: number;
}

function clock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function useSessionTimer(
  onExpire?: (moduleKey: string) => void,
): SessionTimerState {
  const unlocks = useUnlocks();
  const [frame, setFrame] = useState(0);
  const onExpireRef = useRef(onExpire);
  const firedRef = useRef<Set<string>>(new Set());

  onExpireRef.current = onExpire;

  // Frame-by-frame loop: re-derive "now", sweep expired windows, bump frame.
  useEffect(() => {
    let rafId = 0;
    const loop = () => {
      pruneExpired();
      setFrame((n) => (n + 1) % 1_000_000);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Fire onExpire exactly once per module key per window.
  useEffect(() => {
    const now = currentEpochSeconds();

    for (const [key, expiresAt] of Object.entries(unlocks)) {
      const expired = expiresAt <= now;
      if (expired && !firedRef.current.has(key)) {
        firedRef.current.add(key);
        onExpireRef.current?.(key);
      } else if (!expired) {
        // Renewed or fresh window — re-arm so the next expiry fires again.
        firedRef.current.delete(key);
      }
    }

    // Forget keys that are no longer present (fully re-locked and pruned).
    for (const key of Array.from(firedRef.current)) {
      if (!(key in unlocks)) firedRef.current.delete(key);
    }
  }, [unlocks, frame]);

  const remaining = useCallback(
    (key: string) => {
      const expiresAt = unlocks[key];
      if (typeof expiresAt !== "number") return 0;
      return Math.max(0, expiresAt - currentEpochSeconds());
    },
    [unlocks],
  );

  const isOpen = useCallback((key: string) => remaining(key) > 0, [remaining]);

  const remainingClock = useCallback(
    (key: string) => clock(remaining(key)),
    [remaining],
  );

  return { unlocks, remaining, remainingClock, isOpen, frame };
}
