import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { PhysicsXiUnitBrief } from "@/components/content/physics-xi-unit-brief";
import {
  PHYSICS_XI_ACADEMIC,
  PHYSICS_XI_ACADEMIC_UNITS,
  getPhysicsXiUnitById,
  physicsXiDocUrl,
} from "@/lib/physics-xi-academic";

export function generateStaticParams() {
  return PHYSICS_XI_ACADEMIC_UNITS.map((unit) => ({ unit: unit.unitId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit: string }>;
}): Promise<Metadata> {
  const { unit } = await params;
  const brief = getPhysicsXiUnitById(unit);
  if (!brief) {
    return { title: "Physics XI unit not found — Ravikisan's Platform" };
  }
  return {
    title: `Physics XI Unit ${brief.unitNo}: ${brief.unitName} — Academic Companion`,
    description: brief.summary,
  };
}

export default async function PhysicsXiUnitPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const brief = getPhysicsXiUnitById(unit);
  if (!brief) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8 md:py-14 px-4">
      <Link
        href="/resources/physics-xi"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All Physics XI briefs
      </Link>

      <header className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 md:p-10 shadow-lg">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Unit {brief.unitNo} · {brief.contentArea}
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          {brief.unitName}
        </h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {PHYSICS_XI_ACADEMIC.course}
        </p>
        <p className="mt-4 max-w-3xl text-muted-foreground">{brief.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={physicsXiDocUrl(brief, "html")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            HTML brief
          </a>
          <a
            href={physicsXiDocUrl(brief, "doc")}
            download
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            Word brief
          </a>
        </div>
      </header>

      <article className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
        <PhysicsXiUnitBrief unit={brief} />
      </article>

      <p className="text-xs text-muted-foreground">
        A companion brief, not a replacement for the prescribed NEB text. The open
        questions describe live research frontiers; they are enrichment, not a claim
        that the established school-level model is invalid. Check the prescribed text
        and syllabus for examinable scope.
      </p>
    </div>
  );
}
