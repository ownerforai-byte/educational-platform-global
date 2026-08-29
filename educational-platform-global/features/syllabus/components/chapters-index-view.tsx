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
  const { units } = getSubjectNav(classSlug, subjectSlug);

  if (units.length === 0) {
    return (
      <EmptyState
        title="No chapters yet"
        description="No chapters available for this subject in the official syllabus."
      />
    );
  }

  return (
    <div className="space-y-6">
      <SubjectSectionNav basePath={basePath} active="chapters" />

      <OfficialSyllabusPanel
        heading="Syllabus"
        description="Chapters follow this official syllabus order. Each chapter page shows its syllabus before notes."
        units={units}
        basePath={basePath}
        compact
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {units.map((unit, idx) => (
          <Link
            key={unit.id}
            href={`${basePath}/chapters/${unit.id}`}
            className="group"
          >
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">
                  Chapter {idx + 1}: {unit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {unit.topics.length} syllabus topics
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
