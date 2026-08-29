import { getLevelBySlug, getClassesByLevel } from "@/lib/curriculum";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";



export default async function LevelPage({
  params,
}: {
  params: Promise<{ levelSlug: string }>;
}) {
  const { levelSlug } = await params;
  const [level, classes] = await Promise.all([
    getLevelBySlug(levelSlug),
    getClassesByLevel(levelSlug),
  ]);

  if (!level) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Level not found</h1>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: level.name },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{level.name}</h1>
        {level.description && (
          <p className="text-muted-foreground">{level.description}</p>
        )}
      </div>

      {classes.length === 0 ? (
        <UnderDevelopment />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Link key={cls.id} href={`/levels/${level.slug}/classes/${cls.slug}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>{cls.name}</CardTitle>
                  {cls.description && (
                    <CardDescription>{cls.description}</CardDescription>
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
