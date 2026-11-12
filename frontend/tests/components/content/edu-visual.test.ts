import { describe, it, expect } from "vitest";
import {
  collectDetailDots,
  isDetailDotElement,
  parseDetailDot,
  parsePartTitle,
} from "@/components/content/edu-visual";

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

/**
 * DETAIL DOTS (owner 2026-11-12): related concepts, contrasts and deeper
 * detail travel inside a dot's <title> and are expanded into a floating widget.
 */
describe("parseDetailDot", () => {
  const PAYLOAD =
    "DETAIL DOT | Diffusion | Related: Osmosis; Active transport; Facilitated diffusion | " +
    "Contrasts: Diffusion vs Osmosis — only water moves in osmosis; Passive vs Active — no ATP vs ATP | " +
    "Detail: Particles move down a concentration gradient until equilibrium. | " +
    "Exam: never say diffusion needs energy";

  it("splits the hub payload into named sections, chips and contrast rows", () => {
    const dot = parseDetailDot(PAYLOAD);
    expect(dot.name).toBe("Diffusion");
    expect(dot.sections.map((s) => s.label)).toEqual([
      "Related",
      "Contrasts",
      "Detail",
      "Exam",
    ]);
    expect(dot.sections[0].items).toEqual([
      "Osmosis",
      "Active transport",
      "Facilitated diffusion",
    ]);
    expect(dot.sections[1].items).toHaveLength(2);
    expect(dot.sections[1].items[0]).toContain("Diffusion vs Osmosis");
    expect(dot.sections[2].items).toEqual([]);
    expect(dot.sections[2].value).toContain("concentration gradient");
  });

  it("accepts a payload with no topic and tolerates a legacy pipe label", () => {
    const noTopic = parseDetailDot("Related: A; B | Contrasts: X vs Y — z");
    expect(noTopic.name).toBe("Detail");
    expect(noTopic.sections.map((s) => s.label)).toEqual(["Related", "Contrasts"]);

    const legacy = parseDetailDot("Nucleus | Stores DNA | 3-mark diagram question");
    expect(legacy.name).toBe("Nucleus");
    expect(legacy.sections.map((s) => s.label)).toEqual(["Mechanism", "Exam significance"]);
  });

  it("never breaks on empty or marker-only titles", () => {
    expect(parseDetailDot("").sections).toEqual([]);
    expect(parseDetailDot("DETAIL DOT").name).toBe("Detail");
    expect(parseDetailDot("DETAIL DOT").sections).toEqual([]);
  });
});

describe("collectDetailDots / isDetailDotElement", () => {
  it("collects only dot groups with a direct <title>, in document order", () => {
    const figure = document.createElement("figure");
    figure.className = "edu-visual";
    figure.innerHTML = `<svg viewBox="0 0 10 10">
      <g><title>Part | role</title><circle cx="1" cy="1" r="1"/></g>
      <g class="edu-detail-dot"><title>DETAIL DOT | One | Related: A; B | Contrasts: X vs Y — z</title><circle cx="4" cy="4" r="1"/></g>
      <g class="edu-detail-dot"><title>DETAIL DOT | Two | Related: C | Contrasts: P vs Q — r</title><circle cx="6" cy="6" r="1"/></g>
      <g class="edu-detail-dot"><circle cx="8" cy="8" r="1"/></g>
    </svg>`;
    document.body.appendChild(figure);

    const dots = collectDetailDots(figure);
    expect(dots).toHaveLength(2);
    expect(dots.map((d) => d.info.name)).toEqual(["One", "Two"]);
    expect(isDetailDotElement(dots[0].element)).toBe(true);
    expect(isDetailDotElement(figure.querySelector("g"))).toBe(false);
    figure.remove();
  });
});
