/**
 * Profile avatar/cover pipeline — 512² WebP avatars, 1600×500 WebP covers.
 */
import sharp from "sharp";

export type ProfileImageKind = "avatar" | "cover";

const AVATAR_SIZE = 512;
const COVER_WIDTH = 1600;
const COVER_HEIGHT = 500;
const WEBP_QUALITY = 82;

export async function processProfileImage(
  input: Buffer,
  kind: ProfileImageKind,
): Promise<{ buffer: Buffer; contentType: string }> {
  let pipeline = sharp(input).rotate();
  if (kind === "avatar") {
    pipeline = pipeline.resize(AVATAR_SIZE, AVATAR_SIZE, { fit: "cover", position: "centre" });
  } else {
    pipeline = pipeline.resize(COVER_WIDTH, COVER_HEIGHT, { fit: "cover", position: "centre" });
  }
  const buffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer();
  return { buffer, contentType: "image/webp" };
}

export function profileImagePath(userId: string, kind: ProfileImageKind): string {
  return `profiles/${userId}/${kind}.webp`;
}
