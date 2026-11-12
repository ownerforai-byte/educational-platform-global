// Prerendered at build (SSG) — same pattern as the formulas pages: the concept
// JSONs are present in the build workspace, so all 696 topic pages (including
// Devanagari Nepali slugs) ship as static HTML.
export const dynamic = "force-static";
export const dynamicParams = false;
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUnitTopic } from "@/lib/queries";
import { getSubjectLegend, type LegendTopic } from "@/lib/legend";
import { getSubjectSyllabus, slugifySyllabusTopic } from "@/lib/syllabus";
import { EmptyState } from "@/components/content/empty-state";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  ChevronRight,
  Lightbulb,
  BookOpen,
  Zap,
  AlertCircle,
  Calculator,
  BookMarked,
  FileText,
  Timer,
  Scissors,
  History,
} from "lucide-react";

function FactIcon({ type }: { type: string }) {
  switch (type) {
    case "formula":
      return <Calculator className="h-3.5 w-3.5 text-amber-500" />;
    case "definition":
      return <BookMarked className="h-3.5 w-3.5 text-violet-500" />;
    case "tip":
      return <Zap className="h-3.5 w-3.5 text-emerald-500" />;
    case "confusion":
    case "clarification":
      return <AlertCircle className="h-3.5 w-3.5 text-red-500" />;
    default:
      return <FileText className="h-3.5 w-3.5 text-sky-500" />;
  }
}

/**
 * Per-topic "Concepts, Legends & Facts" page — one for every unit/topic of
 * every syllabus topic. Prerendered at build time (SSG) so the Devanagari
 * Nepali slugs and all 696 topic URLs ship as static HTML.
 */
export async function generateStaticParams() {
  const { SYLLABUS, slugifySyllabusTopic } = await import("@/lib/syllabus");
  const params: {
    classSlug: string;
    subjectSlug: string;
    unitId: string;
    topicSlug: string;
  }[] = [];
  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      for (const unit of subject.units) {
        for (const topic of unit.topics) {
          params.push({
            classSlug: cls.slug,
            subjectSlug: subject.slug,
            unitId: unit.id,
            topicSlug: slugifySyllabusTopic(topic),
          });
        }
      }
    }
  }
  return params;
}

export default async function LegendTopicPage({
  params,
}: {
  params: Promise<{
    classSlug: string;
    subjectSlug: string;
    unitId: string;
    topicSlug: string;
  }>;
}) {
  const { classSlug, subjectSlug, unitId, topicSlug } = await params;
  const data = getUnitTopic(classSlug, subjectSlug, unitId, topicSlug);
  if (!data) notFound();

  const { unit, topic } = data;
  const basePath = `/${classSlug}/${subjectSlug}`;
  const topicHref = `${basePath}/chapters/${unit.id}/topics/${topic.slug}`;
  const classLabel = classSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const subjectLabel = getSubjectSyllabus(classSlug, subjectSlug)?.name ?? subjectSlug;

  // Authored concept-JSON entries that map onto this syllabus topic.
  const subjectLegend = await getSubjectLegend(classSlug, subjectSlug);
  const legendUnit = subjectLegend?.units.find((u) => u.unitId === unit.id);
  const entries: LegendTopic[] = (legendUnit?.topics ?? []).filter(
    (t) =>
      t.topicSlug === topic.slug ||
      (t.syllabusTopic ? slugifySyllabusTopic(t.syllabusTopic) === topic.slug : false),
  );
  const notes = entries.flatMap((t) => t.notes);
  const facts = entries.flatMap((t) => t.facts);
  const confusions = entries.flatMap((t) => t.confusions);
  const examShortcuts = entries.flatMap((t) => t.examShortcuts);
  const timeSavers = entries.flatMap((t) => t.timeSavers);
  const practiceQuestions = entries.flatMap((t) => t.practiceQuestions);
  const mcqs = entries.flatMap((t) => t.mcqs);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/legend" className="hover:text-foreground">
          Legend
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/legend/${classSlug}`} className="hover:text-foreground">
          {classLabel}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/legend/${classSlug}/${subjectSlug}`}
          className="hover:text-foreground"
        >
          {subjectLabel}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground truncate">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Unit · {unit.title}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              {topic.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link href={topicHref} className="font-semibold text-primary hover:underline">
                Topic notes
              </Link>
              <span className="text-muted-foreground/40">&bull;</span>
              <Link
                href={`${basePath}/chapters/${unit.id}/topics/${topic.slug}/exercises`}
                className="font-semibold text-primary hover:underline"
              >
                Exercises
              </Link>
              <span className="text-muted-foreground/40">&bull;</span>
              <Link
                href={`${basePath}/chapters/${unit.id}`}
                className="hover:text-foreground hover:underline"
              >
                All topics in this unit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Concepts & notes (from authored concept JSON when present) */}
      <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <BookOpen className="h-4 w-4 text-primary" /> Concepts &amp; Notes
        </h2>
        {notes.length > 0 ? (
          <ul className="space-y-3">
            {notes.map((note, i) => (
              <li
                key={i}
                className="rounded-xl border border-border/50 bg-muted/20 p-3 text-sm leading-relaxed"
              >
                <MathMarkdown content={note} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Concepts will be added in a future update"
            description="Short concept notes for this topic are being prepared and will be added here later."
          />
        )}
      </section>

      {/* Legends & key facts */}
      <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <Lightbulb className="h-4 w-4 text-amber-500" /> Legends &amp; Key Facts
        </h2>
        {facts.length > 0 || confusions.length > 0 ? (
          <div className="space-y-3">
            {facts.map((fact, i) => (
              <div
                key={`fact-${i}`}
                className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-3 text-sm"
              >
                <span className="mt-0.5">
                  <FactIcon type={fact.type} />
                </span>
                <MathMarkdown content={fact.content} />
              </div>
            ))}
            {confusions.map((c, i) => (
              <div
                key={`conf-${i}`}
                className="rounded-xl border border-red-200/60 bg-red-50/40 p-3 text-sm dark:border-red-900/40 dark:bg-red-950/20"
              >
                <p className="flex items-start gap-2 font-semibold text-red-700 dark:text-red-400">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {c.misconception}
                </p>
                <div className="mt-1.5 pl-6">
                  <MathMarkdown content={c.clarification} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Key facts will be added in a future update"
            description="Important facts and common-confusion clarifications for this topic will be added here later."
          />
        )}
      </section>

      {/* Exam shortcuts — authored examShortTricks/examNotes from the concept JSON */}
      <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <Scissors className="h-4 w-4 text-emerald-500" /> Exam Shortcuts
        </h2>
        {examShortcuts.length > 0 ? (
          <ul className="space-y-2.5">
            {examShortcuts.map((trick, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-emerald-200/50 bg-emerald-50/30 p-3 text-sm dark:border-emerald-900/40 dark:bg-emerald-950/20"
              >
                <Scissors className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <MathMarkdown content={trick} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Exam shortcuts will be added in a future update"
            description="Quick, exam-focused shortcuts for this topic are being prepared and will be added here later."
          />
        )}
      </section>

      {/* Time-saving notes — keyPoints/specialNotes/importantNotes/importantConcepts */}
      <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <Timer className="h-4 w-4 text-sky-500" /> Time-Saving Notes
        </h2>
        {timeSavers.length > 0 ? (
          <ul className="space-y-2.5">
            {timeSavers.map((note, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-sky-200/50 bg-sky-50/30 p-3 text-sm dark:border-sky-900/40 dark:bg-sky-950/20"
              >
                <Timer className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
                <MathMarkdown content={note} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Time-saving notes will be added in a future update"
            description="Condensed revision notes that save time in exams will be added here later."
          />
        )}
      </section>

      {/* PYQs with short solutions — practiceQuestions + MCQs from the concept JSON */}
      <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <History className="h-4 w-4 text-violet-500" /> PYQs with Short Solutions
        </h2>
        {practiceQuestions.length > 0 || mcqs.length > 0 ? (
          <div className="space-y-3">
            {practiceQuestions.map((q, i) => (
              <div
                key={`pq-${i}`}
                className="rounded-xl border border-violet-200/50 bg-violet-50/30 p-3 text-sm dark:border-violet-900/40 dark:bg-violet-950/20"
              >
                <MathMarkdown content={q} />
              </div>
            ))}
            {mcqs.map((m, i) => (
              <div
                key={`mcq-${i}`}
                className="rounded-xl border border-border/50 bg-muted/20 p-3 text-sm"
              >
                <MathMarkdown content={m.question} />
                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                  {m.options.map((opt, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <span className="font-mono font-semibold text-foreground/70">
                        {String.fromCharCode(65 + j)}.
                      </span>
                      <MathMarkdown content={opt} />
                    </li>
                  ))}
                </ul>
                {m.answer && (
                  <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Answer: {m.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="PYQ solutions will be added in a future update"
            description="Previous-year questions with short, to-the-point solutions for this topic will be added here later."
            action={{ label: "Browse the PYQ Bank", href: "/pyqs" }}
          />
        )}
      </section>

      {/* Sibling topics in the same unit */}
      {unit.topicEntries.length > 1 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">
            More in {unit.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {unit.topicEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/legend/${classSlug}/${subjectSlug}/${unit.id}/${entry.slug}`}
                className={
                  entry.slug === topic.slug
                    ? "rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                    : "rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary"
                }
              >
                {entry.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer nav */}
      <div className="pt-4 border-t border-border/60">
        <Link
          href={`/legend/${classSlug}/${subjectSlug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span>Back to {subjectLabel} Concepts, Legends &amp; Facts</span>
        </Link>
      </div>
    </div>
  );
}
