import { notFound } from "next/navigation";
import { ChapterDetailView } from "@/features/syllabus/components/chapter-detail-view";
import { getUnit, listUnitParams } from "@/lib/queries";

// ISR (PHASE 4.1): static-by-nature corpus page — renders purely from the
// local syllabus/content modules, no per-request cookies, headers or API
// data — so the shell is cached 24 h and revalidated in the background.
// Prerendered for every syllabus unit; unknown slugs are a plain 404.
export const revalidate = 86_400;
export const dynamicParams = false;

export function generateStaticParams() {
  return listUnitParams("class-12-notes");
}




export default async function ChapterPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}) {
  const { subject, unit } = await params;
  const data = getUnit("class-12-notes", subject, unit);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
      <ChapterDetailView
        classSlug="class-12-notes"
        subjectSlug={subject}
        unitId={unit}
        basePath={"/class-12-notes/" + subject}
      />
    </div>
  );
}


