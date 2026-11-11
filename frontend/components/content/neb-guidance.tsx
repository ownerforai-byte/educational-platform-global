import React from "react";
import Link from "next/link";
import { ExternalLink, Map, AlertTriangle, ClipboardList } from "lucide-react";
import { pyqLinksFor } from "@/lib/pyq-sources";
import { blueprintByUnit, sortHighYield } from "@/lib/neb-blueprint";
import { getMistakeGuide, mistakesByUnit } from "@/lib/mistake-guide";

/**
 * NebGuidance — the guidance strip under a subject's PYQ page.
 *
 * Three panels, all platform-authored or link-only (SOURCES.md):
 *   1. "Where to find the full paper" — the link-only PYQ index. NEB papers
 *      are ⚠️, so this panel links OUT to providers instead of reproducing
 *      question text.
 *   2. "NEB blueprint" — CDC specification-grid metadata: which units carry
 *      the most marks and what concepts are tested there.
 *   3. "Common mistakes" — the authored wrong/why/fix guide, grouped by unit.
 *
 * Every panel degrades to a quiet "not authored yet" note — guidance is an
 * enhancement and must never break the page.
 */
export async function NebGuidance({
  classSlug,
  subjectSlug,
  subjectName,
}: {
  classSlug: string;
  subjectSlug: string;
  subjectName: string;
}) {
  const [papers, blueprintRows, mistakes] = await Promise.all([
    pyqLinksFor(classSlug, subjectSlug),
    blueprintByUnit(classSlug, subjectSlug).then(sortHighYield),
    getMistakeGuide(classSlug, subjectSlug),
  ]);

  const mistakeGroups = mistakes ? mistakesByUnit(mistakes) : [];

  return (
    <div className="space-y-6" data-testid="neb-guidance">
      {/* 1 — paper links (link-only) */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Where to find the full paper
          </h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            link-only
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          NEB papers are linked, not copied — each entry credits the provider
          hosting it.
        </p>
        {papers.length > 0 ? (
          <ul className="mt-3 divide-y divide-border/60">
            {papers.map((p) => (
              <li key={`${p.year}-${p.provider}-${p.kind}`} className="py-2 first:pt-0 last:pb-0">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="rounded bg-muted/70 px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
                    {p.kind}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </a>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  via {p.provider}
                  {p.locator ? ` — ${p.locator}` : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            No verified paper links for {subjectName} yet.
          </p>
        )}
      </section>

      {/* 2 — blueprint */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">NEB blueprint</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            CDC grid
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Which units carry the most exam weight, and the concepts tested there
          (structural metadata from the CDC specification grid).
        </p>
        {blueprintRows.some((r) => r.data) ? (
          <div className="mt-3 space-y-2">
            {blueprintRows
              .filter((r) => r.data)
              .slice(0, 6)
              .map(({ unit, data }) => (
                <div key={unit.id} className="rounded-xl border border-border/60 p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{unit.title}</p>
                    <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
                      {data?.verified && typeof data.marks === "number"
                        ? `~${data.marks} marks`
                        : `${data?.hours ?? unit.hours ?? "?"} hrs`}
                    </span>
                  </div>
                  {data && data.concepts.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {data.concepts.slice(0, 6).map((c) => (
                        <span
                          key={c}
                          className="rounded bg-muted/70 px-1.5 py-0.5 text-[10px] text-foreground/80"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            Blueprint not authored for {subjectName} yet.
          </p>
        )}
      </section>

      {/* 3 — common mistakes */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h2 className="text-base font-semibold text-foreground">Common mistakes</h2>
          {mistakes && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
              {mistakes.mistakes.length} traps
            </span>
          )}
        </div>
        {mistakes && mistakes.examHall.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {mistakes.examHall.slice(0, 3).map((tip) => (
              <li key={tip} className="flex gap-2 text-xs text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70" />
                {tip}
              </li>
            ))}
          </ul>
        )}
        {mistakeGroups.length > 0 ? (
          <div className="mt-3 space-y-3">
            {mistakeGroups.slice(0, 4).map(({ unit, items }) => (
              <div key={unit}>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {unit}
                </p>
                {items.slice(0, 2).map((m) => (
                  <div key={m.id} className="mt-1.5 rounded-xl border border-border/60 p-3">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold text-rose-600 dark:text-rose-400">Wrong: </span>
                      {m.wrong}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="font-semibold">Why it costs marks: </span>
                      {m.why}
                    </p>
                    <p className="mt-1 text-xs text-foreground/90">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Fix: </span>
                      {m.fix}
                    </p>
                  </div>
                ))}
              </div>
            ))}
            <p className="text-[11px] text-muted-foreground">
              Full guide covers {mistakes?.mistakes.length ?? 0} mistakes across{" "}
              {mistakeGroups.length} units.
            </p>
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            Mistake guide not authored for {subjectName} yet.
          </p>
        )}
      </section>
    </div>
  );
}
