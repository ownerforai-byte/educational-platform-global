"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { SYLLABUS, findSubjectBySlug } from "@/lib/core/syllabus";

export default function SubjectProgressPage() {
  const params = useParams<{ subject: string }>();
  const found = findSubjectBySlug(params.subject);
  if (!found) return null;
  const { subject: syllabus, classSlug } = found;

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {syllabus.name} — Progress
          </h1>
          <p className="mt-1 text-muted-foreground">
            Units completed, topics attempted and accuracy trend for{" "}
            {syllabus.name}.
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold text-foreground">
            {syllabus.units.length}
          </p>
          <p className="text-sm text-muted-foreground">Total units</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-sm text-muted-foreground">Units completed</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold text-foreground">
            {syllabus.units.reduce((s, u) => s + u.topics.length, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Topics available</p>
        </div>
      </div>

      {/* Unit-by-unit progress */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Units</h2>
        <div className="space-y-2">
          {syllabus.units.map((unit, i) => (
            <Link
              key={unit.id}
              href={`/progress/${params.subject}/${unit.id}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
            >
              <Circle className="h-5 w-5 text-muted-foreground/40" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {i + 1}. {unit.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {unit.topics.length} topics
                </p>
              </div>
              <span className="text-xs text-muted-foreground">Not started</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <p className="text-sm text-muted-foreground">
            Complete units in the{" "}
            <Link
              href={`/${classSlug}/${params.subject}`}
              className="font-medium text-primary hover:underline"
            >
              {syllabus.name} notes
            </Link>{" "}
            to track progress here.
          </p>
        </div>
      </div>

      <Link
        href="/progress"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Progress
      </Link>
    </div>
  );
}
