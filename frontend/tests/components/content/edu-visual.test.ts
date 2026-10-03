import { describe, it, expect } from "vitest";
import { parsePartTitle } from "@/components/content/edu-visual";

describe("parsePartTitle", () => {
  it("parses pipe-separated title with name, mechanism, and exam significance", () => {
    const raw = "Mitochondria | Generates ATP via oxidative phosphorylation | 3 marks diagram question in cell bio";
    const res = parsePartTitle(raw);
    expect(res.name).toBe("Mitochondria");
    expect(res.mechanism).toBe("Generates ATP via oxidative phosphorylation");
    expect(res.significance).toBe("3 marks diagram question in cell bio");
  });

  it("parses colon-separated title with name and details", () => {
    const raw = "Left Ventricle: Pumps oxygenated blood to aorta under high pressure";
    const res = parsePartTitle(raw);
    expect(res.name).toBe("Left Ventricle");
    expect(res.mechanism).toBe("Pumps oxygenated blood to aorta under high pressure");
    expect(res.significance).toBeUndefined();
  });

  it("parses single name without separators", () => {
    const raw = "Nucleus";
    const res = parsePartTitle(raw);
    expect(res.name).toBe("Nucleus");
    expect(res.mechanism).toBe("Nucleus");
    expect(res.significance).toBeUndefined();
  });

  it("handles empty or whitespace strings gracefully", () => {
    const res = parsePartTitle("   ");
    expect(res.name).toBe("Labelled Part");
  });
});
