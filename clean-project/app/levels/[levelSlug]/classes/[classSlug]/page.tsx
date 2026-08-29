import { getClassBySlug, getSubjectsByClass } from "@/lib/curriculum";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";

export const runtime = "edge";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ levelSlug: string; classSlug: string }>;
}) {
  const { levelSlug, classSlug } = await params;
  const [cls, subjects] = await Promise.all([
    getClassBySlug(levelSlug, classSlug),
    getSubjectsByClass(levelSlug, classSlug),
  ]);

  if (!cls) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Class not found</h1>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: cls.name },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{cls.name}</h1>
        {cls.description && (
          <p className="text-muted-foreground">{cls.description}</p>
        )}
      </div>

      {subjects.length === 0 ? (
        <UnderDevelopment />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/levels/${levelSlug}/classes/${cls.slug}/subjects/${subject.slug}`}
            >
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>{subject.name}</CardTitle>
                  {subject.description && (
                    <CardDescription>{subject.description}</CardDescription>
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
