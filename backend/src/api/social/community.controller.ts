import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../../db/supabase";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../middleware/asyncHandler";
import { serverError } from "../../middleware/error-handler";
import { maskName } from "./leaderboard.controller";

/**
 * ── Community discussions ───────────────────────────────────────────────────
 *
 * Peer threads per community space (`<classSlug>-<subjectSlug>` ids derived
 * from the syllabus on the client), with replies and one-upvote-per-student.
 * This is the backend the community pages and the Ask board's peer panel
 * announced as "not built yet".
 *
 * Privacy follows the leaderboard: the API never returns an email, a user id
 * or a raw full name — authors are masked here, on the server.
 *
 * If `community_threads` has not been migrated yet, every route degrades to
 * `migrated: false` instead of erroring, exactly like quiz history.
 */

const router = Router();

const MAX_LIST = 50;

interface ThreadRow {
  id: string;
  space_id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
}

interface ReplyRow {
  id: string;
  thread_id: string;
  user_id: string;
  body: string;
  created_at: string;
}

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

const titleSchema = z.string().trim().min(4).max(140);
const bodySchema = z.string().trim().min(1).max(4000);

const threadCreateSchema = z.object({
  title: titleSchema,
  body: bodySchema,
});

const replyCreateSchema = z.object({
  body: bodySchema,
});

/** Author names for a set of user ids, masked server-side. */
async function maskedNames(userIds: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(userIds)];
  if (unique.length === 0) return new Map();
  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("id, full_name")
    .in("id", unique);
  return new Map(
    (profiles ?? []).map((p: { id: string; full_name: string | null }) => [
      p.id,
      maskName(p.full_name),
    ]),
  );
}

/** Upvote totals + which of them the reader cast, per thread. */
async function upvoteMaps(
  threadIds: string[],
  userId: string,
): Promise<{ counts: Map<string, number>; mine: Set<string> }> {
  const counts = new Map<string, number>();
  const mine = new Set<string>();
  if (threadIds.length === 0) return { counts, mine };
  const { data } = await supabaseAdmin
    .from("community_upvotes")
    .select("thread_id, user_id")
    .in("thread_id", threadIds);
  for (const row of (data ?? []) as Array<{ thread_id: string; user_id: string }>) {
    counts.set(row.thread_id, (counts.get(row.thread_id) ?? 0) + 1);
    if (row.user_id === userId) mine.add(row.thread_id);
  }
  return { counts, mine };
}

/** Reply totals per thread. */
async function replyCounts(threadIds: string[]): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (threadIds.length === 0) return counts;
  const { data } = await supabaseAdmin
    .from("community_replies")
    .select("thread_id")
    .in("thread_id", threadIds);
  for (const row of (data ?? []) as Array<{ thread_id: string }>) {
    counts.set(row.thread_id, (counts.get(row.thread_id) ?? 0) + 1);
  }
  return counts;
}

// ── /threads/:threadId — defined before /:spaceId/threads so the literal
//    "threads" segment can never be read as a space id. ─────────────────────

router.get(
  "/threads/:threadId",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const { threadId } = req.params;

    const { data: threadRows, error } = await supabaseAdmin
      .from("community_threads")
      .select("id, space_id, user_id, title, body, created_at")
      .eq("id", threadId)
      .limit(1);

    if (error) {
      if (isMissingTable(error)) {
        res.json({ thread: null, replies: [], migrated: false });
        return;
      }
      serverError(res, error, "community");
      return;
    }

    const thread = (threadRows ?? [])[0] as ThreadRow | undefined;
    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
      return;
    }

    const { data: replyRows, error: replyError } = await supabaseAdmin
      .from("community_replies")
      .select("id, thread_id, user_id, body, created_at")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true })
      .limit(500);

    if (replyError) {
      if (isMissingTable(replyError)) {
        res.json({ thread: null, replies: [], migrated: false });
        return;
      }
      serverError(res, replyError, "community");
      return;
    }

    const replies = (replyRows ?? []) as ReplyRow[];
    const names = await maskedNames([thread.user_id, ...replies.map((r) => r.user_id)]);
    const { counts, mine } = await upvoteMaps([thread.id], user.id);

    res.setHeader("Cache-Control", "private, no-store");
    res.json({
      thread: {
        id: thread.id,
        spaceId: thread.space_id,
        title: thread.title,
        body: thread.body,
        author: names.get(thread.user_id) ?? "Student",
        createdAt: thread.created_at,
        replyCount: replies.length,
        upvotes: counts.get(thread.id) ?? 0,
        upvotedByYou: mine.has(thread.id),
      },
      replies: replies.map((r) => ({
        id: r.id,
        body: r.body,
        author: names.get(r.user_id) ?? "Student",
        createdAt: r.created_at,
      })),
      migrated: true,
    });
  }),
);

router.post(
  "/threads/:threadId/replies",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const { threadId } = req.params;
    const parsed = replyCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Reply must be 1–4000 characters." });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from("community_replies")
      .insert({ thread_id: threadId, user_id: user.id, body: parsed.data.body })
      .select("id, thread_id, user_id, body, created_at")
      .single();

    if (error) {
      if (isMissingTable(error)) {
        res.json({ reply: null, migrated: false });
        return;
      }
      serverError(res, error, "community");
      return;
    }

    const row = data as ReplyRow;
    const names = await maskedNames([row.user_id]);
    res.status(201).json({
      reply: {
        id: row.id,
        body: row.body,
        author: names.get(row.user_id) ?? "Student",
        createdAt: row.created_at,
      },
      migrated: true,
    });
  }),
);

router.post(
  "/threads/:threadId/upvote",
  requireAuth,
  asyncHandler(async (req: Request<{ threadId: string }>, res: Response) => {
    const user = (req as typeof req & { user: { id: string } }).user;
    const { threadId } = req.params;

    // Toggle: if the row is there the student un-votes, otherwise they vote.
    const { data: existing, error: readError } = await supabaseAdmin
      .from("community_upvotes")
      .select("thread_id")
      .eq("thread_id", threadId)
      .eq("user_id", user.id)
      .limit(1);

    if (readError) {
      if (isMissingTable(readError)) {
        res.json({ upvotes: 0, upvotedByYou: false, migrated: false });
        return;
      }
      serverError(res, readError, "community");
      return;
    }

    const hasVoted = (existing ?? []).length > 0;
    const write = hasVoted
      ? await supabaseAdmin
          .from("community_upvotes")
          .delete()
          .eq("thread_id", threadId)
          .eq("user_id", user.id)
      : await supabaseAdmin
          .from("community_upvotes")
          .insert({ thread_id: threadId, user_id: user.id });

    if (write.error) {
      serverError(res, write.error, "community");
      return;
    }

    const { counts } = await upvoteMaps([threadId], user.id);
    res.json({
      upvotes: counts.get(threadId) ?? 0,
      upvotedByYou: !hasVoted,
      migrated: true,
    });
  }),
);

// ── /:spaceId/threads — the space listing and thread composer ───────────────

router.get(
  "/:spaceId/threads",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const { spaceId } = req.params;

    const { data, error } = await supabaseAdmin
      .from("community_threads")
      .select("id, space_id, user_id, title, body, created_at")
      .eq("space_id", spaceId)
      .order("created_at", { ascending: false })
      .limit(MAX_LIST);

    if (error) {
      if (isMissingTable(error)) {
        res.json({ threads: [], migrated: false });
        return;
      }
      serverError(res, error, "community");
      return;
    }

    const threads = (data ?? []) as ThreadRow[];
    const ids = threads.map((t) => t.id);
    const names = await maskedNames(threads.map((t) => t.user_id));
    const [replies, upvotes] = await Promise.all([replyCounts(ids), upvoteMaps(ids, user.id)]);

    res.setHeader("Cache-Control", "private, no-store");
    res.json({
      threads: threads.map((t) => ({
        id: t.id,
        spaceId: t.space_id,
        title: t.title,
        body: t.body,
        author: names.get(t.user_id) ?? "Student",
        createdAt: t.created_at,
        replyCount: replies.get(t.id) ?? 0,
        upvotes: upvotes.counts.get(t.id) ?? 0,
        upvotedByYou: upvotes.mine.has(t.id),
      })),
      migrated: true,
    });
  }),
);

router.post(
  "/:spaceId/threads",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const { spaceId } = req.params;
    const parsed = threadCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Thread needs a title (4–140 characters) and a body (1–4000)." });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from("community_threads")
      .insert({
        space_id: spaceId,
        user_id: user.id,
        title: parsed.data.title,
        body: parsed.data.body,
      })
      .select("id, space_id, user_id, title, body, created_at")
      .single();

    if (error) {
      if (isMissingTable(error)) {
        res.json({ thread: null, migrated: false });
        return;
      }
      serverError(res, error, "community");
      return;
    }

    const row = data as ThreadRow;
    const names = await maskedNames([row.user_id]);
    res.status(201).json({
      thread: {
        id: row.id,
        spaceId: row.space_id,
        title: row.title,
        body: row.body,
        author: names.get(row.user_id) ?? "Student",
        createdAt: row.created_at,
        replyCount: 0,
        upvotes: 0,
        upvotedByYou: false,
      },
      migrated: true,
    });
  }),
);

export default router;
