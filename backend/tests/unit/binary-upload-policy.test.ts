import { describe, expect, it } from "vitest";
import {
  COMMUNITY_ATTACHMENT_MAX_BYTES,
  matchBinaryMagic,
  resolveStorageApiMime,
  resolveUploadMime,
  STORAGE_API_UPLOAD_MAX_BYTES,
} from "../../src/storage/binary-upload-policy";

describe("binary-upload-policy", () => {
  it("resolves MIME from extension when the browser sends octet-stream", () => {
    expect(resolveUploadMime("scan.pdf", "application/octet-stream")).toBe("application/pdf");
    expect(resolveUploadMime("notes.docx", "")).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
  });

  it("rejects a MIME that does not match the extension", () => {
    expect(resolveUploadMime("a.png", "application/pdf")).toBeNull();
  });

  it("falls back storage API MIME from the object path", () => {
    expect(resolveStorageApiMime("materials/unit/notes.pdf", "application/octet-stream")).toBe(
      "application/pdf",
    );
    expect(resolveStorageApiMime("img.webp", "image/webp")).toBe("image/webp");
  });

  it("checks PNG magic bytes", () => {
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
    expect(matchBinaryMagic(png, "png")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("not-png"), "png")).toBe(false);
  });

  it("documents size caps", () => {
    expect(COMMUNITY_ATTACHMENT_MAX_BYTES).toBe(3 * 1024 * 1024);
    expect(STORAGE_API_UPLOAD_MAX_BYTES).toBe(10 * 1024 * 1024);
  });
});