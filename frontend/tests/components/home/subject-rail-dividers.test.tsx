import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { SubjectRails } from "@/components/home/subject-rails";
import {
  HOME_SUBJECT_RAILS,
  type HomeSubjectRail,
} from "@/lib/home-subject-slides";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

/**
 * Unit classification on the rails: each syllabus-unit group opens with a
 * divider card carrying the unit title + "Class · n cards" meta, followed by
 * that unit's cards — all inside the same continuous marquee.
 */
describe("subject rail unit dividers", () => {
  const physics = HOME_SUBJECT_RAILS.find((rail) => rail.slug === "physics");
  if (!physics) throw new Error("physics rail missing from slide data");

  const railWithDivider: HomeSubjectRail = {
    ...physics,
    slides: [
      {
        tag: "Class 11",
        title: "Vectors",
        rows: [],
        href: "/class-11-notes/physics",
        icon: physics.icon,
        unitDivider: {
          unitId: "vectors",
          unitTitle: "Vectors",
          meta: "Class 11 · 2 cards",
        },
      },
      {
        tag: "Vectors",
        title: "Cross product — area, torque and the right-hand rule",
        rows: [{ label: "Concept", text: "A vector perpendicular to both inputs." }],
        href: "/class-11-notes/physics",
        icon: physics.icon,
      },
    ],
  };

  it("renders the divider ahead of its unit's cards, duplicated for the loop", () => {
    const { container } = render(
      <SubjectRails rails={[railWithDivider]} stats={{}} />,
    );
    // The divider link carries its own accessible name (unit + meta). The
    // loop duplicate is aria-hidden, so assistive tech meets each divider
    // (and card) exactly once.
    expect(screen.getByLabelText("Vectors — Class 11 · 2 cards")).toBeDefined();
    // Text queries meet both loop copies (the duplicate is aria-hidden, so
    // the label above is still announced exactly once).
    expect(screen.getAllByText("Class 11 · 2 cards")).toHaveLength(2);
    expect(
      screen.getAllByText("Cross product — area, torque and the right-hand rule"),
    ).toHaveLength(2);
    // Every slide — dividers included — travels twice for the seamless loop.
    expect(
      container.querySelectorAll("li.subject-rail-duplicate"),
    ).toHaveLength(2);
  });

  it("keeps the per-rail pause switch alongside dividers", () => {
    render(<SubjectRails rails={[railWithDivider]} stats={{}} />);
    expect(
      screen.getByRole("button", { name: "Pause the Physics slides" }),
    ).toBeDefined();
  });
});
