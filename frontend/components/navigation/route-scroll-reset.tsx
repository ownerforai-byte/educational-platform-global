"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Owner rule (2026-09-27): every page OPEN or CLOSE lands at the HEADER,
 * never at the footer.
 *
 * Without this, browser (and Next.js) history scroll restoration kicks in on
 * back/forward — and because people read pages down to the bottom, "the
 * position you left" is almost always the footer. So leaving a page and
 * coming back dropped you at the bottom, right above the Pro-plan footer.
 *
 * The retries beat restoration that lands a frame (or a suspense fill) later
 * than the first scroll.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const toTop = () => window.scrollTo(0, 0);

    toTop();
    const raf = requestAnimationFrame(toTop);
    const t1 = window.setTimeout(toTop, 150);
    const t2 = window.setTimeout(toTop, 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
