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
 * Why R2 (vs the earlier Firebase/Azure attempts): R2's 10 GiB free tier
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

/**
 * Best-effort check of whether Supabase still has room. Supabase exposes a
 * per-project storage size endpoint (used by its own dashboard). Returns
 * null when the check cannot be made (endpoint down, auth shape change) —
 * the overflow path in the route is the real trigger; this is observability.
 */
export async function supabaseStorageHealth(): Promise<{
  size: number;
  quota: number;
  percentUsed: number;
} | null> {
  try {
    const url = process.env.SUPABASE_URL?.trim();
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!url || !key) return null;
    const res = await fetch(`${url.replace(/\/+$/, "")}/storage/v1/size`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { size?: number; quota?: number };
    if (typeof data.size !== "number" || typeof data.quota !== "number") return null;
    const percentUsed = data.quota > 0 ? Math.min(100, (data.size / data.quota) * 100) : 0;
    return { size: data.size, quota: data.quota, percentUsed };
  } catch {
    return null;
  }
}

/** True when a Supabase upload error looks like a storage quota/limit. */
export function looksLikeSupabaseStorageLimit(error: unknown): boolean {
  const msg =
    typeof error === "string"
      ? error
      : ((error as { message?: string })?.message ?? "");
  return /storage.?limit|quota|exceeded.?storage|capacity/i.test(msg);
}
