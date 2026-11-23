import { describe, expect, it } from "vitest";
import { HOME_SUBJECT_RAILS } from "@/lib/home-subject-slides";
import { prepareRailFigure } from "@/lib/rail-figures";

describe("rail upgrade figures", () => {
  it("every curated card carries a Knowledge map figure that passes the guard", () => {
    let cards = 0;
    let maps = 0;
    for (const rail of HOME_SUBJECT_RAILS) {
      for (const slide of rail.slides) {
        if (slide.teaser || slide.unitDivider) continue;
        cards += 1;
        const mapRow = slide.rows.find((r) => r.label === "Knowledge map");
        expect(mapRow, `${rail.slug}: ${slide.title}`).toBeDefined();
        const prepared = prepareRailFigure(mapRow!.figure);
        expect(prepared, `${rail.slug}: ${slide.title} map guard`).not.toBeNull();
        maps += 1;
      }
    }
    expect(cards).toBe(30);
    expect(maps).toBe(30);
  });
  it("every detailed diagram passes the guard", () => {
    let detailed = 0;
    for (const rail of HOME_SUBJECT_RAILS) {
      for (const slide of rail.slides) {
        if (slide.teaser || slide.unitDivider) continue;
        const first = slide.rows[0];
        if (first?.figure && first.label !== "Knowledge map") {
          const prepared = prepareRailFigure(first.figure);
          expect(prepared, `${rail.slug}: ${slide.title} detail guard`).not.toBeNull();
          expect(prepared!.svg.length).toBeLessThan(40_000);
          detailed += 1;
        }
      }
    }
    expect(detailed).toBe(30);
  });
});
