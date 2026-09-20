import Link from "next/link";
import { getTheoremIndex, readTheoremContent } from "@/lib/theorems";
import { findSyllabusTheoremItem } from "@/lib/theorem-topics";
import { SchematicDiagram } from "@/components/lab/schematic-diagram";
import { DerivationVisual } from "@/components/derivations/derivation-visual";
import { DerivationDetailView } from "@/components/derivations/derivation-detail-view";
import { ChevronRight, BookOpen, FileText } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { DerivationScaffold } from "@/components/derivations/derivation-scaffold";
import { MathMarkdown } from "@/components/content/math-markdown";

export const dynamic = "force-dynamic";

export default async function TheoremDetailPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string; topicSlug: string }>;
}) {
  const { classSlug, subjectSlug, topicSlug } = await params;
  const classLabel = classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const subjectHref = `/theorems/${classSlug}/${subjectSlug}`;

  const Breadcrumb = ({ current }: { current: string }) => (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <Link href="/theorems" className="hover:text-foreground">Theorems</Link>
      <ChevronRight className="h-3 w-3" />
      <Link href={`/theorems/${classSlug}`} className="hover:text-foreground capitalize">{classLabel}</Link>
      <ChevronRight className="h-3 w-3" />
      <Link href={subjectHref} className="hover:text-foreground capitalize">{subjectSlug}</Link>
      <ChevronRight className="h-3 w-3" />
      <span className="font-medium text-foreground truncate">{current}</span>
    </nav>
  );

  // ── 1. Syllabus-ordered items (physics, chemistry, biology, mathematics) ──
  if (["physics", "chemistry", "biology", "mathematics"].includes(subjectSlug)) {
    const item = findSyllabusTheoremItem(classSlug, subjectSlug, topicSlug);
    if (item) {
      if (item.hasCuratedContent && item.curated) {
        return (
          <div className="mx-auto max-w-4xl space-y-8 py-8 px-4 sm:px-6">
            <Breadcrumb current={item.curated.title} />
            <DerivationDetailView derivation={item.curated} />
          </div>
        );
      }
      return (
        <DerivationScaffold
          topicTitle={item.topicTitle}
          unitTitle={item.unitTitle}
          unitId={item.unitId}
          subjectSlug={subjectSlug}
          classSlug={classSlug}
          topicSlug={item.topicSlug}
          kind="Theorem"
          backHref={subjectHref}
          backLabel={`${subjectSlug} theorems`}
        />
      );
    }
    // Fall through to filesystem lookup below (concept-file based content).
  }

  // ── 2. Filesystem-indexed entries (math + concept-file content) ──
  const allEntries = await getTheoremIndex();
  const entry = allEntries.find(
    (e) => e.classSlug === classSlug && e.subjectSlug === subjectSlug && e.topicSlug === topicSlug,
  );

  if (!entry) {
    return (
      <div className="mx-auto max-w-4xl py-10 px-4 space-y-6">
        <Breadcrumb current={topicSlug} />
        <EmptyState
          title="Theorem not found"
          description="This specific theorem topic has not been indexed yet or the link may be outdated."
          action={{
            label: `Explore all ${subjectSlug} theorems`,
            href: subjectHref,
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/theorems/${classSlug}`}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
            >
              ← View {classLabel} Theorems
            </Link>
            <span className="text-muted-foreground/40">&bull;</span>
            <Link href="/theorems" className="text-xs font-semibold text-primary hover:underline">
              All Theorems &amp; Proofs Index
            </Link>
          </div>
        </EmptyState>
      </div>
    );
  }

  const rawJson = await readTheoremContent(entry.filePath);
  const title = (rawJson as any)?.title ?? entry.topicTitle;
  const notes = (rawJson as any)?.notes ?? entry.snippets;
  const confusion = (rawJson as any)?.confusion ?? [];
  const practice = (rawJson as any)?.practice ?? [];
  const universalFacts = (rawJson as any)?.universalFacts ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10">
      <Breadcrumb current={title} />

      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {entry.hasProof && (
              <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                has proof
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {entry.unitTitle} · {classSlug} · {subjectSlug}
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Interactive Visual Schematic
        </h2>
        <div className="rounded-xl border border-border overflow-hidden">
          {entry.visualType ? (
            <DerivationVisual visualType={entry.visualType} />
          ) : (
            <SchematicDiagram
              subjectSlug={subjectSlug}
              topicSlug={entry.topicSlug}
              topicTitle={title}
              unitId={entry.unitId}
            />
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">Statement</h2>
        {Array.isArray(notes) && notes.length > 0 ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {notes.map((note: string, i: number) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                {/* MathMarkdown handles inline math/markdown */}
                <MathMarkdown content={note} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{entry.preview}</p>
        )}
      </section>

      {entry.hasProof && Array.isArray(notes) && notes.some((n: string) => /proof/i.test(n)) && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-violet-500" />
            Proof
          </h2>
          <div className="rounded-lg border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/10 p-4">
            {notes
              .filter((n: string) => /proof/i.test(n))
              .map((proof: string, i: number) => (
                <div key={i} className="prose prose-sm dark:prose-invert max-w-none">
                  <MathMarkdown content={proof} />
                </div>
              ))}
          </div>
        </section>
      )}

      {confusion.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Common Confusions</h2>
          <div className="space-y-2">
            {confusion.map((c: string, i: number) => (
              <div key={i} className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10 px-4 py-3 text-sm">
                <MathMarkdown content={c} />
              </div>
            ))}
          </div>
        </section>
      )}

      {practice.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Practice &amp; Proof Exercises</h2>
          <div className="space-y-2">
            {practice.map((p: string, i: number) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card/50 px-4 py-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span className="text-sm">
                  <MathMarkdown content={p} />
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {universalFacts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {universalFacts.map((f: string, i: number) => (
              <li key={i}>
                <MathMarkdown content={f} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link
        href={subjectHref}
        className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Back to {subjectSlug} theorems
      </Link>
    </div>
  );
}
