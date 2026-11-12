"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Crown,
  Users,
  Coins,
  Settings,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { VerifyingStatus } from "@/features/auth/components/verifying-status";
import { isOwnerAccount, OWNER_EMAIL } from "@/lib/owner";
import { cn } from "@/lib/utils";

/**
 * Owner console shell — root owner email or a live role:"owner" grant.
 * Nav kept short: Approvals is the main job; other tools are secondary.
 */
const navItems = [
  { href: "/owner", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/owner/users", label: "Approvals", icon: Users },
  { href: "/owner/credits", label: "Sparks", icon: Coins },
  { href: "/owner/settings", label: "Settings", icon: Settings },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useSession();
  const pathname = usePathname();
  const isOwner = isOwnerAccount(user);

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
        <VerifyingStatus label="Verifying owner session" />
      </div>
    );
  }

  if (!user || !isOwner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm text-center space-y-3">
          <Crown className="h-10 w-10 mx-auto text-amber-500" />
          <h1 className="text-xl font-bold tracking-tight">Owner access only</h1>
          <p className="text-sm text-muted-foreground">
            Sign in as {OWNER_EMAIL}, or as an email that owner assigned the
            owner role. Redirecting…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
          <Link href="/owner" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500">
              <Crown className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight whitespace-nowrap">
              Owner control
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
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:inline-block max-w-[200px] truncate text-xs text-muted-foreground">
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

      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
