import { notFound } from "next/navigation";
import { getChaptersBySubject } from "@/lib/curriculum";
import { SYLLABUS, getSubjectSyllabus, type SubjectSyllabus } from "@/lib/syllabus";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { ChapterDetailView } from "@/features/syllabus/components/chapter-detail-view";
import { resolveUnitIdFromChapterSlug } from "@/features/syllabus/queries";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ levelSlug: string; classSlug: string; subjectSlug: string; chapterSlug: string }>;
}) {
  const { levelSlug, classSlug, subjectSlug, chapterSlug } = await params;

  // Syllabus-backed tracks (class-11-notes / class-12-notes) render the real
  // chapter workspace: official unit syllabus plus every topic with its notes.
  // The canonical tree at /<class>/<subject> owns the section nav, so link
  // there rather than duplicating routes that only exist under it.
  const unitId = resolveUnitIdFromChapterSlug(classSlug, subjectSlug, chapterSlug);
  if (unitId) {
    const subjectName =
      (getSubjectSyllabus(classSlug, subjectSlug) as SubjectSyllabus | undefined)?.name ??
      subjectSlug;
    return (
      <div className="mx-auto max-w-5xl space-y-6 py-10">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Levels", href: "/levels" },
              { label: classSlug, href: `/levels/${levelSlug}/classes/${classSlug}` },
              {
                label: subjectName,
                href: `/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}`,
              },
              { label: "Chapters" },
            ]}
          />
          <BackButton />
        </div>
        <ChapterDetailView
          classSlug={classSlug}
          subjectSlug={subjectSlug}
          unitId={unitId}
          basePath={`/${classSlug}/${subjectSlug}`}
        />
      </div>
    );
  }

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

      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No published topics are attached to this chapter yet.
        <br />
        <Link href={`/${classSlug}/${subjectSlug}`} className="text-primary hover:underline mt-2 inline-block">
          View all notes instead →
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return SYLLABUS.flatMap((cls) =>
    cls.subjects.flatMap((subject) =>
      subject.units.map((unit) => ({
        levelSlug: "library",
        classSlug: cls.slug,
        subjectSlug: subject.slug,
        chapterSlug: unit.id,
      }))
    )
  );
}
