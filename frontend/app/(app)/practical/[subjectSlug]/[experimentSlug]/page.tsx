"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import {
  getPracticalBySlug,
  findExperimentBySlug,
} from "@/lib/practical-syllabus";
import { PracticalNotebookView } from "@/components/practical/practical-notebook-view";

/**
 * Deep page for one practical experiment. The full NEB practical-record
 * write-up (aim, apparatus, theory, procedure, observations, calculations,
 * result, precautions) lives here on its own URL
 * (`/practical/[subjectSlug]/[experimentSlug]`) instead of expanding inline on
 * the subject listing page.
 */
export default function PracticalExperimentPage({
  params,
}: {
  params: Promise<{ subjectSlug: string; experimentSlug: string }>;
}) {
  const { subjectSlug, experimentSlug } = use(params);
  const subject = getPracticalBySlug(subjectSlug);
  const found = subject ? findExperimentBySlug(subject, experimentSlug) : null;

  if (!subject || !found) {
    return (
      <div className="mx-auto max-w-5xl py-20 px-4 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <FlaskConical className="h-7 w-7" />
        </div>
        <p className="text-xl font-bold text-foreground">Practical Experiment Not Found</p>
        <Link
          href="/practical"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to All Practical Subjects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6 md:py-10 px-4 sm:px-6">
      {/* Back link & unit context */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/practical/${subject.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> {subject.name} Practicals
        </Link>
        <span className="text-xs font-semibold text-muted-foreground">
          {found.unit.title} ·{" "}
          {found.unit.grade === "class-11" ? "NEB Class 11" : "NEB Class 12"}
        </span>
      </div>

      <PracticalNotebookView
        experiment={found.experiment}
        subjectName={subject.name}
        unitTitle={found.unit.title}
      />
    </div>
  );
}
