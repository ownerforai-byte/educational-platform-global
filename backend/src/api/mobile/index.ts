import { Router } from "express";
import { buildAppRequirements } from "../../lib/app-requirements.js";
import { mobileHomeResponseSchema } from "../contracts/public-schemas.js";
import { cursorPage, parseCursorPagination } from "./pagination.js";
import syllabusRouter from "./syllabus.js";
import unitsRouter from "./units.js";
import notesRouter from "./notes.js";
import practiceRouter from "./practice.js";
import communityRouter from "./community.js";
import pyqsRouter from "./pyqs.js";
import formulasRouter from "./formulas.js";

/**
 * Mobile-only, ADDITIVE API surface for the native Android client
 * (android-native/, com.ravikisan.platform.compose).
 *
 * Hard boundary (AGENTS.md Agent 2): nothing here may change an existing
 * /api/* response shape. Everything under /api/mobile is new; heavy data
 * (syllabus, notes, feeds) is REUSED from existing routes and documented in
 * docs/api/mobile-syllabus-notes.md rather than duplicated.
 */
const mobileRouter = Router();

mobileRouter.use((_req, res, next) => {
  res.setHeader("X-Mobile-Api-Version", "1");
  next();
});

mobileRouter.use("/syllabus", syllabusRouter);
mobileRouter.use("/units", unitsRouter);
mobileRouter.use("/notes", notesRouter);
mobileRouter.use("/practice", practiceRouter);
mobileRouter.use("/community", communityRouter);
mobileRouter.use("/pyqs", pyqsRouter);
mobileRouter.use("/formulas", formulasRouter);

/**
 * GET /api/mobile/home — one cheap bootstrap call the native app makes on
 * cold start: which features are live at this API version and which existing
 * /api/* routes back them. No DB access, so it can never take the app down.
 */
mobileRouter.get("/home", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  const body = {
    ok: true as const,
    data: {
      apiVersion: "mobile-v1" as const,
      features: {
        syllabus: true,
        notes: true,
        practice: true,
        aiChat: true,
        community: true,
        pyqs: true,
        formulas: true,
      },
      links: {
        syllabus: "/api/classes",
        notes: "/api/r-notes",
        practice: "/api/practice",
        ai: "/api/ai",
        community: "/api/community",
        pyqs: "/api/mobile/pyqs",
        formulas: "/api/mobile/formulas",
      },
    },
  };
  mobileHomeResponseSchema.parse(body);
  res.json(body);
});

/**
 * GET /api/mobile/demo/page — reference implementation of the cursor
 * pagination convention (see ./pagination.ts). Native feature teams copy this
 * shape; it also keeps the convention pinned by integration tests without
 * touching any real community data.
 */
mobileRouter.get("/demo/page", (req, res) => {
  const { limit, cursor } = parseCursorPagination(req);
  const total = 95; // stand-in for a DB table
  const start = cursor ? Number(cursor.anchor) || 0 : 0;
  const end = Math.min(start + limit, total);
  const items = Array.from({ length: end - start }, (_v, i) => ({
    id: `row-${start + i + 1}`,
  }));
  const nextAnchor = end < total ? String(end) : null;
  res.json({ ok: true as const, data: cursorPage(items, nextAnchor) });
});

/**
 * GET /api/mobile/requirements — same payload as /api/v2/meta.requirements so
 * the native client can gate store-mandated links without calling v2.
 */
mobileRouter.get("/requirements", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json({ ok: true as const, data: { requirements: buildAppRequirements() } });
});

export default mobileRouter;
