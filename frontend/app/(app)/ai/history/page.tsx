import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, History, Search, NotebookPen } from "lucide-react";
import { HistoryConsole } from "@/components/ai/history-console";

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
        <span className="text-xs font-semibold text-foreground">History Console</span>
      </div>

      {/* Header */}
      <div className="mb-4 rounded-2xl border border-border/70 bg-gradient-to-br from-fuchsia-500/[0.07] via-card to-card p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-500/25 bg-fuchsia-500/10">
            <History className="h-5 w-5 text-fuchsia-500" />
          </span>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Veer History Console</h1>
            <p className="text-xs text-muted-foreground">
              Search your saved conversations and have them presented as asked — signed in,
              and free.
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

      <HistoryConsole />
    </div>
  );
}
