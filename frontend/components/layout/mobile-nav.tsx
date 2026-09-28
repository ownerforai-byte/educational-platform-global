"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, Search, User, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useSession } from "@/features/auth/hooks/use-session";
import { isNavItemActive } from "@/lib/nav-active";
import { isOwnerUser } from "@/lib/owner";
import { NAV_SECTIONS } from "@/lib/navigation";

/**
 * Section + item data lives in lib/navigation.ts — one shared list, also used
 * by the desktop sidebar, so the drawer can never lag behind the sidebar.
 * Sections flagged ownerOnly are added below for allowlisted owner accounts.
 */

/* Menu data: lib/navigation.ts (NAV_SECTIONS). */


export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { user, refresh, logoutUser } = useSession();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Pro behavior: the drawer always mirrors navigation — any route change
  // (link tap, back/forward, programmatic push) closes it.
  useEffect(() => {
    setOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Escape closes and returns focus to the hamburger; the page behind the
  // drawer must not scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus lands inside the drawer so keyboard/screen-reader users start there.
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const filteredSections = NAV_SECTIONS.filter(
    (sec) => !sec.ownerOnly || isOwnerUser(user),
  )
    .map((sec) => ({
      ...sec,
      items: sec.items.filter((item) =>
        searchQuery.trim() === ""
          ? true
          : item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sec.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((sec) => sec.items.length > 0);

  return (
    <>
      {/* Hamburger button — visible only on mobile (< lg) */}
      <div className="lg:hidden">
        <Button
          ref={triggerRef}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-xl"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide-in sidebar overlay */}
      {/* Portaled to document.body: the header applies a transform, which
          would trap position:fixed inside a 48px-tall box and let page
          content bleed through the backdrop. */}
      {open && typeof document !== "undefined"
        ? createPortal(
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-backdrop-in"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div
            ref={panelRef}
            tabIndex={-1}
            id="mobile-nav-drawer"
            className="absolute left-0 top-0 h-full w-80 max-w-[85vw] border-r border-border bg-card p-4 flex flex-col shadow-2xl animate-slide-in-left focus:outline-none"
          >
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-border/50">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20">
                  <span className="text-sm font-extrabold text-white">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-tight leading-tight">Ravikisan&apos;s Platform</span>
                  <span className="text-[10px] text-muted-foreground">Class 11 &amp; 12 Global</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Filter Search Input */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick jump to any subject or tool..."
                className="w-full rounded-xl border border-border/80 bg-background/80 py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Scrollable links */}
            <nav className="flex-1 overflow-y-auto pr-1 space-y-4">
              {filteredSections.map((sec) => (
                <div key={sec.id} className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 px-2.5 py-1">
                    {sec.label}
                  </p>
                  <div className="space-y-0.5">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const active = isNavItemActive(pathname, item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${
                            active
                              ? "bg-primary/10 text-primary font-semibold shadow-sm"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`shrink-0 text-[8px] font-extrabold px-1.5 py-0.5 rounded-md ${
                                item.badgeClass ?? "bg-primary/15 text-primary"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-3 border-t border-border/40 space-y-2 shrink-0">
              {user ? (
                // Logged-in state: profile entry + logout only — never auth links.
                <div className="flex gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border/70 py-2 text-xs font-medium text-foreground hover:bg-muted/60 transition-all"
                  >
                    <User className="h-3.5 w-3.5" />
                    My Profile
                  </Link>
                  <button
                    onClick={async () => {
                      setOpen(false);
                      await logoutUser();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/40 py-2 text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Log out
                  </button>
                </div>
              ) : (
                // Logged-out state: login + sign up only.
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border/70 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90"
                  >
                    <User className="h-3.5 w-3.5" />
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>,
          document.body
        )
        : null}
    </>
  );
}

