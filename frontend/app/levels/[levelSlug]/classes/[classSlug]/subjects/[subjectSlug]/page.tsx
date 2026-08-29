import { getSubjectDetail } from "@/lib/curriculum";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";



export default async function SubjectPage({
  params,
}: {
  params: Promise<{ levelSlug: string; classSlug: string; subjectSlug: string }>;
}) {
  const { levelSlug, classSlug, subjectSlug } = await params;
  const detail = await getSubjectDetail(
    levelSlug,
    classSlug,
    subjectSlug
  );

  if (!detail) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Subject not found</h1>
      </div>
    );
  }

  const { subject, chapters, chapterProgress } = detail;

  const progressMap = new Map(
    chapterProgress.map((p) => [p.chapterId, p])
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: subject.name },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
        {subject.description && (
          <p className="text-muted-foreground">{subject.description}</p>
        )}
      </div>

      {chapters.length === 0 ? (
        <UnderDevelopment />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => {
            const progress = progressMap.get(chapter.id);
            const total = progress?.total ?? 0;
            const completed = progress?.completed ?? 0;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <Link
                key={chapter.id}
                href={`/levels/${levelSlug}/classes/${classSlug}/subjects/${subject.slug}/chapters/${chapter.slug}`}
              >
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <CardTitle>{chapter.title}</CardTitle>
                    {chapter.description && (
                      <CardDescription>{chapter.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{total} topic{total !== 1 ? "s" : ""}</span>
                        <span>{completed}/{total} completed</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
