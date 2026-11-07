import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { AiPlanStrip } from "@/components/ai/ai-plan-strip";
import { AiToolsDirectory } from "@/components/ai/ai-tools-directory";
import { SUBJECT_CLASSROOMS } from "@/lib/ai/subject-classrooms";

export const metadata: Metadata = {
  title: "AI Tools — Ravikisan's Platform",
  description:
    "Browse Veer AI assistants, subject classrooms, study tools and creative interfaces.",
};

export default function AIStudioPage() {
  const subjects = SUBJECT_CLASSROOMS.map(({ slug, title, tagline }) => ({
    slug,
    title,
    description: tagline,
  }));

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 px-3 py-5 sm:px-4 sm:py-8">
      <header className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Veer AI Studio
        </p>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">AI Tools</h1>
        <p className="text-sm text-muted-foreground">
          Choose an assistant or classroom for the way you want to study.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/ai/workspace"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            Open the workspace
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/ai/subjects"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Subject classrooms
          </Link>
        </div>
      </header>

      <AiPlanStrip />
      <AiToolsDirectory subjects={subjects} />
    </div>
  );
}
