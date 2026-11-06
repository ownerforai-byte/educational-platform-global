/**
 * Curriculum neighbours for the notes → 3D → practice → next-topic journey.
 *
 * Ordering comes ONLY from `lib/syllabus.ts` (the single source of truth) — this
 * module never invents an order, a slug, or a route. It resolves:
 *   - the canonical topic route for a (class, subject, unit, topic)
 *   - the next topic in curriculum order, crossing unit boundaries
 *   - the previous topic, for a symmetric "back" affordance
 */

import { SYLLABUS, slugifySyllabusTopic } from "@/lib/syllabus";

export type TopicRef = {
  classSlug: string;
  subject: string;
  unitId: string;
  unitTitle: string;
  topicSlug: string;
  topicTitle: string;
};

type FlatTopic = TopicRef;

let cached: FlatTopic[] | null = null;

/** Every syllabus topic, flattened in official curriculum order. */
export function listSyllabusTopics(): FlatTopic[] {
  if (cached) return cached;
  const out: FlatTopic[] = [];
  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      for (const unit of subject.units) {
        for (const title of unit.topics) {
          out.push({
            classSlug: cls.slug,
            subject: subject.slug,
            unitId: unit.id,
            unitTitle: unit.title,
            topicSlug: slugifySyllabusTopic(title),
            topicTitle: title,
          });
        }
      }
    }
  }
  cached = out;
  return out;
}

/** `/class-11-notes/physics/chapters/kinematics/topics/projectile-motion-...` */
export function topicHref(topic: TopicRef): string {
  return `/${topic.classSlug}/${topic.subject}/chapters/${encodeURIComponent(
    topic.unitId,
  )}/topics/${encodeURIComponent(topic.topicSlug)}`;
}

function findIndex(
  classSlug: string,
  subject: string,
  unitId: string,
  topicSlug: string,
): number {
  return listSyllabusTopics().findIndex(
    (topic) =>
      topic.classSlug === classSlug &&
      topic.subject === subject &&
      topic.unitId === unitId &&
      topic.topicSlug === topicSlug,
  );
}

/**
 * Next topic in curriculum order, crossing into the next unit — and into Class
 * 12 after the last Class 11 topic, because that is the order students follow.
 */
export function nextTopic(
  classSlug: string,
  subject: string,
  unitId: string,
  topicSlug: string,
): TopicRef | null {
  const topics = listSyllabusTopics();
  const index = findIndex(classSlug, subject, unitId, topicSlug);
  if (index < 0) return null;
  const next = topics[index + 1];
  return next && next.subject === subject ? next : null;
}

/** Previous topic in curriculum order, or null at the start of a subject. */
export function previousTopic(
  classSlug: string,
  subject: string,
  unitId: string,
  topicSlug: string,
): TopicRef | null {
  const topics = listSyllabusTopics();
  const index = findIndex(classSlug, subject, unitId, topicSlug);
  if (index <= 0) return null;
  const previous = topics[index - 1];
  return previous && previous.subject === subject ? previous : null;
}
