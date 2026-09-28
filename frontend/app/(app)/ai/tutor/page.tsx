import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bot, History, Plus, Sparkles } from "lucide-react";
import { AIChatInterface } from "@/components/ai/ai-chat-interface";

export const metadata: Metadata = {
  title: "Captain Tutor Console — Saved Conversations & Prompt Enhancer",
  description:
    "The long-form Captain tutor console for NEB Class 11 & 12: keep separate conversations, restore your history on any device, and improve a rough question before sending it.",
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
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-3">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          AI Studio
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-xs font-semibold text-foreground">Captain Tutor Console</span>
      </div>

      {/* Header + its own feature list */}
      <div className="mb-4 rounded-2xl border border-border/70 bg-gradient-to-br from-fuchsia-500/[0.07] via-card to-card p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-500/25 bg-fuchsia-500/10">
            <Bot className="h-5 w-5 text-fuchsia-500" />
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">Captain Tutor Console</h1>
            <p className="text-xs text-muted-foreground">
              Saved conversations, prompt enhancer and full answer history for signed-in students.
            </p>
          </div>
        </div>

        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.title} className="rounded-xl border border-border/60 bg-card/80 p-3">
                <Icon className="h-3.5 w-3.5 text-fuchsia-500" />
                <p className="mt-1.5 text-xs font-bold text-foreground">{f.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{f.text}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <AIChatInterface />
    </div>
  );
}
