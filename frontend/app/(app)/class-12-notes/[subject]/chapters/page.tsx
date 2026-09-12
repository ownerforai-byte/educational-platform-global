import { ChaptersIndexView } from "@/features/syllabus/components/chapters-index-view";




export default async function ChaptersPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Chapters</h1>
      <ChaptersIndexView
        classSlug="class-12-notes"
        subjectSlug={subject}
        basePath={"/class-12-notes/" + subject}
      />
    </div>
  );
}


