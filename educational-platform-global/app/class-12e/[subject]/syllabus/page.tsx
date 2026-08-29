import { notFound } from "next/navigation";
import { SubjectSyllabusView } from "@/features/syllabus/components/subject-syllabus-view";
import { getSubjectNav } from "@/features/syllabus/queries";




export default async function SyllabusPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const { subject: data } = getSubjectNav("class-12e", subject);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{data.name} Syllabus</h1>
      <SubjectSyllabusView
        classSlug="class-12e"
        subjectSlug={subject}
        backHref={"/class-12e/" + subject}
      />
    </div>
  );
}

export const runtime = "edge";
