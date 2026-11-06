import { notFound } from "next/navigation";
import { NepaliProTopicView } from "@/features/syllabus/components/nepali-pro-topic-view";
import { getUnitTopic, listTopicParams } from "@/lib/queries";

const CLASS_SLUG = "class-12-notes";

export const revalidate = 86_400;
export const dynamicParams = false;

export function generateStaticParams() {
  return listTopicParams(CLASS_SLUG).filter(({ subject }) => subject === "nepali");
}

export default async function NepaliProTopicPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topicSlug: string }>;
}) {
  const { subject, unit, topicSlug } = await params;
  if (subject !== "nepali") notFound();
  if (!getUnitTopic(CLASS_SLUG, subject, unit, topicSlug)) notFound();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-1 py-6 sm:py-8 md:py-10">
      <NepaliProTopicView classSlug={CLASS_SLUG} unitId={unit} topicSlug={topicSlug} />
    </div>
  );
}
