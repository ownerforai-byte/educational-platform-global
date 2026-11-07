import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { findSubjectBySlug } from "@/lib/syllabus";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const found = findSubjectBySlug(subject);
  return {
    title: found ? `${found.subject.name} Quiz` : "Subject Quiz",
    description: `Practice quiz for ${found?.subject.name ?? subject}.`,
  };
}

export default async function SubjectQuizPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const found = findSubjectBySlug(subject);
  if (!found) notFound();
  const { subject: syllabus } = found;

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {syllabus.name} Quiz
        </h1>
        <p className="mt-2 text-muted-foreground">
          Unit-by-unit quiz sets with past-year questions and worked answers.
        </p>
      </div>

      {/* Full-subject quiz link */}
      <Link
        href={`/quiz?subject=${subject}`}
        className="flex items-start gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 shadow-sm transition-colors hover:bg-primary/10"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">Full subject quiz</p>
          <p className="text-sm text-muted-foreground">
            Start a mixed quiz covering all units of {syllabus.name}.
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-primary" />
      </Link>

      {/* Unit list */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Quiz by unit
        </h2>
        <div className="space-y-2">
          {syllabus.units.map((unit, i) => (
            <Link
              key={unit.id}
              href={`/quiz/${subject}/${unit.id}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {unit.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {unit.topics.length} topics
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/quiz"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Quiz Bank
      </Link>
    </div>
  );
}
