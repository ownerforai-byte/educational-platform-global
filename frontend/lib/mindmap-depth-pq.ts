import type { UnitDepth } from "./mindmap-depth";

/** Measurement & units. */
export const PQ_DEPTH: Record<string, UnitDepth> = {
  "physical-quantities": {
    unitFacts: [
      "The metre was redefined twice: 1791 (1/10 of a quadrant of a meridian) → 1889 (platinum-iridium prototype bar) → 1960 (exactly 299 792 458 c). The speed of light is the ONLY constant in physics defined to be an exact integer, so the metre is now exact by definition.",
      "Mass was the last base quantity defined using a physical object (the Pt-Ir International Prototype Kilogram) until the 2019 redefinition, which fixed $h$ exactly instead.",
    ],
    unitEdgeCases: [
      "Dimensional analysis can NEVER produce the numerical constant. It fixes the form $F = kma$ but can never tell you $k = 1$.",
      "A quantity may be dimensionless yet still carry units (radian, steradian, degree). 'Dimensionless' is not the same as 'unitless'.",
    ],
    unitExamAsked: [
      "NEB: 'Can the dimensional method determine the value of a constant?' — NO, only the functional form.",
      "CEE: 'A quantity $P = a^0b^1c^2d^3$ has how many dimensions?' — four, because $a^0$ still counts as a dimension present in the expression.",
    ],
    unitCommonMistakes: [
      "Discarding a base quantity that appears with exponent 0. $P = a^0b^1c^2$ has THREE dimensions, not two.",
      "Adding or subtracting quantities of different dimensions: $10\\,\\text{m} + 5\\,\\text{g}$ is meaningless. Addition needs identical dimensions; multiplication and division do not.",
    ],
    leaves: {
      "uc-pq-1": {
        keyFacts: [
          "The ampere is now defined by the elementary charge: 1 A is the current when exactly $6.24214076\\times10^{18}$ electrons cross a point per second, fixing $e$ exactly.",
          "Of the 7 base quantities, only mass, length and time were once defined by artefacts; the other four are defined by natural constants and cannot drift.",
        ],
        edgeCases: [
          "The second is defined by a caesium-133 hyperfine transition and still drifts by ~1 part in $10^{16}$ per year from relativistic time dilation at different altitudes.",
          "Radian and steradian are the only derived units with symbol equal to their name in every language, yet they have dimension 1.",
        ],
        examAsked: [
          "NEB: 'Name the seven SI base quantities with their units.' (2 marks — order matters, no marks for a list of 6 or 8).",
          "CEE: 'Is weight a base or derived quantity?' — derived, $W = mg$, SI unit newton.",
        ],
        commonMistakes: [
          "Confusing mass with weight. Mass is the base quantity in kg; weight is a derived force in N. 'SI unit of mass is newton' is the most common base-unit slip.",
          "Listing coulomb, joule or ohm as base units — all three are derived.",
        ],
      },
      "uc-pq-2": {
        keyFacts: [
          "The newton is the only common derived unit whose dimension $MLT^{-2}$ contains exactly the M, L, T triple and nothing else.",
          "The 22 'unified' SI units (rad, sr, Hz, N, Pa, J, W, C, V, F, Ω, S, Wb, T, H) received official names in 1995 precisely to keep the base-unit list short.",
        ],
        edgeCases: [
          "Identical dimensions do not guarantee identical physics: joule and newton-metre are the same quantity, but so are watt and joule-per-second, so the unit alone never fixes what is being measured.",
          "The astronomical unit and light-year have dimension $L$ but are 'accepted for use with SI' rather than derived SI units.",
        ],
        examAsked: [
          "NEB: 'Express the SI unit of pressure in base quantities.' — $[P] = ML^{-1}T^{-2}$.",
          "CEE: 'Which is a derived unit: lumen, candela, radian, newton?' — newton only.",
        ],
        commonMistakes: [
          "Memorising derived unit names without their dimension formula, so 'express in base units' is unanswerable. Learn $[U] = ML^2T^{-2}I^{-2}$, not just 'joule'.",
          "Calling the radian dimensionless and therefore unitless — it is an SI derived unit with symbol rad.",
        ],
      },
      "uc-pq-3": {
        keyFacts: [
          "Dimensional homogeneity works because every physical law must be invariant under a change of units — the same equation must reduce to the same physics in CGS and SI.",
          "The method is a conservation law in disguise: you conserve the DIMENSIONS of both sides, exactly as you conserve mass number in a nuclear reaction.",
        ],
        edgeCases: [
          "Homogeneity cannot catch a wrong law. $\\vec F = m\\vec a$ and $\\vec F = k\\vec a$ are both homogeneous, yet only one is the physical relation for constant mass.",
          "Transcendental functions are automatic traps: if $\\sin x$ appears, $x$ must be dimensionless, because the argument of a trig function must be a pure number.",
        ],
        examAsked: [
          "NEB: 'Check the dimensional correctness of $F = \\frac{mv^2}{u+v}$.' — $[F] = MLT^{-2}$ but the RHS gives $MLT^{-1}$: dimensionally wrong.",
          "CEE: 'Why must the argument of a logarithm be dimensionless?' — a logarithm of a dimensional quantity has no meaning.",
        ],
        commonMistakes: [
          "Adding dimensions: $MLT^{-2} + ML^2T^{-2}$ is meaningless. Dimensions multiply and divide; they are only ever compared for equality.",
          "Treating homogeneity as proof of correctness. It is necessary but not sufficient.",
        ],
      },
      "uc-pq-4": {
        keyFacts: [
          "This is the fastest exam route to a relation: if $Q$ depends on $a^m b^n c^p$, match dimensions to get one equation per independent dimension, then solve the simultaneous equations.",
          "Every SI prefix is a power of 10, stepping 10³ at a time — a deliberate BIPM design choice so no prefix is ever an awkward number.",
        ],
        edgeCases: [
          "A variable with a NEGATIVE exponent (the $1/v$ in $F = mv^2/u$) must get a negative index in the simultaneous equations; students force it positive and lose the power.",
          "A sum cannot be treated as one monomial. For $v = s/t + u$, each additive term must separately match the LHS dimension.",
        ],
        examAsked: [
          "NEB: 'If velocity depends on mass m, momentum p and time t, show the dependence.' — $v \\propto p/m$.",
          "CEE: 'Show that the period of a simple pendulum is independent of the mass of the bob.' — the classic exponent-cancellation answer.",
        ],
        commonMistakes: [
          "Equating the number of base dimensions to the number of unknowns. Three dimensions (M, L, T) give at most three equations; four unknowns means you have missed a dimension or the problem is under-determined.",
          "Dropping the constant: homogeneity yields proportionality, never the numerical constant.",
        ],
      },
      "uc-pq-5": {
        keyFacts: [
          "For products and quotients relative errors ADD; for sums and differences absolute errors add and the percentage can explode when values nearly cancel.",
          "Random error falls as $1/\\sqrt{n}$, so 100 readings are 10× better than 10 — but only for random error, never for systematic (zero) error.",
        ],
        edgeCases: [
          "$a = 100.0 \\pm 0.1$, $b = 99.9 \\pm 0.1$ gives $a - b = 0.1 \\pm 0.14$: a 140% relative error. The difference is untrustworthy.",
          "Systematic errors (zero error, calibration offset) do not shrink with repetition, so averaging an infinite number of readings still leaves them.",
        ],
        examAsked: [
          "NEB: 'Find $x+y$ and $x-y$ with percentage errors for $x = 4.32\\pm0.01$ cm, $y = 6.78\\pm0.01$ cm.'",
          "CEE: 'Why is a mean of 20 readings more accurate than a mean of 5?' — random error $\\propto 1/\\sqrt{n}$.",
        ],
        commonMistakes: [
          "Adding RELATIVE errors for a difference: $\\Delta(a-b)/(a-b) \\neq \\Delta a/a + \\Delta b/b$. The relative rule is for products and quotients only.",
          "Reporting a mean without its uncertainty, which makes the measurement formally incomplete.",
        ],
      },
      "uc-pq-6": {
        keyFacts: [
          "Significant figures encode honesty, not precision: '4.0' claims the second digit is uncertain, '4' claims only the first.",
          "Multiplication and division take the FEWEST significant figures; addition and subtraction take the fewest DECIMAL PLACES. Students conflate these constantly.",
        ],
        edgeCases: [
          "Trailing zeros are ambiguous — '400' may be 1, 2 or 3 s.f. A trailing zero after a decimal point is significant ('4.00'), a trailing zero in a bare integer is not.",
          "Exact numbers (the 2 in $F = \\tfrac12 mv^2$, defined conversion factors) have unlimited s.f. and must not limit the answer.",
        ],
        examAsked: [
          "NEB: 'Give the s.f. of the answer to $9.8 \\times 4.762$ and to $9.8 + 4.762$.' — 2 and 5 respectively.",
          "CEE: 'Round 3.6745 to three significant figures.' — 3.67, because the next digit is 4, not 5.",
        ],
        commonMistakes: [
          "Using the multiplication rule for addition: $0.125 + 0.0375 = 0.16$ is limited to two decimal places, NOT to 2 significant figures.",
          "Rounding 2.5 ambiguously. NEB papers use '5 or more rounds up', so 2.5 → 3; 'round half to even' is a banker's convention and is not expected.",
        ],
      },
    },
  },
};