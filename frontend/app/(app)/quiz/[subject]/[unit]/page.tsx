import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ListChecks, Target } from "lucide-react";
import { findSubjectBySlug, getUnitSyllabus } from "@/lib/syllabus";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}): Promise<Metadata> {
  const { subject, unit } = await params;
  const found = findSubjectBySlug(subject);
  const unitSyllabus = found ? getUnitSyllabus(found.subject, unit) : undefined;
  return {
    title: unitSyllabus ? `${unitSyllabus.title} — Quiz` : "Unit Quiz",
    description: `Practice quiz for ${unitSyllabus?.title ?? unit}.`,
  };
}

export default async function UnitQuizPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}) {
  const { subject, unit } = await params;
  const found = findSubjectBySlug(subject);
  if (!found) notFound();
  const unitSyllabus = getUnitSyllabus(found.subject, unit);
  if (!unitSyllabus) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {unitSyllabus.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Timed quiz for this unit with worked answers. Choose a mode below.
        </p>
      </div>

      {/* Quiz mode cards */}
      <div className="grid gap-3">
        <Link
          href={`/quiz?subject=${subject}&unit=${unit}`}
          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Target className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Start PYQ quiz</p>
            <p className="text-sm text-muted-foreground">
              Past-year questions from this unit, with worked answers and
              auto-scoring.
            </p>
          </div>
        </Link>

        <Link
          href={`/quiz?subject=${subject}&unit=${unit}&mode=misconception`}
          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ListChecks className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Misconception check</p>
            <p className="text-sm text-muted-foreground">
              True/false statements that target common misconceptions in this
              unit.
            </p>
          </div>
        </Link>

        <Link
          href={`/quiz?subject=${subject}&unit=${unit}&mode=concepts`}
          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Concept drill</p>
            <p className="text-sm text-muted-foreground">
              Quick concept-clearing questions for this unit&apos;s core topics.
            </p>
          </div>
        </Link>
      </div>

      {/* Topic list for this unit */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Topics in this unit
        </h2>
        <div className="flex flex-wrap gap-2">
          {unitSyllabus.topics.map((t, i) => (
            <span
              key={i}
              className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/quiz/${subject}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Subject Quiz
      </Link>
    </div>
  );
}
