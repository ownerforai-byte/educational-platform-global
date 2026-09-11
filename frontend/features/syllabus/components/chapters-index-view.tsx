import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/content/empty-state";
import { getSubjectNav } from "../queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";

export function ChaptersIndexView({
  classSlug,
  subjectSlug,
  basePath,
}: {
  classSlug: string;
  subjectSlug: string;
  basePath: string;
}) {
  const { subject, units } = getSubjectNav(classSlug, subjectSlug);

  if (!subject) {
    return (
      <div className="mx-auto max-w-6xl py-10">
        <EmptyState
          title="Subject not found"
          description="This subject is not in the official syllabus for this class track."
        />
      </div>
    );
  }

  if (units.length === 0) {
    return (
      <EmptyState
        title="No chapters yet"
        description="No chapters available for this subject in the official syllabus."
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{subject.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subject.description}</p>
        </div>
      </div>

      <SubjectSectionNav basePath={basePath} active="chapters" />

      {/* Full Syllabus Overview */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Full Syllabus</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {units.length} unit{units.length !== 1 ? "s" : ""} ·{" "}
          {units.reduce((acc, u) => acc + u.topics.length, 0)} topics total
        </p>
        
        <div className="space-y-4">
          {units.map((unit, unitIdx) => (
            <div key={unit.id} className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {unitIdx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{unit.title}</h3>
                    {typeof unit.hours === "number" && (
                      <p className="text-xs text-muted-foreground">
                        {unit.hours} teaching hours
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  href={`${basePath}/chapters/${unit.id}`}
                  className="text-sm text-primary hover:underline shrink-0"
                >
                  View topics →
                </Link>
              </div>
              
              {/* Topics Preview */}
              <div className="ml-11">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Topics ({unit.topics.length})
                </p>
                <ul className="space-y-1">
                  {unit.topics.slice(0, 3).map((topic, idx) => (
                    <li key={idx} className="text-sm text-foreground/80">
                      • {topic}
                    </li>
                  ))}
                  {unit.topics.length > 3 && (
                    <li className="text-xs text-muted-foreground italic">
                      +{unit.topics.length - 3} more topics...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Cards Grid */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Browse Units</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit, idx) => (
            <Link
              key={unit.id}
              href={`${basePath}/chapters/${unit.id}`}
              className="group"
            >
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                    {unit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {unit.topics.length} syllabus topics
                  </p>
                  {typeof unit.hours === "number" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {unit.hours} hours
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <OfficialSyllabusPanel
        heading="Curriculum Structure"
        description="Units follow the official NEB curriculum order. Click on any unit to view its topics and notes."
        units={units}
        basePath={basePath}
        compact
      />
    </div>
  );
}
