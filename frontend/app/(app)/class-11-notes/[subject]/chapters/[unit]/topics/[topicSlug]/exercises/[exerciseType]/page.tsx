import { notFound } from "next/navigation";
import { TopicExerciseTypeView } from "@/features/syllabus/components/topic-exercise-type-view";
import { getExerciseType } from "@/features/syllabus/exercise-types";
import { getUnitTopic, listExerciseTypeParams } from "@/lib/queries";

const CLASS_SLUG = "class-11-notes";

// ISR (PHASE 4.1): static-by-nature corpus page — renders purely from the
// local syllabus/content modules, no per-request cookies, headers or API
// data — so the shell is cached 24 h and revalidated in the background.
// Prerendered for every syllabus topic × exercise type; unknown slugs are a
// plain 404.
export const revalidate = 86_400;
export const dynamicParams = false;

export function generateStaticParams() {
  return listExerciseTypeParams(CLASS_SLUG);
}

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
