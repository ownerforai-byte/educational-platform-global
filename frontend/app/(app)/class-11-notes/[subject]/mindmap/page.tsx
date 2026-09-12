import { notFound } from "next/navigation";
import { MindmapGalleryView } from "@/features/mindmap/components/mindmap-gallery-view";
import { buildMindmapItems } from "@/features/mindmap/queries";
import type { MindmapItem } from "@/features/mindmap/queries";
import { OfficialSyllabusPanel } from "@/features/syllabus/components/official-syllabus-panel";
import { SubjectSectionNav } from "@/features/syllabus/components/subject-section-nav";
import { getSubjectNav } from "@/features/syllabus/queries";

export const dynamic = "force-dynamic";

const CLASS_SLUG = "class-11-notes";


export default async function MindmapPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const { subject, units } = getSubjectNav(CLASS_SLUG, subjectSlug);
  if (!subject) notFound();
  let items: MindmapItem[] = [];
  try {
    items = await buildMindmapItems(subject);
  } catch {
    // loadData fetch failed (likely missing NEXT_PUBLIC_SITE_URL in production)
  }
  const basePath = `/${CLASS_SLUG}/${subjectSlug}`;

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        {subject.name} Mind Maps
      </h1>
      <SubjectSectionNav basePath={basePath} active="mindmap" />
      <OfficialSyllabusPanel
        heading="Syllabus"
        description="Mind maps follow this official unit order."
        units={units}
        basePath={basePath}
        compact
      />
      <MindmapGalleryView title={subject.name} items={items} />
    </div>
  );
}


