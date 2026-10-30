"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot(): boolean {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

/** Stable server snapshot keeps static HTML and hydration deterministic. */
function getServerSnapshot(): boolean {
  return true;
}

/**
 * Live browser connectivity with no effect-delayed first reading. React uses
 * the server snapshot while hydrating, then immediately reconciles the real
 * browser snapshot and every subsequent online/offline event.
 */
export function useOnlineStatus(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
