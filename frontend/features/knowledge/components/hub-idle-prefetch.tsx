"use client";

import { useEffect } from "react";
import { idlePrefetchHref } from "@/lib/perf/idle";

/**
 * Warms the Next.js route cache for knowledge-hub children after first paint.
 */
export function HubIdlePrefetch({ hrefs }: { hrefs: string[] }) {
  useEffect(() => {
    const cancels = hrefs.map((href) => idlePrefetchHref(href, { timeoutMs: 2500 }));
    return () => {
      for (const cancel of cancels) cancel();
    };
  }, [hrefs]);
  return null;
}
