import { SYLLABUS } from "@/lib/syllabus";
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

  let topicTitle = topicSlug;

  if (classSlug.includes("notes")) {
    const { getSubjectSyllabus } = await import("@/lib/syllabus");
    const subject = getSubjectSyllabus(classSlug, subjectSlug);
    if (subject) {
      const units = (subject as any).units || [];
      for (const unit of units) {
        const topics = (unit as any).topics || [];
        const topicIndex = topics.findIndex((t: string) =>
          t.toLowerCase().replace(/\s+/g, "-") === topicSlug ||
          topicSlug === `topic-${topics.indexOf(t) + 1}`
        );
        if (topicIndex >= 0) {
          topicTitle = topics[topicIndex] || topicSlug;
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
  return SYLLABUS.flatMap((cls) =>
    cls.subjects.flatMap((subject) =>
      subject.units.flatMap((unit, unitIndex) =>
        Array.from({ length: unit.topics.length }, (_, topicIndex) => ({
          levelSlug: "library",
          classSlug: cls.slug,
          subjectSlug: subject.slug,
          chapterSlug: `unit-${unitIndex + 1}`,
          topicSlug: `topic-${topicIndex + 1}`,
        }))
      )
    )
  );
}
