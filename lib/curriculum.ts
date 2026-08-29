import { createClient } from "@/lib/db/server";

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
  return null;
}

export async function getClassesByLevel(levelSlug: string) {
  if ((await getLevelBySlug(levelSlug)) === null) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exam_groups")
      .select("id, slug, name, description, sort_order")
      .order("sort_order", { ascending: true });

    if (error) throw curriculumError(error.message, error.code);
    return (data ?? []).map(mapGroup);
  } catch {
    return [];
  }
}

export async function getClassBySlug(levelSlug: string, classSlug: string) {
  if ((await getLevelBySlug(levelSlug)) === null) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exam_groups")
    .select("id, slug, name, description, sort_order")
    .eq("slug", classSlug)
    .single();

  if (error || !data) return null;
  return mapGroup(data as GroupRow);
}

export async function getSubjectsByClass(
  levelSlug: string,
  classSlug: string
) {
  try {
    const cls = await getClassBySlug(levelSlug, classSlug);
    if (!cls) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("subjects")
      .select(
        "id, exam_group_id, slug, name, description, sort_order"
      )
      .eq("exam_group_id", cls.id)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) throw curriculumError(error.message, error.code);
    return (data ?? []).map(mapSubject);
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

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subjects")
    .select("id, exam_group_id, slug, name, description, sort_order")
    .eq("exam_group_id", cls.id)
    .eq("slug", subjectSlug)
    .single();

  if (error || !data) return null;
  return mapSubject(data as SubjectRow);
}

export async function getChaptersBySubject(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string
) {
  try {
    const subject = await getSubjectBySlug(levelSlug, classSlug, subjectSlug);
    if (!subject) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("chapters")
      .select(
        "id, subject_id, slug, name, description, order_index, sort_order"
      )
      .eq("subject_id", subject.id)
      .order("order_index", { ascending: true })
      .order("name", { ascending: true });

    if (error) throw curriculumError(error.message, error.code);
    return (data ?? []).map(mapChapter);
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

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chapters")
    .select("id, subject_id, slug, name, description, order_index, sort_order")
    .eq("subject_id", subject.id)
    .eq("slug", chapterSlug)
    .single();

  if (error || !data) return null;
  return mapChapter(data as ChapterRow);
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

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("topics")
      .select(
        "id, sub_chapter_id, slug, name, description, order_index, sort_order"
      )
      .eq("sub_chapter_id", chapter.id)
      .order("order_index", { ascending: true })
      .order("name", { ascending: true });

    if (error) throw curriculumError(error.message, error.code);
    return (data ?? []).map(mapTopic);
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

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topics")
    .select(
      "id, sub_chapter_id, slug, name, description, order_index, sort_order"
    )
    .eq("sub_chapter_id", chapter.id)
    .eq("slug", topicSlug)
    .single();

  if (error || !data) return null;
  return mapTopic(data as TopicRow);
}

export async function getResourcesByTopic(topicId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("topic_id", topicId)
      .eq("is_published", true)
      .order("type", { ascending: true });

    if (error) throw curriculumError(error.message, error.code);
    return (data ?? []) as Resource[];
  } catch {
    return [];
  }
}

export async function getResourceById(resourceId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", resourceId)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data as Resource;
}

export async function getLinkedResources(resourceId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("resource_references")
      .select("*, referenced:referenced_id(*)")
      .eq("resource_id", resourceId);

    if (error) throw curriculumError(error.message, error.code);
    return (data ?? []) as Array<{
      id: string;
      reference_type: string;
      attribution: string | null;
      referenced: Resource;
    }>;
  } catch {
    return [];
  }
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
    const supabase = await createClient();
    const { data: refs } = await supabase
      .from("resource_references")
      .select("*, referenced:referenced_id(*)")
      .eq("resource_id", topic.id);

    linkedResources = (refs ?? []).map((r) => ({
      id: r.id,
      reference_type: r.reference_type,
      attribution: r.attribution,
      referenced: r.referenced as Resource,
    }));
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
  const supabase = await createClient();
  const chapter = await getChapterBySlug(
    levelSlug,
    classSlug,
    subjectSlug,
    chapterSlug
  );
  if (!chapter) return null;

  const topics = await getTopicsByChapter(
    levelSlug,
    classSlug,
    subjectSlug,
    chapterSlug
  );

  let completed = 0;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { count } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .in(
          "topic_id",
          topics.map((t) => t.id)
        )
        .eq("completed", true);
      completed = count ?? 0;
    }
  } catch {
    completed = 0;
  }

  return {
    chapter,
    topics,
    progress: { completed, total: topics.length },
  };
}

export async function getSubjectDetail(
  levelSlug: string,
  classSlug: string,
  subjectSlug: string
) {
  const supabase = await createClient();
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user && chapters.length > 0) {
      const chapterIds = chapters.map((c) => c.id);
      const { data: topics } = await supabase
        .from("topics")
        .select("id, sub_chapter_id")
        .in("sub_chapter_id", chapterIds);

      if (topics && topics.length > 0) {
        const topicIds = topics.map((t) => t.id);
        const { data: progressRows } = await supabase
          .from("user_progress")
          .select("topic_id, completed")
          .eq("user_id", user.id)
          .in("topic_id", topicIds)
          .eq("completed", true);

        const completedTopicIds = new Set(
          (progressRows ?? []).map((p) => p.topic_id)
        );
        const topicByChapter = new Map<string, string[]>();
        topics.forEach((t) => {
          const arr = topicByChapter.get(t.sub_chapter_id) ?? [];
          arr.push(t.id);
          topicByChapter.set(t.sub_chapter_id, arr);
        });

        progressData = chapters.map((c) => {
          const tids = topicByChapter.get(c.id) ?? [];
          const completedCount = tids.filter((id) =>
            completedTopicIds.has(id)
          ).length;
          return {
            chapterId: c.id,
            completed: completedCount,
            total: tids.length,
          };
        });
      }
    }
  } catch {
    progressData = [];
  }

  return { subject, chapters, chapterProgress: progressData };
}
