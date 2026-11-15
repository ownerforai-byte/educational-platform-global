/**
 * Profile avatar/cover pipeline — one live WebP per slot, no original retained.
 *
 * Input arrives as a bounded Buffer (stream-collected, max PROFILE_IMAGE_INPUT_MAX_BYTES).
 * Sharp decodes the full input in memory for resize/WebP encode; output buffers are small
 * and are streamed to R2 on upload.
 *
 * Adaptive quality aims for small files without ugly artifacts:
 *   avatar  ≤ 256×256,  target 30–80 KB,  hard cap 100 KB
 *   cover   ≤ 1200×400, target 100–200 KB, hard cap 300 KB
 *
 * Keys are versioned (`kind-<stamp>.webp`) so a replace can delete the previous
 * R2 object; only the current path stays referenced on the profile row.
 */
import sharp from "sharp";
import {
  ACCEPTED_IMAGE_FORMATS_LABEL,
  decodeBmpToRgba,
  detectImageFormat,
  UnsupportedBmpVariantError,
  UnsupportedImageFormatError,
} from "./profile-image-formats.js";

export type ProfileImageKind = "avatar" | "cover";

export const PROFILE_IMAGE_LIMITS = {
  avatar: {
    maxWidth: 256,
    maxHeight: 256,
    targetMinBytes: 30 * 1024,
    targetMaxBytes: 80 * 1024,
    hardCapBytes: 100 * 1024,
  },
  cover: {
    maxWidth: 1200,
    maxHeight: 400,
    targetMinBytes: 100 * 1024,
    targetMaxBytes: 200 * 1024,
    hardCapBytes: 300 * 1024,
  },
} as const;

/** Decoded upload ceiling before Sharp runs (JPEG/PNG phone photos). */
export const PROFILE_IMAGE_INPUT_MAX_BYTES = 8 * 1024 * 1024;

const AVATAR_QUALITIES = [74, 66, 58, 50, 42, 36] as const;
const COVER_QUALITIES = [72, 64, 56, 48, 40, 36] as const;

export class ProfileImageCapError extends Error {
  readonly code = "PROFILE_IMAGE_CAP";
  constructor(
    public readonly byteSize: number,
    public readonly cap: number,
  ) {
    super(`Processed image ${byteSize} bytes exceeds ${cap} byte cap`);
    this.name = "ProfileImageCapError";
  }
}

function isCapError(err: unknown): err is ProfileImageCapError {
  return err instanceof ProfileImageCapError;
}

export function isProfileImageCapError(err: unknown): boolean {
  if (isCapError(err)) return true;
  return Boolean(err && typeof err === "object" && (err as { code?: string }).code === "PROFILE_IMAGE_CAP");
}

/** True for the "send a different format" errors the route answers with 415. */
export function isUnsupportedImageFormatError(err: unknown): boolean {
  if (err instanceof UnsupportedImageFormatError || err instanceof UnsupportedBmpVariantError) return true;
  const code = err && typeof err === "object" ? (err as { code?: string }).code : undefined;
  return code === "UNSUPPORTED_IMAGE_FORMAT" || code === "UNSUPPORTED_BMP_VARIANT";
}

/**
 * Hand `sharp` something it can decode.
 *
 * Signature-first: an unknown payload is rejected before any decode attempt.
 * BMP (which this libvips build cannot read) is decoded here to raw RGBA.
 */
function sharpSource(input: Buffer): {
  source: Buffer;
  raw: { width: number; height: number; channels: 4 } | undefined;
} {
  const detected = detectImageFormat(input);
  if (!detected) throw new UnsupportedImageFormatError();
  if (detected.format !== "bmp") return { source: input, raw: undefined };
  const rgba = decodeBmpToRgba(input);
  return {
    source: rgba.data,
    raw: { width: rgba.width, height: rgba.height, channels: 4 },
  };
}

/**
 * Resize, strip EXIF/orientation, encode WebP. Never keeps a second size or
 * the original buffer — caller must drop `input` after this resolves.
 */
export async function processProfileImage(
  input: Buffer,
  kind: ProfileImageKind,
): Promise<{ buffer: Buffer; contentType: "image/webp"; byteSize: number }> {
  const spec = PROFILE_IMAGE_LIMITS[kind];
  const detected = detectImageFormat(input);
  const { source, raw } = sharpSource(input);
  const base = sharp(source, { failOn: "none", ...(raw ? { raw } : {}) })
    .rotate()
    .resize(spec.maxWidth, spec.maxHeight, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: true,
    });

  const qualities = kind === "avatar" ? AVATAR_QUALITIES : COVER_QUALITIES;
  let chosen: Buffer | null = null;
  try {
    for (const quality of qualities) {
      const buffer = await base
        .clone()
        .webp({ quality, effort: 6, smartSubsample: true })
        .toBuffer();
      chosen = buffer;
      if (buffer.length <= spec.targetMaxBytes) break;
    }
  } catch (err) {
    if (isUnsupportedImageFormatError(err)) throw err;
    // HEIC/HEIF from a phone: this libvips build has no HEVC decoder.
    if (detected?.format === "heic") {
      throw new UnsupportedImageFormatError(
        `HEIC/HEIF could not be decoded by this server — re-save it as ${ACCEPTED_IMAGE_FORMATS_LABEL.split(", ").slice(0, 3).join(", ")} and try again.`,
      );
    }
    throw err;
  }
  if (!chosen) {
    throw new Error("Could not encode profile image");
  }
  if (chosen.length > spec.hardCapBytes) {
    throw new ProfileImageCapError(chosen.length, spec.hardCapBytes);
  }
  return { buffer: chosen, contentType: "image/webp", byteSize: chosen.length };
}

/** Unique object key so a replacement can delete the previous R2 object. */
export function profileImagePath(
  userId: string,
  kind: ProfileImageKind,
  stamp: number = Date.now(),
): string {
  return `profiles/${userId}/${kind}-${stamp}.webp`;
}

/** Long-lived cache: keys are content-addressed by stamp, never overwritten. */
export const PROFILE_MEDIA_CACHE_CONTROL = "public, max-age=31536000, immutable";
