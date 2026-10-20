import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { PhysicsXiAcademicGrid } from "@/components/content/physics-xi-academic-grid";
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

      <PhysicsXiAcademicGrid
        units={PHYSICS_XI_ACADEMIC_UNITS}
        contentAreas={PHYSICS_XI_CONTENT_AREAS}
      />
    </div>
  );
}
