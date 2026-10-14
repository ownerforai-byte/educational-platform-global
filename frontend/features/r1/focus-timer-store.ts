import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Focus timer store — one shared stopwatch for the R1 layer.
 *
 * The floating launcher (over the AI widget) and the R1 home card read the
 * same state, so starting here and pausing there is always consistent. State
 * persists per user in localStorage so a reload never loses a running session:
 * `startedAt` is wall-clock, so elapsed time survives refreshes correctly.
 */

export type FocusTimerState = {
  label: string;
  running: boolean;
  /** Epoch ms when the current run segment started (null when paused/idle). */
  startedAt: number | null;
  /** Milliseconds banked before the current run segment. */
  accumulatedMs: number;
};

const IDLE: FocusTimerState = {
  label: "",
  running: false,
  startedAt: null,
  accumulatedMs: 0,
};

let state: FocusTimerState = IDLE;
let storageKey: string | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function persist(): void {
  if (!storageKey) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Private mode / quota — the timer still works for this session.
  }
}

/** Bind the store to a user (loads their persisted timer). */
export function initFocusTimer(userId: string): void {
  const key = `r1:timer:${userId}`;
  if (storageKey === key) return;
  storageKey = key;
  try {
    const raw = localStorage.getItem(key);
    state = raw ? { ...IDLE, ...(JSON.parse(raw) as Partial<FocusTimerState>) } : IDLE;
  } catch {
    state = IDLE;
  }
  emit();
}

export function subscribeFocusTimer(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getFocusTimerSnapshot(): FocusTimerState {
  return state;
}

/** Prerender/SSR has no timer state — always the idle snapshot. */
export function getFocusTimerServerSnapshot(): FocusTimerState {
  return IDLE;
}

export function focusTimerElapsedMs(now: number = Date.now()): number {
  return (
    state.accumulatedMs +
    (state.running && state.startedAt ? Math.max(0, now - state.startedAt) : 0)
  );
}

export function startFocusTimer(): void {
  if (state.running) return;
  state = { ...state, running: true, startedAt: Date.now() };
  persist();
  emit();
}

export function pauseFocusTimer(): void {
  if (!state.running) return;
  state = { ...state, running: false, accumulatedMs: focusTimerElapsedMs(), startedAt: null };
  persist();
  emit();
}

export function resetFocusTimer(): void {
  state = { ...state, running: false, startedAt: null, accumulatedMs: 0 };
  persist();
  emit();
}

export function setFocusTimerLabel(label: string): void {
  state = { ...state, label };
  persist();
  emit();
}

/** After a session is saved: back to 00:00:00 keeping the label. */
export function clearFocusTimerAfterSave(): void {
  state = { ...state, running: false, startedAt: null, accumulatedMs: 0 };
  persist();
  emit();
}

/** `HH:MM:SS` display — the timer always opens at 00:00:00. */
export function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/** React binding: shared state + a per-second tick while running. */
export function useFocusTimer(): {
  state: FocusTimerState;
  elapsedText: string;
  elapsedMs: number;
} {
  const snapshot = useSyncExternalStore(
    subscribeFocusTimer,
    getFocusTimerSnapshot,
    getFocusTimerServerSnapshot
  );
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!snapshot.running) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [snapshot.running]);

  const elapsedMs = focusTimerElapsedMs();
  return {
    state: snapshot,
    elapsedMs,
    elapsedText: formatElapsed(elapsedMs),
  };
}
