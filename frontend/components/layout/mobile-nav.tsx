"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, Search, User, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useSession } from "@/features/auth/hooks/use-session";
import { isNavItemActive } from "@/lib/nav-active";
import { isOwnerAccount } from "@/lib/owner";
import { isSidebarNavItem, NAV_SECTIONS, NAV_SECTION_FEATURES, navAccent, navMinLevel } from "@/lib/navigation";
import { ACCESS_LABELS, hasLevel } from "@/lib/access-level";

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
  const { user, logoutUser } = useSession();
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
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === 'Tab') {
        const controls = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input, [tabindex="0"]') ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !last) { e.preventDefault(); return; }
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || document.activeElement === panelRef.current)) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const scrollY = window.scrollY;
    const openedPath = window.location.pathname;
    const body = document.body;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    document.documentElement.classList.add("drawer-open");
    body.classList.add("drawer-open");
    body.style.overflow = "hidden";
    if (isIOS) {
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    }

    // Focus lands inside the drawer so keyboard/screen-reader users start there.
    panelRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("drawer-open");
      body.classList.remove("drawer-open");
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      if (isIOS && window.location.pathname === openedPath) {
        window.scrollTo(0, scrollY);
      }
      trigger?.focus();
    };
  }, [open]);

  const query = searchQuery.trim().toLowerCase();

  const filteredSections = NAV_SECTIONS.filter(
    (sec) =>
      ["primary", "tools", "stem"].includes(sec.id) &&
      (sec.id !== 'account' || !!user) &&
      (!sec.ownerOnly || isOwnerAccount(user)),
  )
    .map((sec) => ({
      ...sec,
      // Every sidebar destination is listed (all platform features); a
      // tier-locked one is marked locked and rendered as a muted, inert row.
      rows: sec.items
        .filter((item) =>
          isSidebarNavItem(item) &&
          // Owner-only entries (AI chat) never reach non-owners, even by search.
          (item.ownerOnly ? isOwnerAccount(user) : true) &&
          (query === "" ||
            item.label.toLowerCase().includes(query) ||
            sec.label.toLowerCase().includes(query))
        )
        .map((item) => {
          const tier = navMinLevel(item, sec);
          return { item, tier, locked: !hasLevel(user ?? null, tier) };
        }),
    }))
    // Guests only see sections they can actually open; signed-in viewers see
    // every section (locked rows greyed) so all platform features are listed.
    .filter((sec) => sec.rows.length > 0 && (!!user || sec.rows.some((row) => !row.locked)));

  return (
    <>
      {/* Hamburger button — phones only. From md up the persistent rail
          sidebar carries the full navigation, so a second menu button would
          just be a duplicate affordance. */}
      <div className="md:hidden">
        <Button
          ref={triggerRef}
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl"
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
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 touch-none overscroll-none bg-black/80 backdrop-blur-sm animate-backdrop-in"
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
              {/* Brand opens the welcome entry (owner 2026-11-03), matching the
                  top header. */}
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
                className="h-11 w-11 rounded-xl"
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
                type="search"
                aria-label="Filter navigation"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick jump to any subject or tool..."
                className="w-full rounded-xl border border-border/80 bg-background/80 py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear navigation filter"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted"
                >
                  ✕
                </button>
              )}
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 touch-pan-y overflow-y-auto overscroll-contain pr-1 space-y-4">
              {/* Empty SEARCH results only. With no active filter this is just
                  the signed-out/limited view (a visitor reaches none of the
                  content indexes by design — see lib/navigation.ts), not a
                  "no matches" state, so the message must clear the moment the
                  filter does. */}
              {filteredSections.length === 0 && searchQuery.trim() !== "" && (
                <p role="status" className="px-3 py-4 text-sm text-muted-foreground">
                  No destinations match “{searchQuery}”. Try a subject or tool name.
                </p>
              )}
              {filteredSections.map((sec, secIndex) => {
                const SecIcon = sec.icon;
                return (
                  <div key={sec.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/60">
                    <div className="flex items-center gap-2.5 px-2.5 py-2">
                      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", navAccent(secIndex + 2))}>
                        <SecIcon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-bold leading-tight text-foreground">{sec.label}</span>
                        {NAV_SECTION_FEATURES[sec.id] && (
                          <span className="block truncate text-[10px] leading-tight text-muted-foreground">
                            {NAV_SECTION_FEATURES[sec.id]}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="space-y-0.5 px-1.5 pb-1.5">
                      {sec.rows.map(({ item, locked, tier }, i) => {
                        const Icon = item.icon;
                        const active = isNavItemActive(pathname, item.href);
                        if (locked) {
                          return (
                            <div
                              key={item.href}
                              aria-disabled="true"
                              className="flex items-center gap-2.5 rounded-xl px-2 py-2 opacity-50"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-muted-foreground">{item.label}</span>
                              <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[8.5px] font-bold text-muted-foreground">
                                {ACCESS_LABELS[tier]}+
                              </span>
                            </div>
                          );
                        }
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors",
                              active
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                active ? "bg-primary/20 text-primary" : navAccent(i)
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[11px] font-medium">{item.label}</span>
                            {item.badge ? (
                              <span
                                className={cn(
                                  "shrink-0 rounded-md px-1.5 py-0.5 text-[8.5px] font-extrabold",
                                  item.badgeClass ?? "bg-primary/15 text-primary"
                                )}
                              >
                                {item.badge}
                              </span>
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
