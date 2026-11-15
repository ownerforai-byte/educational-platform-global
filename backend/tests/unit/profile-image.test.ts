import { describe, expect, it } from "vitest";
import sharp from "sharp";
import {
  isUnsupportedImageFormatError,
  processProfileImage,
  profileImagePath,
  PROFILE_IMAGE_LIMITS,
} from "../../src/services/profile-image";

async function solidPng(width: number, height: number, r = 40, g = 80, b = 160): Promise<Buffer> {
  return sharp({
    create: { width, height, channels: 3, background: { r, g, b } },
  })
    .png()
    .toBuffer();
}

async function noisyJpeg(width: number, height: number): Promise<Buffer> {
  const raw = Buffer.alloc(width * height * 3);
  for (let i = 0; i < raw.length; i += 1) raw[i] = (i * 37 + 11) % 256;
  return sharp(raw, { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 95 })
    .toBuffer();
}

describe("processProfileImage", () => {
  it("caps avatars at 256×256 WebP under the hard byte cap", async () => {
    const input = await noisyJpeg(1200, 1200);
    const out = await processProfileImage(input, "avatar");
    const meta = await sharp(out.buffer).metadata();
    expect(meta.format).toBe("webp");
    expect(meta.width).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.avatar.maxWidth);
    expect(meta.height).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.avatar.maxHeight);
    expect(out.buffer.length).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.avatar.hardCapBytes);
    expect(out.contentType).toBe("image/webp");
  });

  it("caps covers at 1200×400 WebP under the hard byte cap", async () => {
    const input = await noisyJpeg(2400, 1600);
    const out = await processProfileImage(input, "cover");
    const meta = await sharp(out.buffer).metadata();
    expect(meta.format).toBe("webp");
    expect(meta.width).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.cover.maxWidth);
    expect(meta.height).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.cover.maxHeight);
    expect(out.buffer.length).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.cover.hardCapBytes);
  });

  it("does not enlarge a small avatar", async () => {
    const input = await solidPng(64, 64);
    const out = await processProfileImage(input, "avatar");
    const meta = await sharp(out.buffer).metadata();
    expect(meta.width).toBeLessThanOrEqual(64);
    expect(meta.height).toBeLessThanOrEqual(64);
    expect(out.buffer.length).toBeLessThan(20 * 1024);
  });

  it("strips EXIF from the encoded WebP", async () => {
    const jpeg = await sharp({
      create: { width: 400, height: 400, channels: 3, background: { r: 12, g: 24, b: 48 } },
    })
      .jpeg()
      .withMetadata({
        exif: {
          IFD0: { Copyright: "secret-photographer" },
        },
      })
      .toBuffer();
    const before = await sharp(jpeg).metadata();
    expect(before.exif || before.icc || before.xmp).toBeTruthy();

    const out = await processProfileImage(jpeg, "avatar");
    const after = await sharp(out.buffer).metadata();
    expect(after.exif).toBeUndefined();
    expect(after.orientation).toBeUndefined();
  });
});

describe("processProfileImage — every accepted format", () => {
  const solid = () =>
    sharp({ create: { width: 300, height: 300, channels: 3, background: "#2c7be5" } });

  // One live WebP per slot regardless of what the owner uploaded.
  const formats: Array<[string, () => Promise<Buffer>]> = [
    ["jpeg", () => solid().jpeg().toBuffer()],
    ["png", () => solid().png().toBuffer()],
    ["webp", () => solid().webp().toBuffer()],
    ["gif", () => solid().gif().toBuffer()],
    ["avif", () => solid().avif().toBuffer()],
    ["tiff", () => solid().tiff().toBuffer()],
    [
      "bmp",
      async () => {
        // 24-bit uncompressed, single flat colour, bottom-up.
        const width = 8;
        const height = 8;
        const rowSize = Math.ceil((width * 3) / 4) * 4;
        const pixels = Buffer.alloc(rowSize * height, 0x7b);
        const header = Buffer.alloc(54);
        header.write("BM", 0);
        header.writeUInt32LE(54 + pixels.length, 2);
        header.writeUInt32LE(54, 10);
        header.writeUInt32LE(40, 14);
        header.writeInt32LE(width, 18);
        header.writeInt32LE(height, 22);
        header.writeUInt16LE(1, 26);
        header.writeUInt16LE(24, 28);
        header.writeUInt32LE(pixels.length, 34);
        return Buffer.concat([header, pixels]);
      },
    ],
  ];

  for (const [name, make] of formats) {
    it(`produces a capped WebP from a ${name} upload`, async () => {
      const out = await processProfileImage(await make(), "avatar");
      const meta = await sharp(out.buffer).metadata();
      expect(meta.format).toBe("webp");
      expect(meta.width).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.avatar.maxWidth);
      expect(out.buffer.length).toBeLessThanOrEqual(PROFILE_IMAGE_LIMITS.avatar.hardCapBytes);
    });
  }

  it("keeps only the first frame of an animated GIF", async () => {
    const animated = await sharp({ create: { width: 40, height: 40, channels: 3, background: "#000" } })
      .gif()
      .toBuffer();
    const out = await processProfileImage(Buffer.concat([animated, animated]), "avatar");
    expect((await sharp(out.buffer).metadata()).format).toBe("webp");
  });

  it("rejects bytes that are not an image with a 415-style error", async () => {
    await expect(processProfileImage(Buffer.from("not an image at all"), "avatar")).rejects.toThrow();
    try {
      await processProfileImage(Buffer.from("not an image at all"), "avatar");
    } catch (err) {
      expect(isUnsupportedImageFormatError(err)).toBe(true);
    }
  });
});

describe("profileImagePath", () => {
  it("versions keys so a replace can delete the previous object", () => {
    const uid = "11111111-1111-4111-8111-111111111111";
    expect(profileImagePath(uid, "avatar", 1)).toBe(`profiles/${uid}/avatar-1.webp`);
    expect(profileImagePath(uid, "cover", 2)).not.toBe(profileImagePath(uid, "cover", 3));
  });
});
