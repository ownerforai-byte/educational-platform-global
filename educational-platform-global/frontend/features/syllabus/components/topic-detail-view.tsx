import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { ImportedNotesSection } from "@/components/content/imported-notes-section";
import { MindmapInterface } from "@/features/mindmap/components/mindmap-interface";
import { getTopicMindmap } from "@/features/mindmap/queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";
import { getUnitTopic } from "../queries";
import type { NotesTrack } from "@/lib/imported-notes";

function isNotesTrack(value: string): value is NotesTrack {
  return (
    value === "class-11e" ||
    value === "class-12-notes" ||
    value === "class-12e" ||
    value === "class-12-more"
  );
}

export async function TopicDetailView({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
}: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
}) {
  const data = getUnitTopic(classSlug, subjectSlug, unitId, topicSlug);
  const basePath = `/${classSlug}/${subjectSlug}`;

  if (!data) {
    return (
      <EmptyState
        title="Topic not found"
        description="This topic is not listed in the official syllabus for this unit."
      />
    );
  }

  const { unit, topic } = data;
  const mindmap = await getTopicMindmap({
    classSlug,
    subjectSlug,
    unitId,
    topicSlug: topic.slug,
    topicTitle: topic.title,
  });

  return (
    <div className="space-y-6">
      <SubjectSectionNav basePath={basePath} active="chapters" />

      <OfficialSyllabusPanel
        heading="Syllabus"
        description="Official syllabus for this unit. Notes and mind maps below are attached only to the highlighted topic."
        units={[unit]}
        basePath={basePath}
        highlightUnitId={unit.id}
        highlightTopicSlug={topic.slug}
      />

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Unit ·{" "}
          <Link
            href={`${basePath}/chapters/${unit.id}`}
            className="text-primary hover:underline"
          >
            {unit.title}
          </Link>
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">{topic.title}</h2>
      </div>

      {/* Notes Availability Notice */}
      <div className={`rounded-lg border p-4 ${
        isNotesTrack(classSlug)
          ? "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800"
          : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800"
      }`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">{isNotesTrack(classSlug) ? "📚" : "⚠️"}</span>
          <div>
            <h3 className="font-semibold text-sm">
              {isNotesTrack(classSlug) ? "Notes Available" : "Notes Not Available"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isNotesTrack(classSlug)
                ? "Detailed notes for this topic are available below. These notes have been curated and organized according to the official NEB syllabus."
                : "This class track does not have imported notes yet. Please check back later or contact the administrator for access to study materials."}
            </p>
          </div>
        </div>
      </div>

      <MindmapInterface
        title={topic.title}
        root={mindmap.root}
        source={mindmap.source}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">Notes for this syllabus topic</h3>
          {isNotesTrack(classSlug) && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
              ✓ Available
            </span>
          )}
        </div>
        {isNotesTrack(classSlug) ? (
          <ImportedNotesSection
            subject={subjectSlug}
            unitId={unitId}
            topicTitle={topic.title}
            target={classSlug}
          />
        ) : (
          <EmptyState
            title="No notes yet"
            description="Notes for this topic will appear here once they are mapped to the official syllabus."
          />
        )}
      </div>

      <Link
        href={`${basePath}/chapters/${unit.id}`}
        className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        Back to unit syllabus
      </Link>
    </div>
  );
}
