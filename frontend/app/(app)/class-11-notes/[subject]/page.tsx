import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";
import { listSubjects } from "@/lib/queries";

// ISR (PHASE 4.1): static-by-nature corpus page — renders purely from the
// local syllabus/content modules, no per-request cookies, headers or API
// data — so the shell is cached 24 h and revalidated in the background.
export const revalidate = 86_400;

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


