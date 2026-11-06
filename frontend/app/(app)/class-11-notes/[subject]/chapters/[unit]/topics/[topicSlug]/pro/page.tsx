import { notFound } from "next/navigation";
import { LanguageProTopicView } from "@/features/syllabus/components/language-pro-topic-view";
import { hasLanguageProTrack } from "@/features/syllabus/language-pro";
import { getUnitTopic, listTopicParams } from "@/lib/queries";

const CLASS_SLUG = "class-11-notes";

export const revalidate = 86_400;
export const dynamicParams = false;

export function generateStaticParams() {
  return listTopicParams(CLASS_SLUG).filter(({ subject }) => hasLanguageProTrack(subject));
}

export default async function LanguageProTopicPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topicSlug: string }>;
}) {
  const { subject, unit, topicSlug } = await params;
  if (!hasLanguageProTrack(subject)) notFound();
  if (!getUnitTopic(CLASS_SLUG, subject, unit, topicSlug)) notFound();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-1 py-6 sm:py-8 md:py-10">
      <LanguageProTopicView
        classSlug={CLASS_SLUG}
        subjectSlug={subject}
        unitId={unit}
        topicSlug={topicSlug}
      />
    </div>
  );
}
