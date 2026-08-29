import { notFound } from "next/navigation";
import { ChapterDetailView } from "@/features/syllabus/components/chapter-detail-view";
import { getUnit } from "@/features/syllabus/queries";




export default async function ChapterPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}) {
  const { subject, unit } = await params;
  const data = getUnit("class-12e", subject, unit);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
      <ChapterDetailView
        classSlug="class-12e"
        subjectSlug={subject}
        unitId={unit}
        basePath={"/class-12e/" + subject}
      />
    </div>
  );
}

export const runtime = "edge";
