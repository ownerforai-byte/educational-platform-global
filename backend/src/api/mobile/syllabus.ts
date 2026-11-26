import { Router } from "express";
import { supabaseAdmin } from "../../db/supabase";
import {
  CONTENT_CACHE_TTL_MS,
  CONTENT_CDN_CACHE_CONTROL,
  contentCache,
} from "../../lib/cache.js";
import { serverError } from "../../middleware/error-handler";
import { mobileSyllabusResponseSchema } from "../contracts/public-schemas.js";

/**
 * GET /api/mobile/syllabus — compact class → subject tree for the native
 * Android syllabus screen (Agent 4 builds the UI against this contract).
 *
 * REUSE, not duplication (docs/api/mobile-syllabus-notes.md): the data comes
 * from the same `classes` / `subjects` tables the website content routes
 * serve, through the same shared content cache. The only difference is the
 * shape: one cheap call returning the whole two-level tree with mobile-sized
 * rows (id/slug/name only — no descriptions), instead of the website's
 * per-slug endpoints. Chapters/topics stay on the existing per-subject
 * routes so the app only pulls a subtree when a class is opened.
 *
 * ADDITIVE: no existing /api/* response shape is touched.
 */
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const payload = await contentCache.getOrLoad(
      "mobile-syllabus:v1",
      CONTENT_CACHE_TTL_MS,
      async () => {
        const [classesResult, subjectsResult] = await Promise.all([
          supabaseAdmin
            .from("classes")
            .select("id, slug, name")
            .eq("is_active", true)
            .order("order", { ascending: true }),
          supabaseAdmin
            .from("subjects")
            .select("id, class_id, slug, name")
            .eq("is_active", true)
            .order("order", { ascending: true }),
        ]);

        if (classesResult.error) throw classesResult.error;
        if (subjectsResult.error) throw subjectsResult.error;

        const subjectsByClass = new Map<string, Array<{ id: string; slug: string; name: string }>>();
        for (const subject of subjectsResult.data ?? []) {
          const list = subjectsByClass.get(subject.class_id) ?? [];
          list.push({ id: subject.id, slug: subject.slug, name: subject.name });
          subjectsByClass.set(subject.class_id, list);
        }

        return {
          classes: (classesResult.data ?? []).map((cls) => ({
            id: cls.id,
            slug: cls.slug,
            name: cls.name,
            subjects: subjectsByClass.get(cls.id) ?? [],
          })),
        };
      },
    );

    res.setHeader("Cache-Control", CONTENT_CDN_CACHE_CONTROL);
    const body = { ok: true as const, data: payload };
    mobileSyllabusResponseSchema.parse(body);
    return res.json(body);
  } catch (err) {
    return serverError(res, err);
  }
});

export default router;
