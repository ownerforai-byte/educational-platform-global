import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUnit } from "../queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";

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
        title="Chapter not found"
        description="This unit is not listed in the official syllabus."
      />
    );
  }

  return (
    <div className="space-y-6">
      <SubjectSectionNav basePath={basePath} active="chapters" />

      <OfficialSyllabusPanel
        heading="Syllabus"
        description={`Official unit syllabus for ${unit.title}. Click on any topic below to view its notes.`}
        units={[unit]}
        basePath={basePath}
        highlightUnitId={unit.id}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span>Topics in this unit</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              Click to view notes
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {unit.topicEntries.length > 0 ? (
            <ol className="list-decimal space-y-3 pl-5">
              {unit.topicEntries.map((topic) => (
                <li key={topic.slug} className="text-sm">
                  <Link
                    href={`${basePath}/chapters/${unit.id}/topics/${topic.slug}`}
                    className="font-medium text-primary hover:underline flex items-center gap-2"
                  >
                    <span>{topic.title}</span>
                    <span className="text-xs text-muted-foreground">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              No topics listed in the official syllabus.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground text-center">
          💡 <strong>Tip:</strong> Click on any topic above to view its detailed notes and resources.
        </p>
      </div>

      <Link
        href={`${basePath}/chapters`}
        className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        Back to chapters
      </Link>
    </div>
  );
}
