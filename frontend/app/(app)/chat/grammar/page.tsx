import type { Metadata } from "next";
import { TutorConsole } from "@/components/ai/tutor-console";

export const metadata: Metadata = {
  title: "Grammar Console — Veer, NEB Class 11 & 12",
  description:
    "Veer's English grammar console for NEB Class 11 & 12 — word, phrase, clause and sentence taught origin-first, with citations and a mastery plan.",
};

/**
 * Deep link for the English grammar chat console: the same TutorConsole as
 * /chat, with the Grammar mode preselected (and persisted, exactly as if the
 * chip had been tapped). Shared links and the nav entry land here.
 */
export default function GrammarChatPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6">
      <TutorConsole initialConsole="grammar" />
    </div>
  );
}
