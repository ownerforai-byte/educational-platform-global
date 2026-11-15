"use client";

import { useEffect, useState } from "react";
import {
  resolveLiveApprovalRoute,
  resolveLiveApprovalRouteFallback,
} from "./live-approval-route";

/**
 * Live welcome-screen route for this browser.
 * `null` while the first account-status check is in flight.
 */
const LIVE_ROUTE_RETRY_MS = 2500;
/** After repeated account-status failures, fall back so auth screens recover. */
const LIVE_ROUTE_FAIL_OPEN_ATTEMPTS = 4;

export function useLiveApprovalRoute(): string | null {
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | null = null;
    let attempts = 0;

    const run = async () => {
      try {
        const live = await resolveLiveApprovalRoute();
        if (!cancelled) setRoute(live);
      } catch {
        attempts += 1;
        if (!cancelled && attempts >= LIVE_ROUTE_FAIL_OPEN_ATTEMPTS) {
          // Stop infinite "Checking…" on welcome routes when the API is down.
          setRoute(resolveLiveApprovalRouteFallback());
          return;
        }
        // Transient failure — retry shortly; stay on checking UI.
        if (!cancelled) {
          timer = window.setTimeout(() => {
            void run();
          }, LIVE_ROUTE_RETRY_MS);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return route;
}
