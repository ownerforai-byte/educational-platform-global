import { notFound } from "next/navigation";
import { TopicDetailView } from "@/features/syllabus/components/topic-detail-view";
import { getUnitTopic } from "@/features/syllabus/queries";



const CLASS_SLUG = "class-11-more";


export default async function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topicSlug: string }>;
}) {
  const { subject, unit, topicSlug } = await params;
  if (!getUnitTopic(CLASS_SLUG, subject, unit, topicSlug)) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <TopicDetailView
        classSlug={CLASS_SLUG}
        subjectSlug={subject}
        unitId={unit}
        topicSlug={topicSlug}
      />
    </div>
  );
}

export const runtime = "edge";
