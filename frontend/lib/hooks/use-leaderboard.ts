"use client";

/**
 * Leaderboard state as an external store.
 *
 * Same shape as `use-live-stats`: a module-level store read through
 * `useSyncExternalStore`, rather than `useEffect` + `setState`. That keeps the
 * data alive across navigation (back to the board is instant), lets several
 * components share one in-flight request, and avoids a new
 * `react-hooks/set-state-in-effect` finding in the lint ratchet.
 *
 * Range-aware (filters upgrade): the board can be read over a rolling window
 * ("week" / "month") or all-time. Each window is cached in the store, so
 * switching back to a range you already loaded is instant, and a window
 * refresh never disturbs the one you are looking at.
 */

import { useSyncExternalStore } from "react";
import {
  getLeaderboard,
  type LeaderboardRange,
  type LeaderboardResponse,
} from "@/lib/api/leaderboard";

export type LeaderboardState =
  | { status: "loading" }
  | { status: "ready"; data: LeaderboardResponse }
  | { status: "unauthorized" }
  | { status: "error"; message: string };

const LOADING: LeaderboardState = { status: "loading" };

let currentRange: LeaderboardRange = "all";
const cache = new Map<LeaderboardRange, LeaderboardState>();
let started = false;
const inFlight = new Map<LeaderboardRange, Promise<void>>();
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of [...listeners]) listener();
}

function stateFor(range: LeaderboardRange): LeaderboardState {
  return cache.get(range) ?? LOADING;
}

/**
 * Fetch one window into the cache.
 *
 * `silent` keeps the currently shown data on screen while the refresh runs
 * (used on window focus) and keeps a stale-but-useful board when the network
 * blips — a flash of skeleton on every tab focus is not a refresh affordance.
 */
async function fetchRange(range: LeaderboardRange, silent = false): Promise<void> {
  if (inFlight.has(range)) return;
  if (!silent) {
    cache.set(range, LOADING);
    emit();
  }
  const task = (async () => {
    try {
      const data = await getLeaderboard(range);
      cache.set(range, { status: "ready", data });
    } catch (error) {
      const status = (error as { status?: number }).status;
      const failure: LeaderboardState =
        status === 401
          ? { status: "unauthorized" }
          : {
              status: "error",
              message: (error as Error).message || "Could not load the leaderboard",
            };
      // A silent refresh that fails leaves the old board standing.
      if (!silent || stateFor(range).status !== "ready") cache.set(range, failure);
    } finally {
      inFlight.delete(range);
      emit();
    }
  })();
  inFlight.set(range, task);
  await task;
}

/** Switch the board's ranking window, fetching it if it is not cached yet. */
export function setLeaderboardRange(range: LeaderboardRange): void {
  if (range === currentRange) return;
  currentRange = range;
  emit();
  if (!cache.has(range)) void fetchRange(range);
}

/** Re-read the board (used by the refresh buttons). */
export function refreshLeaderboard(range: LeaderboardRange = currentRange): void {
  void fetchRange(range);
}

function ensureStarted(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  void fetchRange(currentRange);
  window.addEventListener("focus", () => void fetchRange(currentRange, true));
}

function subscribe(listener: () => void): () => void {
  ensureStarted();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): LeaderboardState {
  return stateFor(currentRange);
}

function getServerSnapshot(): LeaderboardState {
  return LOADING;
}

export function useLeaderboard(): LeaderboardState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** The window currently on screen — drives the filter chips. */
export function useLeaderboardRange(): LeaderboardRange {
  return useSyncExternalStore(
    subscribe,
    () => currentRange,
    () => "all" as const,
  );
}
