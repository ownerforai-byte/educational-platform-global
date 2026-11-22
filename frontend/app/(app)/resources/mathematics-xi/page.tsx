import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Download, ExternalLink, FileText, Printer } from "lucide-react";
import {
  MATHEMATICS_XI_SOLUTIONS,
  MATHEMATICS_XI_TOTALS,
  MATHEMATICS_XI_UNITS,
  mathXiSolutionUrl,
} from "@/lib/mathematics-xi-solutions";
import {
  MATH_XI_CHAPTERS,
  MATH_XI_PAPERS,
  MATH_XI_PAPER_GROUPS,
  MATH_XI_PAPER_MARKS,
  MATH_XI_WORKBOOK_BASE,
  MATH_XI_REVISION_PAPERS,
  MATH_XI_WORKBOOK_TOTALS,
  mathXiChapterUrl,
  mathXiChaptersByUnit,
  mathXiHardUrl,
  mathXiConceptUrl,
  mathXiLongUrl,
  mathXiPaperUrl,
} from "@/lib/mathematics-xi-chapters";

export const metadata: Metadata = {
  title: "Mathematics XI — Exercise Solutions & Conceptual Bank",
  description:
    "NEB Grade 11 Mathematics (Mat. 007) exercise solutions for all seven units: every exercise worked in NEB answer style plus the conceptual two-mark questions with model answers.",
};

export default function MathematicsXiSolutionsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 md:py-14">
      <Link
        href="/resources"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All resources
      </Link>

      <header className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 shadow-lg md:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {MATHEMATICS_XI_SOLUTIONS.title}
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {MATHEMATICS_XI_SOLUTIONS.course}
            </p>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              {MATHEMATICS_XI_SOLUTIONS.subtitle}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Units", value: MATHEMATICS_XI_TOTALS.units },
            { label: "Exercises solved", value: MATHEMATICS_XI_TOTALS.exercises },
            { label: "Conceptual Q&A", value: MATHEMATICS_XI_TOTALS.conceptual },
            { label: "Long answers", value: MATHEMATICS_XI_TOTALS.longAnswers },
            { label: "Reasoning drills", value: MATHEMATICS_XI_TOTALS.drills },
            { label: "A4 sheets", value: MATH_XI_WORKBOOK_TOTALS.sheets },
            { label: "Hard + hints", value: MATH_XI_WORKBOOK_TOTALS.hardQuestions },
            { label: "Long answers", value: MATH_XI_WORKBOOK_TOTALS.longQuestions },
            { label: "Revision Qs", value: MATH_XI_WORKBOOK_TOTALS.revisionQuestions },
            { label: "Concept Q&A", value: MATH_XI_WORKBOOK_TOTALS.conceptQuestions },
            { label: "Model papers", value: MATH_XI_PAPERS.length },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/60 bg-background/60 px-3 py-2"
            >
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-xl font-semibold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
        <p>
          Every document follows the same structure: exercise-wise solutions in NEB answer style
          (given → statement → working → answer line), a conceptual bank of 2-mark questions with
          model answers, a fully worked 4–6 mark long-answer set, and a formula sheet with the traps
          that cost the most marks. Answers are printed for checking — the working is the part that
          earns marks.
        </p>
      </div>

      <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Printer className="h-5 w-5 text-primary" />
              A4 workbook — {MATH_XI_WORKBOOK_TOTALS.chapters} chapters, {" "}
              {MATH_XI_WORKBOOK_TOTALS.questions} solved questions
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              One printable document per chapter. Every page is a real A4 sheet holding{" "}
              {MATH_XI_WORKBOOK_TOTALS.perSheet} solved questions in a 3 × 4 grid — question,
              working and answer line — in {MATH_XI_WORKBOOK_TOTALS.sheets} sheets total. The
              second sheet of every chapter switches format: MCQ, true/false, fill in the blank,
              spot the error, assertion–reason, explain why, match and case study. Open any sheet
              and print (Ctrl/⌘ + P) for a PDF that keeps the page layout.
            </p>
          </div>
          <a
            href={`${MATH_XI_WORKBOOK_BASE}/index.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4" />
            Open contents sheet
          </a>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MATHEMATICS_XI_UNITS.map((unit) => {
            const chapters = mathXiChaptersByUnit(unit.unitNo);
            return (
              <div key={unit.unitId} className="rounded-xl border border-border/60 bg-background p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Unit {unit.unitNo} · {chapters.length} chapters
                </p>
                <ul className="mt-2 space-y-1">
                  {chapters.map((chapter) => (
                    <li key={chapter.slug} className="flex items-baseline gap-1">
                      <a
                        href={mathXiChapterUrl(chapter)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-w-0 flex-1 items-baseline gap-2 rounded px-1 py-0.5 text-sm hover:bg-primary/10"
                      >
                        <span className="truncate">
                          <span className="mr-1.5 font-mono text-[11px] text-muted-foreground">
                            {chapter.code}
                          </span>
                          {chapter.title}
                        </span>
                      </a>
                      {chapter.conceptCount > 0 ? (
                        <a
                          href={mathXiConceptUrl(chapter)}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 rounded border border-emerald-500/40 px-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400"
                          title={`${chapter.conceptCount} two-mark conceptual questions with model answers`}
                        >
                          Q&amp;A
                        </a>
                      ) : null}
                      {chapter.longCount > 0 ? (
                        <a
                          href={mathXiLongUrl(chapter)}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 rounded border border-sky-500/40 px-1 text-[11px] font-semibold text-sky-700 hover:bg-sky-500/10 dark:text-sky-400"
                          title="One full-mark NEB long answer with a complete script"
                        >
                          long
                        </a>
                      ) : null}
                      {chapter.hardCount > 0 ? (
                        <a
                          href={mathXiHardUrl(chapter)}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 rounded border border-amber-500/40 px-1 text-[11px] font-semibold text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
                          title={`${chapter.hardCount} hardest questions with hints`}
                        >
                          hard
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {MATH_XI_CHAPTERS.length} chapter sheets · every syllabus topic covered ·{" "}
          {MATH_XI_WORKBOOK_TOTALS.perSheet} questions per sheet.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              Revision papers — {MATH_XI_REVISION_PAPERS.length} timed papers, one per unit
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {MATH_XI_WORKBOOK_TOTALS.revisionQuestions} questions ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.revisionMarks} marks ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.revisionMinutes} minutes each. Questions only on page 1, the
              full answer key on page 2 — print double-sided and sit it without notes.
            </p>
          </div>
          <a
            href={`${MATH_XI_WORKBOOK_BASE}/revision/index.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700"
          >
            <ExternalLink className="h-4 w-4" />
            Open revision papers
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              Conceptual answers — {MATH_XI_WORKBOOK_TOTALS.conceptQuestions} two-mark questions
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {MATH_XI_WORKBOOK_TOTALS.conceptChapters} chapters ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.conceptSheets} A4 sheets ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.conceptPerSheet} questions per sheet. The short “why / what /
              where” questions that open a NEB paper, each with its model answer underneath.
            </p>
          </div>
          <a
            href={`${MATH_XI_WORKBOOK_BASE}/concept/index.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <ExternalLink className="h-4 w-4" />
            Open concept answers
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              Hardest questions — {MATH_XI_WORKBOOK_TOTALS.hardQuestions} problems with a hint
              ladder
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {MATH_XI_WORKBOOK_TOTALS.hardChapters} chapters ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.hardSheets} A4 sheets ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.hardPerSheet} problems per sheet. Each one gives three
              escalating hints (H1 → H2 → H3), then the complete NEB-style solution.
            </p>
          </div>
          <a
            href={`${MATH_XI_WORKBOOK_BASE}/hard/index.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700"
          >
            <ExternalLink className="h-4 w-4" />
            Open hard sets
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              Full-length answers — {MATH_XI_WORKBOOK_TOTALS.longQuestions} complete NEB scripts
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {MATH_XI_WORKBOOK_TOTALS.longChapters} chapters ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.longSheets} A4 pages ·{" "}
              {MATH_XI_WORKBOOK_TOTALS.longPerSheet} question per page. Three hints, then
              Given → Required → Solution → Conclusion, the marking split and the common pitfall.
            </p>
          </div>
          <a
            href={`${MATH_XI_WORKBOOK_BASE}/long/index.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-700"
          >
            <ExternalLink className="h-4 w-4" />
            Open long answers
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              NEB model papers — {MATH_XI_PAPERS.length} full papers with answer keys
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {MATH_XI_PAPER_MARKS} marks in 3 hours: Group A {MATH_XI_PAPER_GROUPS[0].count} ×{" "}
              {MATH_XI_PAPER_GROUPS[0].per}, Group B {MATH_XI_PAPER_GROUPS[1].count} ×{" "}
              {MATH_XI_PAPER_GROUPS[1].per}, Group C {MATH_XI_PAPER_GROUPS[2].count} ×{" "}
              {MATH_XI_PAPER_GROUPS[2].per}. Two sets per unit — different questions, same grid — each
              followed by the worked answer key.
            </p>
          </div>
          <a
            href={`${MATH_XI_WORKBOOK_BASE}/papers/index.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
          >
            <ExternalLink className="h-4 w-4" />
            Open model papers
          </a>
        </div>
      </section>

      <ol className="space-y-5">
        {MATHEMATICS_XI_UNITS.map((unit) => (
          <li
            key={unit.unitId}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Unit {unit.unitNo} · {unit.hours} teaching hours
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">{unit.unitName}</h2>
              </div>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span>
                  {unit.exerciseCount} exercises · {unit.conceptualCount} conceptual ·{" "}
                  {unit.longAnswerCount} long answers
                </span>
                {(["A", "B"] as const).map((set) => (
                  <a
                    key={set}
                    href={mathXiPaperUrl(unit.unitNo, set)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-rose-500/40 px-1 font-semibold text-rose-700 hover:bg-rose-500/10 dark:text-rose-400"
                    title={`NEB model paper for unit ${unit.unitNo}, Set ${set}`}
                  >
                    paper {set}
                  </a>
                ))}
              </p>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{unit.summary}</p>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {unit.sections.map((section) => (
                <li
                  key={section}
                  className="rounded-full border border-border/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {section}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={mathXiSolutionUrl(unit)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <ExternalLink className="h-4 w-4" />
                Read solutions
              </a>
              <a
                href={mathXiSolutionUrl(unit)}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
              >
                <Download className="h-4 w-4" />
                Download HTML
              </a>
            </div>
          </li>
        ))}
      </ol>

      <section className="rounded-2xl border border-border/60 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5 text-primary" />
          How to use these documents
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Attempt the exercise in your notebook first, with the answer line covered.</li>
          <li>
            Compare only the final answer. If it differs, read the working until the exact step where
            your line diverges.
          </li>
          <li>
            Re-derive that single step on a fresh page. Most lost marks come from one recurring slip,
            not from not knowing the chapter.
          </li>
          <li>
            Use the conceptual bank for viva and 2-mark sections: the model answer is the length the
            examiner expects.
          </li>
          <li>
            For revision, read only the formula sheet and the traps list of each unit — they are
            written to be the last thing you see before the exam.
          </li>
        </ol>
      </section>
    </div>
  );
}
