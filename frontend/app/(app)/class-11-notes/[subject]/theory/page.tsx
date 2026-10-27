import { TheorySectionView } from "@/features/syllabus/components/theory-section-view";
import { listSubjects } from "@/lib/queries";

const CLASS_SLUG = "class-11-notes";

// ISR (PHASE 4.1): static-by-nature corpus page — renders purely from the
// local syllabus/content modules, no per-request cookies, headers or API
// data — so the shell is cached 24 h and revalidated in the background.
export const revalidate = 86_400;

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
