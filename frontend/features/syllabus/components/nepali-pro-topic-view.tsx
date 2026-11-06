import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { TopicComingSoonBanner } from "@/components/content/topic-coming-soon-banner";
import { hasTopicManifestNotes } from "@/lib/topic-content-index";
import { ContentTabs } from "@/components/content/content-tabs";
import { TopicProgressControls } from "@/components/progress/topic-progress-controls";
import { getUnitTopic } from "../queries";

/**
 * Nepali syllabus pro topic page — the study surface is only companion content
 * tabs (notes, self-check, related, bounds, exam tips, journal, resources).
 */
export async function NepaliProTopicView({
  classSlug,
  unitId,
  topicSlug,
}: {
  classSlug: string;
  unitId: string;
  topicSlug: string;
}) {
  const subjectSlug = "nepali";
  const data = getUnitTopic(classSlug, subjectSlug, unitId, topicSlug);
  const basePath = `/${classSlug}/${subjectSlug}`;

  if (!data) {
    return (
      <EmptyState
        title="Topic not found"
        description="This topic is not listed in the official Nepali syllabus for this unit."
      />
    );
  }

  const { unit, topic } = data;
  const hasNotes = await hasTopicManifestNotes(subjectSlug, unitId, topic.slug);
  const topicPath = `${basePath}/chapters/${unit.id}/topics/${topic.slug}`;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href={basePath} className="hover:text-foreground">
            Nepali
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`${basePath}/chapters/${unit.id}`} className="hover:text-foreground">
            {unit.title}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground truncate">Pro · {topic.title}</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Nepali syllabus · Pro study</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{topic.title}</h1>
      </div>

      <TopicProgressControls
        classSlug={classSlug}
        subjectSlug={subjectSlug}
        unitSlug={unit.id}
        topicSlug={topic.slug}
      />

      {!hasNotes && (
        <TopicComingSoonBanner
          topicTitle={topic.title}
          backHref={`${basePath}/chapters/${unit.id}`}
          backLabel="Unit topics"
        />
      )}

      <ContentTabs
        classSlug={classSlug}
        subjectSlug={subjectSlug}
        unitId={unitId}
        topicSlug={topic.slug}
        unit={unit}
        tabProfile="nepali-syllabus-pro"
      />

      <div className="flex flex-wrap gap-3 border-t border-border/60 pt-4">
        <Link
          href={topicPath}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Full topic page (mindmap &amp; exercises)
        </Link>
        <Link
          href={`${basePath}/chapters/${unit.id}`}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Back to unit topics
        </Link>
      </div>
    </div>
  );
}
