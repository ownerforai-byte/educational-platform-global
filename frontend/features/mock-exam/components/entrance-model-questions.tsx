"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import type { EntranceQuestion } from "@/lib/entrance-questions";
import {
  DocPaper,
  DocToolbar,
  DocSectionHeading,
  getDocFontClass,
  type DocFontSize,
} from "@/features/docs/academic-doc-layout";

/**
 * Entrance model-question sheet — the shared body for
 * `/exams/{cee,ioe}/[subject]/model-questions` (URL parity with the NEB
 * track's `/exams/neb/[subject]/model-questions`).
 *
 * Integrated with the platform Docs Viewer layout for clean reading,
 * font resizing, and PDF export.
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
  const [fontSize, setFontSize] = useState<DocFontSize>("base");
  const fontClass = getDocFontClass(fontSize);
  const total = units.reduce((n, u) => n + u.questions.length, 0);

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-8 md:py-12 px-4">
      {/* Top back navigation */}
      <div className="print:hidden">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </div>

      <DocPaper ariaLabel={`${subjectName} ${trackLabel} Model Questions`}>
        <DocToolbar
          badge={`Docs Viewer · ${trackName.toUpperCase()} Entrance Model Questions`}
          title={`${subjectName} — ${trackLabel} Model Questions`}
          subtitle={`${total} entrance-style MCQs from the authored ${trackName} bank in official curriculum order.`}
          metadata={[
            { label: trackLabel, tone: "primary" },
            { label: `${total} Questions`, tone: "emerald" },
            { label: `${units.length} Units`, tone: "sky" },
          ]}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />

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
          units.map((unit, unitIdx) => (
            <section
              key={`${unit.classLabel}-${unit.unitTitle}`}
              aria-label={unit.unitTitle}
              className="space-y-4 pt-4 first:pt-0"
            >
              <DocSectionHeading
                id={`unit-${unitIdx + 1}`}
                tone="text-foreground"
              >
                <span>{unit.unitTitle}</span>
                <span className="text-xs font-normal text-muted-foreground ml-auto">
                  {unit.classLabel} · {unit.questions.length}{" "}
                  {unit.questions.length === 1 ? "question" : "questions"}
                </span>
              </DocSectionHeading>

              <ol className="space-y-3">
                {unit.questions.map((question, index) => (
                  <li
                    key={`${unit.unitTitle}-${index}`}
                    className="rounded-2xl border border-border bg-card p-4 shadow-2xs print:break-inside-avoid"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className={`font-semibold text-foreground ${fontClass}`}>
                        <span className="mr-1.5 text-muted-foreground">Q{index + 1}.</span>
                        {question.q}
                      </p>
                      {question.exam && (
                        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {question.exam}
                        </span>
                      )}
                    </div>

                    <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          className="rounded-lg border border-border/60 px-2.5 py-1.5 text-xs text-muted-foreground"
                        >
                          <span className="mr-1.5 font-bold text-foreground">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          {option}
                        </li>
                      ))}
                    </ul>

                    <details className="mt-3 print:open">
                      <summary className="cursor-pointer text-xs font-semibold text-primary hover:underline">
                        Show answer &amp; trick
                      </summary>
                      <p className="mt-1.5 rounded-lg bg-primary/5 px-3 py-2 text-xs text-foreground leading-relaxed border border-primary/20">
                        <span className="font-bold text-primary">
                          {String.fromCharCode(65 + question.answer)}.
                        </span>{" "}
                        <span className="font-medium">{question.options[question.answer]}</span>
                        {" — "}
                        <span className="text-muted-foreground">{question.why}</span>
                      </p>
                    </details>
                  </li>
                ))}
              </ol>
            </section>
          ))
        )}
      </DocPaper>
    </div>
  );
}
