import { randomUUID } from "node:crypto";
import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../../db/supabase";
import { requireAuth, getUserFromRequest, type AuthedRequest } from "../../middleware/auth";
import { communityAiReplyLimit } from "../../middleware/rateLimit";
import { asyncHandler } from "../../middleware/asyncHandler";
import { serverError } from "../../middleware/error-handler";
import { isR2StorageActive, r2Upload, r2Download, r2Delete } from "../../storage/r2";
import { reserveStoragePath, releaseStoragePath } from "../../services/profile-storage";
import { profileMediaPublicUrl } from "../../services/profile-media-url";
import {
  COMMUNITY_BOT_ID,
  communityBotAuthorOverlay,
  ensureCommunityBotProfile,
  isCommunityBotId,
} from "../../lib/community-bot";
import type { SessionUser } from "../../auth/types";
import { generateCommunityAssistantReply } from "../../services/community-ai-reply";
import {
  BINARY_FILE_BY_EXTENSION,
  COMMUNITY_ATTACHMENT_MAX_BYTES,
  decodeBase64Upload,
  matchBinaryMagic,
  resolveUploadMime,
  sanitizeUploadFilename,
} from "../../storage/binary-upload-policy.js";
import {
  ingestCommunityAttachment,
  type RequestWithCommunityAttachment,
} from "../../http/community-attachment-body.js";

/**
 * Public community feed. Guests read; any approved session (requireAuth)
 * publishes; pro and owner moderate. Study-space threads stay on the other
 * router mounted after this one.
 *
 * Search runs in memory over the latest SCAN_LIMIT rows (the dev mock has
 * no ilike). When migration 018 is missing, reads return migrated: false
 * and writes return 503. JSON never includes storage_path, data_base64,
 * emails, or R2 URLs.
 */

const router = Router();

const PAGE_SIZE = 10;
const SCAN_LIMIT = 300;
const MAX_FILES = 4;
const MAX_FILE_BYTES = COMMUNITY_ATTACHMENT_MAX_BYTES;
const MIGRATION_MESSAGE =
  "Community feed is unavailable until migration 018 is applied. From backend/, run: node scripts/migrate.mjs";

const CATEGORIES = [
  "general",
  "physics",
  "chemistry",
  "biology",
  "mathematics",
  "english",
  "nepali",
] as const;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Firebase Auth uid or legacy Supabase uuid stored in profiles.id / author_id. */
const USER_ID_RE = /^[A-Za-z0-9_-]{8,128}$/;

type DbError = { message?: string; code?: string } | null;

interface PostRow {
  id: string;
  author_id: string;
  title: string;
  body: string;
  category: string;
  visibility: string;
  created_at: string;
  updated_at: string;
}

interface ProfileRow {
  id: string;
  full_name: string | null;
  username?: string | null;
  plan: string | null;
  role: string | null;
  avatar_path?: string | null;
}

interface AttachmentRow {
  id: string;
  post_id: string;
  filename: string;
  content_type: string;
  byte_size: number;
  storage_path?: string | null;
  data_base64?: string | null;
  created_at?: string;
}

interface CommentRow {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  created_at: string;
  updated_at: string;
}

const postSchema = z.object({
  title: z.string().trim().min(4).max(160),
  body: z.string().trim().min(1).max(20000),
  category: z.enum(CATEGORIES),
});

const commentSchema = z.object({
  body: z.string().trim().min(1).max(8000),
});

const attachmentSchema = z.object({
  filename: z.string().trim().min(1).max(180),
  contentType: z.string().trim().min(1).max(200),
  dataBase64: z.string().min(1).max(4_500_000),
});

function isMissingTable(error: DbError): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

function isUniqueViolation(error: DbError): boolean {
  const code = (error?.code ?? "").toString();
  const msg = (error?.message ?? "").toLowerCase();
  return code === "23505" || msg.includes("duplicate") || msg.includes("unique");
}

/** In-process lock so two clicks on the same post do not double-generate. */
const assistantReplyInFlight = new Set<string>();

function userOf(req: Request): SessionUser {
  return (req as AuthedRequest).user;
}

function isModerator(user: SessionUser): boolean {
  return user.role === "pro" || user.role === "owner";
}

function canManage(user: SessionUser, authorId: string): boolean {
  return user.id === authorId || isModerator(user);
}

function noStore(res: Response): void {
  res.setHeader("Cache-Control", "no-store");
}

function bad(res: Response, message: string, status = 400): void {
  noStore(res);
  res.status(status).json({ error: message });
}

function unavailable(res: Response): void {
  noStore(res);
  res.status(503).json({ error: MIGRATION_MESSAGE });
}

function queryOne(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return undefined;
}

function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

function isUserId(value: string): boolean {
  return isUuid(value) || USER_ID_RE.test(value);
}

function param(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

async function ensureProfile(user: SessionUser): Promise<void> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (error) {
    if (isMissingTable(error)) return;
    throw error;
  }
  if (data) return;
  const { error: insertError } = await supabaseAdmin.from("profiles").insert({
    id: user.id,
    full_name: user.fullName,
    role: user.role ?? "member",
    plan: user.plan ?? "member",
    access_status: "ACTIVE",
    premium_status: user.premiumStatus === true,
  });
  if (insertError && !isMissingTable(insertError)) {
    const msg = (insertError.message ?? "").toLowerCase();
    if (!msg.includes("duplicate") && !msg.includes("unique")) throw insertError;
  }
}

function toAuthor(
  id: string,
  profile?: ProfileRow,
  followingByYou = false,
) {
  if (isCommunityBotId(id)) {
    return communityBotAuthorOverlay(id, profile, followingByYou);
  }
  const name = typeof profile?.full_name === "string" ? profile.full_name.trim() : "";
  const username =
    typeof profile?.username === "string" && profile.username.trim()
      ? profile.username.trim()
      : null;
  return {
    id,
    fullName: name || "Student",
    username,
    plan: profile?.plan ?? null,
    role: profile?.role ?? null,
    avatarUrl: profileMediaPublicUrl(profile?.avatar_path ?? null),
    followingByYou,
  };
}

async function profilesById(ids: string[]): Promise<Map<string, ProfileRow>> {
  const map = new Map<string, ProfileRow>();
  const unique = [...new Set(ids)].filter(Boolean);
  if (unique.length === 0) return map;
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, full_name, username, plan, role, avatar_path")
    .in("id", unique);
  if (error || !data) return map;
  for (const row of data as ProfileRow[]) map.set(row.id, row);
  return map;
}

async function assistantReplyMeta(
  postId: string,
  _postAuthorId: string,
  viewerId: string | null,
): Promise<{ posted: boolean; canApprove: boolean }> {
  let posted = false;
  const { data, error } = await supabaseAdmin
    .from("community_feed_ai_replies")
    .select("post_id")
    .eq("post_id", postId)
    .maybeSingle();
  if (!error && data) posted = true;
  if (!posted && !isMissingTable(error)) {
    const legacy = await supabaseAdmin
      .from("community_feed_comments")
      .select("id")
      .eq("post_id", postId)
      .eq("author_id", COMMUNITY_BOT_ID)
      .limit(1);
    if (!legacy.error && (legacy.data ?? []).length > 0) posted = true;
  }
  const canApprove = Boolean(viewerId && !posted);
  return { posted, canApprove };
}

async function followingByAuthor(
  viewerId: string | null,
  authorIds: string[],
): Promise<Set<string>> {
  const unique = [...new Set(authorIds)].filter((id) => id && id !== viewerId);
  if (!viewerId || unique.length === 0) return new Set();
  const { data, error } = await supabaseAdmin
    .from("profile_follows")
    .select("following_id")
    .eq("follower_id", viewerId)
    .in("following_id", unique);
  if (error) return new Set();
  return new Set((data ?? []).map((row) => row.following_id as string));
}

async function sideData(postIds: string[]): Promise<
  | {
      likes: Array<{ post_id: string; user_id: string }>;
      comments: Array<{ post_id: string }>;
      attachments: AttachmentRow[];
    }
  | { missing: true }
  | { error: DbError }
> {
  if (postIds.length === 0) return { likes: [], comments: [], attachments: [] };
  const [likesRes, commentsRes, attachmentsRes] = await Promise.all([
    supabaseAdmin.from("community_feed_likes").select("post_id, user_id").in("post_id", postIds),
    supabaseAdmin.from("community_feed_comments").select("post_id").in("post_id", postIds),
    supabaseAdmin
      .from("community_feed_attachments")
      .select("id, post_id, filename, content_type, byte_size, created_at")
      .in("post_id", postIds),
  ]);
  for (const error of [likesRes.error, commentsRes.error, attachmentsRes.error]) {
    if (isMissingTable(error)) return { missing: true };
    if (error) return { error };
  }
  return {
    likes: (likesRes.data ?? []) as Array<{ post_id: string; user_id: string }>,
    comments: (commentsRes.data ?? []) as Array<{ post_id: string }>,
    attachments: (attachmentsRes.data ?? []) as AttachmentRow[],
  };
}

function presentPost(
  row: PostRow,
  profiles: Map<string, ProfileRow>,
  likes: Array<{ post_id: string; user_id: string }>,
  commentRows: Array<{ post_id: string }>,
  attachments: AttachmentRow[],
  viewerId: string | null,
  followingAuthors: Set<string>,
) {
  const postLikes = likes.filter((like) => like.post_id === row.id);
  const files = attachments
    .filter((file) => file.post_id === row.id)
    .sort((a, b) => String(a.created_at ?? "").localeCompare(String(b.created_at ?? "")));
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    category: row.category,
    visibility: "public" as const,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author: toAuthor(
      row.author_id,
      profiles.get(row.author_id),
      followingAuthors.has(row.author_id),
    ),
    likeCount: postLikes.length,
    likedByYou: viewerId ? postLikes.some((like) => like.user_id === viewerId) : false,
    commentCount: commentRows.filter((comment) => comment.post_id === row.id).length,
    attachments: files.map((file) => ({
      id: file.id,
      filename: file.filename,
      contentType: file.content_type,
      byteSize: Number(file.byte_size) || 0,
    })),
  };
}

async function presentMany(rows: PostRow[], viewerId: string | null) {
  const side = await sideData(rows.map((row) => row.id));
  if ("missing" in side) return { missing: true as const };
  if ("error" in side) return { error: side.error };
  const profiles = await profilesById(rows.map((row) => row.author_id));
  const followingAuthors = await followingByAuthor(
    viewerId,
    rows.map((row) => row.author_id),
  );
  return {
    posts: rows.map((row) =>
      presentPost(row, profiles, side.likes, side.comments, side.attachments, viewerId, followingAuthors),
    ),
  };
}

async function loadRecent(authorId?: string): Promise<{ rows: PostRow[] } | { missing: true } | { error: DbError }> {
  const base = supabaseAdmin
    .from("community_feed_posts")
    .select("id, author_id, title, body, category, visibility, created_at, updated_at");
  const query = authorId
    ? base.eq("author_id", authorId).order("created_at", { ascending: false }).limit(SCAN_LIMIT)
    : base.order("created_at", { ascending: false }).limit(SCAN_LIMIT);
  const { data, error } = await query;
  if (error) {
    if (isMissingTable(error)) return { missing: true };
    return { error };
  }
  return { rows: (data ?? []) as PostRow[] };
}

function filterRows(
  rows: PostRow[],
  opts: { q?: string; category?: string; authorId?: string; cursor: number },
) {
  let next = rows;
  const needle = opts.q?.trim().toLowerCase();
  if (needle) {
    next = next.filter(
      (row) => row.title.toLowerCase().includes(needle) || row.body.toLowerCase().includes(needle),
    );
  }
  if (opts.category) next = next.filter((row) => row.category === opts.category);
  if (opts.authorId) next = next.filter((row) => row.author_id === opts.authorId);
  const page = next.slice(opts.cursor, opts.cursor + PAGE_SIZE);
  const nextCursor = opts.cursor + PAGE_SIZE < next.length ? opts.cursor + PAGE_SIZE : null;
  return { page, nextCursor };
}

function readListQuery(req: Request): { q?: string; category?: string; authorId?: string; cursor: number } | { error: string } {
  const q = queryOne(req.query.q);
  const category = queryOne(req.query.category);
  const authorId = queryOne(req.query.authorId);
  const cursorRaw = queryOne(req.query.cursor);
  if (q && q.length > 120) return { error: "Search is too long" };
  if (category && !CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return { error: "Unknown category" };
  }
  if (authorId && !isUserId(authorId)) return { error: "Unknown author" };
  let cursor = 0;
  if (cursorRaw) {
    if (!/^\d+$/.test(cursorRaw)) return { error: "Invalid cursor" };
    cursor = Number(cursorRaw);
    if (!Number.isFinite(cursor) || cursor < 0 || cursor > 100000) return { error: "Invalid cursor" };
  }
  return {
    q,
    category: category || undefined,
    authorId: authorId || undefined,
    cursor,
  };
}

async function sendList(
  res: Response,
  viewerId: string | null,
  scopedAuthorId: string | undefined,
  req: Request,
): Promise<void> {
  const parsed = readListQuery(req);
  if ("error" in parsed) {
    bad(res, parsed.error);
    return;
  }
  const loaded = await loadRecent(scopedAuthorId);
  if ("missing" in loaded) {
    noStore(res);
    res.json({ posts: [], nextCursor: null, migrated: false });
    return;
  }
  if ("error" in loaded) {
    serverError(res, loaded.error, "community-feed");
    return;
  }
  const { page, nextCursor } = filterRows(loaded.rows, {
    q: parsed.q,
    category: parsed.category,
    authorId: scopedAuthorId ? undefined : parsed.authorId,
    cursor: parsed.cursor,
  });
  const presented = await presentMany(page, viewerId);
  if ("missing" in presented) {
    noStore(res);
    res.json({ posts: [], nextCursor: null, migrated: false });
    return;
  }
  if ("error" in presented) {
    serverError(res, presented.error, "community-feed");
    return;
  }
  noStore(res);
  res.json({ posts: presented.posts, nextCursor, migrated: true });
}

async function findPost(postId: string): Promise<{ row: PostRow | null } | { missing: true } | { error: DbError }> {
  const { data, error } = await supabaseAdmin
    .from("community_feed_posts")
    .select("id, author_id, title, body, category, visibility, created_at, updated_at")
    .eq("id", postId)
    .maybeSingle();
  if (error) {
    if (isMissingTable(error)) return { missing: true };
    return { error };
  }
  return { row: (data as PostRow | null) ?? null };
}

async function deletePostTree(postId: string): Promise<{ missing: true } | { error: DbError } | { ok: true }> {
  const post = await findPost(postId);
  const ownerId =
    !("missing" in post) && !("error" in post) && post.row ? post.row.author_id : null;
  const { data: files, error: fileError } = await supabaseAdmin
    .from("community_feed_attachments")
    .select("id, storage_path")
    .eq("post_id", postId);
  if (fileError) {
    if (isMissingTable(fileError)) return { missing: true };
    return { error: fileError };
  }
  for (const file of (files ?? []) as Array<{ storage_path?: string | null }>) {
    if (file.storage_path) {
      await r2Delete(file.storage_path);
      if (ownerId) await releaseStoragePath(ownerId, file.storage_path);
    }
  }
  const likes = await supabaseAdmin.from("community_feed_likes").delete().eq("post_id", postId);
  if (likes.error) {
    if (isMissingTable(likes.error)) return { missing: true };
    return { error: likes.error };
  }
  const comments = await supabaseAdmin.from("community_feed_comments").delete().eq("post_id", postId);
  if (comments.error) {
    if (isMissingTable(comments.error)) return { missing: true };
    return { error: comments.error };
  }
  const attachments = await supabaseAdmin.from("community_feed_attachments").delete().eq("post_id", postId);
  if (attachments.error) {
    if (isMissingTable(attachments.error)) return { missing: true };
    return { error: attachments.error };
  }
  const deleted = await supabaseAdmin.from("community_feed_posts").delete().eq("id", postId);
  if (deleted.error) {
    if (isMissingTable(deleted.error)) return { missing: true };
    return { error: deleted.error };
  }
  return { ok: true };
}

router.get(
  "/feed",
  asyncHandler(async (req, res) => {
    const viewer = await getUserFromRequest(req);
    await sendList(res, viewer?.id ?? null, undefined, req);
  }),
);

router.post(
  "/feed",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const parsed = postSchema.safeParse(req.body);
    if (!parsed.success) {
      bad(res, "Title must be 4–160 characters, body 1–20000, and category one of the study subjects.");
      return;
    }
    await ensureProfile(user);
    const now = new Date().toISOString();
    const id = randomUUID();
    const { data, error } = await supabaseAdmin
      .from("community_feed_posts")
      .insert({
        id,
        author_id: user.id,
        title: parsed.data.title,
        body: parsed.data.body,
        category: parsed.data.category,
        visibility: "public",
        created_at: now,
        updated_at: now,
      })
      .select("id, author_id, title, body, category, visibility, created_at, updated_at")
      .single();
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    const presented = await presentMany([data as PostRow], user.id);
    if ("missing" in presented || "error" in presented || presented.posts.length === 0) {
      noStore(res);
      res.status(201).json({
        post: {
          id,
          title: parsed.data.title,
          body: parsed.data.body,
          category: parsed.data.category,
          visibility: "public",
          createdAt: now,
          updatedAt: now,
          author: toAuthor(user.id, {
            id: user.id,
            full_name: user.fullName,
            plan: user.plan ?? null,
            role: user.role,
          }),
          likeCount: 0,
          likedByYou: false,
          commentCount: 0,
          attachments: [],
        },
      });
      return;
    }
    noStore(res);
    res.status(201).json({ post: presented.posts[0] });
  }),
);

router.get(
  "/feed/mine",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    await ensureProfile(user);
    await sendList(res, user.id, user.id, req);
  }),
);

router.get(
  "/feed/attachments/:attachmentId/file",
  asyncHandler(async (req, res) => {
    const attachmentId = param(req.params.attachmentId);
    if (!isUuid(attachmentId)) {
      bad(res, "File not found", 404);
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("community_feed_attachments")
      .select("id, post_id, filename, content_type, byte_size, storage_path, data_base64")
      .eq("id", attachmentId)
      .maybeSingle();
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    const row = data as AttachmentRow | null;
    if (!row) {
      bad(res, "File not found", 404);
      return;
    }
    const post = await findPost(row.post_id);
    if ("missing" in post) {
      unavailable(res);
      return;
    }
    if ("error" in post) {
      serverError(res, post.error, "community-feed");
      return;
    }
    if (!post.row || post.row.visibility !== "public") {
      bad(res, "File not found", 404);
      return;
    }
    let bytes: Buffer | null = null;
    let contentType =
      BINARY_FILE_BY_EXTENSION[row.filename.split(".").pop()?.toLowerCase() ?? ""]?.mime ||
      "application/octet-stream";
    if (row.storage_path) {
      try {
        const downloaded = await r2Download(row.storage_path);
        if (!downloaded) {
          bad(res, "File not found", 404);
          return;
        }
        bytes = downloaded.buffer;
        if (downloaded.contentType && downloaded.contentType !== "application/octet-stream") {
          contentType = row.content_type || downloaded.contentType;
        }
      } catch (err) {
        serverError(res, err, "community-feed");
        return;
      }
    } else if (row.data_base64) {
      bytes = Buffer.from(row.data_base64, "base64");
      contentType = row.content_type || contentType;
    }
    if (!bytes || bytes.length === 0) {
      bad(res, "File not found", 404);
      return;
    }
    const allowed = new Set(Object.values(BINARY_FILE_BY_EXTENSION).map((spec) => spec.mime));
    if (!allowed.has(contentType)) contentType = "application/octet-stream";
    const inline = queryOne(req.query.disposition) === "inline";
    const ascii = row.filename.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_");
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", String(bytes.length));
    res.setHeader("Content-Disposition", `${inline ? "inline" : "attachment"}; filename="${ascii}"`);
    res.setHeader("Cache-Control", "private, max-age=3600");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.status(200).end(bytes);
  }),
);

router.delete(
  "/feed/attachments/:attachmentId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const attachmentId = param(req.params.attachmentId);
    if (!isUuid(attachmentId)) {
      bad(res, "File not found", 404);
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("community_feed_attachments")
      .select("id, post_id, storage_path")
      .eq("id", attachmentId)
      .maybeSingle();
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    const row = data as { id: string; post_id: string; storage_path?: string | null } | null;
    if (!row) {
      bad(res, "File not found", 404);
      return;
    }
    const post = await findPost(row.post_id);
    if ("missing" in post) {
      unavailable(res);
      return;
    }
    if ("error" in post) {
      serverError(res, post.error, "community-feed");
      return;
    }
    if (!post.row || !canManage(user, post.row.author_id)) {
      bad(res, "You can only remove files on your own posts.", 403);
      return;
    }
    if (row.storage_path) {
      try {
        await r2Delete(row.storage_path);
        await releaseStoragePath(post.row.author_id, row.storage_path);
      } catch (err) {
        serverError(res, err, "community-feed");
        return;
      }
    }
    const removed = await supabaseAdmin.from("community_feed_attachments").delete().eq("id", attachmentId);
    if (removed.error) {
      if (isMissingTable(removed.error)) {
        unavailable(res);
        return;
      }
      serverError(res, removed.error, "community-feed");
      return;
    }
    noStore(res);
    res.json({ ok: true });
  }),
);

router.get(
  "/feed/:postId",
  asyncHandler(async (req, res) => {
    const postId = param(req.params.postId);
    if (!isUuid(postId)) {
      bad(res, "Post not found", 404);
      return;
    }
    const found = await findPost(postId);
    if ("missing" in found) {
      noStore(res);
      res.json({ post: null, migrated: false });
      return;
    }
    if ("error" in found) {
      serverError(res, found.error, "community-feed");
      return;
    }
    if (!found.row) {
      bad(res, "Post not found", 404);
      return;
    }
    const viewer = await getUserFromRequest(req);
    const presented = await presentMany([found.row], viewer?.id ?? null);
    if ("missing" in presented) {
      noStore(res);
      res.json({ post: null, migrated: false });
      return;
    }
    if ("error" in presented) {
      serverError(res, presented.error, "community-feed");
      return;
    }
    const { data: commentRows, error: commentError } = await supabaseAdmin
      .from("community_feed_comments")
      .select("id, post_id, author_id, body, created_at, updated_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
      .limit(500);
    if (commentError) {
      if (isMissingTable(commentError)) {
        noStore(res);
        res.json({ post: null, migrated: false });
        return;
      }
      serverError(res, commentError, "community-feed");
      return;
    }
    const comments = (commentRows ?? []) as CommentRow[];
    const profiles = await profilesById(comments.map((comment) => comment.author_id));
    const commentFollows = await followingByAuthor(
      viewer?.id ?? null,
      comments.map((comment) => comment.author_id),
    );
    const assistantReply = await assistantReplyMeta(
      postId,
      found.row.author_id,
      viewer?.id ?? null,
    );
    noStore(res);
    res.json({
      post: {
        ...presented.posts[0],
        commentCount: comments.length,
        assistantReply,
        comments: comments.map((comment) => ({
          id: comment.id,
          body: comment.body,
          createdAt: comment.created_at,
          updatedAt: comment.updated_at,
          author: toAuthor(
            comment.author_id,
            profiles.get(comment.author_id),
            commentFollows.has(comment.author_id),
          ),
        })),
      },
      migrated: true,
    });
  }),
);

router.post(
  "/feed/:postId/ai-assistant/reply",
  requireAuth,
  communityAiReplyLimit,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    if (!isUuid(postId)) {
      bad(res, "Post not found", 404);
      return;
    }
    const parsed = z.object({ approve: z.boolean().optional() }).safeParse(req.body ?? {});
    if (!parsed.success || parsed.data.approve === false) {
      bad(res, "Confirm approval with { \"approve\": true }.");
      return;
    }
    const found = await findPost(postId);
    if ("missing" in found) {
      unavailable(res);
      return;
    }
    if ("error" in found) {
      serverError(res, found.error, "community-feed");
      return;
    }
    if (!found.row) {
      bad(res, "Post not found", 404);
      return;
    }
    const existing = await assistantReplyMeta(postId, found.row.author_id, user.id);
    if (existing.posted) {
      bad(res, "A Study Assistant reply was already published on this post.", 409);
      return;
    }
    if (assistantReplyInFlight.has(postId)) {
      bad(res, "A Study Assistant reply is already being generated for this post.", 409);
      return;
    }
    assistantReplyInFlight.add(postId);
    try {
      await ensureCommunityBotProfile();
      let body: string;
      try {
        body = await generateCommunityAssistantReply({
          title: found.row.title,
          body: found.row.body,
          category: found.row.category,
        });
      } catch (err) {
        serverError(
          res,
          err instanceof Error ? err : new Error(String(err)),
          "community-feed-ai",
        );
        return;
      }
      const now = new Date().toISOString();
      const commentId = randomUUID();
      const { error: commentError } = await supabaseAdmin.from("community_feed_comments").insert({
        id: commentId,
        post_id: postId,
        author_id: COMMUNITY_BOT_ID,
        body,
        created_at: now,
        updated_at: now,
      });
      if (commentError) {
        if (isMissingTable(commentError)) {
          unavailable(res);
          return;
        }
        serverError(res, commentError, "community-feed");
        return;
      }
      const { error: ledgerError } = await supabaseAdmin.from("community_feed_ai_replies").insert({
        post_id: postId,
        comment_id: commentId,
        approved_by: user.id,
        created_at: now,
      });
      if (ledgerError && !isMissingTable(ledgerError)) {
        await supabaseAdmin.from("community_feed_comments").delete().eq("id", commentId);
        if (isUniqueViolation(ledgerError)) {
          bad(res, "A Study Assistant reply was already published on this post.", 409);
          return;
        }
        serverError(res, ledgerError, "community-feed");
        return;
      }
      const botProfiles = await profilesById([COMMUNITY_BOT_ID]);
      noStore(res);
      res.status(201).json({
        comment: {
          id: commentId,
          body,
          createdAt: now,
          updatedAt: now,
          author: toAuthor(
            COMMUNITY_BOT_ID,
            botProfiles.get(COMMUNITY_BOT_ID),
            false,
          ),
        },
        assistantReply: { posted: true, canApprove: false },
      });
    } finally {
      assistantReplyInFlight.delete(postId);
    }
  }),
);

router.patch(
  "/feed/:postId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    if (!isUuid(postId)) {
      bad(res, "Post not found", 404);
      return;
    }
    const parsed = postSchema.safeParse(req.body);
    if (!parsed.success) {
      bad(res, "Title must be 4–160 characters, body 1–20000, and category one of the study subjects.");
      return;
    }
    const found = await findPost(postId);
    if ("missing" in found) {
      unavailable(res);
      return;
    }
    if ("error" in found) {
      serverError(res, found.error, "community-feed");
      return;
    }
    if (!found.row) {
      bad(res, "Post not found", 404);
      return;
    }
    if (!canManage(user, found.row.author_id)) {
      bad(res, "You can only edit your own posts.", 403);
      return;
    }
    const updatedAt = new Date().toISOString();
    const { error } = await supabaseAdmin
      .from("community_feed_posts")
      .update({
        title: parsed.data.title,
        body: parsed.data.body,
        category: parsed.data.category,
        updated_at: updatedAt,
      })
      .eq("id", postId);
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    const again = await findPost(postId);
    if ("row" in again && again.row) {
      const presented = await presentMany([again.row], user.id);
      const saved = "posts" in presented && presented.posts ? presented.posts[0] : undefined;
      if (saved) {
        noStore(res);
        res.json({ post: saved });
        return;
      }
    }
    noStore(res);
    res.json({
      post: {
        id: found.row.id,
        title: parsed.data.title,
        body: parsed.data.body,
        category: parsed.data.category,
        visibility: "public",
        createdAt: found.row.created_at,
        updatedAt,
        author: toAuthor(found.row.author_id),
        likeCount: 0,
        likedByYou: false,
        commentCount: 0,
        attachments: [],
      },
    });
  }),
);

router.delete(
  "/feed/:postId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    if (!isUuid(postId)) {
      bad(res, "Post not found", 404);
      return;
    }
    const found = await findPost(postId);
    if ("missing" in found) {
      unavailable(res);
      return;
    }
    if ("error" in found) {
      serverError(res, found.error, "community-feed");
      return;
    }
    if (!found.row) {
      bad(res, "Post not found", 404);
      return;
    }
    if (!canManage(user, found.row.author_id)) {
      bad(res, "You can only delete your own posts.", 403);
      return;
    }
    try {
      const removed = await deletePostTree(postId);
      if ("missing" in removed) {
        unavailable(res);
        return;
      }
      if ("error" in removed) {
        serverError(res, removed.error, "community-feed");
        return;
      }
    } catch (err) {
      serverError(res, err, "community-feed");
      return;
    }
    noStore(res);
    res.json({ ok: true });
  }),
);

router.post(
  "/feed/:postId/like",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    if (!isUuid(postId)) {
      bad(res, "Post not found", 404);
      return;
    }
    const found = await findPost(postId);
    if ("missing" in found) {
      unavailable(res);
      return;
    }
    if ("error" in found) {
      serverError(res, found.error, "community-feed");
      return;
    }
    if (!found.row) {
      bad(res, "Post not found", 404);
      return;
    }
    await ensureProfile(user);
    const existing = await supabaseAdmin
      .from("community_feed_likes")
      .select("post_id, user_id")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing.error) {
      if (isMissingTable(existing.error)) {
        unavailable(res);
        return;
      }
      serverError(res, existing.error, "community-feed");
      return;
    }
    if (existing.data) {
      const removed = await supabaseAdmin
        .from("community_feed_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      if (removed.error) {
        if (isMissingTable(removed.error)) {
          unavailable(res);
          return;
        }
        serverError(res, removed.error, "community-feed");
        return;
      }
    } else {
      const inserted = await supabaseAdmin.from("community_feed_likes").insert({
        post_id: postId,
        user_id: user.id,
        created_at: new Date().toISOString(),
      });
      if (inserted.error) {
        if (isMissingTable(inserted.error)) {
          unavailable(res);
          return;
        }
        const msg = (inserted.error.message ?? "").toLowerCase();
        if (!msg.includes("duplicate") && !msg.includes("unique")) {
          serverError(res, inserted.error, "community-feed");
          return;
        }
      }
    }
    const { data: likes, error: countError } = await supabaseAdmin
      .from("community_feed_likes")
      .select("user_id")
      .eq("post_id", postId);
    if (countError) {
      if (isMissingTable(countError)) {
        unavailable(res);
        return;
      }
      serverError(res, countError, "community-feed");
      return;
    }
    const rows = (likes ?? []) as Array<{ user_id: string }>;
    noStore(res);
    res.json({
      likeCount: rows.length,
      likedByYou: rows.some((row) => row.user_id === user.id),
    });
  }),
);

router.post(
  "/feed/:postId/comments",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    if (!isUuid(postId)) {
      bad(res, "Post not found", 404);
      return;
    }
    const parsed = commentSchema.safeParse(req.body);
    if (!parsed.success) {
      bad(res, "Comment must be 1–8000 characters.");
      return;
    }
    const found = await findPost(postId);
    if ("missing" in found) {
      unavailable(res);
      return;
    }
    if ("error" in found) {
      serverError(res, found.error, "community-feed");
      return;
    }
    if (!found.row) {
      bad(res, "Post not found", 404);
      return;
    }
    await ensureProfile(user);
    const now = new Date().toISOString();
    const id = randomUUID();
    const { error } = await supabaseAdmin.from("community_feed_comments").insert({
      id,
      post_id: postId,
      author_id: user.id,
      body: parsed.data.body,
      created_at: now,
      updated_at: now,
    });
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    noStore(res);
    res.status(201).json({
      comment: {
        id,
        body: parsed.data.body,
        createdAt: now,
        updatedAt: now,
        author: toAuthor(user.id, {
          id: user.id,
          full_name: user.fullName,
          plan: user.plan ?? null,
          role: user.role,
        }),
      },
    });
  }),
);

router.patch(
  "/feed/:postId/comments/:commentId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    const commentId = param(req.params.commentId);
    if (!isUuid(postId) || !isUuid(commentId)) {
      bad(res, "Comment not found", 404);
      return;
    }
    const parsed = commentSchema.safeParse(req.body);
    if (!parsed.success) {
      bad(res, "Comment must be 1–8000 characters.");
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("community_feed_comments")
      .select("id, post_id, author_id, body, created_at, updated_at")
      .eq("id", commentId)
      .eq("post_id", postId)
      .maybeSingle();
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    const row = data as CommentRow | null;
    if (!row) {
      bad(res, "Comment not found", 404);
      return;
    }
    if (row.author_id !== user.id) {
      bad(res, "You can only edit your own comments.", 403);
      return;
    }
    const updatedAt = new Date().toISOString();
    const saved = await supabaseAdmin
      .from("community_feed_comments")
      .update({ body: parsed.data.body, updated_at: updatedAt })
      .eq("id", commentId)
      .eq("author_id", user.id);
    if (saved.error) {
      if (isMissingTable(saved.error)) {
        unavailable(res);
        return;
      }
      serverError(res, saved.error, "community-feed");
      return;
    }
    noStore(res);
    res.json({
      comment: {
        id: row.id,
        body: parsed.data.body,
        createdAt: row.created_at,
        updatedAt,
        author: toAuthor(user.id, {
          id: user.id,
          full_name: user.fullName,
          plan: user.plan ?? null,
          role: user.role,
        }),
      },
    });
  }),
);

router.delete(
  "/feed/:postId/comments/:commentId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    const commentId = param(req.params.commentId);
    if (!isUuid(postId) || !isUuid(commentId)) {
      bad(res, "Comment not found", 404);
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("community_feed_comments")
      .select("id, author_id")
      .eq("id", commentId)
      .eq("post_id", postId)
      .maybeSingle();
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    const row = data as { id: string; author_id: string } | null;
    if (!row) {
      bad(res, "Comment not found", 404);
      return;
    }
    if (row.author_id !== user.id && !isModerator(user)) {
      bad(res, "You can only delete your own comments.", 403);
      return;
    }
    const removed = await supabaseAdmin.from("community_feed_comments").delete().eq("id", commentId);
    if (removed.error) {
      if (isMissingTable(removed.error)) {
        unavailable(res);
        return;
      }
      serverError(res, removed.error, "community-feed");
      return;
    }
    noStore(res);
    res.json({ ok: true });
  }),
);

router.post(
  "/feed/:postId/attachments",
  requireAuth,
  ingestCommunityAttachment,
  asyncHandler(async (req, res) => {
    const user = userOf(req);
    const postId = param(req.params.postId);
    if (!isUuid(postId)) {
      bad(res, "Post not found", 404);
      return;
    }
    const rawUpload = (req as RequestWithCommunityAttachment).communityAttachmentUpload;
    let safeName: string | null;
    let mime: string | null;
    let buffer: Buffer | null;
    let dataBase64Payload: string | null = null;

    if (rawUpload) {
      safeName = sanitizeUploadFilename(rawUpload.filename);
      if (!safeName) {
        bad(res, "Invalid filename");
        return;
      }
      mime = resolveUploadMime(safeName, rawUpload.contentType);
      buffer = rawUpload.buffer;
    } else {
      const parsed = attachmentSchema.safeParse(req.body);
      if (!parsed.success) {
        bad(res, "Invalid file payload");
        return;
      }
      safeName = sanitizeUploadFilename(parsed.data.filename);
      if (!safeName) {
        bad(res, "Invalid filename");
        return;
      }
      mime = resolveUploadMime(safeName, parsed.data.contentType);
      buffer = decodeBase64Upload(parsed.data.dataBase64);
      if (!buffer) {
        bad(res, "Invalid base64 payload");
        return;
      }
      dataBase64Payload = parsed.data.dataBase64.trim();
    }

    const ext = safeName.split(".").pop()?.toLowerCase() ?? "";
    const spec = BINARY_FILE_BY_EXTENSION[ext];
    if (!spec || !mime || !buffer) {
      bad(res, "This file type is not allowed");
      return;
    }
    if (buffer.length > MAX_FILE_BYTES) {
      bad(res, "Each file must be 3 MB or smaller", 413);
      return;
    }
    if (!matchBinaryMagic(buffer, spec.kind)) {
      bad(res, "File contents do not match its type");
      return;
    }
    const found = await findPost(postId);
    if ("missing" in found) {
      unavailable(res);
      return;
    }
    if ("error" in found) {
      serverError(res, found.error, "community-feed");
      return;
    }
    if (!found.row) {
      bad(res, "Post not found", 404);
      return;
    }
    if (!canManage(user, found.row.author_id)) {
      bad(res, "You can only attach files to your own posts.", 403);
      return;
    }
    const existing = await supabaseAdmin
      .from("community_feed_attachments")
      .select("id")
      .eq("post_id", postId);
    if (existing.error) {
      if (isMissingTable(existing.error)) {
        unavailable(res);
        return;
      }
      serverError(res, existing.error, "community-feed");
      return;
    }
    if ((existing.data ?? []).length >= MAX_FILES) {
      bad(res, "A post can have at most 4 files");
      return;
    }
    await ensureProfile(user);
    const attachmentId = randomUUID();
    let storagePath: string | null = null;
    let dataBase64: string | null = dataBase64Payload;
    if (isR2StorageActive()) {
      storagePath = `community/${postId}/${attachmentId}/${safeName}`;
      const reserved = await reserveStoragePath(user.id, storagePath, buffer.length, user);
      if (!reserved.ok) {
        if (reserved.reason === "quota") {
          bad(res, "Storage quota exceeded — free space on your profile or upgrade your plan.", 413);
        } else {
          unavailable(res);
        }
        return;
      }
      try {
        await r2Upload(storagePath, buffer, mime);
      } catch (err) {
        await releaseStoragePath(user.id, storagePath);
        serverError(res, err, "community-feed");
        return;
      }
    } else {
      dataBase64 = dataBase64Payload ?? buffer.toString("base64");
    }
    const { error } = await supabaseAdmin.from("community_feed_attachments").insert({
      id: attachmentId,
      post_id: postId,
      filename: safeName,
      content_type: mime,
      byte_size: buffer.length,
      storage_path: storagePath,
      data_base64: dataBase64,
      created_at: new Date().toISOString(),
    });
    if (error) {
      if (storagePath) {
        try {
          await r2Delete(storagePath);
          await releaseStoragePath(user.id, storagePath);
        } catch {
          /* the row was not saved; a leftover object is logged via serverError below */
        }
      }
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    noStore(res);
    res.status(201).json({
      attachment: {
        id: attachmentId,
        filename: safeName,
        contentType: mime,
        byteSize: buffer.length,
      },
    });
  }),
);

router.get(
  "/people/:userId",
  asyncHandler(async (req, res) => {
    let userId = param(req.params.userId);
    let viewerId: string | null = null;
    if (userId === "me") {
      const user = await getUserFromRequest(req);
      if (!user) {
        bad(res, "Sign in to view your profile.", 401);
        return;
      }
      await ensureProfile(user);
      userId = user.id;
      viewerId = user.id;
    } else if (!isUserId(userId)) {
      bad(res, "Profile not found", 404);
      return;
    } else {
      const viewer = await getUserFromRequest(req);
      viewerId = viewer?.id ?? null;
    }
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, username, plan, role, avatar_path")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      if (isMissingTable(error)) {
        noStore(res);
        res.json({ profile: null, posts: [], migrated: false });
        return;
      }
      serverError(res, error, "community-feed");
      return;
    }
    const profile = data as ProfileRow | null;
    if (!profile) {
      bad(res, "Profile not found", 404);
      return;
    }
    const loaded = await loadRecent(userId);
    if ("missing" in loaded) {
      noStore(res);
      res.json({
        profile: toAuthor(profile.id, profile),
        posts: [],
        migrated: false,
      });
      return;
    }
    if ("error" in loaded) {
      serverError(res, loaded.error, "community-feed");
      return;
    }
    const presented = await presentMany(loaded.rows.slice(0, PAGE_SIZE), viewerId);
    if ("missing" in presented) {
      noStore(res);
      res.json({ profile: toAuthor(profile.id, profile), posts: [], migrated: false });
      return;
    }
    if ("error" in presented) {
      serverError(res, presented.error, "community-feed");
      return;
    }
    noStore(res);
    res.json({
      profile: toAuthor(profile.id, profile),
      posts: presented.posts,
      migrated: true,
    });
  }),
);

export const communityFeedRouter = router;
export default router;
