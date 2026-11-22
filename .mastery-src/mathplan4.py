import io, re
p = "docs/guides/mathematics-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
anchor = "- Session 3 - Statistics"
i = s.find(anchor)
assert i > 0
note = ("- Session 4 - Algebra part 1 (rows 13-23, 11/14): logic and set (truth tables, De Morgan, membership-table proofs; "
 "NEB 2023 verified PYQ set operations, NEB 2022 verified PYQs distributive law + a^3+b^3+c^3=3abc MCQ); real numbers/"
 "intervals/absolute value (triangle inequality, delta-window); function domain-range-inverse (inverse theorem, reflection "
 "in y = x); composite and algebraic functions (vertex theorem, rational asymptote rules, squaring trap; NEB 2024 verified "
 "PYQ x^2-5x+6=0, NEB 2023 verified PYQ 2sqrt(x+1)=x-3); curve sketching (parity, period shift, monotone=>invertible); "
 "AP/GP/HP (S_inf licence |r|<1, AM-GM-HM, special sums); series techniques (telescoping, shift trick); matrices "
 "(transpose/inverse reversal laws; NEB 2023 verified PYQ det+inverse of [[2,1],[3,4]]); minors/cofactors/adjoint "
 "(adjoint identity, Cramer); complex numbers (conjugate theorems, modulus, Argand); quadratic (discriminant regimes, "
 "Viete). Rows 24-26 remain.\n")
s = s[:i] + note + "\n" + s[i:]
ROWS = {
 13: "| 13 | Algebra | Logic and set: statements, connectives, truth tables, set-operation theorems | `algebra/01-logic-and-set-statements-logical-connectives-truth-tables-theorems-based-on-set-operations.json` | Completed |",
 14: "| 14 | Algebra | Real numbers, intervals, absolute value | `algebra/02-real-numbers-geometric-representation-of-real-numbers-interval-absolute-value.json` | Completed |",
 15: "| 15 | Algebra | Function: domain, range, inverse | `algebra/01-function-domain-and-range-of-a-function-inverse-function.json` | Completed |",
 16: "| 16 | Algebra | Function: composite, algebraic, linear, quadratic | `algebra/03-function-domain-and-range-of-a-function-inverse-function-composite-function-algebraic-linear-qua.json` | Completed |",
 17: "| 17 | Algebra | Curve sketching: symmetry, periodicity, monotonicity | `algebra/04-curve-sketching-odd-and-even-functions-periodicity-symmetry-about-origin-x-and-y-axis-monotonici.json` | Completed |",
 18: "| 18 | Algebra | Sequence and series: AP, GP, HP | `algebra/02-sequence-and-series-arithmetic-geometric-harmonic-sequences.json` | Completed |",
 19: "| 19 | Algebra | Sequence and series: properties, AM–GM–HM | `algebra/05-sequence-and-series-arithmetic-geometric-harmonic-sequences-and-series-and-their-properties-a-m-.json` | Completed |",
 20: "| 20 | Algebra | Matrices and determinants: transpose, inverse | `algebra/03-matrices-and-determinants-transpose-properties-inverse.json` | Completed |",
 21: "| 21 | Algebra | Matrices and determinants: minors, cofactors, adjoint | `algebra/06-matrices-and-determinants-transpose-of-a-matrix-and-its-properties-minors-and-cofactors-adjoint-.json` | Completed |",
 23: "| 23 | Algebra | Quadratic equation: nature of roots, root–coefficient relation | `algebra/07-quadratic-equation-nature-and-roots-of-a-quadratic-equation-relation-between-roots-and-coefficie.json` | Completed |",
 24: "| 24 | Algebra | Complex number: algebra, modulus, geometric representation | `algebra/08-complex-number-imaginary-unit-algebra-of-complex-numbers-geometric-representation-absolute-modul.json` | Completed |",
}
for r, row in ROWS.items():
    pat = re.compile(r"\| %d \|.*" % r)
    s, n = pat.subn(row.replace("\\", "\\\\"), s)
    assert n == 1, r
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("math plan: session 4 note + algebra rows 13-21, 23, 24 completed")
