import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormulaCard, toDisplayMath } from "@/components/content/formula-card";

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
