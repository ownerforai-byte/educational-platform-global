# Feature Plan: NEB PYQ Library + Conceptual Guidance + Mistake Awareness (all 6 subjects)

Task type: `feature:` + `content:` across `backend/ai-api` (retrieval/figure lane), `feature/ai-chat` & `feature/notes` (UI), and the `content/*` area branches (authored data). `test:` checks are local to each area. **This document is a plan only — no commit, push, merge, deploy, or content ingestion is performed by writing it.**

> Owner request (2026-11-11): "add files, links of all PYQs from web and make conceptual questions for guidance, and make aware of all mistakes, concepts asked in NEB about all 6 subjects." Research the best sources on the web first, then plan.

---

## 1. Goal

Give every NEB Class 11 & 12 student, in **all six subjects** (Physics, Chemistry, Biology, Mathematics, English, Nepali), one connected study loop:

1. **PYQ library** — a complete, year-by-year past-year-question index with **verified web links** to the official/aggregator papers, plus platform-authored solutions where rights allow.
2. **Conceptual questions for guidance** — authored, misconception-busting conceptual Q&A (not year-bound) that teach *why*, surfaced for practice, SRS flashcards and mock exams.
3. **Mistake awareness** — a per-subject "common mistakes / exam-hall traps" guide and drills that name the exact error, why it costs marks, and the correct habit.
4. **Concepts asked in NEB** — a per-unit blueprint map (concept → marks → question type → cognitive level) transcribed from the **CDC specification grid**, so students see what is actually tested and how heavily.

The loop reuses machinery that already exists: `frontend/lib/pyq-bank.ts` (`PyqYear`, `ConceptDrill`), `frontend/lib/srs.ts`, `frontend/lib/mock-exam.ts`, `frontend/lib/offline-pack.ts`, the `/pyqs`, `/srs`, `/mock-exams`, `/downloads` routes, and the new `backend/src/ai/figure-conditions.ts` syllabus-condition catalogue (powers graph/diagram conceptual questions for Physics & Maths).

---

## 2. Rights & sourcing policy (read first — this shapes everything)

`SOURCES.md` is the binding rights ledger. Two facts control the design:

- **NEB past papers are `⚠️` (rights not confirmed).** Do **not** bulk-reproduce full copyrighted question papers verbatim into the repo. Instead:
  - **Link out** to the official/aggregator paper (a URL + year + subject + exam source is factual metadata, not reproduction).
  - **Author original** solutions, conceptual questions, mistake notes and blueprint summaries in the platform's own words → these are `✅` platform-authored under `CONTENT_LICENSE.md`.
  - Where a question is quoted for teaching, keep it short, attribute the year/board, and log the source in `SOURCES.md`.
- **CDC syllabus/specification grid is `✅` for structural metadata only** (unit order, topic lists, marks, question types) — never verbatim full text. The blueprint map is exactly this allowed metadata.

**Best-plan consequence:** the durable, legally-safe asset is the *platform-authored guidance layer* (conceptual questions + mistakes + blueprint + solutions) wrapped around a *link index* to the papers — not a scraped mirror of every PDF. Every new external source gets a row in `SOURCES.md` with a status (`✅/⚠️/❌`) before ingestion.

---

## 3. Researched web sources (the "best plan" shortlist)

### 3a. Official / authoritative
| Source | Use | Link |
|---|---|---|
| Curriculum Development Centre (CDC), Nepal | Canonical syllabus + **specification grids** for all 6 subjects (concept/marks/question-type blueprint) | https://moecdc.gov.np/ |
| NEB published papers (via aggregators below) | Past-year & model question papers, Grade 11/12 | see 3b |

### 3b. All-subject PYQ / model-question aggregators (link-index targets)
| Source | Coverage | Link |
|---|---|---|
| NEB Education | Class 11 & 12 important + old questions, **all subjects** | https://www.nebeducation.com/ |
| Noteswift PYQ collection | Class 12 PYQs, all subjects (Science + Management) | https://noteswift.in/neb-class-12-past-year-question-all-subjects/ |
| Sajha Notes question papers | NEB Grade 11/12 model + past papers | https://sajhanotes.com/question-papers/ |
| Shiksha Sanjal model questions | Class 12 model questions 2083 (2026), subject-wise PDF | https://shikshasanjal.com/model-questions/class-12 |
| Notesharu | Chapter-wise notes + **solved past questions**, all subjects, free online | https://notesharu.com/neb-notes |
| EduSanjal | Grade 12 model questions (NEB) | https://edusanjal.com/news/grade-12-model-questions-neb/ |
| Educate Nepal | Class 12 exam questions 2080–81 (2024), all subjects | https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects |
| ExamSanjal | NEB exam portal (forms, results, question collections) | https://www.examsanjal.com/ |
| Scribd — XI Science model 2078 | Class 11 Science model questions (NEB) | https://www.scribd.com/document/520936557/XI-SCIENCE-new-model-questions-by-NEB |

### 3c. Specification grids / blueprint (concept & marks mapping)
| Subject | Link |
|---|---|
| Physics Grade 11 grid + model | https://www.scribd.com/document/505569195/Grade-11-Test-Specification-and-Model-Questions-14-22 |
| Mathematics 11 & 12 grid | https://www.youtube.com/watch?v=zfS61xMt6S4 |
| Compulsory English 11 & 12 grid | https://www.youtube.com/watch?v=CQhBYEs3ViQ |
| All-subject grid compilation | http://www.devprasadpandit.com.np/2021/05/some-self-learning-materials.html |
| Nepali / Biology / Maths grids (secondary) | Facebook posts by `studentofnepal`, `mysecondteacher_nepal`, `shikshaa2075` — **verify against CDC before trusting marks** |

### 3d. Common-mistake references (examiner-noted)
| Source | Value | Link |
|---|---|---|
| India Today — board examiners' subject-wise silly errors | Concrete, examiner-observed mistakes (units, formula substitution, working) — transferable to NEB | https://www.indiatoday.in/education-today/tips-and-tricks/story/cbse-class-12-science-board-exam-subject-wise-common-mistakes-noted-by-board-examiners-1430443-2019-01-14 |
| Tutopiya — common science mistakes | describe vs explain, missing units, mole-calc errors, imprecise definitions | https://www.tutopiya.com/blog/common-mistakes-igcse-sciences/ |
| PW — mistakes while practising sample papers | time management, ignoring marking scheme, not analysing errors | https://store.pw.live/blogs/school-exams/mistakes-avoid-while-practicing-cbse-class-12-sample-papers |

### 3e. Conceptual-question banks (seed material — rewrite in our own words)
| Source | Link |
|---|---|
| NEB Class 12 Physics key questions (Jayant Bist) | https://www.scribd.com/document/850084970/www-jayantbist-com-1 |
| Note Library — conceptual Physics questions | https://www.facebook.com/notelibrary/posts/some-important-conceptual-questions-for-physics-neb-class12-nebboardexam-notelib/709365541669724/ |
| NEB Education / Notesharu (again) | important + solved conceptual questions, all subjects |

> **Sourcing rule:** aggregator/Facebook/Scribd items are *leads*, not authority. The CDC grid (3a/3c) is the source of truth for concepts/marks; papers are linked, not mirrored; conceptual questions and mistake notes are **authored original** after consulting these leads.

---

## 4. Data model & files to add (grounded in the existing registry)

`frontend/lib/pyq-bank.ts` already defines the shapes. Reuse them; add three new content families and one link registry.

### 4a. PYQ web-link index (new) — `content/practice/pyq-links/<class>/<subject>.json`
One file per class+subject; an array of verified paper links (metadata only):
```jsonc
{
  "subject": "physics", "classLevel": "11",
  "papers": [
    {
      "year": 2081, "examSource": "NEB", "grade": "11",
      "title": "NEB Class 11 Physics — 2081 (2024)",
      "url": "https://www.educatenepal.com/.../physics-2081",
      "provider": "educatenepal", "kind": "past",   // past | model | important
      "rights": "link-only",                         // never "reproduced"
      "units": ["kinematics", "dynamics", "optics"]  // slugs from syllabus.ts
    }
  ]
}
```
- New reader `frontend/lib/pyq-sources.ts` loads these and exposes `pyqLinksFor(class, subject)`; the `/pyqs` page renders a **"Where to find the full paper"** link list per year, with provider credit.
- Flow into `content/_index.json` via the existing content pipeline (`content-tools/`) so `pyq-bank.ts` and the offline pack see them. **No `questions` array is required for link-only entries** (the bank already tolerates their absence).

### 4b. Conceptual questions (reuse `ConceptDrill`) — `content/drills/<class>/<subject>/<unit>.json`
Exactly the existing schema (`id, question, solution, concept, unit, marks, kind:"concept"|"practical"`). Author **8–15 conceptual drills per unit**, each targeting one classic misconception or one "why" question. These already ride into `/pyqs`, `/srs` (flashcards) and `/mock-exams` (written section) — **no new UI plumbing needed**.

### 4c. Mistake awareness (new) — `content/practice/mistakes/<class>/<subject>.json`
```jsonc
{
  "subject": "physics", "classLevel": "12",
  "examHall": ["Label every diagram; an unlabelled ray diagram loses marks even if correct.", "..."],
  "mistakes": [
    {
      "id": "phy-12-optics-sign",
      "topic": "Lens/mirror sign convention",
      "wrong": "Using u positive for a real object in the Cartesian convention.",
      "why": "NEB uses the New Cartesian sign convention; u is negative for a real object.",
      "fix": "Draw the axis, mark pole/optical centre, assign signs from the diagram before substituting.",
      "unit": "ray-optics", "marks": "2-4"
    }
  ]
}
```
- Render as a **"Common mistakes"** tab on `/pyqs` and as a guidance callout in Veer chat when the asked topic matches a mistake `unit`.
- Optionally lower the highest-yield mistakes into `ConceptDrill` (`kind:"concept"`) so they enter SRS.

### 4d. NEB blueprint / concepts-asked map (new) — `content/practice/blueprint/<class>/<subject>.json`
Structural metadata transcribed from the CDC specification grid (allowed `✅`):
```jsonc
{
  "subject": "physics", "classLevel": "12", "source": "CDC specification grid",
  "units": [
    {
      "unit": "electrostatics", "hours": 12, "marks": 8,
      "concepts": ["Coulomb's law", "field & potential", "Gauss's law", "capacitor"],
      "questionTypes": { "mcq": 2, "short": 2, "long": 1 },
      "cognitive": { "knowledge": 20, "understanding": 40, "application": 30, "higher": 10 }
    }
  ]
}
```
- New reader `frontend/lib/neb-blueprint.ts`; a **"NEB blueprint"** view on `/pyqs` (unit → marks → concepts → question types) and a high-yield sort in `/planner` (`frontend/lib/study-plan.ts`).

### 4e. Solutions (platform-authored, `✅`)
Where a linked paper's question is taught, author an **original worked solution** into the existing `PyqYear.questions[].solution` (or a drill). Never paste a publisher's solution verbatim.

---

## 5. Per-subject plan (concepts asked · common mistakes · conceptual seeds)

For each subject: the high-yield concepts NEB tests, the mistakes to make students aware of, and 2 example conceptual-question seeds (the full set is authored per unit in 4b). Marks/question types are finalized from the CDC grid (4d), not guessed here.

### 5.1 Physics (11 & 12)
- **Concepts asked:** kinematics graphs & projectile; Newton's laws/free-body; work-energy-power; circular motion; gravitation (g vs height/depth, satellites); elasticity (stress-strain); heat & thermodynamics (heating curve, gas processes P-V/T); optics (all mirror/lens object positions, prism, dispersion); electrostatics & capacitors; DC circuits (Kirchhoff, potentiometer, meter bridge); magnetism & EMI; AC; wave optics (interference/diffraction); modern physics (photoelectric, Bohr, nuclear); solids/semiconductors; communication.
- **Common mistakes:** missing/incorrect SI units; substituting values before writing the working formula; sign errors in optics & electrostatics; real vs virtual ray confusion; unlabelled diagrams; degree/radian mixing; wrong g sign in free fall; vector direction errors; forgetting area-under-graph meaning.
- **Conceptual seeds:** "Why is the electric field inside a conductor zero in electrostatics?" · "A body is thrown up — sketch v-t and explain the slope and area at the peak." (Graph seeds auto-generate from `figure-conditions.ts`.)

### 5.2 Chemistry (11 & 12)
- **Concepts asked:** mole concept & stoichiometry; atomic structure & quantum numbers; periodic trends; chemical bonding (VSEPR, hybridisation); states of matter; redox & equilibrium (Le Chatelier, Kc/Kp); ionic equilibrium (pH, buffer, Ksp); electrochemistry (Nernst, cells); kinetics (order, half-life); surface chemistry; p/d/f-block; coordination compounds; organic (IUPAC, isomerism, reaction mechanisms — haloalkanes, alcohols/phenols/ethers, aldehydes/ketones/acids, amines); biomolecules & polymers.
- **Common mistakes:** unbalanced equations; wrong molar mass/mole ratio; missing state symbols & reaction conditions; IUPAC naming/numbering errors; wrong Aufbau/(n+l) filling; oxidation-state slips; confusing order vs molecularity; unit errors in Kc/rate; missing curly-arrow direction in mechanisms.
- **Conceptual seeds:** "Why does a buffer resist pH change on adding a little acid?" · "Explain why [Cu(NH₃)₄]²⁺ is coloured but [Zn(NH₃)₄]²⁺ is not."

### 5.3 Biology (11 & 12)
- **Concepts asked:** biomolecules & enzymes; cell structure & organelles; cell cycle (mitosis/meiosis); plant anatomy & physiology (transport, photosynthesis, respiration, transpiration); human physiology (digestion, respiration, circulation, excretion, locomotion, neural, endocrine); reproduction (plant & human); genetics (Mendel, linkage, molecular basis, DNA replication/transcription/translation); evolution; ecology (ecosystem, biodiversity, conservation); biotechnology & applied biology; health & disease.
- **Common mistakes:** "describe" vs "explain" confusion; imprecise definitions; unlabelled/mislabelled diagrams; missing ploidy (n/2n/3n) in life cycles; mixing mitosis/meiosis stages; wrong taxonomic spelling (italic genus/species); missing units in physiology; over-generalising exceptions.
- **Conceptual seeds:** "Why is the nephron called the structural and functional unit of the kidney?" · "A cell has 2n=16 — how many chromosomes and chromatids at metaphase of mitosis vs metaphase I?"

### 5.4 Mathematics (11 & 12)
- **Concepts asked:** algebra (quadratic sign cases, sequences/series, permutations/combinations, binomial); trigonometry (identities, equations, graphs); coordinate geometry (straight line, conics — all four parabola orientations, circle theorems); vectors & 3D; calculus (limits, continuity, differentiation, integration, differential equations); statistics & probability; linear programming; computational methods/numerical methods; mechanics (optional).
- **Common mistakes:** omitting domain/range; missing sign cases (a>0/a<0, D>0/=/ <); wrong limit/continuity reasoning; forgetting +C in indefinite integrals; chain-rule slips; unlabelled graph axes/units; wrong vector direction; LPP corner-point/infeasible-region errors; probability sample-space mistakes.
- **Conceptual seeds:** "Sketch y = x² − 4x + 3 for a>0 and mark roots, vertex and sign intervals." · "Why does ∫f'(x)/f(x) dx = ln|f(x)| + C, and why the modulus?" (Graph seeds from `figure-conditions.ts`.)

### 5.5 English (11 & 12, compulsory)
- **Concepts asked:** reading comprehension (seen/unseen); grammar (tenses, voice, narration, prepositions, articles, subject-verb agreement, transformation, conditionals); guided & free writing (essay, letter, report, story, dialogue); literature (poems, stories, essays from the NEB text — theme, character, style); phonetics & vocabulary; summary & note-making.
- **Common mistakes:** subject-verb agreement; tense inconsistency; wrong preposition/article; narration/voice transformation errors; weak essay structure (no thesis/paragraphing); spelling; misreading the comprehension question; quoting instead of paraphrasing; ignoring word limits.
- **Conceptual seeds:** "Change 'He said, "I am busy now."' into indirect speech and explain each shift." · "Distinguish a theme from a moral in the prescribed poem."

### 5.6 Nepali (11 & 12, compulsory)
- **Concepts asked:** व्याकरण (वर्ण/उच्चारण, सन्धि, समास, उपसर्ग–प्रत्यय, कारक/विभक्ति, लिङ्ग, वचन, पुरुष, काल, पक्ष, वाच्य, वाक्य संरचना, शुद्धाशुद्धि); साहित्य (कविता, कथा, निबन्ध, नाटक — पाठ्यपुस्तकको भावार्थ, व्याख्या, समीक्षा); लेखन (निबन्ध, पत्र, संवाद, प्रतिवेदन, सारांश); पठन बोध; भावार्थ/व्याख्या।
- **Common mistakes:** शुद्धाशुद्धि (हिज्जे/वर्ण); सन्धि/समास गलत विच्छेद; कारक/विभक्ति प्रयोग; वाच्य/काल/पक्ष भ्रम; लिङ्ग/वचन agreement; भावार्थ/व्याख्या सतही (भाव नखोल्ने); निबन्ध संरचना कमजोर; शब्दसीमा नाघ्ने।
- **Conceptual seeds:** "'सन्धि' र 'समास' बीच भिन्नता उदाहरणसहित छुट्याउनुहोस्।" · "पाठ्यकविताको केन्द्रीय भाव एक अनुच्छेदमा व्याख्या गर्नुहोस्।"

---

## 6. Implementation phases

**Phase 0 — Rights & schema (gate).**
- Add every external source (3b–3e) to `SOURCES.md` with status; mark NEB papers `link-only`.
- Land the four schemas (4a–4d) + readers (`pyq-sources.ts`, `neb-blueprint.ts`) with unit tests; validate JSON via the content pipeline. No content yet.

**Phase 1 — PYQ link index (all 6 subjects, 11 & 12).**
- Author `pyq-links/<class>/<subject>.json` covering available years (2078–2083) with verified URLs + provider + units. Wire the `/pyqs` "full paper" link list. Verify every URL resolves (link-check script); drop dead links.

**Phase 2 — Blueprint map (concepts asked).**
- Transcribe CDC specification-grid metadata into `blueprint/<class>/<subject>.json` (units, hours, marks, concepts, question types, cognitive split). Add the `/pyqs` blueprint view + `/planner` high-yield sort. Cross-check unit slugs against `frontend/lib/syllabus.ts`.

**Phase 3 — Conceptual questions (guidance).**
- Author 8–15 `ConceptDrill` per unit (4b) for all 6 subjects; Physics/Maths graph seeds generated from `figure-conditions.ts`. These auto-flow to `/srs` and `/mock-exams`. Add a coverage test (every syllabus unit has ≥ N drills).

**Phase 4 — Mistake awareness.**
- Author `mistakes/<class>/<subject>.json` (exam-hall list + per-topic wrong/why/fix). Render the "Common mistakes" tab; surface a matching callout in Veer chat by `unit`. Promote top mistakes into SRS drills.

**Phase 5 — Solutions & integration.**
- Author original worked solutions for the highest-yield linked questions into `PyqYear.questions[].solution`. Include the new families in the offline pack (`offline-pack.ts`). Add a Veer-chat retrieval hook so a asked topic pulls its blueprint + top mistakes + conceptual drills as grounding (reuse `buildCitations`).

**Phase 6 — Validation & gate.**
- Focused tests per area; `npm run check` scoped; `npm run check:all` before any `main` push. Link-check + JSON-schema + syllabus-parity gates green. Update `CORE_FILES.md` registries and `SOURCES.md`.

---

## 7. Acceptance criteria

- Every subject (6) × class (11, 12) has: a PYQ link index with **working, attributed** URLs; a CDC-sourced blueprint; ≥ 8 conceptual drills per unit; a mistake guide. No dead links; no verbatim copyrighted paper/solution reproduced.
- `SOURCES.md` lists every new external source with a rights status; NEB papers are `link-only`; authored guidance is `✅`.
- Conceptual drills appear in `/pyqs`, `/srs` and `/mock-exams` without new plumbing; blueprint + mistakes render on `/pyqs`; offline pack includes them.
- Blueprint unit slugs match `frontend/lib/syllabus.ts`; marks/question types trace to the CDC grid (not invented).
- Physics/Maths graph conceptual questions are consistent with `figure-conditions.ts` (correct standard cases, axes, units).
- Focused tests + scoped check pass; `check:all` green before push. `CORE_FILES.md` updated.

---

## 8. Constraints / out of scope

- **No scraping/mirroring** of full copyrighted papers or publisher solutions; link out + author original guidance.
- **No new paid API/key/dependency** required (link index + authored JSON + existing readers).
- No branch push/commit/deploy as part of *this plan document*; implementation happens later per area branch, with the full gate before `main`.
- Facebook/Scribd/YouTube grids are leads only — CDC is authoritative for concepts/marks; verify before trusting.
- Do not bulk-read or speculatively edit adjacent `content/**`, `backend/kb/**`, `backend/.ocr-v2/**` payloads; author only the named new files.

---

## 9. Web sources (researched 2026-11-11)

- [Curriculum Development Centre (CDC), Nepal](https://moecdc.gov.np/)
- [NEB Education — Class 11/12 important + old questions, all subjects](https://www.nebeducation.com/)
- [Noteswift — NEB Class 12 PYQ collection, all subjects](https://noteswift.in/neb-class-12-past-year-question-all-subjects/)
- [Sajha Notes — NEB Grade 11/12 question papers](https://sajhanotes.com/question-papers/)
- [Shiksha Sanjal — NEB Class 12 model questions 2083 (2026)](https://shikshasanjal.com/model-questions/class-12)
- [Notesharu — NEB notes + solved past questions, all subjects](https://notesharu.com/neb-notes)
- [EduSanjal — Grade 12 model questions (NEB)](https://edusanjal.com/news/grade-12-model-questions-neb/)
- [Educate Nepal — NEB Class 12 exam questions 2080–81 (2024), all subjects](https://www.educatenepal.com/news/detail/neb-class-12-exam-questions-2080-2081-2024-all-subjects)
- [ExamSanjal — NEB exam portal](https://www.examsanjal.com/)
- [Scribd — Class 11 Science model questions 2078 (NEB)](https://www.scribd.com/document/520936557/XI-SCIENCE-new-model-questions-by-NEB)
- [Scribd — Physics Grade 11 specification grid + model](https://www.scribd.com/document/505569195/Grade-11-Test-Specification-and-Model-Questions-14-22)
- [YouTube — Mathematics specification grid, Class 11 & 12](https://www.youtube.com/watch?v=zfS61xMt6S4)
- [YouTube — Compulsory English specification grid, Class 11 & 12](https://www.youtube.com/watch?v=CQhBYEs3ViQ)
- [Dev Prasad Pandit — Specification Grid (All) compilation](http://www.devprasadpandit.com.np/2021/05/some-self-learning-materials.html)
- [India Today — board examiners' subject-wise common mistakes](https://www.indiatoday.in/education-today/tips-and-tricks/story/cbse-class-12-science-board-exam-subject-wise-common-mistakes-noted-by-board-examiners-1430443-2019-01-14)
- [Tutopiya — common science exam mistakes](https://www.tutopiya.com/blog/common-mistakes-igcse-sciences/)
- [PW — mistakes to avoid while practising sample papers](https://store.pw.live/blogs/school-exams/mistakes-avoid-while-practicing-cbse-class-12-sample-papers)
- [Scribd — NEB Class 12 Physics key questions (Jayant Bist)](https://www.scribd.com/document/850084970/www-jayantbist-com-1)
- [Note Library — conceptual Physics questions (NEB Class 12)](https://www.facebook.com/notelibrary/posts/some-important-conceptual-questions-for-physics-neb-class12-nebboardexam-notelib/709365541669724/)