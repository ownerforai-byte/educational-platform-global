import type { Metadata } from "next";
import { TutorConsole } from "@/components/ai/tutor-console";

export const metadata: Metadata = {
  title: "Veer & Study Assistant — NEB Science",
  description:
    "Veer — owner-only NEB Class 11 & 12 study assistant: curriculum-aligned answers with formulas, derivations and study tips.",
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
 * Owner emails only (owner request 2026-10-05): chat/layout.tsx bounces
 * everyone else, and POST /api/ai enforces the same boundary.
 */
export default function ChatPage() {
  return (
    <div className="-mx-4 -mt-6 md:-mx-6 lg:-mx-8">
      <TutorConsole />
    </div>
  );
}
