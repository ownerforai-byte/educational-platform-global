// @vitest-environment node
import { afterEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/formula-sheet", () => ({
  isFormulaSubjectSlug: (s: string) => ["physics", "mathematics", "chemistry"].includes(s),
  getUnitFormulaSheet: vi.fn(async () => ({ unit: { id: "u", formulas: ["F=ma"] } })),
}));

import { GET } from "@/app/api/formula-unit/route";
import { getUnitFormulaSheet } from "@/lib/formula-sheet";

const URL_ = "http://localhost/api/formula-unit?subject=physics&unit=kinematics";
afterEach(() => vi.unstubAllGlobals());

describe("GET /api/formula-unit", () => {
  test("403 with no body and no read when the grant headers are missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await GET(new Request(URL_));
    expect(res.status).toBe(403);
    expect(await res.text()).toBe("");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getUnitFormulaSheet).not.toHaveBeenCalled();
  });

  test("403 empty when the backend refuses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 403 })));
    const res = await GET(new Request(URL_, { headers: { "x-unlock-grant": "g", "x-unlock-key": "route:/downloads" } }));
    expect(res.status).toBe(403);
    expect(await res.text()).toBe("");
    expect(getUnitFormulaSheet).not.toHaveBeenCalled();
  });

  test("200 with the sheet when the backend verifies; forwards cookies and grant", async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await GET(
      new Request(URL_, { headers: { "x-unlock-grant": "g", "x-unlock-key": "route:/downloads", cookie: "sb-access-token=t" } }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ unit: { id: "u", formulas: ["F=ma"] } });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/api\/content\/verify$/);
    expect(init.headers).toMatchObject({ "X-Unlock-Grant": "g", Cookie: "sb-access-token=t" });
  });
});
