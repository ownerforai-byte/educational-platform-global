/**
 * Plain-text rendering of inline LaTeX for SVG <text> nodes.
 *
 * KaTeX typesetting needs HTML, so anything drawn inside an SVG cannot show
 * typeset math — it would either render raw `$…$` source or nothing. This
 * flattens the most common TeX into readable characters (greek letters,
 * operators, fractions, roots) so diagram labels stay legible. The unmodified
 * original is still shown, fully typeset, in the expanded key beneath the SVG.
 */

const GREEK: Record<string, string> = {
  alpha: "\u03b1",
  beta: "\u03b2",
  gamma: "\u03b3",
  delta: "\u03b4",
  theta: "\u03b8",
  lambda: "\u03bb",
  mu: "\u03bc",
  pi: "\u03c0",
  rho: "\u03c1",
  sigma: "\u03c3",
  tau: "\u03c4",
  phi: "\u03c6",
  omega: "\u03c9",
  Delta: "\u0394",
  Omega: "\u03a9",
  Sigma: "\u03a3",
};

const BS = "\\";
const DELIM_DOUBLE = new RegExp(BS + BS + "\\$([\\s\\S]*?)" + BS + BS + "\\$", "g");
const DELIM_SINGLE = new RegExp(BS + "\\$([^$]*?)" + BS + "\\$", "g");

export function plainMath(src: string): string {
  let out = src;

  // 1. Strip math delimiters: $$…$$, $…$, \(…\), \[…\]
  out = out.split("$$").join(" ");
  out = out.replace(/\$([^$]*)\$/g, "$1");
  out = out.replace(/\\\(([\s\S]*?)\\\)/g, "$1");
  out = out.replace(/\\\[([\s\S]*?)\\\]/g, "$1");

  // 2. Greek command names -> unicode
  for (const name of Object.keys(GREEK)) {
    out = out.replace(new RegExp("\\\\" + name + "(?![a-zA-Z])", "g"), GREEK[name]);
  }

  // 3. Fractions and roots first, so their braces are consumed cleanly
  out = out.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
  out = out.replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
  out = out.replace(/\\sqrt\{([^{}]*)\}/g, "\u221a($1)");
  out = out.replace(/\\sqrt\s*([A-Za-z0-9]+)/g, "\u221a($1)");

  // 4. Symbolic commands
  const symbols: Array<[RegExp, string]> = [
    [/\\times/g, "\u00d7"],
    [/\\cdot/g, "\u00b7"],
    [/\\pm/g, "\u00b1"],
    [/\\leq?/g, "\u2264"],
    [/\\geq?/g, "\u2265"],
    [/\\neq/g, "\u2260"],
    [/\\approx/g, "\u2248"],
    [/\\infty/g, "\u221e"],
    [/\\(rightarrow|to)/g, "\u2192"],
    [/\\degree/g, "\u00b0"],
    [/\\pi(?![a-zA-Z])/g, "\u03c0"],
  ];
  for (const [re, rep] of symbols) out = out.replace(re, rep);

  // 5. Wrappers keep their contents
  out = out.replace(/\\(text|mathrm|mathbf|mathit)\{([^{}]*)\}/g, "$2");

  // 6. Function names keep their word
  out = out.replace(/\\(sin|cos|tan|log|ln|max|min|lim|det|vec)/g, "$1");

  // 7. Sub/superscript braces become plain markers
  out = out.replace(/_\{([^{}]*)\}/g, "_$1");
  out = out.replace(/\^\{([^{}]*)\}/g, "^$1");

  // 8. Anything left over loses its backslash
  out = out.replace(/\\[a-zA-Z]+/g, "");
  out = out.replace(/[{}]/g, "");
  out = out.replace(/\\/g, "");

  // 9. Stray delimiters from non-TeX dollar signs or an option like $x$ that
  //    the earlier passes could not pair up (e.g. "$5 and $10", or a formula
  //    cut mid-expression). Left alone these printed as raw "$" in the SVG.
  out = out.split("$").join("");

  return out.replace(/\s+/g, " ").trim();
}
