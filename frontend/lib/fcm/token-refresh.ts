"use client";

import { readStatusToken } from "@/features/auth/pending-signup-identity";
import { isFcmConfigured } from "./config";
import { syncFcmToken, type FcmSyncResult } from "./register-token";

export type FcmTokenRefreshOptions = {
  /** Pending-signup status token; defaults to the stored one. */
  statusToken?: string | null;
  /**
   * Deep link stored alongside the token. Pass a getter (e.g. reading the
   * current route) so navigation stays fresh without restarting the watcher.
   */
  deepLink?: string | (() => string | undefined);
  /** Periodic re-check interval in ms. Default: 1 hour. */
  intervalMs?: number;
  /** Observability hook, called with each sync outcome. Failures are swallowed. */
  onResult?: (result: FcmSyncResult) => void;
};

const DEFAULT_INTERVAL_MS = 60 * 60 * 1000;
/** Floor between sync runs, so focus + visibilitychange bursts don't stack. */
const MIN_SYNC_GAP_MS = 30 * 1000;

/**
 * Keep the registered FCM token fresh across FCM token rotation.
 *
 * `getToken()` always returns the *current* token, so the reliable refresh
 * strategy (per Firebase guidance) is change detection: re-check `getToken` on
 * app start, window focus, tab visibility, and a slow interval; if the token
 * changed (or the stored deep link drifted), re-register it via `syncFcmToken`.
 * (The deprecated compat `onTokenRefresh` is intentionally not used.)
 *
 * Never prompts for notification permission and never throws. Returns a stop
 * function that removes every listener and timer.
 */
export function startFcmTokenRefresh(opts: FcmTokenRefreshOptions = {}): () => void {
  if (typeof window === "undefined" || !isFcmConfigured()) return () => {};

  let stopped = false;
  let lastRunAt = 0;

  const resolveDeepLink = (): string | undefined =>
    typeof opts.deepLink === "function" ? opts.deepLink() : opts.deepLink;

  const run = (force = false): void => {
    if (stopped) return;
    const now = Date.now();
    if (!force && now - lastRunAt < MIN_SYNC_GAP_MS) return;
    lastRunAt = now;
    void syncFcmToken({
      statusToken: opts.statusToken ?? readStatusToken(),
      deepLink: resolveDeepLink(),
    })
      .then((result) => {
        if (stopped) return;
        try {
          opts.onResult?.(result);
        } catch {
          /* observer errors must never break the watcher */
        }
      })
      .catch(() => undefined);
  };

  const onVisibilityChange = (): void => {
    if (document.visibilityState === "visible") run();
  };
  const onFocus = (): void => run();

  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", onVisibilityChange);
  const intervalId = window.setInterval(() => run(true), opts.intervalMs ?? DEFAULT_INTERVAL_MS);

  // App start: check immediately (throttled away from the very first focus).
  run(true);

  return () => {
    stopped = true;
    window.removeEventListener("focus", onFocus);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.clearInterval(intervalId);
  };
}
