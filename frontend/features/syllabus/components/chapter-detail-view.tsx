import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { getUnit } from "../queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";
import {
  BookOpen,
  ArrowRight,
  Clock,
  FlaskConical,
  Brain,
  Calculator,
} from "lucide-react";

export function ChapterDetailView({
  classSlug,
  subjectSlug,
  unitId,
  basePath,
}: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  basePath: string;
}) {
  const unit = getUnit(classSlug, subjectSlug, unitId);

  if (!unit) {
    return (
      <EmptyState
        title="Unit not found"
        description="This unit is not listed in the official syllabus."
      />
    );
  }

  return (
    <div className="space-y-8">
      <SubjectSectionNav basePath={basePath} active="chapters" />

      {/* 1. COMPLETE UNIT SYLLABUS ABOVE */}
      <OfficialSyllabusPanel
        heading={`Unit Syllabus: ${unit.title}`}
        description={`Complete official syllabus guidelines for this unit (${unit.hours ? `${unit.hours} teaching hours` : "full unit"}). All topics, objectives, and marks weightage below are official NEB standards.`}
        units={[unit]}
        basePath={basePath}
        highlightUnitId={unit.id}
      />

      {/* 2. UNIT OPENS IN CHAPTERS / TOPICS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Unit Chapters &amp; Topics ({unit.topicEntries.length})</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click any topic to read its full vertical notes, worked examples, formulas, and mindmaps.
            </p>
          </div>
          {unit.hours && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {unit.hours} Hours
            </span>
          )}
        </div>

        {unit.topicEntries.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {unit.topicEntries.map((topic, idx) => (
              <Link
                key={topic.slug}
                href={`${basePath}/chapters/${unit.id}/topics/${topic.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      Topic #{idx + 1}
                    </span>
                    <span className="text-xs text-primary font-semibold flex items-center gap-1 group-hover:underline">
                      Open Notes <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground mt-2.5 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>

                  {/* Feature availability pills */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                      <BookOpen className="h-2.5 w-2.5" /> Concept Notes
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 flex items-center gap-1">
                      <FlaskConical className="h-2.5 w-2.5" /> 3D Diagram
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 flex items-center gap-1">
                      <Brain className="h-2.5 w-2.5" /> Mindmap
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 flex items-center gap-1">
                      <Calculator className="h-2.5 w-2.5" /> Formulas
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground">
                  Includes notes, examples, smart summaries, formulas &amp; practice
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
            No topics listed in this unit yet.
          </div>
        )}
      </section>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
        <Link
          href={basePath}
          className="text-muted-foreground hover:text-foreground hover:underline font-semibold"
        >
          &larr; Back to Subject Hub
        </Link>
        <Link
          href={`${basePath}/chapters`}
          className="text-primary hover:underline font-semibold"
        >
          View All Units &rarr;
        </Link>
      </div>
    </div>
  );
}
