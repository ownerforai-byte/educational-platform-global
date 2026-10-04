import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, FileText, History, Sigma } from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  FORMULA_SUBJECTS,
  getSubjectFormulaSheet,
  getUnitFormulaSheet,
  isFormulaSubjectSlug,
} from "@/lib/formula-sheet";

/**
 * Prerendered at build (see the subject page): every populate-able unit gets
 * its own static sheet; unknown unit ids 404 without a runtime fs lookup.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { subject: string; unit: string }[] = [];
  for (const subject of FORMULA_SUBJECTS) {
    const sheet = await getSubjectFormulaSheet(subject.slug);
    if (!sheet) continue;
    for (const unit of [...sheet.units, ...sheet.extras]) {
      if (unit.formulaCount > 0) {
        params.push({ subject: subject.slug, unit: unit.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}): Promise<Metadata> {
  const { subject, unit } = await params;
  const found = await getUnitFormulaSheet(subject, unit);
  if (!found) return { title: "Formula Sheet" };
  const { sheet, unit: u } = found;
  return {
    title: `${u.title} — ${sheet.name} Formulas · Ravikisan's Platform`,
    description: `All ${u.formulaCount} ${sheet.name.toLowerCase()} formulas of ${u.title}, grouped by source note and rendered for revision.`,
  };
}

export default async function UnitFormulaPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}) {
  const { subject, unit: unitId } = await params;
  if (!isFormulaSubjectSlug(subject)) notFound();
  const found = await getUnitFormulaSheet(subject, unitId);
  if (!found) notFound();
  const { sheet, unit } = found;

  let formulaNo = 0;
  const unitNotesHref = `/class-11-notes/${sheet.slug}/chapters/${unit.id}`;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 md:py-12">
      <header className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link
            href={`/formulas/${sheet.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {sheet.emoji} {sheet.name} formula sheet
          </Link>
          <span aria-hidden>·</span>
          <span>
            {unit.isExtra ? "Legacy bank" : `Unit ${unit.unitNo} of ${sheet.units.length}`}
          </span>
        </div>

        <div className="mt-3 flex items-start gap-3">
          {unit.isExtra ? (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <History className="h-5 w-5" />
            </span>
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-lg font-black text-white shadow-sm">
              {unit.unitNo}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {unit.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-semibold text-foreground/80">
                <Sigma className="h-3.5 w-3.5 text-primary" />
                {unit.formulaCount} formulas
              </span>
              <span aria-hidden>·</span>
              <span>{unit.topics.length} source notes</span>
              {!unit.isExtra && (
                <>
                  <span aria-hidden>·</span>
                  <span>{unit.syllabusTopicCount} syllabus topics</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {unit.formulaCount === 0 && (
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">
          <p className="text-sm font-semibold text-foreground">No formulas captured yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The notes for this unit do not carry any formulas. Read the unit
            notes to see what the syllabus covers here.
          </p>
        </div>
      )}

      {unit.topics.map((topic) => (
        <section key={topic.filename} className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border/50 pb-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {topic.title}
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              <FileText className="h-3 w-3" />
              {topic.formulas.length} formula{topic.formulas.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-2.5">
            {topic.formulas.map((formula) => {
              formulaNo += 1;
              return (
                <article
                  key={`${topic.filename}-${formulaNo}`}
                  className="flex gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3.5 shadow-sm transition-colors hover:border-primary/30"
                >
                  <span className="mt-0.5 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 px-1.5 font-mono text-[10px] font-extrabold text-primary">
                    {String(formulaNo).padStart(2, "0")}
                  </span>
                  <MathMarkdown content={formula} className="min-w-0 flex-1 text-sm" />
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <nav className="flex flex-wrap items-center gap-3 border-t border-border/60 pt-5 text-sm">
        <Link
          href={unitNotesHref}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3.5 py-2 font-semibold text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
        >
          <BookOpen className="h-4 w-4" />
          Read the unit notes
        </Link>
        {!unit.isExtra && (
          <Link
            href={`/formulas/${sheet.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            All {sheet.name.toLowerCase()} units
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
        <Link
          href="/formulas"
          className="ml-auto text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          All formula sheets
        </Link>
      </nav>
    </div>
  );
}
