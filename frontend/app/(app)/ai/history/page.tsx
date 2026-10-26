import type { Metadata } from "next";
import { History, Search, NotebookPen } from "lucide-react";
import { HistoryConsole } from "@/components/ai/history-console";
import { AiSurfaceHeader } from "@/components/ai/ai-surface-header";

export const metadata: Metadata = {
  title: "Veer History Console — Search Your Saved Conversations",
  description:
    "Search your own saved Veer conversations and have them presented as asked: what you discussed, where it started, what was left unfinished.",
};

/**
 * /ai/history — the history console (owner request 2026-09-30).
 *
 * A separate interface from the tutor console on purpose: /ai/tutor ANSWERS
 * questions, this one SEARCHES the student's own saved conversations and
 * presents what it finds. Signed-in only and free — a history search spends no
 * coin — and guests are blocked in the component and again by requireAuth on
 * the endpoint, so the rule cannot be bypassed from the browser.
 *
 * Route is not in lib/navigation.ts, so it is not advertised in the site index
 * or on the home page; it is reached from the AI Studio hub and the console.
 */
const FEATURES = [
  {
    icon: Search,
    title: "Search in your own words",
    text: "Ask about a topic, a formula or a stray thought — the search runs over your saved messages, not the model's memory.",
  },
  {
    icon: History,
    title: "Presented, not dumped",
    text: "Matches come back conversation by conversation, in the order they happened, each with the thread it came from.",
  },
  {
    icon: NotebookPen,
    title: "What is still open",
    text: "Unfinished derivations and unanswered questions are called out, so a thread you dropped is easy to pick up again.",
  },
];

export default function AIHistoryPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 py-4 sm:px-4 sm:py-6">
      {/* Shared AI surface header (plan.md §13) */}
      <AiSurfaceHeader
        icon={History}
        title="Veer History Console"
        subtitle="Search your saved conversations and have them presented as asked — signed in, and free."
        accent="border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-500"
        gradientFrom="from-fuchsia-500/[0.07]"
        crumb="History Console"
        features={FEATURES.map((f) => ({ icon: f.icon, title: f.title, text: f.text }))}
      />

      <HistoryConsole />
    </div>
  );
}
