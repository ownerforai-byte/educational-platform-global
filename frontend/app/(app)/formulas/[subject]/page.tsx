import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, FileText, History } from "lucide-react";
import {
  FORMULA_SUBJECTS,
  getSubjectFormulaSheet,
  isFormulaSubjectSlug,
  type FormulaSheetUnit,
} from "@/lib/formula-sheet";

/**
 * Prerendered at build (the extraction reads the shipped note tree, present in
 * the build workspace but not traced into the serverless bundle); unknown
 * subjects 404 without a runtime filesystem lookup.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return FORMULA_SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const sheet = await getSubjectFormulaSheet(subject);
  if (!sheet) return { title: "Formula Sheets" };
  return {
    title: `${sheet.name} Formulas — Class 11 Formula Sheet · Ravikisan's Platform`,
    description: `${sheet.formulaCount} formulas from ${sheet.noteCount} Class 11 ${sheet.name} notes, arranged unit by unit in official NEB syllabus order.`,
  };
}

const HEADER_COLORS: Record<string, string> = {
  physics: "from-sky-500 to-blue-600",
  mathematics: "from-violet-500 to-purple-600",
  chemistry: "from-amber-500 to-orange-600",
};

function UnitCard({
  subject,
  unit,
}: {
  subject: string;
  unit: FormulaSheetUnit;
}) {
  const hasFormulas = unit.formulaCount > 0;
  return (
    <section
      id={`unit-${unit.id}`}
      className="scroll-mt-24 overflow-hidden rounded-xl border border-border/70 bg-card transition-colors hover:border-primary/30"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border/40 bg-muted/20 px-4 py-3 sm:px-5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-[11px] font-bold text-white shadow-sm">
          {unit.unitNo ?? "★"}
        </span>
        <h2 className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-foreground">
          {unit.title}
        </h2>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
          <FileText className="h-3 w-3" />
          {unit.formulaCount} formulas
        </span>
        {unit.isExtra && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <History className="h-3 w-3" />
            Legacy bank
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-5">
        {!unit.isExtra && (
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {unit.syllabusTopicCount} syllabus topics
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {unit.noteCount} source notes
        </span>
        {hasFormulas ? (
          <Link
            href={`/formulas/${subject}/${unit.id}`}
            className="ml-auto inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            Open the {unit.isExtra ? "" : "unit "}sheet
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="ml-auto text-[11px] italic">
            No formulas captured in the notes yet
          </span>
        )}
      </div>
    </section>
  );
}

export default async function SubjectFormulaPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!isFormulaSubjectSlug(subject)) notFound();
  const sheet = await getSubjectFormulaSheet(subject);
  if (!sheet) notFound();

  const unitsWithFormulas = sheet.units.filter((u) => u.formulaCount > 0).length;
  const colorClass = HEADER_COLORS[sheet.slug] ?? "from-primary to-primary/70";

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 md:py-12">
      <header className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-2xl shadow-sm`}
          >
            {sheet.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {sheet.name} Formula Sheet
              </h1>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                Class 11 · official order
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Every formula of the Class 11 {sheet.name.toLowerCase()} syllabus,
              grouped under its unit and its source note — extracted from the
              authored notes the platform teaches.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>{unitsWithFormulas} units covered</span>
              <span aria-hidden>·</span>
              <span>{sheet.formulaCount} formulas</span>
              <span aria-hidden>·</span>
              <span>{sheet.noteCount} notes read</span>
              <Link
                href="/formulas"
                className="ml-auto inline-flex items-center gap-1 text-primary hover:underline"
              >
                <ArrowLeft className="h-3 w-3" />
                All formula sheets
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Units in official NEB order
        </h2>
        {sheet.units.map((unit) => (
          <UnitCard key={unit.id} subject={sheet.slug} unit={unit} />
        ))}
      </div>

      {sheet.extras.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Legacy banks
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            These folders hold real formulas but use pre-rename unit names that
            are no longer in the syllabus. They are kept here so no formula is
            lost; the syllabus units above stay authoritative.
          </p>
          {sheet.extras.map((unit) => (
            <UnitCard key={unit.id} subject={sheet.slug} unit={unit} />
          ))}
        </div>
      )}

      <nav className="flex flex-wrap gap-3 border-t border-border/60 pt-5 text-sm">
        {FORMULA_SUBJECTS.filter((s) => s.slug !== sheet.slug).map((s) => (
          <Link
            key={s.slug}
            href={`/formulas/${s.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3.5 py-2 font-semibold text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
          >
            {s.emoji} {s.name} formulas
          </Link>
        ))}
        <Link
          href={`/class-11-notes/${sheet.slug}`}
          className="ml-auto inline-flex items-center gap-1.5 self-center text-xs font-semibold text-primary hover:underline"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {sheet.name} notes workspace
        </Link>
      </nav>
    </div>
  );
}
