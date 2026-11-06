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
  it("reads the pool constants", async () => {
    mockedFetch.mockResolvedValueOnce({
      dailyCreditPool: 4,
      aiMessageCost: 0,
    });

    await expect(getPublicConfig()).resolves.toEqual({
      dailyCreditPool: 4,
      aiMessageCost: 0,
      sectionMinTiers: {},
    });
    expect(mockedFetch).toHaveBeenCalledWith("/api/config");
  });

  it("falls back to the defaults when the payload is empty or mistyped", async () => {
    mockedFetch.mockResolvedValueOnce({});

    await expect(getPublicConfig()).resolves.toEqual(DEFAULT_PUBLIC_CONFIG);
  });

  it("passes owner-set section minimums through", async () => {
    mockedFetch.mockResolvedValueOnce({
      dailyCreditPool: 4,
      aiMessageCost: 0,
      sectionMinTiers: { pdfs: "owner" },
    });

    await expect(getPublicConfig()).resolves.toEqual({
      dailyCreditPool: 4,
      aiMessageCost: 0,
      sectionMinTiers: { pdfs: "owner" },
    });
  });

  it("falls back to the platform default when the config read fails", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("backend down"));

    await expect(getPublicConfig()).resolves.toEqual(DEFAULT_PUBLIC_CONFIG);
  });
});
