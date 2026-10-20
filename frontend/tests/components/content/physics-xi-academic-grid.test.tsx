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
});
