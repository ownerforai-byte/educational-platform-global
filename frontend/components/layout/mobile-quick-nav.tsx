"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  QUICK_LINKS,
  quickLinkMinTier,
  quickLinkUnlocked,
} from "@/lib/navigation";
import { accessLevelFor, ACCESS_LABELS } from "@/lib/access-level";
import { useSession } from "@/features/auth/hooks/use-session";
import { isNavItemActive } from "@/lib/nav-active";
import { cn } from "@/lib/utils";

/**
 * Mobile quick-nav strip with the highest-traffic destinations.
 * The hamburger drawer remains the full menu; this is the compact fast path.
 *
 * Tier-aware (plan.md §4): the strip starts at the Member rung (the shell hides
 * it from visitors entirely), each link opens at its registry rung, and links
 * above the viewer's rung stay visible in a muted disabled state, without an icon or action.
 */
export function MobileQuickNav() {
  const pathname = usePathname();
  const { user } = useSession();
  const level = accessLevelFor(user);

  return (
    <nav
      aria-label="Quick navigation"
      className="no-scrollbar lg:hidden overflow-x-auto border-t border-border/40 bg-background"
    >
      <div className="flex items-center gap-1.5 px-3 py-2">
        {QUICK_LINKS.map((link) => {
          const unlocked = quickLinkUnlocked(level, link.href);
          if (!unlocked) {
            // Plans live in the footer only; render a muted disabled chip.
            return (
              <span
                key={link.href}
                aria-disabled="true"
                title={`${link.label} opens at ${ACCESS_LABELS[quickLinkMinTier(link.href)]}`}
                className="flex shrink-0 cursor-not-allowed items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground/50 opacity-60 grayscale"
              >
                {link.label}
              </span>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                isNavItemActive(pathname, link.href)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
