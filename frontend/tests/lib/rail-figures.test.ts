import { describe, it, expect } from "vitest";

import { prepareRailFigure } from "@/lib/rail-figures";

/**
 * Row figures on the home rails (owner request 2026-10-06: "insert the
 * diagrams, in a rectangular box at conceptual place based on their need").
 * A card only supplies a string, so the guard — the same one the tutor's note
 * figures use — is the whole safety story: whatever it refuses is never drawn,
 * and whatever it accepts must survive a second pass unchanged because the
 * string crosses the server→client boundary and is checked again there.
 */
const GOOD = `<svg viewBox="0 0 40 20"><rect x="1" y="1" width="38" height="18" fill="#eee" stroke="#111"/></svg>`;

describe("rail figures", () => {
  it("accepts a plain drawing and reports its caption", () => {
    const figure = prepareRailFigure({ svg: GOOD, caption: "A box." });
    expect(figure).not.toBeNull();
    expect(figure?.svg.startsWith("<svg")).toBe(true);
    expect(figure?.svg.endsWith("</svg>")).toBe(true);
    expect(figure?.caption).toBe("A box");
    // The guard frames the drawing: role, accessible name and a <title>.
    expect(figure?.svg).toContain('role="img"');
    expect(figure?.svg).toContain('aria-label="A box"');
    expect(figure?.svg).toContain("<title>A box</title>");
    // viewBox survives; nothing else is invented.
    expect(figure?.svg).toContain('viewBox="0 0 40 20"');
    expect(figure?.svg).toContain("<rect");
  });

  it("is idempotent, so the second (client-side) pass changes nothing", () => {
    const first = prepareRailFigure({ svg: GOOD, caption: "A box." });
    const second = prepareRailFigure({
      svg: first?.svg,
      caption: first?.caption,
    });
    expect(second?.svg).toBe(first?.svg);
  });

  it("adds a viewBox when the drawing has none, so it always scales", () => {
    const figure = prepareRailFigure({ svg: "<svg><circle cx=\"5\" cy=\"5\" r=\"4\"/></svg>" });
    expect(figure?.svg).toContain('viewBox="0 0 640 400"');
  });

  it("refuses drawings that could execute, fetch or break", () => {
    const bad = [
      '<svg><script>alert(1)</script></svg>',
      '<svg><style>*{display:none}</style></svg>',
      '<svg onload="alert(1)"></svg>',
      '<svg><image href="https://evil.example/x.png"/></svg>',
      '<svg><use href="#x"/></svg>',
      '<svg><foreignObject><div>hi</div></foreignObject></svg>',
      '<svg><defs><linearGradient id="g"/></defs></svg>',
      '<svg><rect fill="url(#g)"/></svg>',
      '<svg><a href="javascript:alert(1)">x</a></svg>',
    ];
    for (const svg of bad) {
      expect(prepareRailFigure({ svg }), svg.slice(0, 40)).toBeNull();
    }
  });

  it("refuses anything that is not a single complete svg block", () => {
    expect(prepareRailFigure(undefined)).toBeNull();
    expect(prepareRailFigure({})).toBeNull();
    expect(prepareRailFigure({ svg: 42 })).toBeNull();
    expect(prepareRailFigure({ svg: "   " })).toBeNull();
    expect(prepareRailFigure({ svg: "<div>not a drawing</div>" })).toBeNull();
    expect(prepareRailFigure({ svg: "<svg><rect/></svg> trailing prose" })).toBeNull();
  });
});
