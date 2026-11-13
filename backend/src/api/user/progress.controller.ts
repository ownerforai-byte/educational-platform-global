import { Router, Request, Response } from "express";
import { serverError } from "../../middleware/error-handler";
import { z } from "zod";
import { requireAuth, type AuthedRequest } from "../../middleware/auth";
import * as userService from "../../services/user.service.js";
import { sendSuccess } from "../../lib/response.js";

const router = Router();

/**
 * ── Progress / journey model ────────────────────────────────────────────────
 *
 * Two shapes live behind the one `/api/progress` route — see user.service for
 * journey vs legacy persistence.
 */

const legacySchema = z
  .object({
    topicId: z.string().uuid().optional(),
    topic_id: z.string().uuid().optional(),
    completed: z.boolean(),
  })
  .strict()
  .refine((v) => v.topicId !== undefined || v.topic_id !== undefined, {
    message: "topicId is required",
  });

const syllabusSlug = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9\p{L}\p{N}][\p{L}\p{N}\p{M}_-]*$/u, "must be a slug");

const journeySchema = z
  .object({
    classSlug: syllabusSlug,
    subjectSlug: syllabusSlug,
    unitSlug: syllabusSlug,
    topicSlug: syllabusSlug,
    status: z.enum(["started", "completed", "not_completed"]).optional(),
  })
  .strict();

const progressSchema = z.union([legacySchema, journeySchema]);

router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const { rows, error } = await userService.getUserJourney(user.id);
    if (error) {
      serverError(res, error);
      return;
    }
    sendSuccess(res, rows);
  } catch (err: unknown) {
    console.error(err);
    serverError(res, err);
  }
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const parsed = progressSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    if ("classSlug" in parsed.data) {
      const user = (req as AuthedRequest).user;
      const { row, error } = await userService.recordUserJourney(user.id, parsed.data);
      if (error) {
        serverError(res, error);
        return;
      }
      res.json(row);
      return;
    }

    const user = (req as AuthedRequest).user;
    const topicId = parsed.data.topicId ?? parsed.data.topic_id;
    if (!topicId) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }
    const { row, error } = await userService.recordLegacyTopicProgress(
      user.id,
      topicId,
      parsed.data.completed,
    );
    if (error) {
      serverError(res, error);
      return;
    }
    res.json(row);
  } catch (err: unknown) {
    console.error(err);
    serverError(res, err);
  }
});

export default router;
