/**
 * Cloudflare R2 — parallel OVERFLOW layer next to Supabase Storage.
 *
 * Design (owner 2026-10-24): Supabase Storage stays the PRIMARY store and is
 * used first. This layer is a BACKUP that activates only two ways:
 *
 *   1. R2 is configured (all three R2_* env vars set) AND a Supabase upload
 *      fails with a storage-limit/quota error → the same file is written to
 *      R2 and the response carries an R2 URL.
 *   2. Nothing here ever PRE-EMPTS Supabase: when Supabase has room, data
 *      goes there, exactly as before. No data is seeded into R2 ahead of
 *      time (owner requirement: "don't put any data in it yet").
 *
 * Why R2: R2's 10 GiB free tier
 * carries NO egress fees, so overflow files are free to *serve* too —
 * important for a public study platform. No credit expiry, no billing
 * account. When the account outgrows 10 GiB the overage bills per Cloud
 * (Flare) usage rather than pausing — the dashboard should watch the /health
 * endpoint so the human can see that before it matters.
 *
 * R2 speaks the S3 wire protocol, so the AWS S3 SDK is used with
 * forcePathStyle + a custom endpoint. No S3-specific quirks leak in.
 *
 * When the R2_* vars are unset, every function here is a no-op
 * (active === false) and the backend behaves byte-for-byte as it did before
 * this file existed.
 */
import {
  S3,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { supabaseAdmin } from "../db/supabase";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID?.trim() ?? "";
const BUCKET_NAME = process.env.R2_BUCKET?.trim() ?? "";
const ACCESS_KEY = process.env.R2_ACCESS_KEY_ID?.trim() ?? "";
const SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY?.trim() ?? "";
const PUBLIC_BASE = process.env.R2_PUBLIC_BASE_URL?.trim() ?? "";

function endpoint(): string {
  // Cloudflare's S3-compatible endpoint for R2:
  //   https://<account-id>.r2.cloudflarestorage.com
  return `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;
}

/**
 * All four core vars are required; the public base URL is optional (used to
 * build a clean shareable URL; when absent, fall back to a signed URL).
 */
export function isR2StorageActive(): boolean {
  return (
    ACCOUNT_ID.length > 0 &&
    BUCKET_NAME.length > 0 &&
    ACCESS_KEY.length > 0 &&
    SECRET_KEY.length > 0
  );
}

let client: S3 | null = null;

function r2Client(): S3 {
  if (!client) {
    client = new S3({
      region: "auto",
      endpoint: endpoint(),
      forcePathStyle: true,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
      },
    });
  }
  return client;
}

/**
 * Upload to R2 (overflow only — called after Supabase has failed).
 * Supabase bucket paths already carry the folder structure (e.g.
 * "class-11/physics/unit-3/notes.pdf"); it is mirrored verbatim in the
 * bucket so both stores stay path-compatible. Upload paths are already
 * validated by the route (PATH_REGEX) before they reach here.
 */
export async function r2Upload(
  path: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ url: string }> {
  if (!isR2StorageActive()) {
    throw new Error("R2 storage is not configured");
  }
  const key = path.replace(/^\/+/, "");
  await r2Client().send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=86400",
    }),
  );

  // Clean shareable URL when a public base (custom domain / R2 public bucket)
  // is configured; otherwise a 7-day signed GET URL.
  if (PUBLIC_BASE) {
    return {
      url: `${PUBLIC_BASE.replace(/\/+$/, "")}/${key}`,
    };
  }
  const signed = await getSignedUrl(
    r2Client(),
    new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
    { expiresIn: 7 * 24 * 60 * 60 },
  );
  return { url: signed };
}

/** True when overflow URLs are permanent (a public R2 base is configured). */
export function hasR2PublicBase(): boolean {
  return PUBLIC_BASE.length > 0;
}

/** Buckets the storage health report walks. */
const USAGE_BUCKETS = ["resources", "educational-materials"] as const;

/** Bounds so a huge bucket can never turn a health check into a long crawl. */
const USAGE_PAGE_SIZE = 100;
const USAGE_MAX_PAGES_PER_FOLDER = 20;
const USAGE_MAX_DEPTH = 6;

export interface BucketUsage {
  id: string;
  /** True when the bucket could be listed at all. */
  available: boolean;
  objects: number;
  bytes: number;
  /** True when a bound was hit, so the totals are a floor, not the exact size. */
  partial: boolean;
  error?: string;
}

export interface StorageUsage {
  available: boolean;
  size: number;
  objects: number;
  buckets: BucketUsage[];
}

/**
 * Measure one bucket by walking its folders through Storage's own list API.
 *
 * This replaces a call to `/storage/v1/size`, an endpoint that does not exist
 * (verified 404 on the live project), so the old probe returned null forever:
 * the "about to run out of storage" warning could never fire and the first
 * sign of trouble was a failed upload. Supabase documents no per-project
 * usage endpoint for a service-role key, so reading the objects is the honest
 * way to report what is stored.
 */
async function measureBucket(id: string): Promise<BucketUsage> {
  let objects = 0;
  let bytes = 0;
  let partial = false;

  const walk = async (prefix: string, depth: number): Promise<void> => {
    if (depth > USAGE_MAX_DEPTH) {
      partial = true;
      return;
    }
    for (let page = 0; page < USAGE_MAX_PAGES_PER_FOLDER; page += 1) {
      const { data, error } = await supabaseAdmin.storage.from(id).list(prefix, {
        limit: USAGE_PAGE_SIZE,
        offset: page * USAGE_PAGE_SIZE,
      });
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) return;

      for (const entry of data) {
        // Supabase marks a folder with a null id — recurse into it instead of
        // counting it as a file (a folder carries no byte size of its own).
        if (entry.id === null) {
          if (entry.name === ".emptyFolderPlaceholder") continue;
          await walk(prefix ? `${prefix}/${entry.name}` : entry.name, depth + 1);
          continue;
        }
        objects += 1;
        const size = Number((entry.metadata as { size?: number | string } | null)?.size ?? 0);
        if (Number.isFinite(size) && size > 0) bytes += size;
      }

      if (data.length < USAGE_PAGE_SIZE) return;
    }
    partial = true;
  };

  try {
    await walk("", 0);
    return { id, available: true, objects, bytes, partial };
  } catch (err) {
    return {
      id,
      available: false,
      objects: 0,
      bytes: 0,
      partial: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Real storage usage for the owner storage report (per-bucket + totals).
 * Never throws: an unreadable bucket is reported as unavailable so the report
 * stays honest instead of claiming zero usage.
 */
export async function supabaseStorageHealth(): Promise<StorageUsage> {
  const buckets = await Promise.all(USAGE_BUCKETS.map((id) => measureBucket(id)));
  const readable = buckets.filter((bucket) => bucket.available);
  return {
    available: readable.length > 0,
    size: readable.reduce((sum, bucket) => sum + bucket.bytes, 0),
    objects: readable.reduce((sum, bucket) => sum + bucket.objects, 0),
    buckets,
  };
}

/** True when a Supabase upload error looks like a storage quota/limit. */
export function looksLikeSupabaseStorageLimit(error: unknown): boolean {
  const msg =
    typeof error === "string"
      ? error
      : ((error as { message?: string })?.message ?? "");
  return /storage.?limit|quota|exceeded.?storage|capacity/i.test(msg);
}
