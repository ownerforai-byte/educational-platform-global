import { ChaptersIndexView } from "@/features/syllabus/components/chapters-index-view";
import { listSubjects } from "@/lib/queries";

// ISR (PHASE 4.1): static-by-nature corpus page — renders purely from the
// local syllabus/content modules, no per-request cookies, headers or API
// data — so the shell is cached 24 h and revalidated in the background.
// Prerendered for every syllabus subject; unknown slugs are a plain 404.
export const revalidate = 86_400;
export const dynamicParams = false;

export function generateStaticParams() {
  return listSubjects("class-11-notes").map((s) => ({ subject: s.slug }));
}




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
        classSlug="class-11-notes"
        subjectSlug={subject}
        basePath={"/class-11-notes/" + subject}
      />
    </div>
  );
}


