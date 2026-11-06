"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_TABS, quickLinkMinTier } from "@/lib/navigation";
import { hasLevel } from "@/lib/access-level";
import { useSession } from "@/features/auth/hooks/use-session";
import { isNavItemActive } from "@/lib/nav-active";
import { cn } from "@/lib/utils";

/**
 * Bottom tab bar — five thumb destinations.
 * No lock icons: locked tabs just dim; tapping always navigates (the page
 * shows the muted "Unavailable on this plan" card instead).
 * Hidden on md+ (tablet rail / desktop sidebar take over).
 */
export function BottomTabBar() {
  const pathname = usePathname();
  const { user } = useSession();

  return (
    <nav
      aria-label="App tabs"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "border-t border-border/60 bg-background/95 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/80",
        "pb-safe-bottom select-none",
      )}
    >
      <ul className="flex items-stretch justify-around">
        {APP_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isNavItemActive(pathname, tab.href);
          const unlocked = hasLevel(user, quickLinkMinTier(tab.href));

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                aria-label={tab.label}
                className={cn(
                  "group flex min-h-14 flex-col items-center justify-center gap-1",
                  "px-1 pt-1.5 text-[10px] font-semibold tracking-tight",
                  "transition-transform duration-150 active:scale-[0.94] touch-manipulation",
                  active
                    ? "text-primary"
                    : unlocked
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-muted-foreground/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                    active && "bg-primary/10",
                  )}
                >
                  <Icon
                    className={cn("h-[18px] w-[18px]")}
                    strokeWidth={active ? 2.4 : 2}
                  />
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
