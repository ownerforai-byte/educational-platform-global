import Link from "next/link";
import { getDerivationIndex, readDerivationContent } from "@/lib/derivations";
import { ChevronRight, FileText, BookOpen } from "lucide-react";
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
  const allEntries = await getDerivationIndex();
  const entry = allEntries.find(
    (e) => e.classSlug === classSlug && e.subjectSlug === subjectSlug && e.topicSlug === topicSlug,
  );

  if (!entry) {
    return (
      <div className="mx-auto max-w-4xl py-10">
        <EmptyState title="Derivation not found" description="This derivation page does not exist or the content has not been added yet." />
      </div>
    );
  }

  const rawJson = await readDerivationContent(entry.filePath);

  const title = (rawJson as any)?.title ?? entry.topicTitle;
  const notes = (rawJson as any)?.notes ?? entry.snippets;
  const confusion = (rawJson as any)?.confusion ?? [];
  const practice = (rawJson as any)?.practice ?? [];
  const universalFacts = (rawJson as any)?.universalFacts ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10">
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
        <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {entry.hasDerivation && (
              <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                has derivation
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {entry.unitId} · {classSlug} · {subjectSlug}
          </p>
        </div>
      </div>

      {/* Derivation steps */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold">Derivation</h2>
        {Array.isArray(notes) && notes.length > 0 ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {notes.map((note: string, i: number) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <MathMarkdown content={note} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{entry.preview}</p>
        )}
      </section>

      {/* Confusion notes */}
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

      {/* Practice problems */}
      {practice.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Practice Exercises</h2>
          <div className="space-y-2">
            {practice.map((p: string, i: number) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card/50 px-4 py-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span className="text-sm"><MathMarkdown content={p} /></span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Universal facts */}
      {universalFacts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {universalFacts.map((f: string, i: number) => (
              <li key={i}><MathMarkdown content={f} /></li>
            ))}
          </ul>
        </section>
      )}

      {/* Back link */}
      <Link
        href={`/derivations/${classSlug}/${subjectSlug}`}
        className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Back to {subjectSlug} derivations
      </Link>
    </div>
  );
}
