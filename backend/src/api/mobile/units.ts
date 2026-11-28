import { Router, Request } from "express";
import { supabaseAdmin } from "../../db/supabase";
import {
  CONTENT_CACHE_TTL_MS,
  CONTENT_CDN_CACHE_CONTROL,
  contentCache,
} from "../../lib/cache.js";
import { serverError } from "../../middleware/error-handler";
import { sendError } from "../../lib/response.js";
import { mobileUnitsResponseSchema } from "../contracts/public-schemas.js";

/**
 * GET /api/mobile/units?subject=<slug>[&class=<classSlug>] — the units of one
 * subject for the native syllabus drill-down (class → subject → unit → topic
 * reader).
 *
 * REUSE (docs/api/mobile-syllabus-notes.md): the rows come from the same
 * `chapters` / `topics` tables the website content routes serve, through the
 * shared content cache. The mobile shape is compact (id/slug/title/order +
 * a topicCount badge) and scoped to a single subject so the app pulls one
 * subtree at a time instead of the whole curriculum.
 *
 * CLASS SCOPE (Wave 1 batch B fix): the `class` query parameter is optional
 * and ADDITIVE. mathematics, english and nepali exist in BOTH class tracks,
 * so a slug-only lookup cannot tell `class-11-notes/mathematics` from its
 * class-12 sibling — the website resolves these through
 * `getSubjectSyllabus(classSlug, subjectSlug)` (subject row scoped by class).
 * The param accepts either the class dir (`class-11`) or the track slug
 * (`class-11-notes`); the subject is then matched within that class. Omit it
 * and the legacy slug-only behaviour (first active match) is unchanged —
 * existing callers keep working.
 *
 * ADDITIVE: no existing /api/* response shape is touched.
 */
const router = Router();

router.get("/", async (req: Request, res) => {
  const subjectSlug = typeof req.query.subject === "string" ? req.query.subject.trim() : "";
  if (!subjectSlug) {
    return sendError(res, "subject query parameter is required", 400);
  }

  // Optional class scope: `class-11-notes` (track slug) or `class-11` (the
  // manifest/DB class dir) both resolve to the same class row.
  const classParam = typeof req.query.class === "string" ? req.query.class.trim() : "";
  const classDir = classParam.replace(/-notes$/, "");

  try {
    // Legacy callers (no class param) keep the unscoped cache key; class-scoped
    // calls get their own entry so the two variants never cross-contaminate.
    const cacheKey = classDir
      ? `mobile-units:v1:c:${classDir}:${subjectSlug}`
      : `mobile-units:v1:${subjectSlug}`;
    const payload = await contentCache.getOrLoad(
      cacheKey,
      CONTENT_CACHE_TTL_MS,
      async () => {
        let classId: string | null = null;
        if (classDir) {
          const { data: classRows, error: classError } = await supabaseAdmin
            .from("classes")
            .select("id, slug")
            .eq("slug", classDir)
            .eq("is_active", true)
            .limit(1);

          if (classError) throw classError;
          const klass = classRows?.[0];
          // Unknown class → the same honest 404 contract as an unknown
          // subject, with its own message so clients can tell them apart.
          if (!klass) return { notFound: "class" as const };
          classId = klass.id;
        }

        const subjectQuery = supabaseAdmin
          .from("subjects")
          .select("id, slug, name")
          .eq("slug", subjectSlug)
          .eq("is_active", true);
        // Class-scoped lookups match the subject WITHIN the class track —
        // exactly the website's getSubjectSyllabus(classSlug, subjectSlug).
        const scopedQuery = classId
          ? subjectQuery.eq("class_id", classId)
          : subjectQuery;
        const { data: subjectRows, error: subjectError } = await scopedQuery.limit(1);

        if (subjectError) throw subjectError;
        const subject = subjectRows?.[0];
        if (!subject) return { notFound: "subject" as const };

        const { data: chapters, error: chaptersError } = await supabaseAdmin
          .from("chapters")
          .select("id, slug, title")
          .eq("subject_id", subject.id)
          .eq("is_active", true)
          .order("order", { ascending: true });

        if (chaptersError) throw chaptersError;

        const { data: topics, error: topicsError } = await supabaseAdmin
          .from("topics")
          .select("id, chapter_id")
          .eq("is_active", true);

        if (topicsError) throw topicsError;

        const counts = new Map<string, number>();
        for (const topic of topics ?? []) {
          counts.set(topic.chapter_id, (counts.get(topic.chapter_id) ?? 0) + 1);
        }

        const units = (chapters ?? []).map((chapter, index) => ({
          id: chapter.id,
          slug: chapter.slug,
          title: chapter.title,
          order: index + 1,
          topicCount: counts.get(chapter.id) ?? 0,
        }));

        return {
          subject: { id: subject.id, slug: subject.slug, name: subject.name },
          units,
        };
      },
    );

    if (!payload || "notFound" in payload) {
      return sendError(
        res,
        payload && payload.notFound === "class" ? "Class not found" : "Subject not found",
        404,
      );
    }

    res.setHeader("Cache-Control", CONTENT_CDN_CACHE_CONTROL);
    const body = { ok: true as const, data: payload };
    mobileUnitsResponseSchema.parse(body);
    return res.json(body);
  } catch (err) {
    return serverError(res, err);
  }
});

export default router;
