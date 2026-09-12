import { apiFetch } from "../api-client";
import type {
  Chapter,
  Class,
  ClassWithSubjects,
  EducationLevel,
  LevelWithClasses,
  Subject,
  Topic,
} from "../../types/api";

/**
 * Get all active education levels.
 */
export async function getLevels(): Promise<EducationLevel[]> {
  return apiFetch<EducationLevel[]>("/api/levels");
}

/**
 * Get a single level by slug with its classes.
 */
export async function getLevel(slug: string): Promise<LevelWithClasses> {
  return apiFetch<LevelWithClasses>(
    `/api/levels/${encodeURIComponent(slug)}`
  );
}

/**
 * Get classes for a level by slug.
 */
export async function getClasses(levelSlug: string): Promise<Class[]> {
  const res = await getLevel(levelSlug);
  return res.classes;
}

/**
 * Get a single class by slug within a level.
 */
export async function getClass(
  levelSlug: string,
  classSlug: string
): Promise<Class> {
  const classes = await getClasses(levelSlug);
  const cls = classes.find((c) => c.slug === classSlug);
  if (!cls) {
    throw new Error("Class not found");
  }
  return cls;
}

/**
 * Get subjects for a class by level and class slugs.
 */
export async function getSubjects(
  levelSlug: string,
  classSlug: string
): Promise<Subject[]> {
  const cls = await getClass(levelSlug, classSlug);
  const res = await apiFetch<ClassWithSubjects>(
    `/api/classes/${encodeURIComponent(cls.slug)}`
  );
  return res.subjects;
}

/**
 * Get chapters for a subject by level, class, and subject slugs.
 */
export async function getChapters(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string
): Promise<Chapter[]> {
  const subjects = await getSubjects(levelSlug, classSlug);
  const subject = subjects.find((s) => s.slug === subjectSlug);
  if (!subject) {
    throw new Error("Subject not found");
  }
  const res = await apiFetch<{ subject: Subject; chapters: Chapter[] }>(
    `/api/subjects/${encodeURIComponent(subject.slug)}`
  );
  return res.chapters;
}

/**
 * Get topics for a chapter by level, class, subject, and chapter slugs.
 */
export async function getTopics(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string
): Promise<Topic[]> {
  const chapters = await getChapters(levelSlug, classSlug, subjectSlug);
  const chapter = chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) {
    throw new Error("Chapter not found");
  }
  const res = await apiFetch<{ chapter: Chapter; topics: Topic[] }>(
    `/api/chapters/${encodeURIComponent(chapter.slug)}`
  );
  return res.topics;
}
