"use client";

import { useEffect } from "react";

/**
 * RawEventRejectionGuard — dev-overlay noise filter.
 *
 * Next 16 + React 19 preload versioned assets (layout.css?v=…) and re-issue
 * them on every Fast Refresh cycle, aborting the in-flight request. React's
 * resource-preload promise for an aborted stylesheet/font rejects with the
 * RAW browser error Event — not an Error instance — which Next's devtools
 * surface as the useless "[object Event]" runtime error.
 *
 * A rejection whose reason is a bare Event carries no actionable stack (its
 * target is an already-aborted <link>). We let those die silently; any real
 * Error rejection still reaches the overlay untouched.
 */
export function RawEventRejectionGuard() {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const isBareEvent =
        reason instanceof Event ||
        (reason && typeof reason === "object" && !(reason instanceof Error) && typeof (reason as { type?: unknown }).type === "string" && !(reason as { stack?: unknown }).stack);
      if (isBareEvent) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", onRejection);
    return () => window.removeEventListener("unhandledrejection", onRejection);
  }, []);

  return null;
}
