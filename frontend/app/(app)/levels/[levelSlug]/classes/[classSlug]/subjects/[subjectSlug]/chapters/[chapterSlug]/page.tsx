import { getChapterDetail } from "@/lib/curriculum";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{
    levelSlug: string;
    classSlug: string;
    subjectSlug: string;
    chapterSlug: string;
  }>;
}) {
  const { levelSlug, classSlug, subjectSlug, chapterSlug } = await params;
  const detail = await getChapterDetail(levelSlug, classSlug, subjectSlug, chapterSlug);

  if (!detail) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Chapter not found</h1>
      </div>
    );
  }

  const { chapter, topics, progress } = detail;
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  // Fetch subject name for breadcrumbs
  let subjectName = chapter.title;
  try {
    const resp = await fetch(`/api/subjects/${encodeURIComponent(subjectSlug)}`);
    const json = await resp.json();
    subjectName = json.subject?.name ?? subjectSlug;
  } catch {}

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: "Class 11 Notes", href: "/levels/library/classes/class-11-notes" },
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

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          {progress.completed}/{progress.total} topics completed
        </span>
        <div className="h-2 w-32 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {topics.length === 0 ? (
        <UnderDevelopment />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}/chapters/${chapter.slug}/topics/${topic.slug}`}
            >
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                  {topic.description && (
                    <CardDescription>{topic.description}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
