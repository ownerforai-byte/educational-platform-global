import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ListTree, Sigma } from "lucide-react";
import { FORMULA_SUBJECTS, getFormulaSheetSummaries } from "@/lib/formula-sheet";

/**
 * Prerendered at build: the extraction reads the shipped note tree, which is
 * present in the build workspace but is not traced into the serverless bundle.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Formula Sheets — Physics, Math & Chemistry · Ravikisan's Platform",
  description:
    "Every formula of the Class 11 Physics, Mathematics and Chemistry syllabus, extracted from the authored notes and arranged unit by unit in official NEB order.",
};

const CARD_COLORS: Record<string, string> = {
  physics: "from-sky-500 to-blue-600",
  mathematics: "from-violet-500 to-purple-600",
  chemistry: "from-amber-500 to-orange-600",
};

export default async function FormulasHubPage() {
  const summaries = await getFormulaSheetSummaries();
  const bySlug = new Map(summaries.map((s) => [s.slug, s]));
  const totalFormulas = summaries.reduce((n, s) => n + s.formulaCount, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
          <Sigma className="h-3.5 w-3.5" />
          <span>Class 11 · official syllabus order</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Formula Sheets
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Every formula the authored notes carry for Physics, Mathematics and
          Chemistry — extracted unit by unit from the same notes the platform
          teaches, and listed in official NEB curriculum order.{" "}
          <span className="font-semibold text-foreground/80">
            {totalFormulas.toLocaleString()} formulas
          </span>{" "}
          across the three subjects, each on its own unit sheet.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FORMULA_SUBJECTS.map((subject) => {
          const summary = bySlug.get(subject.slug);
          return (
            <Link
              key={subject.slug}
              href={`/formulas/${subject.slug}`}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${CARD_COLORS[subject.slug] ?? "from-primary to-primary/70"} text-xl shadow-sm`}
                >
                  {subject.emoji}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-foreground">
                {subject.name}
              </h2>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                {summary
                  ? `${summary.formulaCount} formulas from ${summary.noteCount} authored notes, unit by unit.`
                  : "Unit-by-unit formulas in official syllabus order."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {summary && (
                  <>
                    <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-bold text-foreground/75">
                      {summary.unitCount} units
                    </span>
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {summary.formulaCount} formulas
                    </span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <section className="rounded-2xl border border-border/70 bg-muted/20 p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          <ListTree className="h-4 w-4" />
          How each sheet is organised
        </h2>
        <ol className="mt-3 space-y-1.5 text-sm text-foreground/85">
          <li className="flex gap-2">
            <span className="font-mono text-xs font-bold text-primary">1</span>
            Pick a subject — the sheet opens on its official units, numbered in syllabus order.
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-xs font-bold text-primary">2</span>
            Open a unit — every formula in that unit, grouped by the note (topic) it came from.
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-xs font-bold text-primary">3</span>
            Follow the notes link on any sheet to read the full topic workspace behind a formula.
          </li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/syllabus"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <BookOpen className="h-3.5 w-3.5" />
            See the official syllabus these sheets follow
          </Link>
        </div>
      </section>
    </div>
  );
}
