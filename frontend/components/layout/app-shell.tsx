"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { SidebarNavigation } from "./sidebar-navigation";
import { BackButton } from "@/components/navigation/back-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { CreditBadge } from "./credit-badge";
import { UserNav } from "./user-nav";
import { Footer } from "./footer";

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setSidebarCollapsed(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background">
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
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                <span className="text-sm font-extrabold text-white">R</span>
              </div>
              <span className="hidden sm:block text-sm font-bold tracking-tight text-foreground whitespace-nowrap">
                Ravikisan&apos;s Platform
              </span>
            </Link>
          </div>

        {/* Center spacer */}
        <div className="flex-1" />

          {/* Right: theme toggle + credit badge + auth links */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ThemeToggle />
            <Suspense fallback={<div className="h-6 w-16 animate-pulse rounded-full bg-muted/40" />}>
              <CreditBadge />
            </Suspense>

            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl bg-gradient-to-r from-primary to-primary/70 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              title="Ask the AI study assistant"
            >
              <span className="hidden xs:inline">AI Tutor</span>
              <span className="xs:hidden">AI</span>
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


