"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerAccount, isOwnerUser } from "@/lib/owner";
import { useR1Access } from "@/features/r1/hooks";
import { isNavItemActive } from "@/lib/nav-active";
import {
  isSidebarNavItem,
  NAV_SECTIONS,
  NAV_SECTION_FEATURES,
  navAccent,
  navMinLevel,
} from "@/lib/navigation";
import { ACCESS_LABELS, hasLevel, type AccessLevel } from "@/lib/access-level";

/**
 * NavDirectory — the sidebar navigation rendered as a static, grouped list of
 * icon-chip rows (the Settings / Profile look). Used to surface every platform
 * destination inside Settings ("all") and a subset on the Info page ("some").
 *
 * Same gating as the sidebar: owner/R1/account sections stay hidden from
 * non-qualifying viewers, and tier-locked destinations render as muted, inert
 * rows carrying a tier tag so the full feature set stays visible.
 */
export function NavDirectory({ only, title }: { only?: string[]; title?: string }) {
  const pathname = usePathname();
  const { user } = useSession();
  const { data: r1Access } = useR1Access(!!user);
  const hasR1 = isOwnerUser(user) || r1Access === true;
  const viewer = user ?? null;

  const sections = NAV_SECTIONS.filter(
    (sec) =>
      (!only || only.includes(sec.id)) &&
      (sec.id !== "account" || !!user) &&
      (!sec.ownerOnly || isOwnerAccount(user)) &&
      (!sec.r1Only || hasR1),
  )
    .map((sec) => ({
      ...sec,
      rows: sec.items
        .filter(
          (item) =>
            isSidebarNavItem(item) &&
            (item.ownerOnly ? isOwnerAccount(user) : true) &&
            (item.r1Only ? hasR1 : true),
        )
        .map((item) => {
          const tier = navMinLevel(item, sec);
          return { item, tier, locked: !hasLevel(viewer, tier) };
        }),
    }))
    // Signed-in viewers see every section (locked rows greyed); guests only
    // see sections they can actually open.
    .filter((sec) => sec.rows.length > 0 && (!!user || sec.rows.some((row) => !row.locked)));

  return (
    <section aria-label={title ?? "All features"} className="space-y-3">
      {title && (
        <h2 className="px-1 text-[13px] font-extrabold tracking-tight text-foreground">{title}</h2>
      )}
      {sections.map((sec, i) => {
        const SecIcon = sec.icon;
        return (
          <div key={sec.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/60">
            <div className="flex items-center gap-2.5 px-2.5 py-2">
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", navAccent(i + 2))}>
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
              {sec.rows.map(({ item, locked, tier }, j) => {
                const ItemIcon = item.icon;
                const active = isNavItemActive(pathname, item.href);
                if (locked) {
                  return (
                    <div key={item.href} aria-disabled="true" className="flex items-center gap-2.5 rounded-xl px-2 py-2 opacity-50">
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
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", active ? "bg-primary/20 text-primary" : navAccent(j))}>
                      <ItemIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11px] font-medium">{item.label}</span>
                    {item.badge ? (
                      <span className={cn("shrink-0 rounded-md px-1.5 py-0.5 text-[8.5px] font-extrabold", item.badgeClass ?? "bg-primary/15 text-primary")}>
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
    </section>
  );
}
