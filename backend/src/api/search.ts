import { Router, Request, Response } from "express";
import { createAIService } from "../ai/service";
import { PUBLIC_SITE_URL } from "../config/env";
import { serverError } from "../middleware/errors";
import { supabaseAdmin } from "../db/supabase";

interface DbClass {
  id: string;
  slug: string;
  name: string;
}

interface DbSubject {
  id: string;
  class_id: string;
  slug: string;
  name: string;
  description: string | null;
}

interface DbChapter {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
}

interface DbTopic {
  id: string;
  chapter_id: string;
  slug: string;
  title: string;
}

const router = Router();
const aiService = createAIService();

router.post("/", async (req: Request, res: Response) => {
  try {
    const query: string = typeof req.body?.query === "string" ? req.body.query : "";
    const provider: string = typeof req.body?.provider === "string" ? req.body.provider : "";

    if (!query.trim()) {
      res.status(400).json({ error: "query is required" });
      return;
    }

    // "" runs the ordered chain (agnes → internal).
    const aiResult = await aiService.search(provider, query);

    const { data: classesData } = await supabaseAdmin
      .from("classes")
      .select("id, slug, name")
      .eq("is_active", true);

    const classes: DbClass[] = classesData ?? [];
    const classMap = new Map<string, { slug: string; name: string }>();
    for (const cls of classes) {
      classMap.set(cls.id, { slug: cls.slug, name: cls.name });
    }

    const { data: subjectsData } = await supabaseAdmin
      .from("subjects")
      .select("id, class_id, slug, name, description")
      .eq("is_active", true);

    const subjects: DbSubject[] = subjectsData ?? [];
    const subjectMap = new Map<string, { slug: string; name: string; classId: string }>();
    for (const subject of subjects) {
      subjectMap.set(subject.id, {
        slug: subject.slug,
        name: subject.name,
        classId: subject.class_id,
      });
    }

    const { data: chaptersData } = await supabaseAdmin
      .from("chapters")
      .select("id, subject_id, slug, title")
      .eq("is_active", true);

    const chapters: DbChapter[] = chaptersData ?? [];
    const chapterSubjectMap = new Map<string, { slug: string; title: string; subjectId: string }>();
    for (const chapter of chapters) {
      chapterSubjectMap.set(chapter.id, {
        slug: chapter.slug,
        title: chapter.title,
        subjectId: chapter.subject_id,
      });
    }

    const { data: topicsData } = await supabaseAdmin
      .from("topics")
      .select("id, chapter_id, slug, title")
      .eq("is_active", true);

    const topics: DbTopic[] = topicsData ?? [];

    const q = query.toLowerCase();

    // Topics — title match, ranked with exact-prefix hits first so the most
    // likely target sits on top instead of an arbitrary slice order.
    const dbResults = topics
      .filter((topic: DbTopic) => topic.title.toLowerCase().includes(q))
      .sort((a: DbTopic, b: DbTopic) => {
        const at = a.title.toLowerCase();
        const bt = b.title.toLowerCase();
        const aStarts = at.startsWith(q) ? 0 : 1;
        const bStarts = bt.startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return at.indexOf(q) - bt.indexOf(q);
      })
      .slice(0, 10)
      .map((topic: DbTopic) => {
        const chapter = chapterSubjectMap.get(topic.chapter_id);
        const subject = chapter ? subjectMap.get(chapter.subjectId) : null;
        const cls = subject ? classMap.get(subject.classId) : null;
        return {
          id: topic.id,
          title: topic.title,
          type: "Topic",
          chapter: chapter?.title ?? "",
          subject: subject?.name ?? "",
          class: cls?.name ?? "",
          url: `/${cls?.slug ?? ""}/${subject?.slug ?? ""}#${topic.slug}`,
        };
      });

    // Resources — PYQs, question banks and other resource rows (the pyqs
    // route reads this same table with type=QUIZ). Title match only: the
    // metadata column shape varies by type, so the title is the one honest
    // field every row carries.
    const { data: resourcesData } = await supabaseAdmin
      .from("resources")
      .select("id, title, type, topic_id")
      .eq("is_published", true);
    const resourceResults = (resourcesData ?? [])
      .filter(
        (r: { title: string | null }) =>
          typeof r.title === "string" && r.title.toLowerCase().includes(q),
      )
      .slice(0, 8)
      .map((r: { id: string; title: string; type: string; topic_id: string | null }) => {
        const topic = topics.find((t: DbTopic) => t.id === r.topic_id);
        const chapter = topic ? chapterSubjectMap.get(topic.chapter_id) : undefined;
        const subject = chapter ? subjectMap.get(chapter.subjectId) : null;
        const cls = subject ? classMap.get(subject.classId) : null;
        const typeLabel =
          r.type === "QUIZ" ? "Past Question" : r.type.charAt(0) + r.type.slice(1).toLowerCase();
        return {
          id: `res-${r.id}`,
          title: r.title,
          type: typeLabel,
          chapter: chapter?.title ?? "",
          subject: subject?.name ?? "",
          class: cls?.name ?? "",
          url: topic
            ? `/${cls?.slug ?? ""}/${subject?.slug ?? ""}#${topic.slug}`
            : "/resources",
        };
      });

    const results = (aiResult.results ?? []).map((r: any) => ({
      ...r,
      url: r.url || "#",
    }));

    const syllabusHints = (aiResult.syllabusHints ?? []).map((hint: any) => ({
      subject: hint.subject,
      unit: hint.unit,
      topics: hint.topics,
    }));

    // Load official link from settings
    const { data: settingsData } = await supabaseAdmin
      .from("settings")
      .select("key, value")
      .eq("key", "officialLink");

    const officialLink = settingsData?.[0]?.value ?? (process.env.FRONTEND_URL || PUBLIC_SITE_URL);

    res.json({
      query,
      results: [...results, ...dbResults, ...resourceResults],
      fallbackMessage: aiResult.fallbackMessage,
      syllabusHints,
      officialLink,
    });
  } catch (err: any) {
    console.error("Search error:", err);
    serverError(res, err);
  }
});

export default router;
