@@notes@@
## 1. Topic Introduction — Continuity From Limits

This exercise applies the **three-part continuity test** to concrete functions: find where f is continuous, classify every break, and repair the repairable. It is limits-and-continuity's integration drill.

%%%
## 2. Fundamental Concepts

### 2.1 The workflow

- **Step 1 — domain:** where is f defined? Undefined points are automatic discontinuity candidates.
- **Step 2 — closure continuity:** on its domain pieces, is f built from continuous families (polynomials, rationals, roots, trig, exp, log, compositions)? If yes, continuous there by closure — no testing needed.
- **Step 3 — triage the suspects:** at each candidate point, compute the limit (or both one-sided limits) and f(a); classify: continuous / removable / jump / infinite.

### 2.2 Piecewise functions

- At a junction a: compute **LHL from the left branch, RHL from the right branch**, and compare with the assigned f(a). Three outcomes: all equal (continuous), sides differ (jump), sides equal but ≠ f(a) (removable mismatch).

### 2.3 Rational triage recap

- Factor, cancel (holes at shared zeros), survivors are walls (odd split, even unified). The 15.3 rational items are exactly the row-36–38 taxonomy in action.

### 2.4 Repairs

- Removable breaks: define f(a) = L. Jumps and walls: report as non-removable — the honest conclusion.

%%%
## 3. Scientific Definitions

| Term | Scientific meaning | Example |
|---|---|---|
| **Closure continuity** | Built from continuous families | rational off zeros |
| **Junction triage** | LHL, RHL, f(a) compare | piecewise seam |
| **Full report** | Type + point + repair | the exam answer |
| **Continuity set** | Where all three parts hold | ℝ \ {breaks} |

%%%
## 4. Detailed Explanation

### 4.1 Why closure first

- Testing continuity at every point is impossible; closure theorems certify whole intervals at once, so testing is reserved for the finite suspect list — domain holes, denominator zeros, junctions.

### 4.2 The piecewise seam as a three-way meeting

- Left branch, right branch and the point's own value are three separate claims; continuity is their unanimous agreement. Each mismatch has its own name — the seam is the taxonomy's stage.

### 4.3 Reporting discipline

- A complete answer states: the continuity set, each break's location and type, and the repair where one exists. Partial answers ("discontinuous at 2") lose the classification marks.

%%%
## 5. Comparison Tables

**Seam outcomes**

| LHL | RHL | f(a) | Verdict |
|---|---|---|---|
| L | L | L | continuous |
| L | M≠L | — | jump |
| L | L | ≠L/undef | removable |
| ±∞ | — | — | infinite |

%%%
## 6. Common Confusions

**Testing where closure already certifies:** don't ε-test polynomials pointwise — quote the family.
%%%
**Forgetting f(a) in piecewise checks:** the assigned value is the third party; sides agreeing without it is still removable.
%%%
**Reporting without repair verdicts:** classify *and* state removability — the taxonomy's two halves.

%%%
## 7. Exam Application

**NEB-style (3m): Find the points of discontinuity of f(x) = (x² − 4x + 3)/(x² − 9) and classify each.** — Factor: numerator (x−1)(x−3), denominator (x−3)(x+3). **Shared zero x = 3:** cancel ⟹ limit 2/6 = 1/3 ⟹ **removable hole at (3, 1/3)**. **Survivor x = −3:** numerator = 12 ≠ 0 ⟹ blow-up ⟹ **infinite discontinuity (wall)** at −3. **Continuity set:** ℝ \ {3, −3}.
%%%
**NEB-style (3m): For f(x) = { x² if x ≤ 1; 2x − 1 if x > 1 }, discuss continuity at x = 1.** — **LHL:** x² → **1**. **RHL:** 2x − 1 → **1**. **Value:** f(1) = 1² = **1**. All three agree ⟹ **continuous at 1** — the seam closes perfectly.
%%%
**NEB-style (3m): For f(x) = { x + 3 if x ≠ 2; 8 if x = 2 }, classify and repair.** — **Limit:** x + 3 → **5** (the branch is continuous). **Value:** f(2) = 8 ≠ 5 ⟹ **removable mismatch**. **Repair:** redefine f(2) = 5; continuity restored on all of ℝ. The original graph: the line y = x + 3 with a detached dot at (2, 8).

%%%
## 8. Deep Conceptual — The Suspect List as Cost Accounting

- Continuity testing is **expensive per point** (limit + value + comparison) but **cheap per interval** (one closure theorem certifies infinitely many points). The workflow is therefore an economy: spend closure theorems on intervals, spend tests only on the finite suspect list.
- **Building the suspect list:** undefined points (denominator zeros, domain edges, log arguments ≤ 0) and piecewise joints are the only places continuity can fail. Everything else is certified by family membership — the suspect list is *complete* by construction, which is what makes the final verdict global.
- **The report structure mirrors the audit:** "continuous on ℝ \ {suspects}; at each suspect: type + repair." A full-mark answer is an audit trail, not a picture — the graph is the summary, the classification is the evidence.
%%%
## 9. Deep Conceptual — Classification as a Decision Tree

- At each suspect, two questions classify everything: **do the one-sided limits exist and agree?** (no agreement ⟹ jump if finite, infinite if blow-up, oscillatory otherwise; agreement ⟹ limit exists). Then: **does f(a) match the limit?** (no ⟹ removable; yes ⟹ continuous). Two binary questions, four outcomes — the taxonomy is a decision tree, not a list to memorise.
- **The tree's economy:** each question needs one computation — sides first (two one-sided limits), then the value comparison. Computing in the wrong order (value before sides) wastes work when the sides already rule out removability.
- **Repair verdicts fall out of the tree:** removable ⟹ repairable by redefining f(a) = L; jump/infinite/oscillatory ⟹ not repairable by point edits. The classification *is* the repair recommendation.
%%%
## 10. Deep Conceptual — Piecewise Seams as the Tree's Natural Habitat

- A piecewise joint concentrates all three quantities in one place: LHL from the left branch, RHL from the right branch, f(a) from whichever branch owns the point. The seam's verdict is the unanimous-agreement question across all three.
- **Designing seams:** to make a seam continuous, force RHL = LHL = f(a) — one equation per unknown constant per seam. Multiple seams give simultaneous linear systems; continuity conditions are always linear in the parameters.
- **Seams versus formula holes:** a formula's excluded point (0/0, wall) is diagnosed by factoring; a seam is diagnosed by comparing branches. Same tree, different evidence sources — the workflow's step 3 is identical, only the computation feeding it changes.
@@keyPoints@@
Exercise 15.3 workflow: (1) domain - undefined points are suspects; (2) closure continuity - polynomials, rationals off zeros, roots, trig, exp, log, compositions certify whole intervals; (3) triage suspects: compute limit(s) and f(a), classify continuous / removable / jump / infinite, state the repair. Piecewise seam: LHL from left branch, RHL from right branch, compare with f(a) - unanimous agreement = continuous; sides differ = jump; sides equal but value differs = removable mismatch. Rational triage: cancel shared zeros (holes), survivors are walls. Full report: continuity set + each break's type + repair verdict.
@@importantConcepts@@
Closure theorems make continuity cheap: certify intervals by family membership, spend testing effort only on the finite suspect list.
@@examples@@
***The closed seam*** - x^2 below 1 and 2x - 1 above meet at height 1 with f(1) = 1: three claims, unanimous - the seam is invisible.
@@universalFacts@@
Phase transitions are nature's discontinuities: water's density jumps at 0 degrees C - a jump discontinuity in the state function.
@@importantStatements@@
"f is continuous at a iff f(a), the limit, and their equality all hold; classify every break and state its repair."
@@importantNotes@@
No verified PYQ on this row exists in the bank; all items here are NEB-style practice.
@@examShortTricks@@
Domain, closure, triage. Piecewise: both branches, both sides, the value. Cancel-then-triage rationals. Report set + types + repairs.
@@examNotes@@
Give the continuity set explicitly (R minus the breaks) - the set statement is the answer's frame, not a footnote.
@@formulas@@
- seam test: LHL = RHL = f(a) ⟺ continuous at the junction
- removable repair: f(a) := lim_{x→a} f(x)
- rational: shared zeros → holes; surviving zeros → walls
@@practice@@
Classify the breaks of (x² − 4x + 3)/(x² − 9).
%%%
Check continuity of {x², x ≤ 1; 2x − 1, x > 1} at the seam.
%%%
Classify and repair {x + 3, x ≠ 2; 8, x = 2}.
@@practiceQuestions@@
**NEB-style (3m): Find the points of discontinuity of f(x) = (x² − 4x + 3)/(x² − 9), classify each, and state the continuity set.** — **Factor:** numerator (x − 1)(x − 3); denominator (x − 3)(x + 3). **Triage the suspects** (denominator zeros 3 and −3): **At x = 3** — a *shared* zero: cancel to get (x − 1)/(x + 3) for x ≠ 3; the limit is (3−1)/(3+3) = 2/6 = **1/3**, while f(3) is undefined ⟹ **removable discontinuity, hole at (3, 1/3)**; repair f(3) = 1/3. **At x = −3** — a *surviving* zero: numerator (−3)² − 4(−3) + 3 = 9 + 12 + 3 = 24 ≠ 0 with denominator → 0 ⟹ blow-up ⟹ **infinite discontinuity** (wall at x = −3; odd multiplicity ⟹ split sides); non-removable. **Elsewhere:** closure (rational off zeros) certifies continuity. **Continuity set: ℝ \ {−3, 3}.**
%%%
**NEB-style (3m): Discuss the continuity of f(x) = x² for x ≤ 1 and f(x) = 2x − 1 for x > 1 at the junction x = 1.** — **Left-hand limit** (left branch): lim_{x→1⁻} x² = **1**. **Right-hand limit** (right branch): lim_{x→1⁺} (2x − 1) = **1**. **Assigned value:** f(1) = 1² = **1** (the point belongs to the left branch). **Verdict:** LHL = RHL = f(1) = 1 — the three-way agreement holds ⟹ **f is continuous at x = 1**. **Elsewhere:** both branches are polynomials, continuous on their open pieces by closure ⟹ f is continuous on **all of ℝ**. The seam closes perfectly: the parabola hands over to the line at exactly the same height — the designed-to-continuous piecewise function.
%%%
**NEB-style (3m): For f(x) = x + 3 (x ≠ 2) and f(2) = 8, classify the discontinuity and state the repair.** — **Limit:** the branch x + 3 is continuous, so lim_{x→2} f(x) = 2 + 3 = **5**. **Value:** f(2) = **8**. **Comparison:** the limit exists but f(2) = 8 ≠ 5 ⟹ condition 3 of the three-part test fails ⟹ **removable discontinuity (mismatch type)**. **Graph:** the line y = x + 3 with a **detached closed dot** at (2, 8) floating above the missing point of the line. **Repair:** redefine f(2) = 5; the repaired function is the line itself, continuous on all of ℝ. One value, one line of repair — the mismatch is the taxonomy's mildest break.
%%%
**NEB-style (6m): Fully analyse the continuity of f(x) = (x² − 9)/(x² − 2x − 3) on ℝ, classifying every discontinuity and stating repairs.** — **Step 1 — domain:** denominator (x − 1)(x + 3) = 0 at x = 1, −3 ⟹ suspects: {1, −3}. **Step 2 — closure:** elsewhere f is rational with nonzero denominator ⟹ continuous on ℝ \ {−3, 1}. **Step 3 — triage. Factor the numerator:** x² − 9 = (x − 3)(x + 3) ⟹ f(x) = (x − 3)/(x − 1) after cancelling (x + 3) (licensed off x = −3). **At x = −3:** cancelled root ⟹ limit exists: (−6)/(−4) = **3/2** ⟹ **removable** (hole); repair f(−3) = 3/2. **At x = 1:** surviving denominator root; numerator → −2 ≠ 0 ⟹ blow-up: as x → 1⁺, (x−1) > 0 small, (x−3) < 0 ⟹ → **−∞**; as x → 1⁻ ⟹ → **+∞** ⟹ **infinite** (splitting wall), non-removable. **Full report:** continuous on ℝ \ {−3, 1}; removable at −3 (repair value 3/2); infinite at 1 (no repair). **Deep point:** one factorisation powered the entire audit — cancelled root ⟹ hole, surviving root ⟹ wall; the classification and the limits were the same computation read twice.
%%%
**NEB-style (6m): For f(x) = x + 2 for x < 1, f(x) = ax² + b for x ≥ 1, find a and b making f continuous at 1, and verify with the three-part test.** — **LHL (x → 1⁻):** lim (x + 2) = **3**. **RHL (x → 1⁺):** lim (ax² + b) = **a + b**. **Value:** f(1) = a + b (≥ owns the point). **Continuity demands:** RHL = LHL = f(1) ⟹ **a + b = 3**. **One-parameter family:** e.g. a = 1, b = 2; or a = 3, b = 0; or a = 0, b = 3. **Verify (a = 1, b = 2):** Part 1 — f(1) = 3 exists ✓; Part 2 — LHL = RHL = 3 ⟹ limit 3 exists ✓; Part 3 — 3 = 3 ✓ ⟹ continuous at 1. **Deep point:** one seam imposes one linear equation; the solution family is a line in (a, b)-space, and any member passes the three-part test identically — continuity constraints are linear, which is why "find the constants" questions reduce to algebra systems once the one-sided limits are computed.
%%%
**NEB-style (6m): Analyse the continuity of f(x) = (x + 2)/(x² − 4) for x ≠ ±2 with f(2) = 1/4 and f(−2) = 0. Classify each suspect.** — **Suspects:** x = ±2 (denominator zeros). **Factor:** x² − 4 = (x − 2)(x + 2) ⟹ f(x) = 1/(x − 2) after cancelling (x + 2), licensed off x = −2. **At x = −2:** cancelled root ⟹ limit = 1/(−4) = **−1/4**; assigned f(−2) = 0 ≠ −1/4 ⟹ **removable** (mismatch) — repair: f(−2) = −1/4. **At x = 2:** surviving root, numerator → 1 ≠ 0 ⟹ blow-up: x → 2⁺ gives 1/(small +) → **+∞**; x → 2⁻ → **−∞** ⟹ **infinite** (splitting wall); f(2) = 1/4 is a detached dot on the wall — irrelevant to the blow-up, non-removable. **Full report:** continuous on ℝ \ {−2, 2}; removable at −2 (repair −1/4); infinite at 2. **Deep point:** an assigned value at a wall's foot cannot soften the wall — the dot at (2, 1/4) is a point-value edit, and walls live in the neighbourhood; the audit's verdicts are independent of how the formula dresses the suspects.
%%%
**NEB-style (6m): For f(x) = (e^{2x} − 1)/x for x ≠ 0, f(0) = k: find k for continuity at 0, then determine whether f is continuous everywhere.** — **Suspect:** x = 0 (the formula excludes it). **Limit (star (eᵘ−1)/u → 1, u = 2x → 0):** (e^{2x} − 1)/x = 2·(e^{2x} − 1)/(2x) → **2**. **Repair value:** continuity needs f(0) = limit ⟹ **k = 2**. **Elsewhere:** e^{2x} and x are continuous with x ≠ 0 ⟹ the quotient is continuous on ℝ \ {0} by closure theorems. **Verdict:** with k = 2, f is continuous on **all of ℝ**. **Deep point:** this is the *defining* pattern of the exponential star — the function (e^{2x}−1)/x is a disguised difference quotient, and assigning k = 2 is exactly defining (e^{2x})′(0) = 2; continuity repairs and derivative definitions are the same act, which is why Exercise 15.3's workflow is the gateway to all of calculus.
@@summary@@
Exercise 15.3 is the **integration drill**: run the full continuity workflow. **Step 1**, the domain — undefined points head the suspect list. **Step 2**, **closure continuity**: polynomials, rationals off their zeros, roots, trig, exponentials, logs and compositions certify whole intervals without testing. **Step 3**, **triage the suspects**: compute the limit(s) and f(a), classify (continuous / removable / jump / infinite), and state the repair. **Piecewise seams** are three-way meetings — LHL from the left branch, RHL from the right, the assigned value as third party: unanimous (x² and 2x−1 meeting at height 1) is continuous; side-disagreement is a jump; value-disagreement is a removable mismatch (f(2) = 8 vs limit 5 — one redefinition repairs it). **Rationals**: cancel shared zeros into holes ((x²−4x+3)/(x²−9): hole at (3, 1/3)), triage survivors into walls (x = −3, infinite). Report the **continuity set**, every break's type, and every repair — the complete answer, every time.
