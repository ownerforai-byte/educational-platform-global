import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";
import { listSubjects } from "@/features/syllabus/queries";

const CLASS_SLUG = "class-11-notes";

export function generateStaticParams() {
  return listSubjects(CLASS_SLUG).map((s) => ({ subject: s.slug }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={subject} />;
}


