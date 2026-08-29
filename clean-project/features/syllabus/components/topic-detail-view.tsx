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
    value === "class-11-notes" ||
    value === "class-11e" ||
    value === "class-11-more" ||
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

      <MindmapInterface
        title={topic.title}
        root={mindmap.root}
        source={mindmap.source}
      />

      <div className="space-y-3">
        <h3 className="text-xl font-semibold tracking-tight">Notes for this syllabus topic</h3>
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
