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

  it("resolves audio and video MIME from extension", () => {
    expect(resolveUploadMime("clip.mp4", "application/octet-stream")).toBe("video/mp4");
    expect(resolveUploadMime("voice.m4a", "")).toBe("audio/mp4");
    expect(resolveUploadMime("take.wav", "audio/wav")).toBe("audio/wav");
    expect(resolveUploadMime("song.mp3", "audio/mpeg")).toBe("audio/mpeg");
    expect(resolveUploadMime("clip.webm", "video/webm")).toBe("video/webm");
  });

  it("accepts AV MIME in the storage API allow-list", () => {
    expect(resolveStorageApiMime("media/lesson.mp4", "application/octet-stream")).toBe("video/mp4");
    expect(resolveStorageApiMime("media/take.wav", "application/octet-stream")).toBe("audio/wav");
  });

  it("checks ISO-BMFF magic (MP4/MOV/M4A)", () => {
    const mp4 = Buffer.concat([
      Buffer.from([0x00, 0x00, 0x00, 0x18]),
      Buffer.from("ftyp", "latin1"),
      Buffer.from("isom"),
    ]);
    expect(matchBinaryMagic(mp4, "isom")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("not-video"), "isom")).toBe(false);
  });

  it("checks EBML magic (WebM/Weba)", () => {
    const webm = Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x00]);
    expect(matchBinaryMagic(webm, "webm")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("not-webm"), "webm")).toBe(false);
  });

  it("checks MP3, AAC, Ogg and WAV magic", () => {
    const mp3 = Buffer.from([0xff, 0xfb, 0x90, 0x00]);
    expect(matchBinaryMagic(mp3, "mp3")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("ID3title"), "mp3")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("no-sync"), "mp3")).toBe(false);

    const aac = Buffer.from([0xff, 0xf1, 0x50, 0x00]);
    expect(matchBinaryMagic(aac, "aac")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("not-aac"), "aac")).toBe(false);

    const ogg = Buffer.from("OggS");
    expect(matchBinaryMagic(ogg, "ogg")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("not-ogg"), "ogg")).toBe(false);

    const wav = Buffer.concat([
      Buffer.from("RIFF"),
      Buffer.from([0x24, 0x00, 0x00, 0x00]),
      Buffer.from("WAVEfmt "),
    ]);
    expect(matchBinaryMagic(wav, "wav")).toBe(true);
    expect(matchBinaryMagic(Buffer.from("RIFFnope!"), "wav")).toBe(false);
  });
});