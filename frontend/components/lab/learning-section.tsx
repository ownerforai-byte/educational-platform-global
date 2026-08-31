"use client";

/**
 * LabLearningSection — the standard content structure rendered BELOW every
 * lab animation, everywhere in the Lab.
 *
 * Sections:
 *   1. Non-General Proof — worked proof on a concrete case (numbers, not symbols)
 *   2. Theory — concise conceptual backbone
 *   3. Confusion Clarity — misconception vs reality pairs
 *   4. Practice Questions — click-to-reveal answers with hints
 *
 * Content comes from lib/lab-learning.ts keyed by lab id. Labs without a
 * pack yet render a graceful "learning pack in progress" placeholder.
 */

import { useState } from "react";
import { ChevronDown, FlaskConical, Lightbulb, Sigma, TriangleAlert, BookOpen, Brain } from "lucide-react";
import { getLabLearning } from "@/lib/lab-learning";
import { DateBadge } from "@/components/content/date-badge";

type Tab = "proof" | "theory" | "confusions" | "practice";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "proof", label: "Non-General Proof", icon: <Sigma className="h-4 w-4" /> },
  { id: "theory", label: "Theory", icon: <BookOpen className="h-4 w-4" /> },
  { id: "confusions", label: "Confusion Clarity", icon: <Brain className="h-4 w-4" /> },
  { id: "practice", label: "Practice Questions", icon: <FlaskConical className="h-4 w-4" /> },
];

export function LabLearningSection({ labId }: { labId: string }) {
  const pack = getLabLearning(labId);
  const [tab, setTab] = useState<Tab>("proof");
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  if (!pack) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center">
        <Lightbulb className="mx-auto h-6 w-6 text-muted-foreground/50" />
        <h3 className="mt-2 font-semibold text-foreground">Learning pack in progress</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Non-general proof, theory, confusion clarity and practice questions for this lab are being prepared.
        </p>
        <div className="mt-3 flex justify-center">
          <DateBadge label="Learning pack" date="in progress" tone="amber" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/30 px-5 py-3">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <Lightbulb className="h-4 w-4 text-primary" />
          Below the animation — learn it properly
        </h3>
        <DateBadge label="Content validated" date="2082 BS" tone="green" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-border px-3 pt-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-t-lg px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-b-2 border-primary bg-primary/5 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <LearningBody pack={pack} tab={tab} revealed={revealed} toggle={(i) => setRevealed((r) => ({ ...r, [i]: !r[i] }))} />
    </div>
  );
}

function LearningBody({
  pack,
  tab,
  revealed,
  toggle,
}: {
  pack: NonNullable<ReturnType<typeof getLabLearning>>;
  tab: Tab;
  revealed: Record<number, boolean>;
  toggle: (i: number) => void;
}) {
  if (tab === "proof") {
    return (
      <div className="p-5">
        <div className="space-y-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="font-semibold text-foreground">{pack.proof.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Concrete case: <span className="font-mono text-foreground">{pack.proof.case}</span>
            </p>
          </div>
          <ol className="space-y-3">
            {pack.proof.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed text-foreground">{s.text}</p>
                  {s.math && (
                    <p className="mt-1 overflow-x-auto rounded-lg bg-muted px-3 py-1.5 font-mono text-xs text-foreground">
                      {s.math}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              <strong>Takeaway:</strong> {pack.proof.takeaway}
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (tab === "theory") {
    return (
      <div className="space-y-4 p-5">
        {pack.theory.map((b, i) => (
          <div key={i} className="rounded-xl border border-border p-4">
            <h4 className="flex items-center gap-2 font-semibold text-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              {b.heading}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </div>
    );
  }
  if (tab === "confusions") {
    return (
      <div className="space-y-4 p-5">
        <p className="text-sm text-muted-foreground">
          These are the exact traps students fall into. Read the <em>why</em> — that is the real cure.
        </p>
        {pack.confusions.map((c, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start gap-2 bg-red-500/5 px-4 py-2.5">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Common belief (wrong)</span>
                <p className="text-sm text-foreground">{c.wrong}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 px-4 py-2.5">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Reality (right)</span>
                <p className="text-sm text-foreground">{c.right}</p>
              </div>
            </div>
            <div className="border-t border-border bg-muted/30 px-4 py-2">
              <p className="text-xs text-muted-foreground"><strong>Why the confusion:</strong> {c.why}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  // practice
  return (
    <div className="space-y-3 p-5">
      {pack.questions.map((q, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border">
          <button
            onClick={() => toggle(i)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40"
          >
            <span className="flex items-start gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-foreground">{q.q}</span>
            </span>
            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${revealed[i] ? "rotate-180" : ""}`} />
          </button>
          {revealed[i] && (
            <div className="border-t border-border bg-muted/20 px-4 py-3">
              <p className="text-sm leading-relaxed text-foreground">
                <strong className="text-emerald-600 dark:text-emerald-400">Answer: </strong>
                {q.a}
              </p>
              {q.hint && <p className="mt-1.5 text-xs text-muted-foreground"><strong>Hint:</strong> {q.hint}</p>}
            </div>
          )}
        </div>
      ))}
      <p className="pt-1 text-center text-xs text-muted-foreground">
        Want more? Open the lab animation again and try to predict it before running — then check here.
      </p>
    </div>
  );
}

