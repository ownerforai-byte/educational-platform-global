/**
 * Azure Blob Storage — parallel overflow layer next to Supabase Storage.
 *
 * Design (owner 2026-10-21): Supabase Storage stays the PRIMARY store and is
 * used first. This layer is a BACKUP that activates only two ways:
 *
 *   1. Azure is configured (AZURE_STORAGE_CONNECTION_STRING set) AND a
 *      Supabase upload fails with a storage-limit/quota error → the same file
 *      is written to Azure and the response carries an Azure URL.
 *   2. Nothing here ever PRE-EMPTS Supabase: when Supabase has room, data
 *      goes there, exactly as before. No data is seeded into Azure ahead of
 *      time (owner requirement: "don't put any data in it yet").
 *
 * The $200 student credit (expires 2026-11-20) pays Azure usage, not
 * Supabase — so after the credit lapses the account pauses (no card charge)
 * and Supabase remains the only active store until a payment method is
 * added.
 *
 * When AZURE_STORAGE_CONNECTION_STRING is unset, every function here is a
 * no-op (active === false) and the backend behaves byte-for-byte as it did
 * before this file existed.
 */
import {
  BlobServiceClient,
  BlobSASPermissions,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";

const RAW_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING?.trim();
const CONNECTION_STRING = RAW_CONNECTION_STRING?.length ? RAW_CONNECTION_STRING : "";
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER?.trim() || "resources";

/** Whether the Azure overflow layer is configured at all. */
export function isAzureStorageActive(): boolean {
  return CONNECTION_STRING.length > 0;
}

let service: BlobServiceClient | null = null;

function getService(): BlobServiceClient {
  if (!service) {
    service = BlobServiceClient.fromConnectionString(CONNECTION_STRING);
  }
  return service;
}

function sharedKeyCredential(): StorageSharedKeyCredential {
  // fromConnectionString() already builds a StorageSharedKeyCredential
  // from the account key; the service client keeps it on `.credential`.
  const credential = getService().credential;
  if (!(credential instanceof StorageSharedKeyCredential)) {
    throw new Error("Azure storage credential is not key-based");
  }
  return credential;
}

/**
 * Upload to Azure (overflow only — called after Supabase has failed).
 * `publicAccess` controls who can read the blob:
 *  - "container" (default): URL is the blob's account URL. The container
 *    should be created with public-blob access in the portal so the URL is
 *    shareable like the Supabase public bucket.
 *  - "sas": a 24-hour signed read URL (works even on a private container).
 *
 * Supabase bucket paths already carry the folder structure (e.g.
 * "class-11/physics/unit-3/notes.pdf"); it is mirrored verbatim in the
 * container so both stores stay path-compatible. Upload paths are already
 * validated by the route (PATH_REGEX) before they reach here.
 */
export async function azureUpload(
  path: string,
  buffer: Buffer,
  contentType: string,
  publicAccess: "container" | "sas" = "container",
): Promise<{ url: string }> {
  if (!isAzureStorageActive()) {
    throw new Error("Azure storage is not configured");
  }
  const blob = getService()
    .getContainerClient(CONTAINER_NAME)
    .getBlockBlobClient(path);

  await blob.uploadData(buffer, {
    blobHTTPHeaders: {
      blobContentType: contentType,
      blobCacheControl: "public, max-age=86400",
    },
  });

  if (publicAccess === "sas") {
    const sas = generateBlobSASQueryParameters(
      {
        containerName: CONTAINER_NAME,
        blobName: path,
        expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000),
        permissions: BlobSASPermissions.from({ read: true }),
      },
      sharedKeyCredential(),
    );
    return {
      url: `${getService().url}${CONTAINER_NAME}/${path}?${sas.toString()}`,
    };
  }
  return {
    url: `${getService().url}${CONTAINER_NAME}/${path}`,
  };
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
