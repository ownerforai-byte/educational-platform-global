import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Sparkles } from "lucide-react";
import type { EntranceQuestion } from "@/lib/entrance-questions";

/**
 * Entrance model-question sheet — the shared body for
 * `/exams/{cee,ioe}/[subject]/model-questions` (URL parity with the NEB
 * track's `/exams/neb/[subject]/model-questions`).
 *
 * Questions come from the authored entrance bank
 * (`lib/entrance-questions`, one set per syllabus unit). Each question keeps
 * its exam tag ("CEE 2080", "IOE 2079") and the one-line solving trick, both
 * revealed on demand so the page doubles as a self-test.
 */

export interface ModelQuestionUnit {
  classLabel: string;
  unitTitle: string;
  questions: EntranceQuestion[];
}

export function EntranceModelQuestions({
  trackName,
  trackLabel,
  subjectName,
  units,
  backHref,
  backLabel,
}: {
  trackName: string;
  trackLabel: string;
  subjectName: string;
  units: ModelQuestionUnit[];
  backHref: string;
  backLabel: string;
}) {
  const total = units.reduce((n, u) => n + u.questions.length, 0);

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {subjectName} — {trackLabel} Model Questions
          </h1>
          <p className="mt-1 text-muted-foreground">
            {total} entrance-style MCQs from the authored {trackName} bank, in
            syllabus order. Reveal the trick after you commit to an answer.
          </p>
        </div>
      </div>

      {units.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <BookOpenCheck className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-3 text-base font-bold text-foreground">No model questions yet</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            The {subjectName} entrance set is still being authored. Study the notes
            meanwhile — questions appear here as the bank grows.
          </p>
        </div>
      ) : (
        units.map((unit) => (
          <section
            key={`${unit.classLabel}-${unit.unitTitle}`}
            aria-label={unit.unitTitle}
            className="space-y-3"
          >
            <div className="flex items-baseline justify-between gap-2 border-b border-border pb-2">
              <h2 className="text-base font-bold text-foreground">{unit.unitTitle}</h2>
              <span className="text-xs text-muted-foreground">
                {unit.classLabel} · {unit.questions.length}{" "}
                {unit.questions.length === 1 ? "question" : "questions"}
              </span>
            </div>

            <ol className="space-y-2">
              {unit.questions.map((question, index) => (
                <li
                  key={`${unit.unitTitle}-${index}`}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">
                      <span className="mr-1.5 text-muted-foreground">Q{index + 1}.</span>
                      {question.q}
                    </p>
                    {question.exam && (
                      <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {question.exam}
                      </span>
                    )}
                  </div>

                  <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <li
                        key={optionIndex}
                        className="rounded-lg border border-border/60 px-2.5 py-1.5 text-xs text-muted-foreground"
                      >
                        <span className="mr-1.5 font-bold">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </li>
                    ))}
                  </ul>

                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-semibold text-primary">
                      Show answer &amp; trick
                    </summary>
                    <p className="mt-1.5 rounded-lg bg-primary/5 px-3 py-2 text-xs text-foreground">
                      <span className="font-bold">
                        {String.fromCharCode(65 + question.answer)}.
                      </span>{" "}
                      {question.options[question.answer]} — {question.why}
                    </p>
                  </details>
                </li>
              ))}
            </ol>
          </section>
        ))
      )}

      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
    </div>
  );
}
