"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpenText,
  CalendarCheck,
  Home,
  LayoutGrid,
  NotebookPen,
  Repeat,
  Sparkles,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { useR1Access } from "@/features/r1/hooks";
import { isOwnerUser } from "@/lib/owner";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/r1", label: "Today", icon: Home, exact: true },
  { href: "/r1/activities", label: "Activities", icon: Activity },
  { href: "/r1/plans", label: "Plans", icon: CalendarCheck },
  { href: "/r1/journal", label: "Journal", icon: NotebookPen },
  { href: "/r1/habits", label: "Habits", icon: Repeat },
];

/**
 * R1 shell — the daily-life layer (owner + granted emails only).
 * Guests go to login; signed-in users without R1 access land on /home.
 */
export default function R1Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useSession();
  const { data: r1, isLoading: r1Loading } = useR1Access(!!user);
  const pathname = usePathname();

  const allowed = isOwnerUser(user) || r1 === true;

  useEffect(() => {
    if (isLoading || r1Loading) return;
    if (!user) {
      window.location.href = "/login?next=/r1";
    } else if (!allowed) {
      window.location.href = "/home";
    }
  }, [isLoading, r1Loading, user, allowed]);

  if (isLoading || r1Loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Opening R1…</p>
        </div>
      </div>
    );
  }

  if (!user || !allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm text-center space-y-3">
          <Sparkles className="h-10 w-10 mx-auto text-primary" />
          <h1 className="text-xl font-bold tracking-tight">R1 Access Only</h1>
          <p className="text-sm text-muted-foreground">
            R1 is open to owner and granted emails. Redirecting to Fun…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
          <Link href="/r1" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm tracking-tight whitespace-nowrap">R1</span>
            <span className="hidden sm:inline text-xs text-muted-foreground whitespace-nowrap">
              daily life
            </span>
          </Link>

          <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/home"
              className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-all"
              title="Open the study platform"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Study platform</span>
            </Link>
            <Link
              href="/home"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              title="Back to the learning platform"
            >
              <BookOpenText className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Exit</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
