@@notes@@
## 1. Topic Introduction — Identities Are the Grammar of Trigonometry

A trigonometric **identity** is an equation true for **every** admissible angle — not solved, but *used*. The syllabus theorem set: the **fundamental identity** sin²θ + cos²θ = 1, the **addition formulas**, the **double/half-angle formulas**, the **transformation formulas** (sum ↔ product), and the **conditional identity** a·sinθ + b·cosθ = r·sin(θ + φ). Each is a working tool with a derivation you must be able to reproduce.

%%%
## 2. Fundamental Concepts

### 2.1 The fundamental identity and its family

- **Theorem (Pythagorean identity):** for every angle θ, **sin²θ + cos²θ = 1**.
- Proof idea: place θ in the unit circle — the terminal point is (cos θ, sin θ); the radius is 1, so x² + y² = 1 gives the identity. Divide through by cos²θ (cos θ ≠ 0) to get **1 + tan²θ = sec²θ**; divide by sin²θ to get **1 + cot²θ = cosec²θ**.
- These three are the *only* identities needed to convert any expression into sines and cosines.

### 2.2 Compound (addition) formulas

- **sin(A + B) = sin A cos B + cos A sin B**; **sin(A − B) = sin A cos B − cos A sin B**.
- **cos(A + B) = cos A cos B − sin A sin B**; **cos(A − B) = cos A cos B + sin A sin B**.
- **tan(A + B) = (tan A + tan B)/(1 − tan A tan B)**; **tan(A − B) = (tan A − tan B)/(1 + tan A tan B)** (when defined).
- Proof idea for cos(A − B): rotate the points (cos A, sin A) and (cos B, sin B) on the unit circle; equal chord lengths force cos(A − B) = cos A cos B + sin A sin B. The rest follow by replacing B → −B and dividing.

### 2.3 Double and half angles

- **sin 2θ = 2 sin θ cos θ**; **cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1**; **tan 2θ = 2tanθ/(1 − tan²θ)**.
- Half-angle: **sin²(θ/2) = (1 − cos θ)/2**, **cos²(θ/2) = (1 + cos θ)/2** — the "power-reduction" reading is what solves integrals and equations.

### 2.4 Transformation formulas (sum ↔ product)

- **sin C + sin D = 2 sin((C+D)/2) cos((C−D)/2)**; **sin C − sin D = 2 cos((C+D)/2) sin((C−D)/2)**.
- **cos C + cos D = 2 cos((C+D)/2) cos((C−D)/2)**; **cos C − cos D = −2 sin((C+D)/2) sin((C−D)/2)**.
- Product → sum: **2 sin A cos B = sin(A+B) + sin(A−B)**, and its three siblings.

### 2.5 The conditional identity (r-formula)

- **Theorem:** a sin θ + b cos θ = **r sin(θ + φ)** where **r = √(a² + b²)**, **tan φ = b/a**.
- Proof idea: divide by r and match coefficients against the addition formula; existence of φ with the right sin and cos is guaranteed by (a/r)² + (b/r)² = 1.
- Consequence: the expression always lies in **[−r, r]** — the amplitude idea.

%%%
## 3. Scientific Definitions

| Term | Scientific meaning | Example |
|---|---|---|
| **Identity** | Equation holding for all admissible θ | sin²θ + cos²θ = 1 |
| **Conditional identity** | a sinθ + b cosθ rewritten as a single sine with r, φ | 3sinθ + 4cosθ = 5sin(θ + 53.13°) |
| **Transformation formula** | Converts sums of trig functions to products and back | sin C + sin D = 2 sin((C+D)/2)cos((C−D)/2) |
| **Power reduction** | Half-angle formulas read as expressions for sin², cos² | cos²(θ/2) = (1 + cos θ)/2 |

%%%
## 4. Detailed Explanation

### 4.1 Why identities are "proved", not "solved"

- A proof starts from one side and transforms it with known identities into the other; no values of θ are ever substituted. Solving an equation, by contrast, finds *which* θ make it true — the distinction is examinable.

### 4.2 Strategy for proving identities

- Work on the **more complicated side**; convert everything to **sines and cosines**; look for **sin² + cos² = 1** substitutions; factor and regroup. If both sides resist, transform each to a common third expression.

### 4.3 Sign discipline in half-angles

- sin(θ/2) = ±√((1−cosθ)/2): the sign follows the **quadrant of θ/2**, not of θ. Deciding the sign is part of the answer.

%%%
## 5. Comparison Tables

**The three Pythagorean identities and their rearrangements**

| Identity | Solved for sin² | Solved for cos² |
|---|---|---|
| sin²θ + cos²θ = 1 | sin²θ = 1 − cos²θ | cos²θ = 1 − sin²θ |
| 1 + tan²θ = sec²θ | — | sec²θ − tan²θ = 1 |
| 1 + cot²θ = cosec²θ | cosec²θ − cot²θ = 1 | — |

%%%
## 6. Common Confusions

**cos(A − B) has a plus sign:** cos A cos B **+** sin A sin B — students carry the minus over from the argument.
%%%
**tan(A ± B) denominators:** minus in the denominator for the **sum**, plus for the **difference** — the reverse of intuition.
%%%
**Half-angle sign:** √((1−cosθ)/2) needs the quadrant of θ/2 — never quote the ± silently.

%%%
## 7. Exam Application

**NEB 2021 (verified PYQ): sin²30° + cos²60° − tan²45° = ?** — sin 30° = 1/2 so sin²30° = 1/4; cos 60° = 1/2 so cos²60° = 1/4; tan 45° = 1 so tan²45° = 1. Sum: 1/4 + 1/4 − 1 = **−1/2 → option (d)**. The question is the fundamental identity's values in disguise — standard-table values are assumed knowledge.
%%%
**NEB 2020 (verified PYQ): Prove that cos θ + cos 3θ + cos 5θ + ⋯ + cos(2n−1)θ = sin 2nθ / (2 sin θ).** — Group consecutive terms and apply **cos C + cos D = 2 cos((C+D)/2) cos((C−D)/2)**: cos θ + cos 3θ = 2 cos 2θ cos θ; then (2 cos 2θ cos θ + cos 5θ) treated as (cos θ + cos 5θ) scaled — better, use the standard telescoping: multiply the whole sum by **2 sin θ**: 2 sin θ cos(2k−1)θ = sin(2kθ) − sin((2k−2)θ) by the product→sum formula **2 sin A cos B = sin(A+B) + sin(A−B)** with A = θ, B = (2k−1)θ giving sin(2kθ) − sin((2k−2)θ). The sum **telescopes**: every intermediate sine cancels, leaving sin 2nθ − sin 0 = sin 2nθ. Hence the original sum equals **sin 2nθ / (2 sin θ)**, provided sin θ ≠ 0. ∎
%%%
**NEB-style (3m): Express 3 sin θ + 4 cos θ in the form r sin(θ + φ) and state its maximum value.** — **r = √(3² + 4²) = 5**; **tan φ = 4/3 ⇒ φ ≈ 53.13°**. So **3 sin θ + 4 cos θ = 5 sin(θ + 53.13°)**. Since a sine never exceeds 1 in magnitude, the expression's **maximum is r = 5** (at θ + φ = 90°) and its **minimum is −5**. The r-formula converts any a·sin + b·cos pair into one sine whose amplitude is √(a² + b²).

@@keyPoints@@
Fundamental identity: sin^2 th + cos^2 th = 1; dividing gives 1 + tan^2 th = sec^2 th and 1 + cot^2 th = cosec^2 th. Addition formulas: sin(A+B) = sinA cosB + cosA sinB; cos(A-B) = cosA cosB + sinA sinB; tan(A+B) = (tanA+tanB)/(1 - tanA tanB). Double angle: sin2th = 2 sin th cos th; cos2th = cos^2 - sin^2 = 1 - 2sin^2 = 2cos^2 - 1; tan2th = 2tan/(1-tan^2). Half angle: sin^2(th/2) = (1-cos th)/2, cos^2(th/2) = (1+cos th)/2 - sign follows quadrant of th/2. Transformations: sinC + sinD = 2 sin((C+D)/2) cos((C-D)/2); cosC - cosD = -2 sin((C+D)/2) sin((C-D)/2); 2 sinA cosB = sin(A+B) + sin(A-B). Conditional identity: a sin th + b cos th = r sin(th + ph), r = sqrt(a^2+b^2), tan ph = b/a; range [-r, r].
@@importantConcepts@@
An identity is used, not solved: the proof walks one side into the other with known identities — no value of theta is ever substituted.
@@examples@@
***The telescoping trick*** — multiply cos th + cos 3th + ... + cos(2n-1)th by 2 sin th: each product becomes a difference of sines and the middle terms cancel, leaving sin 2nth (NEB 2020's proof in one move).
@@universalFacts@@
Every identity in the syllabus descends from one geometric fact: the unit circle point (cos th, sin th) lies at distance 1 from the origin.
@@importantStatements@@
"a sin th + b cos th = r sin(th + ph) with r = sqrt(a^2 + b^2), tan ph = b/a; hence the expression ranges over [-r, r]."
@@importantNotes@@
Verified PYQs: NEB 2021 (standard values evaluation), NEB 2020 (cosine series proof) — assigned to this row. Other items are NEB-style practice.
@@examShortTricks@@
Prove identities: start from the complicated side, convert to sines and cosines, hunt sin^2 + cos^2 = 1. cos(A-B) keeps a PLUS sign. tan(A+B) has minus in the denominator. r-formula: r = sqrt(a^2+b^2), max = r, min = -r.
@@examNotes@@
For the NEB 2020 series proof, name the two formulas you use (product-to-sum and telescoping) — method marks live in the naming.
@@formulas@@
- sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ
- sin(A±B) = sin A cos B ± cos A sin B; cos(A±B) = cos A cos B ∓ sin A sin B
- tan(A±B) = (tan A ± tan B)/(1 ∓ tan A tan B)
- sin 2θ = 2 sin θ cos θ; cos 2θ = 1 − 2sin²θ = 2cos²θ − 1; tan 2θ = 2tanθ/(1 − tan²θ)
- sin C ± sin D = 2 sin((C±D)/2) cos((C∓D)/2); cos C + cos D = 2cos((C+D)/2)cos((C−D)/2); cos C − cos D = −2sin((C+D)/2)sin((C−D)/2)
- a sinθ + b cosθ = √(a²+b²) sin(θ + φ), tan φ = b/a
@@practice@@
Prove that cos(A − B) = cos A cos B + sin A sin B using the unit circle.
%%%
Express 3 sin θ + 4 cos θ as r sin(θ + φ) and find its range.
%%%
Prove cos θ + cos 3θ + ⋯ + cos(2n−1)θ = sin 2nθ/(2 sin θ).
@@practiceQuestions@@
**NEB 2021 (verified PYQ): Evaluate sin²30° + cos²60° − tan²45°. (1m)** — From the standard table: **sin 30° = 1/2**, **cos 60° = 1/2**, **tan 45° = 1**. Therefore sin²30° = 1/4, cos²60° = 1/4, tan²45° = 1, and the expression equals **1/4 + 1/4 − 1 = −1/2** — **option (d)**. (The evaluation is a direct application of exact standard values; note that sin²30° = cos²60° because 30° and 60° are complementary.)
%%%
**NEB 2020 (verified PYQ): Prove that cos θ + cos 3θ + cos 5θ + ⋯ + cos(2n−1)θ = sin 2nθ / (2 sin θ). (3m)** — **Setup:** let S = cos θ + cos 3θ + ⋯ + cos(2n−1)θ and multiply both sides by **2 sin θ**. **Product-to-sum:** for each term, 2 sin θ·cos(2k−1)θ = sin(θ + (2k−1)θ) + sin(θ − (2k−1)θ) = **sin 2kθ − sin(2k−2)θ**, using 2 sin A cos B = sin(A+B) + sin(A−B) with A = θ, B = (2k−1)θ (the second sine is negative since sin(−x) = −sin x). **Telescoping:** 2 sin θ·S = [sin 2θ − sin 0] + [sin 4θ − sin 2θ] + ⋯ + [sin 2nθ − sin(2n−2)θ]. Every intermediate term cancels, leaving **2 sin θ·S = sin 2nθ − sin 0 = sin 2nθ**. **Conclusion:** S = **sin 2nθ/(2 sin θ)**, valid whenever sin θ ≠ 0 (otherwise the original series is 0·S and the formula is read by limit). ∎
%%%
**NEB-style (3m): Express 3 sin θ + 4 cos θ in the form r sin(θ + φ) and state its maximum and minimum values.** — Match **3 sin θ + 4 cos θ = r sin(θ + φ) = r sin θ cos φ + r cos θ sin φ**. Comparing coefficients: **r cos φ = 3** and **r sin φ = 4**. Squaring and adding: **r² = 9 + 16 = 25 ⇒ r = 5**. Dividing: **tan φ = 4/3 ⇒ φ ≈ 53.13°** (first quadrant, both coefficients positive). Hence **3 sin θ + 4 cos θ = 5 sin(θ + 53.13°)**. Since −1 ≤ sin ≤ 1, the expression lies in **[−5, 5]**: **maximum 5** when θ + 53.13° = 90°, **minimum −5** when θ + 53.13° = 270°. The r-formula turns any linear sine–cosine pair into a single sine of amplitude √(a² + b²).
@@summary@@
Trigonometric identities are the working grammar: true for **every** admissible angle, proved by transformation, never solved. Everything descends from the **unit circle**: sin²θ + cos²θ = 1, and by division 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ. The **addition formulas** (cos(A − B) = cos A cos B + sin A sin B from equal chords) generate **double angles** (sin 2θ = 2 sinθ cosθ; cos 2θ in three forms) and **half angles** (sin²(θ/2) = (1 − cosθ)/2, sign by quadrant of θ/2). **Transformation formulas** trade sums for products and products for sums — the tool behind NEB 2020's telescoping proof of cos θ + cos 3θ + ⋯ = sin 2nθ/(2 sin θ). Finally the **conditional identity** a sinθ + b cosθ = r sin(θ + φ), r = √(a² + b²), tan φ = b/a, compresses any sine–cosine pair into one sine of amplitude r — maximum r, minimum −r.
