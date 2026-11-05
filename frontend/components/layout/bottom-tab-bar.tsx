"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { APP_TABS, quickLinkMinTier } from "@/lib/navigation";
import { ACCESS_LABELS, hasLevel } from "@/lib/access-level";
import { useSession } from "@/features/auth/hooks/use-session";
import { isNavItemActive } from "@/lib/nav-active";
import { cn } from "@/lib/utils";

/**
 * Phone app frame — the persistent bottom tab bar (owner request 2026-11-05:
 * "make it pro, not lightweight"). It replaces the scrolling quick-link chips
 * on phones: five thumb-sized destinations, always in the same place, with the
 * active tab lit, the way a native study app behaves.
 *
 * - Data comes from APP_TABS in lib/navigation.ts, so the bar can never point
 *   at a page the sidebar does not know about.
 * - Rungs come from the same registry (quickLinkMinTier). A tab above the
 *   viewer's rung is not a dead end: it opens /plans and explains which tier
 *   unlocks it, exactly like the tier rails on the home screen.
 * - Hidden from md up (the tablet rail and desktop sidebar take over) and on
 *   the full-screen chat route, which renders its own shell.
 */
export function BottomTabBar() {
  const pathname = usePathname();
  const { user } = useSession();

  return (
    <nav
      aria-label="App tabs"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "border-t border-border/60 bg-background/90 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/75",
        "pb-safe-bottom select-none",
      )}
    >
      <ul className="flex items-stretch justify-around">
        {APP_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isNavItemActive(pathname, tab.href);
          const unlocked = hasLevel(user, quickLinkMinTier(tab.href));
          const tierLabel = ACCESS_LABELS[quickLinkMinTier(tab.href)];

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={unlocked ? tab.href : "/plans"}
                aria-current={active ? "page" : undefined}
                aria-label={
                  unlocked ? tab.label : `${tab.label} — opens at ${tierLabel}`
                }
                title={unlocked ? tab.label : `${tab.label} opens at ${tierLabel}`}
                className={cn(
                  "group flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 pt-1.5 text-[10px] font-semibold tracking-tight",
                  "transition-transform duration-150 active:scale-[0.94] touch-manipulation",
                  unlocked
                    ? active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/50",
                )}
              >
                <span
                  className={cn(
                    "relative flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                    active && unlocked && "bg-primary/10",
                    !unlocked && "opacity-70",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] transition-transform",
                      active && unlocked && "scale-105",
                    )}
                    strokeWidth={active && unlocked ? 2.4 : 2}
                  />
                  {!unlocked && (
                    <Lock
                      className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className="leading-none">{tab.short}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
