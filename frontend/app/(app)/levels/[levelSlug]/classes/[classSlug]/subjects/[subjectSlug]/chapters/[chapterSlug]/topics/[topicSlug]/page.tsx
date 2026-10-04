import { notFound } from "next/navigation";
import { SYLLABUS } from "@/lib/syllabus";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { TopicDetailView } from "@/features/syllabus/components/topic-detail-view";
import { getUnitTopic, resolveUnitIdFromChapterSlug } from "@/features/syllabus/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

  // Syllabus-backed tracks render the same topic workspace as the canonical
  // /<class>/<subject>/chapters/<unit>/topics/<topic> route: authored notes,
  // mindmap, resources and the official syllabus panel.
  const unitId = resolveUnitIdFromChapterSlug(classSlug, subjectSlug, chapterSlug);
  if (unitId) {
    const data = getUnitTopic(classSlug, subjectSlug, unitId, topicSlug);
    if (!data) notFound();
    return (
      <div className="mx-auto max-w-5xl space-y-6 py-10">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Levels", href: "/levels" },
              { label: classSlug, href: `/levels/${levelSlug}/classes/${classSlug}` },
              {
                label: subjectSlug,
                href: `/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}`,
              },
              {
                label: chapterSlug,
                href: `/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}/chapters/${chapterSlug}`,
              },
              { label: data.topic.title },
            ]}
          />
          <BackButton />
        </div>
        <TopicDetailView
          classSlug={classSlug}
          subjectSlug={subjectSlug}
          unitId={unitId}
          topicSlug={topicSlug}
        />
      </div>
    );
  }

  // Database-backed levels keep the topic title lookup and point at whatever
  // resources exist for the chapter.
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
      subject.units.flatMap((unit) =>
        unit.topics.map((_, topicIndex) => ({
          levelSlug: "library",
          classSlug: cls.slug,
          subjectSlug: subject.slug,
          chapterSlug: unit.id,
          topicSlug: `topic-${topicIndex + 1}`,
        }))
      )
    )
  );
}
