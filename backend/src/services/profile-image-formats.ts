/**
 * Profile-image format sniffing + the one decoder `sharp` cannot do.
 *
 * Uploads are never trusted by filename or by the client's declared MIME type:
 * every payload is matched against real magic bytes first. The `sharp` build
 * used here decodes JPEG, PNG, WebP, GIF, AVIF, TIFF and HEIF, but NOT
 * uncompressed BMP, so BMP gets a small dependency-free decoder below and is
 * handed to `sharp` as raw RGBA.
 *
 * HEIC/HEIF note: `libvips` here ships an AV1-only HEIF codec, so HEVC-compressed
 * HEIC files can be rejected by the decoder even though AVIF works. Rather than
 * silently dropping those uploads, `processProfileImage` surfaces a typed
 * `UnsupportedImageFormatError` that the controller answers with 415 and a clear
 * "use JPG/PNG/WebP" message.
 */

export type DetectedImageFormat =
  | "jpeg"
  | "png"
  | "webp"
  | "gif"
  | "avif"
  | "heic"
  | "bmp"
  | "tiff";

export interface DetectedImage {
  format: DetectedImageFormat;
  mime: string;
}

const ISO_BMFF_BRANDS: Record<string, DetectedImageFormat> = {
  avif: "avif",
  avis: "avif",
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  hevx: "heic",
  mif1: "heic",
  msf1: "heic",
};

const MIME_BY_FORMAT: Record<DetectedImageFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  heic: "image/heic",
  bmp: "image/bmp",
  tiff: "image/tiff",
};

/** Human list for error messages — mirrors the accepted set exactly. */
export const ACCEPTED_IMAGE_FORMATS_LABEL =
  "JPEG, PNG, WebP, GIF, AVIF, HEIC/HEIF, BMP or TIFF";

/** Thrown when the bytes match no supported image format. */
export class UnsupportedImageFormatError extends Error {
  readonly code = "UNSUPPORTED_IMAGE_FORMAT";
  constructor(message = `Unsupported image format — use ${ACCEPTED_IMAGE_FORMATS_LABEL}.`) {
    super(message);
    this.name = "UnsupportedImageFormatError";
  }
}

/** Thrown when the bytes are a valid BMP variant this decoder does not cover. */
export class UnsupportedBmpVariantError extends Error {
  readonly code = "UNSUPPORTED_BMP_VARIANT";
  constructor(message = "This BMP variant is not supported — re-save it as PNG or JPG.") {
    super(message);
    this.name = "UnsupportedBmpVariantError";
  }
}

const startsWith = (buf: Buffer, bytes: number[], offset = 0): boolean => {
  if (buf.length < offset + bytes.length) return false;
  for (let i = 0; i < bytes.length; i += 1) {
    if (buf[offset + i] !== bytes[i]) return false;
  }
  return true;
};

/**
 * Identify the real format from the leading bytes. Returns `null` when the
 * payload is not an image this pipeline accepts.
 */
export function detectImageFormat(buffer: Buffer): DetectedImage | null {
  if (!buffer || buffer.length < 12) return null;

  if (startsWith(buffer, [0xff, 0xd8, 0xff])) return { format: "jpeg", mime: MIME_BY_FORMAT.jpeg };
  if (startsWith(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return { format: "png", mime: MIME_BY_FORMAT.png };
  }
  if (startsWith(buffer, [0x47, 0x49, 0x46, 0x38])) return { format: "gif", mime: MIME_BY_FORMAT.gif };
  if (startsWith(buffer, [0x42, 0x4d])) return { format: "bmp", mime: MIME_BY_FORMAT.bmp };
  if (startsWith(buffer, [0x49, 0x49, 0x2a, 0x00]) || startsWith(buffer, [0x4d, 0x4d, 0x00, 0x2a])) {
    return { format: "tiff", mime: MIME_BY_FORMAT.tiff };
  }
  // RIFF....WEBP
  if (startsWith(buffer, [0x52, 0x49, 0x46, 0x46]) && startsWith(buffer, [0x57, 0x45, 0x42, 0x50], 8)) {
    return { format: "webp", mime: MIME_BY_FORMAT.webp };
  }
  // ISO base media file format: 4-byte box size, "ftyp", then the brand.
  if (startsWith(buffer, [0x66, 0x74, 0x79, 0x70], 4)) {
    const brand = buffer.subarray(8, 12).toString("latin1").trim().toLowerCase();
    const format = ISO_BMFF_BRANDS[brand];
    if (format) return { format, mime: MIME_BY_FORMAT[format] };
    return null;
  }
  return null;
}

export interface RgbaImage {
  data: Buffer;
  width: number;
  height: number;
  channels: 4;
}

/**
 * Decode an uncompressed BMP to raw RGBA.
 *
 * Supports BI_RGB 24-bit and 32-bit true-colour and 8-bit paletted images, with
 * bottom-up (positive height) and top-down (negative height) row order and
 * 4-byte row padding. Compressed variants (RLE, BITFIELDS) are rejected.
 */
export function decodeBmpToRgba(buffer: Buffer): RgbaImage {
  if (buffer.length < 54 || !startsWith(buffer, [0x42, 0x4d])) {
    throw new UnsupportedBmpVariantError("Invalid BMP header.");
  }
  const dataOffset = buffer.readUInt32LE(10);
  const dibSize = buffer.readUInt32LE(14);
  if (dibSize < 40) throw new UnsupportedBmpVariantError();

  const width = buffer.readInt32LE(18);
  const rawHeight = buffer.readInt32LE(22);
  const bitCount = buffer.readUInt16LE(28);
  const compression = buffer.readUInt32LE(30);

  if (width <= 0 || rawHeight === 0) throw new UnsupportedBmpVariantError();
  if (compression !== 0) throw new UnsupportedBmpVariantError();
  if (bitCount !== 8 && bitCount !== 24 && bitCount !== 32) {
    throw new UnsupportedBmpVariantError();
  }

  const topDown = rawHeight < 0;
  const height = Math.abs(rawHeight);
  const bytesPerPixel = bitCount / 8;
  const rowSize = Math.ceil((width * bytesPerPixel) / 4) * 4;

  if (dataOffset + rowSize * height > buffer.length + rowSize) {
    throw new UnsupportedBmpVariantError("Truncated BMP pixel data.");
  }

  // 8-bit palette: BGRA quads directly after the DIB header.
  let palette: Buffer | null = null;
  if (bitCount === 8) {
    const coloursUsed = buffer.readUInt32LE(46) || 256;
    const paletteStart = 14 + dibSize;
    const paletteBytes = coloursUsed * 4;
    if (paletteStart + paletteBytes > buffer.length) {
      throw new UnsupportedBmpVariantError("Truncated BMP palette.");
    }
    palette = buffer.subarray(paletteStart, paletteStart + paletteBytes);
  }

  const out = Buffer.alloc(width * height * 4);
  const source = buffer.length;

  for (let y = 0; y < height; y += 1) {
    const sourceRow = topDown ? y : height - 1 - y;
    const rowStart = dataOffset + sourceRow * rowSize;
    if (rowStart + width * bytesPerPixel > source) {
      throw new UnsupportedBmpVariantError("Truncated BMP pixel data.");
    }
    for (let x = 0; x < width; x += 1) {
      const target = (y * width + x) * 4;
      if (bitCount === 8) {
        const index = buffer[rowStart + x] * 4;
        out[target] = palette![index + 2];
        out[target + 1] = palette![index + 1];
        out[target + 2] = palette![index];
        out[target + 3] = 255;
        continue;
      }
      const offset = rowStart + x * bytesPerPixel;
      out[target] = buffer[offset + 2];
      out[target + 1] = buffer[offset + 1];
      out[target + 2] = buffer[offset];
      // 32-bit BMPs carry a 4th byte that is often 0 even when fully opaque.
      out[target + 3] = bitCount === 32 ? buffer[offset + 3] || 255 : 255;
    }
  }

  return { data: out, width, height, channels: 4 };
}
