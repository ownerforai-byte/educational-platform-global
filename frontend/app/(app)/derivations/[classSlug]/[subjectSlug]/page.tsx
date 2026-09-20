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

export default async function DerivationsSubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;
  const subjectData = getSubjectSyllabus(classSlug, subjectSlug);

  // ── Non-PCB subjects: legacy filesystem index ──
  if (!["physics", "chemistry", "biology", "mathematics"].includes(subjectSlug)) {
    const { getDerivationIndex } = await import("@/lib/derivations");
    const allEntries = await getDerivationIndex();
    const entries = allEntries.filter(
      (e) => e.classSlug === classSlug && e.subjectSlug === subjectSlug,
    );
    const unitMap = new Map<string, typeof entries>();
    for (const e of entries) {
      const arr = unitMap.get(e.unitId) ?? [];
      arr.push(e);
      unitMap.set(e.unitId, arr);
    }

    return (
      <div className="mx-auto max-w-5xl space-y-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/derivations" className="hover:text-foreground">Derivations</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/derivations/${classSlug}`} className="hover:text-foreground capitalize">
            {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground capitalize">{subjectSlug}</span>
        </nav>

        <div>
          <h1 className="text-2xl font-bold tracking-tight capitalize">{subjectSlug} — Derivations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {entries.length} derivation{entries.length !== 1 ? "s" : ""} across {unitMap.size} unit{unitMap.size !== 1 ? "s" : ""}.
          </p>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            title="No derivation content yet"
            description={`Derivation notes for ${subjectSlug} will be added as we build out the library.`}
            action={{ label: `View ${subjectSlug} Notes`, href: `/${classSlug}/${subjectSlug}` }}
          />
        ) : (
          <div className="space-y-6">
            {[...unitMap.entries()].map(([unitId, unitEntries]) => {
              const unitInfo = subjectData?.units.find((u) => u.id === unitId);
              return (
                <div key={unitId} className="space-y-3">
                  <h2 className="text-base font-semibold text-muted-foreground">
                    {unitInfo?.title ?? unitId}
                    <span className="ml-2 text-xs font-normal text-muted-foreground/70">
                      {unitEntries.length} derivation{unitEntries.length !== 1 ? "s" : ""}
                    </span>
                  </h2>
                  <div className="space-y-2">
                    {unitEntries.map((entry) => (
                      <Link
                        key={entry.topicSlug}
                        href={`/derivations/${classSlug}/${subjectSlug}/${entry.topicSlug}`}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent/40"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {entry.topicTitle || entry.topicSlug}
                          </p>
                          {entry.preview && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{entry.preview}</p>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── PCB subjects: full syllabus-ordered derivation listing ──
  const items = getSyllabusTheoremItems(classSlug, subjectSlug);
  const orderedUnits = subjectData?.units ?? [];
  const available = items.filter((i) => i.hasCuratedContent).length;

  const unitGroups = orderedUnits
    .map((unit) => ({ unit, entries: items.filter((i) => i.unitId === unit.id) }))
    .filter((g) => g.entries.length > 0);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/derivations" className="hover:text-foreground">Derivations</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/derivations/${classSlug}`} className="hover:text-foreground capitalize">
          {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">{SUBJECT_LABELS[subjectSlug] ?? subjectSlug}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {SUBJECT_LABELS[subjectSlug] ?? subjectSlug} — Derivations, Laws &amp; Principles
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} syllabus topics in official curriculum order · {available} with full derivations.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No derivation topics found"
          description={`No derivation topics found in the ${subjectSlug} syllabus.`}
          action={{
            label: `View ${SUBJECT_LABELS[subjectSlug] ?? subjectSlug} Notes`,
            href: `/${classSlug}/${subjectSlug}`,
          }}
        />
      ) : (
        <div className="space-y-8">
          {unitGroups.map(({ unit, entries }) => (
            <section key={unit.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h2 className="text-base font-semibold tracking-tight text-center">{unit.title}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-xs text-muted-foreground shrink-0">
                  {entries.length} topic{entries.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-2">
                {entries.map((item) => (
                  <Link
                    key={item.key}
                    href={`/derivations/${classSlug}/${subjectSlug}/${item.topicSlug}`}
                    className={`block rounded-lg border p-4 transition-colors ${
                      item.hasCuratedContent
                        ? "border-border bg-card/50 hover:border-primary/30 hover:bg-accent/30"
                        : "border-dashed border-border/70 bg-muted/10 hover:border-amber-500/40 hover:bg-amber-500/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg shrink-0 ${item.hasCuratedContent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground/60"}`}>
                        {item.hasCuratedContent ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <Construction className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-sm">{item.topicTitle}</h3>
                          {item.hasCuratedContent ? (
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                              full derivation
                            </span>
                          ) : (
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              coming soon
                            </span>
                          )}
                        </div>
                        {item.curated && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.curated.statement}</p>
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
