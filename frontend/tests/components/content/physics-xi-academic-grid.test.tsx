import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { PhysicsXiAcademicGrid } from "@/components/content/physics-xi-academic-grid";
import {
  PHYSICS_XI_ACADEMIC_UNITS,
  PHYSICS_XI_CONTENT_AREAS,
} from "@/lib/physics-xi-academic";

/**
 * The reading surface at /resources/physics-xi is the front door to the
 * briefs, so these tests guard the three things a student actually uses:
 * finding a unit, opening its full brief, and taking the document away.
 */

function renderGrid() {
  return render(
    <PhysicsXiAcademicGrid
      units={PHYSICS_XI_ACADEMIC_UNITS}
      contentAreas={PHYSICS_XI_CONTENT_AREAS}
    />,
  );
}

/** The text the grid's search box actually looks at, per unit. */
function searchableText(unit: (typeof PHYSICS_XI_ACADEMIC_UNITS)[number]): string {
  return [
    unit.unitName,
    unit.contentArea,
    unit.summary,
    ...unit.facts,
    ...unit.conditions,
    ...unit.syllabusTopics,
    ...unit.misconceptions.flatMap((item) => [item.claim, item.why, item.correction]),
    ...unit.workbook.flatMap((item) => [item.question, item.answer]),
    ...unit.nextSteps.map((step) => step.label),
    ...unit.mysteries.map((mystery) => mystery.question),
  ]
    .join(" ")
    .toLowerCase();
}

/**
 * A word that occurs exactly once in the whole searchable corpus, so a
 * search for it must leave exactly one card standing. The word is drawn
 * from `layer` — the corpus of the field under test — but counted against
 * `all`, so it cannot be a word another field happens to share.
 */
function uniqueTokenIn(layer: string[], all: string[]): string {
  const counts = new Map<string, number>();
  for (const text of all) {
    for (const word of text.split(/[^a-z]+/)) {
      if (word.length < 8) continue;
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }
  for (const word of layer.join(" ").split(/[^a-z]+/)) {
    if (word.length >= 8 && counts.get(word) === 1) return word;
  }
  throw new Error("no unique token in the searchable corpus");
}

describe("PhysicsXiAcademicGrid", () => {
  it("renders a card for every unit brief", () => {
    renderGrid();
    expect(screen.getAllByRole("article")).toHaveLength(
      PHYSICS_XI_ACADEMIC_UNITS.length,
    );
    expect(screen.getByText("26 of 26 unit briefs")).toBeDefined();
  });

  it("links every card to its brief page and its documents", () => {
    renderGrid();
    const first = PHYSICS_XI_ACADEMIC_UNITS[0];
    const card = screen.getAllByRole("article")[0];

    const briefLink = within(card).getByRole("link", { name: /full brief/i });
    expect(briefLink.getAttribute("href")).toBe(
      `/resources/physics-xi/${first.unitId}`,
    );

    const htmlLink = within(card).getByRole("link", { name: /html/i });
    expect(htmlLink.getAttribute("href")).toBe(
      `/resources/physics-xi/${first.slug}.html`,
    );

    const wordLink = within(card).getByRole("link", { name: /word/i });
    expect(wordLink.getAttribute("href")).toBe(
      `/resources/physics-xi/${first.slug}.doc`,
    );
  });

  it("filters by content area", () => {
    renderGrid();
    const area = PHYSICS_XI_CONTENT_AREAS[0];
    const expected = PHYSICS_XI_ACADEMIC_UNITS.filter(
      (unit) => unit.contentArea === area,
    ).length;

    fireEvent.click(screen.getByRole("button", { name: area }));

    expect(screen.getAllByRole("article")).toHaveLength(expected);
    expect(
      screen.getByText(`${expected} of ${PHYSICS_XI_ACADEMIC_UNITS.length} unit briefs`),
    ).toBeDefined();
  });

  it("searches across the briefs", () => {
    renderGrid();
    const input = screen.getByLabelText(/search physics xi academic units/i);

    fireEvent.change(input, { target: { value: "gravitation" } });

    const visible = screen.getAllByRole("article");
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.length).toBeLessThan(PHYSICS_XI_ACADEMIC_UNITS.length);
  });

  it("opens a quick look with the facts of that unit", () => {
    renderGrid();
    const first = PHYSICS_XI_ACADEMIC_UNITS[0];
    const card = screen.getAllByRole("article")[0];

    expect(screen.queryByText(first.facts[0])).toBeNull();

    fireEvent.click(within(card).getByRole("button", { name: /quick look/i }));

    expect(screen.getByText(first.facts[0])).toBeDefined();
    expect(screen.getByText(first.mysteries[0].question)).toBeDefined();
  });

  it("shows the exam coverage of every card", () => {
    renderGrid();
    const first = PHYSICS_XI_ACADEMIC_UNITS[0];
    const card = screen.getAllByRole("article")[0];

    expect(
      within(card).getByText(`${first.syllabusTopics.length} NEB topics`),
    ).toBeDefined();
    expect(
      within(card).getByText(`${first.misconceptions.length} misconceptions`),
    ).toBeDefined();
    expect(
      within(card).getByText(`${first.workbook.length} workbook questions`),
    ).toBeDefined();
  });

  it("opens a quick look with the exam-anchored layer", () => {
    renderGrid();
    const first = PHYSICS_XI_ACADEMIC_UNITS[0];
    const card = screen.getAllByRole("article")[0];

    fireEvent.click(within(card).getByRole("button", { name: /quick look/i }));

    expect(
      within(card).getAllByText(first.syllabusTopics[0]).length,
    ).toBeGreaterThan(0);
    expect(
      within(card).getByText(`“${first.misconceptions[0].claim}”`),
    ).toBeDefined();
    expect(
      within(card).getByText(first.workbook[0].question),
    ).toBeDefined();
  });

  it("searches the exam-anchored layer", () => {
    renderGrid();
    const input = screen.getByLabelText(/search physics xi academic units/i);
    const corpus = PHYSICS_XI_ACADEMIC_UNITS.map(searchableText);

    const layers = [
      {
        name: "syllabus topic",
        corpus: PHYSICS_XI_ACADEMIC_UNITS.flatMap((unit) => unit.syllabusTopics),
      },
      {
        name: "misconception",
        corpus: PHYSICS_XI_ACADEMIC_UNITS.flatMap((unit) =>
          unit.misconceptions.flatMap((item) => [
            item.claim,
            item.why,
            item.correction,
          ]),
        ),
      },
      {
        name: "workbook",
        corpus: PHYSICS_XI_ACADEMIC_UNITS.flatMap((unit) =>
          unit.workbook.flatMap((item) => [item.question, item.answer]),
        ),
      },
    ];

    for (const layer of layers) {
      const token = uniqueTokenIn(layer.corpus, corpus);
      fireEvent.change(input, { target: { value: token } });
      expect(
        screen.getAllByRole("article").length,
        `search for a ${layer.name} term`,
      ).toBe(1);
    }
  });
});
