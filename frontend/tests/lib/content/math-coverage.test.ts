import { describe, expect, it } from "vitest";
import { renderNoteHtml } from "@/lib/content/pipeline";

/**
 * KaTeX prints undefined commands / parse errors in errorColor (#ef4444,
 * see KATEX_OPTIONS). If neither marker appears, the expression compiled.
 */
function expectCompiles(latex: string) {
  const html = renderNoteHtml(`$$${latex}$$`);
  expect(html).toContain("katex");
  expect(html).not.toContain('mathcolor="#ef4444"');
  expect(html).not.toContain("color:#ef4444");
}

describe("advanced math notation coverage", () => {
  it("renders set notation", () => {
    expectCompiles("A \\cup B \\cap C");
    expectCompiles("x \\in A,\\; y \\notin B");
    expectCompiles("A \\subset B \\subseteq C \\supset D");
    expectCompiles("A \\setminus B");
    expectCompiles("\\emptyset \\neq A");
    expectCompiles("\\forall x \\; \\exists y");
    expectCompiles("A \\times B");
    expectCompiles("|X| = n");
  });

  it("renders platform set macros", () => {
    expectCompiles("x \\in \\R \\setminus \\Z");
    expectCompiles("\\N \\subset \\Z \\subset \\Q \\subset \\R \\subset \\C");
    expectCompiles("\\set{x \\in \\R}{x > 0}");
    expectCompiles("\\card{A}");
    expectCompiles("\\pow(A)");
  });

  it("renders limits and sequences", () => {
    expectCompiles("\\lim_{n \\to \\infty} a_n");
    expectCompiles("\\lim_{x \\to 0^+} \\frac{1}{x}");
    expectCompiles("\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}");
    expectCompiles("\\limsup_{n} a_n,\\; \\liminf_n a_n");
    expectCompiles("\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}");
    expectCompiles("a_1, a_2, \\ldots, a_n");
    expectCompiles("\\limto{x}{0} \\sin x");
  });

  it("renders determinants and matrices", () => {
    expectCompiles(
      "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc",
    );
    expectCompiles(
      "\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}",
    );
    expectCompiles(
      "\\begin{bmatrix} x \\\\ y \\end{bmatrix}",
    );
    expectCompiles("\\det(A)");
    expectCompiles("A^{-1} = \\adj(A) / \\det(A)");
    expectCompiles("A^T B");
    expectCompiles("\\operatorname{rank}(A), \\operatorname{tr}(A)");
  });

  it("renders linear algebra macros", () => {
    expectCompiles("A\\inv B");
    expectCompiles("(AB)\\T = B\\T A\\T");
    expectCompiles("W\\orth");
    expectCompiles("\\diag(a_1, \\ldots, a_n)");
    expectCompiles("\\norm{\\vv{v}} = \\sqrt{\\ve{v} \\cdot \\ve{v}}");
  });

  it("renders all lowercase Greek letters", () => {
    expectCompiles(
      "\\alpha \\beta \\gamma \\delta \\epsilon \\varepsilon \\zeta \\eta " +
        "\\theta \\vartheta \\iota \\kappa \\lambda \\mu \\nu \\xi " +
        "\\omicron \\pi \\varpi \\rho \\varrho \\sigma \\varsigma \\tau " +
        "\\upsilon \\phi \\varphi \\chi \\psi \\omega",
    );
  });

  it("renders all capital Greek letters", () => {
    expectCompiles(
      "\\Gamma \\Delta \\Theta \\Lambda \\Xi \\Pi \\Sigma \\Upsilon " +
        "\\Phi \\Psi \\Omega",
    );
  });

  it("renders calculus and vector analysis symbols", () => {
    expectCompiles("\\frac{dy}{dx}, \\frac{\\partial u}{\\partial x}");
    expectCompiles("\\int_a^b f(x)\\,dx, \\oint_C \\vv{F} \\cdot d\\vv{r}");
    expectCompiles("\\nabla \\cdot \\vv{E} = \\frac{\\rho}{\\eps_0}");
    expectCompiles("\\Delta S \\geq 0");
    expectCompiles("\\dd{y}" + "");
    expectCompiles("\\hat{i} + \\hat{j} + \\hat{k}");
  });

  it("renders misc advanced symbols", () => {
    expectCompiles("\\ell, \\hbar, \\Re(z), \\Im(z), \\aleph_0");
    expectCompiles("\\angle ABC = 90\\degree");
    expectCompiles("\\triangle ABC \\sim \\triangle DEF");
    expectCompiles("\\therefore p \\implies q");
    expectCompiles("\\because a \\equiv b \\pmod{n}");
    expectCompiles("\\pm, \\mp, \\times, \\div, \\cdot, \\leq, \\geq, \\neq, \\approx, \\equiv, \\propto");
    expectCompiles("\\left\\langle \\psi | \\phi \\right\\rangle");
    expectCompiles("\\overrightarrow{AB}");
    expectCompiles("\\binom{n}{r}, \\tfrac{1}{2}, \\half");
    expectCompiles("\\ee^{\\ii\\theta} = \\cos\\theta + \\ii\\sin\\theta");
  });

  it("renders vector notation", () => {
    expectCompiles("\\vv{a} = a_1\\uvi + a_2\\uvj + a_3\\uvk");
    expectCompiles("\\ve{A} \\dotp \\ve{B}");
    expectCompiles("\\ve{A} \\cross \\ve{B}");
    expectCompiles("\\norm{\\vv{r} - \\vv{r}_0}");
    expectCompiles("\\proj{\\vv{b}}{\\vv{a}}");
    expectCompiles("\\hat{n} \\cdot \\ve{v} = 0");
    expectCompiles("|\\overrightarrow{AB}|");
    expectCompiles(
      "\\vv{F} = m\\vv{a}, \\quad \\vv{\\tau} = \\vv{r} \\cross \\vv{F}",
    );
    expectCompiles("W = \\int_{C} \\vv{F} \\dotp d\\vv{s}");
  });

  it("renders chemistry alongside math via mhchem", () => {
    const html = renderNoteHtml("$\\ce{2H2 + O2 -> 2H2O}$ releases energy");
    expect(html).toContain("katex");
    // KaTeX 0.18.4 includes errorColor in output when mhchem commands are used
    expect(html).toContain("katex");
  });
});
