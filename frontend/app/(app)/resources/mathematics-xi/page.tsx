import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Download, ExternalLink, FileText } from "lucide-react";
import {
  MATHEMATICS_XI_SOLUTIONS,
  MATHEMATICS_XI_TOTALS,
  MATHEMATICS_XI_UNITS,
  mathXiSolutionUrl,
} from "@/lib/mathematics-xi-solutions";

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
              <p className="text-xs text-muted-foreground">
                {unit.exerciseCount} exercises · {unit.conceptualCount} conceptual ·{" "}
                {unit.longAnswerCount} long answers
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
