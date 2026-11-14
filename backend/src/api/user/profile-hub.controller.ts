import { Readable } from "node:stream";
import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../../db/supabase";
import { requireAuth, getUserFromRequest, type AuthedRequest } from "../../middleware/auth";
import { asyncHandler } from "../../middleware/asyncHandler";
import { serverError } from "../../middleware/error-handler";
import { isR2StorageActive, r2Download, r2Upload, r2Delete } from "../../storage/r2";
import { normalizeMediaObjectPath } from "../../storage/safe-object-path";
import {
  findProfileIdByUsername,
  getProfileById,
  updateProfileFields,
} from "../../db/repositories/user.repository.js";
import {
  compactProfileExtras,
  getStorageSnapshot,
  isCommunityStoragePath,
  listAbandonedProfilePaths,
  replaceReservedPath,
  releaseStoragePath,
  TIER_STORAGE_LIMITS,
} from "../../services/profile-storage";
import {
  isProfileImageCapError,
  processProfileImage,
  profileImagePath,
  PROFILE_IMAGE_INPUT_MAX_BYTES,
  PROFILE_MEDIA_CACHE_CONTROL,
} from "../../services/profile-image";
import { profileMediaPublicUrl } from "../../services/profile-media-url";
import type { SessionUser } from "../../auth/types";
import { PayloadTooLargeError, readBoundedRequestBody } from "../../http/bounded-body.js";

const router = Router();

const MIGRATION_MESSAGE =
  "Profile storage is unavailable until migration 019 is applied. From backend/, run: node scripts/migrate.mjs";

const USERNAME_RE = /^[a-z0-9][a-z0-9_-]{1,28}[a-z0-9]$/i;

type DbError = { message?: string; code?: string } | null;

interface ProfileRow {
  id: string;
  full_name: string | null;
  username: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  avatar_path: string | null;
  avatar_bytes: number | null;
  cover_path: string | null;
  cover_bytes: number | null;
  plan: string | null;
  role: string | null;
  profile_visibility: string | null;
  profile_extras: Record<string, unknown> | null;
  storage_used_bytes?: number | null;
  storage_limit_bytes?: number | null;
}

function isMissingTable(error: DbError): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache") ||
    msg.includes("column") && msg.includes("does not exist")
  );
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

function param(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return "";
}

function publicProfileFields(): string {
  return [
    "id",
    "full_name",
    "username",
    "bio",
    "location",
    "website",
    "avatar_path",
    "avatar_bytes",
    "cover_path",
    "cover_bytes",
    "plan",
    "role",
    "profile_visibility",
    "profile_extras",
  ].join(", ");
}

const imageUrl = profileMediaPublicUrl;

function presentProfile(row: ProfileRow, viewerId: string | null) {
  const extras = row.profile_extras && typeof row.profile_extras === "object" ? row.profile_extras : {};
  return {
    id: row.id,
    fullName: (row.full_name ?? "").trim() || "Student",
    username: row.username,
    bio: row.bio,
    location: row.location,
    website: row.website,
    plan: row.plan,
    role: row.role,
    visibility: row.profile_visibility ?? "public",
    avatarUrl: imageUrl(row.avatar_path),
    coverUrl: imageUrl(row.cover_path),
    extras,
    isYou: viewerId === row.id,
  };
}

async function resolveProfileKey(key: string): Promise<ProfileRow | null | "missing"> {
  const byUser = await supabaseAdmin
    .from("profiles")
    .select(publicProfileFields())
    .eq("username", key)
    .maybeSingle();
  if (byUser.error) {
    if (isMissingTable(byUser.error)) return "missing";
    throw byUser.error;
  }
  if (byUser.data) return byUser.data as unknown as ProfileRow;

  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRe.test(key)) return null;
  const byId = await supabaseAdmin
    .from("profiles")
    .select(publicProfileFields())
    .eq("id", key)
    .maybeSingle();
  if (byId.error) {
    if (isMissingTable(byId.error)) return "missing";
    throw byId.error;
  }
  return (byId.data as unknown as ProfileRow | null) ?? null;
}

function canViewProfile(
  profile: ProfileRow,
  viewer: SessionUser | null,
): boolean {
  const vis = (profile.profile_visibility ?? "public").toLowerCase();
  if (vis === "public") return true;
  if (!viewer) return false;
  if (viewer.id === profile.id) return true;
  if (vis === "members") return true;
  return false;
}

async function loadStats(userId: string): Promise<{
  posts: number;
  comments: number;
  likesReceived: number;
  filesShared: number;
  followers: number;
  following: number;
}> {
  const [posts, comments, postIds, followers, following] = await Promise.all([
    supabaseAdmin.from("community_feed_posts").select("id", { count: "exact", head: true }).eq("author_id", userId),
    supabaseAdmin.from("community_feed_comments").select("id", { count: "exact", head: true }).eq("author_id", userId),
    supabaseAdmin.from("community_feed_posts").select("id").eq("author_id", userId),
    supabaseAdmin.from("profile_follows").select("follower_id", { count: "exact", head: true }).eq("following_id", userId),
    supabaseAdmin.from("profile_follows").select("following_id", { count: "exact", head: true }).eq("follower_id", userId),
  ]);

  const ids = (postIds.data ?? []).map((r) => r.id as string);
  let likesReceived = 0;
  let filesShared = 0;
  if (ids.length > 0) {
    const [likes, files] = await Promise.all([
      supabaseAdmin.from("community_feed_likes").select("post_id", { count: "exact", head: true }).in("post_id", ids),
      supabaseAdmin.from("community_feed_attachments").select("id", { count: "exact", head: true }).in("post_id", ids),
    ]);
    likesReceived = likes.count ?? 0;
    filesShared = files.count ?? 0;
  }

  return {
    posts: posts.count ?? 0,
    comments: comments.count ?? 0,
    likesReceived,
    filesShared,
    followers: isMissingTable(followers.error) ? 0 : followers.count ?? 0,
    following: isMissingTable(following.error) ? 0 : following.count ?? 0,
  };
}

async function viewerFollowsTargets(
  viewerId: string | null,
  targetIds: string[],
): Promise<Set<string>> {
  const unique = [...new Set(targetIds)].filter((id) => id && id !== viewerId);
  if (!viewerId || unique.length === 0) return new Set();
  const { data, error } = await supabaseAdmin
    .from("profile_follows")
    .select("following_id")
    .eq("follower_id", viewerId)
    .in("following_id", unique);
  if (error) return new Set();
  return new Set((data ?? []).map((row) => row.following_id as string));
}

const extrasSchema = z
  .object({
    occupation: z.string().trim().max(120).optional(),
    education: z.string().trim().max(200).optional(),
    skills: z.string().trim().max(400).optional(),
    interests: z.string().trim().max(400).optional(),
    portfolio: z.string().trim().url().max(300).optional().or(z.literal("")),
    intro: z.string().trim().max(2000).optional(),
  })
  .partial();

const editSchema = z.object({
  fullName: z.string().trim().min(1).max(120).optional(),
  username: z.string().trim().min(3).max(30).optional(),
  bio: z.string().trim().max(2000).optional(),
  location: z.string().trim().max(120).optional(),
  website: z.string().trim().url().max(300).optional().or(z.literal("")),
  visibility: z.enum(["public", "members", "private"]).optional(),
  extras: extrasSchema.optional(),
});

const HUB_PROFILE_COLUMNS = [
  publicProfileFields(),
  "storage_used_bytes",
  "storage_limit_bytes",
].join(", ");

async function loadHubProfile(
  userId: string,
): Promise<{ row: ProfileRow | null; missing: boolean; error: { message: string } | null }> {
  const { data, error } = await getProfileById(userId, HUB_PROFILE_COLUMNS);
  if (error && isMissingTable(error) && !data) {
    return { row: null, missing: true, error };
  }
  if (!data) return { row: null, missing: false, error };
  return { row: data as unknown as ProfileRow, missing: false, error: null };
}

const PROFILE_IMAGE_CONTENT_TYPES = /^(image\/[\w.+-]+|application\/octet-stream)$/i;

router.get(
  "/media",
  asyncHandler(async (req, res) => {
    const raw = typeof req.query.path === "string" ? req.query.path : "";
    const key = normalizeMediaObjectPath(raw);
    if (!key) {
      bad(res, "Invalid or forbidden path", 400);
      return;
    }
    const publicBase = process.env.R2_PUBLIC_BASE_URL?.trim();
    if (publicBase) {
      res.setHeader("Cache-Control", PROFILE_MEDIA_CACHE_CONTROL);
      res.redirect(301, `${publicBase.replace(/\/+$/, "")}/${key}`);
      return;
    }
    if (!isR2StorageActive()) {
      bad(res, "Media storage is not configured", 503);
      return;
    }
    const downloaded = await r2Download(key);
    if (!downloaded) {
      bad(res, "Not found", 404);
      return;
    }
    res.setHeader("Cache-Control", PROFILE_MEDIA_CACHE_CONTROL);
    res.setHeader("Content-Type", downloaded.contentType);
    res.send(downloaded.buffer);
  }),
);

router.get(
  "/storage",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const snap = await getStorageSnapshot(user.id, user);
    if ("missing" in snap) {
      unavailable(res);
      return;
    }
    noStore(res);
    res.json({
      usedBytes: snap.usedBytes,
      limitBytes: snap.limitBytes,
      remainingBytes: snap.remainingBytes,
      unlimited: snap.unlimited,
      tierDefaults: TIER_STORAGE_LIMITS,
    });
  }),
);

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const loaded = await loadHubProfile(user.id);
    if (loaded.missing) {
      unavailable(res);
      return;
    }
    if (loaded.error && !loaded.row) {
      serverError(res, loaded.error, "profile-hub");
      return;
    }
    if (!loaded.row) {
      bad(res, "Profile not found", 404);
      return;
    }
    const stats = await loadStats(user.id);
    const snap = await getStorageSnapshot(user.id, user);
    noStore(res);
    res.json({
      profile: presentProfile(loaded.row, user.id),
      stats,
      storage: "missing" in snap ? null : snap,
    });
  }),
);

router.get(
  "/username-check",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const raw = (param(req.query.username) || param(req.query.q) || "").trim().toLowerCase();
    if (!raw) {
      bad(res, "Username is required");
      return;
    }
    if (!USERNAME_RE.test(raw)) {
      noStore(res);
      res.json({ available: false, reason: "invalid" });
      return;
    }
    const taken = await findProfileIdByUsername(raw, user.id);
    if (taken === "missing") {
      unavailable(res);
      return;
    }
    noStore(res);
    res.json({ available: !taken, reason: taken ? "taken" : "ok" });
  }),
);

router.patch(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const parsed = editSchema.safeParse(req.body);
    if (!parsed.success) {
      bad(res, "Invalid profile payload");
      return;
    }
    const patch: Record<string, unknown> = {};
    if (parsed.data.fullName !== undefined) patch.full_name = parsed.data.fullName;
    if (parsed.data.bio !== undefined) patch.bio = parsed.data.bio || null;
    if (parsed.data.location !== undefined) patch.location = parsed.data.location || null;
    if (parsed.data.website !== undefined) patch.website = parsed.data.website || null;
    if (parsed.data.visibility !== undefined) patch.profile_visibility = parsed.data.visibility;
    if (parsed.data.username !== undefined) {
      const name = parsed.data.username.toLowerCase();
      if (!USERNAME_RE.test(name)) {
        bad(res, "Username must be 3–30 characters: letters, numbers, _ or -");
        return;
      }
      const taken = await findProfileIdByUsername(name, user.id);
      if (taken === "missing") {
        unavailable(res);
        return;
      }
      if (taken) {
        bad(res, "That username is already taken");
        return;
      }
      patch.username = name;
    }
    if (parsed.data.extras !== undefined) {
      const current = await getProfileById(user.id, "profile_extras");
      const prev =
        current.data?.profile_extras && typeof current.data.profile_extras === "object"
          ? (current.data.profile_extras as Record<string, unknown>)
          : {};
      patch.profile_extras = compactProfileExtras(prev, parsed.data.extras);
    }
    if (Object.keys(patch).length === 0) {
      bad(res, "Nothing to update");
      return;
    }
    const { error } = await updateProfileFields(user.id, patch);
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "profile-hub");
      return;
    }
    const loaded = await loadHubProfile(user.id);
    if (!loaded.row) {
      serverError(res, loaded.error ?? { message: "read-after-write missed the profile" }, "profile-hub");
      return;
    }
    noStore(res);
    res.json({ profile: presentProfile(loaded.row, user.id) });
  }),
);

function decodeUploadedImage(req: Request): { ok: true; buffer: Buffer } | { ok: false; message: string; status: number } {
  if (Buffer.isBuffer(req.body)) {
    if (req.body.length === 0) return { ok: false, message: "Invalid image payload", status: 400 };
    return { ok: true, buffer: req.body };
  }
  if (req.is("application/json") || req.is("application/*+json")) {
    return {
      ok: false,
      message:
        "Profile images must be sent as raw binary (Content-Type image/* or application/octet-stream). JSON base64 uploads are not supported.",
      status: 415,
    };
  }
  if (req.body && typeof req.body === "object") {
    return {
      ok: false,
      message:
        "Profile images must be sent as raw binary (Content-Type image/* or application/octet-stream). JSON base64 uploads are not supported.",
      status: 415,
    };
  }
  return { ok: false, message: "Invalid image payload", status: 400 };
}

/**
 * Streams the request body with a byte cap into `req.body` as a Buffer.
 * Sharp still needs the full decoded input in memory, but that is bounded by
 * PROFILE_IMAGE_INPUT_MAX_BYTES; the final WebP written to R2 is streamed.
 */
function profileImageBody(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const header = typeof req.headers["content-type"] === "string" ? req.headers["content-type"] : "";
  const contentType = header.split(";")[0]?.trim().toLowerCase() ?? "";
  if (!contentType) {
    bad(res, "Content-Type is required (image/jpeg, image/png, image/webp, or application/octet-stream).", 415);
    return;
  }
  if (contentType === "application/json" || contentType.endsWith("+json")) {
    bad(
      res,
      "Profile images must be sent as raw binary (Content-Type image/* or application/octet-stream). JSON base64 uploads are not supported.",
      415,
    );
    return;
  }
  if (!PROFILE_IMAGE_CONTENT_TYPES.test(contentType)) {
    bad(
      res,
      "Unsupported Content-Type. Use image/jpeg, image/png, image/webp, or application/octet-stream.",
      415,
    );
    return;
  }
  void readBoundedRequestBody(req, PROFILE_IMAGE_INPUT_MAX_BYTES)
    .then((buffer) => {
      req.body = buffer;
      next();
    })
    .catch((err: unknown) => {
      if (err instanceof PayloadTooLargeError) {
        bad(res, "Invalid or oversized image payload", 413);
        return;
      }
      bad(res, "Invalid image payload", 400);
    });
}

async function purgeAbandonedProfileMedia(
  ownerId: string,
  livePaths: Array<string | null | undefined>,
): Promise<void> {
  const abandoned = await listAbandonedProfilePaths(ownerId, livePaths);
  for (const item of abandoned) {
    if (isCommunityStoragePath(item.path)) continue;
    if (item.refCount <= 1) {
      try {
        await r2Delete(item.path);
      } catch {
        /* best effort — DB release still drops the quota row */
      }
    }
    await releaseStoragePath(ownerId, item.path);
  }
}

async function uploadProfileImage(
  user: SessionUser,
  kind: "avatar" | "cover",
  raw: Buffer,
  res: Response,
): Promise<void> {
  if (!isR2StorageActive()) {
    bad(res, "Image storage is not configured on this server.", 503);
    return;
  }
  let processed: { buffer: Buffer; contentType: string };
  try {
    processed = await processProfileImage(raw, kind);
  } catch (err) {
    if (isProfileImageCapError(err)) {
      bad(res, "Image is too large after compression.", 413);
      return;
    }
    bad(res, "Could not process image — use a JPEG or PNG photo.");
    return;
  }
  const current = await getProfileById(user.id, "avatar_path, cover_path, avatar_bytes, cover_bytes");
  if (current.error && isMissingTable(current.error) && !current.data) {
    unavailable(res);
    return;
  }
  if (current.error && !current.data) {
    serverError(res, current.error, "profile-hub");
    return;
  }
  const path = profileImagePath(user.id, kind);
  const oldPath =
    kind === "avatar"
      ? (current.data?.avatar_path as string | null | undefined)
      : (current.data?.cover_path as string | null | undefined);
  const reserved = await replaceReservedPath(
    user.id,
    oldPath,
    path,
    processed.buffer.length,
    user,
  );
  if (!reserved.ok) {
    if (reserved.reason === "missing") unavailable(res);
    else bad(res, "Storage quota exceeded — delete files or upgrade your plan.", 413);
    return;
  }
  try {
    // Processed WebP is small (≤300 KB); stream avoids holding a second full copy during PUT.
    await r2Upload(path, Readable.from(processed.buffer), processed.contentType, {
      cacheControl: PROFILE_MEDIA_CACHE_CONTROL,
      contentLength: processed.buffer.length,
    });
  } catch (err) {
    await releaseStoragePath(user.id, path);
    serverError(res, err, "profile-hub");
    return;
  }
  const colPath = kind === "avatar" ? "avatar_path" : "cover_path";
  const colBytes = kind === "avatar" ? "avatar_bytes" : "cover_bytes";
  const { error } = await updateProfileFields(user.id, {
    [colPath]: path,
    [colBytes]: processed.buffer.length,
  });
  if (error) {
    try {
      await r2Delete(path);
    } catch {
      /* best effort — quota already reserved */
    }
    await releaseStoragePath(user.id, path);
    serverError(res, error, "profile-hub");
    return;
  }
  if (oldPath && oldPath !== path) {
    try {
      await r2Delete(oldPath);
    } catch {
      /* best effort */
    }
    await releaseStoragePath(user.id, oldPath);
  }
  const liveAvatar = kind === "avatar" ? path : (current.data?.avatar_path as string | null | undefined);
  const liveCover = kind === "cover" ? path : (current.data?.cover_path as string | null | undefined);
  try {
    await purgeAbandonedProfileMedia(user.id, [liveAvatar, liveCover]);
  } catch {
    /* best effort — live object is already committed */
  }
  const loaded = await loadHubProfile(user.id);
  if (!loaded.row) {
    serverError(res, loaded.error ?? { message: "read-after-write missed the profile" }, "profile-hub");
    return;
  }
  const snap = await getStorageSnapshot(user.id, user);
  noStore(res);
  res.json({
    profile: presentProfile(loaded.row, user.id),
    byteSize: processed.buffer.length,
    storage: "missing" in snap ? null : snap,
  });
}

router.post(
  "/me/avatar",
  requireAuth,
  profileImageBody,
  asyncHandler(async (req, res) => {
    const decoded = decodeUploadedImage(req);
    if (!decoded.ok) {
      bad(res, decoded.message, decoded.status);
      return;
    }
    await uploadProfileImage((req as AuthedRequest).user, "avatar", decoded.buffer, res);
  }),
);

router.post(
  "/me/cover",
  requireAuth,
  profileImageBody,
  asyncHandler(async (req, res) => {
    const decoded = decodeUploadedImage(req);
    if (!decoded.ok) {
      bad(res, decoded.message, decoded.status);
      return;
    }
    await uploadProfileImage((req as AuthedRequest).user, "cover", decoded.buffer, res);
  }),
);

async function userSearch(req: Request, res: Response): Promise<void> {
    const q = (param(req.query.q) || param(req.query.search) || "").trim().toLowerCase();
    if (q.length < 2) {
      bad(res, "Enter at least 2 characters to search");
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, username, avatar_path, plan, role")
      .or(`username.ilike.%${q}%,full_name.ilike.%${q}%`)
      .limit(20);
    if (error) {
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      serverError(res, error, "profile-hub");
      return;
    }
    noStore(res);
    res.json({
      users: (data ?? []).map((row) => ({
        id: row.id as string,
        fullName: (row.full_name as string | null)?.trim() || "Student",
        username: row.username as string | null,
        avatarUrl: imageUrl(row.avatar_path as string | null),
        plan: row.plan ?? null,
        role: row.role ?? null,
      })),
    });
}

router.get("/", asyncHandler(userSearch));

router.get(
  "/:username",
  asyncHandler(async (req, res) => {
    const key = param(req.params.username);
    const viewer = await getUserFromRequest(req);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    if (!canViewProfile(resolved, viewer)) {
      bad(res, "This profile is private", 403);
      return;
    }
    const stats = await loadStats(resolved.id);
    let following = false;
    if (viewer && viewer.id !== resolved.id) {
      const { data: edge } = await supabaseAdmin
        .from("profile_follows")
        .select("follower_id")
        .eq("follower_id", viewer.id)
        .eq("following_id", resolved.id)
        .maybeSingle();
      following = Boolean(edge);
    }
    noStore(res);
    res.json({
      profile: presentProfile(resolved, viewer?.id ?? null),
      stats,
      following,
      migrated: true,
    });
  }),
);

router.get(
  "/:username/about",
  asyncHandler(async (req, res) => {
    const key = param(req.params.username);
    const viewer = await getUserFromRequest(req);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    if (!canViewProfile(resolved, viewer)) {
      bad(res, "This profile is private", 403);
      return;
    }
    noStore(res);
    res.json({ profile: presentProfile(resolved, viewer?.id ?? null) });
  }),
);

router.get(
  "/:username/posts",
  asyncHandler(async (req, res) => {
    const key = param(req.params.username);
    const viewer = await getUserFromRequest(req);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    if (!canViewProfile(resolved, viewer)) {
      bad(res, "This profile is private", 403);
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("community_feed_posts")
      .select("id, title, body, category, created_at, updated_at")
      .eq("author_id", resolved.id)
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) {
      if (isMissingTable(error)) {
        noStore(res);
        res.json({ posts: [], migrated: false });
        return;
      }
      serverError(res, error, "profile-hub");
      return;
    }
    noStore(res);
    res.json({
      posts: (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        body: row.body,
        category: row.category,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      })),
      migrated: true,
    });
  }),
);

router.get(
  "/:username/files",
  asyncHandler(async (req, res) => {
    const key = param(req.params.username);
    const viewer = await getUserFromRequest(req);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    if (!canViewProfile(resolved, viewer)) {
      bad(res, "This profile is private", 403);
      return;
    }
    const posts = await supabaseAdmin
      .from("community_feed_posts")
      .select("id")
      .eq("author_id", resolved.id);
    const postIds = (posts.data ?? []).map((p) => p.id as string);
    if (postIds.length === 0) {
      noStore(res);
      res.json({ files: [], migrated: true });
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("community_feed_attachments")
      .select("id, post_id, filename, content_type, byte_size, created_at")
      .in("post_id", postIds)
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) {
      if (isMissingTable(error)) {
        noStore(res);
        res.json({ files: [], migrated: false });
        return;
      }
      serverError(res, error, "profile-hub");
      return;
    }
    noStore(res);
    res.json({
      files: (data ?? []).map((row) => ({
        id: row.id,
        postId: row.post_id,
        filename: row.filename,
        contentType: row.content_type,
        byteSize: row.byte_size,
        createdAt: row.created_at,
      })),
      migrated: true,
    });
  }),
);

router.get(
  "/:username/followers",
  asyncHandler(async (req, res) => {
    const key = param(req.params.username);
    const viewer = await getUserFromRequest(req);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("profile_follows")
      .select("follower_id, created_at")
      .eq("following_id", resolved.id)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) {
      if (isMissingTable(error)) {
        noStore(res);
        res.json({ users: [], migrated: false });
        return;
      }
      serverError(res, error, "profile-hub");
      return;
    }
    const ids = (data ?? []).map((r) => r.follower_id as string);
    const profiles =
      ids.length === 0
        ? []
        : (
            await supabaseAdmin
              .from("profiles")
              .select("id, full_name, username, avatar_path")
              .in("id", ids)
          ).data ?? [];
    const followSet = await viewerFollowsTargets(viewer?.id ?? null, profiles.map((p) => p.id as string));
    noStore(res);
    res.json({
      users: profiles.map((p) => ({
        id: p.id,
        fullName: (p.full_name as string | null)?.trim() || "Student",
        username: p.username,
        avatarUrl: imageUrl(p.avatar_path as string | null),
        followingByYou: followSet.has(p.id as string),
      })),
      migrated: true,
    });
  }),
);

router.get(
  "/:username/following",
  asyncHandler(async (req, res) => {
    const key = param(req.params.username);
    const viewer = await getUserFromRequest(req);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    const { data, error } = await supabaseAdmin
      .from("profile_follows")
      .select("following_id, created_at")
      .eq("follower_id", resolved.id)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) {
      if (isMissingTable(error)) {
        noStore(res);
        res.json({ users: [], migrated: false });
        return;
      }
      serverError(res, error, "profile-hub");
      return;
    }
    const ids = (data ?? []).map((r) => r.following_id as string);
    const profiles =
      ids.length === 0
        ? []
        : (
            await supabaseAdmin
              .from("profiles")
              .select("id, full_name, username, avatar_path")
              .in("id", ids)
          ).data ?? [];
    const followSet = await viewerFollowsTargets(viewer?.id ?? null, profiles.map((p) => p.id as string));
    noStore(res);
    res.json({
      users: profiles.map((p) => ({
        id: p.id,
        fullName: (p.full_name as string | null)?.trim() || "Student",
        username: p.username,
        avatarUrl: imageUrl(p.avatar_path as string | null),
        followingByYou: followSet.has(p.id as string),
      })),
      migrated: true,
    });
  }),
);

router.post(
  "/:username/follow",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const key = param(req.params.username);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    if (resolved.id === user.id) {
      bad(res, "You cannot follow yourself");
      return;
    }
    const { error } = await supabaseAdmin.from("profile_follows").insert({
      follower_id: user.id,
      following_id: resolved.id,
    });
    if (error) {
      const msg = (error.message ?? "").toLowerCase();
      if (isMissingTable(error)) {
        unavailable(res);
        return;
      }
      if (msg.includes("duplicate")) {
        noStore(res);
        res.json({ ok: true, following: true });
        return;
      }
      serverError(res, error, "profile-hub");
      return;
    }
    noStore(res);
    res.json({ ok: true, following: true });
  }),
);

router.delete(
  "/:username/follow",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const key = param(req.params.username);
    const resolved = await resolveProfileKey(key);
    if (resolved === "missing") {
      unavailable(res);
      return;
    }
    if (!resolved) {
      bad(res, "Profile not found", 404);
      return;
    }
    await supabaseAdmin
      .from("profile_follows")
      .delete()
      .eq("follower_id", user.id)
      .eq("following_id", resolved.id);
    noStore(res);
    res.json({ ok: true, following: false });
  }),
);

export default router;
