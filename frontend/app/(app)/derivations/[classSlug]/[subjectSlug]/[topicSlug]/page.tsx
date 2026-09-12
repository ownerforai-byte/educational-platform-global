import Link from "next/link";
import { getDerivationIndex, readDerivationContent } from "@/lib/derivations";
import { DERIVATIONS_AND_THEOREMS } from "@/lib/derivations-data";
import { DerivationDetailView } from "@/components/derivations/derivation-detail-view";
import { DerivationVisual } from "@/components/derivations/derivation-visual";
import { ChevronRight, FileText, BookOpen, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { MathMarkdown } from "@/components/content/math-markdown";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const entries = await getDerivationIndex();
  return entries.map((e) => ({
    classSlug: e.classSlug,
    subjectSlug: e.subjectSlug,
    topicSlug: e.topicSlug,
  }));
}

export default async function DerivationDetailPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string; topicSlug: string }>;
}) {
  const { classSlug, subjectSlug, topicSlug } = await params;

  // 1. Check if we have a match in the rich curated dataset first
  const richDerivation = DERIVATIONS_AND_THEOREMS.find((d) => {
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
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/derivations" className="hover:text-foreground">Derivations</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/derivations/${classSlug}`} className="hover:text-foreground capitalize">
            {classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/derivations/${classSlug}/${subjectSlug}`} className="hover:text-foreground capitalize">{subjectSlug}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground truncate">{richDerivation.title}</span>
        </nav>

        <DerivationDetailView derivation={richDerivation} />
      </div>
    );
  }

  // 2. Fallback to filesystem concept entries
  const allEntries = await getDerivationIndex();
  const entry = allEntries.find(
    (e) => e.classSlug === classSlug && e.subjectSlug === subjectSlug && e.topicSlug === topicSlug,
  );

  if (!entry) {
    // If not found in index, check if any curated derivation has loose title similarity
    const fallbackRich = DERIVATIONS_AND_THEOREMS.find(
      (d) =>
        topicSlug.toLowerCase().includes(d.subject) ||
        topicSlug.toLowerCase().includes(d.id.replace(/^(math|phys|chem|bio)-/, "")),
    );
    if (fallbackRich) {
      return (
        <div className="mx-auto max-w-4xl space-y-8 py-8 px-4 sm:px-6">
          <DerivationDetailView derivation={fallbackRich} />
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-4xl py-10 px-4">
        <EmptyState
          title="Derivation not found"
          description="This derivation page does not exist or the content has not been indexed yet."
        />
        <div className="mt-4 text-center">
          <Link href="/derivations" className="text-sm font-semibold text-primary hover:underline">
            ← Explore all available derivations in the Derivations Hub
          </Link>
        </div>
      </div>
    );
  }

  const rawJson = await readDerivationContent(entry.filePath);

  const title = (rawJson as any)?.title ?? entry.topicTitle;
  const notes = (rawJson as any)?.notes ?? entry.snippets;
  const confusion = (rawJson as any)?.confusion ?? [];
  const practice = (rawJson as any)?.practice ?? [];
  const universalFacts = (rawJson as any)?.universalFacts ?? [];

  // Determine visual type fallback
  const visualTypeFallback = subjectSlug.includes("phys")
    ? "projectile-motion"
    : subjectSlug.includes("chem")
    ? "arrhenius-kinetics"
    : subjectSlug.includes("math")
    ? "lmvt-rolle"
    : "hardy-weinberg";

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8 px-4 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/derivations" className="hover:text-foreground">Derivations</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/derivations/${classSlug}`} className="hover:text-foreground capitalize">
          {classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/derivations/${classSlug}/${subjectSlug}`} className="hover:text-foreground capitalize">{subjectSlug}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground truncate">{title}</span>
      </nav>

      {/* Header */}
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
            {entry.unitId} · {classSlug} · {subjectSlug}
          </p>
        </div>
      </div>

      {/* Visual First */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Visual Concept Schematic</span>
          </h2>
          <span className="text-[11px] text-muted-foreground">Diagram &amp; Geometric Structure</span>
        </div>
        <DerivationVisual visualType={visualTypeFallback} title={title} />
      </div>

      {/* Derivation steps */}
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

      {/* Universal Facts */}
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

      {/* Confusion notes */}
      {confusion.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-amber-500 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>Common Exam Pitfalls &amp; Traps</span>
          </h2>
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
