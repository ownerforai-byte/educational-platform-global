@@notes@@
## 1. Topic Introduction — Volume in One Number

The **scalar triple product** [a b c] = a·(b × c) turns three vectors into a signed volume; the **vector triple product** a × (b × c) stays a vector and obeys the **BAC–CAB rule**. Their theorems: the determinant form, the coplanarity criterion, the volume theorem, and the two expansion rules.

%%%
## 2. Fundamental Concepts

### 2.1 Scalar triple product

- **Definition:** [a b c] = a·(b × c) — a scalar.
- **Determinant form:** [a b c] = |a₁ a₂ a₃; b₁ b₂ b₃; c₁ c₂ c₃|.
- **Theorem (volume):** |[a b c]| = volume of the **parallelepiped** with coterminous edges a, b, c; **one-sixth** of it is the tetrahedron's volume.
- **Theorem (coplanarity):** a, b, c are coplanar ⟺ **[a b c] = 0**.

### 2.2 Cyclic invariance

- **Theorem:** [a b c] = [b c a] = [c a b] (cyclic rotations preserve value); swapping any two vectors **changes the sign**: [b a c] = −[a b c].
- The dot and cross may be interchanged: **a·(b × c) = (a × b)·c**.

### 2.3 Vector triple product

- **Definition:** a × (b × c) — a vector perpendicular to a and to (b × c).
- **Theorem (BAC–CAB):** **a × (b × c) = (a·c)b − (a·b)c**; and (a × b) × c = (a·c)b − (b·c)a — note the different bracketing gives a different result: the vector triple product is **not associative**.
- Proof idea: expand b × c in components, multiply by a, and collect — or verify both sides agree on the basis î, ĵ, k̂ and use linearity.

### 2.4 Tetrahedron volume

- **Theorem:** the tetrahedron with coterminous edges a, b, c has volume **⅙|[a b c]|** — the pyramid is one-sixth of the box.

%%%
## 3. Scientific Definitions

| Term | Scientific meaning | Example |
|---|---|---|
| **Scalar triple product** | a·(b × c) — signed volume | [î ĵ k̂] = 1 |
| **Cyclic invariance** | Rotating the triple keeps the value | [a b c] = [b c a] |
| **Vector triple product** | a × (b × c) — obeys BAC–CAB | not associative |
| **Parallelepiped** | Box with edges a, b, c | volume |[a b c]| |

%%%
## 4. Detailed Explanation

### 4.1 Why volume

- b × c is the base parallelogram's area vector; dotting a onto it multiplies by the height — base × height = volume. The sign records orientation (right- vs left-handed triples).

### 4.2 Reading BAC–CAB

- a × (b × c) lands in the plane of b and c (it is perpendicular to a × (b × c)'s own axis... precisely: the result is a combination of b and c) — BAC–CAB makes that visible: only b and c appear.

### 4.3 Non-associativity is structural

- (a × b) × c lies in the plane of a and b; a × (b × c) lies in the plane of b and c. Different planes, different vectors — the bracketing decides the plane.

%%%
## 5. Comparison Tables

**Triple products side by side**

| Basis | Scalar triple [a b c] | Vector triple a × (b × c) |
|---|---|---|
| result | scalar | vector |
| geometric meaning | signed volume | in-plane vector |
| zero when | coplanar | a ⊥ (b × c) plane cases |
| key law | cyclic invariance | BAC–CAB |

%%%
## 6. Common Confusions

**Cyclic, not any permutation:** [b a c] = −[a b c] — only rotations keep the sign.
%%%
**BAC–CAB order:** a × (b × c) = (a·c)b − (a·b)c — the dot product with **c** multiplies **b**; reversing pairs is the classic slip.
%%%
**Tetrahedron factor:** ⅙ of the parallelepiped volume, not ½ (that is the triangle's share of the parallelogram).

%%%
## 7. Exam Application

**NEB 2024 (verified PYQ): What is the scalar triple product? Write its geometric significance. (2m)** — For vectors a, b, c the **scalar triple product** is **[a b c] = a·(b × c)** — the dot product of one vector with the cross product of the other two; in components it is the determinant |a₁ a₂ a₃; b₁ b₂ b₃; c₁ c₂ c₃|. **Geometric significance:** |[a b c]| equals the **volume of the parallelepiped** whose three coterminous edges are a, b, c (base area |b × c| times height |a|cos θ); its **sign** records the orientation (handedness) of the triple. **[a b c] = 0 ⟺ the three vectors are coplanar** — the box collapses.
%%%
**NEB-style (3m): Show that the vectors a = î + ĵ + k̂, b = 2î + 3ĵ − k̂... coplanarity via [a b c] = 0 (template).** — Assemble the component determinant and expand; zero ⟹ coplanar (one vector is a combination of the other two), non-zero ⟹ they span space with volume |[a b c]|.
%%%
**NEB-style (2m): Verify BAC–CAB for a = î, b = ĵ, c = ĵ.** — Left: a × (b × c) = î × (ĵ × ĵ) = î × 0 = **0**. Right: (a·c)b − (a·b)c = (î·ĵ)ĵ − (î·ĵ)ĵ = 0 − 0 = **0** ✓. Both sides agree; the identity holds even in degenerate cases.

@@keyPoints@@
Scalar triple product: [a b c] = a.(b x c) = determinant of components = (a x b).c. Volume theorem: |[a b c]| = parallelepiped volume; tetrahedron = (1/6)|[a b c]|. Coplanarity: [a b c] = 0. Cyclic invariance: [a b c] = [b c a] = [c a b]; any swap flips sign. Dot and cross interchangeable: a.(b x c) = (a x b).c. Vector triple product: a x (b x c) = (a.c)b - (a.b)c (BAC-CAB); (a x b) x c = (a.c)b - (b.c)a; NOT associative - bracketing changes the plane.
@@importantConcepts@@
The scalar triple product is base-times-height in one symbol: cross for the base area, dot for the height - volume with a sign.
@@examples@@
***BAC-CAB in the plane*** — a x (b x c) always lands in the plane of b and c: the identity's right side contains only b and c, no a.
@@universalFacts@@
Determinant sign conventions in linear algebra (row swaps flip sign) are the triple product's cyclic law generalised.
@@importantStatements@@
"[a b c] = a.(b x c); |[a b c]| is the parallelepiped volume; a x (b x c) = (a.c)b - (a.b)c."
@@importantNotes@@
Verified PYQ: NEB 2024 (scalar triple product definition and geometric significance) — assigned to this row. Other items are NEB-style practice.
@@examShortTricks@@
Coplanarity: determinant = 0. Volume: |determinant|; tetrahedron: divide by 6. Swaps flip sign; rotations keep it. BAC-CAB: (a.c)b - (a.b)c - c pairs with b.
@@examNotes@@
For the definition question, give the formula AND the volume interpretation - the significance sentence is a full mark.
@@formulas@@
- [a b c] = a·(b × c) = |a₁ a₂ a₃; b₁ b₂ b₃; c₁ c₂ c₃| = (a × b)·c
- |[a b c]| = parallelepiped volume; tetrahedron Ⅵ... ⅙|[a b c]|
- [a b c] = [b c a] = [c a b]; [b a c] = −[a b c]
- a × (b × c) = (a·c)b − (a·b)c
@@practice@@
Define the scalar triple product and state its geometric significance.
%%%
Prove the cyclic invariance of [a b c].
%%%
State and verify the BAC–CAB rule with a = î, b = ĵ, c = k̂.
@@practiceQuestions@@
**NEB 2024 (verified PYQ): What is the scalar triple product? Write its geometric significance. (2m)** — **Definition:** for three vectors a, b, c the **scalar triple product** is **[a b c] = a·(b × c)** — the scalar obtained by dotting one vector with the cross product of the other two. In components it is the determinant **|a₁ a₂ a₃; b₁ b₂ b₃; c₁ c₂ c₃|**, and the dot and cross can be exchanged: a·(b × c) = (a × b)·c. **Geometric significance:** |[a b c]| is the **volume of the parallelepiped** whose coterminous edges are a, b, c — the cross product b × c supplies the base parallelogram's area vector, and the dot product with a supplies the height. The **sign** of [a b c] records the orientation (handedness) of the triple, and **[a b c] = 0 exactly when the three vectors are coplanar** — the collapsed box. The tetrahedron on the same edges has volume ⅙|[a b c]|.
%%%
**NEB-style (3m): Prove the cyclic invariance [a b c] = [b c a] = [c a b] and that interchanging two vectors reverses the sign.** — **Determinant route:** [a b c] is the determinant of the matrix with rows a, b, c. **Cyclic rotation** of the rows (a,b,c → b,c,a) is achieved by **two** row interchanges: (a,b,c) → (b,a,c) → (b,c,a). Each interchange multiplies the determinant by −1, so two of them multiply by (−1)² = +1: [a b c] = [b c a], and similarly [c a b]. **Single interchange** (a,b,c → b,a,c) is one swap: the determinant changes sign, so [b a c] = −[a b c]. ∎ **Geometric reading:** rotating which vector is called "first" does not change the box or its handedness; swapping two vectors mirrors the box, flipping the orientation sign while leaving the volume.
%%%
**NEB-style (2m): Verify the BAC–CAB rule for a = î, b = ĵ, c = k̂.** — **Left side:** b × c = ĵ × k̂ = î, so a × (b × c) = î × î = **0**. **Right side:** (a·c)b − (a·b)c = (î·k̂)ĵ − (î·ĵ)k̂ = (0)ĵ − (0)k̂ = **0**. Both sides agree ✓. (A non-degenerate check: a = î, b = ĵ, c = k̂ replaced by c = î + k̂ gives left = î × (ĵ × (î + k̂)) = î × (ĵ × î + ĵ × k̂) = î × (−k̂ + î) = −(î × k̂) + 0 = ĵ; right = (î·(î+k̂))ĵ − (î·ĵ)(î+k̂) = ĵ ✓ — the identity survives.)
@@summary@@
The **scalar triple product** [a b c] = a·(b × c) — the component determinant — measures **signed volume**: |[a b c]| is the parallelepiped's volume (NEB 2024's definition-and-significance answer), ⅙ of it the tetrahedron's, and **zero exactly for coplanar** vectors. It is **cyclically invariant** ([a b c] = [b c a] = [c a b]) and **sign-flipping** under any single swap. The **vector triple product** a × (b × c) is a vector lying in the plane of b and c, expanded by **BAC–CAB**: (a·c)b − (a·b)c — and its non-associativity is structural: the two bracketings land in different planes. Volume with a sign; plane membership for free; BAC–CAB for the vector case — the triple products close the vector-algebra toolkit.
