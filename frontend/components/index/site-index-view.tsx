"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Link2, ArrowUpRight, ListTree, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { SiteIndexEntry, SiteIndexGroup } from "@/lib/site-index-types";

/** How many entries a group shows before it asks to be expanded. */
const PREVIEW = 9;

/**
 * Everything Index — the head page that routes the whole platform.
 *
 * Every card is built the same way on purpose:
 *   short opening → the name → and below the name, its link (the real route,
 *   printed as text so the path is visible, not hidden behind the title).
 *
 * A group shows a preview of its entries and expands on demand; searching
 * scans every entry of every group at once and shows all matches expanded.
 */
export function SiteIndexView({ groups }: { groups: SiteIndexGroup[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        entries: g.entries.filter((e) =>
          [
            e.name,
            e.opening,
            e.href,
            e.meta ?? "",
            ...(e.links ?? []).map((l) => `${l.label} ${l.href}`),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q),
        ),
      }))
      .filter((g) => g.entries.length > 0);
  }, [groups, q]);

  const totalEntries = groups.reduce((sum, g) => sum + g.entries.length, 0);
  const totalRoutes = groups.reduce(
    (sum, g) => sum + g.entries.reduce((s, e) => s + 1 + (e.links?.length ?? 0), 0),
    0,
  );
  const matchCount = filtered.reduce((sum, g) => sum + g.entries.length, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:py-12">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <ListTree className="h-3.5 w-3.5" />
            <span>Complete head page — everything, one list</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Everything Index
          </h1>
          <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Every page on the platform, routed from here: each entry opens with a short line saying what it
            gives you, then the name, and directly below it the link itself — so nothing is ever unreachable
            or unnamed.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Groups</p>
              <p className="text-xl font-black text-foreground">{groups.length}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pages listed</p>
              <p className="text-xl font-black text-foreground">{totalEntries}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Routes routed</p>
              <p className="text-xl font-black text-foreground">{totalRoutes}</p>
            </div>
          </div>

          <div className="relative max-w-xl pt-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search every page — name, route, subject, chapter…"
              className="pl-9 pr-9"
              aria-label="Search the site index"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {q && (
            <p className="text-xs text-muted-foreground">
              {matchCount} {matchCount === 1 ? "match" : "matches"} across{" "}
              {filtered.length} {filtered.length === 1 ? "group" : "groups"}
            </p>
          )}
        </div>
      </header>

      {/* ── Jump nav ─────────────────────────────────────────────────── */}
      {!q && (
        <nav className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {g.name}
              <span className="ml-1.5 text-[10px] text-muted-foreground/80">{g.entries.length}</span>
            </a>
          ))}
        </nav>
      )}

      {/* ── Groups ───────────────────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/70 bg-card p-10 text-center">
          <p className="text-sm font-semibold text-foreground">No page matches “{query}”</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try a subject, a unit name, a lab title or part of a route.
          </p>
        </div>
      )}

      {filtered.map((group) => {
        const expanded = Boolean(open[group.id]) || Boolean(q);
        const visible = expanded ? group.entries : group.entries.slice(0, PREVIEW);

        return (
          <section key={group.id} id={group.id} className="scroll-mt-24 space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-3">
              <div className="min-w-0 space-y-1">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {group.name}
                </h2>
                <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {group.opening}
                </p>
                {group.href && (
                  <Link
                    href={group.href}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
                  >
                    <Link2 className="h-3 w-3" />
                    {group.href}
                  </Link>
                )}
              </div>
              <p className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.entries.length} {group.entries.length === 1 ? "page" : "pages"}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((entry) => (
                <IndexCard key={`${group.id}-${entry.href}-${entry.name}`} entry={entry} />
              ))}
            </div>

            {!expanded && group.entries.length > PREVIEW && (
              <button
                type="button"
                onClick={() => setOpen((prev) => ({ ...prev, [group.id]: true }))}
                className="w-full rounded-2xl border border-dashed border-border/70 bg-card px-4 py-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Show all {group.entries.length} pages in “{group.name}”
              </button>
            )}
          </section>
        );
      })}
    </div>
  );
}

/**
 * One indexed page: short opening, then the name, then the link itself.
 * The card is deliberately not a single anchor — the name and the printed
 * route are two separate links so the route text stays selectable.
 */
function IndexCard({ entry }: { entry: SiteIndexEntry }) {
  return (
    <div className="group flex h-full flex-col gap-2 rounded-2xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
      {entry.opening && (
        <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-3">{entry.opening}</p>
      )}

      <div className="flex items-start justify-between gap-2">
        <Link
          href={entry.href}
          className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary"
        >
          {entry.name}
        </Link>
        {entry.meta && (
          <span className="shrink-0 rounded-full border border-border/70 bg-muted/40 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {entry.meta}
          </span>
        )}
      </div>

      <Link
        href={entry.href}
        className="inline-flex items-center gap-1.5 break-all rounded-lg bg-muted/40 px-2 py-1 font-mono text-[11px] text-primary transition-colors hover:bg-primary/10"
      >
        <ArrowUpRight className="h-3 w-3 shrink-0" />
        <span className="truncate">{entry.href}</span>
      </Link>

      {entry.links && entry.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {entry.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
