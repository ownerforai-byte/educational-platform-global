"use client";

/**
 * Leaderboard state as an external store.
 *
 * Same shape as `use-live-stats`: a module-level store read through
 * `useSyncExternalStore`, rather than `useEffect` + `setState`. That keeps the
 * data alive across navigation (back to the board is instant), lets several
 * components share one in-flight request, and avoids a new
 * `react-hooks/set-state-in-effect` finding in the lint ratchet.
 */

import { useSyncExternalStore } from "react";
import { getLeaderboard, type LeaderboardResponse } from "@/lib/api/leaderboard";

export type LeaderboardState =
  | { status: "loading" }
  | { status: "ready"; data: LeaderboardResponse }
  | { status: "unauthorized" }
  | { status: "error"; message: string };

const LOADING: LeaderboardState = { status: "loading" };

let state: LeaderboardState = LOADING;
let started = false;
let inFlight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of [...listeners]) listener();
}

async function load(): Promise<void> {
  try {
    const data = await getLeaderboard();
    state = { status: "ready", data };
  } catch (error) {
    const status = (error as { status?: number }).status;
    state =
      status === 401
        ? { status: "unauthorized" }
        : {
            status: "error",
            message: (error as Error).message || "Could not load the leaderboard",
          };
  }
  emit();
}

/** Re-read the board (used by the refresh button and on window focus). */
export function refreshLeaderboard(): void {
  if (inFlight) return;
  state = { status: "loading" };
  emit();
  inFlight = load().finally(() => {
    inFlight = null;
  });
}

function ensureStarted(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  void refreshLeaderboard();
  window.addEventListener("focus", () => void refreshLeaderboard());
}

function subscribe(listener: () => void): () => void {
  ensureStarted();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): LeaderboardState {
  return state;
}

function getServerSnapshot(): LeaderboardState {
  return LOADING;
}

export function useLeaderboard(): LeaderboardState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
