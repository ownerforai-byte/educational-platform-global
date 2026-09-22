import Link from "next/link";
import { ArrowLeft, ChevronRight, Sigma, Zap, Rocket, ShieldAlert, BookOpen } from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  KNOWLEDGE_KINDS,
  chapterStats,
  type KnowledgeChapter,
  type KnowledgeKindSlug,
  type KnowledgeSection,
} from "@/features/knowledge/types";

const KIND_ICON: Record<KnowledgeKindSlug, typeof BookOpen> = {
  theory: BookOpen,
  formulas: Sigma,
  "special-cases": Zap,
  tricks: Rocket,
  mistakes: ShieldAlert,
};

const LEVEL_BADGE: Record<string, string> = {
  basic: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25",
  standard: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25",
  pro: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
};

/**
 * Compact entry banner for the six original Knowledge Hub section pages.
 * Points into the pro-level page tree without changing the page itself.
 */
export function ProSectionBanner({ sectionId }: { sectionId: string }) {
  return (
    <Link
      href={`/knowledge/pro/${sectionId}`}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/[0.06] px-5 py-4 transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">✨</span>
        <div>
          <p className="text-sm font-bold group-hover:text-primary">Pro Knowledge Pages</p>
          <p className="text-xs text-muted-foreground">
            Every chapter here also has full theory, formula vault, special cases, tricks and traps pages.
          </p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function ProBreadcrumb({
  section,
  chapter,
  kind,
}: {
  section: KnowledgeSection;
  chapter?: KnowledgeChapter;
  kind?: { slug: string; label: string };
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
      <Link href="/knowledge" className="hover:text-foreground transition-colors">
        Knowledge Hub
      </Link>
      <ChevronRight className="h-3 w-3" />
      <Link href={`/knowledge/pro/${section.id}`} className="hover:text-foreground transition-colors">
        {section.title}
      </Link>
      {chapter && (
        <>
          <ChevronRight className="h-3 w-3" />
          {kind ? (
            <Link
              href={`/knowledge/pro/${section.id}/${chapter.id}`}
              className="hover:text-foreground transition-colors"
            >
              {chapter.title}
            </Link>
          ) : (
            <span className="text-foreground">{chapter.title}</span>
          )}
        </>
      )}
      {kind && (
        <>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{kind.label}</span>
        </>
      )}
    </nav>
  );
}

/** Section contents — every chapter with its five knowledge-kind counts. */
export function SectionContents({ section }: { section: KnowledgeSection }) {
  const totals = section.chapters.reduce(
    (acc, c) => {
      const s = chapterStats(c);
      return {
        theory: acc.theory + s.theory,
        formulas: acc.formulas + s.formulas,
        specialCases: acc.specialCases + s.specialCases,
        tricks: acc.tricks + s.tricks,
        mistakes: acc.mistakes + s.mistakes,
      };
    },
    { theory: 0, formulas: 0, specialCases: 0, tricks: 0, mistakes: 0 },
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:py-10">
      <ProBreadcrumb section={section} />

      <header className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{section.title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{section.subtitle}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            ["Chapters", section.chapters.length],
            ["Theory blocks", totals.theory],
            ["Formulas", totals.formulas],
            ["Special cases", totals.specialCases],
            ["Tricks", totals.tricks],
            ["Traps", totals.mistakes],
          ].map(([label, n]) => (
            <span
              key={label as string}
              className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium"
            >
              {label}: <span className="font-bold text-primary">{n as number}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {section.chapters.map((c) => {
          const s = chapterStats(c);
          return (
            <Link
              key={c.id}
              href={`/knowledge/pro/${section.id}/${c.id}`}
              className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-bold group-hover:text-primary">{c.title}</h2>
                <span className="shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {c.classLevel === "both" ? "XI + XII" : c.classLevel === "class-11" ? "XI" : "XII"}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded-md bg-blue-500/10 px-2 py-0.5 font-medium text-blue-600 dark:text-blue-400">
                  {s.theory} theory
                </span>
                <span className="rounded-md bg-violet-500/10 px-2 py-0.5 font-medium text-violet-600 dark:text-violet-400">
                  {s.formulas} formulas
                </span>
                <span className="rounded-md bg-amber-500/10 px-2 py-0.5 font-medium text-amber-600 dark:text-amber-400">
                  {s.specialCases} cases
                </span>
                <span className="rounded-md bg-green-500/10 px-2 py-0.5 font-medium text-green-600 dark:text-green-400">
                  {s.tricks} tricks
                </span>
                <span className="rounded-md bg-red-500/10 px-2 py-0.5 font-medium text-red-600 dark:text-red-400">
                  {s.mistakes} traps
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Chapter contents — the "1st page": all five kinds with counts + jump links. */
export function ChapterContents({
  section,
  chapter,
}: {
  section: KnowledgeSection;
  chapter: KnowledgeChapter;
}) {
  const base = `/knowledge/pro/${section.id}/${chapter.id}`;
  const s = chapterStats(chapter);
  const count: Record<KnowledgeKindSlug, number> = {
    theory: s.theory,
    formulas: s.formulas,
    "special-cases": s.specialCases,
    tricks: s.tricks,
    mistakes: s.mistakes,
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:py-10">
      <ProBreadcrumb section={section} chapter={chapter} />
      <Link
        href={`/knowledge/pro/${section.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All chapters
      </Link>

      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{chapter.title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{chapter.blurb}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KNOWLEDGE_KINDS.map((k) => {
          const Icon = KIND_ICON[k.slug];
          return (
            <Link
              key={k.slug}
              href={`${base}/${k.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${k.tint}18` }}
              >
                <Icon className="h-5 w-5" style={{ color: k.tint }} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold group-hover:text-primary">{k.label}</h2>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">
                    {count[k.slug]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {k.slug === "theory" && "Full concepts at basic → standard → pro level."}
                  {k.slug === "formulas" && "Every formula, each symbol, and when it is valid."}
                  {k.slug === "special-cases" && "Limiting and edge cases the board loves to ask."}
                  {k.slug === "tricks" && "Short hacks and speed shortcuts for the exam hall."}
                  {k.slug === "mistakes" && "Classic traps that silently cost marks."}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
        <h2 className="text-sm font-bold">Quick preview</h2>
        <ul className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
          {chapter.theory.slice(0, 2).map((t) => (
            <li key={t.heading} className="flex gap-2">
              <span className="text-primary">▸</span>
              <span>
                <span className="font-medium text-foreground">{t.heading}</span> — {t.body.slice(0, 110)}…
              </span>
            </li>
          ))}
          {chapter.tricks.slice(0, 2).map((t) => (
            <li key={t.title} className="flex gap-2">
              <span className="text-green-500">🚀</span>
              <span>
                <span className="font-medium text-foreground">{t.title}</span> — {t.how}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Kind page — renders one knowledge kind of one chapter. */
export function KindPage({
  section,
  chapter,
  kind,
}: {
  section: KnowledgeSection;
  chapter: KnowledgeChapter;
  kind: KnowledgeKindSlug;
}) {
  const base = `/knowledge/pro/${section.id}/${chapter.id}`;
  const meta = KNOWLEDGE_KINDS.find((k) => k.slug === kind)!;

  return (
    <div className="mx-auto max-w-4xl space-y-7 px-4 py-6 md:py-10">
      <ProBreadcrumb section={section} chapter={chapter} kind={meta} />
      <Link
        href={base}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {chapter.title} — contents
      </Link>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta.icon}</span>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">{meta.label}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {chapter.title} · {section.title}
        </p>
      </header>

      {/* kind switcher */}
      <div className="flex flex-wrap gap-1.5">
        {KNOWLEDGE_KINDS.map((k) => (
          <Link
            key={k.slug}
            href={`${base}/${k.slug}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              k.slug === kind
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {k.icon} {k.label}
          </Link>
        ))}
      </div>

      {kind === "theory" && (
        <div className="space-y-4">
          {chapter.theory.map((t) => (
            <article key={t.heading} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold">{t.heading}</h2>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${LEVEL_BADGE[t.level]}`}
                >
                  {t.level}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              {t.math && (
                <div className="mt-3 overflow-x-auto rounded-xl bg-muted/40 px-4 py-3 text-sm">
                  <MathMarkdown content={`$$${t.math}$$`} />
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {kind === "formulas" && (
        <div className="space-y-4">
          {chapter.formulas.map((f) => (
            <article key={f.name} className="rounded-2xl border border-border/60 bg-card p-5">
              <h2 className="font-bold">{f.name}</h2>
              <div className="mt-3 overflow-x-auto rounded-xl bg-muted/40 px-4 py-3">
                <MathMarkdown content={`$$${f.latex}$$`} />
              </div>
              <table className="mt-3 w-full text-left text-xs">
                <tbody>
                  {f.symbols.map((s) => (
                    <tr key={s.sym} className="border-b border-border/40 last:border-0">
                      <td className="py-1.5 pr-3 align-top font-mono font-semibold text-primary">{s.sym}</td>
                      <td className="py-1.5 pr-3 align-top text-muted-foreground">{s.meaning}</td>
                      <td className="py-1.5 align-top text-muted-foreground/80">{s.unit ?? ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs">
                <span className="font-semibold text-foreground">Valid when: </span>
                <span className="text-muted-foreground">{f.when}</span>
              </p>
              {f.hook && (
                <p className="mt-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
                  💡 {f.hook}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {kind === "special-cases" && (
        <div className="space-y-4">
          {chapter.specialCases.map((sc) => (
            <article key={sc.title} className="rounded-2xl border border-border/60 bg-card p-5">
              <h2 className="font-bold">{sc.title}</h2>
              <p className="mt-2 text-xs">
                <span className="font-semibold text-foreground">Condition: </span>
                <span className="font-mono text-muted-foreground">{sc.condition}</span>
              </p>
              <div className="mt-2 overflow-x-auto rounded-xl bg-muted/40 px-4 py-3 text-sm">
                <MathMarkdown content={`$$${sc.result}$$`} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{sc.why}</p>
              {sc.askedIn && (
                <p className="mt-2 rounded-lg bg-violet-500/10 px-3 py-2 text-xs text-violet-700 dark:text-violet-300">
                  🎯 {sc.askedIn}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {kind === "tricks" && (
        <div className="space-y-4">
          {chapter.tricks.map((t) => (
            <article key={t.title} className="rounded-2xl border border-green-500/25 bg-green-500/[0.04] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{t.title}</h2>
                {t.saves && (
                  <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:text-green-300">
                    ⏱ {t.saves}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.how}</p>
              <div className="mt-3 rounded-xl bg-muted/40 px-4 py-3 text-sm">
                <MathMarkdown content={t.example} />
              </div>
            </article>
          ))}
        </div>
      )}

      {kind === "mistakes" && (
        <div className="space-y-4">
          {chapter.mistakes.map((m, i) => (
            <article key={i} className="rounded-2xl border border-border/60 bg-card p-5">
              <p className="text-sm">
                <span className="font-semibold text-red-500">✗ Wrong: </span>
                <span className="text-muted-foreground">{m.wrong}</span>
              </p>
              <p className="mt-2 text-sm">
                <span className="font-semibold text-green-500">✓ Right: </span>
                <span className="text-foreground">{m.right}</span>
              </p>
              <p className="mt-3 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">Why: {m.why}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
