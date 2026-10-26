import { notFound } from "next/navigation";
import { TopicExerciseTypeView } from "@/features/syllabus/components/topic-exercise-type-view";
import { getExerciseType } from "@/features/syllabus/exercise-types";
import { getUnitTopic } from "@/lib/queries";

const CLASS_SLUG = "class-12-notes";

export const dynamic = "force-dynamic";

export default async function TopicExerciseTypePage({
  params,
}: {
  params: Promise<{
    subject: string;
    unit: string;
    topicSlug: string;
    exerciseType: string;
  }>;
}) {
  const { subject, unit, topicSlug, exerciseType } = await params;
  if (!getUnitTopic(CLASS_SLUG, subject, unit, topicSlug)) notFound();
  if (!getExerciseType(subject, exerciseType)) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <TopicExerciseTypeView
        classSlug={CLASS_SLUG}
        subjectSlug={subject}
        unitId={unit}
        topicSlug={topicSlug}
        exerciseTypeId={exerciseType}
      />
    </div>
  );
}
