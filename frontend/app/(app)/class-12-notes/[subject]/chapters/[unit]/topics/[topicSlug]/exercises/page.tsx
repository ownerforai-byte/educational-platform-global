import { notFound } from "next/navigation";
import { TopicExercisesView } from "@/features/syllabus/components/topic-exercises-view";
import { getUnitTopic } from "@/lib/queries";

const CLASS_SLUG = "class-12-notes";

export const dynamic = "force-dynamic";

export default async function TopicExercisesPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topicSlug: string }>;
}) {
  const { subject, unit, topicSlug } = await params;
  if (!getUnitTopic(CLASS_SLUG, subject, unit, topicSlug)) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <TopicExercisesView
        classSlug={CLASS_SLUG}
        subjectSlug={subject}
        unitId={unit}
        topicSlug={topicSlug}
      />
    </div>
  );
}
