import { describe, it, expect, vi, afterEach } from "vitest";
import { act, cleanup, render } from "@testing-library/react";

import { SubjectRails } from "@/components/home/subject-rails";
import {
  HOME_SUBJECT_RAILS,
  type HomeSubjectRail,
  type HomeSubjectSlide,
} from "@/lib/home-subject-slides";
import {
  loadHomeRailCorpus,
  toRailSlideData,
} from "@/lib/home-rails-corpus";

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
 * Owner request 2026-10-06: "make it swipable like i can see the previous and
 * next by swiping if i want and same if untouched for 3s and clicked outside
 * its area then it continues its cycle".
 *
 * The gesture is driven here with synthetic pointer events (jsdom has no real
 * pointer stack), and the clock with fake timers, because the rule IS the
 * timing: a rail taken by hand must stay frozen for a full 3 s of no
 * interaction, and it may only continue its cycle once the reader has also
 * moved outside that rail's area.
 */
function pointerEvent(type: string, props: Record<string, unknown>): Event {
  return Object.assign(new Event(type, { bubbles: true, cancelable: true }), props);
}

const physics = HOME_SUBJECT_RAILS.find((rail) => rail.slug === "physics");
if (!physics) throw new Error("physics rail missing from slide data");

const singleRail: HomeSubjectRail[] = [physics];

function mount() {
  const { container } = render(<SubjectRails rails={singleRail} stats={{}} />);
  const viewport = container.querySelector<HTMLElement>(".subject-rail-viewport");
  const track = container.querySelector<HTMLElement>(".subject-rail-track");
  if (!viewport || !track) throw new Error("rail viewport/track not rendered");
  return { viewport, track };
}

function swipe(viewport: HTMLElement, from: number, to: number) {
  viewport.dispatchEvent(
    pointerEvent("pointerdown", { isPrimary: true, pointerId: 1, clientX: from, clientY: 40 }),
  );
  viewport.dispatchEvent(
    pointerEvent("pointermove", { pointerId: 1, clientX: to, clientY: 42 }),
  );
  viewport.dispatchEvent(
    pointerEvent("pointerup", { pointerId: 1, clientX: to, clientY: 42 }),
  );
}

function clickOn(target: EventTarget) {
  target.dispatchEvent(
    pointerEvent("pointerdown", { isPrimary: true, pointerId: 2, clientX: 5, clientY: 5 }),
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("subject rail swipe → hold → resume", () => {
  it("freezes the rail where a swipe left it and keeps it there", () => {
    vi.useFakeTimers();
    const { viewport, track } = mount();
    swipe(viewport, 400, 320);
    expect(track.style.animationName).toBe("none");
    // A swipe is a hold, not a release: the marquee must not creep on.
    vi.advanceTimersByTime(2900);
    expect(track.style.animationName).toBe("none");
  });

  it("counts the three seconds from the LAST interaction, not the swipe", () => {
    vi.useFakeTimers();
    const { viewport, track } = mount();
    swipe(viewport, 400, 320);
    vi.advanceTimersByTime(2900);
    // Touching the rail again restarts the countdown...
    clickOn(viewport);
    vi.advanceTimersByTime(2900);
    expect(track.style.animationName).toBe("none");
  });

  it("continues its cycle after 3 s untouched AND a click outside the rail", () => {
    vi.useFakeTimers();
    const { viewport, track } = mount();
    swipe(viewport, 400, 320);
    // Clicking outside before the 3 s are up arms the resume for the 3 s mark
    // rather than resuming early.
    clickOn(document.body);
    vi.advanceTimersByTime(2900);
    expect(track.style.animationName).toBe("none");
    // …and at 3 s the loop takes over again, in phase: the inline animation
    // name is dropped so the stylesheet loop runs again, and it is armed with
    // a negative delay so it continues from the held pixel offset.
    vi.advanceTimersByTime(200);
    expect(track.style.animationName).toBe("");
    expect(track.getAttribute("style") ?? "").toContain("animation-delay");
  });

  it("never resumes the rail while its Pause switch is on", () => {
    vi.useFakeTimers();
    const { viewport, track } = mount();
    const pause = document.querySelector<HTMLButtonElement>(
      'button[aria-label^="Pause the Physics"]',
    );
    if (!pause) throw new Error("pause switch not rendered");
    act(() => {
      pause.click();
    });
    expect(
      document.querySelector("section.subject-rail-paused"),
    ).not.toBeNull();
    // A swipe while button-paused must hold exactly where it was dropped.
    swipe(viewport, 400, 320);
    clickOn(document.body);
    vi.advanceTimersByTime(5000);
    expect(track.style.animationName).toBe("none");
  });

  it("leaves a plain tap alone — no swipe, no hold", () => {
    vi.useFakeTimers();
    const { viewport, track } = mount();
    viewport.dispatchEvent(
      pointerEvent("pointerdown", { isPrimary: true, pointerId: 3, clientX: 300, clientY: 40 }),
    );
    viewport.dispatchEvent(
      pointerEvent("pointerup", { pointerId: 3, clientX: 301, clientY: 40 }),
    );
    expect(track.style.animationName).not.toBe("none");
  });
});

/**
 * Owner request 2026-10-06: "insert the diagrams, in a rectangular box at
 * conceptual place based on their need". The box is a <figure> rendered
 * INSIDE the row's own <dd> — so the drawing sits at the concept it explains,
 * never in a detached gallery — and a drawing the guard refuses is dropped
 * whole rather than shown half-stripped.
 */
describe("rail figure box", () => {
  it("draws the row's figure inside that row's <dd>, with its caption", () => {
    const { container } = render(<SubjectRails rails={singleRail} stats={{}} />);
    const boxes = container.querySelectorAll("figure.rail-figure");
    expect(boxes.length).toBeGreaterThan(0);

    const box = boxes[0];
    const dd = box.closest("dd");
    expect(dd).not.toBeNull();
    // The row it belongs to is the one labelled on its <dt> — Concept first.
    expect(dd?.previousElementSibling?.textContent).toBe("Concept");
    // Rectangular canvas: the guarded svg sits in the box, caption beneath.
    expect(box.querySelector(".rail-figure__canvas svg")).not.toBeNull();
    expect(
      box.querySelector("figcaption.rail-figure__caption")?.textContent,
    ).toContain("Free-body diagram");
  });

  it("drops a figure the guard refuses — no box at all, text kept", () => {
    const hostile: HomeSubjectRail[] = [
      {
        ...physics,
        slides: physics.slides.map((slide) => ({
          ...slide,
          rows: slide.rows.map((row) => ({
            ...row,
            figure: { svg: '<svg><script>alert(1)</script></svg>' },
          })),
        })),
      },
    ];
    const { container } = render(<SubjectRails rails={hostile} stats={{}} />);
    expect(container.querySelectorAll("figure.rail-figure")).toHaveLength(0);
    expect(container.querySelector(".rail-figure__canvas")).toBeNull();
    // The row's academic text still renders — only the drawing is skipped.
    expect(container.textContent).toContain("Newton's second law");
  });
});

/**
 * The corpus half of that same promise: the `<unit>--diagram.rail.json` cards
 * agents author have to reach the DOM. The tests above drive hand-written
 * slides, so this one starts from a REAL corpus file and walks the whole path —
 * loadHomeRailCorpus → the guard inside toRailSlideData → SubjectRails →
 * <figure> — with no fixture in the middle. A diagram that stopped at the
 * loader would leave every other suite green and still never draw a box.
 */
describe("corpus diagram rails", () => {
  const entries = loadHomeRailCorpus();
  const diagram = entries.find(
    (entry) =>
      entry.subjectSlug === "physics" &&
      entry.file.includes("--diagram.rail.json") &&
      entry.ready,
  );
  if (!diagram) {
    throw new Error("no ready physics --diagram.rail.json in the corpus");
  }

  it("ships a ready diagram card whose drawing sits on the Concept row", () => {
    expect(diagram.ready).toBe(true);
    expect(diagram.reasons).toEqual([]);
    const concept = diagram.record.rows.find((row) => row.label === "Concept");
    expect(concept?.figure?.svg).toContain("<svg");
  });

  it("renders that card's drawing as a boxed figure inside its Concept <dd>", () => {
    const data = toRailSlideData(diagram);
    const slide: HomeSubjectSlide = { ...data, icon: data.iconName };
    const { container } = render(
      <SubjectRails rails={[{ ...physics, slides: [slide] }]} stats={{}} />,
    );

    const boxes = container.querySelectorAll("figure.rail-figure");
    // The seamless loop renders the duplicate copy as well, so > 0 is the claim.
    expect(boxes.length).toBeGreaterThan(0);

    const box = boxes[0];
    const dd = box.closest("dd");
    expect(dd).not.toBeNull();
    // The picture is AT the concept it explains, not in a detached gallery.
    expect(dd?.previousElementSibling?.textContent).toBe("Concept");

    const svg = box.querySelector(".rail-figure__canvas svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("viewBox")).toBeTruthy();
    // The guard labelled it for screen readers on the way through.
    expect(svg?.getAttribute("role")).toBe("img");
    expect(box.querySelector("figcaption.rail-figure__caption")).not.toBeNull();
  });
});
