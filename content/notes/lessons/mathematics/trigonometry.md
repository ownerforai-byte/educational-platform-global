# Trigonometry

Class 11 trigonometry moves beyond identities into two powerful ideas: inverse circular functions and trigonometric equations with general values. Inverse functions answer the question "which angle gives this value?", while general solutions capture every angle satisfying an equation, not just one. Both are staples of NEB Class 11 exams and prerequisites for calculus applications later.

## Inverse Circular Functions

Because trigonometric functions are periodic they are many-to-one, so their inverses are defined only on restricted **principal value branches**, chosen to keep outputs unique.

| Function | Domain | Principal range | Identity partner |
| --- | --- | --- | --- |
| sin⁻¹x | [−1, 1] | [−π/2, π/2] | sin⁻¹x + cos⁻¹x = π/2 |
| cos⁻¹x | [−1, 1] | [0, π] | tan⁻¹x + cot⁻¹x = π/2 |
| tan⁻¹x | ℝ | (−π/2, π/2) | sec⁻¹x + cosec⁻¹x = π/2 |

Key consequences include sin⁻¹(−x) = −sin⁻¹x, cos⁻¹(−x) = π − cos⁻¹x, and tan⁻¹x + tan⁻¹y = tan⁻¹((x + y)/(1 − xy)) when xy < 1. Always check which branch an answer belongs to before quoting it.

## General Values of Trigonometric Equations

| Equation | General solution |
| --- | --- |
| sin θ = 0 | θ = nπ |
| cos θ = 0 | θ = (2n + 1)π/2 |
| tan θ = 0 | θ = nπ |
| sin²θ = sin²α | θ = nπ ± α |
| cos²θ = cos²α | θ = 2nπ ± α |
| tan²θ = tan²α | θ = nπ ± α |

Here n is any integer (n ∈ ℤ). The squared forms hold because both the function values and the periodicity combine to give the ± family of angles.

## Worked Solution

```text
Question: Solve 2sin^2θ = 1 for all real θ.

Step 1: Divide by 2          → sin^2θ = 1/2
Step 2: Take the square root → sinθ = ±1/√2
Step 3: Recognise reference angle α = π/4 since sin(π/4) = 1/√2
Step 4: Apply the squared-sine rule:
        θ = nπ ± π/4 , n ∈ ℤ

Check: θ = π/4 → sin^2θ = 1/2 ✓ ; θ = -π/4 → same ✓
```

In degree form this reads θ = 180°·n ± 45°, illustrating why radians are preferred: the pattern stays clean and calculator-free.

## Key points

- Inverse functions exist only after restricting domains; principal branches guarantee uniqueness.
- Memorise the three ranges: [−π/2, π/2], [0, π], (−π/2, π/2).
- sin⁻¹x + cos⁻¹x = π/2 holds for every x in [−1, 1].
- General solutions need "n ∈ ℤ"; omitting it makes the answer just one principal solution.
- Squared-equation rules produce the ± families; unsquared sine/tangent equations use nπ + α style forms.

## Common mistakes

- Evaluating cos⁻¹(negative) as a negative angle instead of π − cos⁻¹x.
- Mixing degrees and radians inside one solution line.
- Giving θ = π/4 alone when the question demands the full general solution.
- Applying θ = nπ ± α to cos²θ (correct rule is 2nπ ± α).
- Cancelling tan on both sides of tan A = tan B without writing the general relation.
