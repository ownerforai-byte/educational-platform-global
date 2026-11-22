/**
 * Wave 3 — difficult conceptual solved problems (NEB board style) for the
 * grade-11 mathematics derivations that shipped without any `solvedProblems`.
 * Keyed by derivation slug; merged into `DERIVATIONS_AND_THEOREMS` in
 * `derivations-data.ts`.
 */

import type { SolvedProblem } from "@/lib/derivations-data";

export const MATH_EXTRA_SOLVED: Record<string, SolvedProblem[]> = {
  "trigonometric-equations-general-values": [
    {
      id: "spm-trig-1",
      question:
        "Solve completely: 2 sin²x + sin x − 1 = 0 for x in [0, 2π], then write the GENERAL solution of sin x = sin α form for the same equation. (b) A student solves sin 2x = 1/2 as 2x = nπ + (−1)ⁿ(π/6) and stops. Why is x = nπ/2 + (−1)ⁿ(π/12) incomplete as an answer set unless n's parity is discussed?",
      examBadge: "NEB 2080 Board",
      given: "2 sin²x + sin x − 1 = 0",
      stepByStep: [
        "Factor: 2sin²x + sinx − 1 = (2 sin x − 1)(sin x + 1) = 0 ⟹ sin x = 1/2 or sin x = −1.",
        "sin x = 1/2 in [0, 2π]: x = π/6, 5π/6. sin x = −1: x = 3π/2. Solution set {π/6, 5π/6, 3π/2}.",
        "General form via sin x = sin α ⟹ x = nπ + (−1)ⁿα: for α = π/6, x = nπ + (−1)ⁿ(π/6); for α = −π/2 (sin x = −1), x = nπ + (−1)ⁿ(−π/2), which collapses to x = 4kπ − π/2 ∪ 4kπ + 3π/2... simplifying to x = (4k+3)π/2 — the single family.",
        "For sin 2x = 1/2: the general solution is 2x = nπ + (−1)ⁿ(π/6), i.e. x = nπ/2 + (−1)ⁿ(π/12).",
        "Why parity matters: with (−1)ⁿ present, even n gives x = kπ + π/12 and odd n gives x = kπ + 5π/12 — two interleaved arithmetic progressions with DIFFERENT offsets. Leaving the (−1)ⁿ form unevaluated hides that the solutions are NOT equally spaced by π/2; a marker expects the parity split (or at least the statement that n even/odd yields the two families).",
      ],
      finalAnswer: "x \\in \\{\\pi/6,\\ 5\\pi/6,\\ 3\\pi/2\\};\\ \\text{general: } x = n\\pi + (-1)^n\\tfrac{\\pi}{6} \\cup (4k{+}3)\\tfrac{\\pi}{2}",
      tipOrTrap:
        "The (−1)ⁿ form is a compressed TWO-family answer. NEB examiners specifically check whether students can decompress it — quoting it verbatim when the question says 'solve' loses the presentation mark.",
    },
  ],

  "logic-set-statements-truth-tables": [
    {
      id: "spm-logic-1",
      question:
        "(a) Construct the truth table for (p ⇒ q) ⇔ (¬p ∨ q) and state the logical principle it demonstrates. (b) Using set notation, translate ¬(p ∧ q) ⇒ (¬p ∨ ¬q) and prove the set version with a membership argument (x ∈ A ∩ B case analysis). (c) A student claims p ⇒ q is FALSE whenever q is false. Refute with one concrete row and explain why the 'vacuous truth' of implication is essential to mathematics.",
      examBadge: "NEB 2079",
      given: "p, q atomic statements; connectives ¬, ∧, ∨, ⇒, ⇔",
      stepByStep: [
        "Truth table (p, q): (T,T): p⇒q = T, ¬p∨q = T, biconditional T. (T,F): F, F, T. (F,T): T, T, T. (F,F): T, T, T.",
        "All four rows give TRUE — (p ⇒ q) ≡ (¬p ∨ q): implication is definitionally equivalent to the disjunction with negated antecedent (material implication).",
        "Set translation: ¬(p ∧ q) ⇒ (¬p ∨ ¬q) becomes (A ∩ B)ᶜ ⊆ Aᶜ ∪ Bᶜ (De Morgan).",
        "Membership proof: take any x ∈ (A ∩ B)ᶜ, i.e. x ∉ A ∩ B. Case 1: x ∉ A ⟹ x ∈ Aᶜ ⟹ x ∈ Aᶜ ∪ Bᶜ. Case 2: x ∈ A, then since x is not in the intersection, x ∉ B ⟹ x ∈ Bᶜ ⟹ x ∈ Aᶜ ∪ Bᶜ. Both cases land in the union ⟹ inclusion holds. (Equality also holds by the symmetric argument.)",
        "The student's claim fails on row (F, F): p false, q false, yet p ⇒ q is TRUE. If 'false antecedent made the implication false', then the theorem 'for all real x, x > 2 ⟹ x² > 4' would be falsified by x = 1 (antecedent false) — destroying every conditional theorem whose hypothesis is not always satisfied. Vacuous truth is what lets mathematics state implications without enumerating exceptions.",
      ],
      finalAnswer: "(p \\Rightarrow q) \\equiv (\\neg p \\vee q)\\ \\text{(tautology)};\\ (A \\cap B)^c \\subseteq A^c \\cup B^c;\\ \\text{row } (F,F) \\text{ refutes the claim}",
      tipOrTrap:
        "Implication is TRUE on all rows except T ⇒ F. Any truth-table answer marking F⇒F as false has confused implication with the biconditional — the two most-confused connectives in NEB logic questions.",
    },
  ],
};
