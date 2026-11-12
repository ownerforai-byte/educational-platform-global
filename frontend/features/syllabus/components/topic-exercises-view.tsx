import Link from "next/link";
import { ChevronRight, Construction, NotebookPen } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { getUnitTopic } from "@/lib/queries";
import { getExerciseTypes } from "@/features/syllabus/exercise-types";

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
  const exercisesHref = `${topicHref}/exercises`;
  const exerciseTypes = getExerciseTypes(subjectSlug);

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

      {/* All exercise types of this topic — each type has its own page. */}
      {exerciseTypes.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-foreground">
              अभ्यासका भागहरू — Exercise Types
            </h2>
            <p className="text-sm text-muted-foreground">
              Every exercise type of this topic has its own page — choose one
              below. The practice sets and worked solutions are added there.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exerciseTypes.map((type) => (
              <Link
                key={type.id}
                href={`${exercisesHref}/${type.id}`}
                className="group rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-foreground group-hover:text-primary">
                    {type.title}
                  </h3>
                  <span className="text-sm font-semibold text-primary">
                    {type.devanagari}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty for now — the exercise sets land here later. */}
      <EmptyState
        icon={<NotebookPen className="h-6 w-6" />}
        title="Exercises will be added in a future update"
        description={
          exerciseTypes.length > 0
            ? "The practice sets and worked solutions are being prepared. Each exercise type above has its own page ready — the exercises will be added there later."
            : "The practice sets and worked solutions for this topic are being prepared. The page is ready — the notes will be added here later."
        }
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
          <span className="text-muted-foreground/40">&bull;</span>
          {/* Real practice content exists per unit in the PYQ bank — link there. */}
          <Link
            href="/pyqs"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Practice drills in the PYQ Bank →
          </Link>
        </div>
      </EmptyState>
    </div>
  );
}
