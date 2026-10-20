"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel } from "@/lib/access-level";
import { isNavItemActive } from "@/lib/nav-active";
import { QUICK_NAV_ITEMS, navMinLevel } from "@/lib/navigation";

/** One responsive navigation row with the same access rules as the full menu. */
export function QuickAccessBar() {
  const { user } = useSession();
  const pathname = usePathname();

  return (
    <nav aria-label="Quick access" className="flex items-center gap-1 overflow-x-auto border-t border-border/40 px-4 py-1 md:px-6">
      {QUICK_NAV_ITEMS.map((item) => {
        const unlocked = hasLevel(user ?? null, navMinLevel(item));
        if (!unlocked && !user) return null;
        const Icon = unlocked ? item.icon : Lock;
        const active = unlocked && isNavItemActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={unlocked ? item.href : "/pro-plan"}
            title={unlocked ? item.label : `${item.label} requires a higher plan`}
            aria-label={unlocked ? item.label : `${item.label} - view access plans`}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />{item.label}
          </Link>
        );
      })}
      {!user && (
        <Link href="/login" className="inline-flex min-h-11 shrink-0 items-center rounded-lg px-3 text-xs font-medium text-primary hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">Sign in</Link>
      )}
    </nav>
  );
}
