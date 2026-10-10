"use client";

import { useSyncExternalStore } from "react";
import { getPublicConfig } from "@/lib/api/config";
import { COIN_GATE_EVENT } from "@/lib/coin-gate";

/**
 * Live coin-gate flag, mirrored from GET /api/config.
 *
 * `true`  — AI chat bills one credit per message (platform default).
 * `false` — the owner turned the gate OFF: chat is free for owner emails
 *           (students still pay), so owner surfaces must NOT lock the
 *           composer on a zero balance.
 * `null`  — still loading; callers keep the existing behaviour (fail closed).
 *
 * The flag controls OWNER emails only (single profile toggle).
 *
 * ONE shared subscription per app: the hook had five consumers (route gate,
 * coin-gate dot, tutor console, plan strip, chat interface), and each ran its
 * own 15s poll + event listener — five GET /api/config requests every poll
 * cycle. The poll, the broadcast listener and the cached value now live in
 * this module; every mounted consumer subscribes to the same store and the
 * interval runs only while at least one of them is mounted.
 */
let current: boolean | null = null;
let started = false;
let intervalId: number | null = null;
const listeners = new Set<() => void>();

function setCurrent(next: boolean) {
  if (next === current) return;
  current = next;
  for (const listener of listeners) listener();
}

async function load(): Promise<void> {
  try {
    const cfg = await getPublicConfig();
    setCurrent(cfg.coinGateEnabled);
  } catch {
    // Fail closed: until the first successful read the gate reads as ON.
    if (current === null) setCurrent(true);
  }
}

function onBroadcast(event: Event): void {
  const detail = (event as CustomEvent<{ enabled?: unknown }>).detail;
  if (detail && typeof detail.enabled === "boolean") {
    setCurrent(detail.enabled);
  } else {
    void load();
  }
}

function start(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  void load();
  window.addEventListener(COIN_GATE_EVENT, onBroadcast);
  intervalId = window.setInterval(() => void load(), 15_000);
}

function stopIfIdle(): void {
  if (!started || listeners.size > 0) return;
  started = false;
  window.removeEventListener(COIN_GATE_EVENT, onBroadcast);
  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
    stopIfIdle();
  };
}

function getSnapshot(): boolean | null {
  return current;
}

export function useCoinGateEnabled(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
