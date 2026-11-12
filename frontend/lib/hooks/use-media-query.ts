"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media-query hook.
 *
 * `serverValue` is what the server (and the hydration pass) renders, so the
 * first paint never disagrees with the HTML it was hydrated from; the client
 * value takes over on the same tick. Used by the app shell to know whether the
 * sidebar should render full (desktop) or as the tablet icon rail.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return () => {};
      }
      const mql = window.matchMedia(query);
      // Safari < 14 only has the deprecated listener API.
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
      }
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () =>
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia(query).matches
        : serverValue,
    () => serverValue,
  );
}
