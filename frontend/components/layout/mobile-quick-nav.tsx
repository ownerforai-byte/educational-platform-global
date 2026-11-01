"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FlaskConical,
  HelpCircle,
  Home,
  Layers,
  Sigma,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  QUICK_LINKS,
  quickLinkMinTier,
  quickLinkUnlocked,
} from "@/lib/navigation";
import { accessLevelFor, ACCESS_LABELS } from "@/lib/access-level";
import { useSession } from "@/features/auth/hooks/use-session";
import { isNavItemActive } from "@/lib/nav-active";
import { cn } from "@/lib/utils";

const QUICK_LINK_ICONS: Record<(typeof QUICK_LINKS)[number]["href"], LucideIcon> = {
  "/home": Home,
  "/class-11-notes": BookOpen,
  "/class-12-notes": BookOpen,
  "/subjects": Layers,
  "/lab": FlaskConical,
  "/quiz": HelpCircle,
  "/chat": Sparkles,
  "/ai/math": Sigma,
};

/**
 * Mobile quick navigation with the highest-traffic destinations.
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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 pb-[calc(env(safe-area-inset-bottom)_+_0.5rem)] pt-1 backdrop-blur-lg lg:hidden"
    >
      <div className="no-scrollbar mx-auto flex w-full max-w-lg items-stretch gap-0.5 overflow-x-auto px-2 py-1">
        {QUICK_LINKS.map((link) => {
          const unlocked = quickLinkUnlocked(level, link.href);
          if (!unlocked) {
            // Plans live in the footer only; render a muted disabled destination.
            return (
              <span
                key={link.href}
                aria-disabled="true"
                title={`${link.label} opens at ${ACCESS_LABELS[quickLinkMinTier(link.href)]}`}
                className="flex min-h-12 min-w-[2.5rem] flex-1 cursor-not-allowed items-center justify-center rounded-xl px-0.5 py-1.5 text-center text-[10px] font-semibold leading-tight text-muted-foreground/50 opacity-60 grayscale"
              >
                {link.label}
              </span>
            );
          }
          const Icon = QUICK_LINK_ICONS[link.href];
          const active = isNavItemActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-12 min-w-[2.5rem] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1.5 text-center text-[10px] font-semibold leading-tight transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="max-w-full break-words">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
