import { describe, expect, it } from "vitest";
import sharp from "sharp";
import {
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

describe("profileImagePath", () => {
  it("versions keys so a replace can delete the previous object", () => {
    const uid = "11111111-1111-4111-8111-111111111111";
    expect(profileImagePath(uid, "avatar", 1)).toBe(`profiles/${uid}/avatar-1.webp`);
    expect(profileImagePath(uid, "cover", 2)).not.toBe(profileImagePath(uid, "cover", 3));
  });
});
