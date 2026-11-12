"use client";

import { useEffect, useState } from "react";
import { resolveLiveApprovalRoute } from "./live-approval-route";

/**
 * Live welcome-screen route for this browser.
 * `null` while the first account-status check is in flight.
 */
export function useLiveApprovalRoute(): string | null {
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | null = null;

    const run = async () => {
      try {
        const live = await resolveLiveApprovalRoute();
        if (!cancelled) setRoute(live);
      } catch {
        // Transient failure — retry shortly; stay on checking UI.
        if (!cancelled) {
          timer = window.setTimeout(() => {
            void run();
          }, 2500);
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
