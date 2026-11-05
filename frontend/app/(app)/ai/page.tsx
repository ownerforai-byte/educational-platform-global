import type { Metadata } from "next";
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
      </header>

      <AiPlanStrip />
      <AiToolsDirectory subjects={subjects} />
    </div>
  );
}
