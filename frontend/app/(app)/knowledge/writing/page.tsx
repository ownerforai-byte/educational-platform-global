import Link from "next/link";
import { ArrowLeft, PenLine, Layers, FileText, GitBranch, Lightbulb, CheckCircle2 } from "lucide-react";
import {
  ALL_WRITING_TYPES,
  WRITING_CATEGORIES,
  WRITING_COUNTS,
  getWritingTypesByCategory,
} from "@/features/knowledge/writing";

const CATEGORY_ICONS: Record<string, typeof PenLine> = {
  "Paragraphs & Essays": PenLine,
  "Letters & Emails": GitBranch,
  "Reports & Articles": FileText,
  "Creative Writing": Lightbulb,
  "Textual Skills": Layers,
  "Grammar for Writing": CheckCircle2,
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-6 md:py-10 px-4">
      <Link
        href="/knowledge"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge
      </Link>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
          <PenLine className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">English Writing Section</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every NEB Class 11 &amp; 12 exam writing format — structure, layout, starting lines,
            connectors, and the conceptual grammar that powers them.
          </p>
        </div>
      </div>

      {/* Category quick-glance strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {WRITING_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat] ?? FileText;
          return (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                  {cat}
                </h3>
                <p className="text-xs text-muted-foreground">{WRITING_COUNTS[cat]} formats</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Full content per category */}
      <div className="space-y-10">
        {WRITING_CATEGORIES.map((cat) => {
          const types = getWritingTypesByCategory(cat);
          if (types.length === 0) return null;
          const Icon = CATEGORY_ICONS[cat] ?? FileText;
          return (
            <section
              key={cat}
              id={cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="scroll-mt-20 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold">{cat}</h2>
                </div>
              </div>

              <div className="space-y-3">
                {types.map((type, i) => (
                  <details
                    key={type.id}
                    className="rounded-2xl border border-border bg-card overflow-hidden group"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-muted/40 transition-colors list-none">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl shrink-0">{type.icon}</span>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm text-foreground truncate">
                            {i + 1}. {type.name}
                          </h3>
                          {type.marks && (
                            <p className="text-xs text-muted-foreground">{type.marks}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-muted-foreground text-xs shrink-0 group-open:hidden">▼</span>
                      <span className="text-muted-foreground text-xs shrink-0 group-open:block hidden">▲</span>
                    </summary>

                    <div className="border-t border-border px-5 py-4 space-y-5">
                      {/* Concept */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1.5">
                          ✦ Concept
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">{type.concept}</p>
                      </div>

                      {/* Structure / format blocks */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-2">
                          📐 Structure &amp; Format
                        </h4>
                        <div className="space-y-2.5">
                          {type.format.map((block, bi) => (
                            <div key={bi} className="rounded-xl border border-border/60 bg-muted/20 p-3">
                              <p className="text-sm font-semibold text-foreground">{block.label}</p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {block.detail}
                              </p>
                              {block.example && (
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1.5 bg-green-50 dark:bg-green-950/30 rounded-lg px-2.5 py-1.5">
                                  <span className="font-semibold">Example: </span>
                                  {block.example}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Startings + connectors */}
                      <div className="grid gap-4 md:grid-cols-2">
                        {type.startings.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1.5">
                              🚀 Starting lines
                            </h4>
                            <ul className="space-y-1">
                              {type.startings.map((s, si) => (
                                <li key={si} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="text-indigo-500 mt-0.5">•</span>
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {type.connectors.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1.5">
                              🔗 Connectors
                            </h4>
                            <ul className="space-y-1">
                              {type.connectors.map((c, ci) => (
                                <li key={ci} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="text-indigo-500 mt-0.5">•</span>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Model example */}
                      {type.example && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1.5">
                            📄 Model answer
                          </h4>
                          <div className="text-xs text-foreground leading-relaxed bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4 whitespace-pre-line border border-indigo-100 dark:border-indigo-900/40">
                            {type.example}
                          </div>
                        </div>
                      )}

                      {/* Conceptual grammar */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1.5">
                          🧠 Conceptual grammar
                        </h4>
                        <ul className="space-y-1">
                          {type.grammar.map((g, gi) => (
                            <li key={gi} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-indigo-500 mt-0.5">◆</span>
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exam tips */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1.5">
                          ✅ Exam tips
                        </h4>
                        <ul className="space-y-1">
                          {type.tips.map((t, ti) => (
                            <li key={ti} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-green-600 mt-0.5">✓</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        Total: <strong>{ALL_WRITING_TYPES.length}</strong> writing formats covered, aligned with the NEB
        Compulsory English (Eng. 003 / Eng. 004) curriculum.
      </p>
    </div>
  );
}