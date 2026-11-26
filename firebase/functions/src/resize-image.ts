import { onObjectFinalized } from "firebase-functions/v2/storage";
import { getStorage } from "firebase-admin/storage";
import { getApps, initializeApp } from "firebase-admin/app";
import { logger } from "firebase-functions";
import * as path from "path";

/**
 * Automatically resize user-uploaded profile images in Cloud Storage.
 * Triggered when a file is uploaded to `users/{uid}/profile/**`.
 *
 * Replaces the `firebase/storage-resize-images` extension (which requires
 * Blaze plan). Uses the Cloud Functions v2 runtime's built-in `sharp` via
 * lazy loading.
 *
 * Output: resized versions saved alongside the original with size suffixes:
 *   - `_200x200` (thumbnail)
 *   - `_400x400` (standard)
 *   - `_800x800` (high-res)
 */

const RESIZE_SIZES = [
  { width: 200, height: 200, suffix: "_200x200" },
  { width: 400, height: 400, suffix: "_400x400" },
  { width: 800, height: 800, suffix: "_800x800" },
] as const;

/** Marker metadata key to prevent infinite loops (resized outputs re-triggering). */
const RESIZED_META_KEY = "resizedBy";
const RESIZED_META_VALUE = "resizeProfileImage";

const IMAGE_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const resizeProfileImage = onObjectFinalized(
  {
    region: "asia-south1",
    memory: "512MiB",
    timeoutSeconds: 120,
  },
  async (event) => {
    const object = event.data;
    const filePath = object.name;
    const contentType = object.contentType;

    if (!filePath || !contentType) {
      logger.info("[resize] no file path or content type — skipping");
      return;
    }

    // Only process user profile images
    if (!filePath.match(/^users\/[^/]+\/profile\//)) {
      logger.info("[resize] not a profile image path — skipping", { filePath });
      return;
    }

    // Skip non-image files
    if (!IMAGE_CONTENT_TYPES.has(contentType)) {
      logger.info("[resize] not an image — skipping", { filePath, contentType });
      return;
    }

    // Skip already-resized files (prevent infinite loop)
    if (object.metadata?.[RESIZED_META_KEY] === RESIZED_META_VALUE) {
      logger.info("[resize] already resized — skipping", { filePath });
      return;
    }

    // Skip files with a size suffix in their name (extra guard)
    const baseName = path.basename(filePath, path.extname(filePath));
    if (RESIZE_SIZES.some((s) => baseName.endsWith(s.suffix))) {
      logger.info("[resize] file name has size suffix — skipping", { filePath });
      return;
    }

    if (getApps().length === 0) initializeApp();

    const bucket = getStorage().bucket(object.bucket);
    const file = bucket.file(filePath);

    // Download original image
    const [buffer] = await file.download();
    logger.info("[resize] downloaded original", {
      filePath,
      size: buffer.length,
    });

    // Dynamically import sharp (available in Cloud Functions v2 runtime)
    const sharp = (await import("sharp")).default;

    const dirName = path.dirname(filePath);
    const ext = path.extname(filePath);
    const nameWithoutExt = path.basename(filePath, ext);

    await Promise.all(
      RESIZE_SIZES.map(async ({ width, height, suffix }) => {
        const resizedBuffer = await sharp(buffer)
          .resize(width, height, {
            fit: "cover",
            withoutEnlargement: true,
          })
          .toFormat(contentType === "image/png" ? "png" : "jpeg", {
            quality: 85,
          })
          .toBuffer();

        const resizedPath = path.posix.join(
          dirName,
          `${nameWithoutExt}${suffix}${ext}`,
        );

        await bucket.file(resizedPath).save(resizedBuffer, {
          metadata: {
            contentType,
            metadata: {
              [RESIZED_META_KEY]: RESIZED_META_VALUE,
            },
          },
        });

        logger.info("[resize] saved resized image", {
          resizedPath,
          width,
          height,
          size: resizedBuffer.length,
        });
      }),
    );

    logger.info("[resize] done — all sizes generated", {
      filePath,
      sizes: RESIZE_SIZES.length,
    });
  },
);
