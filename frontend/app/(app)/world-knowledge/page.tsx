import Link from "next/link";
import { Brain, Newspaper, Globe2, type LucideIcon } from "lucide-react";
import { WORLD_KNOWLEDGE_SECTIONS } from "@/features/knowledge/data";

const SECTION_ICONS: Record<string, LucideIcon> = {
  "general-knowledge": Brain,
  "current-affairs": Newspaper,
  "global-topics": Globe2,
};

/**
 * World Knowledge opening hub — cards come from WORLD_KNOWLEDGE_SECTIONS so
 * nav, site-index, and section pages stay wired to one data source.
 */
export default function WorldKnowledgePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-14">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 shadow-lg md:p-10">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight md:text-4xl">
          <Globe2 className="h-8 w-8 text-primary" aria-hidden="true" />
          World Knowledge
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore general knowledge, current affairs, and global topics. Vision: a student who reads
          the world widely reads the exam room more clearly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORLD_KNOWLEDGE_SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section.slug] ?? Brain;
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
