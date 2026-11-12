import type { Metadata } from "next";
import { TutorConsole } from "@/components/ai/tutor-console";

export const metadata: Metadata = {
  title: "Veer & Study Assistant — NEB Science",
  description:
    "Veer — NEB Class 11 & 12 study assistant: curriculum-aligned answers with formulas, derivations and study tips.",
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
 * Open from the Member rung up, metered by AI sparks (member 13/day) — not an
 * owner surface since 2026-10-13.
 *
 * ?q= (owner 2026-10-27): the left-side Veer panel routes DEEP questions
 * here automatically ("deep questions auto-lead to the main interface") —
 * the question arrives pre-filled in the composer, ready to send.
 */
export default async function ChatPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const initialQuestion =
    typeof params.q === "string" && params.q.trim() ? params.q.trim().slice(0, 2000) : undefined;

  return (
    <div className="h-full min-h-0 w-full">
      <TutorConsole initialQuestion={initialQuestion} />
    </div>
  );
}
