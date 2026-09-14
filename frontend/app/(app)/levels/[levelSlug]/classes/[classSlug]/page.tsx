import { getClassBySlug, getSubjectsByClass } from "@/lib/curriculum";
import { SYLLABUS } from "@/lib/syllabus";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿", Chemistry: "🧪", English: "📖",
  Mathematics: "🔢", Nepali: "🇳🇵", Physics: "⚡",
};

export default async function ClassPage({
  params,
}: {
  params: Promise<{ levelSlug: string; classSlug: string }>;
}) {
  const { levelSlug, classSlug } = await params;

  // Try API first, fall back to syllabus
  let clsName = "";
  let clsDescription: string | null = null;
  let subjects: Array<{ id: string; slug: string; name: string; description: string | null }> = [];

  try {
    const apiClass = await getClassBySlug(levelSlug, classSlug);
    const apiSubjects = await getSubjectsByClass(levelSlug, classSlug);
    
    if (apiClass) {
      clsName = apiClass.name;
      clsDescription = apiClass.description;
      subjects = apiSubjects.map((s) => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        description: s.description,
      }));
    }
  } catch {}

  // Fall back to syllabus data
  if (!subjects.length) {
    const syllabusClass = SYLLABUS.find((c) => c.slug === classSlug);
    if (syllabusClass) {
      clsName = syllabusClass.name;
      clsDescription = syllabusClass.description ?? null;
      subjects = syllabusClass.subjects.map((s) => ({
        id: s.slug,
        slug: s.slug,
        name: s.name,
        description: s.description,
      }));
    }
  }

  if (!subjects.length) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Class not found</h1>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: clsName },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{clsName}</h1>
        {clsDescription && (
          <p className="text-muted-foreground">{clsDescription}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/levels/${levelSlug}/classes/${classSlug}/subjects/${subject.slug}`}
          >
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{SUBJECT_EMOJI[subject.name] ?? "📘"}</span>
                  {subject.name}
                </CardTitle>
                {subject.description && (
                  <CardDescription>{subject.description}</CardDescription>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return SYLLABUS.flatMap((cls) =>
    ["library"].map((levelSlug) => ({
      levelSlug,
      classSlug: cls.slug,
    }))
  );
}
