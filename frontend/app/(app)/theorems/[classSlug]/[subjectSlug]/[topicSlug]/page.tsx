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
import { PaperJsonBody } from "@/components/content/paper-json-body";
import {
  TopicKnowledgeFloat,
  type TopicKnowledgeRow,
} from "@/components/lab/topic-knowledge-float";

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

  // Floating topic-knowledge rows for the drawing sheet: compact symbol-tagged
  // facts (meanings stay in the permanent legend below the sheet).
  const clip = (s: string, n: number) =>
    s.replace(/[*#`]/g, "").replace(/\s+/g, " ").trim().slice(0, n);
  const knowledgeRows: TopicKnowledgeRow[] = [];
  const statementText = entry.derivation?.statement || entry.preview || entry.topicTitle;
  if (statementText) knowledgeRows.push({ symbol: "§", text: clip(statementText, 260) });
  const coreFormula = entry.derivation?.coreFormula ?? "";
  if (coreFormula) knowledgeRows.push({ symbol: "ƒ", text: coreFormula, mono: true });
  const proofSteps = entry.derivation?.proofSteps ?? [];
  if (proofSteps.length > 0) {
    const last = proofSteps[proofSteps.length - 1];
    knowledgeRows.push({
      symbol: "✎",
      text: `${proofSteps.length}-step derivation ending in: ${clip(last.title, 90)}`,
    });
  }
  for (const fact of universalFacts.slice(0, 2)) {
    if (typeof fact === "string" && fact.trim()) {
      knowledgeRows.push({ symbol: "★", text: clip(fact, 180) });
    }
  }
  for (const trap of confusion.slice(0, 2)) {
    if (typeof trap === "string" && trap.trim()) {
      knowledgeRows.push({ symbol: "⚠", text: clip(trap, 180) });
    }
  }

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
        {/* Both renderers carry their own framed drawing sheet (ISO title block
            + blueprint canvas), so no outer border here — it used to double-frame. */}
        {entry.visualType ? (
          <TopicKnowledgeFloat title={title} rows={knowledgeRows}>
            <DerivationVisual visualType={entry.visualType} />
          </TopicKnowledgeFloat>
        ) : (
          <SchematicDiagram
            subjectSlug={subjectSlug}
            topicSlug={entry.topicSlug}
            topicTitle={title}
            unitId={entry.unitId}
            classSlug={classSlug}
          />
        )}
      </section>

      <PaperJsonBody className="mt-4">
        <h1 className="a4-title text-left">{title}</h1>
        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">Statement</h2>
          {Array.isArray(notes) && notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map((note: string, i: number) => (
                <div key={i}>
                  <MathMarkdown content={note} className="text-[13px] leading-relaxed" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-600">{entry.preview}</p>
          )}
        </section>

        {entry.hasProof && Array.isArray(notes) && notes.some((n: string) => /proof/i.test(n)) && (
          <section className="mt-6 space-y-3 border-t border-neutral-300 pt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">Proof</h2>
            {notes
              .filter((n: string) => /proof/i.test(n))
              .map((proof: string, i: number) => (
                <div key={i}>
                  <MathMarkdown content={proof} className="text-[13px] leading-relaxed" />
                </div>
              ))}
          </section>
        )}

        {confusion.length > 0 && (
          <section className="mt-6 space-y-2 border-t border-neutral-300 pt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">Common confusions</h2>
            {confusion.map((c: string, i: number) => (
              <div key={i} className="text-sm">
                <MathMarkdown content={c} className="text-[13px] leading-relaxed" />
              </div>
            ))}
          </section>
        )}

        {practice.length > 0 && (
          <section className="mt-6 space-y-2 border-t border-neutral-300 pt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">Practice</h2>
            {practice.map((p: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="font-bold text-neutral-800">{i + 1}.</span>
                <MathMarkdown content={p} className="min-w-0 flex-1 text-[13px] leading-relaxed" />
              </div>
            ))}
          </section>
        )}

        {universalFacts.length > 0 && (
          <section className="mt-6 border-t border-neutral-300 pt-4">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-neutral-600">Key takeaways</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
              {universalFacts.map((f: string, i: number) => (
                <li key={i}>
                  <MathMarkdown content={f} className="text-[13px] leading-relaxed [&_p]:my-0" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </PaperJsonBody>

      <Link
        href={subjectHref}
        className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Back to {subjectSlug} theorems
      </Link>
    </div>
  );
}
