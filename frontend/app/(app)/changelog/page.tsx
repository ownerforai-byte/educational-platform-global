import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new — feature updates in reverse chronological order.",
};

type Change = {
  version: string;
  date: string;
  type: "feature" | "content" | "fix" | "security";
  entries: string[];
};

const CHANGES: Change[] = [
  {
    version: "2.4.0",
    date: "Nov 2026",
    type: "feature",
    entries: [
      "AI answer citations: Veer AI chat now cites the source note or PYQ behind each academic answer.",
      "Repo hygiene: untracked large build binaries and dead routes removed from the repository.",
    ],
  },
  {
    version: "2.3.0",
    date: "Oct 2026",
    type: "feature",
    entries: [
      "Spaced repetition sync across devices for Plus and Pro members.",
      "Performance cache layer for GET API routes with stale-while-revalidate.",
      "HSTS security headers added to the frontend origin.",
    ],
  },
  {
    version: "2.2.0",
    date: "Oct 2026",
    type: "content",
    entries: [
      "Class 12 Physics AC circuits derivations and PYQs expanded.",
      "Chemistry concept drills for Units 1–3 added to the quiz bank.",
      "Biology 3D lab — cell organelles interactive model.",
    ],
  },
  {
    version: "2.1.0",
    date: "Sep 2026",
    type: "feature",
    entries: [
      "Weekly planner generates a study schedule from your goals and exam date.",
      "Community study spaces: one per class + subject, with discussion threads.",
      "Dead-end ratchet: a CI gate that prevents any new stub page from merging.",
    ],
  },
  {
    version: "2.0.0",
    date: "Sep 2026",
    type: "feature",
    entries: [
      "Tier system migrated: Member, Plus, Pro, Owner replace the old free/premium split.",
      "Section registry: every platform surface has a minimum tier and is gated consistently.",
      "AI spark quota: daily message limits per tier, with a credits wallet for overage.",
    ],
  },
];

const TYPE_STYLES: Record<Change["type"], string> = {
  feature: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  content: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  fix: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  security: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="mt-2 text-muted-foreground">
          Every platform update, new feature and content addition in reverse
          chronological order.
        </p>
      </div>

      <div className="space-y-6">
        {CHANGES.map((c) => (
          <section
            key={c.version}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-foreground">
                v{c.version}
              </span>
              <span className="text-sm text-muted-foreground">{c.date}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_STYLES[c.type]}`}>
                {c.type}
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {c.entries.map((e, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  {e}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Link
        href="/home"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
