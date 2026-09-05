import Link from "next/link";
import { getTheoremIndex, filterTheorems, groupTheoremsByUnit, readTheoremContent } from "@/lib/theorems";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { ChevronRight, FileText } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { MathMarkdown } from "@/components/content/math-markdown";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [
    { classSlug: "class-11-notes", subjectSlug: "mathematics" },
    { classSlug: "class-11-notes", subjectSlug: "physics" },
    { classSlug: "class-11-notes", subjectSlug: "chemistry" },
    { classSlug: "class-11-notes", subjectSlug: "biology" },
    { classSlug: "class-12-notes", subjectSlug: "mathematics" },
    { classSlug: "class-12-notes", subjectSlug: "physics" },
    { classSlug: "class-12-notes", subjectSlug: "chemistry" },
    { classSlug: "class-12-notes", subjectSlug: "biology" },
  ];
}

export default async function TheoremsSubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;
  const allEntries = await getTheoremIndex();
  const entries = filterTheorems(allEntries, { classSlug, subjectSlug });
  const grouped = groupTheoremsByUnit(entries);
  const subjectData = getSubjectSyllabus(classSlug, subjectSlug);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/theorems" className="hover:text-foreground">Theorems</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/theorems/${classSlug}`} className="hover:text-foreground capitalize">
          {classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
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
          description="Theorem and proof notes for this subject will be added as we build out the library."
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
                    <span className="text-xs text-muted-foreground">{unitEntries.length} theorem{unitEntries.length !== 1 ? "s" : ""}</span>
                  </div>

                  <div className="space-y-2">
                    {unitEntries.map((entry) => (
                      <TheoremCard key={entry.topicSlug} entry={entry} classSlug={classSlug} subjectSlug={subjectSlug} />
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

/* ---------- Per-theorem card (inline — reads JSON at build time) ---------- */
async function TheoremCard({
  entry,
  classSlug,
  subjectSlug,
}: {
  entry: import("@/lib/theorems").TheoremEntry;
  classSlug: string;
  subjectSlug: string;
}) {
  const json = await readTheoremContent(entry.filePath);

  const hasProof = entry.hasProof;
  const preview = entry.preview
    ? entry.preview.replace(/<[^>]+>/g, "").slice(0, 160)
    : "";

  return (
    <Link
      href={`/theorems/${classSlug}/${subjectSlug}/${entry.topicSlug}`}
      className="block rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/30 hover:bg-accent/30"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${hasProof ? "bg-violet-100 dark:bg-violet-900/40" : "bg-blue-100 dark:bg-blue-900/40"}`}>
          <FileText className={`h-4 w-4 ${hasProof ? "text-violet-600 dark:text-violet-400" : "text-blue-600 dark:text-blue-400"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm truncate">{entry.topicTitle}</h3>
            {hasProof && (
              <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                has proof
              </span>
            )}
          </div>
          {preview && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {preview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
