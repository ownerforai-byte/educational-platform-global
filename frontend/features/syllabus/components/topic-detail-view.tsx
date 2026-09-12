import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { MindmapInterface } from "@/features/mindmap/components/mindmap-interface";
import { getTopicMindmap, buildSyllabusTopicMindmap } from "@/features/mindmap/queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";
import { getUnitTopic } from "../queries";
import { ContentTabs } from "@/components/content/content-tabs";
import { TopicVerticalNotes } from "@/components/content/topic-vertical-notes";
import type { NotesTrack } from "@/lib/imported-notes";
import { ChevronRight, ArrowLeft } from "lucide-react";

function isNotesTrack(value: string): value is NotesTrack {
  return value === "class-11-notes" || value === "class-12-notes";
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
  let mindmap: Awaited<ReturnType<typeof getTopicMindmap>> | undefined;
  try {
    mindmap = await getTopicMindmap({
      classSlug,
      subjectSlug,
      unitId,
      topicSlug: topic.slug,
      topicTitle: topic.title,
    });
  } catch {
    mindmap = {
      id: `${classSlug}/${subjectSlug}/${unitId}/${topic.slug}`,
      title: topic.title,
      classSlug,
      subjectSlug,
      unitId,
      topicSlug: topic.slug,
      source: "syllabus",
      root: buildSyllabusTopicMindmap(topic.title, topic.slug),
      mediaUrl: null,
      href: `/${classSlug}/${subjectSlug}/chapters/${unitId}/topics/${topic.slug}#mindmap`,
    };
  }

  return (
    <div className="space-y-8">
      <SubjectSectionNav basePath={basePath} active="chapters" />

      {/* Complete Chapter/Unit Syllabus Above */}
      <OfficialSyllabusPanel
        heading="Chapter Syllabus Context"
        description={`Complete official syllabus for ${unit.title}. The highlighted topic below is currently active.`}
        units={[unit]}
        basePath={basePath}
        highlightUnitId={unit.id}
        highlightTopicSlug={topic.slug}
      />

      {/* Breadcrumbs & Active Topic Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href={basePath} className="hover:text-foreground">Subject</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`${basePath}/chapters/${unit.id}`} className="hover:text-foreground">
            {unit.title}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground truncate">{topic.title}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{topic.title}</h1>
      </div>

      {/* All Added Notes in Vertical Scroll */}
      <TopicVerticalNotes
        classSlug={classSlug}
        subjectSlug={subjectSlug}
        unitId={unitId}
        topicSlug={topic.slug}
        topicTitle={topic.title}
      />

      {/* Topic Mindmap Block */}
      <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-foreground">Interactive Topic Mindmap</h3>
        <MindmapInterface
          title={topic.title}
          root={mindmap.root}
          source={mindmap.source}
        />
      </section>

      {/* Additional Unit / Subject Tools & Resource Panels */}
      <ContentTabs
        classSlug={classSlug}
        subjectSlug={subjectSlug}
        unitId={unitId}
        topicSlug={topic.slug}
        unit={unit}
      />

      <div className="pt-4 border-t border-border/60">
        <Link
          href={`${basePath}/chapters/${unit.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Unit Syllabus &amp; Topics</span>
        </Link>
      </div>
    </div>
  );
}
