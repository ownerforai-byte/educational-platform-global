import { describe, expect, it, vi } from "vitest";

vi.mock("../supabase", () => ({
  getSupabaseAdmin: () => ({
    from: () => ({
      select: () => ({
        neq: () => ({
          limit: async () => ({ data: [], error: null }),
        }),
      }),
    }),
  }),
}));

describe("runDailyCreditsReset", () => {
  it("returns 0 when no stale profiles", async () => {
    const { runDailyCreditsReset } = await import("./resetCredits");
    expect(await runDailyCreditsReset(new Date("2026-11-13T00:00:00Z"))).toBe(0);
  });
});
