"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bot,
  Compass,
  FlaskConical,
  HelpCircle,
  Home,
  Layers,
  Lock,
  Search,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel, type AccessLevel } from "@/lib/access-level";

/**
 * QUICK-ACCESS BAR (owner request 2026-10-17): "arrange the access below search
 * bar like home class 11, class 12, subjects, labs, quiz, ai also according to
 * tiers".
 *
 * A slim pill row pinned under the header search. Each destination is gated by
 * the ACCESS LADDER (lib/access-level.ts) exactly like the sidebar indexes:
 * member sees the locks, plus opens Home + Class 11, pro opens every entry. A
 * locked pill routes to /pro-plan instead of the destination, so the tier is
 * visible without ever leaking a locked route.
 */

const QUICK: {
  href: string;
  label: string;
  icon: typeof Home;
  minLevel: AccessLevel;
}[] = [
  // Search leads the bar and is open to every tier (owner 2026-10-17: "add
  // search in access … it is in front"): the header search already serves all
  // visitors, so this is a fast shortcut, not a tier-locked destination.
  { href: "/search", label: "Search", icon: Search, minLevel: "visitor" },
  { href: "/", label: "Home", icon: Home, minLevel: "plus" },
  { href: "/class-11-notes", label: "Class 11", icon: BookOpen, minLevel: "plus" },
  { href: "/class-12-notes", label: "Class 12", icon: BookOpen, minLevel: "pro" },
  { href: "/subjects", label: "Subjects", icon: Layers, minLevel: "pro" },
  { href: "/lab", label: "Labs", icon: FlaskConical, minLevel: "pro" },
  { href: "/quiz", label: "Quiz", icon: HelpCircle, minLevel: "pro" },
  { href: "/ai", label: "AI", icon: Bot, minLevel: "pro" },
];

export function QuickAccessBar() {
  const { user } = useSession();
  const pathname = usePathname();
  // A signed-out visitor never sees a lock pill (owner 2026-10-17).
  const isVisitor = !user;

  return (
    <nav
      aria-label="Quick access"
      className="flex items-center gap-1.5 overflow-x-auto px-4 md:px-6 pb-2 pt-0.5"
    >
      {QUICK.map((item) => {
        const unlocked = hasLevel(user ?? null, item.minLevel);
        const Icon = item.icon;
        const active = pathname === item.href;

        if (!unlocked) {
          // Owner request 2026-10-17: "hide those lock from public/visitors" —
          // a signed-out visitor never sees a lock pill. Signed-in users see the
          // higher-tier locks as their upgrade path, while their own tier's
          // items are already open above ("open according level of access for
          // paid users").
          if (isVisitor) return null;
          return (
            <Link
              key={item.href}
              href="/pro-plan"
              title={`${item.label} — locked on your plan`}
              aria-label={`${item.label} — locked, see your plan`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.07] px-3 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 transition-colors hover:bg-amber-500/15"
            >
              <Lock className="h-3 w-3" />
              {item.label}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
              active
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/70 bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            <Icon className="h-3 w-3" />
            {item.label}
          </Link>
        );
      })}
      {/* Visitors get a gentle sign-in hint instead of a wall of locks. */}
      {isVisitor && (
        <Link
          href="/login"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/15"
        >
          <Compass className="h-3 w-3" />
          Sign in to explore
        </Link>
      )}
    </nav>
  );
}
