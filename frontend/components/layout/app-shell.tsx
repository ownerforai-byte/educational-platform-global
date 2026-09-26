"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, Atom, Pin, PinOff, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { SidebarNavigation } from "./sidebar-navigation";
import { BackButton } from "@/components/navigation/back-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { UserNav } from "./user-nav";
import { Footer } from "./footer";

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Visible by default: an auto-hiding bar hid the whole nav (incl. the mobile
  // hamburger) behind a 12px hover strip on first load for every visitor.
  const [navPinned, setNavPinned] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClickedOpen, setIsClickedOpen] = useState(false);

  useEffect(() => {
    const savedSidebar = localStorage.getItem("sidebar-collapsed");
    if (savedSidebar !== null) {
      setSidebarCollapsed(savedSidebar === "true");
    }
    // v2 key: the old "nav-pinned" defaulted to false and was auto-written for
    // every visitor on mount, so honoring it would keep the bar hidden for
    // everyone. Only "false" counts — it means the user explicitly unpinned.
    const savedPinned = localStorage.getItem("nav-pinned-v2");
    if (savedPinned === "false") {
      setNavPinned(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem("nav-pinned-v2", String(navPinned));
  }, [navPinned]);

  const navVisible = navPinned || isHovered || isClickedOpen;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ── Top Sensor & Reveal Tab for Auto-Hiding Navbar ── */}
      {!navPinned && (
        <>
          <div
            className="fixed top-0 inset-x-0 h-3 z-50 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onClick={() => setIsClickedOpen((prev) => !prev)}
            title="Hover or click to show navigation"
          />
          {!navVisible && (
            <button
              onClick={() => setIsClickedOpen(true)}
              className="fixed top-0 left-1/2 -translate-x-1/2 z-50 px-3 py-0.5 rounded-b-md bg-primary/90 hover:bg-primary text-primary-foreground text-[10px] font-bold flex items-center gap-1 shadow-md transition-all backdrop-blur-sm animate-pulse hover:animate-none"
              title="Click or hover to reveal navigation bar"
            >
              <ChevronDown className="h-3 w-3" />
              <span>Nav</span>
            </button>
          )}
        </>
      )}

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsClickedOpen(false);
        }}
        className={`sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          navVisible ? "translate-y-0 shadow-md" : "-translate-y-full"
        }`}
      >
        <div className="flex h-12 md:h-14 items-center gap-2 px-4 md:px-6">
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
              href="/"
              className="flex shrink-0 items-center gap-2 rounded-xl px-1.5 py-1 transition-all hover:bg-muted/60 group"
              aria-label="Ravikisan's Platform home"
              title="Ravikisan's Platform"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                <span className="text-sm font-extrabold text-white">R</span>
              </div>
            </Link>
          </div>

          {/* Center spacer */}
          <div className="flex-1" />

          {/* Right: pin toggle + theme studio + search + credit badge + auth links */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Search Shortcut */}
            <Link
              href="/search"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl border border-border/80 bg-card hover:bg-muted/60 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all shadow-sm whitespace-nowrap"
              title="Global search across all subjects, notes, theorems, derivations, and labs"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Search</span>
              <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-muted border border-border/60">⌘K</kbd>
            </Link>

            {/* Pin / Unpin button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-xl shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => setNavPinned(!navPinned)}
              title={navPinned ? "Unpin navigation (auto-hides on hover to maximize screen)" : "Pin navigation bar permanently"}
              aria-label={navPinned ? "Unpin navigation" : "Pin navigation"}
            >
              {navPinned ? (
                <Pin className="h-4 w-4 text-primary fill-primary" />
              ) : (
                <PinOff className="h-4 w-4" />
              )}
            </Button>

            <ThemeToggle />

            <Link
              href="/periodic-table"
              className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl border border-teal-500/30 bg-teal-500/10 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-all shadow-sm whitespace-nowrap"
              title="118-Element CEE Periodic Table & Chemistry Question Bank"
            >
              <Atom className="h-3.5 w-3.5 text-teal-500" />
              <span className="hidden sm:inline">Periodic Table</span>
              <span className="text-[9px] font-extrabold uppercase px-1 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">CEE</span>
            </Link>

            <div className="ml-1 h-4 w-px bg-border/60" />
            <Suspense fallback={<div className="h-8 w-8 animate-pulse rounded-full bg-muted/40" />}>
              <UserNav />
            </Suspense>
          </div>
        </div>
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
        <main className="flex-1 min-w-0 px-4 py-6 md:px-6 lg:px-8">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-4 text-sm text-muted-foreground">
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


