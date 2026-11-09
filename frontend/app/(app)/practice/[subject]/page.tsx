import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  FileText,
  ListChecks,
  PenLine,
  Sparkles,
} from "lucide-react";
import { findSubjectBySlug } from "@/lib/syllabus";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { mcqQuestionsForSubject } from "@/lib/practice/mcq-bank";
import { writingQuestionsForSubject } from "@/lib/practice/writing-bank";
import { resolveContrasts, contrastIdsForSubject } from "@/lib/practice/contrasts";
import { getSubjectPastPapers } from "@/lib/practice/past-papers";
import { PyqYearCard } from "@/components/content/pyq-card";

/** The solved NEB year files exist for Class 11 only. */
const PAST_PAPER_CLASS = "class-11-notes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const found = findSubjectBySlug(subject);
  const name = found?.subject.name ?? subject;
  return {
    title: `${name} — Practice`,
    description: `Practise ${name} with four-option MCQs where every option is explained, and writing questions with model answers and concept contrasts.`,
  };
}

export default async function SubjectPracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const found = findSubjectBySlug(subject);
  if (!found) notFound();

  const name = found.subject.name;
  const visual = getSubjectVisual(found.subject.slug);
  const mcqs = mcqQuestionsForSubject(found.subject.slug);
  const writings = writingQuestionsForSubject(found.subject.slug);
  const pairs = resolveContrasts(contrastIdsForSubject(found.subject.slug));
  const topics = [...new Set([...mcqs, ...writings].map((q) => q.topic))];
  const papers = await getSubjectPastPapers(PAST_PAPER_CLASS, found.subject.slug);
  const paperQuestions = papers.reduce((sum, paper) => sum + paper.questions.length, 0);

  const modes = [
    {
      mode: "mcq" as const,
      icon: ListChecks,
      title: "Multiple choice",
      count: mcqs.length,
      unit: "questions",
      detail:
        "Exactly four options each. After you choose, all four options are explained in plain language.",
      accent: "border-blue-500/25 bg-blue-500/[0.06] text-blue-600 dark:text-blue-400",
    },
    {
      mode: "writing" as const,
      icon: PenLine,
      title: "Writing",
      count: writings.length,
      unit: "questions",
      detail:
        "Exam-style answers with a full model answer, the marking points, and a contrast table of the concepts students mix up.",
      accent: "border-violet-500/25 bg-violet-500/[0.06] text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-3 py-6 sm:px-4 sm:py-8">
      <nav aria-label="Breadcrumb">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Practice
        </Link>
      </nav>

      <header className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-3xl leading-none"
        >
          {visual.glyph}
        </span>
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mcqs.length} MCQs · {writings.length} writing questions ·{" "}
            {pairs.length} confusion pairs covered
            {paperQuestions > 0 ? ` · ${paperQuestions} solved past questions` : null}
          </p>
        </div>
      </header>

      <section aria-labelledby="modes-heading" className="space-y-3">
        <h2 id="modes-heading" className="sr-only">
          Practice modes
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {modes.map((item) => {
            const available = item.count > 0;
            return (
              <article
                key={item.mode}
                className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${item.accent}`}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-xs font-semibold text-muted-foreground">
                  {item.count} {item.unit}
                </p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
                {available ? (
                  <Link
                    href={`/practice/session?mode=${item.mode}&subject=${found.subject.slug}`}
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Start {item.title.toLowerCase()}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ) : (
                  <p className="mt-4 rounded-xl border border-dashed border-border px-4 py-2 text-center text-xs text-muted-foreground">
                    Questions for this mode are being written
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {papers.length > 0 && (
        <section aria-labelledby="papers-heading" className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
            <h2 id="papers-heading" className="text-sm font-bold">
              Past papers — every question solved
            </h2>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {paperQuestions} real NEB questions from {papers.length} exam
            {papers.length === 1 ? " year" : " years"}. Open a year, attempt a question on
            paper, then reveal its worked solution and check your reasoning against it.
          </p>
          <div className="space-y-2">
            {papers.map((paper) => (
              <PyqYearCard key={paper.year} year={paper.year} pyq={paper} />
            ))}
          </div>
        </section>
      )}

      {pairs.length > 0 && (
        <section aria-labelledby="confusions-heading" className="space-y-3">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <h2 id="confusions-heading" className="text-sm font-bold">
              Confusions this subject clears
            </h2>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {pairs.map((pair) => (
              <li
                key={pair.id}
                className="rounded-xl border border-border bg-card p-3 text-xs leading-relaxed"
              >
                <p className="font-bold text-foreground">
                  {pair.a} <span className="font-normal text-muted-foreground">vs</span> {pair.b}
                </p>
                <p className="mt-1 text-muted-foreground">{pair.difference}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {topics.length > 0 && (
        <section aria-labelledby="topics-heading" className="space-y-2">
          <h2 id="topics-heading" className="text-sm font-bold">
            Topics covered
          </h2>
          <ul className="flex flex-wrap gap-1.5">
            {topics.map((topic) => (
              <li
                key={topic}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                <Sparkles className="h-3 w-3 text-primary/70" aria-hidden="true" />
                {topic}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
