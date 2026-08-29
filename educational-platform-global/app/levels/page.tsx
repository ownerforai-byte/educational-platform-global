import { getEducationLevels } from "@/lib/curriculum";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";

export const runtime = "edge";

export default async function LevelsPage() {
  const levels = await getEducationLevels();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Education Levels</h1>
        <p className="text-muted-foreground">
          Select an education level to browse available classes.
        </p>
      </div>

      {levels.length === 0 ? (
        <UnderDevelopment />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <Link key={level.id} href={`/levels/${level.slug}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>{level.name}</CardTitle>
                  {level.description && (
                    <CardDescription>{level.description}</CardDescription>
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
