# Algebra

Algebra is the largest unit of the NEB Class 11 Mathematics syllabus, and its tools appear everywhere in later mathematics. This lesson concentrates on two exam-favourite strands — quadratic equations and sequences and series — and closes with the logic and set ideas that underpin mathematical reasoning throughout the course.

## Quadratic Equations

For ax² + bx + c = 0 (a ≠ 0), the roots are given by the quadratic formula x = (−b ± √(b² − 4ac)) / 2a, and the discriminant D = b² − 4ac classifies the roots without solving.

| Discriminant | Nature of roots | Graph comment |
| --- | --- | --- |
| D > 0 and perfect square | Real, distinct, rational | Cuts x-axis at two points |
| D > 0, not a square | Real, distinct, irrational | Cuts x-axis at two points |
| D = 0 | Real, equal (repeated) | Touches x-axis |
| D < 0 | Complex conjugate pair | Never meets x-axis |

If α and β are the roots, then **sum** α + β = −b/a and **product** αβ = c/a. These symmetric relations let you reconstruct the equation from its roots: x² − (α + β)x + αβ = 0. Problems often ask for α² + β² = (α + β)² − 2αβ or 1/α + 1/β = (α + β)/αβ — always express them through sum and product rather than solving explicitly.

## Sequences and Series

An arithmetic progression has common difference d with aₙ = a + (n − 1)d and Sₙ = n/2 [2a + (n − 1)d]. A geometric progression has common ratio r with aₙ = arⁿ⁻¹ and Sₙ = a(rⁿ − 1)/(r − 1); when |r| < 1 the infinite series converges to S∞ = a/(1 − r). For any positive numbers, AM ≥ GM ≥ HM, with equality only when all terms are equal; for two numbers G² = AH.

## Worked Calculation

```text
Question: Find the roots of 2x^2 - 5x + 3 = 0 and verify the
root-coefficient relations.

Step 1: D = b^2 - 4ac = (-5)^2 - 4(2)(3) = 25 - 24 = 1 > 0
        so the roots are real, distinct and rational.
Step 2: x = (5 ± √1) / 4  →  x = 6/4 = 3/2  or  x = 4/4 = 1
Step 3: Check sum:     3/2 + 1   = 5/2  = -(-5)/2  ✓
Step 4: Check product: (3/2)(1)  = 3/2  = 3/2      ✓

Answer: roots are 1 and 3/2.
```

## Key points

- Always compute D first: it tells you whether factoring will even work over the rationals.
- Sum = −b/a and product = c/a — the signs are the most-tested detail in this unit.
- The equation formed from roots uses minus the sum: x² − Sx + P = 0.
- An infinite GP sums only when |r| < 1.
- Truth tables connect set operations (∪, ∩, ′) to logical connectives (∨, ∧, ¬) via De Morgan's laws.

## Common mistakes

- Writing the sum of roots as b/a instead of −b/a.
- Forgetting that a quadratic requires a ≠ 0.
- Using S∞ = a/(1 − r) when |r| ≥ 1, where the series diverges.
- Confusing arithmetic mean formulas for n terms versus between two inserted means.
- Dropping the ± sign when applying the quadratic formula, losing one root.
