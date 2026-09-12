import { TheorySectionView } from "@/features/syllabus/components/theory-section-view";
import { listSubjects } from "@/features/syllabus/queries";

const CLASS_SLUG = "class-11-notes";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return listSubjects(CLASS_SLUG).map((s) => ({ subject: s.slug }));
}

export default async function TheoryPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <TheorySectionView classSlug={CLASS_SLUG} subjectSlug={subject} />;
}
