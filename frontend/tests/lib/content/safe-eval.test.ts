import { beforeAll, describe, expect, it } from "vitest";
import { deriveExpr, evaluate } from "@/lib/content/safe-eval";

// The first mathjs import in this worker eats most of the budget — warm it up
// once so the per-case timeouts measure expressions, not module load.
beforeAll(async () => {
  await evaluate({ expr: "1", values: {} });
}, 120_000);

const V = { x: { value: 2 } };

describe("safe-eval rejects", () => {
  it("assignment", async () => expect((await evaluate({ expr: "x = 9", values: V })).ok).toBe(false));
  it("undeclared symbol", async () => expect((await evaluate({ expr: "y * 2", values: V })).ok).toBe(false));
  it("function constructor", async () =>
    expect((await evaluate({ expr: "createUnit('evil = 1 m')", values: V })).ok).toBe(false));
  it("matrix literal", async () => expect((await evaluate({ expr: "[1,2,3]'", values: V })).ok).toBe(false));
  it("index access", async () => expect((await evaluate({ expr: "x[0]", values: V })).ok).toBe(false));
  it("oversized exponent", async () => expect((await evaluate({ expr: "10^10^10", values: V })).ok).toBe(false));
  it("non-numeric result", async () =>
    expect((await evaluate({ expr: '"a" + "b"', values: V })).ok).toBe(false));
});

describe("safe-eval accepts", () => {
  it("plain arithmetic", async () => {
    const r = await evaluate({ expr: "q / v", values: { q: { value: 4 }, v: { value: 2 } } });
    expect(r.ok && r.value).toBeCloseTo(2);
  });
  it("base-SI conversion: µC / V is farads", async () => {
    const r = await evaluate({
      expr: "Q / V",
      values: { Q: { value: 5, unit: "µC" }, V: { value: 2, unit: "V" } },
    });
    expect(r.ok && r.value).toBeCloseTo(2.5e-6);
  });
  it("sqrt", async () => {
    const r = await evaluate({ expr: "sqrt(x)", values: V });
    expect(r.ok && r.value).toBeCloseTo(Math.SQRT2);
  });
  it("bare callee alone is NOT accepted as a declared symbol", async () => {
    // `sqrt` with no arguments parses to just a SymbolNode — the callee-child
    // exemption must not turn it into a declared variable.
    const r = await evaluate({ expr: "sqrt", values: {} });
    expect(r.ok).toBe(false);
  });
});

describe("deriveExpr", () => {
  it("authored expr wins", () => expect(deriveExpr({ expr: "e0 * A / d", latex: "x" })).toBe("e0 * A / d"));
  it("reduces a single lhs = rhs with \\frac", () =>
    expect(deriveExpr({ latex: "C = \\frac{Q}{V}", solve: "C" })).toBe("((Q)/(V))"));
  it("refuses to guess without a solve target", () =>
    expect(deriveExpr({ latex: "C = Q / V" })).toBeNull());
});
