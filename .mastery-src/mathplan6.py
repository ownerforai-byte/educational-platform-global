import re, io

P = 'docs/guides/mathematics-xi-mastery-plan.md'
s = io.open(P, 'r', encoding='utf-8').read()

rows = {
 44: ("Calculus", "Limits: function, indeterminate forms, properties", "calculus/01-limits-and-continuity-limits-of-a-function-indeterminate-forms-algebraic-properties-of-limits-wi.json",
      "mx42: limit definition, seven indeterminate forms, algebraic properties + squeeze + composition; PYQ NEB 2023 (x^2-4)/(x-2) = 4"),
 45: ("Calculus", "Limits of algebraic, trig, exponential, log functions", "calculus/06-limits-of-exponential-and-logarithmic-functions.json",
      "mx43: family grammars (factor/conjugate, trig stars, e/ln stars), universal recipe, x-bridge; PYQ NEB 2024 sin 3x/x = 3"),
 46: ("Calculus", "Continuity and discontinuity types", "calculus/02-continuity-of-a-function-types-of-discontinuity-graphs-of-discontinuous-function.json",
      "mx44: three-part test, four-species taxonomy with graphs, workflow; PYQ NEB 2024 continuity definition + x^2 at 1"),
 47: ("Calculus", "Derivative of a function; algebraic and trig derivatives", "calculus/04-derivatives-derivative-of-a-function-derivatives-of-algebraic-and-trigonometric-functions.json",
      "mx45: first principles, diff => continuity, power/surd/trig tables; PYQs NEB 2024 dy/dx polynomial, NEB 2021 first-principles x^(1/3)"),
 48: ("Calculus", "Derivatives: inverse trig, exponential, log", "calculus/03-derivatives-derivative-of-a-function-derivatives-of-algebraic-trigonometric-inverse-trigonometri.json",
      "mx46: inverse-engine rule, extended table, chain rule wrapping; PYQs NEB 2020 log_a(sin x) MCQ, NEB 2022 ln(sin x) = cot x"),
 49: ("Calculus", "Geometric interpretation, monotonicity, extreme values", "calculus/05-geometric-interpretation-of-derivative-monotonicity-of-a-function-interval-of-monotonicity-extre.json",
      "mx47: tangent slope, monotonicity theorem (MVT), critical points, 1st/2nd-deriv tests, closed-interval method; PYQ NEB 2024 cubic stationary points"),
 50: ("Calculus", "Rules of differentiation; parametric, implicit, higher order", "calculus/04-rules-of-differentiation-derivatives-of-parametric-and-implicit-functions-higher-order-derivativ.json",
      "mx48: product/quotient/chain, parametric + trap, implicit, log-diff, Leibniz; PYQs NEB 2023 product rule + (sin x)^cos x, NEB 2022 x^x trio"),
 51: ("Calculus", "Anti-derivatives and integration; substitution and by parts", "calculus/06-anti-derivatives-integration-using-basic-integrals-integration-by-substitution-and-by-parts-meth.json",
      "mx49: anti-derivative family +C, basic table, substitution workhorses, parts + LIATE; PYQ NEB 2023 integral 3x^2+2x-1"),
 52: ("Calculus", "Definite integral as area under curve", "calculus/05-the-definite-integral-as-an-area-under-a-curve.json",
      "mx50: Riemann sums, signed area, properties, FTC Parts 1-2; PYQ NEB 2022 integral 0 to 1 x^2 dx = 1/3"),
 53: ("Calculus", "L'Hôpital's rule", "calculus/01-lhopital-rule.json",
      "mx51: rule + hypotheses, Cauchy MVT engine, form conversions, e-ladder, failure case; NEB-style practice"),
}

n_total = 0
for num, (unit, topic, path, note) in rows.items():
    new = "| %d | %s | %s | `%s` | Done \u2014 %s |" % (num, unit, topic, path, note)
    pat = r"\| %d \|.*" % num
    s2, n = re.subn(pat, new.replace('\\', '\\\\'), s, count=1)
    assert n == 1, "row %d not found" % num
    s = s2
    n_total += n

io.open(P, 'w', encoding='utf-8', newline='\n').write(s)
print("updated rows:", n_total)
