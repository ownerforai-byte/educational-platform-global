// ADDITIVE (perf pass, 2026-09-27): cached GET entry points used by the
// `*Cached` variants appended at the bottom of this file.
import {
  apiFetch,
  apiGet,
  invalidateApiGetWhere,
  type ApiGetOptions,
} from "../api-client";
import type {
  Chapter,
  SubjectWithChapters,
  Topic,
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

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf pass, 2026-09-27): cached read variants.
 *
 * Everything above is untouched and still calls `apiFetch`. These variants use
 * the same endpoints and response types with the shared TTL / SWR /
 * in-flight-dedupe cache; the slug is part of the cache key, so two subjects
 * never collide, and only public catalogue data is cached.
 * ------------------------------------------------------------------ */

/** Fresh window for subject/chapter catalogue data (10 minutes). */
const SUBJECT_FRESH_MS = 1000 * 60 * 10;
/** Window in which stale catalogue data may still be served (60 minutes). */
const SUBJECT_STALE_MS = 1000 * 60 * 60;

/** `getSubject` with the additive GET cache. */
export async function getSubjectCached(
  slug: string,
  options: ApiGetOptions = {},
): Promise<SubjectWithChapters> {
  return apiGet<SubjectWithChapters>(`/api/subjects/${encodeURIComponent(slug)}`, {
    freshMs: SUBJECT_FRESH_MS,
    staleMs: SUBJECT_STALE_MS,
    scope: "subjects",
    variant: slug,
    ...options,
  });
}

/** `getSubjectTopics` with the additive GET cache (keyed by chapter slug). */
export async function getSubjectTopicsCached(
  subjectSlug: string,
  chapterSlug: string,
  options: ApiGetOptions = {},
): Promise<Topic[]> {
  const res = await apiGet<{ chapter: Chapter; topics: Topic[] }>(
    `/api/chapters/${encodeURIComponent(chapterSlug)}`,
    {
      freshMs: SUBJECT_FRESH_MS,
      staleMs: SUBJECT_STALE_MS,
      scope: "chapters",
      variant: `${subjectSlug}/${chapterSlug}`,
      ...options,
    },
  );
  return res.topics;
}

/** Background-warms a subject page (safe from hover/idle). Never throws. */
export function prefetchSubject(slug: string, options: ApiGetOptions = {}): void {
  void getSubjectCached(slug, options).catch(() => undefined);
}

/** Drops cached subject/chapter reads (run after an admin edit). */
export function invalidateSubjectsCache(): number {
  return invalidateApiGetWhere(
    (key) => key.startsWith("/api/subjects/") || key.startsWith("/api/chapters/"),
  );
}

