import { describe, expect, it } from "vitest";
import {
  NATURE_SCENES,
  formatNaturePostMarkdown,
  natureSceneForUtcDay,
} from "../../src/services/community-bot-nature-image";

describe("community bot nature scenes", () => {
  it("rotates one scene per UTC day", () => {
    const a = natureSceneForUtcDay(new Date("2026-01-01T12:00:00Z"));
    const b = natureSceneForUtcDay(new Date("2026-01-02T12:00:00Z"));
    expect(NATURE_SCENES).toContain(a);
    expect(NATURE_SCENES).toContain(b);
    expect(a.title).not.toBe(b.title);
  });

  it("embeds external image URL in markdown when Google returns a hit", () => {
    const scene = NATURE_SCENES[0]!;
    const md = formatNaturePostMarkdown(scene, {
      url: "https://example.com/ocean.jpg",
      page: "https://example.com/gallery",
      title: "Ocean at dawn",
      width: 1200,
      height: 800,
    });
    expect(md).toContain("https://example.com/ocean.jpg");
    expect(md).toContain(scene.body);
    expect(md).toContain("example.com");
  });

  it("falls back to bundled scenic SVG when Google is unavailable", () => {
    const scene = NATURE_SCENES[3]!;
    const md = formatNaturePostMarkdown(scene, null);
    expect(md).toContain(scene.fallbackImage);
    expect(md).toContain("GOOGLE_CSE_API_KEY");
  });
});