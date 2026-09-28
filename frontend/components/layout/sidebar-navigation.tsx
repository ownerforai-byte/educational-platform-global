"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogIn, LogOut, ChevronsUp } from "lucide-react";
import { logoutAction } from "@/features/auth/actions";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";
import { isNavItemActive } from "@/lib/nav-active";
import { NAV_SECTIONS, type NavItem } from "@/lib/navigation";

/**
 * The menu DATA lives in lib/navigation.ts — one list shared with the mobile
 * drawer, so both surfaces can never drift apart.
 */
function NavSection({
  label,
  icon: LabelIcon,
  items,
  pathname,
  collapsed,
  onToggle,
  railCollapsed,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  pathname: string;
  collapsed: boolean;
  onToggle: () => void;
  railCollapsed: boolean;
}) {
  const Icon = LabelIcon;
  const activeCount = items.filter((item) => isNavItemActive(pathname, item.href)).length;

  // ── Collapsed rail: icon-only, centered, with hover tooltips ──────────────
  if (railCollapsed) {
    return (
      <div className="mb-2">
        <div className="flex items-center justify-center py-2" title={label}>
          <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
        </div>
        <div className="space-y-0.5">
          {items.map((item) => {
            const ItemIcon = item.icon;
            const isActive = isNavItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
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

  // ── Expanded: full labels + per-section collapse ──────────────────────────
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all",
          collapsed && "justify-center"
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{label}</span>
            {activeCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/15 px-1 text-[9px] font-bold text-primary">
                {activeCount}
              </span>
            )}
            <ChevronsUp className={cn("h-3 w-3 opacity-50 transition-transform", collapsed && "rotate-180")} />
          </>
        )}
      </button>
      {!collapsed && (
        <div className="mt-0.5 space-y-0.5 pl-1">
          {items.map((item) => {
            const ItemIcon = item.icon;
            const isActive = isNavItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all relative overflow-hidden",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full" />
                )}
                <ItemIcon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive && "text-primary"
                  )}
                />
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "shrink-0 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md",
                      item.badgeClass ?? "bg-primary/15 text-primary"
                    )}
                  >
                    {item.badge}
                  </span>
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
  const { user, refresh } = useSession();
  const isLoggedIn = !!user;

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    curriculum: false,
    stem: false,
    tools: false,
    extended: false,
    account: false,
    owner: false,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Menu DATA lives in lib/navigation.ts (shared with the mobile drawer).
  const primaryItems =
    NAV_SECTIONS.find((section) => section.id === "primary")?.items ?? [];

  /** account → signed-in only; ownerOnly → allowlisted owner emails only. */
  const canSee = (section: (typeof NAV_SECTIONS)[number]) => {
    if (section.id === "account") return isLoggedIn;
    if (section.ownerOnly) return isOwnerUser(user);
    return true;
  };

  const handleLogout = async () => {
    await logoutAction();
    refresh();
  };

  return (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-border/40 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
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
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {/* Quick Home & Search shortcuts */}
        <div className="mb-2 space-y-0.5">
          {primaryItems.map((item) => {
            const ItemIcon = item.icon;
            const isActive = isNavItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all relative overflow-hidden",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/25 shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  collapsed && "justify-center px-2"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-full" />
                )}
                <ItemIcon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "shrink-0 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md",
                          item.badgeClass ?? "bg-primary/15 text-primary"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {NAV_SECTIONS.filter(
          (section) => section.id !== "primary" && canSee(section),
        ).map((section) => (
          <NavSection
            key={section.id}
            label={section.label}
            icon={section.icon}
            items={section.items}
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

