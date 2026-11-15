import { describe, expect, it } from "vitest";
import sharp from "sharp";
import {
  ACCEPTED_IMAGE_FORMATS_LABEL,
  decodeBmpToRgba,
  detectImageFormat,
  UnsupportedBmpVariantError,
  UnsupportedImageFormatError,
} from "../../src/services/profile-image-formats";

/** Minimal uncompressed BMP writer for the decoder tests. */
function bmp(
  width: number,
  height: number,
  bitCount: 8 | 24 | 32,
  { topDown = false, compression = 0 }: { topDown?: boolean; compression?: number } = {},
): Buffer {
  const bytesPerPixel = bitCount / 8;
  const rowSize = Math.ceil((width * bytesPerPixel) / 4) * 4;
  const pixels = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const at = y * rowSize + x * bytesPerPixel;
      if (bitCount === 8) pixels[at] = 1; // palette index 1
      else {
        pixels[at] = 0xcc; // B
        pixels[at + 1] = 0x88; // G
        pixels[at + 2] = 0x22; // R
        if (bitCount === 32) {
          const alphaAt = at + 3;
          pixels[alphaAt] = y === 0 ? 0 : 255;
        }
      }
    }
  }
  const palette = bitCount === 8 ? Buffer.concat([Buffer.alloc(4), Buffer.from([0xff, 0x88, 0x22, 0])]) : Buffer.alloc(0);
  const header = Buffer.alloc(54);
  header.write("BM", 0);
  header.writeUInt32LE(54 + palette.length + pixels.length, 2);
  header.writeUInt32LE(54 + palette.length, 10);
  header.writeUInt32LE(40, 14);
  header.writeInt32LE(width, 18);
  header.writeInt32LE(topDown ? -height : height, 22);
  header.writeUInt16LE(1, 26);
  header.writeUInt16LE(bitCount, 28);
  header.writeUInt32LE(compression, 30);
  header.writeUInt32LE(pixels.length, 34);
  if (bitCount === 8) header.writeUInt32LE(2, 46);
  return Buffer.concat([header, palette, pixels]);
}

describe("detectImageFormat", () => {
  it("identifies every accepted container from its leading bytes", async () => {
    const solid = sharp({ create: { width: 8, height: 8, channels: 3, background: "#123456" } });
    const cases: Array<[string, Buffer]> = [
      ["jpeg", await solid.clone().jpeg().toBuffer()],
      ["png", await solid.clone().png().toBuffer()],
      ["webp", await solid.clone().webp().toBuffer()],
      ["gif", await solid.clone().gif().toBuffer()],
      ["avif", await solid.clone().avif().toBuffer()],
      ["tiff", await solid.clone().tiff().toBuffer()],
      ["bmp", bmp(4, 4, 24)],
    ];
    for (const [format, buffer] of cases) {
      expect(detectImageFormat(buffer)?.format, format).toBe(format);
    }
  });

  it("trusts the bytes, not the file name or the declared type", () => {
    // A PNG payload that arrives named/claimed as a JPEG is still a PNG.
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13]);
    expect(detectImageFormat(png)?.mime).toBe("image/png");

    // A .jpg name over text bytes matches nothing.
    expect(detectImageFormat(Buffer.from("definitely not an image"))).toBeNull();
  });

  it("separates AVIF from HEIC inside the same ISO-BMFF container", () => {
    const box = (brand: string) =>
      Buffer.concat([
        Buffer.from([0, 0, 0, 0x18]),
        Buffer.from("ftyp", "latin1"),
        Buffer.from(brand, "latin1"),
        Buffer.alloc(8),
      ]);
    expect(detectImageFormat(box("avif"))?.format).toBe("avif");
    expect(detectImageFormat(box("heic"))?.format).toBe("heic");
    expect(detectImageFormat(box("mif1"))?.format).toBe("heic");
  });

  it("rejects a payload too short to identify", () => {
    expect(detectImageFormat(Buffer.from([0xff, 0xd8]))).toBeNull();
  });

  it("names the accepted formats in its error message", () => {
    expect(new UnsupportedImageFormatError().message).toContain(ACCEPTED_IMAGE_FORMATS_LABEL);
  });
});

describe("decodeBmpToRgba", () => {
  it("decodes 24-bit bottom-up rows into RGBA in the right order", () => {
    const image = decodeBmpToRgba(bmp(3, 2, 24));
    expect(image.width).toBe(3);
    expect(image.height).toBe(2);
    expect(image.channels).toBe(4);
    expect(image.data.length).toBe(3 * 2 * 4);
    // BGR #cc8822 → RGBA #22 88 cc ff
    expect([...image.data.subarray(0, 4)]).toEqual([0x22, 0x88, 0xcc, 0xff]);
  });

  it("honours a negative height (top-down) header", () => {
    const topDown = decodeBmpToRgba(bmp(2, 2, 24, { topDown: true }));
    expect(topDown.height).toBe(2);
    expect(topDown.data.length).toBe(2 * 2 * 4);
  });

  it("expands 8-bit paletted pixels", () => {
    const image = decodeBmpToRgba(bmp(2, 2, 8));
    expect([...image.data.subarray(0, 4)]).toEqual([0x22, 0x88, 0xff, 0xff]);
  });

  it("treats a zero 32-bit alpha byte as opaque", () => {
    const image = decodeBmpToRgba(bmp(2, 2, 32));
    expect(image.data[3]).toBe(255); // row 0 stored alpha 0 → forced opaque
  });

  it("rejects compressed and truncated files", () => {
    expect(() => decodeBmpToRgba(bmp(2, 2, 24, { compression: 1 }))).toThrow(UnsupportedBmpVariantError);
    expect(() => decodeBmpToRgba(bmp(2, 2, 24).subarray(0, 40))).toThrow(UnsupportedBmpVariantError);
    expect(() => decodeBmpToRgba(Buffer.from("BM"))).toThrow(UnsupportedBmpVariantError);
  });
});
