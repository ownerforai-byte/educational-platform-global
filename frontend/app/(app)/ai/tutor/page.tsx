import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, History, Plus, Search, Sparkles } from "lucide-react";
import { AIChatInterface } from "@/components/ai/ai-chat-interface";
import { AiToolShell } from "@/components/ai/ai-tool-shell";
import { AiPlanStrip } from "@/components/ai/ai-plan-strip";
import { StudySuggestionsPanel } from "@/components/content/study-suggestions-panel";

export const metadata: Metadata = {
  title: "Veer Tutor Console — Saved Conversations & Prompt Enhancer",
  description:
    "The long-form Veer tutor console for NEB Class 11 & 12: keep separate conversations, restore your history on any device, and improve a rough question before sending it.",
};

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
    <AiToolShell
      icon={Bot}
      title="Veer Tutor Console"
      description="Saved conversations, prompt enhancer and full answer history for signed-in students."
      accent="border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400"
      current="/ai/tutor"
      meter={<AiPlanStrip />}
      features={FEATURES}
    >
      <AIChatInterface />

      <div className="mt-4">
        <StudySuggestionsPanel />
      </div>

      {/* The console ANSWERS; the history console SEARCHES what was already
          discussed. Linking them is the point of having both. */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10">
            <Search className="h-4 w-4 text-sky-500" aria-hidden="true" />
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
          className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-600 transition-colors hover:bg-sky-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-sky-400"
        >
          Search history
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </AiToolShell>
  );
}
