import { apiFetch } from "@/lib/api-client";

export type EducationLevel = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  order: number;
  is_active: boolean;
};

export type Class = {
  id: string;
  education_level_id: string;
  slug: string;
  name: string;
  description: string | null;
  order: number;
  is_active: boolean;
};

export type Subject = {
  id: string;
  class_id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  order: number;
  is_active: boolean;
};

export type Chapter = {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  is_active: boolean;
};

export type Topic = {
  id: string;
  chapter_id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  is_active: boolean;
};

export type Resource = {
  id: string;
  topic_id: string;
  type: string;
  content_type: string;
  canonical_resource_id: string | null;
  title: string;
  content: unknown;
  media_url: string | null;
  metadata: unknown;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type TopicDetail = {
  topic: Topic;
  resources: Resource[];
  linkedResources: Array<{
    id: string;
    reference_type: string;
    attribution: string | null;
    referenced: Resource;
  }>;
};

export type ChapterDetail = {
  chapter: Chapter;
  topics: Topic[];
  progress: { completed: number; total: number };
};

const LIBRARY_LEVEL: EducationLevel = {
  id: "library",
  slug: "library",
  name: "Content Library",
  description: "Browse all study content by exam group.",
  order: 0,
  is_active: true,
};

type GroupRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number | null;
};

function mapGroup(g: GroupRow): Class {
  return {
    id: g.id,
    education_level_id: LIBRARY_LEVEL.id,
    slug: g.slug,
    name: g.name,
    description: g.description,
    order: g.sort_order ?? 0,
    is_active: true,
  };
}

type SubjectRow = {
  id: string;
  exam_group_id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number | null;
};

function mapSubject(s: SubjectRow): Subject {
  return {
    id: s.id,
    class_id: s.exam_group_id,
    slug: s.slug,
    name: s.name,
    description: s.description,
    icon: null,
    order: s.sort_order ?? 0,
    is_active: true,
  };
}

type ChapterRow = {
  id: string;
  subject_id: string;
  slug: string;
  name: string;
  description: string | null;
  order_index: number | null;
  sort_order: number | null;
};

function mapChapter(c: ChapterRow): Chapter {
  return {
    id: c.id,
    subject_id: c.subject_id,
    slug: c.slug,
    title: c.name,
    description: c.description,
    order: c.order_index ?? c.sort_order ?? 0,
    is_active: true,
  };
}

type TopicRow = {
  id: string;
  sub_chapter_id: string;
  slug: string;
  name: string;
  description: string | null;
  order_index: number | null;
  sort_order: number | null;
};

function mapTopic(t: TopicRow): Topic {
  return {
    id: t.id,
    chapter_id: t.sub_chapter_id,
    slug: t.slug,
    title: t.name,
    description: t.description,
    order: t.order_index ?? t.sort_order ?? 0,
    is_active: true,
  };
}

function curriculumError(message: string, code?: string): Error {
  const err = new Error(message) as Error & { code?: string };
  if (code) err.code = code;
  return err;
}

export async function getEducationLevels() {
  return [LIBRARY_LEVEL];
}

export async function getLevelBySlug(slug: string) {
  if (slug === LIBRARY_LEVEL.slug) return LIBRARY_LEVEL;
  try {
    const data = await apiFetch<{ level: EducationLevel }>(
      `/api/levels/${encodeURIComponent(slug)}`
    );
    return data.level;
  } catch {
    return null;
  }
}

export async function getClassesByLevel(levelSlug: string) {
  if ((await getLevelBySlug(levelSlug)) === null) return [];
  try {
    const data = await apiFetch<{ classes: GroupRow[] }>(
      `/api/levels/${encodeURIComponent(levelSlug)}`
    );
    return (data.classes ?? []).map(mapGroup);
  } catch {
    return [];
  }
}

export async function getClassBySlug(levelSlug: string, classSlug: string) {
  if ((await getLevelBySlug(levelSlug)) === null) return null;
  try {
    const data = await apiFetch<{ class: GroupRow }>(
      `/api/classes/${encodeURIComponent(classSlug)}`
    );
    return mapGroup(data.class);
  } catch {
    return null;
  }
}

export async function getSubjectsByClass(
  levelSlug: string,
  classSlug: string
) {
  try {
    const cls = await getClassBySlug(levelSlug, classSlug);
    if (!cls) return [];
    const data = await apiFetch<{ subjects: SubjectRow[] }>(
      `/api/classes/${encodeURIComponent(cls.slug)}`
    );
    return (data.subjects ?? []).map(mapSubject);
  } catch {
    return [];
  }
}

export async function getSubjectBySlug(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string
) {
  const cls = await getClassBySlug(levelSlug, classSlug);
  if (!cls) return null;
  try {
    const data = await apiFetch<{ subject: SubjectRow }>(
      `/api/subjects/${encodeURIComponent(subjectSlug)}`
    );
    return mapSubject(data.subject);
  } catch {
    return null;
  }
}

export async function getChaptersBySubject(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string
) {
  try {
    const subject = await getSubjectBySlug(levelSlug, classSlug, subjectSlug);
    if (!subject) return [];
    const data = await apiFetch<{ chapters: ChapterRow[] }>(
      `/api/subjects/${encodeURIComponent(subject.slug)}`
    );
    return (data.chapters ?? []).map(mapChapter);
  } catch {
    return [];
  }
}

export async function getChapterBySlug(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string
) {
  const subject = await getSubjectBySlug(levelSlug, classSlug, subjectSlug);
  if (!subject) return null;
  try {
    const data = await apiFetch<{ chapter: ChapterRow }>(
      `/api/chapters/${encodeURIComponent(chapterSlug)}`
    );
    return mapChapter(data.chapter);
  } catch {
    return null;
  }
}

export async function getTopicsByChapter(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string
) {
  try {
    const chapter = await getChapterBySlug(
      levelSlug,
      classSlug,
      subjectSlug,
      chapterSlug
    );
    if (!chapter) return [];
    const data = await apiFetch<{ topics: TopicRow[] }>(
      `/api/chapters/${encodeURIComponent(chapter.slug)}`
    );
    return (data.topics ?? []).map(mapTopic);
  } catch {
    return [];
  }
}

export async function getTopicBySlug(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string,
  topicSlug: string
) {
  const chapter = await getChapterBySlug(
    levelSlug,
    classSlug,
    subjectSlug,
    chapterSlug
  );
  if (!chapter) return null;
  try {
    const data = await apiFetch<{ topic: TopicRow }>(
      `/api/topics/${encodeURIComponent(topicSlug)}`
    );
    return mapTopic(data.topic);
  } catch {
    return null;
  }
}

export async function getResourcesByTopic(topicId: string) {
  try {
    const data = await apiFetch<Resource[]>(
      `/api/resources?topic_id=${encodeURIComponent(topicId)}`
    );
    return data;
  } catch {
    return [];
  }
}

export async function getResourceById(resourceId: string) {
  try {
    const data = await apiFetch<Resource>(
      `/api/resources/${encodeURIComponent(resourceId)}`
    );
    return data;
  } catch {
    return null;
  }
}

export async function getLinkedResources(resourceId: string) {
  return [];
}

export async function getTopicDetail(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string,
  topicSlug: string
): Promise<TopicDetail | null> {
  const topic = await getTopicBySlug(
    levelSlug,
    classSlug,
    subjectSlug,
    chapterSlug,
    topicSlug
  );
  if (!topic) return null;

  const resources = await getResourcesByTopic(topic.id);
  let linkedResources: TopicDetail["linkedResources"] = [];
  try {
    linkedResources = [];
  } catch {
    linkedResources = [];
  }

  return { topic, resources, linkedResources };
}

export async function getChapterDetail(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string
): Promise<ChapterDetail | null> {
  try {
    const data = await apiFetch<{ chapter: ChapterRow; topics: TopicRow[]; progress: { completed: number; total: number } }>(
      `/api/chapters/${encodeURIComponent(chapterSlug)}`
    );
    return {
      chapter: mapChapter(data.chapter),
      topics: (data.topics ?? []).map(mapTopic),
      progress: data.progress ?? { completed: 0, total: 0 },
    };
  } catch {
    return null;
  }
}

export async function getSubjectDetail(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string
) {
  const subject = await getSubjectBySlug(levelSlug, classSlug, subjectSlug);
  if (!subject) return null;

  const chapters = await getChaptersBySubject(
    levelSlug,
    classSlug,
    subjectSlug
  );

  let progressData: { chapterId: string; completed: number; total: number }[] =
    [];
  try {
    progressData = chapters.map((c) => ({
      chapterId: c.id,
      completed: 0,
      total: 0,
    }));
  } catch {
    progressData = [];
  }

  return { subject, chapters, chapterProgress: progressData };
}
