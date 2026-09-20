import Link from "next/link";
import { getDerivationIndex } from "@/lib/derivations";
import { DERIVATIONS_AND_THEOREMS } from "@/lib/derivations-data";
import { findSyllabusTheoremItem } from "@/lib/theorem-topics";
import { DerivationDetailView } from "@/components/derivations/derivation-detail-view";
import { DerivationVisual } from "@/components/derivations/derivation-visual";
import { ChevronRight, BookOpen, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { ComingSoon } from "@/components/content/coming-soon";
import { MathMarkdown } from "@/components/content/math-markdown";

export const dynamic = "force-dynamic";

export default async function DerivationDetailPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string; topicSlug: string }>;
}) {
  const { classSlug, subjectSlug, topicSlug } = await params;
  const classLabel = classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const subjectHref = `/derivations/${classSlug}/${subjectSlug}`;

  const Breadcrumb = ({ current }: { current: string }) => (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <Link href="/derivations" className="hover:text-foreground">Derivations</Link>
      <ChevronRight className="h-3 w-3" />
      <Link href={`/derivations/${classSlug}`} className="hover:text-foreground capitalize">{classLabel}</Link>
      <ChevronRight className="h-3 w-3" />
      <Link href={subjectHref} className="hover:text-foreground capitalize">{subjectSlug}</Link>
      <ChevronRight className="h-3 w-3" />
      <span className="font-medium text-foreground truncate">{current}</span>
    </nav>
  );

  // ── 1. Syllabus-ordered items (PCB + Mathematics) ──
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
        <ComingSoon
          title={item.topicTitle}
          unitTitle={item.unitTitle}
          subjectSlug={subjectSlug}
          classSlug={classSlug}
          kind="Derivation"
          backHref={subjectHref}
          backLabel={`${subjectSlug} derivations`}
        />
      );
    }
    // Fall through to filesystem lookup for concept-file based content.
  }

  // ── 2. Rich curated dataset fallback (any subject) ──
  const richDerivation =
    DERIVATIONS_AND_THEOREMS.find((d) => {
      const slugMatch =
        d.slug === topicSlug ||
        topicSlug.includes(d.slug) ||
        d.slug.includes(topicSlug) ||
        d.id.includes(topicSlug);
      const subjectMatch =
        d.subject.toLowerCase() === subjectSlug.toLowerCase() ||
        (d.subject === "mathematics" && subjectSlug.includes("math"));
      return slugMatch && subjectMatch;
    }) || DERIVATIONS_AND_THEOREMS.find((d) => d.slug === topicSlug || d.id === topicSlug);

  if (richDerivation) {
    return (
      <div className="mx-auto max-w-4xl space-y-8 py-8 px-4 sm:px-6">
        <Breadcrumb current={richDerivation.title} />
        <DerivationDetailView derivation={richDerivation} />
      </div>
    );
  }

  // ── 3. Filesystem-indexed concept entries ──
  const allEntries = await getDerivationIndex();
  const entry = allEntries.find(
    (e) => e.classSlug === classSlug && e.subjectSlug === subjectSlug && e.topicSlug === topicSlug,
  );

  if (!entry) {
    return (
      <div className="mx-auto max-w-4xl py-10 px-4">
        <Breadcrumb current={topicSlug} />
        <div className="mt-6">
          <EmptyState
            title="Derivation not found"
            description="This derivation page does not exist or the content has not been indexed yet."
          />
        </div>
        <div className="mt-4 text-center">
          <Link href="/derivations" className="text-sm font-semibold text-primary hover:underline">
            ← Explore all available derivations in the Derivations Hub
          </Link>
        </div>
      </div>
    );
  }

  const { readDerivationContent } = await import("@/lib/derivations");
  const rawJson = await readDerivationContent(entry.filePath);

  const title = (rawJson as any)?.title ?? entry.topicTitle;
  const notes = (rawJson as any)?.notes ?? entry.snippets;
  const confusion = (rawJson as any)?.confusion ?? [];
  const universalFacts = (rawJson as any)?.universalFacts ?? [];

  const visualTypeFallback = subjectSlug.includes("phys")
    ? "projectile-motion"
    : subjectSlug.includes("chem")
    ? "arrhenius-kinetics"
    : subjectSlug.includes("math")
    ? "lmvt-rolle"
    : "hardy-weinberg";

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8 px-4 sm:px-6">
      <Breadcrumb current={title} />

      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{title}</h1>
            {entry.hasDerivation && (
              <span className="shrink-0 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                Rigorous Derivation
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {entry.unitTitle} · {classSlug} · {subjectSlug}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Visual Concept Schematic</h2>
          <span className="text-[11px] text-muted-foreground">Diagram &amp; Geometric Structure</span>
        </div>
        <DerivationVisual visualType={visualTypeFallback} title={title} />
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">Step-by-Step Derivation &amp; Conceptual Notes</h2>
        {Array.isArray(notes) && notes.length > 0 ? (
          <div className="space-y-3">
            {notes.map((note: string, i: number) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                <MathMarkdown content={note} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{entry.preview}</p>
        )}
      </section>

      {universalFacts.length > 0 && (
        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>Universal Principles &amp; Facts</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {universalFacts.map((fact: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {confusion.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-amber-500">Common Exam Pitfalls &amp; Traps</h2>
          <div className="space-y-2">
            {confusion.slice(0, 8).map((item: string, i: number) => (
              <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-muted-foreground">
                <MathMarkdown content={item} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
