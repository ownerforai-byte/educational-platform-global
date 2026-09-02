import Link from "next/link";
import { getLegendIndex, filterLegends, groupLegendsByUnit } from "@/lib/legend";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { ChevronRight, Lightbulb, HelpCircle, Brain } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { MathMarkdown } from "@/components/content/math-markdown";

export async function generateStaticParams() {
  return [
    { classSlug: "class-11-notes", subjectSlug: "mathematics" },
    { classSlug: "class-11-notes", subjectSlug: "physics" },
    { classSlug: "class-11-notes", subjectSlug: "chemistry" },
    { classSlug: "class-11-notes", subjectSlug: "biology" },
    { classSlug: "class-11-notes", subjectSlug: "english" },
    { classSlug: "class-11-notes", subjectSlug: "nepali" },
    { classSlug: "class-12-notes", subjectSlug: "mathematics" },
    { classSlug: "class-12-notes", subjectSlug: "physics" },
    { classSlug: "class-12-notes", subjectSlug: "chemistry" },
    { classSlug: "class-12-notes", subjectSlug: "biology" },
    { classSlug: "class-12-notes", subjectSlug: "english" },
    { classSlug: "class-12-notes", subjectSlug: "nepali" },
  ];
}

export default async function LegendSubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;
  const allEntries = await getLegendIndex();
  const entries = filterLegends(allEntries, { classSlug, subjectSlug });
  const grouped = groupLegendsByUnit(entries);
  const subjectData = getSubjectSyllabus(classSlug, subjectSlug);

  const colorMap: Record<string, string> = {
    mathematics: "text-violet-500",
    physics: "text-sky-500",
    chemistry: "text-amber-500",
    biology: "text-emerald-500",
    english: "text-blue-500",
    nepali: "text-red-500",
  };
  const bgMap: Record<string, string> = {
    mathematics: "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800",
    physics: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800",
    chemistry: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
    biology: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800",
    english: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    nepali: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/legend" className="hover:text-foreground">Legend &amp; Key Facts</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/legend/${classSlug}`} className="hover:text-foreground capitalize">
          {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground capitalize">{subjectSlug}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight capitalize">
          {subjectSlug} — Legend &amp; Key Facts
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {entries.length} topic entries across {grouped.size} unit{grouped.size !== 1 ? "s" : ""}.
          Each entry contains key facts, common confusions, and practice reminders.
        </p>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="No legend content yet"
          description="Key facts and confusion notes for this subject will be added as concept content is built out."
        />
      ) : (
        <div className="space-y-8">
          {[...grouped.entries()]
            .sort(([a], [b]) => {
              const ua = subjectData?.units.findIndex((u) => u.id === a) ?? -1;
              const ub = subjectData?.units.findIndex((u) => u.id === b) ?? -1;
              return ua - ub;
            })
            .map(([unitId, unitEntries]) => {
              const unitInfo = subjectData?.units.find((u) => u.id === unitId);
              return (
                <section key={unitId} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <h2 className="text-base font-semibold tracking-tight">
                      {unitInfo?.title ?? unitId}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span className="text-xs text-muted-foreground">
                      {unitEntries.length} topic{unitEntries.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {unitEntries.map((entry) => (
                      <LegendCard
                        key={entry.topicSlug}
                        entry={entry}
                        colorMap={colorMap}
                        bgMap={bgMap}
                        classSlug={classSlug}
                        subjectSlug={subjectSlug}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}

function LegendCard({
  entry,
  colorMap,
  bgMap,
  classSlug,
  subjectSlug,
}: {
  entry: import("@/lib/legend").LegendEntry;
  colorMap: Record<string, string>;
  bgMap: Record<string, string>;
  classSlug: string;
  subjectSlug: string;
}) {
  const subjectColor = colorMap[entry.subjectSlug] ?? "text-muted-foreground";
  const subjectBg = bgMap[entry.subjectSlug] ?? "border-border bg-card";
  const preview = entry.preview?.replace(/<[^>]+>/g, "").slice(0, 120) ?? "";

  return (
    <div className={`rounded-xl border ${subjectBg} p-4 space-y-3`}>
      {/* Topic header */}
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-lg bg-primary/10 shrink-0`}>
          <Lightbulb className={`h-4 w-4 ${subjectColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{entry.topicTitle}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{entry.unitTitle}</p>
        </div>
      </div>

      {/* Key facts */}
      {entry.facts.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <Lightbulb className="h-3 w-3" />
            Key Facts
          </div>
          <ul className="space-y-1">
            {entry.facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                <span className="text-foreground"><MathMarkdown content={fact} /></span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Load more from JSON */}
      <LegendCardContent entry={entry} classSlug={classSlug} subjectSlug={subjectSlug} />
    </div>
  );
}

/* ---------- Load confusion/practice from JSON at build time ---------- */
async function LegendCardContent({
  entry,
  classSlug,
  subjectSlug,
}: {
  entry: import("@/lib/legend").LegendEntry;
  classSlug: string;
  subjectSlug: string;
}) {
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  let json: Record<string, unknown> | null = null;
  try {
    const raw = await readFile(join(process.cwd(), entry.filePath), "utf-8");
    json = JSON.parse(raw);
  } catch {
    /* metadata only */
  }

  const confusion = (json as any)?.confusion ?? [];
  const practice = (json as any)?.practice ?? [];

  return (
    <div className="space-y-2 pt-1">
      {confusion.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400">
          <HelpCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            {confusion.slice(0, 2).map((c: string, i: number) => (
              <p key={i}><MathMarkdown content={c} /></p>
            ))}
          </div>
        </div>
      )}
      {practice.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Brain className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            {practice.slice(0, 2).map((p: string, i: number) => (
              <p key={i}><MathMarkdown content={p} /></p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
