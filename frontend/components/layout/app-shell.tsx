"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, Atom } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel } from "@/lib/access-level";
import { sectionById } from "@/lib/sections";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { BottomTabBar } from "./bottom-tab-bar";
import { SidebarNavigation } from "./sidebar-navigation";
import { BackButton } from "@/components/navigation/back-button";
import { R1Shortcut } from "./r1-shortcut";
import { GlobalSearch } from "./global-search";
import { CreditBadge } from "./credit-badge";
import { NotificationBell } from "./notification-bell";
import { UserNav } from "./user-nav";
import { Footer } from "./footer";
import { PlatformGuideWidget } from "@/components/home/platform-guide-widget";
import { AIWidget } from "./ai-widget";
import { useMediaQuery } from "@/lib/use-media-query";

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  const pathname = usePathname();
  const isChatRoom = pathname === "/chat" || pathname.startsWith("/chat/");
  const { user } = useSession();
  // THE PLAN (plan.md §3 row "Search"): the global search input opens at the
  // Search section's rung — the same tier the public /plans matrix shows.
  const searchUnlocked = hasLevel(user, sectionById("search")?.minTier ?? "member");
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Three shells, one component: phone (bottom tabs + drawer), tablet
  // (the sidebar collapsed to an icon rail) and desktop (full sidebar). The
  // rail is the same navigation, so a tablet keeps every destination instead
  // of falling back to a phone-width page.
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const railOnly = !isDesktop;
  const navCollapsed = railOnly || sidebarCollapsed;

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

  // Chat uses a full-screen layout; its own header provides the back control.
  if (isChatRoom) {
    return (
      <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-background">
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
    <div className="flex min-h-screen flex-col bg-background pb-tabbar md:pb-0">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-3 focus:text-primary focus:shadow-lg">Skip to content</a>
      <header
        className="pt-safe-top sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 translate-y-0"
      >
        <div className="grid min-h-12 md:min-h-14 grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 px-4 md:px-6 py-1.5">
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

            {/* The brand opens the welcome entry (owner 2026-11-03): "/" feeds
                the welcome flow — the universal welcome for a visitor, the
                matching tier welcome for a signed-in viewer. */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 rounded-xl px-1.5 py-1 transition-all hover:bg-muted/60 group"
              aria-label="Ravikisan's Platform — welcome"
              title="Ravikisan's Platform"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                <span className="text-sm font-extrabold text-white">R</span>
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">Ravikisan&apos;s Platform</span>
            </Link>
          </div>

          {searchUnlocked && (
            <div className="col-span-2 row-start-2 flex min-w-0 justify-center px-1 md:col-span-1 md:col-start-2 md:row-start-1 md:px-4">
              <GlobalSearch />
            </div>
          )}

          <div className="col-start-2 row-start-1 flex items-center justify-end gap-1.5 shrink-0 md:col-start-3">

            <R1Shortcut />

            {/* State-driven badge (plan.md §14 5.2) — hides at zero, syncs
                across tabs; the old static pulsing dot ignored real state. */}
            <NotificationBell />

            {user && (
              <Link
                href="/periodic-table"
                className="inline-flex items-center gap-1.5 px-2.5 min-h-10 md:min-h-8 rounded-xl border border-teal-500/30 bg-teal-500/10 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-all shadow-sm whitespace-nowrap"
                title="118-Element CEE Periodic Table & Chemistry Question Bank"
                aria-label="Periodic table and CEE chemistry question bank"
              >
                <Atom className="h-3.5 w-3.5 text-teal-500" />
                <span className="hidden sm:inline">Periodic Table</span>
                <span className="text-[9px] font-extrabold uppercase px-1 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">CEE</span>
              </Link>
            )}

            <CreditBadge className="hidden sm:flex" />

            <div className="ml-1 h-4 w-px bg-border/60" />
            <Suspense fallback={<div className="h-8 w-8 animate-pulse rounded-full bg-muted/40" />}>
              <UserNav />
            </Suspense>
          </div>
        </div>
      </header>

      {/* ── Body: sidebar + main ───────────────────────────────────── */}
      <div className="flex flex-1 relative">
        {/* Persistent navigation: full sidebar on desktop, icon rail on tablet.
            One instance, one nav landmark — the compact rail is the same
            SidebarNavigation, so both widths show every destination. */}
        <aside
          className={`
            hidden md:block
            md:sticky md:top-14 lg:top-16
            md:h-[calc(100dvh-3.5rem)] lg:h-[calc(100vh-4rem)]
            flex-shrink-0 overflow-hidden
            border-r border-border/40 bg-background
            transition-[width] duration-200 ease-in-out
            ${navCollapsed ? "w-16" : "w-64"}
          `}
        >
          <SidebarNavigation collapsed={navCollapsed} />
        </aside>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 min-w-0 px-4 py-5 pb-tabbar sm:py-6 sm:pb-tabbar md:px-6 md:pb-8 lg:px-8 focus:outline-none"
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumbs" className="mb-4 flex flex-wrap text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href ?? `${crumb.label}-${i}`}>
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

      {/* Site footer (tier-aware directory) */}
      <Footer user={user} />

      {/* Phone app frame: thumb tabs, replaced by the rail/sidebar from md up. */}
      <BottomTabBar />

      {/* Back navigation */}
      <BackButton />

      <PlatformGuideWidget />
      <AIWidget />
    </div>
  );
}

