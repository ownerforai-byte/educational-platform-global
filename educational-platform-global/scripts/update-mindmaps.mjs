import fs from "fs";
import path from "path";

const tracks = [
  "class-11e",
  "class-11-more",
  "class-12-notes",
  "class-12e",
  "class-12-more",
];

for (const track of tracks) {
  const file = path.join("app", track, "[subject]", "mindmap", "page.tsx");
  const content = `import { notFound } from "next/navigation";
import { MindmapGalleryView } from "@/features/mindmap/components/mindmap-gallery-view";
import { buildMindmapItems } from "@/features/mindmap/queries";
import { SubjectSectionNav } from "@/features/syllabus/components/subject-section-nav";
import { getSubjectNav, listSubjects } from "@/features/syllabus/queries";

const CLASS_SLUG = "${track}";

export function generateStaticParams() {
  return listSubjects(CLASS_SLUG).map((s) => ({ subject: s.slug }));
}

export default async function MindmapPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const { subject } = getSubjectNav(CLASS_SLUG, subjectSlug);
  if (!subject) notFound();
  const items = await buildMindmapItems(subject);
  const basePath = \`/\${CLASS_SLUG}/\${subjectSlug}\`;

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        {subject.name} Mind Maps
      </h1>
      <SubjectSectionNav basePath={basePath} active="mindmap" />
      <MindmapGalleryView title={subject.name} items={items} />
    </div>
  );
}
`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

console.log("mindmaps ok");
