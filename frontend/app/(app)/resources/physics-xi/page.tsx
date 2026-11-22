import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { PhysicsXiAcademicGrid } from "@/components/content/physics-xi-academic-grid";
import {
  PHYSICS_XI_CHAPTERS,
  PHYSICS_XI_WORKBOOK_BASE,
  PHYSICS_XI_WORKBOOK_TOTALS,
  physicsXiChapterUrl,
  physicsXiChaptersByUnit,
} from "@/lib/physics-xi-chapters";
import {
  PHYSICS_XI_ACADEMIC,
  PHYSICS_XI_ACADEMIC_UNITS,
  PHYSICS_XI_CONTENT_AREAS,
} from "@/lib/physics-xi-academic";

export const metadata: Metadata = {
  title: "Physics XI Academic Companion — Ravikisan's Platform",
  description:
    "Twenty-six NEB Class 11 Physics unit briefs: what the model asserts, the conditions under which it holds, the open research questions, and where to read further.",
};

export default function PhysicsXiAcademicPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <Link
        href="/resources"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All resources
      </Link>

      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 md:p-10 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {PHYSICS_XI_ACADEMIC.title}
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {PHYSICS_XI_ACADEMIC.course}
            </p>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              {PHYSICS_XI_ACADEMIC.subtitle}
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/resources/physics-xi/solutions"
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-primary/30"
      >
        <div>
          <p className="text-sm font-semibold">Exercise solutions &amp; conceptual bank</p>
          <p className="mt-1 text-sm text-muted-foreground">
            All twenty-six units worked out in NEB answer style, with the 2-mark bank and the
            long-answer set.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Open solutions
          <ArrowLeft className="h-4 w-4 rotate-180" />
        </span>
      </Link>

      <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">A4 workbook — chapter sheets</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {PHYSICS_XI_WORKBOOK_TOTALS.questions} solved NEB-style questions in{" "}
              {PHYSICS_XI_WORKBOOK_TOTALS.sheets} printable A4 sheets,{" "}
              {PHYSICS_XI_WORKBOOK_TOTALS.perSheet} per sheet in a 3 × 4 grid, each with the
              working and the answer line.
            </p>
          </div>
          <a
            href={`${PHYSICS_XI_WORKBOOK_BASE}/chapters/index.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open workbook
          </a>
        </div>
        <div className="mt-4 space-y-3">
          {physicsXiChaptersByUnit().map((block) => (
            <div key={block.unitNo}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Unit {block.unitNo} · {block.unitName}
              </p>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {block.chapters.map((chapter) => (
                  <li key={chapter.slug}>
                    <a
                      href={physicsXiChapterUrl(chapter)}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-primary hover:underline"
                    >
                      <span className="mr-1.5 font-mono text-[11px] text-muted-foreground">
                        {chapter.code}
                      </span>
                      {chapter.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {PHYSICS_XI_CHAPTERS.length} chapters published so far; the remaining units are added as
          their sheets are authored.
        </p>
      </section>

      <PhysicsXiAcademicGrid
        units={PHYSICS_XI_ACADEMIC_UNITS}
        contentAreas={PHYSICS_XI_CONTENT_AREAS}
      />
    </div>
  );
}
