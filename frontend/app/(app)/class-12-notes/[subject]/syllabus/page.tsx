import { notFound } from "next/navigation";
import { SubjectSyllabusView } from "@/features/syllabus/components/subject-syllabus-view";
import { getSubjectNav, listSubjects } from "@/lib/queries";

// ISR (PHASE 4.1): static-by-nature corpus page — renders purely from the
// local syllabus/content modules, no per-request cookies, headers or API
// data — so the shell is cached 24 h and revalidated in the background.
// Prerendered for every syllabus subject; unknown slugs are a plain 404.
export const revalidate = 86_400;
export const dynamicParams = false;

export function generateStaticParams() {
  return listSubjects("class-12-notes").map((s) => ({ subject: s.slug }));
}




export default async function SyllabusPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const { subject: data } = getSubjectNav("class-12-notes", subject);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{data.name} Syllabus</h1>
      <SubjectSyllabusView
        classSlug="class-12-notes"
        subjectSlug={subject}
        backHref={"/class-12-notes/" + subject}
      />
    </div>
  );
}


