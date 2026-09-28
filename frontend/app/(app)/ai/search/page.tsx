import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Search, Sparkles, FileSearch } from "lucide-react";
import { SmartSearchPanel } from "@/components/ai/smart-search-panel";

export const metadata: Metadata = {
  title: "AI Curriculum Search — Notes, Labs & PYQs in Plain Language",
  description:
    "Ask a question in plain language and get the notes, labs, graphs and past questions that answer it, each with a direct link on Ravikisan's Platform.",
};

/**
 * /ai/search — AI curriculum search, on its own page.
 *
 * Promoted out of the old three-tab AI studio so it can be linked, bookmarked
 * and opened directly at /ai/search.
 */
const FEATURES = [
  {
    icon: Compass,
    title: "Ask naturally",
    text: "“numericals on projectile motion” works — no keyword syntax to learn.",
  },
  {
    icon: FileSearch,
    title: "Whole platform",
    text: "Notes, labs, graphs, practicals and question banks are searched together.",
  },
  {
    icon: Sparkles,
    title: "Links, not summaries",
    text: "Every match comes with the page to open, so you keep reading in context.",
  },
];

export default function AISearchPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 py-6 sm:py-10 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          AI Studio
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-xs font-semibold text-foreground">AI Curriculum Search</span>
      </div>

      {/* Header */}
      <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-emerald-500/[0.07] via-card to-card p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10">
            <Search className="h-5 w-5 text-emerald-500" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">AI Curriculum Search</h1>
            <p className="text-xs text-muted-foreground">
              One search across notes, labs, graphs, practicals and question banks.
            </p>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.title} className="rounded-xl border border-border/60 bg-card/80 p-3">
                <Icon className="h-3.5 w-3.5 text-emerald-500" />
                <p className="mt-1.5 text-xs font-bold text-foreground">{f.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{f.text}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The search engine itself */}
      <SmartSearchPanel />
    </div>
  );
}
