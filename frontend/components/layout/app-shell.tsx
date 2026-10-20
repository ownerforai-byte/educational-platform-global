"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, Atom, Bell, Lock } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { QuickAccessBar } from "./quick-access-bar";
import { SidebarNavigation } from "./sidebar-navigation";
import { BackButton } from "@/components/navigation/back-button";
import { R1Shortcut } from "./r1-shortcut";
import { GlobalSearch } from "./global-search";
import { CreditBadge } from "./credit-badge";
import { UserNav } from "./user-nav";
import { Footer } from "./footer";

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  const pathname = usePathname();
  const isChatRoom = pathname === "/chat" || pathname.startsWith("/chat/");
  // Auth state drives the periodic-table header lock (owner request 2026-10-17:
  // "lock for everything (also the periodic table in header)").
  const { user } = useSession();
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Header stays permanently visible (owner request: pin toggle removed).
  // The auto-hide sensor, reveal tab, hover state, and nav-pinned
  // preference are gone — no auto-hide state remains.

  useEffect(() => {
    try {
    const savedSidebar = localStorage.getItem("sidebar-collapsed");
    if (savedSidebar !== null) {
      setSidebarCollapsed(savedSidebar === "true");
    }
    } catch { /* Storage may be unavailable in private/embedded browsers. */ }
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    try { localStorage.setItem("sidebar-collapsed", String(sidebarCollapsed)); } catch { /* Optional preference. */ }
  }, [sidebarCollapsed, preferencesLoaded]);



  // /chat and /chat/* are the only app routes that bypass this shell entirely
  // (full-bleed chat room, no sidebar/footer). They therefore skip the floating
  // <BackButton /> below, so the chat header renders an INLINE one itself —
  // see TutorConsole's header. Keep these two lists in sync: a route added
  // here must get its own back affordance, or it becomes a dead end.
  if (isChatRoom) {
    return (
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
        <main id="main-content" tabIndex={-1} className="flex-1 min-h-0 focus:outline-none">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span className="text-xs text-muted-foreground animate-pulse">Loading study assistant...</span>
                </div>
              </div>
            }
          >
            <div className="h-full w-full">{children}</div>
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-3 focus:text-primary focus:shadow-lg">Skip to content</a>
      {/* ── Header: left navigation, centered search, right actions ── */}
      <header
        /* SOLID, not translucent — owner report 2026-10-04: "while scrolling it
           leaks a little". This is the third round of the same leak: /70 let the
           footer read straight through the bar, /95 still left a 5% ghost of
           whatever scrolled beneath it, and a 24px blur only smears that ghost
           — the eye catches it anyway because it MOVES while you scroll. Only
           opacity hides what is behind; a blur just defocuses it. So the layer
           is opaque from the first screen all the way down to the footer, and
           backdrop-blur goes with it: it can only filter what this opaque
           background already covers. The price is the nebula hint, and it is
           worth paying to never show content through the nav. */
        className="pt-safe-top sticky top-0 z-40 border-b border-border/40 bg-background translate-y-0"
      >
        {/* Three anchored columns keep the global search centered while the
            left navigation and right-side actions remain clearly separated. */}
        <div className="grid min-h-12 md:min-h-14 grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 px-4 md:px-6 py-1.5">
          {/* Left: mobile hamburger + desktop collapse toggle + logo */}
          <div className="flex items-center gap-2 min-w-0">
            <MobileNav />

            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex h-8 w-8 rounded-xl shrink-0"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed
                ? <PanelLeftOpen className="h-4 w-4" />
                : <PanelLeftClose className="h-4 w-4" />
              }
            </Button>

            <Link
              href="/home"
              className="flex shrink-0 items-center gap-2 rounded-xl px-1.5 py-1 transition-all hover:bg-muted/60 group"
              aria-label="Ravikisan's Platform home"
              title="Ravikisan's Platform"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                <span className="text-sm font-extrabold text-white">R</span>
              </div>
            </Link>
          </div>

          {/* Center: responsive global search (Ctrl/⌘+K uses this engine) */}
          <div className="col-span-2 row-start-2 flex min-w-0 justify-center px-1 md:col-span-1 md:col-start-2 md:row-start-1 md:px-4">
            <GlobalSearch />
          </div>

          {/* Right: shortcuts, notifications, tools, credits and account */}
          <div className="col-start-2 row-start-1 flex items-center justify-end gap-1.5 shrink-0 md:col-start-3">

            <R1Shortcut />

            {/* Notifications — bell opens the live notifications center (/notifications).
                Kept visible on every breakpoint so mobile users can always
                reach their notifications. */}
            <Link
              href="/notifications"
              className="relative inline-flex items-center justify-center h-8 w-8 rounded-xl border border-border/80 bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all shadow-sm shrink-0"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
            </Link>

            <Link
              href="/periodic-table"
              className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl border border-teal-500/30 bg-teal-500/10 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-all shadow-sm whitespace-nowrap"
              title="118-Element CEE Periodic Table & Chemistry Question Bank"
            >
              <Atom className="h-3.5 w-3.5 text-teal-500" />
              <span className="hidden sm:inline">Periodic Table</span>
              {user ? (
                <span className="text-[9px] font-extrabold uppercase px-1 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">CEE</span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold uppercase px-1 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  <Lock className="h-2.5 w-2.5" />
                  Sign in
                </span>
              )}
            </Link>

            <CreditBadge className="hidden sm:flex" />

            <div className="ml-1 h-4 w-px bg-border/60" />
            <Suspense fallback={<div className="h-8 w-8 animate-pulse rounded-full bg-muted/40" />}>
              <UserNav />
            </Suspense>
          </div>
        </div>
        {/* Quick access — tier-gated pills below the search bar (owner 2026-10-17). */}
        <QuickAccessBar />
      <MobileQuickNav />
      </header>

      {/* ── Body: sidebar + main ───────────────────────────────────── */}
      <div className="flex flex-1 relative">
        {/* Mobile overlay */}
        {/* Desktop sidebar */}
        <aside
          className={`
            hidden lg:block
            lg:sticky lg:top-16
            lg:h-[calc(100vh-4rem)]
            flex-shrink-0
            border-r border-border/40 bg-background
            transition-all duration-200 ease-in-out
            ${sidebarCollapsed ? "w-16" : "w-64"}
          `}
        >
          <SidebarNavigation collapsed={sidebarCollapsed} />
        </aside>

        {/* Main content — auto-fits, no max-width constraint */}
        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 px-4 py-6 md:px-6 lg:px-8 focus:outline-none">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumbs" className="mb-4 flex flex-wrap text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-2">/</span>}
                  {crumb.href && crumb.href !== "#" ? (
                    <Link href={crumb.href} className="hover:text-foreground">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="hover:text-foreground">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <Suspense
            fallback={
              <div className="flex min-h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span className="text-xs text-muted-foreground animate-pulse">Loading content...</span>
                </div>
              </div>
            }
          >
            <div className="animate-fade-in">{children}</div>
          </Suspense>
        </main>
      </div>

      {/* ── Site Footer ── */}
      <Footer />

      {/* ── Floating buttons ─────────────────── */}
      {/* Back Button — bottom-right (hidden on home) */}
      <BackButton />
    </div>
  );
}


