import Link from "next/link";
import { getDerivationIndex } from "@/lib/derivations";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { ChevronRight, FileText, BookOpen } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const entries = await getDerivationIndex();
  const seen = new Set<string>();
  return entries
    .filter(e => !seen.has(`${e.classSlug}/${e.subjectSlug}`) && seen.add(`${e.classSlug}/${e.subjectSlug}`))
    .map((e) => ({
      classSlug: e.classSlug,
      subjectSlug: e.subjectSlug,
    }));
}

export default async function DerivationsSubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;
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
          {classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground capitalize">{subjectSlug}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight capitalize">
          {subjectSlug === "mathematics" ? "Mathematics"
           : subjectSlug === "physics" ? "Physics"
           : subjectSlug === "chemistry" ? "Chemistry"
           : subjectSlug === "biology" ? "Biology"
           : subjectSlug} — Derivations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {entries.length} derivation{entries.length !== 1 ? "s" : ""} across {unitMap.size} unit{unitMap.size !== 1 ? "s" : ""}.
        </p>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="No derivation content yet"
          description="Derivation notes for this subject will be added as we build out the library."
        />
      ) : (
        <div className="space-y-6">
          {[...unitMap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([unitId, unitEntries]) => {
            const subjectData = getSubjectSyllabus(classSlug, subjectSlug);
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
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {entry.preview}
                          </p>
                        )}
                      </div>
                      {entry.hasDerivation && (
                        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                          has proof
                        </span>
                      )}
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
