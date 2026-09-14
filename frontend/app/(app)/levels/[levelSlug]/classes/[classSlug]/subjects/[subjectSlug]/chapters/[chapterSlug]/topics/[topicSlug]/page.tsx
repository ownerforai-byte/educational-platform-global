import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import Link from "next/link";

export default async function TopicPage({
  params,
}: {
  params: Promise<{
    levelSlug: string;
    classSlug: string;
    subjectSlug: string;
    chapterSlug: string;
    topicSlug: string;
  }>;
}) {
  const { levelSlug, classSlug, subjectSlug, chapterSlug, topicSlug } = await params;

  // Find the syllabus data for this topic
  let topicTitle = topicSlug;
  let isFromSyllabus = false;

  if (classSlug.includes("notes")) {
    // Try to find topic in syllabus
    const { getSubjectSyllabus } = await import("@/lib/syllabus");
    const subject = getSubjectSyllabus(classSlug, subjectSlug);
    if (subject) {
      // Find the unit/chapter that contains this topic
      const units = (subject as any).units || [];
      for (const unit of units) {
        const topics = (unit as any).topics || [];
        const topicIndex = topics.findIndex((t: string) => 
          t.toLowerCase().replace(/\s+/g, "-") === topicSlug ||
          topicSlug === `topic-${topics.indexOf(t) + 1}`
        );
        if (topicIndex >= 0) {
          topicTitle = topics[topicIndex] || topicSlug;
          isFromSyllabus = true;
          break;
        }
      }
    }
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: classSlug, href: `/levels/${levelSlug}/classes/${classSlug}` },
    { label: subjectSlug, href: `/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}` },
    { label: chapterSlug, href: `/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}/chapters/${chapterSlug}` },
    { label: topicTitle },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{topicTitle}</h1>
        <p className="text-muted-foreground">
          Topic content coming soon. For now, check out the notes pages.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        This topic will be available once we populate the database with study materials.
        <br />
        <Link 
          href={`/${classSlug}/${subjectSlug}`} 
          className="text-primary hover:underline mt-2 inline-block"
        >
          View all notes →
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const params: Array<{ levelSlug: string; classSlug: string; subjectSlug: string; chapterSlug: string; topicSlug: string }> = [];
  for (const cls of [
    { slug: "class-11-notes", subjects: ["mathematics", "physics", "chemistry", "biology"] },
    { slug: "class-12-notes", subjects: ["mathematics", "physics", "chemistry", "biology"] },
  ]) {
    for (const subjectSlug of cls.subjects) {
      for (let unit = 1; unit <= 10; unit++) {
        for (let topic = 1; topic <= 5; topic++) {
          params.push({
            levelSlug: "library",
            classSlug: cls.slug,
            subjectSlug,
            chapterSlug: `unit-${unit}`,
            topicSlug: `topic-${topic}`,
          });
        }
      }
    }
  }
  return params;
}
