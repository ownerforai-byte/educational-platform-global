import Link from "next/link";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { getSyllabusTheoremItems } from "@/lib/theorem-topics";
import { ChevronRight, FileText, Construction } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const dynamic = "force-dynamic";

const SUBJECT_LABELS: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
};

export default async function TheoremsSubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;
  const subjectData = getSubjectSyllabus(classSlug, subjectSlug);

  // ── Non-PCB subjects: legacy filesystem index ──
  if (!["physics", "chemistry", "biology", "mathematics"].includes(subjectSlug)) {
    const { getTheoremIndex, groupTheoremsByUnit } = await import("@/lib/theorems");
    const allEntries = await getTheoremIndex();
    const entries = allEntries.filter(
      (e) => e.classSlug === classSlug && e.subjectSlug === subjectSlug,
    );
    const grouped = groupTheoremsByUnit(entries);

    return (
      <div className="mx-auto max-w-4xl space-y-8 py-10">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/theorems" className="hover:text-foreground">Theorems</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/theorems/${classSlug}`} className="hover:text-foreground capitalize">
            {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground capitalize">{subjectSlug}</span>
        </nav>

        <div>
          <h1 className="text-2xl font-bold tracking-tight capitalize">
            {subjectSlug} — Theorems &amp; Proofs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {entries.length} theorem{entries.length !== 1 ? "s" : ""} across {grouped.size} unit{grouped.size !== 1 ? "s" : ""}.
          </p>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            title="No theorem content yet"
            description={`Theorem and proof notes for ${subjectSlug} are currently being indexed.`}
            action={{ label: `View ${subjectSlug} Theory Notes`, href: `/${classSlug}/${subjectSlug}` }}
          />
        ) : (
          <div className="space-y-8">
            {[...grouped.entries()].map(([unitId, unitEntries]) => {
              const unitInfo = subjectData?.units.find((u) => u.id === unitId);
              return (
                <section key={unitId} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <h2 className="text-base font-semibold tracking-tight">{unitInfo?.title ?? unitId}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span className="text-xs text-muted-foreground">{unitEntries.length}</span>
                  </div>
                  <div className="space-y-2">
                    {unitEntries.map((entry) => (
                      <Link
                        key={entry.topicSlug}
                        href={`/theorems/${classSlug}/${subjectSlug}/${entry.topicSlug}`}
                        className="block rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/30 hover:bg-accent/30"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/40">
                            <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm">{entry.topicTitle}</h3>
                            {entry.preview && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.preview}</p>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        </div>
                      </Link>
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

  // ── PCB subjects: full syllabus-ordered listing ──
  const items = getSyllabusTheoremItems(classSlug, subjectSlug);
  const orderedUnits = subjectData?.units ?? [];
  const available = items.filter((i) => i.hasCuratedContent).length;

  // Group items by unit preserving syllabus order
  const unitGroups = orderedUnits
    .map((unit) => ({
      unit,
      entries: items.filter((i) => i.unitId === unit.id),
    }))
    .filter((g) => g.entries.length > 0);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/theorems" className="hover:text-foreground">Theorems</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/theorems/${classSlug}`} className="hover:text-foreground capitalize">
          {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">{SUBJECT_LABELS[subjectSlug] ?? subjectSlug}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {SUBJECT_LABELS[subjectSlug] ?? subjectSlug} — Theorems, Proofs &amp; Derivations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} syllabus topics in official curriculum order · {available} with full proofs &amp; visuals.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No theorem topics found"
          description={`No theorem/derivation topics found in the ${subjectSlug} syllabus.`}
          action={{ label: `View ${SUBJECT_LABELS[subjectSlug] ?? subjectSlug} Notes`, href: `/${classSlug}/${subjectSlug}` }}
        />
      ) : (
        <div className="space-y-8">
          {unitGroups.map(({ unit, entries }) => (
            <section key={unit.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h2 className="text-base font-semibold tracking-tight text-center">{unit.title}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-xs text-muted-foreground shrink-0">{entries.length} topic{entries.length !== 1 ? "s" : ""}</span>
              </div>

              <div className="space-y-2">
                {entries.map((item) => (
                  <Link
                    key={item.key}
                    href={`/theorems/${classSlug}/${subjectSlug}/${item.topicSlug}`}
                    className={`block rounded-lg border p-4 transition-colors ${
                      item.hasCuratedContent
                        ? "border-border bg-card/50 hover:border-primary/30 hover:bg-accent/30"
                        : "border-dashed border-border/70 bg-muted/10 hover:border-amber-500/40 hover:bg-amber-500/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg shrink-0 ${item.hasCuratedContent ? "bg-violet-100 dark:bg-violet-900/40" : "bg-muted"}`}>
                        {item.hasCuratedContent ? (
                          <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                        ) : (
                          <Construction className="h-4 w-4 text-muted-foreground/60" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-sm">{item.topicTitle}</h3>
                          {item.hasCuratedContent ? (
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                              full proof
                            </span>
                          ) : (
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              coming soon
                            </span>
                          )}
                        </div>
                        {item.curated && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {item.curated.statement}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
