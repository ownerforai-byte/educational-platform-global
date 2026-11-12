import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const req = createRequire(import.meta.url);
console.log("vitest resolved", req.resolve("vitest"));
try {
  console.log("runner resolved", req.resolve("@vitest/runner"));
} catch (e) {
  console.log("runner resolve failed", e);
}

describe("minimal", () => {
  it("works", () => {
    expect(1).toBe(1);
  });
});
