# 📐 MATHEMATICS NOTES REBUILD — Master Plan (book-grade)

> **Mission:** raise the Mathematics notes from their current ~3–4% of textbook depth to
> **book-grade, visionary notes** — every topic of every NEB Mathematics unit (**15 units ·
> 71 topics**: Class 11 = 7 units/28 topics, Class 12 = 8 units/43 topics) gets a proper
> introduction, strict hierarchy, **theorem/condition blocks**, classified formula tables,
> step-by-step worked examples, and clear English figures (authored SVG + curated) —
> plus a **complete textbook exercise-solutions layer: literally every question of every
> exercise of both Sukunda *Basic Mathematics* books** (Grade XI: 23 chapters · 62
> exercises; Grade XII: 22 chapters), each solved step-by-step (§6A).
>
> - **Benchmark books:** *Pioneer Mathematics* / standard NEB guides (Dreamland & peers) ·
>   NEB/CDC Mathematics textbook · V.K. Jha-style solved-problem ladders for practice depth.
> - **Exercise spine:** *Basic Mathematics Grade XI & XII* (Sukunda Pustak Bhawan —
>   D.R. Bajracharya, R.M. Shrestha, M.B. Singh, Y.R. Sthapit, B.C. Bajracharya): the
>   books whose exercises §6A lists and the fill sessions solve in full.
> - **Golden rules:** ① **Simply no removal** — existing notes upgraded in place.
>   ② **All existing CEE / entrance-exam content stays**; new material grows an Exam Zone
>   around it. ③ Order owned by `frontend/lib/syllabus.ts`. ④ Every theorem carries its
>   **hypotheses**; every formula its **validity condition** (KNOWLEDGE-PLAN.md §8.4:
>   dropped conditions are the classic maths-notes error).
> - **Method home:** shared method/licensing in [biology-plan.md](biology-plan.md) §3/§7.
> - **Sequencing:** interfaces (all 71 skeletons + every §6A exercise-file shell) first;
>   note-filling and exercise-solving in later sessions.

---

## 0. The gap
Today's Maths notes list formulas; a book **derives, conditions and applies** them. A topic
is done when a student can **state (with conditions), prove/sketch, apply (worked examples)
and avoid the classic trap**.

## 1. Scope
Class 11 (7 units, 28 topics) first in syllabus order, then Class 12 (8 units, 43 topics).
Bachelor-ready architecture.

## 2. Benchmarks & sources

| Source | Role |
|---|---|
| `frontend/lib/syllabus.ts` | topic skeleton + order |
| NEB/CDC Mathematics textbooks + standard guides | depth, notation, solved-example style |
| Standard degree texts (Stewart/Thomas-level for calculus) | theorem statements & hypotheses (validity) |
| Wolfram MathWorld / Encyclopedia of Math | quick verification of identities & attributions |
| *Basic Mathematics Grade XI* (Sukunda — Bajracharya, Shrestha, Singh, Sthapit, Bajracharya) | **exercise spine**: 23 chapters · 62 exercises — all solved (§6A) |
| *Basic Mathematics Grade XII* (same authors, Sukunda) | Grade 12 exercise spine: 22 chapters (§6A; per-chapter counts pinned at V0) |
| Google/Wikimedia | figure intake (graphs, constructions — license-checked) |

## 3. The Note Interface v2 — Mathematics

| # | Block | Standard | Schema home |
|---|---|---|---|
| I | **Introduction & motivation** | 120–250 words: what the tool is, where it's used, the chapter map, learning outcomes | `notes` heading + prose |
| II | **Definitions & theorems** (flagship) | each: **statement → hypotheses (conditions box) → proof/derivation (steps with reasons) → remarks**; counter-example when a condition is dropped | `notes`, `importantStatements` |
| III | **Formula sheet table** | formula → symbols → **validity condition** → where used (complete for the topic) | markdown table |
| IV | **Worked examples** | ≥ 8 per topic, step-by-step with reasons ("why this step"), ≥ 2 solution methods where they exist, answer checked by substitution/estimation | `numericals`, `examples` |
| V | **Figures & graphs** | ≥ 2 per topic: curves (asymptotes, intercepts marked), geometric constructions, 3D diagrams, feasible regions | `figures`/`blocks` + visuals registry |
| VI | **Traps & common mistakes** | the classic exam traps (sign errors, condition drops, domain holes) as a table | `confusion` |
| VII | **Exam Zone** | NEB question-type map (prove/show/evaluate/solve), typical past-question patterns, **existing CEE lines preserved** + new MCQs (`mcs`) | `mcs`, `practiceQuestions`, `examNotes` |
| VIII | **Practice & self-check** | graded problem set (short → long) with answers, summary table | `practice`, `summary` |
| IX | **Textbook Exercise Solutions** (flagship) | every exercise of the mapped book chapters — **literally all questions and sub-parts** — each solved step-by-step with reasons, verified answer, second method where standard | `content/practice/solutions/…` family (§3.4) |

### 3.1 Table standard
Formula table (mandatory, with validity-condition column) · theorem-hypotheses table ·
derivative/integral standard-forms table · transformation rules table · distribution/统计
tables (statistics unit) · counter-example table ("if condition X is dropped → fails, e.g. …").
Every table captioned; ≤ 12 rows; example column mandatory.

### 3.3 Figure standard
- **A — Authored SVG (≥ 2/topic):** function graphs (axes, scale, key points labelled),
  geometric constructions, conic sections, 3D line/plane figures, feasible-region polygons.
- **B — Curated external (where it beats SVG):** license-checked, English labels.
- Every graph must be plotted from the same data/equation the text uses.

### 3.4 The exercise-solutions file standard (block IX)

One bank file **per exercise**, in the platform's existing practice-family layout
(contract shared with `content/practice/questions/` and documented in
[content/pyqs/README.md](content/pyqs/README.md)):

```
content/practice/solutions/{class}/mathematics/{unit}/NN-exercise-{ch}.{n}.json
```

`{ title, book, chapter, chapterTitle, exerciseId: "2.3", textbookPage, unitSlug,
origin, questions[] }` — each question
`{ id: "Q4(a)", type, difficulty, prompt, solution, answer, verified }`.

- **The numbering is the book's numbering, verbatim:** exercise IDs `2.3` / `3.4` /
  `5.4` (chapter.exercise), question IDs `Q1`, `Q4(a)`, `Q7(iii)`. A student with the
  book open finds every item one-to-one — nothing renumbered, nothing renamed.
- **Literally all questions:** zero skips, zero "similarly"; every sub-part is its own
  entry. Per-exercise question counts are recorded in §6A and enforced by the §8 gate.
- **Every solution is complete:** given → concept used → steps with reasons → boxed
  answer → **verification** (substitution / estimation) → a second method where one
  exists (e.g. Lami's theorem vs resolution of forces; substitution vs by-parts) →
  difficulty flag → cross-link to the owning topic note.
- Solutions register into `content/_index.json` with the existing register-script
  pattern (S1 wires this family exactly as `content/pyqs` is wired).

## 4. Book-Grade Bar (Mathematics)
Per topic: **≥ 8 sections · every theorem with hypotheses + proof-sketch · complete formula
table with validity conditions · ≥ 8 fully worked examples (≥ 2 methods where possible) ·
≥ 2 figures · traps table · ≥ 10 MCQs (CEE preserved) + graded problem set with answers ·
summary.** — **plus 100% of the mapped book exercises solved: every question and sub-part
of every exercise listed in §6A (completeness counted by the §8 gate, never assumed).**

## 5. Polish track (newer version, no removal)
Additive v2; CEE lines frozen; de-garble; merge duplicates (originals kept as "extra
points"); restore dropped conditions on existing formulas (an edit, not a removal);
work-example answers verified by substitution.

## 6. Per-unit blueprints (15 units)

### Class 11 (7 units, 28 topics)

| Unit | h | Must produce |
|---|---:|---|
| Algebra | 44 | **the biggest unit:** sets/logic truth tables, matrix operations + inverse-method table, system-solving flow, sequences & series formula table, complex-number plane SVG + De Moivre worked set, binomial theorem with validity condition (\|x\| ranges), permutations/combinations decision table |
| Trigonometry | 12 | identities master table, general-solution conditions table, graphs of sin/cos/tan SVG, height-and-distance worked figures |
| Analytic Geometry | 20 | line/conic formula table (each form + condition), conic-section gallery SVG, pair-of-lines results table, worked loci set |
| Vectors | 12 | product rules table, geometric interpretation figures, application worked set (mechanics links) |
| Statistics and Probability | 12 | measures table, distribution formulas, probability rules table, worked expected-value set, graphs SVG |
| Calculus | 48 | limits/derivatives definitions **with conditions**, standard-derivatives table, applications (tangent/normal, maxima/minima) with **curve-sketching SVG**, integration standard-forms table, area figures |
| Computational Methods or Mechanics | 12 | numerical-method iteration tables + error notes; OR mechanics FBD/kinematics figures (branch-aware: whichever the syllabus prescribes) |

### Class 12 (8 units, 43 topics)

| Unit | h | Must produce |
|---|---:|---|
| Limits and Continuity | 8 | ε-δ intuition + condition boxes, discontinuity-type table, worked indeterminate-form set |
| Differentiation | 16 | rules table (with conditions), implicit/parametric worked set, mean-value-theorem **hypotheses table**, optimization & curve-sketching figures |
| Integration | 14 | techniques decision-table (by parts/substitution/partial fractions), standard integrals table, definite-integral properties, area/volume figures |
| Differential Equations | 8 | type→method decision table, worked solutions per type, order/degree table, application figures |
| Vector Algebra | 6 | dot/cross/box product table with geometric meaning, projection worked set, figures |
| Three Dimensional Geometry | 5 | direction-cosines table, line/plane forms table + distance formulas, 3D SVG figures |
| Linear Programming | 3 | **feasible-region SVG gallery** (corner-point method), formulation table (word problem → constraints), worked set |
| Probability | 7 | distribution tables (binomial/normal), conditional-probability tree SVG, worked expected-value/variance set |

## 6A. Textbook Exercise Solutions — the complete inventory

> **What this is:** the numbering spine of the solutions layer. Every exercise of both
> Sukunda *Basic Mathematics* books is listed here; **fill sessions solve literally every
> question (and sub-part) of each exercise** and tick its box. Exercise IDs are the book's
> own (`2.3` = Chapter 2, Exercise 3); question IDs stay the book's (`Q4(a)`).
>
> **Edition truth (pinned 2026-10-30 from the vendor PDF's own Contents, PDF pp19–24):**
> the served printing is the **2075 HSEB reprint** (`vendor/books/sukunda-basic-mathematics-xi.pdf`,
> 661 PDF pages = book pp + 24): **19 chapters + appendix** — CH1 Sets/RNS/Logic pp1–59 ·
> CH2 Relations/Functions/Graphs pp60–116 · CH3 Curve Sketching pp117–132 · CH4 Trigonometrical
> Equations pp133–156 · CH5 Inverse Circular Functions pp157–171 · CH6 Properties of Triangle
> pp172–190 · CH7 Solution of Triangle pp191–197 · CH8 Sequence & Series + Induction pp198–237 ·
> CH9 Matrices and Determinants pp238–285 · CH10 System of Linear Equations pp286–310 · CH11 Complex
> Numbers pp311–349 · CH12 Polynomial Equations pp350–371 · CH13 Straight Lines pp372–410 · CH14 Pair
> of Straight Lines pp411–432 · CH15 Circle pp433–~454 · CH16 Limits and Continuity ~pp455–489 ·
> CH17 Derivatives pp490–534 · CH18 Application of Derivatives pp535–561 · CH19 Antiderivatives
> pp562–608 · Appendix p609+. The newer guide-edition reorganises all of this (its Ch4+ differ);
> **fill sessions solve THIS printing cover-to-cover**, keep guide-edition-only questions as appendices
> (as done for Ex2.4-A1), and correct the rows below chapter by chapter. Nothing is ever dropped.
>
> **Sources (web-verified, Oct 2026):** Grade 11 — two independent chapterwise-solution
> indexes (nepalieducate.com, nebeducation.com) agree exactly: **23 chapters · 62
> exercises**; chapter titles from SciPiPupil's Sukunda index; Ch 3 = *Curve Sketching*
> confirmed against the official companion manual ("3.1 Curve Sketching · Exercise 3.1 ·
> Textbook Page No. 95"). Grade 12 — titles from SciPiPupil's index; **per-chapter exercise
> counts only partially confirmed** (Ch 5 = 5.1–5.3; Ch 1 has at least 1.1–1.2), so **V0
> pins them against the printing before any solution is written**.

### Grade 11 — *Basic Mathematics Grade XI* — 23 chapters · 62 exercises

| Ch | Chapter | Exercises (☐ = every question still unsolved) | Platform home |
|---|---|---|---|
| 1 | Logic, Sets and Real Number System | ☑ 1.1 ☑ 1.2 ☑ 1.3 ☑ 1.4 (book-mapped from PDF 2026-10-29: book Ex 1.1 Sets = 49/49 complete — web-1.2 file 34Q [Q1–Q5] + supplement 15Q [Q6–Q13, every answer matches printed Answers p.15]; book Ex 1.2 proofs = 20/20 complete — web-1.3 file 15 proofs [Q2,Q4a–c,Q5,Q6] + supplement 5 proofs [Q1a–c,Q4d–e]; book Ex 1.3 |·| = 41/41 complete — 26-entry file covers Q1–Q8 [Q2(d) quotient law added, Q3(g) ≤-form fixed, Q6(b) expansion corrected, Q8(c) book-lettered; all vs printed key + 300/350-dpi OCR]; book Ex 1.4 Logic = 52/52 complete (all flags resolved 2026-10-29 via 300/350/400-dpi crops + printed key pp 57–59: Q3c neither-nor re-read, Q5d = q∨(p∧s), Q5f = (p∨q)∧(r∨s), Q5c ∧ adopted on key evidence, Q6c/d + Q4f + Q8e + Q10c verbatim, Q10a ∨ restored, Q10b '=' = conditional → genuine tautology)] — Ch.1 COMPLETE (162/162: 49 + 20 + 41 + 52) | C11 `algebra` — Logic and set · Real numbers |
| 2 | Relations, Functions, and Graphs | ☑ 2.1 ◐ 2.2 ☑ 2.3 ☑ 2.4 (COMPLETE 2026-10-30: Q1(a–j) + Q2–Q4 in ex-2-4-logarithmic-identities.json, 14 entries incl. guide-edition appendix; every proof by log laws) ☑ Additional (COMPLETE 2026-10-30: Q1–Q8 in ex-2-additional-functions-review-a.json + Q9–Q24 in ex-2-additional-functions-review-b.json; all numeric answers match printed key pp115–116; honest flags: AQ4 figures pending, AQ9(b) onto-R disproved as printed, AQ13 a≠0 added, AQ16(d) reading via key, AQ23 key '2' = dropped ∛) — Ch.2 COMPLETE (book pp112–115 = PDF pp137–143) — map (2075-print PDF pp = book pp + 24): Ex 2.1 = book pp 52–53 (PDF 76–77); Ex 2.2 = book pp 82–84 (PDF 106–109, real Q1–Q10 + printed key recovered 2026-10-29: website 'Ex 2.2' is a different-numbering subset = book Q2–Q3 + later-exercise inverse/composite set); Ex 2.3/2.4/Additional next via header-hunt | C11 `algebra` — Function |
| 3 | Curve Sketching | ☑ 3.1 (COMPLETE 2026-10-30: Q1–Q8, 40 entries in ex-3-1-curve-sketching.json; every statement via 200-dpi image reads; answers key p129 + figure pp130–132 point-labels matched; flags: Q1(d–f) key letters garbled = Odd ×3 by substitution, Q3(d) period 2π/a vs key '2π') — Ch.3 COMPLETE (book pp128–132 = PDF pp155–159) | C11 `algebra` — Curve sketching |
| 4 | Trigonometrical Equations and General Values (THIS PRINTING's Ch4, book pp133–156) | ☑ 4.1 (COMPLETE 2026-10-30: Q1–Q13, 22 entries in trigonometry/ex-4-1-trig-identities.json; every statement via 200-dpi image reads; OCR corrections: Q5(c) = 3/2, Q12(a)/Q13(b) half-angles restored) ☑ 4.2 (COMPLETE 2026-10-30: Q1–Q15, 45 entries in trigonometry/ex-4-2-trig-equations.json; statements via image reads; key-checked; flags: Q4(a)/(c) identical in print, Q10(b)/Q13(i) key rows illegible = substitution-verified, Q15(ii) key drops -pi/2) ☑ Additional (COMPLETE 2026-10-30: Q1–Q4, 17 entries in trigonometry/ex-4-additional-trig-equations.json; statements via image reads; key p156 garbled-but-consistent; every restricted answer substitution-verified) — Ch.4 COMPLETE (book pp133–156 = PDF pp160–183) | C11 `trigonometry` |
| 5 | Inverse Circular Functions (THIS PRINTING's Ch5, book pp157–171) | ☑ 5.1 (COMPLETE 2026-10-30: Q1–Q6, 51 entries in trigonometry/ex-5-1-inverse-values-and-rewrites.json [Q1–Q3, 20] + trigonometry/ex-5-1-inverse-proofs-and-equations.json [Q4–Q6, 31]; statements via 220–600dpi crops + RapidOCR reads of the stacked fractions; every numeric answer key-checked) ☑ Additional (COMPLETE 2026-10-30: Q7–Q12 proofs + AQ1–Q4, 21 entries in trigonometry/ex-5-1-inverse-theorems-and-additional.json; statements via image reads; flags: Q9(i) independently confirmed via NEB video, AQ4(i) as printed (= 0) FALSE — counterexample a=3,b=2,c=1 gives pi, corrected to pi and proved) — Ch.5 COMPLETE (book pp157–171 = PDF pp184–198) | C11 `trigonometry` |
| 6 | Complex Numbers (THIS PRINTING's Ch11, book pp311–349) | ☑ 11.1 ☑ 11.2 ☑ 11.4 + Additional (COMPLETE 2026-10-31: book Ex 11.1 Q1–Q6 [20 entries] + Ex 11.2 Q1–Q10 [37] + Ex 11.4 Q1–Q10 [37] + Additional Q1–Q17 [21] = 115 entries in algebra/ex-11-1-complex-basics.json, algebra/ex-11-2-modulus-properties-sqrt.json, algebra/ex-11-4-polar-demoivre.json, algebra/ex-11-additional-complex.json; statements via page-region vision reads incl. 200dpi+ zooms (book p319 = PDF p346, book p328 = PDF p355, book p345 = PDF p372, Additional pp347–349); no Ex 11.3 exists in this printing (numbering jumps 11.2 → 11.4, as with the missing 10.1); every numeric answer key-checked against the printed Answers pp320/330/346/348; flags: Ex 11.4 Q1(c) scans as '2' but the key's 2(cos90°+i sin90°) fixes the reading as 2i (220dpi zoom confirms the i); Ex 11.2 Q10(j) is the quotient (5,12)/(3,-4) = ±(4+7i)/5; Additional-answers page carries a stray duplicated '13. i)/ii)' block (roots of ±i, already answered in Ex 11.2/11.4) — ignored) — Ex 11.1/11.2/11.4 + Additional COMPLETE (book pp319–349 = PDF pp346–376) | C11 `algebra` — Complex number |
| 7 | Properties of Triangle (THIS PRINTING's Ch6, book pp186–190) | ☑ 7.1 (COMPLETE 2026-10-30: Ex 6.1 Q1–Q15 + Additional (I) Q1–Q13, 63 entries in trigonometry/ex-6-1-triangle-identities-i.json [Q1–Q2, 6] + trigonometry/ex-6-1-triangle-identities-ii.json [Q3–Q4, 10] + trigonometry/ex-6-1-half-angle-and-area.json [Q5 + Q13, 11] + trigonometry/ex-6-1-special-results.json [Q6–Q12, Q14–Q15, 9] + trigonometry/ex-6-1-additional-i.json [AQ1–AQ6, 12] + trigonometry/ex-6-1-additional-ii.json [AQ7–AQ13, 15]; statements via page-region vision reads (book p186 = PDF p213 through book p190 = PDF p217); every proof verified from sine/cosine/projection/half-angle laws and every numeric answer key-checked against the printed Answers, p190; flags: Answers-line '7.(ii) 75 deg' is a label slip for 7.(iii) (7.(ii) is a proof), filed in-file; Q5(g) pen strikethrough in this copy is cosmetic only — no print errors found) — Ex 6.1 COMPLETE (book pp186–190 = PDF pp213–217) | **enrichment** (sine/cosine/tangent laws — solved & tagged; above the Mat. 007 order) |
| 8 | Solutions of Triangle (THIS PRINTING's Ch7, book pp191–197) | ☑ 8.1 (COMPLETE 2026-10-31: book Ex 7.1 Q1–Q5, 17 entries in trigonometry/ex-7-1-solution-of-triangle.json; statements via page-region vision reads (book p196 = PDF p223 through book p197 = PDF p224); every numeric answer key-checked against the printed Answers, p197; flags: Q5(ii) Answers line prints 'a = √6/√2' but a = 2 is given — label slip for c, verified by substitution; Q1(i) key order assumes the given angles are A and C) — Ex 7.1 COMPLETE (book pp196–197 = PDF pp223–224) | **enrichment** (same) |
| 8A | Sequence & Series + Mathematical Induction (THIS PRINTING's Ch8, book pp198–237) | ☑ 8.1 ☑ 8.2 ☑ 8.3 ☑ 8.4 + Additional (COMPLETE 2026-10-31: book Ex 8.1 Q1–Q8 [17 entries] + Ex 8.2 Q1–Q6 [14] + Ex 8.3 Q1–Q9 [25] + Additional Q1–Q6 [7] + Ex 8.4 Q1–Q5 [18] = 81 entries in algebra/ex-8-1-am-gm-hm-means.json, algebra/ex-8-2-infinite-geometric-series.json, algebra/ex-8-3-power-sums-i.json, algebra/ex-8-3-misc-series-additional-ii.json, algebra/ex-8-4-mathematical-induction.json; statements via page-region vision reads + 70-dpi RapidOCR sweep (book p198 = PDF p225 through book p237 = PDF p264); every numeric answer key-checked against the printed Answers pp215/221/230-231; flags: Ex 8.1 key '6. a)' is a label slip for Q6 (no 6b), Example 8 (p214) states A.P. but solves as G.P. — worked-example print slip, not an exercise) — Ex 8.1–8.4 COMPLETE (book pp214–237 = PDF pp241–264) | C11 `algebra` — Sequence and series (cross-ref) |
| 9 | Matrices and Determinants (THIS PRINTING's Ch9, book pp238–285) | ☑ 9.1 ☑ 9.2 ☑ 9.3 + Additional (COMPLETE 2026-10-31: book Ex 9.1 Q1–Q8 [9 entries] + Ex 9.2 Q1–Q5 [5] + Ex 9.3 Q1–Q9 [11] + Additional Matrix Q1–Q10 [10] + Additional Determinants Q1–Q10 [14] = 49 entries in algebra/ex-9-1-matrix-algebra.json, algebra/ex-9-2-determinant-evaluation.json, algebra/ex-9-3-transpose-adjoint-inverse.json, algebra/ex-9-4-matrix-inverse-problems.json, algebra/ex-9-5-additional-determinants.json; statements via page-region vision reads + 70-dpi RapidOCR sweep (book p248 = PDF p275 through book p285 = PDF p312); key-checked against the printed Answers pp249/264/281/283/285; flags: Ex 9.2 Q5 printed minus is a sign slip — numeric check at (1,2,3) gives +2 = +(a-b)(b-c)(c-a); Ex 9.3 Q4(vi)/Q9 key line garbled but matrices recoverable; Ex 9.3 Answers '1.a' triple belongs to Q1(b)) — Ex 9.1–9.3 + Additional COMPLETE (book pp248–285 = PDF pp275–312) | C11 `algebra` — Matrices and determinants |
| 10 | System of Linear Equations (THIS PRINTING's Ch10, book pp286–310) | ☑ 10.2 ☑ 10.3 (COMPLETE 2026-10-31: book Ex 10.2 Q1–Q3 [23 entries] + Ex 10.3 Q1–Q2 [14] = 37 entries in algebra/ex-10-2-row-equivalent-systems.json + algebra/ex-10-3-matrix-cramer-systems.json; statements via page-region vision reads (book p298 = PDF p325, book p310 = PDF p337); no Ex 10.1 exists in this printing (10.1 is the Introduction section); every answer key-checked against the printed Answers pp299/310; flags: Ex 10.3 Q2(e) key drops a minus sign — filed in-file with substitution proof (correct z = -5/6)) — Ex 10.2–10.3 COMPLETE (book pp298–310 = PDF pp325–337) | C11 `algebra` — System of linear equations |
| 11 | Circle | ☐ 11.1 ☐ 11.2 | **enrichment** (feeds conic prep; platform has no circle topic) — **THIS PRINTING's circle ladder is Ch15 (see the row below); solve there** |
| 12 | Conic Section | ☐ 12.1 ☐ 12.2 | **enrichment** (textbook-syllabus 3.3 lists parabola tangent/normal; topic-slot gap noted for later reconciliation) |
| 14 | Pair of Straight Lines (THIS PRINTING's Ch14, book pp411–432) | ☑ 14.1 ☑ 14.2 + Additional (COMPLETE 2026-10-31: book Ex 14.1 Q1–Q8 [20 entries] + Ex 14.2 Q9–Q13 [10] + Additional Q1–Q19 [19] = 49 entries in analytic-geometry/ex-14-1-pair-basics.json, analytic-geometry/ex-14-2-joint-lines.json, analytic-geometry/ex-14-additional-pair.json; statements via page-region vision reads (book p428 = PDF p455 through book p432 = PDF p459); the exercise numbering continues 14.1 Q1–Q8 then 14.2 Q9–Q13 (one numbering run); every numeric answer key-checked against the printed Answers pp429/432; flags: none — all keys verified, including Q6(a) k = 9/2 or 3, Q8 λ = 2 with angle tan⁻¹(1/7), Q12 k = 9 or -4) — Ex 14.1–14.2 + Additional COMPLETE (book pp428–432 = PDF pp455–459) | C11 `analytic-geometry` — Pair of straight lines |
| 15 | The Circle (THIS PRINTING's Ch15, book pp433–453) | ☑ 15.1 ☑ 15.2 (COMPLETE 2026-11-01: book Ex 15.1 Q1(a–k)–Q6 [26 entries] + Ex 15.2 Q1(a)–Q17 + hand-added Q18 [31] = 57 entries in analytic-geometry/ex-15-1-circle-equations.json, analytic-geometry/ex-15-2-tangents-normals.json; statements via page-region vision reads (book p441 = PDF p468 through book p453 = PDF p480); no Additional exercise exists in this printing's Ch15 — it ends at Ex 15.2 and Ch16 begins on book p454, so the chapter is complete as 2 exercises; every numeric answer key-checked against the printed Answers pp442/453 via 350–420dpi zooms; flags: (a) Ex 15.1 Q1(e) print/key conflict — as printed (diameters x+y = 6, x+2y = 8, r = 10) gives centre (4,2), x²+y²-8x-4y-80 = 0, while the key's x²+y²-16x+4y-32 = 0 needs centre (8,-2), which lies on x+y = 6 but not on x+2y = 8; both filed; (b) Ex 15.1 Q1(f) print reads centre (+1,5) but the key x²+y²+2x-10y-6 = 0 is the centre (-1,5) circle through the same intersection point (3,1) — both filed; (c) Ex 15.1 Q4(a) key prints x²+y²-ax-bx = 0, a variable slip for -by (the given point is (0,b)); (d) Ex 15.2 Q18 is hand-written in the copy's margin (printed exercise ends at Q17) — filed and flagged, answer 3x-4y-7 = 0 matches the margin note, and only the 4√3 chord reading is geometrically possible) — Ex 15.1–15.2 COMPLETE (book pp441–453 = PDF pp468–480) | C11 `analytic-geometry` — **enrichment** (circle: centre–radius, tangents, normals, chord lengths; feeds conic prep) |
| 10 | Straight Lines (THIS PRINTING's Ch13, book pp372–410) | ☑ 13.1 ☑ 13.2 ☑ 13.3 (COMPLETE 2026-10-31: book Ex 13.1 Q1–Q16 [26 entries] + Ex 13.2 Q1–Q11 [17] + Ex 13.3 Q1–Q11 [22] = 65 entries in analytic-geometry/ex-13-1-straight-line-forms.json + analytic-geometry/ex-13-2-angles-parallels.json + analytic-geometry/ex-13-3-distances-bisectors.json; statements via page-region vision reads incl. 150-220dpi zooms (book p385 = PDF p412 through book p410 = PDF p437); every numeric answer key-checked against the printed Answers pp386/398/410; flags: Ex 13.2 Q1(c) key's tan⁻¹(±2/9) does not follow from the zoom-confirmed lines (2x-3y+7 = 0, 7x+4y-9 = 0 give tan⁻¹(±29/2); the '3x' zoom was a misread of the worked example above) — filed with substitution-verified computation; Ex 13.3 Q8(a) length filed as 11/√34 from the printed vertices (key line vision-read as 11/√5, likely √34 misread)) — Ex 13.1–13.3 COMPLETE (book pp385–410 = PDF pp412–437) | C11 `analytic-geometry` — Straight line |
| 14 | Measures of Dispersion | ☐ 14.1 ☐ 14.2 | C11 `statistics-and-probability` — Measure of dispersion |
| 15 | Probability | ☐ 15.1 | C11 `statistics-and-probability` — Probability |
| 16 | Limits and Continuity | ☐ 16.1 ☐ 16.2 ☐ 16.3 ☐ 16.4 | C11 `calculus` — Limits and continuity · Continuity |
| 17 | The Derivatives | ☐ 17.1 ☐ 17.2 ☐ 17.3 | C11 `calculus` — Derivatives · Rules of differentiation |
| 18 | Application of Derivatives *(title inferred — V0 confirms)* | ☐ 18.1 ☐ 18.2 | C11 `calculus` — monotonicity · extreme values · concavity |
| 19 | Antiderivatives and its Application | ☐ 19.1 ☐ 19.2 ☐ 19.3 ☐ 19.4 ☐ 19.5 ☐ 19.6 ☐ 19.7 | C11 `calculus` — Anti-derivatives · Definite integral (**biggest chapter — 7 exercises**) |
| 20 | Computational Methods *(title inferred — the companion manual names it; V0 confirms)* | ☐ 20.1 | C11 `computational-methods-or-mechanics` — Numerical computation |
| 21 | Composition and Resolution of Concurrent Forces | ☐ 21.1 ☐ 21.2 ☐ 21.3 | C11 `computational-methods-or-mechanics` — Mechanics: Statics |
| 22 | Kinematics: The Geometry of Motion | ☐ 22.1 ☐ 22.2 ☐ 22.3 | C11 `computational-methods-or-mechanics` — Mechanics: Dynamics |
| 23 | Mathematics for Economics and Finance *(title inferred — V0 confirms)* | ☐ 23.1 ☐ 23.2 ☐ 23.3 ☐ 23.4 ☐ 23.5 ☐ 23.6 | syllabus 8.3 option — economics/finance track |

### Grade 12 — *Basic Mathematics Grade XII* — 22 chapters (counts pinned at V0)

| Ch | Chapter | Exercises (baseline; `+` = count to confirm) | Platform home |
|---|---|---|---|
| 1 | Permutation and Combination | ☐ 1.1 ☐ 1.2 + | **enrichment** (feeds C12 `probability`) |
| 2 | Binomial Theorem | ☐ 2.1 + | **enrichment** |
| 3 | Elementary Group Theory | ☐ 3.1 + | **enrichment** |
| 4 | Complex Number | ☐ 4.1 + | C11 `algebra` — Complex number (cross-ref) |
| 12 | Polynomial Equations (THIS PRINTING's Ch12, book pp350–371) | ☑ 12.1 ☑ 12.2 ☑ 12.3 + Additional (COMPLETE 2026-10-31: book Ex 12.1 Q1–Q10 [15 entries] + Ex 12.2 Q1–Q12 [34] + Ex 12.3 Q1–Q6 [8] + Additional Q1–Q19 [19] = 76 entries in algebra/ex-12-1-nature-of-roots.json, algebra/ex-12-2-formation-transformations.json, algebra/ex-12-3-common-roots.json, algebra/ex-12-additional-mixed.json; statements via page-region vision reads (book p356 = PDF p383 through book p371 = PDF p398); **this printing's Ch12 IS the Grade 11 Quadratic-equation exercise ladder** (Grade 12's Guide-Ch5 5.1–5.3 labels map onto these same topics); every numeric answer key-checked against the printed Answers pp357/365-366/369/371; flags: Ex 12.1 Q7's equation uses (b+c-a) etc. = -2a,-2b,-2c via a+b+c = 0; Ex 12.2 Q10(c) key prints '5 or 5/6' with a faint minus — equation forces -5/6 (verified: roots -1/3,-1/2 ratio 2:3); Additional p371 header problem (root-difference equality → p+q+1 = 0) filed as Q19) — Ex 12.1–12.3 + Additional COMPLETE (book pp356–371 = PDF pp383–398) | C11 `algebra` — Quadratic equation (**this is its exercise ladder**) |
| 6 | Sequence and Series | ☐ 6.1 + | C11 `algebra` — Sequence and series (cross-ref) |
| 7 | Matrix based System of Linear Equations | ☐ 7.1 + | C11 `algebra` — Matrices and determinants + enrichment |
| 8 | Inverse Circular Functions and Trigonometric Equation | ☐ 8.1 + | C11 `trigonometry` — both topics |
| 9 | Conic Section | ☐ 9.1 + | analytic-geometry **enrichment** |
| 10 | Coordinates in Space | ☐ 10.1 + | C11 `analytic-geometry` — Coordinates in space · C12 `three-dimensional-geometry` |
| 11 | Plane | ☐ 11.1 + | C12 `three-dimensional-geometry` — plane topics |
| 12 | Product of Vectors | ☐ 12.1 + | C12 `vector-algebra` — dot/cross/triple products |
| 13 | Correlation and Regression | ☐ 13.1 + | **enrichment** (statistics track) |
| 14 | Probability | ☐ 14.1 + | C12 `probability` |
| 15 | Derivatives | ☐ 15.1 + | C12 `differentiation` |
| 16 | Application of Derivatives | ☐ 16.1 + | C12 `differentiation` — monotonicity, maxima/minima, rate/approximation |
| 17 | Antiderivative | ☐ 17.1 + | C12 `integration` |
| 18 | Differential Equations | ☐ 18.1 + | C12 `differential-equations` |
| 19 | Linear Programming | ☐ 19.1 + | C12 `linear-programming` |
| 20 | System of Linear Equations | ☐ 20.1 + | **enrichment** (linear systems / numerical) |
| 21 | Statics: Like and Unlike Parallel Forces | ☐ 21.1 + | mechanics **enrichment** |
| 22 | Dynamics: Newton's Laws of Motion and Projectile | ☐ 22.1 + | mechanics **enrichment** |

**Reading the tables**

- **Edition variance (Grade 12):** a second online index lists Mathematical Induction,
  Scalar Triple Product, Computing Roots, Numerical Integration and Mathematics for
  Economics & Finance in the Grade 12 sequence instead of some rows above. Multiple
  printings exist; **V0 records which printing the platform serves** and updates this
  table in place before any solution is written. Nothing is ever dropped: if the
  printing carries an extra chapter, it gets rows and checkboxes here too.
- **Cross-book coverage:** some platform topics draw their exercise ladder from the other
  grade's book (e.g., C11 Quadratic equation ← Grade 12 Ch 5). Those are marked above;
  every mapped exercise is solved regardless of which grade's book it lives in.
- **"Enrichment"** = solved in full and tagged `origin: "book-enrichment"` (the file
  contract's `origin` field) wherever the Mat. 007 order has no matching topic — **no
  book question is ever skipped** because the syllabus doesn't name its chapter.
- **Totals:** Grade 11 = **62 exercises** (cross-verified by two sources). Grade 12 =
  pinned at V0 (baseline **25 exercise slots across 22 chapters**; Ch 1 has at least
  1.1–1.2, Ch 5 = 5.1–5.3 confirmed).
- **Ticking rule:** an exercise's box turns ☑ **only when every question and sub-part is
  filed as a `content/practice/solutions/…` file and its answers are verified** — one
  unticked question keeps the whole exercise open.

## 7. Interfaces-first roadmap
**V0 (first, before any fill):** pin the printing — record the exact chapter, exercise
and question counts of both Sukunda books into §6A (two online indexes disagree on Grade
12's chapter set and counts; Grade 11 is cross-verified at 62 exercises). Update §6A in
place; no solution is ever written against an unverified inventory.
**S1 (next):** all 71 skeletons (blocks I–IX, theorem/condition/formula shells, figure
slots, CEE lines seeded) **+ the §6A exercise-file interfaces** (one `content/practice/
solutions/…` file per exercise, question shells numbered exactly as the book) → schema +
`check:content` + no-placeholder gates. **S2+:** one unit per session — filling notes
**and solving all mapped exercises for that unit's topics** (§6A boxes tick only when
every question is done); Algebra (44h) and Calculus (48h) get 3 sessions each. Parallel
polish. Final: `npm run check:all` + coverage report + §6A completeness count.

## 8. Quality gates
`npm run check:schema` · `npm run check:content` · `content:build:check` · `audit:scopes` ·
`audit:visuals` · no-removal diff review · **worked-example verification** (answers checked
by substitution) per unit · **exercise-completeness gate** — for every ☑ exercise in §6A,
the solved question IDs must equal the book's question IDs exactly (no gaps, no extras,
sub-parts included).

## 9. Tracking checklist

> `node scripts/subject-plan-inventory.mjs mathematics` regenerates this. Legend: **I** =
> interface · **N** = filled to bar · **D** = figures placed · **P** = polished.
>
> Exercise completion is tracked separately in **§6A** (one checkbox per book exercise,
> ticking only when literally every question is solved) — the topic rows stay uniform
> across all six subjects.

<!-- MATH-PLAN:TOPICS:START -->

> Regenerated by `node scripts/subject-plan-inventory.mjs mathematics` from `frontend/lib/syllabus.ts`.
> Coverage: **15 units · 71 topics** (Class 11: 7 units, 28 topics; Class 12: 8 units, 43 topics).

## Class 11

### `algebra` — Algebra (8 topics · 44h)

- [x] I · [ ] N · [ ] D · [ ] P — **Logic and set: statements, logical connectives, truth tables, theorems based on set operations**
- [x] I · [ ] N · [ ] D · [ ] P — **Real numbers: geometric representation of real numbers, interval, absolute value**
- [x] I · [ ] N · [ ] D · [ ] P — **Function: domain and range of a function, inverse function, composite function; algebraic (linear, quadratic and cubic) and transcendental (trigonometric, exponential, logarithmic) functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Curve sketching: odd and even functions, periodicity, symmetry (about origin, X- and Y-axis), monotonicity; graphs of quadratic, cubic and rational functions, trigonometric (asinbx and acosbx), exponential (e^x), logarithmic (lnx)**
- [x] I · [ ] N · [ ] D · [ ] P — **Sequence and series: arithmetic, geometric, harmonic sequences and series and their properties; A.M, G.M, H.M and their relations; sum of infinite geometric series**
- [x] I · [ ] N · [ ] D · [ ] P — **Matrices and determinants: transpose of a matrix and its properties; minors and cofactors, adjoint, inverse matrix, determinant, properties of determinants (without proof)**
- [x] I · [ ] N · [ ] D · [ ] P — **Quadratic equation: nature and roots of a quadratic equation, relation between roots and coefficient, formation of a quadratic equation, symmetric roots, one or both roots common**
- [x] I · [ ] N · [ ] D · [ ] P — **Complex number: imaginary unit, algebra of complex numbers, geometric representation, absolute (modulus) value and conjugate of complex numbers and their properties, square root of a complex number**

### `trigonometry` — Trigonometry (2 topics · 12h)

- [x] I · [ ] N · [ ] D · [ ] P — **Inverse circular functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Trigonometric equations and general values**

### `analytic-geometry` — Analytic Geometry (3 topics · 20h)

- [x] I · [ ] N · [ ] D · [ ] P — **Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines**
- [x] I · [ ] N · [ ] D · [ ] P — **Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines**
- [x] I · [ ] N · [ ] D · [ ] P — **Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line**

### `vectors` — Vectors (2 topics · 12h)

- [x] I · [ ] N · [ ] D · [ ] P — **Collinear and non-collinear vectors, coplanar and non-coplanar vectors**
- [x] I · [ ] N · [ ] D · [ ] P — **Linear combination of vectors, linearly dependent and independent vectors**

### `statistics-and-probability` — Statistics and Probability (2 topics · 12h)

- [x] I · [ ] N · [ ] D · [ ] P — **Measure of dispersion: standard deviation, variance, coefficient of variation, skewness, Karl Pearson's coefficient of skewness**
- [x] I · [ ] N · [ ] D · [ ] P — **Probability: independent cases, mathematical and empirical definition of probability, two basic laws of probability (without proof)**

### `calculus` — Calculus (7 topics · 48h)

- [x] I · [ ] N · [ ] D · [ ] P — **Limits and continuity: limits of a function, indeterminate forms, algebraic properties of limits (without proof), basic theorems on limits of algebraic, trigonometric, exponential and logarithmic functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Continuity of a function, types of discontinuity, graphs of discontinuous function**
- [x] I · [ ] N · [ ] D · [ ] P — **Derivatives: derivative of a function, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions by definition (simple forms)**
- [x] I · [ ] N · [ ] D · [ ] P — **Rules of differentiation; derivatives of parametric and implicit functions; higher order derivatives**
- [x] I · [ ] N · [ ] D · [ ] P — **Geometric interpretation of derivative; monotonicity of a function, interval of monotonicity, extreme values of a function, concavity, points of inflection**
- [x] I · [ ] N · [ ] D · [ ] P — **Anti-derivatives: integration using basic integrals, integration by substitution and by parts methods**
- [x] I · [ ] N · [ ] D · [ ] P — **The definite integral; the definite integral as an area under the given curve; area between two curves**

### `computational-methods-or-mechanics` — Computational Methods or Mechanics (4 topics · 12h)

- [x] I · [ ] N · [ ] D · [ ] P — **Numerical computation: roots of algebraic and transcendental equations (bisection and Newton-Raphson method)**
- [x] I · [ ] N · [ ] D · [ ] P — **Numerical integration: Trapezoidal rule and Simpson's rule**
- [x] I · [ ] N · [ ] D · [ ] P — **Mechanics (optional): Statics — forces and resultant forces, parallelogram law of forces, composition and resolution of forces, resultant of coplanar forces acting on a point**
- [x] I · [ ] N · [ ] D · [ ] P — **Mechanics (optional): Dynamics — motion of particle in a straight line, motion with uniform acceleration, motion under gravity, motion down a smooth inclined plane**

## Class 12

### `limits-and-continuity` — Limits and Continuity (5 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Concept of limit — geometric and physical interpretation**
- [x] I · [ ] N · [ ] D · [ ] P — **Standard limits and evaluation (algebraic, trigonometric, exponential, logarithmic)**
- [x] I · [ ] N · [ ] D · [ ] P — **Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0^0, ∞^0**
- [x] I · [ ] N · [ ] D · [ ] P — **Continuity of algebraic, trigonometric, exponential, logarithmic functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Differentiability and its relation with continuity**

### `differentiation` — Differentiation (9 topics · 16h)

- [x] I · [ ] N · [ ] D · [ ] P — **Derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Rules of differentiation: product rule, quotient rule, chain rule**
- [x] I · [ ] N · [ ] D · [ ] P — **Derivatives of parametric and implicit functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Higher order derivatives**
- [x] I · [ ] N · [ ] D · [ ] P — **Logarithmic differentiation**
- [x] I · [ ] N · [ ] D · [ ] P — **Leibniz's theorem for nth derivative**
- [x] I · [ ] N · [ ] D · [ ] P — **Geometric interpretation — tangent and normal**
- [x] I · [ ] N · [ ] D · [ ] P — **Monotonicity, maxima and minima (first and second derivative tests)**
- [x] I · [ ] N · [ ] D · [ ] P — **Applications: rate of change, approximation, error estimation**

### `integration` — Integration (5 topics · 14h)

- [x] I · [ ] N · [ ] D · [ ] P — **Integration as inverse of differentiation**
- [x] I · [ ] N · [ ] D · [ ] P — **Standard integrals and methods: substitution, parts, partial fractions**
- [x] I · [ ] N · [ ] D · [ ] P — **Definite integrals and properties**
- [x] I · [ ] N · [ ] D · [ ] P — **Integration of trigonometric functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Applications: area under curve, area between two curves**

### `differential-equations` — Differential Equations (3 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Formation of differential equations**
- [x] I · [ ] N · [ ] D · [ ] P — **Solving first order, first degree equations: variable separable, homogeneous, linear**
- [x] I · [ ] N · [ ] D · [ ] P — **Applications: growth and decay, population dynamics**

### `vector-algebra` — Vector Algebra (6 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Scalar and vector quantities, types of vectors**
- [x] I · [ ] N · [ ] D · [ ] P — **Addition, subtraction and scalar multiplication of vectors**
- [x] I · [ ] N · [ ] D · [ ] P — **Dot product (scalar product) and its applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Cross product (vector product) and its applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Scalar and vector triple products**
- [x] I · [ ] N · [ ] D · [ ] P — **Applications: work, torque, angular momentum**

### `three-dimensional-geometry` — Three Dimensional Geometry (5 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Direction cosines and direction ratios of a line**
- [x] I · [ ] N · [ ] D · [ ] P — **Equation of a line in space — standard and general form**
- [x] I · [ ] N · [ ] D · [ ] P — **Equation of a plane — normal form, general form**
- [x] I · [ ] N · [ ] D · [ ] P — **Angle between two lines, two planes, and a line and a plane**
- [x] I · [ ] N · [ ] D · [ ] P — **Distance of a point from a plane and line**

### `linear-programming` — Linear Programming (3 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Linear programming — formulation of LPP**
- [x] I · [ ] N · [ ] D · [ ] P — **Graphical method for solving LPP with two variables**
- [x] I · [ ] N · [ ] D · [ ] P — **Maximization and minimization problems**

### `probability` — Probability (7 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Conditional probability and multiplication theorem**
- [x] I · [ ] N · [ ] D · [ ] P — **Independent events**
- [x] I · [ ] N · [ ] D · [ ] P — **Bayes' theorem and its applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Random variable and its probability distribution**
- [x] I · [ ] N · [ ] D · [ ] P — **Mean, variance and standard deviation of a random variable**
- [x] I · [ ] N · [ ] D · [ ] P — **Binomial distribution — definition, mean, variance**
- [x] I · [ ] N · [ ] D · [ ] P — **Poisson distribution — definition, mean, variance**

<!-- MATH-PLAN:TOPICS:END -->

## 10. Risks & hard rules
No removal ever · CEE content frozen · syllabus order sacred · **no theorem without
hypotheses** · every example fully worked (no "similarly") · **literally all book
questions solved — completeness counted, not assumed** · answers verified · figures
match the text's data · diagram licensing recorded · skeletons carry real shells ·
3-variant duplication handled consistently until the generator is fixed.
