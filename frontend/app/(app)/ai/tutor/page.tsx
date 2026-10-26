import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, History, Plus, Search, Sparkles } from "lucide-react";
import { AIChatInterface } from "@/components/ai/ai-chat-interface";
import { AiSurfaceHeader } from "@/components/ai/ai-surface-header";
import { StudySuggestionsPanel } from "@/components/content/study-suggestions-panel";

export const metadata: Metadata = {
  title: "Veer Tutor Console — Saved Conversations & Prompt Enhancer",
  description:
    "The long-form Veer tutor console for NEB Class 11 & 12: keep separate conversations, restore your history on any device, and improve a rough question before sending it.",
};

/**
 * /ai/tutor — the tutor console, on its own page.
 *
 * Features that live here and nowhere else: the conversation list with
 * New conversation, account-backed history, and the prompt enhancer. The
 * quick assistant (subject modes + answer quick actions) is /chat; the quiz
 * generator is /ai-quiz; curriculum search is /ai/search.
 */
const FEATURES = [
  {
    icon: History,
    title: "Conversation list",
    text: "Every thread is kept, named and re-openable — no scrolling one endless chat.",
  },
  {
    icon: Plus,
    title: "New conversation",
    text: "Start a clean thread for a new subject without losing the last one.",
  },
  {
    icon: Sparkles,
    title: "Prompt enhancer",
    text: "Rough question? Rewrite it into a precise, exam-shaped prompt first.",
  },
];

export default function AITutorPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6">
      {/* Shared AI surface header (plan.md §13) */}
      <AiSurfaceHeader
        icon={Bot}
        title="Veer Tutor Console"
        subtitle="Saved conversations, prompt enhancer and full answer history for signed-in students."
        accent="border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-500"
        gradientFrom="from-fuchsia-500/[0.07]"
        crumb="Veer Tutor Console"
        features={FEATURES.map((f) => ({ icon: f.icon, title: f.title, text: f.text }))}
      />

      <AIChatInterface />

      <div className="mt-4">
        <StudySuggestionsPanel />
      </div>

      {/* Owner request (2026-09-30): the console ANSWERS, the history console
          SEARCHES what you already discussed. Linking the two is the whole
          point of having them side by side. */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10">
            <Search className="h-4 w-4 text-sky-500" />
          </span>
          <div>
            <p className="text-xs font-bold text-foreground">
              Looking for something you already discussed?
            </p>
            <p className="text-[11px] text-muted-foreground">
              The history console searches your saved conversations and presents them back.
            </p>
          </div>
        </div>
        <Link
          href="/ai/history"
          className="inline-flex items-center gap-1.5 rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-600 transition-colors hover:bg-sky-500/15 dark:text-sky-400"
        >
          Search history
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
