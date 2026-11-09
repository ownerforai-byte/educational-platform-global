import type { Metadata } from "next";
import Link from "next/link";
import { buildSiteIndex, siteIndexTotals } from "@/lib/site-index";
import { PublicPage, Panel, Action } from "@/components/platform/public-page";

export const metadata: Metadata = {
  title: "Site Map | Ravikisan's Platform",
  description:
    "A grouped public directory of the platform's indexed pages, with a link to the searchable Everything Index.",
};

const SITEMAP_PREVIEW = 10;

export default function SitemapPage() {
  const groups = buildSiteIndex();
  const totals = siteIndexTotals(groups);

  return (
    <PublicPage
      current="/sitemap-page"
      eyebrow="Site map"
      title="Every indexed route, grouped in one plain directory."
      intro="A crawler-friendly, human-readable overview built from the same index that powers the in-app Everything Index. No placeholder page and no hand-copied link list."
    >
      <div className="sequential-block-reveal">
        <Panel title="Directory summary" eyebrow="At a glance">
          <p>
            {totals.groups} groups, {totals.entries} named entries and {totals.routes} routed links are
            indexed. Each card below previews the first {SITEMAP_PREVIEW} entries in its group.
          </p>
          <p>
            The in-app index adds search and expands every group. Some destinations require an approved
            account and the matching access tier.
          </p>
          <Action href="/site-index" secondary>
            Open the searchable Everything Index
          </Action>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group, index) => (
          <div
            key={group.id}
            className="sequential-block-reveal min-w-0"
            style={{ animationDelay: `${Math.min(index, 6) * 80}ms` }}
          >
            <section className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold tracking-tight text-foreground">{group.name}</h2>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {group.entries.length}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.opening}</p>

              {group.href && (
                <Link
                  href={group.href}
                  className="mt-3 inline-flex w-fit text-xs font-semibold text-primary hover:underline"
                >
                  Open group hub
                </Link>
              )}

              <ul className="mt-4 space-y-2 border-t border-border/60 pt-4">
                {group.entries.slice(0, SITEMAP_PREVIEW).map((entry) => (
                  <li key={`${group.id}-${entry.href}`} className="min-w-0">
                    <Link
                      href={entry.href}
                      className="block truncate text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {entry.name}
                    </Link>
                    <span className="block truncate font-mono text-[10px] text-muted-foreground">
                      {entry.href}
                    </span>
                  </li>
                ))}
              </ul>

              {group.entries.length > SITEMAP_PREVIEW && (
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  +{group.entries.length - SITEMAP_PREVIEW} more in the Everything Index
                </p>
              )}
            </section>
          </div>
        ))}
      </div>
    </PublicPage>
  );
}
