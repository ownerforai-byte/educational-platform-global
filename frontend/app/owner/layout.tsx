"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Users, Crown as CrownIcon, Database, Settings, Activity, Home, Stethoscope } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/owner", label: "Overview", icon: Activity, exact: true },
  { href: "/owner/users", label: "Users", icon: Users },
  { href: "/owner/premium", label: "Premium", icon: CrownIcon },
  { href: "/owner/content", label: "Content", icon: Database },
  { href: "/owner/activity", label: "Activity", icon: Activity },
  { href: "/owner/settings", label: "Settings", icon: Settings },
  { href: "/controller", label: "Diagnostics", icon: Stethoscope },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useSession();
  const pathname = usePathname();

  const isOwner = isOwnerUser(user);

  // Signed-in non-owners get bounced home; signed-out users go to login.
  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      window.location.href = "/login?next=/owner";
    } else if (!isOwner) {
      window.location.href = "/home";
    }
  }, [isLoading, user, isOwner]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Verifying owner session…</p>
        </div>
      </div>
    );
  }

  if (!user || !isOwner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm text-center space-y-3">
          <Crown className="h-10 w-10 mx-auto text-amber-500" />
          <h1 className="text-xl font-bold tracking-tight">Owner Access Only</h1>
          <p className="text-sm text-muted-foreground">
            This console is restricted to the platform owner emails. Redirecting…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
          <Link href="/owner" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-md shadow-amber-500/20">
              <Crown className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight whitespace-nowrap">
              Owner Console
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
            <span className="hidden md:inline-block max-w-[180px] truncate text-xs text-muted-foreground">
              {user.email}
            </span>
            <Link
              href="/home"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              title="Back to the app"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
