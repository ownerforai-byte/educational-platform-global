import { getChaptersBySubject } from "@/lib/curriculum";
import { getSubjectSyllabus, type SubjectSyllabus } from "@/lib/syllabus";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ levelSlug: string; classSlug: string; subjectSlug: string; chapterSlug: string }>;
}) {
  const { levelSlug, classSlug, subjectSlug, chapterSlug } = await params;

  // Try API first, fall back to syllabus
  let chapters: Array<{ id: string; slug: string; title: string; description: string | null }> = [];

  try {
    const apiChapters = await getChaptersBySubject(levelSlug, classSlug, subjectSlug);
    chapters = apiChapters.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
    }));
  } catch {}

  // Fall back to syllabus data (units are treated as chapters)
  if (!chapters.length && classSlug.includes("notes")) {
    const syllabusSubject = getSubjectSyllabus(classSlug, subjectSlug) as SubjectSyllabus | null;
    if (syllabusSubject) {
      chapters = syllabusSubject.units.map((u, i) => ({
        id: u.id,
        slug: `unit-${i + 1}`,
        title: u.title,
        description: `${u.topics.length} topics`,
      }));
    }
  }

  const chapter = chapters.find((c) => c.slug === chapterSlug);

  if (!chapter) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Chapter not found</h1>
      </div>
    );
  }

  // Find parent subject name for breadcrumbs
  let subjectName = subjectSlug;
  if (classSlug.includes("notes")) {
    const subjectData = getSubjectSyllabus(classSlug, subjectSlug);
    if (subjectData) subjectName = (subjectData as SubjectSyllabus).name;
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: classSlug, href: `/levels/${levelSlug}/classes/${classSlug}` },
    { label: subjectName, href: `/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}` },
    { label: chapter.title },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{chapter.title}</h1>
        {chapter.description && (
          <p className="text-muted-foreground">{chapter.description}</p>
        )}
      </div>

      {/* Note: Topics would need to be fetched per chapter. For now showing all topics */}
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Topics for this chapter will be available once the database is populated with API data.
        <br />
        <Link href={`/${classSlug}/${subjectSlug}`} className="text-primary hover:underline mt-2 inline-block">
          View all notes instead →
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const params: Array<{ levelSlug: string; classSlug: string; subjectSlug: string; chapterSlug: string }> = [];
  for (const cls of [
    { slug: "class-11-notes", subjects: ["mathematics", "physics", "chemistry", "biology"] },
    { slug: "class-12-notes", subjects: ["mathematics", "physics", "chemistry", "biology"] },
  ]) {
    for (const subjectSlug of cls.subjects) {
      const units = 10; // Approximate
      for (let i = 1; i <= units; i++) {
        params.push({
          levelSlug: "library",
          classSlug: cls.slug,
          subjectSlug,
          chapterSlug: `unit-${i}`,
        });
      }
    }
  }
  return params;
}
