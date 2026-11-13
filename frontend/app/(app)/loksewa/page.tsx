import Link from "next/link";
import { Landmark, Map, Scroll, TreePine, type LucideIcon } from "lucide-react";
import { LOKSEWA_SECTIONS } from "@/features/knowledge/data";

const SECTION_ICONS: Record<string, LucideIcon> = {
  "geography-of-nepal": Map,
  history: Scroll,
  environment: TreePine,
};

/**
 * Loksewa opening hub — cards are derived from LOKSEWA_SECTIONS so nav,
 * site-index, and section pages stay syllabus-gated and never drift.
 */
export default function LoksewaPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-14">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 shadow-lg md:p-10">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight md:text-4xl">
          <Landmark className="h-8 w-8 text-primary" aria-hidden="true" />
          Loksewa Knowledge
        </h1>
        <p className="mt-2 text-muted-foreground">
          Prepare for Loksewa with curated materials and practice sets. Big picture: public service is
          the point where knowledge meets citizenship.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/40 pt-4">
          <a
            href="/loksewa.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <span>Open Dedicated Loksewa Portal (Standalone App)</span>
            <span aria-hidden="true">↗</span>
          </a>
          <span className="text-xs text-muted-foreground">
            Opens in a separate window with full sidebar, live search, AI tools, and timed GK drills.
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOKSEWA_SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section.slug] ?? Landmark;
          return (
            <Link key={section.slug} href={section.basePath}>
              <div className="card-shimmer group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                      {section.name}
                    </h2>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
