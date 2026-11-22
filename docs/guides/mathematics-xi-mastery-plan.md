# Mathematics XI Mastery Plan

Working document for the class-11 mathematics notes enrichment campaign.
Goal: every canonical topic gets theorem-grade content — properly stated
theorems (statement → proof idea → conceptual meaning), worked example
types, and verified PYQs from `content/practice/questions/class-11/mathematics/`.

## Rules

- Only verified PYQs from the math question bank; everything else is
  labelled "NEB-style practice" in `@@importantNotes@@`.
- Pipeline: `.mastery-src/mx<N>.md` (`@@field@@`/`%%%` markers) →
  `python -X utf8 .mastery-src/assemble.py .mastery-src/mx<N>.md "<canonical json path>"` →
  `npx tsx frontend/scripts/content/build.ts mathematics` →
  `node scripts/validate-content.mjs` → plan update → scoped git add → commit/push.
- Canonical file = first `_manifest.json` entry per `topicSlug`
  (`frontend/public/data/syllabus-notes/mathematics/_manifest.json`).
- Scoped git adds only — never `git add -A`.

## Status legend

`Pending` → `Completed` when the canonical JSON is enriched, built and validated.

## Trigonometry (3 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 1 | Trigonometry | Trigonometric ratios and identities | `trigonometry/06-trigonometric-ratios-and-identities.json` | Completed |
| 2 | Trigonometry | Trigonometric equations and general values | `trigonometry/02-trigonometric-equations-and-general-values.json` | Completed |
| 3 | Trigonometry | Inverse circular functions | `trigonometry/01-inverse-circular-functions.json` | Completed |

## Vectors (11 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 4 | Vectors | Vector algebra: types, addition, scalar multiplication | `vectors/01-vector-algebra-types-addition-and-scalar-multiplication.json` | Completed |
| 5 | Vectors | Linear combination, dependent and independent vectors | `vectors/02-linear-combination-of-vectors-linearly-dependent-and-independent-vectors.json` | Completed |
| 6 | Vectors | Collinear and coplanar vectors | `vectors/01-collinear-and-non-collinear-vectors-coplanar-and-non-coplanar-vectors.json` | Completed |
| 7 | Vectors | Dot product and its applications | `vectors/02-dot-product-and-its-applications.json` | Completed |
| 8 | Vectors | Cross product and its applications | `vectors/03-cross-product-and-its-applications.json` | Completed |
| 9 | Vectors | Scalar and vector triple products | `vectors/04-scalar-and-vector-triple-products.json` | Completed |
| 10 | Vectors | Applications: work, torque, angular momentum | `vectors/05-applications-work-torque-angular-momentum.json` | Completed |

## Statistics and probability (2 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 11 | Statistics | Measures of dispersion, SD, variance, CV, skewness | `statistics-and-probability/01-measure-of-dispersion-standard-deviation-variance-coefficient-of-variation-skewness-karl-pearson.json` | Completed |
| 12 | Probability | Probability: definitions and basic laws | `statistics-and-probability/02-probability-independent-cases-mathematical-and-empirical-definition-of-probability-two-basic-law.json` | Completed |

## Algebra (14 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 13 | Algebra | Logic and set: statements, connectives, truth tables, set-operation theorems | `algebra/01-logic-and-set-statements-logical-connectives-truth-tables-theorems-based-on-set-operations.json` | Completed |
| 14 | Algebra | Real numbers, intervals, absolute value | `algebra/02-real-numbers-geometric-representation-of-real-numbers-interval-absolute-value.json` | Completed |
| 15 | Algebra | Function: domain, range, inverse | `algebra/01-function-domain-and-range-of-a-function-inverse-function.json` | Completed |
| 16 | Algebra | Function: composite, algebraic, linear, quadratic | `algebra/03-function-domain-and-range-of-a-function-inverse-function-composite-function-algebraic-linear-qua.json` | Completed |
| 17 | Algebra | Curve sketching: symmetry, periodicity, monotonicity | `algebra/04-curve-sketching-odd-and-even-functions-periodicity-symmetry-about-origin-x-and-y-axis-monotonici.json` | Completed |
| 18 | Algebra | Sequence and series: AP, GP, HP | `algebra/02-sequence-and-series-arithmetic-geometric-harmonic-sequences.json` | Completed |
| 19 | Algebra | Sequence and series: properties, AM–GM–HM | `algebra/05-sequence-and-series-arithmetic-geometric-harmonic-sequences-and-series-and-their-properties-a-m-.json` | Completed |
| 20 | Algebra | Matrices and determinants: transpose, inverse | `algebra/03-matrices-and-determinants-transpose-properties-inverse.json` | Completed |
| 21 | Algebra | Matrices and determinants: minors, cofactors, adjoint | `algebra/06-matrices-and-determinants-transpose-of-a-matrix-and-its-properties-minors-and-cofactors-adjoint-.json` | Completed |
| 22 | Algebra | Minors, cofactors, determinants (extra canonical) | `algebra/minors-cofactors-determinants.json` | Completed |
| 23 | Algebra | Quadratic equation: nature of roots, root–coefficient relation | `algebra/07-quadratic-equation-nature-and-roots-of-a-quadratic-equation-relation-between-roots-and-coefficie.json` | Completed |
| 24 | Algebra | Complex number: algebra, modulus, geometric representation | `algebra/08-complex-number-imaginary-unit-algebra-of-complex-numbers-geometric-representation-absolute-modul.json` | Completed |
| 25 | Algebra | Function: domain and range (extra canonical) | `algebra/03-function-domain-range.json` | Completed |
| 26 | Algebra | Sequence and series (extra canonical) | `algebra/05-sequence-series.json` | Completed |

## Limits and continuity (17 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 27 | Limits | Introduction to limits and continuity | `limits-and-continuity/01-introduction-to-limits-and-continuity.json` | Pending |
| 28 | Limits | Function: definition and notation | `limits-and-continuity/02-function-definition-and-notation.json` | Pending |
| 29 | Limits | Value of a function at a point | `limits-and-continuity/03-value-of-function-at-a-point.json` | Pending |
| 30 | Limits | Right-hand limit | `limits-and-continuity/04-right-hand-limit.json` | Pending |
| 31 | Limits | Left-hand limit | `limits-and-continuity/05-left-hand-limit.json` | Pending |
| 32 | Limits | Existence of limit | `limits-and-continuity/06-existence-of-limit.json` | Pending |
| 33 | Limits | Standard limits | `limits-and-continuity/07-standard-limits.json` | Pending |
| 34 | Limits | Continuity (intuitive) | `limits-and-continuity/08-continuity-intuitive.json` | Pending |
| 35 | Limits | Continuity (formal) | `limits-and-continuity/09-continuity-formal.json` | Pending |
| 36 | Limits | Removable discontinuity | `limits-and-continuity/10-removable-discontinuity.json` | Pending |
| 37 | Limits | Jump discontinuity | `limits-and-continuity/11-jump-discontinuity.json` | Pending |
| 38 | Limits | Infinite discontinuity | `limits-and-continuity/12-infinite-discontinuity.json` | Pending |
| 39 | Limits | Trigonometric limits | `limits-and-continuity/13-trigonometric-limits.json` | Pending |
| 40 | Limits | Logarithmic and exponential limits | `limits-and-continuity/14-log-exp-limits.json` | Pending |
| 41 | Limits | Exercise 15.1 | `limits-and-continuity/15-exercise-15-1.json` | Pending |
| 42 | Limits | Exercise 15.2 | `limits-and-continuity/16-exercise-15-2.json` | Pending |
| 43 | Limits | Exercise 15.3 | `limits-and-continuity/17-exercise-15-3.json` | Pending |

## Calculus (39 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 44 | Calculus | Limits: function, indeterminate forms, properties | `calculus/01-limits-and-continuity-limits-of-a-function-indeterminate-forms-algebraic-properties-of-limits-wi.json` | Pending |
| 45 | Calculus | Limits of algebraic, trig, exponential, log functions | `calculus/06-limits-of-exponential-and-logarithmic-functions.json` | Pending |
| 46 | Calculus | Continuity and discontinuity types | `calculus/02-continuity-of-a-function-types-of-discontinuity-graphs-of-discontinuous-function.json` | Pending |
| 47 | Calculus | Derivative of a function; algebraic and trig derivatives | `calculus/04-derivatives-derivative-of-a-function-derivatives-of-algebraic-and-trigonometric-functions.json` | Pending |
| 48 | Calculus | Derivatives: inverse trig, exponential, log | `calculus/03-derivatives-derivative-of-a-function-derivatives-of-algebraic-trigonometric-inverse-trigonometri.json` | Pending |
| 49 | Calculus | Geometric interpretation, monotonicity, extreme values | `calculus/05-geometric-interpretation-of-derivative-monotonicity-of-a-function-interval-of-monotonicity-extre.json` | Pending |
| 50 | Calculus | Rules of differentiation; parametric, implicit, higher order | `calculus/04-rules-of-differentiation-derivatives-of-parametric-and-implicit-functions-higher-order-derivativ.json` | Pending |
| 51 | Calculus | Anti-derivatives and integration; substitution and by parts | `calculus/06-anti-derivatives-integration-using-basic-integrals-integration-by-substitution-and-by-parts-meth.json` | Pending |
| 52 | Calculus | Definite integral as area under curve | `calculus/05-the-definite-integral-as-an-area-under-a-curve.json` | Pending |
| 53 | Calculus | L'Hôpital's rule | `calculus/01-lhopital-rule.json` | Pending |
| 54 | Calculus | Limits of a function (extra canonical) | `calculus/01-limits-of-function.json` | Pending |
| 55 | Calculus | Algebraic properties of limits (extra canonical) | `calculus/03-algebraic-properties-of-limits.json` | Pending |
| 56 | Calculus | Limits: algebraic, trig, exp, log (extra canonical) | `calculus/04-limits-algebraic-trig-exp-log.json` | Pending |
| 57 | Calculus | Types of discontinuity (extra canonical) | `calculus/06-types-of-discontinuity.json` | Pending |
| 58 | Calculus | Graphs of discontinuous functions (extra canonical) | `calculus/07-graphs-of-discontinuous-function.json` | Pending |
| 59 | Calculus | Continuity of a function (extra canonical) | `calculus/07-continuity-of-a-function.json` | Pending |
| 60 | Calculus | Limits (extra canonical) | `calculus/limits.json` | Pending |
| 61 | Calculus | Indeterminate forms (extra canonical) | `calculus/indeterminate-forms.json` | Pending |
| 62 | Calculus | Limit drill 5.1 (extra canonical) | `calculus/limit5-01.json` | Pending |
| 63 | Calculus | Limits 5.1 (extra canonical) | `calculus/limits5-1.json` | Pending |
| 64 | Calculus | Limits 5.2 (extra canonical) | `calculus/limits5-2.json` | Pending |
| 65 | Calculus | Limits 5.3 (extra canonical) | `calculus/limits5-3.json` | Pending |
| 66 | Calculus | Derivative definition (extra canonical) | `calculus/08-derivatives-definition.json` | Pending |
| 67 | Calculus | Derivatives: algebraic and trig (extra canonical) | `calculus/09-derivatives-algebraic-trig.json` | Pending |
| 68 | Calculus | Derivatives: inverse trig, exp, log (extra canonical) | `calculus/10-derivatives-inverse-trig-exp-log.json` | Pending |
| 69 | Calculus | Rules of differentiation (extra canonical) | `calculus/11-rules-of-differentiation.json` | Pending |
| 70 | Calculus | Parametric and implicit derivatives (extra canonical) | `calculus/12-parametric-implicit-derivatives.json` | Pending |
| 71 | Calculus | Higher-order derivatives (extra canonical) | `calculus/13-higher-order-derivatives.json` | Pending |
| 72 | Calculus | Geometric interpretation (extra canonical) | `calculus/14-geometric-interpretation-derivative.json` | Pending |
| 73 | Calculus | Monotonicity and extreme values (extra canonical) | `calculus/15-monotonicity-extreme-values.json` | Pending |
| 74 | Calculus | Concavity and points of inflection (extra canonical) | `calculus/16-concavity-points-of-inflection.json` | Pending |
| 75 | Calculus | Anti-derivatives and integration (extra canonical) | `calculus/17-anti-derivatives-integration.json` | Pending |
| 76 | Calculus | Integration: substitution and by parts (extra canonical) | `calculus/18-integration-substitution-parts.json` | Pending |
| 77 | Calculus | Definite integral (extra canonical) | `calculus/19-definite-integral.json` | Pending |
| 78 | Calculus | Area under curve (extra canonical) | `calculus/20-area-under-curve.json` | Pending |
| 79 | Calculus | Area between two curves (extra canonical) | `calculus/21-area-between-two-curves.json` | Pending |
| 80 | Calculus | Limit drill c (extra canonical) | `calculus/limitc.json` | Pending |
| 81 | Calculus | Limits intro (extra canonical) | `calculus/limits-intro.json` | Pending |
| 82 | Calculus | Definite integral, area, between curves (extra canonical) | `calculus/07-the-definite-integral-the-definite-integral-as-an-area-under-the-given-curve-area-between-two-cu.json` | Pending |

## Analytic geometry (9 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 83 | Geometry | Straight line: perpendicular length, angle bisectors | `analytic-geometry/01-straight-line-length-of-perpendicular-from-a-given-point-to-a-given-line-bisectors-of-the-angles.json` | Pending |
| 84 | Geometry | Pair of straight lines: second-degree equation | `analytic-geometry/02-pair-of-straight-lines-general-equation-of-second-degree-in-x-and-y-condition-for-representing-a.json` | Pending |
| 85 | Geometry | Coordinates in space, direction cosines | `analytic-geometry/03-coordinates-in-space-points-in-space-distance-between-two-points-direction-cosines-and-ratios-of.json` | Pending |
| 86 | Geometry | Angle bisector: a1a2 + b1b2 rule | `analytic-geometry/01-angle-bisector-a1a2-plus-b1b2-rule.json` | Pending |
| 87 | Geometry | Angle bisector worked example | `analytic-geometry/02-angle-bisector-worked-example.json` | Pending |
| 88 | Geometry | Angle bisector tan-theta verification | `analytic-geometry/03-angle-bisector-tan-theta-verification.json` | Pending |
| 89 | Geometry | Geometry 9.1 (extra canonical) | `analytic-geometry/geometry-9-1.json` | Pending |
| 90 | Geometry | Angle bisector worked example (dup slug canonical) | `analytic-geometry/02-angle-bisector-worked-example--2.json` | Pending |
| 91 | Geometry | Angle bisector tan-theta (dup slug canonical) | `analytic-geometry/03-angle-bisector-tan-theta-verification--2.json` | Pending |

## Computational methods and mechanics (5 topics)

| # | Unit | Topic | File | Status |
|---|---|---|---|---|
| 92 | Computational | Bisection and Newton–Raphson methods | `computational-methods-or-mechanics/01-numerical-computation-roots-of-algebraic-and-transcendental-equations-bisection-and-newton-raphs.json` | Pending |
| 93 | Computational | Trapezoidal and Simpson's rules | `computational-methods-or-mechanics/02-numerical-integration-trapezoidal-rule-and-simpson-s-rule.json` | Pending |
| 94 | Mechanics | Statics and dynamics overview | `computational-methods-or-mechanics/02-mechanics-statics-and-dynamics.json` | Pending |
| 95 | Mechanics | Statics: forces, parallelogram law, composition | `computational-methods-or-mechanics/03-mechanics-optional-statics-forces-and-resultant-forces-parallelogram-law-of-forces-composition-a.json` | Pending |
| 96 | Mechanics | Dynamics: straight-line motion, uniform acceleration | `computational-methods-or-mechanics/04-mechanics-optional-dynamics-motion-of-particle-in-a-straight-line-motion-with-uniform-accelerati.json` | Pending |

## Progress log

- Session 5 - Algebra companions (rows 22, 25, 26, 3/3): function-domain-range, sequence-series and minors-cofactors-determinants companion canonicals upgraded with theorem-grade fields mirroring their parents (domain bans, S_inf licence, adjoint identity). All NEB-style practice. Build 101 entries, validator 0 broken. ALGEBRA UNIT COMPLETE (14/14).

- Session 4 - Algebra part 1 (rows 13-23, 11/14): logic and set (truth tables, De Morgan, membership-table proofs; NEB 2023 verified PYQ set operations, NEB 2022 verified PYQs distributive law + a^3+b^3+c^3=3abc MCQ); real numbers/intervals/absolute value (triangle inequality, delta-window); function domain-range-inverse (inverse theorem, reflection in y = x); composite and algebraic functions (vertex theorem, rational asymptote rules, squaring trap; NEB 2024 verified PYQ x^2-5x+6=0, NEB 2023 verified PYQ 2sqrt(x+1)=x-3); curve sketching (parity, period shift, monotone=>invertible); AP/GP/HP (S_inf licence |r|<1, AM-GM-HM, special sums); series techniques (telescoping, shift trick); matrices (transpose/inverse reversal laws; NEB 2023 verified PYQ det+inverse of [[2,1],[3,4]]); minors/cofactors/adjoint (adjoint identity, Cramer); complex numbers (conjugate theorems, modulus, Argand); quadratic (discriminant regimes, Viete). Rows 24-26 remain.

- Session 3 - Statistics and Probability (rows 11-12, 2/2): dispersion (range, mean deviation, variance via computational identity sigma^2 = sum xi^2/n - xbar^2, SD, shift invariance, C.V., Karl Pearson skewness; NEB 2024 verified PYQ mean 25 / SD 9.41 of 10 marks, NEB 2023 verified PYQ variance of first 10 naturals 8.25) and probability (classical definition, axioms, addition law, conditional probability, multiplication law, independence, total probability, Bayes; NEB 2022 verified PYQ P(A u B) = 0.8). Build 101 entries, validator 0 broken.

- Session 2 - Vectors (rows 4-10, 7/7): vector algebra (triangle/parallelogram laws, scalar multiplication, section formula; NEB 2024 verified PYQ unit vector, NEB 2022 verified PYQ internal division 2:3); linear combination and dependence (determinant test, zero-vector lemma); collinear/coplanar (cross and triple-product tests, connecting-vector rule for points); dot product (perpendicularity criterion, angle theorem, projections; NEB 2024 verified PYQs a.b=-3, projection 4/sqrt5, angle 60 deg; NEB 2023 verified PYQ -8/3 MCQ); cross product (anticommutativity, parallel criterion, area theorems, Lagrange identity; NEB 2024 verified PYQs |a x b|=5sqrt3 + parallelogram area 5, NEB 2020 verified PYQ unit perpendicular (i-j)/sqrt2, NEB 2021 verified PYQ 2sqrt42 via Lagrange); scalar/vector triple products (volume theorem, cyclic invariance, BAC-CAB; NEB 2024 verified PYQ definition+significance); applications (work F.d, torque r x F, angular momentum conservation). Nine verified PYQs assigned. Build 101 entries, validator 0 broken.

- Session 1 - Trigonometry (rows 1-3, 3/3): ratios and identities (fundamental identity family, addition/double/half-angle theorems, transformation formulas, conditional r-identity; NEB 2021 verified PYQ standard values, NEB 2020 verified PYQ cosine-series telescoping proof); equations and general values (general value theorems sin/cos/tan, principal values, filtering, squaring trap; NEB 2024 verified PYQ 2sin^2-sin-1=0, NEB 2022 verified PYQ cos2th=costh); inverse circular functions (principal branches, compositions, complement theorems, tan^-1 addition theorem; NEB 2024 verified PYQ sin^-1(-1/2), NEB 2023 verified PYQ cos^-1+sin^-1). Four verified PYQs assigned. Build 101 entries, validator 0 broken.

- Plan created. No topics enriched yet.
