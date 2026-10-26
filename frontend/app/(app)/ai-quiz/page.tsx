import { Brain, ListChecks, Sparkles, Target } from "lucide-react";
import { QuizStudio } from "@/components/ai/quiz-studio";
import { AiSurfaceHeader } from "@/components/ai/ai-surface-header";
import { AiPlanStrip } from "@/components/ai/ai-plan-strip";

export const metadata = {
  title: "Veer Quiz Generator — NEB Practice",
  description:
    "Generate practice questions from NEB syllabus content with Veer — easy, intermediate, or hard difficulty.",
};

const FEATURES = [
  {
    icon: ListChecks,
    title: "Five quiz formats",
    text: "Multiple choice, true/false, fill in the blank, short answer and full writing tests — pick before you generate.",
  },
  {
    icon: Target,
    title: "Syllabus-scoped",
    text: "Scoped to the official NEB units you choose, at easy, intermediate or hard difficulty.",
  },
  {
    icon: Sparkles,
    title: "AI-graded feedback",
    text: "Writing answers come back with a score, verdict, model answer and an improvement plan per question.",
  },
];

export default function AiQuizPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6">
      {/* Shared AI surface header (plan.md §13) */}
      <AiSurfaceHeader
        icon={Brain}
        title="Veer Quiz Generator"
        subtitle="Generate a practice set in any format, answer it, and get it graded with worked feedback."
        accent="border-blue-500/25 bg-blue-500/10 text-blue-500"
        gradientFrom="from-blue-500/[0.07]"
        crumb="Quiz Generator"
        features={FEATURES}
        meter={<AiPlanStrip />}
      />
      <QuizStudio />
    </div>
  );
}
