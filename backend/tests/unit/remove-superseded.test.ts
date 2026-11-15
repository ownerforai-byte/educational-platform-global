import { beforeEach, describe, expect, it, vi } from "vitest";

const r2Delete = vi.fn();
const releaseStoragePath = vi.fn();

vi.mock("../../src/storage/r2", () => ({
  r2Delete: (...args: unknown[]) => r2Delete(...args),
}));

vi.mock("../../src/services/profile-storage", () => ({
  releaseStoragePath: (...args: unknown[]) => releaseStoragePath(...args),
}));

describe("removeSupersededObject", () => {
  beforeEach(() => {
    r2Delete.mockReset();
    releaseStoragePath.mockReset();
  });

  it("no-ops when old path is empty", async () => {
    const { removeSupersededObject } = await import("../../src/storage/remove-superseded");
    await removeSupersededObject("u1", null);
    await removeSupersededObject("u1", "");
    expect(r2Delete).not.toHaveBeenCalled();
    expect(releaseStoragePath).not.toHaveBeenCalled();
  });

  it("no-ops when old and new paths match", async () => {
    const { removeSupersededObject } = await import("../../src/storage/remove-superseded");
    await removeSupersededObject("u1", "profiles/u1/avatar-1.webp", "profiles/u1/avatar-1.webp");
    expect(r2Delete).not.toHaveBeenCalled();
  });

  it("deletes R2 and releases quota for a replaced path", async () => {
    const { removeSupersededObject } = await import("../../src/storage/remove-superseded");
    await removeSupersededObject("u1", "profiles/u1/avatar-1.webp", "profiles/u1/avatar-2.webp");
    expect(r2Delete).toHaveBeenCalledWith("profiles/u1/avatar-1.webp");
    expect(releaseStoragePath).toHaveBeenCalledWith("u1", "profiles/u1/avatar-1.webp");
  });
});