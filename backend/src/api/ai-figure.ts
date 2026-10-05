import { Router, Request, Response } from "express";
import { requireAuth, requireOwnerEmail } from "../middleware/auth";
import { drawAcademicFigure } from "../ai/figure-draw";
import { classifyFigureKind, type FigureKind } from "../ai/academic-figures";
import { saveImageHistoryRow } from "./ai-image-history";

/**
 * POST /api/ai/figure — the Image Hub's ACADEMIC FIGURE endpoint.
 *
 * Owner request (2026-10-03): "train it for all kind of academic images like
 * lifecycle, labelling, all parts name with their interface with supporting
 * details which opens after hovering".
 *
 * The raster engine paints a picture and mistypes every label; this endpoint
 * asks the text model for a VECTOR figure instead — one SVG in the platform's
 * house style, in which every labelled part is `<g><title>NAME — detail</title>`
 * so the frontend opens that detail on hover/click. `parts` carries the same
 * legend as data, so the hub can also list every part without a pointer.
 *
 * OPEN TO OWNER EMAILS ONLY (owner request 2026-10-05: "make the image
 * hub under owner emails only"), exactly like /api/ai/image:
 * `requireAuth` + `requireOwnerEmail`, and the key is protected by the
 * ai-image rate-limit tier instead. Every drawn figure is saved to the
 * owner's image history on the server (hardcoded, best-effort).
 * On failure it answers 503 with a reason, and the hub falls back to the
 * raster chain (Agnes → puter.js).
 */
const router = Router();

const KINDS = new Set<string>([
  "lifecycle",
  "labelled",
  "apparatus",
  "process",
  "graph",
  "circuit",
  "ray",
  "free-body",
  "geometry",
  "hierarchy",
  "comparison",
  "timeline",
  "illustration",
]);

router.post("/", requireAuth, requireOwnerEmail, async (req: Request, res: Response) => {
  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
  if (!prompt) {
    res.status(400).json({ error: "Prompt required" });
    return;
  }

  // An explicit kind is honoured, but only when it is a real archetype;
  // otherwise the request is classified from its own words.
  const requested = typeof req.body?.kind === "string" ? req.body.kind.trim() : "";
  const kind = KINDS.has(requested) ? (requested as FigureKind) : undefined;

  const result = await drawAcademicFigure(prompt, {
    kind,
    classLevel: typeof req.body?.classLevel === "string" ? req.body.classLevel : undefined,
  });

  if (result.svg) {
    const user = (req as Request & { user: { id: string } }).user;
    await saveImageHistoryRow(user.id, {
      kind: "figure",
      prompt,
      svg: result.svg,
      caption: result.caption,
      archetype: result.kind,
      engine: "vector figure",
      parts: result.parts,
    });
    res.json({
      svg: result.svg,
      caption: result.caption,
      kind: result.kind,
      parts: result.parts,
      attempts: result.attempts,
    });
    return;
  }

  res.status(503).json({
    error: "Figure engine unavailable",
    reason: result.reason ?? "the figure writer failed",
    kind: result.kind ?? classifyFigureKind(prompt),
  });
});

export default router;
