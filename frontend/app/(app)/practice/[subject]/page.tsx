import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Target, BookOpen, Brain, Layers, ChevronRight } from "lucide-react";
import { findSubjectBySlug } from "@/lib/syllabus";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const found = findSubjectBySlug(subject);
  const name = found?.subject.name ?? subject;
  return { title: `${name} — Practice`, description: `Practice ${name} with quizzes, PYQs, and flashcards.` };
}

export default async function SubjectPracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const found = findSubjectBySlug(subject);
  if (!found) notFound();
  const { subject: syllabus, classSlug } = found;

  const modes = [
    {
      href: `/quiz/${subject}`,
      icon: Target,
      title: "Quiz Bank",
      description: "Unit-by-unit PYQ-style questions with worked answers.",
    },
    {
      href: `/class-11-notes/${subject}`,
      icon: BookOpen,
      title: "Study Notes",
      description: `Read the theory notes for ${syllabus.name}.`,
      condition: classSlug === "class-11-notes",
    },
    {
      href: `/class-12-notes/${subject}`,
      icon: BookOpen,
      title: "Study Notes",
      description: `Read the theory notes for ${syllabus.name}.`,
      condition: classSlug === "class-12-notes",
    },
    {
      href: "/srs",
      icon: Layers,
      title: "Flashcards",
      description: "Spaced repetition flashcards from concept notes.",
    },
    {
      href: `/ai-quiz`,
      icon: Brain,
      title: "AI Quiz",
      description: "Adaptive AI-generated questions for this subject.",
    },
  ].filter((m) => m.condition !== false);

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {syllabus.name} — Practice
        </h1>
        <p className="mt-2 text-muted-foreground">
          Choose a practice mode and start strengthening your weak spots in{" "}
          {syllabus.name}.
        </p>
      </div>

      <div className="grid gap-3">
        {modes.map((m) => (
          <Link
            key={`${m.href}-${m.title}`}
            href={m.href}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <m.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{m.title}</p>
              <p className="text-sm text-muted-foreground">{m.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Unit list */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Units</h2>
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
              <span className="flex-1 text-sm font-medium text-foreground">
                {unit.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {unit.topics.length} topics
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/practice"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Practice Hub
      </Link>
    </div>
  );
}
