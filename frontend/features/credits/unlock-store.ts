"use client";

/**
 * Shared unlock store.
 *
 * Holds one entry per unlocked module: { [moduleKey]: expirationEpochSeconds }.
 * Persisted to localStorage so a refresh keeps the window, and broadcast to
 * every subscribed component so an expiry re-locks ALL dependent UI at once
 * (blur + credit overlay) without a page reload.
 */

import { useSyncExternalStore } from "react";
import { UNLOCK_WINDOW_SECONDS } from "./constants";

const STORAGE_KEY = "neb.unlock.windows.v1";

export type UnlockMap = Record<string, number>;

let cache: UnlockMap = {};
let hydrated = false;
const listeners = new Set<() => void>();

function readFromStorage(): UnlockMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const now = currentEpochSeconds();
    const next: UnlockMap = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === "number" && Number.isFinite(value) && value > now) {
        next[key] = value;
      }
    }
    return next;
  } catch {
    return {};
  }
}

function writeToStorage(map: UnlockMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage full / private mode — the in-memory window still works.
  }
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  cache = readFromStorage();
}

function emit() {
  for (const listener of listeners) listener();
}

export function currentEpochSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

/** Snapshot for useSyncExternalStore — stable reference between changes. */
function getSnapshot(): UnlockMap {
  hydrate();
  return cache;
}

function subscribe(listener: () => void): () => void {
  hydrate();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** React binding: re-renders whenever any unlock starts or expires. */
export function useUnlocks(): UnlockMap {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/**
 * Start (or extend) a 2-hour window for a module.
 * Expiration = current Unix epoch + 7200 seconds.
 */
export function unlockModule(moduleKey: string): number {
  return unlockModuleAt(
    moduleKey,
    currentEpochSeconds() + UNLOCK_WINDOW_SECONDS,
  );
}

/**
 * Open a window at an explicit expiration (server-issued epoch + 7200).
 * Ignores already-expired timestamps so a stale response can't grant access.
 */
export function unlockModuleAt(moduleKey: string, expiresAt: number): number {
  hydrate();
  const safeExpiry = Math.max(expiresAt, currentEpochSeconds());
  cache = { ...cache, [moduleKey]: safeExpiry };
  writeToStorage(cache);
  emit();
  return safeExpiry;
}

/** Immediately re-lock a module (used on expiry and manual lock). */
export function lockModule(moduleKey: string) {
  hydrate();
  if (!(moduleKey in cache)) return;
  const next = { ...cache };
  delete next[moduleKey];
  cache = next;
  writeToStorage(cache);
  emit();
}

/** True while the module's window is still open. */
export function isUnlocked(map: UnlockMap, moduleKey: string): boolean {
  const expiresAt = map[moduleKey];
  return typeof expiresAt === "number" && expiresAt > currentEpochSeconds();
}

/** Seconds left in a module's window (0 when locked/absent). */
export function secondsRemaining(map: UnlockMap, moduleKey: string): number {
  const expiresAt = map[moduleKey];
  if (typeof expiresAt !== "number") return 0;
  return Math.max(0, expiresAt - currentEpochSeconds());
}

/**
 * Sweep every expired entry in one pass and emit once if anything changed.
 * Called from the frame-by-frame timer so all locked UI flips together.
 */
export function pruneExpired(): boolean {
  hydrate();
  const now = currentEpochSeconds();
  let changed = false;
  const next: UnlockMap = {};
  for (const [key, expiresAt] of Object.entries(cache)) {
    if (expiresAt > now) next[key] = expiresAt;
    else changed = true;
  }
  if (changed) {
    cache = next;
    writeToStorage(cache);
    emit();
  }
  return changed;
}
