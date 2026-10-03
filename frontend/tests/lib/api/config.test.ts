import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api-client", () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from "@/lib/api-client";
import { DEFAULT_PUBLIC_CONFIG, getPublicConfig } from "@/lib/api/config";

const mockedFetch = vi.mocked(apiFetch);

beforeEach(() => {
  mockedFetch.mockReset();
});

describe("getPublicConfig", () => {
  it("reads free mode when the owner's coin gate is OFF", async () => {
    mockedFetch.mockResolvedValueOnce({
      coinGateEnabled: false,
      dailyCreditPool: 4,
      aiMessageCost: 1,
    });

    await expect(getPublicConfig()).resolves.toEqual({
      coinGateEnabled: false,
      dailyCreditPool: 4,
      aiMessageCost: 1,
    });
    expect(mockedFetch).toHaveBeenCalledWith("/api/config");
  });

  it("keeps the gate ON when the flag is missing or mistyped", async () => {
    mockedFetch.mockResolvedValueOnce({});

    await expect(getPublicConfig()).resolves.toEqual(DEFAULT_PUBLIC_CONFIG);
  });

  it("falls back to the platform default when the config read fails", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("backend down"));

    await expect(getPublicConfig()).resolves.toEqual(DEFAULT_PUBLIC_CONFIG);
  });
});
