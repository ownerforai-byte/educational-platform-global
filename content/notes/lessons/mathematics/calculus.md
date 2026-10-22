# Calculus

Calculus is mathematics of change: differentiation measures instantaneous rates while integration accumulates quantities. The NEB Class 11 syllabus devotes its largest allocation (48 hours) to this unit, covering limits, continuity, derivatives of all standard functions, applications such as monotonicity and extreme values, and integration by substitution and parts up to definite integrals as areas under curves.

## Limits and Continuity

A limit describes the value a function approaches. Indeterminate forms such as 0/0 or ∞/∞ demand algebraic simplification or standard results like lim(x→0) sin x / x = 1 and lim(x→0) (1 + x)^(1/x) = e. A function is continuous at x = a when the limit equals the function value there; discontinuities may be removable (a hole) or non-removable (jumps).

## Derivatives

The derivative f′(x) = lim(h→0) [f(x+h) − f(x)]/h gives the slope of the tangent. Core rules:

| Function f(x) | Derivative f′(x) | Rule used |
| --- | --- | --- |
| xⁿ | n·xⁿ⁻¹ | power rule |
| sin x | cos x | definition/standard |
| eˣ | eˣ | exponential rule |
| ln x | 1/x | logarithmic rule |
| u·v | u′v + uv′ | product rule |
| u/v | (u′v − uv′)/v² | quotient rule |
| f(g(x)) | f′(g)·g′(x) | chain rule |

Applications follow signs: f′ > 0 means increasing, f′ < 0 decreasing, f′ = 0 flags stationary points, and f″ decides concavity — f″ < 0 a maximum, f″ > 0 a minimum, with inflection where concavity flips.

## Integration

Integration reverses differentiation. Basic integrals include ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ −1), ∫dx/x = ln|x| + C and ∫eˣ dx = eˣ + C. Substitution undoes the chain rule; integration by parts (∫u·v′ dx = uv − ∫u′·v dx) handles products, choosing u by the LIATE preference order. The definite integral ∫ₐᵇ f(x) dx evaluates to F(b) − F(a) and equals the signed area between curve and axis.

## Worked Calculation

```text
Question: Locate the extreme values of f(x) = x^3 - 3x^2.

Step 1: f'(x) = 3x^2 - 6x = 3x(x - 2)
Step 2: Stationary points where f' = 0 → x = 0 or x = 2
Step 3: Second derivative f''(x) = 6x - 6
        At x = 0: f'' = -6 < 0 → local MAXIMUM
        At x = 2: f'' = +6 > 0 → local MINIMUM
Step 4: Values: f(0) = 0 ; f(2) = 8 - 12 = -4

Answer: local max 0 at x=0; local min -4 at x=2.
```

## Key points

- Always test indeterminate limits — direct substitution failing signals 0/0 work is needed.
- Differentiability implies continuity, but continuity alone never guarantees differentiability.
- Every indefinite integral carries "+ C"; definite integrals do not.
- Extreme-value problems follow the pipeline: differentiate → solve f′ = 0 → classify with f″.
- By parts is chosen when the integrand is a product of unlike function types (polynomial × trig/exponential).

## Common mistakes

- Forgetting the inner derivative when applying the chain rule (d/dx sin 2x = 2cos 2x).
- Omitting the constant of integration in indefinite integrals.
- Declaring a maximum or minimum without checking the second derivative or sign change.
- Treating ∫ₐᵇ as area even when part of the curve lies below the axis (split and take modulus).
- Misapplying the quotient rule's numerator order, which changes the sign of the answer.
