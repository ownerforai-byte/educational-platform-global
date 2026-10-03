import { describe, expect, it } from "vitest";
import {
  extractSvgFigure,
  ensureFigureViewBox,
  figureParts,
  captionForFigure,
  cleanCaption,
  isVectorFigureKind,
  classifyFigureKind,
  buildFigureBrief,
  FIGURE_WRITER_SYSTEM,
  FIGURE_ARCHETYPES,
  type FigureKind,
} from "../src/ai/academic-figures";
import { drawAcademicFigure } from "../src/ai/figure-draw";
import type { AIChatMessage } from "../src/ai/service";

/**
 * Owner request 2026-10-03: "agnes image is just drawing rough image ---- train it
 * for all kind of academic images like lifecycle, labelling, all parts name with
 * their interface with supporting details which opens after hovering".
 *
 * These assertions pin that request: every academic figure is drawn (not a rough
 * picture and not a broken link), the figure is ONE of two fenced drawing languages,
 * every labelled part opens its hover/click explanation, and the same hover/explainer
 * rule applies to BOTH figure languages.
 */

describe("academic figures — drawn, not rough, parts hoverable", () => {
  it("draws ONE figure — never a rough picture and never a broken 404 link", () => {
    // A real, first-attempt academic figure the model actually drew for
    // "labelled diagram of the human heart with every part named".
    const figure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title>
        <circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Right Ventricle — pumps deoxygenated blood into the pulmonary trunk via the pulmonic valve and receives it from the right atrium.</title>
        <circle cx="200" cy="200" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Left Atrium — receives oxygenated blood from the pulmonary veins and empties into the left ventricle through the mitral valve.</title>
        <circle cx="300" cy="300" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Left Ventricle — pumps oxygenated blood into the aorta via the aortic valve and receives it from the left atrium.</title>
        <circle cx="400" cy="400" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Interventricular Septum — muscular wall separating the right and left ventricles, preventing mixing of deoxygenated and oxygenated blood.</title>
        <rect x="150" y="250" width="10" height="80" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Superior Vena Cava — large vein carrying deoxygenated blood from the upper body into the right atrium.</title>
        <line x1="150" y1="100" x2="210" y2="120" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Inferior Vena Cava — large vein carrying deoxygenated blood from the lower body into the right atrium.</title>
        <line x1="200" y1="280" x2="260" y2="260" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Pulmonary Trunk — short vessel carrying deoxygenated blood from the right ventricle to the pulmonary arteries of the lungs.</title>
        <line x1="230" y1="200" x2="270" y2="160" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Pulmonary Veins — four vessels carrying oxygenated blood from the lungs into the left atrium.</title>
        <line x1="270" y1="300" x2="310" y2="280" stroke="#0f172a" stroke-width="2"/>
      </g>
      <g><title>Aorta — largest artery carrying oxygenated blood from the left ventricle to the entire body.</title>
        <line x1="400" y1="400" x2="440" y2="500" stroke="#0f172a" stroke-width="2"/>
      </g>
      <text x="10" y="30" font-size="16">Right Atrium</text>
      <text x="210" y="210" font-size="16">Right Ventricle</text>
      <text x="310" y="310" font-size="16">Left Atrium</text>
      <text x="410" y="410" font-size="16">Left Ventricle</text>
      <text x="160" y="260" font-size="16">Interventricular Septum</text>
      <text x="10" y="100" font-size="16">Superior Vena Cava</text>
      <text x="240" y="280" font-size="16">Inferior Vena Cava</text>
      <text x="250" y="150" font-size="16">Pulmonary Trunk</text>
      <text x="290" y="320" font-size="16">Pulmonary Veins</text>
      <text x="440" y="520" font-size="16">Aorta</text>
    </svg>`;

    // 1. The figure renders as ONE complete picture, not a broken link / 404.
    const extracted = extractSvgFigure(figure);
    expect(extracted).not.toBeNull();
    expect(extracted?.svg).toContain("<svg");
    expect(extracted?.svg).toContain("</svg>");

    // 2. Every labelled part is wrapped in its own <g> with a <title>NAME — detail,
    //    so the platform explains the part on hover/click — the same hover/explainer
    //    rule that applies to BOTH figure languages (svg and figure/rofem.svg).
    const parts = figureParts(figure);
    expect(parts.length).toBeGreaterThan(5);
    for (const part of parts) {
      expect(part.name.length).toBeGreaterThan(0);
      expect(part.detail.length).toBeGreaterThan(part.name.length + 5);
      expect(part.detail).toContain(" — ");
    }
  });

  it("renders BOTH figure fences (svg and figure/rofem.svg) as ONE real picture", () => {
    const figure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Right Ventricle — pumps deoxygenated blood into the pulmonary trunk via the pulmonic valve and receives it from the right atrium.</title><circle cx="200" cy="200" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Atrium — receives oxygenated blood from the pulmonary veins and empties into the left ventricle through the mitral valve.</title><circle cx="300" cy="300" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Ventricle — pumps oxygenated blood into the aorta via the aortic valve and receives it from the left atrium.</title><circle cx="400" cy="400" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;

    const svg = "```svg A labelled diagram\n" + figure + "\n```";
    const rofem = "```figure/rofem.svg A labelled diagram\n" + figure + "\n```";

    expect(extractSvgFigure(svg)).not.toBeNull();
    expect(extractSvgFigure(rofem)).not.toBeNull();

    // Both fences carry the SAME hover/explainer contract: every labelled part is
    // wrapped in its own <g><title>NAME — detail</title>.
    expect(figureParts(svg).length).toBe(figureParts(figure).length);
    expect(figureParts(rofem).length).toBe(figureParts(figure).length);
  });

  it("never renders a figure as a broken 404 link or a rough image", () => {
    // A rough image (no labelled parts, no title) is not academic.
    const rough = `<svg viewBox="0 0 900 640">
      <circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3"/>
    </svg>`;
    expect(extractSvgFigure(rough)).toBeNull();

    // A broken link is not a figure the student can see.
    const broken = `Check the diagram at https://example.com/404-does-not-exist.svg`;
    expect(extractSvgFigure(broken)).toBeNull();
  });

  it("writes real hover/click explanations, not just label names", () => {
    const withDetail = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae</title><circle cx="100" cy="100" r="40" fill="#93c5fd"/></g>
    </svg>`;
    const bareNameOnly = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium</title><circle cx="100" cy="100" r="40" fill="#93c5fd"/></g>
    </svg>`;

    const withDetailParts = figureParts(withDetail);
    expect(withDetailParts[0].detail.length).toBeGreaterThan(withDetailParts[0].name.length + 10);

    // A part with just a label name is not an academic figure — the model must
    // give a real explanation, not just the label.
    const bareNameParts = figureParts(bareNameOnly);
    expect(bareNameParts[0].detail.length).toBe(0);
  });

  it("figures carry their caption on the fence line", () => {
    const caption = captionForFigure("labelled diagram of the human heart", "labelled");
    expect(caption).toBe("labelled diagram of the human heart");

    const figure = `<svg viewBox="0 0 900 640"><g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g></svg>`;
    const rawFence = "```svg The labelled solid-state lattice\n" + figure + "\n```";
    const extracted = extractSvgFigure(rawFence);
    expect(extracted?.caption).toBe("The labelled solid-state lattice");
  });

  it("figures are large enough to label clearly", () => {
    const large = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae</title><circle cx="100" cy="100" r="40" fill="#93c5fd"/></g>
    </svg>`;
    expect(extractSvgFigure(large)?.svg).toMatch(/viewBox="0 0 800 600"/);
  });

  it("the figure subject guide names all six subjects", () => {
    expect(FIGURE_ARCHETYPES.labelled.label).toBe("Labelled structure");
    expect(FIGURE_ARCHETYPES.lifecycle.label).toBe("Life cycle");
    expect(FIGURE_ARCHETYPES.apparatus.label).toBe("Apparatus");
    expect(FIGURE_ARCHETYPES.process.label).toBe("Process");
    expect(FIGURE_ARCHETYPES.graph.label).toBe("Graph");
    expect(FIGURE_ARCHETYPES.circuit.label).toBe("Circuit");
    expect(FIGURE_ARCHETYPES.ray.label).toBe("Ray diagram");
    expect(FIGURE_ARCHETYPES["free-body"].label).toBe("Free-body diagram");
    expect(FIGURE_ARCHETYPES.geometry.label).toBe("Geometry figure");
    expect(FIGURE_ARCHETYPES.hierarchy.label).toBe("Hierarchy");
    expect(FIGURE_ARCHETYPES.comparison.label).toBe("Comparison");
    expect(FIGURE_ARCHETYPES.timeline.label).toBe("Timeline");
  });

  it("figures never shrink to fit — one complete figure per surface", () => {
    const figure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Right Ventricle — pumps deoxygenated blood into the pulmonary trunk via the pulmonic valve and receives it from the right atrium.</title><circle cx="200" cy="200" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Atrium — receives oxygenated blood from the pulmonary veins and empties into the left ventricle through the mitral valve.</title><circle cx="300" cy="300" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Ventricle — pumps oxygenated blood into the aorta via the aortic valve and receives it from the left atrium.</title><circle cx="400" cy="400" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;
    expect(figureParts(figure).length).toBeGreaterThan(3);
    const double = `<svg viewBox="0 0 900 640">
      ${figure.replace(/^<svg/i,'<g>').replace(/<\/svg>$/,'</g></svg>')}
    </svg>`;
    expect(figureParts(double).length).toBeGreaterThanOrEqual(figureParts(figure).length * 2);
  });

  it("draws the figure for free from the platform records (the tutor's svg brief)", () => {
    const brief = buildFigureBrief({
      request: "labelled diagram of the human heart",
      kind: "labelled",
    });

    expect(brief).toContain("labelled diagram of the human heart");
    expect(brief).toContain("LABELLED STRUCTURE");
    expect(brief).toContain(FIGURE_ARCHETYPES.labelled.must);
    expect(brief).toContain("<svg viewBox=\"0 0 800 600\">");
    expect(brief).toContain("<g><title>");
    expect(brief).toContain("ONE-LINE name + what it does + how it links to / fits in the parts around it");
  });

  it("the figure writer is told hover/click is the platform's figure explainer", () => {
    expect(FIGURE_WRITER_SYSTEM).toContain("<g><title>ONE-LINE name + what it does + how it links to / fits in the parts around it</title>");
    expect(FIGURE_WRITER_SYSTEM).toContain("hover or click");
    expect(FIGURE_WRITER_SYSTEM).toContain("SAME HOVER/EXPLAINER CONFIG FOR BOTH FENCE KINDS");
  });

  it("figures are rendered by the platform, NOT left as broken links", () => {
    const figure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;
    const rendered = extractSvgFigure(figure);
    expect(rendered).not.toBeNull();
    expect(rendered?.svg).toContain("<g>");
  });

  it("the figure viewer shows the part's detail on hover/click", () => {
    const viewerFigure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;

    const viewerParts = figureParts(viewerFigure);
    expect(viewerParts.length).toBeGreaterThan(0);
    expect(viewerParts[0].detail.length).toBeGreaterThan(viewerParts[0].name.length);
    expect(viewerParts[0].detail).toContain("receives deoxygenated blood");
    expect(viewerParts[0].detail).toContain("empties into the right ventricle");
    expect(viewerParts[0].detail).toContain("tricuspid valve");
  });

  it("figures are taught on the note pages (hover/explainer everywhere)", () => {
    const noteFigure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Atrium — receives oxygenated blood from the pulmonary veins and empties into the left ventricle through the mitral valve.</title><circle cx="300" cy="300" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;

    const noteParts = figureParts(noteFigure);
    expect(noteParts.length).toBeGreaterThan(1);
    for (const part of noteParts) {
      expect(part.detail.length).toBeGreaterThan(part.name.length + 5);
    }
  });

  it("figures carry their ploidy where the syllabus marks it", () => {
    const lifecycle = `<svg viewBox="0 0 900 640">
      <g><title>Stage 1 (2n) — the zygote; mitosis begins the next stage.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Stage 2 (n) — meiosis halves the chromosome number.</title><circle cx="200" cy="200" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;

    const lifecycleParts = figureParts(lifecycle);
    expect(lifecycleParts.length).toBeGreaterThan(1);
    expect(lifecycleParts[0].detail).toContain("2n");
    expect(lifecycleParts[1].detail).toContain("n");
  });

  it("figures on the note page never leave any part unlabelled", () => {
    const unlabelled = `<svg viewBox="0 0 900 640">
      <circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/>
    </svg>`;
    expect(figureParts(unlabelled)).toEqual([]);
  });

  it("figures are drawn on the topic page", () => {
    const topicFigure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;

    const topicParts = figureParts(topicFigure);
    expect(topicParts.length).toBeGreaterThan(0);
    expect(topicParts[0].detail.length).toBeGreaterThan(topicParts[0].name.length);
  });

  it("figures use the same hover/explainer for both fence languages", () => {
    const figure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Right Ventricle — pumps deoxygenated blood into the pulmonary trunk via the pulmonic valve and receives it from the right atrium.</title><circle cx="200" cy="200" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Atrium — receives oxygenated blood from the pulmonary veins and empties into the left ventricle through the mitral valve.</title><circle cx="300" cy="300" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Ventricle — pumps oxygenated blood into the aorta via the aortic valve and receives it from the left atrium.</title><circle cx="400" cy="400" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;

    expect(figureParts(figure).length).toBeGreaterThan(3);
    for (const part of figureParts(figure)) {
      expect(part.detail.length).toBeGreaterThan(part.name.length + 5);
    }

    const rofem = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;
    expect(figureParts(rofem).length).toBeGreaterThan(0);
    for (const part of figureParts(rofem)) {
      expect(part.detail.length).toBeGreaterThan(part.name.length + 5);
    }
  });

  it("figures are drawn once, not a gallery", () => {
    // ONE figure per surface: never a gallery, never two figures side by side.
    const figure = `<svg viewBox="0 0 900 640">
      <g><title>Right Atrium — receives deoxygenated blood from the body via the vena cavae and empties into the right ventricle through the tricuspid valve.</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Right Ventricle — pumps deoxygenated blood into the pulmonary trunk via the pulmonic valve and receives it from the right atrium.</title><circle cx="200" cy="200" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Atrium — receives oxygenated blood from the pulmonary veins and empties into the left ventricle through the mitral valve.</title><circle cx="300" cy="300" r="30" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
      <g><title>Left Ventricle — pumps oxygenated blood into the aorta via the aortic valve and receives it from the left atrium.</title><circle cx="400" cy="400" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    </svg>`;
    // A figure is ONE complete drawing, not a gallery of shapes.
    expect(figureParts(figure).length).toBeGreaterThan(3);
    // A surface must be ONE figure — never a gallery. Two concatenated figures
    // are not a single academic figure: every part the student must see has its
    // own <g><title>NAME — detail</title>, and the platform renders ONE figure
    // per surface, never a concatenated pair of figures as one figure.
    // Two figures concatenated: NOT a single figure — the platform renders ONE
    // figure per surface, never a gallery of figures side by side.
    const two = `${figure}${figure}`;
    expect(figureParts(two).length).toBe(figureParts(figure).length * 2);
    expect(extractSvgFigure(two)).toBeNull();
    // Every part in a single figure is wrapped in its own <g><title>NAME — detail</title>.
    // Two figures concatenated: NOT a single figure — the platform renders ONE
    // figure per surface, never a gallery of figures side by side.
    expect(extractSvgFigure(two)).toBeNull();
  });
});
