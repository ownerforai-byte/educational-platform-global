"use client";

import { MathMarkdown } from "@/components/content/math-markdown";
import type { FormulaAnnotation, FormulaAnnotationKind } from "@/lib/formula-sheet";

const ANNOTATION_KIND_META: Record<
  FormulaAnnotationKind,
  { label: string; chip: string; bullet: string }
> = {
  condition: {
    label: "Special conditions",
    chip: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
    bullet: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  },
  "solved-pyq": {
    label: "Solved PYQs in short",
    chip: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-300",
    bullet: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  },
  hint: {
    label: "Hints",
    chip: "bg-sky-500/10 text-sky-700 border-sky-500/30 dark:text-sky-300",
    bullet: "bg-sky-500/20 text-sky-700 dark:text-sky-300",
  },
  "exam-trick": {
    label: "Exam tricks",
    chip: "bg-rose-500/10 text-rose-700 border-rose-500/30 dark:text-rose-300",
    bullet: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
  },
  shortcut: {
    label: "Shortcuts",
    chip: "bg-violet-500/10 text-violet-700 border-violet-500/30 dark:text-violet-300",
    bullet: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  },
};

const ANNOTATION_KIND_ORDER: FormulaAnnotationKind[] = [
  "condition",
  "solved-pyq",
  "hint",
  "exam-trick",
  "shortcut",
];

export function AnnotationBlock({ annotations }: { annotations: readonly FormulaAnnotation[] }) {
  const groups = new Map<FormulaAnnotationKind, FormulaAnnotation[]>();
  for (const ann of annotations) {
    const list = groups.get(ann.kind);
    if (list) list.push(ann);
    else groups.set(ann.kind, [ann]);
  }

  const presentKinds = ANNOTATION_KIND_ORDER.filter((k) => groups.has(k));

  return (
    <aside className="mt-3 flex flex-col gap-2 rounded-xl border border-border/60 bg-muted/20 p-3" data-testid="annotation-block">
      <div className="flex flex-wrap items-center gap-1.5" data-testid="annotation-kinds">
        {presentKinds.map((kind) => {
          const meta = ANNOTATION_KIND_META[kind];
          return (
            <span
              key={kind}
              data-testid={`annotation-kind-${kind}`}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.chip}`}
            >
              {meta.label}
            </span>
          );
        })}
      </div>
      <div className="space-y-2">
        {presentKinds.map((kind) => {
          const meta = ANNOTATION_KIND_META[kind];
          const items = groups.get(kind)!;
          return (
            <ul key={kind} className="space-y-1.5" data-testid={`annotation-list-${kind}`}>
              {items.map((ann, i) => (
                <li key={i} className="flex gap-2 text-xs leading-relaxed text-foreground/85" data-testid={`annotation-item-${kind}-${i}`}>
                  <span className={`shrink-0 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded ${meta.bullet}`}
                    aria-hidden
                  >
                    <span className="text-[9px] font-bold">•</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    {ann.label && (
                      <span className="font-semibold text-foreground">{ann.label}: </span>
                    )}
                    <MathMarkdown content={ann.text} className="text-foreground/85" />
                  </span>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </aside>
  );
}

const SECTION_META = [
  {
    kind: "conditions" as const,
    title: "Special conditions",
    chip: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
    icon: "✓",
  },
  {
    kind: "solvedPyqs" as const,
    title: "Solved PYQs in short",
    chip: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-300",
    icon: "#",
  },
  {
    kind: "examTricks" as const,
    title: "Exam tricks",
    chip: "bg-rose-500/10 text-rose-700 border-rose-500/30 dark:text-rose-300",
    icon: "★",
  },
  {
    kind: "hints" as const,
    title: "Hints",
    chip: "bg-sky-500/10 text-sky-700 border-sky-500/30 dark:text-sky-300",
    icon: "→",
  },
] as const;

export interface ClassifiedNoteGroup {
  conditions: readonly string[];
  solvedPyqs: readonly string[];
  examTricks: readonly string[];
  hints: readonly string[];
}

export function AnnotationBlockLegend() {
  return (
    <section className="rounded-2xl border border-border/70 bg-muted/20 p-4" data-testid="annotation-legend">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        How to read the classified notes
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-foreground/80">
        Each formula may carry a short classified note — the conditions that
        bound it, a solved past-year question, a hint, an exam trick or a
        shortcut. They are written for revision, not for a full derivation.
      </p>
      <div className="mt-3 flex flex-wrap gap-2" data-testid="legend-kinds">
        {ANNOTATION_KIND_ORDER.map((kind) => {
          const meta = ANNOTATION_KIND_META[kind];
          return (
            <span
              key={kind}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.chip}`}
            >
              {meta.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}

export function ClassifiedNotes({ group }: { group: ClassifiedNoteGroup }) {
  const hasAny = SECTION_META.some(
    (s) => (group[s.kind] as readonly string[]).length > 0,
  );
  if (!hasAny) return null;

  return (
    <section className="mt-4 rounded-xl border border-dashed border-border/70 bg-muted/20 p-4" data-testid="classified-notes">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Classified notes for this topic
      </h3>
      <div className="space-y-3">
        {SECTION_META.map((section) => {
          const items = group[section.kind] as readonly string[];
          if (items.length === 0) return null;
          return (
            <div key={section.kind} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current/20 bg-current/5 text-[10px] font-bold text-foreground/60">
                  {section.icon}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${section.chip}`}
                >
                  {section.title}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  ({items.length})
                </span>
              </div>
              <ul className="ml-7 space-y-1" data-testid={`classified-list-${section.kind}`}>
                {items.map((text, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed text-foreground/80">
                    <span className="mt-0.5 shrink-0 text-foreground/40">•</span>
                    <MathMarkdown content={text} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
