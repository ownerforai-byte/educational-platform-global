import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopicExercisesView } from "@/features/syllabus/components/topic-exercises-view";
import { TopicExerciseTypeView } from "@/features/syllabus/components/topic-exercise-type-view";
import { NEPALI_EXERCISE_TYPES } from "@/features/syllabus/exercise-types";
import { SYLLABUS, getUnitTopicEntries } from "@/lib/core/syllabus";

/**
 * The per-topic exercise-type pages (owner 2026-10-24: "create all types of
 * exercise pages for each unit's topic of nepali as it has no pages for its
 * contents"). The overview links every type to its own scaffold page, and
 * each type page carries the full type switcher — the practice sets and
 * worked solutions land on these pages later.
 */

const NEPALI = SYLLABUS.find((cls) => cls.slug === "class-11-notes")!.subjects.find(
  (subject) => subject.slug === "nepali",
)!;
const UNIT = NEPALI.units[0];
const TOPIC = getUnitTopicEntries(UNIT)[0];

const CLASS_SLUG = "class-11-notes";
const SUBJECT_SLUG = "nepali";
const TOPIC_HREF = `/${CLASS_SLUG}/${SUBJECT_SLUG}/chapters/${UNIT.id}/topics/${TOPIC.slug}`;
const EXERCISES_HREF = `${TOPIC_HREF}/exercises`;

describe("Nepali exercise-type pages", () => {
  it("links every exercise type from the topic exercises overview", () => {
    render(
      <TopicExercisesView
        classSlug={CLASS_SLUG}
        subjectSlug={SUBJECT_SLUG}
        unitId={UNIT.id}
        topicSlug={TOPIC.slug}
      />,
    );

    for (const type of NEPALI_EXERCISE_TYPES) {
      const link = screen.getByRole("link", { name: new RegExp(type.title) });
      expect(link, `${type.id} card missing`).toHaveAttribute(
        "href",
        `${EXERCISES_HREF}/${type.id}`,
      );
    }
  });

  it("renders one type page with its switcher, empty scaffold and topic links", () => {
    render(
      <TopicExerciseTypeView
        classSlug={CLASS_SLUG}
        subjectSlug={SUBJECT_SLUG}
        unitId={UNIT.id}
        topicSlug={TOPIC.slug}
        exerciseTypeId="vyakaran"
      />,
    );

    // Header: type + topic, with the textbook अभ्यास label.
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: `Grammar Practice — ${TOPIC.title}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("व्याकरण").length).toBeGreaterThan(0);

    // Switcher: the overview plus every sibling type as its own page.
    expect(screen.getByRole("link", { name: "All Exercises" })).toHaveAttribute(
      "href",
      EXERCISES_HREF,
    );
    for (const type of NEPALI_EXERCISE_TYPES) {
      if (type.id === "vyakaran") continue;
      const link = screen.getByRole("link", { name: type.devanagari });
      expect(link, `${type.id} switcher link missing`).toHaveAttribute(
        "href",
        `${EXERCISES_HREF}/${type.id}`,
      );
    }

    // Scaffold: empty today, ready for the exercise sets later.
    expect(
      screen.getByText("व्याकरण अभ्यास सामग्री चाँडै थपिनेछ"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Topic Notes" }),
    ).toHaveAttribute("href", TOPIC_HREF);
    expect(
      screen.getByRole("link", { name: /Concepts, Legends & Facts/ }),
    ).toHaveAttribute(
      "href",
      `/legend/${CLASS_SLUG}/${SUBJECT_SLUG}/${UNIT.id}/${TOPIC.slug}`,
    );
  });
});
