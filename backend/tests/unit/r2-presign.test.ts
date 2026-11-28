import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  process.env.R2_ACCOUNT_ID = "test-account";
  process.env.R2_BUCKET = "test-bucket";
  process.env.R2_ACCESS_KEY_ID = "test-access";
  process.env.R2_SECRET_ACCESS_KEY = "test-secret";
  return {
    getSignedUrl: vi.fn(async () => "https://r2.example.test/signed-upload"),
    send: vi.fn(),
  };
});

vi.mock("@aws-sdk/client-s3", () => ({
  S3: class S3 {
    send = mocks.send;
  },
  PutObjectCommand: class PutObjectCommand {
    constructor(public input: Record<string, unknown>) {}
  },
  GetObjectCommand: class GetObjectCommand {
    constructor(public input: Record<string, unknown>) {}
  },
  HeadObjectCommand: class HeadObjectCommand {
    constructor(public input: Record<string, unknown>) {}
  },
  DeleteObjectCommand: class DeleteObjectCommand {
    constructor(public input: Record<string, unknown>) {}
  },
}));

vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: mocks.getSignedUrl,
}));

import { r2PresignedPut } from "../../src/storage/r2.js";

describe("R2 presigned uploads", () => {
  beforeEach(() => {
    mocks.getSignedUrl.mockClear();
  });

  it("signs the declared content length and content type into the PUT", async () => {
    const url = await r2PresignedPut("community/post/file.png", "image/png", 600, 1234);

    expect(url).toBe("https://r2.example.test/signed-upload");
    const command = mocks.getSignedUrl.mock.calls[0][1] as { input: Record<string, unknown> };
    expect(command.input).toMatchObject({
      Bucket: "test-bucket",
      Key: "community/post/file.png",
      ContentType: "image/png",
      ContentLength: 1234,
    });
    expect(mocks.getSignedUrl.mock.calls[0][2]).toEqual({ expiresIn: 600 });
  });

  it.each([0, -1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER + 1])(
    "rejects invalid declared length %s before signing",
    async (contentLength) => {
      await expect(r2PresignedPut("community/post/file.png", "image/png", 600, contentLength))
        .rejects.toThrow("Invalid presigned upload content length");
      expect(mocks.getSignedUrl).not.toHaveBeenCalled();
    },
  );
});
