"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, BookOpen } from "lucide-react";
import { findSubjectBySlug, getUnitSyllabus } from "@/lib/syllabus";

export default function UnitProgressPage() {
  const params = useParams<{ subject: string; unit: string }>();
  const found = findSubjectBySlug(params.subject);
  if (!found) return null;
  const unit = getUnitSyllabus(found.subject, params.unit);
  if (!unit) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{unit.title}</h1>
        <p className="mt-2 text-muted-foreground">
          Topic completion list and score history for this unit.
        </p>
      </div>

      {/* Topic checklist */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Topics</h2>
        <div className="space-y-2">
          {unit.topics.map((topic, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm"
            >
              <Circle className="h-4 w-4 text-muted-foreground/40" />
              <span className="flex-1 text-sm text-foreground">{topic}</span>
              <span className="text-xs text-muted-foreground">Not studied</span>
            </div>
          ))}
        </div>
      </div>

      {/* Score history placeholder */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Score history</h2>
        <div className="rounded-xl border border-border bg-muted/40 p-6 text-center">
          <CheckCircle2 className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            No quiz attempts yet for this unit.
          </p>
          <Link
            href={`/quiz/${params.subject}/${params.unit}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <BookOpen className="h-4 w-4" />
            Take a quiz
          </Link>
        </div>
      </div>

      <Link
        href={`/progress/${params.subject}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Subject Progress
      </Link>
    </div>
  );
}
