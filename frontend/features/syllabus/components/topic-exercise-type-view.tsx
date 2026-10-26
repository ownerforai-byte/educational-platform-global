import Link from "next/link";
import { ChevronRight, NotebookPen } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { getUnitTopic } from "@/lib/queries";
import {
  getExerciseType,
  getExerciseTypes,
} from "@/features/syllabus/exercise-types";

/**
 * One exercise-type page for a single syllabus topic — e.g. the शब्द भण्डार or
 * व्याकरण अभ्यास of a Nepali lesson. Every unit/topic gets one page per type
 * (see features/syllabus/exercise-types.ts); the exercise sets and worked
 * solutions land on these pages later.
 */
export function TopicExerciseTypeView({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  exerciseTypeId,
}: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  exerciseTypeId: string;
}) {
  const data = getUnitTopic(classSlug, subjectSlug, unitId, topicSlug);
  const type = getExerciseType(subjectSlug, exerciseTypeId);
  const basePath = `/${classSlug}/${subjectSlug}`;
  const types = getExerciseTypes(subjectSlug);

  if (!data || !type) {
    return (
      <EmptyState
        title="Exercise page not found"
        description="This exercise type is not part of the syllabus taxonomy for this topic."
      />
    );
  }

  const { unit, topic } = data;
  const topicHref = `${basePath}/chapters/${unit.id}/topics/${topic.slug}`;
  const exercisesHref = `${topicHref}/exercises`;

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
          <Link href={exercisesHref} className="hover:text-foreground">
            Exercises
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground">{type.title}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {type.title} — {topic.title}
        </h1>
        <p className="text-lg font-semibold text-muted-foreground">
          {type.devanagari}
        </p>
      </div>

      {/* Exercise-type switcher — every type of this topic is one click away. */}
      <nav
        aria-label="Exercise types"
        className="flex flex-wrap items-center gap-2"
      >
        <Link
          href={exercisesHref}
          className="rounded-full border border-border/60 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          All Exercises
        </Link>
        {types.map((entry) =>
          entry.id === type.id ? (
            <span
              key={entry.id}
              className="rounded-full border border-primary/60 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              {entry.devanagari}
            </span>
          ) : (
            <Link
              key={entry.id}
              href={`${exercisesHref}/${entry.id}`}
              className="rounded-full border border-border/60 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {entry.devanagari}
            </Link>
          ),
        )}
      </nav>

      {/* Empty for now — this type's exercise set lands here later. */}
      <EmptyState
        icon={<NotebookPen className="h-6 w-6" />}
        title={`${type.devanagari} अभ्यास सामग्री चाँडै थपिनेछ`}
        description={`The ${type.title.toLowerCase()} exercises for this topic are being prepared. ${type.description} The page is ready — the exercise sets and worked solutions will be added here later.`}
        action={{
          label: "Back to Topic Notes",
          href: topicHref,
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={exercisesHref}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
          >
            ← All exercises of {topic.title}
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
