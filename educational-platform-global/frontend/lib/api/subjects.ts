import { apiFetch } from "../api-client";
import type {
  Chapter,
  ClassWithSubjects,
  Subject,
  SubjectWithChapters,
  Topic,
  TopicWithResources,
} from "../../types/api";

/**
 * Get a subject by slug with its chapters.
 */
export async function getSubject(slug: string): Promise<SubjectWithChapters> {
  return apiFetch<SubjectWithChapters>(
    `/api/subjects/${encodeURIComponent(slug)}`
  );
}

/**
 * Get chapters for a subject by slug.
 */
export async function getSubjectChapters(slug: string): Promise<Chapter[]> {
  const res = await getSubject(slug);
  return res.chapters;
}

/**
 * Get a single chapter by slug within a subject.
 */
export async function getChapter(
  subjectSlug: string,
  chapterSlug: string
): Promise<Chapter> {
  const chapters = await getSubjectChapters(subjectSlug);
  const chapter = chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) {
    throw new Error("Chapter not found");
  }
  return chapter;
}

/**
 * Get topics for a chapter by slugs.
 */
export async function getSubjectTopics(
  subjectSlug: string,
  chapterSlug: string
): Promise<Topic[]> {
  const res = await apiFetch<{ chapter: Chapter; topics: Topic[] }>(
    `/api/chapters/${encodeURIComponent(chapterSlug)}`
  );
  return res.topics;
}

/**
 * Get a single topic by slug within a chapter.
 */
export async function getTopic(
  subjectSlug: string,
  chapterSlug: string,
  topicSlug: string
): Promise<Topic> {
  const topics = await getSubjectTopics(subjectSlug, chapterSlug);
  const topic = topics.find((t) => t.slug === topicSlug);
  if (!topic) {
    throw new Error("Topic not found");
  }
  return topic;
}
