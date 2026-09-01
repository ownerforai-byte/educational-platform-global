"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { SidebarNavigation } from "./sidebar-navigation";
import { BackButton } from "@/components/navigation/back-button";
import { AIWidget } from "./ai-widget";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { GlobalSearch } from "./global-search";

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

        {/* Center: Global Search */}
        <div className="flex-1 min-w-0 flex items-center justify-center px-4">
          <GlobalSearch />
        </div>

          {/* Right: theme toggle only */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ThemeToggle />
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
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>

      {/* ── Footer removed — only shows on home page via marketing layout ── */}

      {/* ── Floating buttons (different positions) ─────────────────── */}
      {/* AI Widget — bottom-left */}
      <AIWidget />
      {/* Back Button — bottom-right (hidden on home) */}
      <BackButton />
    </div>
  );
}


