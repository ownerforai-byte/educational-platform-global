"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogIn, LogOut, ChevronsUp, Palette, ChevronRight } from "lucide-react";

import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerAccount } from "@/lib/owner";
import { isNavItemActive } from "@/lib/nav-active";
import {
  isSidebarNavItem,
  NAV_SECTIONS,
  NAV_SECTION_FEATURES,
  navAccent,
  navMinLevel,
  type NavItem,
} from "@/lib/core/navigation";
import { ACCESS_LABELS, hasLevel, type AccessLevel } from "@/lib/core/access-level";

/**
 * The menu DATA lives in lib/navigation.ts — one list shared with the mobile
 * drawer, so both surfaces can never drift apart.
 *
 * Presentation follows the reference Settings / Profile lists: each section is
 * a rounded card with a coloured icon-chip header (plus its own one-line
 * "features" descriptor) and each destination is a row — coloured icon chip +
 * label + chevron. Tier-locked destinations still appear (all platform
 * features are listed) but as muted, non-interactive rows carrying a tier tag.
 */
type NavRow = { item: NavItem; locked: boolean; tier: AccessLevel };

function NavSection({
  label,
  icon: LabelIcon,
  feature,
  accentIndex,
  rows,
  pathname,
  collapsed,
  onToggle,
  railCollapsed,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  feature?: string;
  accentIndex: number;
  rows: NavRow[];
  pathname: string;
  collapsed: boolean;
  onToggle: () => void;
  railCollapsed: boolean;
}) {
  const Icon = LabelIcon;
  const activeCount = rows.filter((r) => isNavItemActive(pathname, r.item.href)).length;

  // ── Collapsed rail: icon-only, centered, with hover tooltips ──────────────
  if (railCollapsed) {
    return (
      <div className="mb-2">
        <div className="flex items-center justify-center py-2" title={label}>
          <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
        </div>
        <div className="space-y-0.5">
          {rows.map(({ item, locked, tier }) => {
            const ItemIcon = item.icon;
            const isActive = isNavItemActive(pathname, item.href);
            if (locked) {
              return (
                <div
                  key={item.href}
                  title={`${item.label} · ${ACCESS_LABELS[tier]}+`}
                  aria-label={item.label}
                  aria-disabled="true"
                  className="flex items-center justify-center rounded-lg p-2.5 opacity-40"
                >
                  <ItemIcon className="h-4 w-4" />
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "group relative flex items-center justify-center rounded-lg p-2.5 transition-all",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <ItemIcon className={cn("h-4 w-4", isActive && "text-primary")} />
                {item.badge && (
                  <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Expanded: grouped card + icon-chip rows (Settings-style) ──────────────
  return (
    <div className="mb-2 overflow-hidden rounded-2xl border border-border/60 bg-card/60">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${label}`}
        className="flex w-full items-center gap-2.5 px-2.5 py-2 text-left transition-colors hover:bg-muted/40"
      >
        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", navAccent(accentIndex))}>
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-bold leading-tight text-foreground">{label}</span>
          {feature && (
            <span className="block truncate text-[10px] leading-tight text-muted-foreground">{feature}</span>
          )}
        </span>
        {activeCount > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/15 px-1 text-[9px] font-bold text-primary">
            {activeCount}
          </span>
        )}
        <ChevronsUp className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-transform", collapsed && "rotate-180")} />
      </button>
      {!collapsed && (
        <div className="space-y-0.5 px-1.5 pb-1.5">
          {rows.map(({ item, locked, tier }, i) => {
            const ItemIcon = item.icon;
            const isActive = isNavItemActive(pathname, item.href);
            if (locked) {
              return (
                <div
                  key={item.href}
                  aria-disabled="true"
                  className="flex items-center gap-2.5 rounded-xl px-2 py-2 opacity-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <ItemIcon className="h-4 w-4" />
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
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    isActive ? "bg-primary/20 text-primary" : navAccent(i)
                  )}
                >
                  <ItemIcon className="h-4 w-4" />
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
      )}
    </div>
  );
}

interface SidebarNavigationProps {
  collapsed?: boolean;
}

export function SidebarNavigation({ collapsed = false }: SidebarNavigationProps) {
  const pathname = usePathname();
  const { user: cachedUser, logoutUser } = useSession();
  // The session can hydrate from the client cache on the first render, which
  // the server never sees. Treat the viewer as signed out until mounted so the
  // first client pass matches the server HTML (no sidebar hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const user = mounted ? cachedUser : null;
  const isLoggedIn = !!user;

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    curriculum: false,
    stem: false,
    tools: false,
    extended: false,
    account: false,
    owner: false,
    theme: false,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Menu DATA lives in lib/navigation.ts (shared with the mobile drawer).
  const primaryItems =
    NAV_SECTIONS.find((section) => section.id === "primary")?.items ?? [];

  // ACCESS LADDER (lib/access-level.ts): member → Student Desk, plus → +Home
  // +Class 11, pro → every index, owner → everything. A signed-out visitor
  // (rank 0) reaches none of the content indexes — they get the public
  // overview + simple footer instead. `viewer` is null until the session
  // mounts, matching the server HTML (no hydration mismatch).
  const viewer = user ?? null;

  /**
   * Every sidebar destination for a section, annotated with its access tier and
   * whether it is currently locked. Locked rows still render (all platform
   * features stay visible) but as muted, non-interactive entries.
   */
  const rowsFor = (section: (typeof NAV_SECTIONS)[number]): NavRow[] =>
    section.items
      .filter(isSidebarNavItem)
      .filter((item) => (item.ownerOnly ? isOwnerAccount(user) : true))
      .map((item) => {
        const tier = navMinLevel(item, section);
        return { item, tier, locked: !hasLevel(viewer, tier) };
      });

  /** account → signed-in only; ownerOnly → owner accounts. */
  const canSee = (section: (typeof NAV_SECTIONS)[number]) => {
    if (section.id === "account") return isLoggedIn;
    if (section.ownerOnly) return isOwnerAccount(user);
    const rows = rowsFor(section);
    if (rows.length === 0) return false;
    // Signed-in viewers see every section (locked rows greyed) so all platform
    // features are listed; guests only see sections they can actually open.
    return isLoggedIn || rows.some((row) => !row.locked);
  };

  const handleLogout = async () => {
    // INSTANT: logoutUser clears the session synchronously (owner console and
    // paid surfaces re-lock in this click) and revokes the backend session in
    // the background — no round-trip before the UI becomes a customer again.
    await logoutUser();
  };

  const primaryRows: NavRow[] = primaryItems
    .filter((item) => isSidebarNavItem(item) && (item.ownerOnly ? isOwnerAccount(user) : true))
    .map((item) => {
      const tier = navMinLevel(item);
      return { item, tier, locked: !hasLevel(viewer, tier) };
    });

  return (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-border/40 shrink-0">
        <Link href="/home" className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20">
            <span className="text-xs font-extrabold text-white">R</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-xs tracking-tight text-foreground whitespace-nowrap">
              Ravikisan&apos;s Platform
            </span>
          )}
        </Link>
      </div>

      {/* Nav sections */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-2 py-3 space-y-1">
        {/* Primary destinations — "Quick Access" card */}
        <div className="mb-2 overflow-hidden rounded-2xl border border-border/60 bg-card/60">
          {!collapsed && (
            <div className="flex items-center gap-2.5 px-2.5 py-2">
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", navAccent(1))}>
                <Palette className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-bold leading-tight text-foreground">Quick Access</span>
                <span className="block truncate text-[10px] leading-tight text-muted-foreground">
                  {NAV_SECTION_FEATURES.primary}
                </span>
              </span>
            </div>
          )}
          <div className={cn("space-y-0.5 px-1.5 pb-1.5", collapsed && "pt-1.5")}>
            {primaryRows.map(({ item, locked, tier }, i) => {
              const ItemIcon = item.icon;
              const isActive = isNavItemActive(pathname, item.href);
              if (locked) {
                return (
                  <div
                    key={item.href}
                    title={`${item.label} · ${ACCESS_LABELS[tier]}+`}
                    aria-label={item.label}
                    aria-disabled="true"
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-2 py-2 opacity-50",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <ItemIcon className="h-4 w-4" />
                    </span>
                    {!collapsed && (
                      <>
                        <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-muted-foreground">{item.label}</span>
                        <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[8.5px] font-bold text-muted-foreground">
                          {ACCESS_LABELS[tier]}+
                        </span>
                      </>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      isActive ? "bg-primary/20 text-primary" : navAccent(i)
                    )}
                  >
                    <ItemIcon className="h-4 w-4" />
                  </span>
                  {!collapsed && (
                    <>
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
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {NAV_SECTIONS.filter(
          (section) => ["tools", "stem"].includes(section.id) && canSee(section),
        ).map((section, sectionIndex) => (
          <NavSection
            key={section.id}
            label={section.label}
            icon={section.icon}
            feature={NAV_SECTION_FEATURES[section.id]}
            accentIndex={sectionIndex + 2}
            rows={rowsFor(section)}
            pathname={pathname}
            collapsed={collapsedSections[section.id] ?? false}
            onToggle={() => toggleSection(section.id)}
            railCollapsed={collapsed}
          />
        ))}
      </div>

      {/* Bottom action */}
      <div className="border-t border-border/40 p-2.5 shrink-0">

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            title={collapsed ? "Log out" : undefined}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">Log out</span>}
          </button>
        ) : (
          <Link
            href="/login"
            title={collapsed ? "Login" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all",
              collapsed && "justify-center"
            )}
          >
            <LogIn className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">Login</span>}
          </Link>
        )}
      </div>
    </nav>
  );
}
