import { getSubjectBySlug, getChaptersBySubject } from "@/lib/curriculum";
import { SYLLABUS, getSubjectSyllabus, getUnitTopicEntries } from "@/lib/syllabus";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ levelSlug: string; classSlug: string; subjectSlug: string }>;
}) {
  const { levelSlug, classSlug, subjectSlug } = await params;

  // Try API first, fall back to syllabus
  let subjectName = "";
  let subjectDescription: string | null = null;
  let chapters: Array<{ id: string; slug: string; title: string; description: string | null }> = [];

  try {
    const apiSubject = await getSubjectBySlug(levelSlug, classSlug, subjectSlug);
    if (apiSubject) {
      subjectName = apiSubject.name;
      subjectDescription = apiSubject.description;
      const apiChapters = await getChaptersBySubject(levelSlug, classSlug, subjectSlug);
      chapters = apiChapters.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
      }));
    }
  } catch {}

  // Syllabus data backs the `*-notes` tracks: subject name, unit list and the
  // per-unit topic links into the authored notes workspace.
  const syllabusSubject = classSlug.includes("notes")
    ? getSubjectSyllabus(classSlug, subjectSlug)
    : undefined;

  if (!chapters.length && syllabusSubject) {
    subjectName = syllabusSubject.name;
    subjectDescription = syllabusSubject.description;
    chapters = syllabusSubject.units.map((u) => ({
      id: u.id,
      slug: u.id,
      title: u.title,
      description: `${u.topics.length} topics`,
    }));
  }

  if (!subjectName) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Subject not found</h1>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: classSlug, href: `/levels/${levelSlug}/classes/${classSlug}` },
    { label: subjectName },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{subjectName}</h1>
        {subjectDescription && (
          <p className="text-muted-foreground">{subjectDescription}</p>
        )}
      </div>

      {chapters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No chapters available for this subject yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}/chapters/${chapter.slug}`}
            >
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>{chapter.title}</CardTitle>
                  {chapter.description && (
                    <CardDescription>{chapter.description}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Topic shortcuts straight into the authored notes workspace */}
      {syllabusSubject && syllabusSubject.units.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Topics with notes
          </h2>
          <div className="space-y-4">
            {syllabusSubject.units.map((unit) => (
              <div key={unit.id} className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-sm font-semibold text-foreground">{unit.title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {getUnitTopicEntries(unit).map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/${classSlug}/${subjectSlug}/chapters/${unit.id}/topics/${topic.slug}`}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-border/70 bg-background/70 text-foreground/90 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return SYLLABUS.flatMap((cls) =>
    ["library"].map((levelSlug) =>
      cls.subjects.map((s) => ({
        levelSlug,
        classSlug: cls.slug,
        subjectSlug: s.slug,
      }))
    )
  ).flat();
}
