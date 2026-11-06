import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ActivityJourney } from "@/components/lab/activity-journey";
import { PILOT_ACTIVITIES } from "@/lib/lab-manifest";
import { nextTopic, topicHref } from "@/lib/syllabus-neighbors";

const pilot = PILOT_ACTIVITIES[0];

describe("ActivityJourney", () => {
  it("renders the five journey actions with real destinations", () => {
    // Compact = inside a note, where "Open full lab" must be offered.
    render(<ActivityJourney activity={pilot} />);

    const nav = screen.getByTestId("activity-journey");
    expect(nav).toBeInTheDocument();

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toContain(`/lab/${pilot.slug}`);
    expect(hrefs).toContain(pilot.practiceHref);
    expect(hrefs.some((href) => href?.startsWith("/chat?q="))).toBe(true);
    expect(hrefs).toContain(pilot.relatedNotesHref);

    // Next topic follows syllabus order exactly, not an invented route.
    const next = nextTopic(
      pilot.curriculum.classSlug,
      pilot.curriculum.subject,
      pilot.curriculum.unitId,
      pilot.topicSlugs[0],
    );
    if (next) expect(hrefs).toContain(topicHref(next));
  });

  it("offers the hub return only on the full activity page", () => {
    render(<ActivityJourney activity={pilot} variant="full" />);
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/lab/3d");
    expect(hrefs).not.toContain(`/lab/${pilot.slug}`);
  });

  it("records the visit so the hub can offer continue-where-you-left-off", () => {
    render(<ActivityJourney activity={pilot} />);
    const stored = JSON.parse(
      window.localStorage.getItem("ravikishan:lab-progress:v1") ?? "[]",
    ) as Array<{ slug: string }>;
    expect(stored.map((visit) => visit.slug)).toContain(pilot.slug);
  });
});
