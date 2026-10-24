import { notFound } from "next/navigation";
import { TopicDetailView } from "@/features/syllabus/components/topic-detail-view";
import { getUnitTopic } from "@/lib/queries";



const CLASS_SLUG = "class-12-notes";

export const dynamic = "force-dynamic";


export default async function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topicSlug: string }>;
}) {
  const { subject, unit, topicSlug } = await params;
  if (!getUnitTopic(CLASS_SLUG, subject, unit, topicSlug)) notFound();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-1 py-6 sm:py-8 md:py-10">
      <TopicDetailView
        classSlug={CLASS_SLUG}
        subjectSlug={subject}
        unitId={unit}
        topicSlug={topicSlug}
      />
    </div>
  );
}


