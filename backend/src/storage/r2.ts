/**
 * Cloudflare R2 — Tier 3 primary object store (free-tier policy).
 *
 * All binary uploads (PDFs, images, AV) go to R2. Supabase Storage is no
 * longer used for new uploads; `supabaseStorageHealth` remains for the
 * owner health report over legacy buckets.
 *
 * Why R2: 10 GiB free with no egress fees — important for a public study
 * platform. R2 speaks the S3 wire protocol via the AWS SDK
 * (`forcePathStyle` + custom endpoint).
 *
 * When the R2_* vars are unset, every function here is a no-op
 * (`active === false`) and uploads fail closed (router requires R2).
 */
import {
  S3,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { supabaseAdmin } from "../db/supabase";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID?.trim() ?? "";
const BUCKET_NAME = process.env.R2_BUCKET?.trim() ?? "";
const ACCESS_KEY = process.env.R2_ACCESS_KEY_ID?.trim() ?? "";
const SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY?.trim() ?? "";
const PUBLIC_BASE = process.env.R2_PUBLIC_BASE_URL?.trim() ?? "";

function endpoint(): string {
  return `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;
}

/**
 * All four core vars are required; the public base URL is optional (used to
 * build a clean shareable URL; when absent, fall back to a signed URL).
 */
export function isR2StorageActive(): boolean {
  return Boolean(ACCOUNT_ID && BUCKET_NAME && ACCESS_KEY && SECRET_KEY);
}

let client: S3 | null = null;

function r2Client(): S3 {
  if (!client) {
    client = new S3({
      region: "auto",
      endpoint: endpoint(),
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
      },
      forcePathStyle: true,
    });
  }
  return client;
}

export async function r2Upload(
  path: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ url: string }> {
  if (!isR2StorageActive()) {
    throw new Error("R2 is not configured");
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

/** Read an object back. Returns null when R2 is off or the key is missing. */
export async function r2Download(
  path: string,
): Promise<{ buffer: Buffer; contentType: string } | null> {
  if (!isR2StorageActive()) return null;
  const key = path.replace(/^\/+/, "");
  const out = await r2Client().send(
    new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
  );
  const bytes = await out.Body?.transformToByteArray();
  if (!bytes) return null;
  return {
    buffer: Buffer.from(bytes),
    contentType: out.ContentType || "application/octet-stream",
  };
}

/** Best-effort delete. Missing keys are ignored by the caller. */
export async function r2Delete(path: string): Promise<void> {
  if (!isR2StorageActive()) return;
  const key = path.replace(/^\/+/, "");
  await r2Client().send(
    new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
  );
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
