import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import {
  RAIL_KNOWLEDGE_CARD_WIDTH,
  RAIL_PLACEHOLDER_CARD_WIDTH,
  SubjectRails,
} from "@/components/home/subject-rails";
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
    children: ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const read = (file: string) => readFileSync(path.resolve(file), "utf8");

describe("subject rail card widths", () => {
  const physics = HOME_SUBJECT_RAILS.find((rail) => rail.slug === "physics");
  if (!physics) throw new Error("physics rail missing from slide data");

  const rail: HomeSubjectRail = {
    ...physics,
    slides: [
      {
        tag: "Class 11",
        title: "Vectors",
        rows: [],
        href: "/class-11-notes/physics/vectors",
        icon: physics.icon,
        unitDivider: {
          unitId: "vectors",
          unitTitle: "Vectors",
          meta: "Class 11 · 1 card",
        },
      },
      {
        tag: "Vectors",
        title: "Cross product",
        rows: [{ label: "Concept", text: "A vector perpendicular to both inputs." }],
        href: "/class-11-notes/physics/cross-product",
        icon: physics.icon,
      },
    ],
  };

  it("clamps knowledge cards and placeholders to the viewport", () => {
    expect(RAIL_KNOWLEDGE_CARD_WIDTH).toContain(
      "w-[min(22rem,calc(100vw-2.5rem))]",
    );
    expect(RAIL_KNOWLEDGE_CARD_WIDTH).toContain("sm:w-[38rem]");
    expect(RAIL_KNOWLEDGE_CARD_WIDTH).toContain("xl:w-[44rem]");
    expect(RAIL_PLACEHOLDER_CARD_WIDTH).toContain(
      "w-[min(13rem,calc(100vw-2.5rem))]",
    );
    expect(RAIL_PLACEHOLDER_CARD_WIDTH).toContain("sm:w-[16rem]");

    const { container } = render(<SubjectRails rails={[rail]} stats={{}} />);

    const knowledge = container.querySelector(
      'a[href="/class-11-notes/physics/cross-product"]',
    );
    const placeholder = screen.getByRole("link", {
      name: "Vectors — Class 11 · 1 card",
    });
    expect(knowledge?.className).toContain("min(22rem,calc(100vw-2.5rem))");
    expect(knowledge?.className).toContain("min-w-0");
    expect(placeholder.className).toContain("min(13rem,calc(100vw-2.5rem))");
    expect(placeholder.querySelector(".break-words")).not.toBeNull();
  });

  it("matches the loop seam placeholder to the mobile card width", () => {
    const css = read("app/globals.css");
    expect(css).toContain(
      "contain-intrinsic-size: auto min(22rem, calc(100vw - 2.5rem))",
    );
    expect(css).toContain("contain-intrinsic-size: auto 38rem");
    expect(css).toContain("contain-intrinsic-size: auto 44rem");
  });
});
