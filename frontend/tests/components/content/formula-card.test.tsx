import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormulaCard, toDisplayMath } from "@/components/content/formula-card";
import { AnnotationBlock, ClassifiedNotes, type ClassifiedNoteGroup } from "@/components/formulas/classified-notes";
import type { FormulaAnnotation, FormulaAnnotationKind } from "@/lib/formula-sheet";

describe("toDisplayMath", () => {
  it("wraps undelimited LaTeX in display math", () => {
    expect(toDisplayMath("v = u + at")).toBe("$$v = u + at$$");
  });

  it("leaves already-delimited math untouched", () => {
    expect(toDisplayMath("$$a = b$$")).toBe("$$a = b$$");
    expect(toDisplayMath("$a = b$")).toBe("$a = b$");
    expect(toDisplayMath("\\[a = b\\]")).toBe("\\[a = b\\]");
  });

  it("trims surrounding whitespace and handles empty input", () => {
    expect(toDisplayMath("  \\frac{1}{2}mv^2  ")).toBe("$$\\frac{1}{2}mv^2$$");
    expect(toDisplayMath("   ")).toBe("");
  });
});

const formula = {
  name: "Newton's Second Law",
  formula: "\\vec{F} = m\\vec{a}",
  description: "Net force equals mass times acceleration.",
  unit: "N",
  dimensions: "M L T^{-2}",
};

describe("FormulaCard", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the name, position badge, meaning and unit/dimension chips", () => {
    render(<FormulaCard formula={formula} index={3} />);

    expect(screen.getByText("Newton's Second Law")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(formula.description)).toBeInTheDocument();
    expect(screen.getByText("SI: N")).toBeInTheDocument();
    expect(screen.getByText("[M L T^{-2}]")).toBeInTheDocument();
  });

  it("renders the equation through the math pipeline", () => {
    const { container } = render(<FormulaCard formula={formula} index={1} />);
    // Display math is compiled by the shared pipeline, not left as raw LaTeX.
    expect(container.querySelector(".katex, .katex-display, mjx-container")).not.toBeNull();
  });

  it("copies the raw LaTeX when asked", async () => {
    render(<FormulaCard formula={formula} index={1} />);

    fireEvent.click(screen.getByRole("button", { name: /copy newton's second law equation/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(formula.formula));
  });

  it("omits the copy button when there is no equation", () => {
    render(<FormulaCard formula={{ ...formula, formula: "   " }} index={2} />);

    expect(screen.queryByRole("button", { name: /copy/i })).toBeNull();
  });
});

describe("AnnotationBlock", () => {
  it("renders an empty block when there are no annotations", () => {
    render(<AnnotationBlock annotations={[]} />);
    expect(screen.getByTestId("annotation-block")).toBeInTheDocument();
    // No kind chips when there are no annotations.
    expect(screen.queryByText(/special conditions/i)).toBeNull();
  });

  it("groups annotations by kind and shows a kind chip for each present kind", () => {
    const annotations: FormulaAnnotation[] = [
      { kind: "condition", text: "Only valid for constant mass." },
      { kind: "exam-trick", text: "Watch the sign convention." },
      { kind: "shortcut", text: "Use $F = ma$ directly." },
    ];
    render(<AnnotationBlock annotations={annotations} />);

    expect(screen.getByTestId("annotation-block")).toBeInTheDocument();
    expect(screen.getByText(/special conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/exam tricks/i)).toBeInTheDocument();
    expect(screen.getByText(/shortcuts/i)).toBeInTheDocument();
  });

  it("shows the annotation label before the text when present", () => {
    const annotations: FormulaAnnotation[] = [
      { kind: "solved-pyq", label: "2024", text: "Substitute $x=2$ first." },
    ];
    render(<AnnotationBlock annotations={annotations} />);

    expect(screen.getByText(/2024/i)).toBeInTheDocument();
    expect(screen.getByText(/substitute/i)).toBeInTheDocument();
  });

  it("renders annotation text through the math pipeline", () => {
    const annotations: FormulaAnnotation[] = [
      { kind: "hint", text: "Recall $\\sin^2 \\theta + \\cos^2 \\theta = 1$." },
    ];
    const { container } = render(<AnnotationBlock annotations={annotations} />);
    expect(container.querySelector(".katex, .katex-display, mjx-container")).not.toBeNull();
  });
});

describe("ClassifiedNotes", () => {
  const group: ClassifiedNoteGroup = {
    conditions: ["Only valid at constant temperature."],
    solvedPyqs: ["Substitute the values: $x = 2 \\Rightarrow y = 4$."],
    examTricks: ["The answer is always positive here."],
    hints: [],
  };

  it("renders each non-empty category with its title and item count", () => {
    const { container } = render(<ClassifiedNotes group={group} />);

    expect(screen.getByTestId("classified-notes")).toBeInTheDocument();
    expect(screen.getByText(/special conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/solved pyqs in short/i)).toBeInTheDocument();
    expect(screen.getByText(/exam tricks/i)).toBeInTheDocument();
    // Empty hints category is not rendered.
    expect(screen.queryByText(/hints/i)).toBeNull();
    // Each non-empty category shows its item count in parentheses.
    const countSpans = screen.getAllByText(/^\(1\)$/);
    expect(countSpans.length).toBeGreaterThanOrEqual(3);
  });

  it("renders nothing when every category is empty", () => {
    const empty: ClassifiedNoteGroup = { conditions: [], solvedPyqs: [], examTricks: [], hints: [] };
    const { container } = render(<ClassifiedNotes group={empty} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders classified note text through the math pipeline", () => {
    const { container } = render(<ClassifiedNotes group={group} />);
    expect(container.querySelector(".katex, .katex-display, mjx-container")).not.toBeNull();
  });
});
