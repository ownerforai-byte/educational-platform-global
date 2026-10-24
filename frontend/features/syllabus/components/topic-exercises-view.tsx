import Link from "next/link";
import { ChevronRight, Construction, NotebookPen } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { getUnitTopic } from "@/lib/queries";

/**
 * Exercise scaffold for a single syllabus topic — e.g. the अभ्यास set at the
 * end of each Nepali lesson. The page exists for every unit/topic right away
 * (the Nepali tree is complete from day one); the exercise sets and worked
 * solutions are added here later.
 */
export function TopicExercisesView({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
}: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
}) {
  const data = getUnitTopic(classSlug, subjectSlug, unitId, topicSlug);
  const basePath = `/${classSlug}/${subjectSlug}`;

  if (!data) {
    return (
      <EmptyState
        title="Topic not found"
        description="This topic is not listed in the official syllabus for this unit."
      />
    );
  }

  const { unit, topic } = data;
  const topicHref = `${basePath}/chapters/${unit.id}/topics/${topic.slug}`;

  return (
    <div className="space-y-8">
      {/* Breadcrumbs & title */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href={basePath} className="hover:text-foreground">
            Subject
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`${basePath}/chapters/${unit.id}`}
            className="hover:text-foreground"
          >
            {unit.title}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={topicHref} className="hover:text-foreground">
            {topic.title}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground">Exercises</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Exercises — {topic.title}
        </h1>
        {subjectSlug === "nepali" && (
          <p className="text-lg font-semibold text-muted-foreground">अभ्यास</p>
        )}
      </div>

      {/* Empty for now — the exercise sets land here later. */}
      <EmptyState
        icon={<NotebookPen className="h-6 w-6" />}
        title="Exercises will be added in a future update"
        description="The practice sets and worked solutions for this topic are being prepared. The page is ready — the notes will be added here later."
        action={{
          label: "Back to Topic Notes",
          href: topicHref,
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`${basePath}/chapters/${unit.id}`}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
          >
            ← All topics in {unit.title}
          </Link>
          <span className="text-muted-foreground/40">&bull;</span>
          <Link
            href={`/legend/${classSlug}/${subjectSlug}/${unit.id}/${topic.slug}`}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Concepts, Legends &amp; Facts
          </Link>
        </div>
      </EmptyState>
    </div>
  );
}
