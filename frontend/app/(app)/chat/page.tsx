import type { Metadata } from "next";
import { TutorConsole } from "@/components/ai/tutor-console";

export const metadata: Metadata = {
  title: "Veer & Study Assistant — NEB Science",
  description:
    "Veer — ask any NEB Class 11 & 12 doubt and get a curriculum-aligned answer with formulas, derivations and study tips.",
};

/**
 * The AI Tutor's own dedicated interface (TutorConsole) — separate from the
 * AI Studio tab shell at /ai, which keeps the classic AIChatInterface.
 *
 * Its own features: subject-mode picker (Physics/Chemistry/Biology/Math),
 * per-answer quick actions (copy / regenerate / deeper / shorter), thread
 * summarize, and a chat → AI-quiz handoff. The green "online" ping dot in
 * the header is kept exactly as it has always been.
 *
 * Public and free: guests share the 5/day pool with the AI quiz.
 */
export default function ChatPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6">
      <TutorConsole />
    </div>
  );
}
