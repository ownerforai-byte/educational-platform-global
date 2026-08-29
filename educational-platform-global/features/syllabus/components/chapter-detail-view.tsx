import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { ImportedNotesSection } from "@/components/content/imported-notes-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NotesTrack } from "@/lib/imported-notes";
import { getUnit } from "../queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";

function isNotesTrack(value: string): value is NotesTrack {
  return (
    value === "class-11-notes" ||
    value === "class-11e" ||
    value === "class-11-more" ||
    value === "class-12-notes" ||
    value === "class-12e" ||
    value === "class-12-more"
  );
}

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
        description={`Official unit syllabus for ${unit.title}. Topic notes follow this list in curriculum order.`}
        units={[unit]}
        basePath={basePath}
        highlightUnitId={unit.id}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Topics in this unit</CardTitle>
        </CardHeader>
        <CardContent>
          {unit.topicEntries.length > 0 ? (
            <ol className="list-decimal space-y-2 pl-5">
              {unit.topicEntries.map((topic) => (
                <li key={topic.slug} className="text-sm">
                  <Link
                    href={`${basePath}/chapters/${unit.id}/topics/${topic.slug}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {topic.title}
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

      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Notes for this syllabus unit</h2>
        {isNotesTrack(classSlug) ? (
          <ImportedNotesSection subject={subjectSlug} unitId={unitId} target={classSlug} />
        ) : (
          <EmptyState
            title="No notes yet"
            description="Imported notes are not available for this class track yet."
          />
        )}
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
