import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  Layers,
  ListChecks,
  PenLine,
  Sparkles,
} from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { MCQ_BANK } from "@/lib/practice/mcq-bank";
import { WRITING_BANK } from "@/lib/practice/writing-bank";
import { CONTRASTS } from "@/lib/practice/contrasts";
import { getPastPaperCounts } from "@/lib/practice/past-papers";
import { PracticeStats } from "@/components/practice/practice-stats";

/** The solved NEB year files exist for Class 11 only. */
const PAST_PAPER_CLASS = "class-11-notes";

export const metadata: Metadata = {
  title: "Practice — MCQs and Writing, both explained",
  description:
    "Practise NEB Class 11 and 12 with two question types only: four-option MCQs where every option is explained, and writing questions with model answers and concept contrasts.",
};

/** Unique subjects across both classes, in syllabus order. */
const SUBJECTS = (() => {
  const seen = new Set<string>();
  return SYLLABUS.flatMap((cls) =>
    cls.subjects
      .filter((subject) => {
        if (seen.has(subject.slug)) return false;
        seen.add(subject.slug);
        return true;
      })
      .map((subject) => ({
        slug: subject.slug,
        name: subject.name,
        className: cls.name,
        topics: subject.units.reduce((sum, unit) => sum + unit.topics.length, 0),
      })),
  );
})();

const TYPES = [
  {
    icon: ListChecks,
    title: "Multiple choice",
    lead: "Four options, one correct answer.",
    body:
      "The moment you pick, the set locks and all four options explain themselves — why the right one is right and exactly what is wrong with each of the other three.",
    accent: "border-blue-500/25 bg-blue-500/[0.06] text-blue-600 dark:text-blue-400",
  },
  {
    icon: PenLine,
    title: "Writing",
    lead: "A real exam-style answer, marked against a model.",
    body:
      "After you submit you get the full model answer, the marking points, and a contrast table that separates every pair of concepts students fuse together on this question.",
    accent: "border-violet-500/25 bg-violet-500/[0.06] text-violet-600 dark:text-violet-400",
  },
];

export default async function PracticePage() {
  const papers = await getPastPaperCounts(
    PAST_PAPER_CLASS,
    SUBJECTS.map((subject) => subject.slug),
  );
  const solvedPastQuestions = Object.values(papers).reduce(
    (sum, entry) => sum + entry.questions,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7 px-3 py-6 sm:px-4 sm:py-8">
      <header className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Practice</p>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          Two question types. Both explain themselves.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          No True/False guessing and no flip cards. Every MCQ has exactly four options and an
          explanation for each one, and every writing answer comes back with a model answer plus
          the contrast pairs that decide the marks. Each subject also carries its real NEB past
          papers with every question already solved.
        </p>
      </header>

      <PracticeStats />

      <section aria-labelledby="types-heading" className="space-y-3">
        <h2 id="types-heading" className="sr-only">
          Question types
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TYPES.map((type) => (
            <article
              key={type.title}
              className="rounded-2xl border border-border bg-card p-4 sm:p-5"
            >
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${type.accent}`}
              >
                <type.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-sm font-bold text-foreground">{type.title}</h3>
              <p className="text-xs font-semibold text-foreground/80">{type.lead}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{type.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="subjects-heading" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 id="subjects-heading" className="text-lg font-bold tracking-tight">
              Choose a subject
            </h2>
            <p className="text-xs text-muted-foreground">
              {MCQ_BANK.length} MCQs, {WRITING_BANK.length} writing questions and{" "}
              {solvedPastQuestions} solved past questions, hand-checked.
            </p>
          </div>
          <p className="hidden text-[11px] text-muted-foreground sm:block">
            {CONTRASTS.length} confusion pairs covered
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {SUBJECTS.map((subject) => {
            const visual = getSubjectVisual(subject.slug);
            const mcqs = MCQ_BANK.filter((q) => q.subject === subject.slug).length;
            const writings = WRITING_BANK.filter((q) => q.subject === subject.slug).length;
            const paperCount = papers[subject.slug] ?? { years: 0, questions: 0 };
            const available = mcqs + writings + paperCount.questions > 0;
            return (
              <li key={subject.slug}>
                {available ? (
                  <Link
                    href={`/practice/${subject.slug}`}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span aria-hidden="true" className="text-2xl leading-none">
                      {visual.glyph}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-foreground">{subject.name}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-1.5 py-0.5 font-semibold text-blue-600 dark:text-blue-400">
                          <ListChecks className="h-3 w-3" aria-hidden="true" />
                          {mcqs} MCQ
                        </span>
                        <span className="inline-flex items-center gap-1 rounded bg-violet-500/10 px-1.5 py-0.5 font-semibold text-violet-600 dark:text-violet-400">
                          <PenLine className="h-3 w-3" aria-hidden="true" />
                          {writings} writing
                        </span>
                        {paperCount.questions > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                            <FileText className="h-3 w-3" aria-hidden="true" />
                            {paperCount.questions} solved
                          </span>
                        ) : null}
                        <span>{subject.topics} topics</span>
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </Link>
                ) : (
                  <div className="flex h-full items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-4">
                    <span aria-hidden="true" className="text-2xl leading-none opacity-50">
                      {visual.glyph}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-foreground/70">
                        {subject.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Questions for this subject are being written
                      </span>
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="how-heading"
        className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5"
      >
        <h2 id="how-heading" className="flex items-center gap-2 text-sm font-bold">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
          How a session runs
        </h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: CheckCircle2,
              title: "Answer, then read",
              text: "Choose an option or submit your writing. Nothing is revealed before you commit, so the explanation lands after you have thought.",
            },
            {
              icon: BookOpenCheck,
              title: "See every reason",
              text: "MCQs explain all four options. Writing shows the model answer and the marking points side by side with yours.",
            },
            {
              icon: Layers,
              title: "Bank the XP",
              text: "Correct answers earn 10 XP, wrong attempts 2, and an 80% set adds a 25 XP bonus. That total is the leaderboard.",
            },
          ].map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border/70 bg-background p-3">
              <span className="flex items-center gap-2 text-xs font-bold text-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-[11px] text-primary">
                  {index + 1}
                </span>
                <step.icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                {step.title}
              </span>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
