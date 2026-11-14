/**
 * Single allow-list for document/image uploads across storage API and community feed.
 * Profile avatars/covers use Sharp + image/* only (see profile-hub.controller).
 */

export type BinaryFileKind = "png" | "jpeg" | "pdf" | "ole" | "zip" | "txt";

export interface BinaryFileSpec {
  mime: string;
  kind: BinaryFileKind;
}

/** Extension → MIME + magic-byte classifier (community attachments + path fallback). */
export const BINARY_FILE_BY_EXTENSION: Record<string, BinaryFileSpec> = {
  png: { mime: "image/png", kind: "png" },
  jpg: { mime: "image/jpeg", kind: "jpeg" },
  jpeg: { mime: "image/jpeg", kind: "jpeg" },
  pdf: { mime: "application/pdf", kind: "pdf" },
  doc: { mime: "application/msword", kind: "ole" },
  xls: { mime: "application/vnd.ms-excel", kind: "ole" },
  ppt: { mime: "application/vnd.ms-powerpoint", kind: "ole" },
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    kind: "zip",
  },
  xlsx: {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    kind: "zip",
  },
  pptx: {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    kind: "zip",
  },
  txt: { mime: "text/plain", kind: "txt" },
};

export const COMMUNITY_ATTACHMENT_MAX_BYTES = 3 * 1024 * 1024;
export const STORAGE_API_UPLOAD_MAX_BYTES = 10 * 1024 * 1024;

/** Plus-tier generic object upload (`POST /api/storage/upload`). */
export const STORAGE_API_ALLOWED_MIMES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
] as const;

export type StorageApiMime = (typeof STORAGE_API_ALLOWED_MIMES)[number];

/** Client sends the original filename on raw-binary uploads. */
export const UPLOAD_FILENAME_HEADER = "x-upload-filename";

/** Raw generic storage upload (`path` lives in this header when body is the file). */
export const STORAGE_OBJECT_PATH_HEADER = "x-storage-path";

export function extensionOf(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export function specForFilename(filename: string): BinaryFileSpec | null {
  const spec = BINARY_FILE_BY_EXTENSION[extensionOf(filename)];
  return spec ?? null;
}

/**
 * Resolve a canonical MIME for community attachments and storage path fallback.
 * Empty or `application/octet-stream` defers to the filename extension.
 */
export function resolveUploadMime(filename: string, declaredContentType: string): string | null {
  const spec = specForFilename(filename);
  if (!spec) return null;
  const given = declaredContentType.trim().toLowerCase();
  if (!given || given === "application/octet-stream") return spec.mime;
  if (given === spec.mime) return spec.mime;
  if (given === "image/jpg" && spec.mime === "image/jpeg") return spec.mime;
  return null;
}

export function isStorageApiMime(mime: string): mime is StorageApiMime {
  return (STORAGE_API_ALLOWED_MIMES as readonly string[]).includes(mime);
}

/** When JSON upload declares a generic MIME, infer from the object path extension. */
export function resolveStorageApiMime(objectPath: string, declaredContentType: string): string | null {
  const given = declaredContentType.trim().toLowerCase();
  if (isStorageApiMime(given)) return given;
  const fromPath = resolveUploadMime(objectPath, given);
  if (fromPath && isStorageApiMime(fromPath)) return fromPath;
  if (given === "image/webp") return given;
  return null;
}

export function matchBinaryMagic(buf: Buffer, kind: BinaryFileKind): boolean {
  if (kind === "png") {
    return buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (kind === "jpeg") return buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  if (kind === "pdf") return buf.length >= 4 && buf.subarray(0, 4).toString("latin1") === "%PDF";
  if (kind === "ole") {
    return buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  }
  if (kind === "zip") {
    return (
      buf.length >= 4 &&
      buf[0] === 0x50 &&
      buf[1] === 0x4b &&
      (buf[2] === 0x03 || buf[2] === 0x05 || buf[2] === 0x07) &&
      (buf[3] === 0x04 || buf[3] === 0x06 || buf[3] === 0x08)
    );
  }
  const slice = buf.subarray(0, Math.min(buf.length, 8192));
  return !slice.includes(0);
}

export function sanitizeUploadFilename(raw: string): string | null {
  const name = raw.normalize("NFKC").replace(/^\uFEFF/, "").trim();
  if (!name || name.length > 180) return null;
  if (name.includes("..") || name.includes("/") || name.includes("\\") || name.includes("\0")) return null;
  if (name === "." || name.startsWith(".")) return null;
  const safe = name.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_");
  if (!safe || !safe.includes(".") || safe.startsWith(".") || safe.includes("..")) return null;
  return safe;
}

export function decodeBase64Upload(input: string): Buffer | null {
  const trimmed = input.trim();
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(trimmed)) return null;
  const buf = Buffer.from(trimmed, "base64");
  if (buf.length === 0) return null;
  return buf;
}