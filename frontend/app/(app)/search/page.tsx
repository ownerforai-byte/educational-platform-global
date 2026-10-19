import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, FileSearch, Search, Sparkles } from "lucide-react";
import { SmartSearchPanel } from "@/components/ai/smart-search-panel";

export const metadata: Metadata = {
  title: "Search — Notes, Labs, PYQs & Derivations on Ravikisan's Platform",
  description:
    "One search across syllabus notes, interactive labs, derivations, practicals, past questions and the whole curriculum. Powered by Veer.",
};

/**
 * Global search — the single surface the global search bar, footer, mobile
 * quick nav and quick access bar all route to. Uses the Veer-powered
 * SmartSearchPanel which searches notes, labs, graphs, practicals, PYQs and
 * derivations together with a syllabus pointer when the DB has nothing direct.
 *
 * The old /ai/search route now redirects here so bookmarks keep working.
 */
const FEATURES = [
  {
    icon: Compass,
    title: "Ask naturally",
    text: "\"numericals on projectile motion\" works — no keyword syntax.",
  },
  {
    icon: FileSearch,
    title: "Whole platform",
    text: "Notes, labs, graphs, practicals and PYQs searched together.",
  },
  {
    icon: Sparkles,
    title: "Links, not summaries",
    text: "Every match carries its page so you keep reading in context.",
  },
];

export default function SearchPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 py-6 sm:py-10 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-xs font-semibold text-foreground">Search</span>
      </div>

      {/* Header */}
      <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-emerald-500/[0.07] via-card to-card p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10">
            <Search className="h-5 w-5 text-emerald-500" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">Search the curriculum</h1>
            <p className="text-xs text-muted-foreground">
              Notes, labs, derivations, practicals and past questions — one surface, plain-language queries.
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
