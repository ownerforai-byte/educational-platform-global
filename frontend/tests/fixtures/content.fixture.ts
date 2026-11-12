import type { ClassNotesSlug, SubjectSlug } from "@/types/content";
import { mergeFixture, type DeepPartial } from "./factory";

export type TopicFixture = {
  classSlug: ClassNotesSlug;
  subjectSlug: SubjectSlug;
  unitSlug: string;
  unitTitle: string;
  topicSlug: string;
  topicTitle: string;
};

export type UnitFixture = {
  classSlug: ClassNotesSlug;
  subjectSlug: SubjectSlug;
  unitSlug: string;
  unitTitle: string;
  topics: string[];
};

const TOPIC_BASE: TopicFixture = {
  classSlug: "class-11-notes",
  subjectSlug: "physics",
  unitSlug: "mechanics",
  unitTitle: "Mechanics",
  topicSlug: "kinematics",
  topicTitle: "Kinematics",
};

export function buildTopic(overrides?: DeepPartial<TopicFixture>): TopicFixture {
  return mergeFixture(TOPIC_BASE, overrides);
}

export function buildUnit(overrides?: DeepPartial<UnitFixture>): UnitFixture {
  return mergeFixture(
    {
      classSlug: TOPIC_BASE.classSlug,
      subjectSlug: TOPIC_BASE.subjectSlug,
      unitSlug: TOPIC_BASE.unitSlug,
      unitTitle: TOPIC_BASE.unitTitle,
      topics: [TOPIC_BASE.topicTitle],
    },
    overrides,
  );
}

/** Subject hub path used by Veer note citations. */
export function subjectHubHref(topic: Pick<TopicFixture, "classSlug" | "subjectSlug">): string {
  return `/${topic.classSlug}/${topic.subjectSlug}`;
}

/** Chapter path when the unit slug is known to be routable. */
export function chapterHref(topic: TopicFixture): string {
  return `/${topic.classSlug}/${topic.subjectSlug}/chapters/${topic.unitSlug}`;
}
