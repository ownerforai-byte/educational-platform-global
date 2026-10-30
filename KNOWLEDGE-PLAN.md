# 📘 Knowledge Validity Plan — Every Topic, Every Unit, All 6 Subjects

> **Goal:** make the knowledge of **every one of the 696 syllabus topics** (116 units × 6
> subjects, Class 11 + Class 12) **valid, natural, and complete** — verified against real
> research (Google Scholar, Consensus, PubMed, authority databases), repaired **in place**,
> never deleted.
>
> - **Owner:** platform owner (execution: any human or agent contributor)
> - **Created:** 2026-10-28 · **Source of truth for order:** `frontend/lib/syllabus.ts`
> - **Execution order (mandated):** **Biology → Chemistry → Physics → Math → English → Nepali**
> - **Status legend for the checklist in §12:**
>   `[ ]` not started · `[~]` in review · `[x]` verified (no change needed) ·
>   `[!]` verified + corrected/expanded · `[?]` disputed/escalated (see §11)

---

## 0. How to use this plan (60-second version)

1. Pick the **next unchecked row** in §12 (top to bottom — Biology first).
2. Run the **8-step Validation Card** (§5) on that topic: extract claims → search sources →
   verdicts → repair in place → naturalness pass → completeness pass → run repo checks.
3. Store the card (§9) under `reports/knowledge-validation/…` and tick the row in §12 with
   `[x]`, `[!]` or `[?]`.
4. One **unit** per session is the right batch size (≈5–15 topics). Never skip ahead to
   another subject until the current subject's exit gate (§8) passes.
5. Before each commit run `npm run check`; before each push to `main` run `npm run check:all`.
6. Regenerate the checklist after any syllabus change:
   `node scripts/knowledge-plan-inventory.mjs`.

That is the whole loop. The rest of this document defines what "valid, natural, complete"
means, which sources count, and where each subject's dangers live.

---

## 1. Objective & scope

| Subject | Units | Topics | Classes covered |
|---|---:|---:|---|
| Biology | 19 | 105 | Class 11 + 12 |
| Chemistry | 28 | 188 | Class 11 + 12 |
| Physics | 35 | 165 | Class 11 + 12 |
| Mathematics (Math) | 15 | 71 | Class 11 + 12 |
| English | 11 | 116 | Class 11 + 12 |
| Nepali | 8 | 51 | Class 11 + 12 |
| **Total** | **116** | **696** | |

**In scope:** every factual claim inside every topic's concept material (definitions, laws,
formulas, numbers, units, taxonomy, names, dates, attributions, examples, diagrams' labels)
plus the *naturalness* and *completeness* of the explanation itself.

**Explicitly out of scope:** removing or replacing the current curriculum. The mandate is
**"don't remove current but make them valid"** — repair, modernize, expand and de-garble
what exists; never wholesale-rewrite or delete working content (also `AGENT_RULES.md` →
Safety/Integrity: *no agent may delete working functionality without explicit approval*).

**Baseline snapshot (2026-10-28, `npm run check:all` full gate — all green):**

- 4,231 content JSON files, **0 broken**
- Note corpus: **2,777 files** across 280 scopes → **2,345 authored / 432 thin / 0 placeholder**
- **81 of 280 note scopes are partial/THIN** — a "thin" concept file has **< 4 notes**
  (the repo's own definition, see `check-thin-class12.mjs`)
- Visual coverage: 696/696 topics have on-topic trees; mindmap depth packs: 10 units
- These numbers are the starting scoreboard. The plan is finished when **thin = 0**,
  every §12 row is ticked, and the full gate is green.

---

## 2. Ground rules (non-negotiable)

1. **Repair in place, never remove.** Wrong facts get corrected in the same file; thin
   files get expanded; garbled OCR gets cleaned. Existing correct content stays.
2. **`frontend/lib/syllabus.ts` is the single source of truth for curriculum order.**
   Never reorder or rename units/topics without explicit owner approval
   (`AGENT_RULES.md` → Mandatory Syllabus-Order Rule). Content maps to the syllabus, not
   the other way round.
3. **Cite or don't claim.** Every corrected or added fact carries a source record (§4.3).
4. **Free sources only** (`AGENT_RULES.md` → Security: avoid paid services): Google
   Scholar, Consensus, Semantic Scholar, PubMed, NepJOL, open textbooks, authority
   databases — all free.
5. **Stop and report, don't guess.** If a subject, unit, or fact cannot be verified,
   mark the row `[?]` and escalate (`AGENT_RULES.md`: *if a subject is not listed … STOP
   and report it*).
6. **Track the work.** Every session updates `SYSTEM_WORK_TRACKER.md` (task status) and the
   validation ledger (§10). Completed and blocked work must be recorded.
7. **No content outside the syllabus order** — no free-floating topics. New material goes
   inside an existing topic's concept files.

---

## 3. Definition of Done — "valid, natural, complete"

### Valid (factually correct & sourced)
- Every factual claim matches the best current authoritative sources (§4).
- Numbers, constants, units, formulas, taxonomies, names and dates are current and correct.
- No outdated science presented as current (e.g., retired classifications, superseded
  values, pre-2019 SI definitions used as "the" definition).
- Every correction/verification has at least **one Tier-1/2 source** on record.

### Natural (reads like a good teacher wrote it)
- Grade-appropriate, flowing prose — not a bullet dump, not translated English (this
  applies to Nepali content most of all: native-quality Devanagari Nepali).
- Consistent terminology and notation **within and across** files of a subject
  (same symbol for the same quantity, same spelling for the same term).
- No OCR garbage, broken characters, duplicated sentences, or leftover placeholder text.

### Complete (nothing missing for the syllabus topic)
- The topic string from `syllabus.ts` is fully decomposed: every examinable sub-point has
  a matching explanation, formula, and at least one example where the topic implies one.
- The concept file is **not thin**: ≥ 4 substantive notes (repo definition), with the
  linked visuals/mindmap entries on-topic (`npm run audit:visuals`, `npm run audit:mindmap`).
- Cross-references intact: notes ↔ formulas ↔ labs/visuals ↔ PYQs where they exist.

### Measurable exit gate (per topic, per subject, final)
| Level | Gate |
|---|---|
| Topic | Validation Card stored; row ticked `[x]`/`[!]`; ≥ 1 Tier-1/2 source |
| Unit | All rows ticked; `npm run audit:scopes` shows no THIN scope for the unit |
| Subject | All subject rows ticked; thin count 0; `npm run check:content` green |
| Plan complete | 696/696 ticked · thin = 0 · `npm run check:all` green · `SYSTEM_WORK_TRACKER.md` updated |

---

## 4. Research method & source hierarchy

### 4.1 Where to search (all free)
| Tool | Use for |
|---|---|
| **Google Scholar** | primary & review literature, historical attributions |
| **Consensus** (consensus.app) | quick evidence checks ("is claim X supported?") |
| **Semantic Scholar** | paper discovery + citation trails |
| **PubMed** | biology/medicine facts, physiology numbers |
| **NepJOL** (Nepal Journals Online) | Nepali linguistics, local curriculum research |
| **arXiv** | physics/math modern topics (preprints — Tier 3 weight) |
| **Google Books / archive.org** | textbook editions, literary histories |
| **Authority databases** | see per-subject packs in §8 |

### 4.2 Source tiers
- **Tier 1 — authority standards:** IUPAC (Gold/Red/Blue Books), NIST, BIPM (SI), CODATA,
  ICTV, APG IV, IUCN Red List, NCBI/UniProt, Nepali Academy (नेपाल प्रज्ञा–प्रतिष्ठान).
- **Tier 2 — peer-reviewed research:** journal articles and reviews found via the search
  tools above.
- **Tier 3 — standard textbooks & curriculum documents:** NCERT XI/XII, NEB curriculum
  documents and prescribed texts, standard degree-level texts.
- **Tier 4 — reputable reference works:** Britannica, Oxford Reference, MathWorld,
  Encyclopedia of Math. Use for cross-checking, not as sole evidence.

### 4.3 Citation record (per corrected fact)
```
claim: "…"
verdict: VALID | OUTDATED | WRONG | UNSOURCED
source: Author(s), Title, Venue, Year — URL/DOI (tier: 1–4)
action: none | corrected | expanded | de-garbled
```

### 4.4 Conflict resolution
1. Newest authoritative source wins for data (constants, taxonomy, statistics).
2. Majority of recent Tier-1/2 sources wins for contested claims; if still contested →
   `[?]` and teach the consensus view with a one-line note that debate exists.
3. **Curriculum-depth rule:** the platform teaches NEB-level syllabus depth. Being *valid*
   never means going beyond the syllabus; add a short "beyond the syllabus" note at most.
4. Where the syllabus itself is outdated (e.g., an old classification), teach the syllabus
   term **and** the current standard side by side, with the source — never silently
   contradict the examinable curriculum.

---

## 5. The per-topic workflow — Validation Card (8 steps)

1. **Pick** the next unchecked §12 row (Biology first, top-down).
2. **Inventory the files** for that topic only (concept JSON, formula/mindmap/visual
   entries) — read only the target topic's files (`AGENT_RULES.md`: no bulk reads).
3. **Extract claims:** list every checkable statement (definitions, laws, formulas,
   numbers, names, dates, taxonomy, mechanisms, examples).
4. **Search & verify:** run each claim through §4.1 tools; need ≥ 2 independent sources
   and ≥ 1 Tier-1/2 source per non-trivial claim.
5. **Verdict per claim** using §4.3; anything OUTDATED/WRONG is repaired **in place**;
   UNSOURCED claims get sources or get reworded to what the source supports.
6. **Naturalness pass:** read the file aloud once; fix garbled text, notation clashes,
   duplicated sentences, translationese (especially Nepali and English content).
7. **Completeness pass:** decompose the `syllabus.ts` topic string into sub-points and
   tick each; expand thin files (target ≥ 4 substantive notes); fix diagram labels.
8. **QA & record:** run the checks in §6, store the card (§9), tick the row, update
   `SYSTEM_WORK_TRACKER.md`.

Statuses used in §12: `[~]` after step 2, `[x]` if no change needed, `[!]` if corrected or
expanded, `[?]` if escalation is required.

---

## 6. Repo tooling & where knowledge lives

| Task | Command / location |
|---|---|
| Regenerate §12 checklist | `node scripts/knowledge-plan-inventory.mjs` |
| Thin-file audit (class 12) | `node check-thin-class12.mjs` |
| Content JSON + schema validation | `npm run check:content` (health check + `check:schema`) |
| Full content diagnosis | `npm run content:doctor` |
| Scope coverage (thin/placeholder) | `npm run audit:scopes` (gate: `audit:scopes:fail`) |
| Mindmap / visual topicality | `npm run audit:mindmap` · `npm run audit:visuals` |
| Derived data ledger | `npm run ledger:build` · `npm run ledger:check` |
| Scoped check before commit | `npm run check` |
| Full gate before push to `main` | `npm run check:all` |

**Where files live:** concept/note JSON trees under `content/` (class-11 / class-12
subject-unit scopes) and the derived runtime data under `frontend/public/data/**`. Path
mapping is owned by `frontend/lib/content/paths.ts` and `frontend/lib/note-routes.ts` —
if names differ across legacy trees, trust those files, do not rename anything.

**After content edits, rebuild derived artifacts** where the checks demand it
(`ledger:build`, mindmaps) so runtime stays in parity with source.

---

## 7. Execution phases & exit gates

| Phase | Subject | Size | Exit gate |
|---|---|---:|---|
| **0** | Baseline & freeze | — | Doctor + audits run; baseline numbers recorded in `SYSTEM_WORK_TRACKER.md`; ledger file started |
| **1** | **Biology (PILOT)** | 105 topics / 19 units | All Biology rows `[x]`/`[!]`; Biology thin = 0; `check:content` green |
| **2** | Chemistry | 188 / 28 | same pattern |
| **3** | Physics | 165 / 35 | same pattern |
| **4** | Mathematics (Math) | 71 / 15 | same pattern |
| **5** | English | 116 / 11 | same pattern |
| **6** | Nepali | 51 / 8 | same pattern |
| **7** | Cross-subject QA & sign-off | — | Notation/terminology consistency sweep; `npm run check:all` green; thin = 0; tracker updated |

**Phase 1 pilot detail (start here):** before touching all of Biology, run the full 8-step
card on **one** Class 11 Biology unit (biomolecules-and-cell-biology is the best-covered
unit and a good calibration ground). Record what the card format should capture, adjust
§9 once, then roll through the rest of Biology unit by unit in curriculum order. Within a
unit, work thin topics first (they need the most repair).

**Cadence rule:** one unit per session, Biology first, subject-by-subject — do not run
subjects in parallel, so terminology fixes land consistently and the pilot lessons carry
forward. Total remaining work is 696 topic rows; the checklist in §12 is the single
progress measure anyone can read.

---

## 8. Per-subject playbooks

### 8.1 Biology — 19 units, 105 topics *(phase 1 — start)*
- **Unit families & research focus:** cell & molecular biology (molecular facts, cell
  organelle functions, division stages); diversity units — flora/fauna (⚠️ taxonomy:
  classifications change; verify family/genus placement against current APG IV / current
  zoological taxonomy; teach NEB names alongside current ones); human biology & health
  (physiology numbers, diseases, pathogens); genetics & evolution (genetic code, central
  dogma + known exceptions, inheritance ratios, evolutionary timelines); ecology &
  environment (population data, IUCN status, ecological terms); microbiology &
  biotechnology (technique steps — PCR, rDNA, fermentation; current approvals/GMO facts).
- **Source pack:** NCERT XI/XII Biology · Campbell Biology · PubMed reviews · APG IV ·
  ICTV (virus taxonomy) · IUCN Red List · NCBI/UniProt · WHO fact sheets.
- **Known weak spots (baseline):** heredity/evolution scopes (8 + 6 thin),
  human-health scopes (4 + 3), microbes-welfare (3 + 3), organisms-and-environment (3 + 4),
  strategies-for-food-production (4).
- **Pitfalls:** disease/drug facts date fast — always check year; taxonomy must not
  contradict the examinable syllabus (§4.4 rule 4).

### 8.2 Chemistry — 28 units, 188 topics *(phase 2)*
- **Unit families & research focus:** physical chemistry (stoichiometry, atomic structure,
  bonding, equilibrium, kinetics, electrochemistry, solutions — constants and equations);
  inorganic (periodic data, metals/non-metals, industrial processes); organic (IUPAC
  nomenclature, mechanisms, named reactions); applied/bio-inorganic & everyday-life
  chemistry (uses, safety, environmental impact).
- **Source pack:** IUPAC Gold Book (terms), Red Book (inorganic nomenclature), Blue Book
  (organic nomenclature) · NIST Chemistry WebBook · NCERT XI/XII · Atkins · peer-reviewed
  organic reviews (Google Scholar).
- **Known weak spots (baseline):** class-11 atomic-structure (**42 thin** — worst scope on
  the platform), stoichiometry (18), chemistry-of-non-metals (18), aromatic-hydrocarbons
  (7), class-12 chemical-kinetics/solutions/electrochemistry (5–6 each).
- **Pitfalls:** reaction conditions (T, P, catalyst) are the most-wrong facts in chemistry
  notes — verify each; keep mechanism arrow-pushing consistent in visuals.

### 8.3 Physics — 35 units, 165 topics *(phase 3)*
- **Unit families & research focus:** mechanics & thermal physics (law statements, sign
  conventions, assumptions like "ideal gas"/"inextensible string"); electricity &
  magnetism (circuit conventions, unit definitions); optics (sign convention consistency,
  wave/particle facts); modern & nuclear physics (⚠️ fast-moving: SI 2019 definitions,
  gravitational waves, quantum-computing claims — verify against current reviews);
  communication systems & recent trends (technology state-of-the-art).
- **Source pack:** BIPM SI Brochure (unit definitions) · NIST CODATA (constants) ·
  NCERT XI/XII · Halliday/Resnick · Reviews of Modern Physics · APS/NASA public data for
  astrophysics facts.
- **Known weak spots (baseline):** note scopes are currently **clean (0 thin)** — Physics
  work is *validity-focused* (correctness of statements and numbers), not coverage-focused.
- **Pitfalls:** constant values and SI definitions (ampere, mole, kelvin, candela
  redefinitions post-2019); "textbook simplifications" should be labelled as such, not
  stated as exact laws.

### 8.4 Mathematics (Math) — 15 units, 71 topics *(phase 4)*
- **Unit families & research focus:** algebra & trigonometry (identities, domains);
  analytic geometry & vectors (formula derivations, conventions); calculus
  (limits/continuity, differentiation, integration — theorem hypotheses!); differential
  equations; probability & statistics; linear programming; optional/computational
  mechanics.
- **Source pack:** standard degree-level texts (Stewart/Thomas-level for calculus,
  standard NEB references) · Wolfram MathWorld · Encyclopedia of Math · AMS Notices for
  history/attribution · verify every computation symbolically/numerically before shipping.
- **Known weak spots (baseline):** limits-and-continuity (17 + 17 thin), vectors
  (10 + 8), algebra (11 + 5), three-dimensional-geometry (9), analytic-geometry (2 + 7),
  differentiation (7), linear-programming (6), differential-equations (5).
- **Pitfalls:** theorem statements need their **hypotheses** (Rolle/LMVT/Taylor); formula
  conditions (e.g., binomial expansion validity ranges) are often dropped — restore them;
  one wrong worked example poisons trust — check each step.

### 8.5 English — 11 units, 116 topics *(phase 5)*
- **Unit families & research focus:** literature & comprehension (author/work/date facts,
  prose/poem contexts); grammar & language (rule statements, modern usage); writing skills
  (formats — letters, essays, reports: verify against current standard formats); oral
  communication & critical thinking (definitions of rhetorical/argument concepts).
- **Source pack:** Oxford Companion to English Literature · Britannica · Poetry
  Foundation · Cambridge/Oxford learner references + CGEL summaries for grammar ·
  standard style guides for formats.
- **Known weak spots (baseline):** class-11 grammar (6 thin), class-12 grammar (5),
  oral-communication (4), writing-skills (1).
- **Pitfalls:** literary facts (dates, prize years, authorship) must be checked, not
  remembered; "natural" matters double here — the English itself must be idiomatic and
  error-free.

### 8.6 Nepali — 8 units, 51 topics *(phase 6 — last)*
- **Unit families & research focus:** साहित्य अध्ययन (literary history, movements,
  authors, works — names/dates); भाषा तथा व्याकरण (सन्धि, समास, कारक, छन्द, वाक्य
  संरचना — rule accuracy per standard Nepali grammar); कथा/नाटक/संस्कृति (text
  contexts, cultural facts); लेखन तथा रचना (composition forms and norms).
- **Source pack:** नेपाल प्रज्ञा–प्रतिष्ठान (Nepal Academy) publications · NEB prescribed
  texts · standard curricular literary histories · NepJOL + Google Scholar (Nepali
  linguistics) · orthography norms used by the Nepal Academy.
- **Known weak spots (baseline):** भाषा-व्याकरण scopes are the thinnest on the platform
  (13 + 12 thin), लेखन-रचना (2 + 1), कथा-नाटक-संस्कृति (3), साहित्य-अध्ययन (3).
- **Pitfalls:** keep Devanagari text intact and correctly spelled — "natural" means
  native-quality Nepali prose, not translated English; author names and work titles need
  scholarly verification (common factual drift in study notes).

---

## 9. Validation Card template

Store one card per topic at `reports/knowledge-validation/<class>/<subject>/<unit>.md`
(one file per unit, one heading per topic):

```markdown
### <topic title from syllabus.ts>
- status: [x] | [!] | [?]        date: YYYY-MM-DD     reviewer: <name/agent>
- claims checked: N   corrected: N   expanded: N   de-garbled: N
- sources:
  - <Author>, <Title>, <Venue>, <Year> — <URL/DOI> (tier N)
- corrections:
  - claim: "…" → verdict: WRONG → action: corrected to "…" (source: …)
- completeness: sub-points covered N/N · notes count N (thin? yes/no)
- naturalness: ok | fixed: <what>
```

---

## 10. Quality gates & reporting

- **Per session:** `npm run check:content` + `npm run audit:scopes` (the subject's thin
  count must not rise, must fall) + card written + §12 rows ticked.
- **Per commit:** `npm run check` (scoped). **Per push to `main`:** `npm run check:all`.
- **Per phase:** subject exit gate (§7); record result in `SYSTEM_WORK_TRACKER.md`
  (status, owner, date; BLOCKED with reason if escalated).
- **Final acceptance:** 696/696 rows ticked · thin = 0 · placeholder = 0 ·
  `npm run check:all` green · all `[?]` escalations resolved or documented.

---

## 11. Risks & edge cases

1. **OCR-derived garble** (corpus derives from scanned material): de-garble against the
   source image/research — never "smooth over" an unreadable fact, mark `[?]` instead.
2. **Legacy scope aliases** (e.g., `oxidation-reduction` vs `oxidation-and-reduction`,
   `heredity-evolution` vs `heredity-and-evolution`): these are known tree aliases;
   map via `frontend/lib/content/paths.ts` / `note-routes.ts`. Do **not** rename without
   approval — fixing knowledge must not break routes.
3. **Conflicting sources** → §4.4; contested claim = `[?]`, escalate, teach consensus.
4. **Syllabus vs modern knowledge** (taxonomy, SI, etc.): teach syllabus term + current
   standard side by side (§4.4 rule 4).
5. **Scope creep:** validity ≠ advanced depth. Keep NEB-level explanations; enrichment is
   a one-line footnote at most.
6. **Derived artifacts drift:** after edits run the ledger/mindmap/visual checks so
   runtime data (`frontend/public/data/**`) stays in parity with `content/` source.
7. **Human/agent coordination:** one subject at a time, one owner per task
   (`AGENT_RULES.md` → no agent may claim another agent's task).

---

## 12. Coverage checklist — every topic, every unit

> Generated from `frontend/lib/syllabus.ts` by `node scripts/knowledge-plan-inventory.mjs`.
> Tick rows as the Validation Card completes them (see §5, legend in the header).
> Topics are the official curriculum order — work top to bottom within each subject,
> **Biology first**.

<!-- KNOWLEDGE-PLAN:INVENTORY:START -->

> Regenerated by `node scripts/knowledge-plan-inventory.mjs` from `frontend/lib/syllabus.ts`.
> Coverage: **116 units · 696 topics** across 6 subjects (class-11-notes, class-12-notes).

## Biology

### Class 11

#### `biomolecules-and-cell-biology` — Biomolecules and Cell Biology (4 topics · 15h · since 2077 BS)

- [!] Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water
- [!] Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells
- [!] Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions
- [!] Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances

#### `floral-diversity` — Floral Diversity (13 topics · 30h · since 2077 BS)

- [ ] Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)
- [ ] Status of flora in Nepal and world representation
- [ ] Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes
- [ ] Structure and reproduction of Mucor and Yeast
- [ ] Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi
- [ ] Lichen: General introduction, characteristic features and economic importance of lichen
- [ ] Algae: General introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae
- [ ] Bryophyta: General introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes
- [ ] Pteridophyta: General introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes
- [ ] Gymnosperm: General introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm
- [ ] Angiosperm: Morphology of root, stem, leaves, inflorescences, flowers and fruit
- [ ] Taxonomic study: Definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms
- [ ] Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae

#### `introductory-microbiology` — Introductory Microbiology (3 topics · 5h · since 2077 BS)

- [ ] Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)
- [ ] Virus: General introduction, structure and importance of virus, bacteriophage
- [ ] Impacts of biotechnology in the field of microbiology

#### `ecology` — Ecology (6 topics · 11h · since 2077 BS)

- [ ] Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions
- [ ] Concept of ecosystem, structural and functional aspects of pond and forest ecosystem
- [ ] Food chain, food web, trophic level, ecological pyramids, productivity
- [ ] Biogeochemical cycles: carbon and nitrogen cycles; concept of succession
- [ ] Ecological adaptation: Concept of adaptation, hydrophytes and xerophytes
- [ ] Ecological imbalances: Greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion

#### `vegetation` — Vegetation (3 topics · 3h · since 2077 BS)

- [ ] Vegetation: Introduction, types of vegetation in Nepal
- [ ] In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation
- [ ] Natural environment-vegetation and human activities

#### `introduction-to-biology` — Introduction to Biology (2 topics · 2h · since 2077 BS)

- [ ] Introduction to Biology: Scope and fields of biology
- [ ] Relation of biology with other sciences

#### `evolutionary-biology` — Evolutionary Biology (6 topics · 15h · since 2077 BS)

- [ ] Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment
- [ ] Evidences of evolution: Morphological, Anatomical, Paleontological, Embryological and Biochemical
- [ ] Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism
- [ ] Human evolution: Position of man in animal kingdom
- [ ] Differences between new world monkeys and old-world monkeys, apes and man
- [ ] Evolution of modern man starting from anthropoid ancestor

#### `faunal-diversity` — Faunal Diversity (11 topics · 34h · since 2077 BS)

- [ ] Protista: Outline classification. Protozoa: diagnostic features and classification up to class with examples
- [ ] Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle
- [ ] Economic importance of P. falciparum
- [ ] Animalia: Level of organization, body plan, body symmetry, body cavity and segmentation in animals
- [ ] Diagnostic features and classification of phyla (up to class): Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata
- [ ] Earthworm (Pheretima posthuma): Habit and habitat, external features; digestive system (alimentary canal and physiology of digestion)
- [ ] Earthworm: Excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral, working mechanism)
- [ ] Earthworm: Reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance
- [ ] Frog (Rana tigrina): Habit and habitat, external features; digestive system (alimentary canal, digestive glands and physiology of digestion)
- [ ] Frog: Blood vascular system (structure and working mechanism of heart); respiratory system (respiratory organs and physiology of respiration)
- [ ] Frog: Reproductive system (male and female reproductive organs)

#### `biota-and-environment` — Biota and Environment (5 topics · 10h · since 2077 BS)

- [ ] Animal adaptation: Aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation
- [ ] Animal behavior: Reflex action, taxes, dominance and leadership
- [ ] Fish and bird migration
- [ ] Environmental pollution: Sources, effects and control measures of air, water and soil pollution
- [ ] Pesticides and their effects

#### `conservation-biology` — Conservation Biology (5 topics · 3h · since 2077 BS)

- [ ] Conservation biology: Concept of biodiversity, biodiversity conservation
- [ ] National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites
- [ ] Wildlife: Importance, causes of extinction and conservation strategies
- [ ] IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species
- [ ] Endangered species in Nepal

### Class 12

#### `heredity-and-evolution` — Heredity and Evolution (8 topics · 24h · since 2078 BS)

- [ ] Mendel's laws of inheritance — monohybrid and dihybrid cross
- [ ] Incomplete dominance and codominance
- [ ] Linkage and crossing over
- [ ] Sex determination and sex-linked disorders
- [ ] Chromosome theory of inheritance
- [ ] Molecular basis of inheritance: DNA structure, replication, transcription, translation, gene regulation
- [ ] Human genome project — objectives and significance
- [ ] Evolution: evidences, adaptive radiation, Hardy-Weinberg equilibrium, human evolution

#### `human-health-and-diseases` — Human Health and Diseases (5 topics · 10h · since 2078 BS)

- [ ] Pathogens and diseases: malaria, dengue, filariasis, ascariasis, pneumonia, typhoid, tuberculosis, common cold, AIDS, ringworm
- [ ] Immune system — innate and adaptive immunity
- [ ] Antigens and antibodies, immune response
- [ ] Vaccination and immunization
- [ ] Allergy and autoimmune diseases

#### `strategies-for-food-production` — Strategies for Enhancement in Food Production (4 topics · 6h · since 2078 BS)

- [ ] Plant breeding — methods and examples
- [ ] Single cell protein (SCP)
- [ ] Animal husbandry — breeds and management
- [ ] Biofertilizers and sustainable agriculture

#### `microbes-in-human-welfare` — Microbes in Human Welfare (4 topics · 5h · since 2078 BS)

- [ ] Microorganisms in household products
- [ ] Industrial production of antibiotics, alcoholic beverages, citric acid
- [ ] Microbes as biocontrol agents and biofertilizers
- [ ] Bioremediation, biogas

#### `biotechnology-principles` — Biotechnology — Principles and Processes (4 topics · 8h · since 2078 BS)

- [ ] Principles of biotechnology — recombinant DNA technology
- [ ] Tools: restriction enzymes, vectors, competent host
- [ ] Processes: DNA isolation, PCR, gel electrophoresis, gene transfer
- [ ] Applications of recombinant DNA technology

#### `biotechnology-applications` — Biotechnology and Its Applications (4 topics · 8h · since 2078 BS)

- [ ] Biotechnological applications in agriculture: Bt cotton, nematode-resistant tobacco
- [ ] Biotechnological applications in medicine: insulin, gene therapy, therapeutic proteins
- [ ] Transgenic animals
- [ ] Biopiracy and patent issues

#### `organisms-and-environment` — Organisms and Environment (6 topics · 10h · since 2078 BS)

- [ ] Adaptations of organisms to environmental conditions
- [ ] Population ecology — growth, regulation, interactions
- [ ] Ecosystem structure and function — productivity, decomposition
- [ ] Ecological succession
- [ ] Nutrient cycling — carbon, nitrogen, phosphorus
- [ ] Ecological pyramids and energy flow

#### `biodiversity-and-conservation` — Biodiversity and Conservation (5 topics · 6h · since 2078 BS)

- [ ] Biodiversity — genetic, species, and ecosystem levels
- [ ] Patterns of biodiversity — global and Nepal
- [ ] Biodiversity loss — causes and consequences
- [ ] Conservation strategies — in-situ and ex-situ
- [ ] Red Data Book and IUCN categories

#### `environmental-issues` — Environmental Issues (7 topics · 8h · since 2078 BS)

- [ ] Air pollution — causes, effects, and control
- [ ] Water pollution — causes, effects, and control
- [ ] Solid waste management
- [ ] Nuclear radiation hazards
- [ ] Greenhouse effect, global warming, climate change
- [ ] Ozone layer depletion
- [ ] Rainwater harvesting and wasteland development

## Chemistry

### Class 11

#### `foundation-and-fundamentals` — Foundation and Fundamentals (4 topics · 2h · since 2077 BS)

- [ ] General introduction of chemistry
- [ ] Importance and scope of chemistry
- [ ] Basic concepts of chemistry: atoms, molecules, relative masses of atoms and molecules, atomic mass unit (amu), radicals, molecular formula, empirical formula
- [ ] Percentage composition from molecular formula

#### `stoichiometry` — Stoichiometry (8 topics · 8h · since 2077 BS)

- [ ] Dalton's atomic theory and its postulates
- [ ] Laws of stoichiometry
- [ ] Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles
- [ ] Mole and its relation with mass, volume and number of particles
- [ ] Calculations based on mole concept
- [ ] Limiting reactant and excess reactant
- [ ] Theoretical yield, experimental yield and % yield
- [ ] Calculation of empirical and molecular formula from % composition (solving related numerical problems)

#### `atomic-structure` — Atomic Structure (9 topics · 8h · since 2077 BS)

- [ ] Rutherford's atomic model and its limitations
- [ ] Postulates of Bohr's atomic model and its application
- [ ] Spectrum of hydrogen atom
- [ ] Defects of Bohr's theory
- [ ] Elementary idea of quantum mechanical model: de Broglie's wave equation
- [ ] Heisenberg's Uncertainty Principle and concept of probability
- [ ] Quantum numbers
- [ ] Orbitals and shape of s and p orbitals only
- [ ] Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)

#### `classification-of-elements-and-periodic-table` — Classification of Elements and Periodic Table (5 topics · 5h · since 2077 BS)

- [ ] Modern periodic law and modern periodic table
- [ ] Classification of elements into different groups, periods and blocks
- [ ] IUPAC classification of elements
- [ ] Nuclear charge and effective nuclear charge
- [ ] Periodic trend and periodicity: atomic radii, ionic radii, ionization energy, electron affinity, electronegativity, metallic characters (general trend and explanation only)

#### `chemical-bonding-and-shapes-of-molecules` — Chemical Bonding and Shapes of Molecules (11 topics · 9h · since 2077 BS)

- [ ] Valence shell, valence electron and octet theory
- [ ] Ionic bond and its properties
- [ ] Covalent bond and coordinate covalent bond; properties of covalent compounds
- [ ] Lewis dot structure of some common compounds of s and p block elements
- [ ] Resonance
- [ ] VSEPR theory and shapes of simple molecules (BeF2, BF3, CH4, CH3Cl, PCl5, SF6, H2O, NH3, CO2, H2S, PH3)
- [ ] Elementary idea of Valence Bond Theory
- [ ] Hybridization involving s and p orbitals only
- [ ] Bond characteristics: bond length, ionic character, dipole moment
- [ ] Vander Waal's force and molecular solids; hydrogen bonding and its application
- [ ] Metallic bonding and properties of metallic solids

#### `oxidation-and-reduction` — Oxidation and Reduction (5 topics · 5h · since 2077 BS)

- [ ] General and electronic concept of oxidation and reduction
- [ ] Oxidation number and rules for assigning oxidation number
- [ ] Balancing redox reactions by oxidation number and ion-electron (half reaction) method
- [ ] Electrolysis: qualitative aspect
- [ ] Electrolysis: quantitative aspect (Faraday's laws of electrolysis)

#### `states-of-matter` — States of Matter (9 topics · 8h · since 2077 BS)

- [ ] Gaseous state: Kinetic theory of gas and its postulates
- [ ] Gas laws: Boyle's law, Charles' law, Avogadro's law, combined gas equation, Dalton's law of partial pressure, Graham's law of diffusion
- [ ] Ideal gas and ideal gas equation; universal gas constant and its significance
- [ ] Deviation of real gas from ideality (solving related numerical problems based on gas laws)
- [ ] Liquid state: physical properties of liquids — evaporation and condensation, vapour pressure and boiling point, surface tension and viscosity (qualitative idea only)
- [ ] Liquid crystals and their applications
- [ ] Solid state: types of solids, amorphous and crystalline solids
- [ ] Efflorescent, deliquescent and hygroscopic solids; crystallization and crystal growth; water of crystallization
- [ ] Introduction to unit crystal lattice and unit cell

#### `chemical-equilibrium` — Chemical Equilibrium (5 topics · 3h · since 2077 BS)

- [ ] Physical and chemical equilibrium; dynamic nature of chemical equilibrium
- [ ] Law of mass action
- [ ] Expression for equilibrium constant and its importance
- [ ] Relationship between Kp and Kc
- [ ] Le Chatelier's Principle (numericals not required)

#### `chemistry-of-non-metals` — Chemistry of Non-metals (22 topics · 21h · since 2077 BS)

- [ ] Hydrogen: chemistry of atomic and nascent hydrogen; isotopes of hydrogen and their uses
- [ ] Application of hydrogen as fuel; heavy water and its applications
- [ ] Allotropes of oxygen: definition of allotropy and examples; oxygen — types of oxides (acidic, basic, neutral, amphoteric, peroxide and mixed oxides)
- [ ] Applications of hydrogen peroxide; medical and industrial application of oxygen
- [ ] Ozone: occurrence, preparation of ozone from oxygen, structure of ozone, test for ozone, uses of ozone
- [ ] Ozone layer depletion: causes, effects and control measures
- [ ] Nitrogen: reason for inertness of nitrogen and active nitrogen
- [ ] Chemical properties of ammonia (action with CuSO4 solution, water, FeCl3 solution, conc. HCl, mercurous nitrate paper, O2); applications and harmful effects of ammonia
- [ ] Oxy-acids of nitrogen (name and formula)
- [ ] Chemical properties of nitric acid: HNO3 as an acid and oxidizing agent (action with zinc, magnesium, iron, copper, sulphur, carbon, SO2 and H2S); ring test for nitrate ion
- [ ] Halogens: general characteristics of halogens; comparative study on preparation, chemical properties (with water, alkali, ammonia, oxidizing character, bleaching action) and uses of Cl2, Br2 and I2
- [ ] Test for Cl2, Br2 and I2
- [ ] Haloacids (HCl, HBr and HI): comparative study on preparation, properties (reducing strength, acidic nature and solubility) and uses
- [ ] Carbon: allotropes of carbon (crystalline and amorphous) including fullerenes (structure, general properties and uses only)
- [ ] Properties (reducing action, reaction with metals and nonmetals) and uses of carbon monoxide
- [ ] Phosphorus: allotropes of phosphorus (name only)
- [ ] Phosphine: preparation, properties (basic nature, reducing nature, action with halogens and oxygen) and uses
- [ ] Sulphur: allotropes of sulphur (name only) and uses of sulphur
- [ ] Hydrogen sulphide: preparation from Kipp's apparatus (with diagram), properties (acidic nature, reducing nature, analytical reagent) and uses
- [ ] Sulphur dioxide: properties (acidic nature, reducing nature, oxidising nature and bleaching action) and uses
- [ ] Sulphuric acid: properties (acidic nature, oxidising nature, dehydrating nature) and uses
- [ ] Sodium thiosulphate (formula and uses)

#### `chemistry-of-metals` — Chemistry of Metals (12 topics · 10h · since 2077 BS)

- [ ] Metals and metallurgical principles: definition of metallurgy and its types (hydrometallurgy, pyrometallurgy, electrometallurgy)
- [ ] Introduction of ores; gangue or matrix, flux and slag, alloy and amalgam
- [ ] General principles of extraction of metals: concentration, calcination and roasting, smelting, carbon reduction, thermite and electrochemical reduction
- [ ] Refining of metals (poling and electro-refinement)
- [ ] Alkali metals: general characteristics of alkali metals
- [ ] Sodium: extraction from Down's process, properties (action with oxygen, water, acids, nonmetals and ammonia) and uses
- [ ] Sodium hydroxide: properties (precipitation reaction and action with carbon monoxide) and uses
- [ ] Sodium carbonate: properties (action with CO2, SO2, water, precipitation reactions) and uses
- [ ] Alkaline earth metals: general characteristics of alkaline earth metals
- [ ] Molecular formula and uses of quick lime, bleaching powder, magnesia, plaster of paris and epsom salt
- [ ] Solubility of hydroxides, carbonates and sulphates of alkaline earth metals (general trend with explanation)
- [ ] Stability of carbonate and nitrate of alkaline earth metals (general trend with explanation)

#### `bio-inorganic-chemistry` — Bio-inorganic Chemistry (5 topics · 3h · since 2077 BS)

- [ ] Introduction to Bio-inorganic Chemistry
- [ ] Micro and macro nutrients
- [ ] Importance of metal ions in biological systems (ions of Na, K, Mg, Ca, Fe, Cu, Zn, Ni, Co, Cr)
- [ ] Ion pumps (sodium-potassium and sodium-glucose pump)
- [ ] Metal toxicity (toxicity due to iron, arsenic, mercury, lead and cadmium)

#### `basic-concept-of-organic-chemistry` — Basic Concept of Organic Chemistry (7 topics · 6h · since 2077 BS)

- [ ] Introduction to organic chemistry and organic compounds
- [ ] Reasons for the separate study of organic compounds from inorganic compounds
- [ ] Tetra-covalency and catenation properties of carbon
- [ ] Classification of organic compounds
- [ ] Alkyl groups, functional groups and homologous series
- [ ] Idea of structural formula, contracted formula and bond line structural formula
- [ ] Preliminary idea of cracking and reforming, quality of gasoline, octane number, cetane number and gasoline additive

#### `fundamental-principles-of-organic-chemistry` — Fundamental Principles of Organic Chemistry (9 topics · 10h · since 2077 BS)

- [ ] IUPAC Nomenclature of Organic Compounds (up to chain having 6-carbon atoms)
- [ ] Qualitative analysis of organic compounds (detection of N, S and halogens by Lassaigne's test)
- [ ] Isomerism in organic compounds: definition and classification of isomerism
- [ ] Structural isomerism and its types: chain isomerism, position isomerism, functional isomerism, metamerism and tautomerism
- [ ] Concept of geometrical isomerism (cis and trans) and optical isomerism (d and l form)
- [ ] Preliminary idea of reaction mechanism: homolytic and heterolytic fission
- [ ] Electrophiles, nucleophiles and free-radicals
- [ ] Inductive effect: +I and -I effect
- [ ] Resonance effect: +R and -R effect

#### `hydrocarbons` — Hydrocarbons (9 topics · 8h · since 2077 BS)

- [ ] Saturated hydrocarbons (Alkanes): preparation from haloalkanes (reduction and Wurtz reaction), decarboxylation, catalytic hydrogenation of alkene and alkyne
- [ ] Chemical properties of alkanes: substitution reactions (halogenation, nitration and sulphonation only), oxidation of ethane
- [ ] Unsaturated hydrocarbons (Alkenes): preparation by dehydration of alcohol, dehydrohalogenation, catalytic hydrogenation of alkyne
- [ ] Chemical properties of alkenes: addition reaction with HX (Markovnikov's addition and peroxide effect), H2O, O3, H2SO4 only
- [ ] Alkynes: preparation from carbon and hydrogen, 1,2-dibromoethane, chloroform/iodoform only
- [ ] Chemical properties of alkynes: addition reaction with H2, HX, H2O; acidic nature (action with sodium, ammoniacal AgNO3 and ammoniacal Cu2Cl2)
- [ ] Test of unsaturation (ethene and ethyne): bromine water test and Baeyer's test
- [ ] Comparative studies of physical properties of alkane, alkene and alkyne
- [ ] Kolbe's electrolysis methods for the preparation of alkanes, alkenes and alkynes

#### `aromatic-hydrocarbons` — Aromatic Hydrocarbons (8 topics · 6h · since 2077 BS)

- [ ] Introduction and characteristics of aromatic compounds
- [ ] Huckel's rule of aromaticity
- [ ] Kekule structure of benzene
- [ ] Resonance and isomerism in benzene
- [ ] Preparation of benzene from decarboxylation of sodium benzoate, phenol, and ethyne only
- [ ] Physical properties of benzene
- [ ] Chemical properties of benzene: addition reactions (hydrogen, halogen); electrophilic substitution reactions: orientation of benzene derivatives (o, m and p), nitration, sulphonation, halogenation, Friedel-Crafts reaction (alkylation and acylation)
- [ ] Combustion of benzene (free combustion only) and uses

#### `fundamentals-of-applied-chemistry` — Fundamentals of Applied Chemistry (6 topics · 4h · since 2077 BS)

- [ ] Fundamentals of Applied Chemistry: chemical industry and its importance
- [ ] Stages in producing a new product
- [ ] Economics of production; cash flow in the production cycle
- [ ] Running a chemical plant; designing a chemical plant
- [ ] Continuous and batch processing
- [ ] Environmental impact of the chemical industry

#### `modern-chemical-manufactures` — Modern Chemical Manufactures (6 topics · 11h · since 2077 BS)

- [ ] Manufacture of ammonia by Haber's process (principle and flow sheet diagram only)
- [ ] Manufacture of nitric acid by Ostwald's process
- [ ] Manufacture of sulphuric acid by contact process
- [ ] Manufacture of sodium hydroxide by Diaphragm Cell
- [ ] Manufacture of sodium carbonate by ammonia soda or Solvay process
- [ ] Fertilizers: chemical fertilizers, types of chemical fertilizers, production of urea with flow-sheet diagram

### Class 12

#### `solutions` — Solutions (5 topics · 7h · since 2078 BS)

- [ ] Types of solutions and expression of concentration
- [ ] Solubility of gases and solids in liquids
- [ ] Vapour pressure of solutions — Raoult's law
- [ ] Colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure
- [ ] Van't Hoff factor and abnormal molar masses

#### `electro-chemistry` — Electrochemistry (7 topics · 8h · since 2078 BS)

- [ ] Oxidation and reduction — electrode reactions
- [ ] Electrochemical cells — galvanic cell, cell potential, standard electrode potential
- [ ] Nernst equation and its applications
- [ ] Conductance of electrolytic solutions
- [ ] Electrolysis and Faraday's laws
- [ ] Batteries — primary and secondary cells
- [ ] Fuel cells

#### `chemical-kinetics` — Chemical Kinetics (5 topics · 6h · since 2078 BS)

- [ ] Rate of reaction — average and instantaneous rate
- [ ] Factors affecting rate of reaction
- [ ] Rate law and order of reaction
- [ ] Integrated rate equations — zero order and first order reactions
- [ ] Arrhenius equation and activation energy

#### `general-and-organic-fundamentals` — General and Fundamental Principles of Organic Chemistry (5 topics · 8h · since 2078 BS)

- [ ] Purification and qualitative/quantitative analysis of organic compounds
- [ ] Inductive effect, resonance, hyperconjugation
- [ ] Electrophilic and nucleophilic substitution reactions
- [ ] Free radical reactions
- [ ] Important organic reactions: oxidation, reduction, addition, elimination

#### `hydrocarbons` — Hydrocarbons (4 topics · 7h · since 2078 BS)

- [ ] Alkanes: conformations, combustion, free radical halogenation
- [ ] Alkenes: preparation, geometrical isomerism, electrophilic addition (Markovnikov, anti-Markovnikov), ozonolysis, polymerisation
- [ ] Alkynes: preparation, acidic character, addition reactions
- [ ] Aromatic hydrocarbons: benzene — resonance, aromaticity, electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts)

#### `alcohols-phenols-ethers` — Alcohols, Phenols and Ethers (3 topics · 7h · since 2078 BS)

- [ ] Alcohols: classification, preparation, physical and chemical properties
- [ ] Phenols: acidity, electrophilic substitution, Kolbe's reaction, Reimer-Tiemann reaction
- [ ] Ethers: preparation and chemical reactions (cleavage by HI)

#### `aldehydes-ketones-carboxylic-acids` — Aldehydes, Ketones and Carboxylic Acids (3 topics · 10h · since 2078 BS)

- [ ] Aldehydes and ketones: preparation, physical properties, nucleophilic addition reactions
- [ ] Carboxylic acids: preparation, physical properties, acidic character, reactions
- [ ] Name reactions: Aldol condensation, Cannizzaro reaction, HVZ reaction

#### `amines` — Amines (4 topics · 6h · since 2078 BS)

- [ ] Classification, nomenclature and preparation
- [ ] Physical and chemical properties
- [ ] Basic character of amines
- [ ] Reactions: diazotisation, coupling reactions, Hinsberg test

#### `biomolecules` — Biomolecules (5 topics · 5h · since 2078 BS)

- [ ] Carbohydrates: monosaccharides (glucose, fructose), disaccharides, polysaccharides
- [ ] Proteins: amino acids, peptide bond, primary to quaternary structure, denaturation
- [ ] Enzymes: definition, classification, enzyme action
- [ ] Vitamins: classification and functions
- [ ] Hormones: definition, types, functions

#### `chemistry-in-everyday-life` — Chemistry in Everyday Life (3 topics · 4h · since 2078 BS)

- [ ] Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, antacids
- [ ] Chemical cleansers — soaps and detergents
- [ ] Food additives — preservatives and artificial sweetening agents

#### `chemistry-of-element` — Chemistry of Element (4 topics · 8h · since 2078 BS)

- [ ] p-block elements (Group 15–18): important compounds, trends in properties
- [ ] d-block elements: general characteristics, important compounds (KMnO₄, K₂Cr₂O₇)
- [ ] f-block elements: lanthanoids and actinoids
- [ ] Coordination compounds: Werner's theory, IUPAC nomenclature, VBT, CFT (qualitative), isomerism

## Physics

### Class 11

#### `physical-quantities` — Physical Quantities (2 topics · 3h · since 2077 BS)

- [ ] Precision and significant figures
- [ ] Dimensions and uses of dimensional analysis

#### `vectors` — Vectors (3 topics · 4h · since 2077 BS)

- [ ] Triangle, parallelogram and polygon laws of vectors
- [ ] Resolution of vectors; unit vectors
- [ ] Scalar and vector products

#### `kinematics` — Kinematics (5 topics · 5h · since 2077 BS)

- [ ] Instantaneous velocity and acceleration
- [ ] Relative velocity
- [ ] Equation of motion (graphical treatment)
- [ ] Motion of a freely falling body
- [ ] Projectile motion and its applications

#### `dynamics` — Dynamics (5 topics · 6h · since 2077 BS)

- [ ] Linear momentum, impulse
- [ ] Conservation of linear momentum
- [ ] Application of Newton's laws
- [ ] Moment, torque and equilibrium
- [ ] Solid friction: laws of solid friction and their verifications

#### `work-energy-and-power` — Work, Energy and Power (6 topics · 6h · since 2077 BS)

- [ ] Work done by a constant force and a variable force
- [ ] Power
- [ ] Work-energy theorem; kinetic and potential energy
- [ ] Conservation of energy
- [ ] Conservative and non-conservative forces
- [ ] Elastic and inelastic collisions

#### `circular-motion` — Circular Motion (6 topics · 6h · since 2077 BS)

- [ ] Angular displacement, velocity and acceleration
- [ ] Relation between angular and linear velocity and acceleration
- [ ] Centripetal acceleration and centripetal force
- [ ] Conical pendulum
- [ ] Motion in a vertical circle
- [ ] Applications of banking

#### `gravitation` — Gravitation (10 topics · 10h · since 2077 BS)

- [ ] Newton's law of gravitation
- [ ] Gravitational field strength
- [ ] Gravitational potential; gravitational potential energy
- [ ] Variation in value of 'g' due to altitude and depth
- [ ] Centre of mass and centre of gravity
- [ ] Motion of a satellite: orbital velocity and time period of the satellite
- [ ] Escape velocity
- [ ] Potential and kinetic energy of the satellite
- [ ] Geostationary satellite
- [ ] GPS

#### `elasticity` — Elasticity (5 topics · 5h · since 2077 BS)

- [ ] Hooke's law: force constant
- [ ] Stress; strain; elasticity and plasticity
- [ ] Elastic modulus: Young modulus, bulk modulus, shear modulus
- [ ] Poisson's ratio
- [ ] Elastic potential energy

#### `heat-and-temperature` — Heat and Temperature (3 topics · 3h · since 2077 BS)

- [ ] Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow
- [ ] Meaning of thermal equilibrium and Zeroth law of thermodynamics
- [ ] Thermal equilibrium as a working principle of a mercury thermometer

#### `thermal-expansion` — Thermal Expansion (4 topics · 4h · since 2077 BS)

- [ ] Linear expansion and its measurement
- [ ] Cubical expansion, superficial expansion and their relation with linear expansion
- [ ] Liquid expansion: absolute and apparent
- [ ] Dulong and Petit method of determining expansivity of liquid

#### `quantity-of-heat` — Quantity of Heat (6 topics · 6h · since 2077 BS)

- [ ] Newton's law of cooling
- [ ] Measurement of specific heat capacity of solids and liquids
- [ ] Change of phases: latent heat
- [ ] Specific latent heat of fusion and vaporization
- [ ] Measurement of specific latent heat of fusion and vaporization
- [ ] Triple point

#### `rate-of-heat-flow` — Rate of Heat Flow (5 topics · 5h · since 2077 BS)

- [ ] Conduction: thermal conductivity and measurement
- [ ] Convection
- [ ] Radiation: ideal radiator
- [ ] Black-body radiation
- [ ] Stefan-Boltzmann law

#### `ideal-gas` — Ideal Gas (7 topics · 8h · since 2077 BS)

- [ ] Ideal gas equation
- [ ] Molecular properties of matter
- [ ] Kinetic-molecular model of an ideal gas
- [ ] Derivation of pressure exerted by gas
- [ ] Average translational kinetic energy of gas molecule
- [ ] Boltzmann constant, root mean square speed
- [ ] Heat capacities of gases and solids

#### `reflection-at-curved-mirror` — Reflection at Curved Mirror (2 topics · 2h · since 2077 BS)

- [ ] Real and virtual images
- [ ] Mirror formula

#### `refraction-at-plane-surfaces` — Refraction at Plane Surfaces (4 topics · 4h · since 2077 BS)

- [ ] Laws of refraction: refractive index
- [ ] Relation between refractive indices
- [ ] Lateral shift
- [ ] Total internal reflection

#### `refraction-through-prisms` — Refraction through Prisms (3 topics · 4h · since 2077 BS)

- [ ] Minimum deviation condition
- [ ] Relation between the angle of prism, minimum deviation and refractive index
- [ ] Deviation in small-angle prism

#### `lenses` — Lenses (3 topics · 3h · since 2077 BS)

- [ ] Spherical lenses, angular magnification
- [ ] Lens maker's formula
- [ ] Power of a lens

#### `dispersion` — Dispersion (3 topics · 3h · since 2077 BS)

- [ ] Pure spectrum and dispersive power
- [ ] Chromatic and spherical aberration
- [ ] Achromatism and its applications

#### `electric-charges` — Electric Charges (4 topics · 3h · since 2077 BS)

- [ ] Electric charges
- [ ] Charging by induction
- [ ] Coulomb's law: force between two point charges
- [ ] Force between multiple electric charges

#### `electric-field` — Electric Field (3 topics · 3h · since 2077 BS)

- [ ] Electric field due to point charges; field lines
- [ ] Gauss law: electric flux
- [ ] Application of Gauss law: field of a charge sphere, line charge, charged plane conductor

#### `potential-potential-difference-and-potential-energy` — Potential, Potential Difference and Potential Energy (3 topics · 4h · since 2077 BS)

- [ ] Potential difference, potential due to a point charge, potential energy, electron volt
- [ ] Equipotential lines and surfaces
- [ ] Potential gradient

#### `capacitor` — Capacitor (5 topics · 5h · since 2077 BS)

- [ ] Capacitance and capacitor
- [ ] Parallel plate capacitor
- [ ] Combination of capacitors
- [ ] Energy of charged capacitor
- [ ] Effect of a dielectric: polarization and displacement

#### `dc-circuits` — DC Circuits (7 topics · 10h · since 2077 BS)

- [ ] Electric currents; drift velocity and its relation with current
- [ ] Ohm's law; electrical resistance; resistivity; conductivity
- [ ] Current-voltage relations; ohmic and non-ohmic resistance
- [ ] Resistances in series and parallel
- [ ] Potential divider
- [ ] Electromotive force of a source, internal resistance
- [ ] Work and power in electrical circuits

#### `nuclear-physics` — Nuclear Physics (7 topics · 4h · since 2077 BS)

- [ ] Nucleus: discovery of nucleus
- [ ] Nuclear density; mass number; atomic number
- [ ] Atomic mass; isotopes
- [ ] Einstein's mass-energy relation
- [ ] Mass defect, packing fraction, binding energy per nucleon
- [ ] Creation and annihilation
- [ ] Nuclear fission and fusion

#### `solids` — Solids (3 topics · 3h · since 2077 BS)

- [ ] Energy bands in solids (qualitative ideas)
- [ ] Difference between metals, insulators and semiconductors using band theory
- [ ] Intrinsic and extrinsic semiconductors

#### `recent-trends-in-physics` — Recent Trends in Physics (3 topics · 6h · since 2077 BS)

- [ ] Particle physics: particles and antiparticles, quarks (baryons and mesons) and leptons (neutrinos)
- [ ] Universe: Big Bang and Hubble law — expansion of the Universe
- [ ] Dark matter, black hole and gravitational wave

### Class 12

#### `electrostatics` — Electrostatics (6 topics · 10h · since 2078 BS)

- [ ] Coulomb's law and its applications
- [ ] Electric field and electric field intensity due to point charges, line charges, and charged sheets
- [ ] Electric potential and potential difference
- [ ] Capacitance and capacitors — parallel plate, series and parallel combination
- [ ] Dielectric and dielectric constant
- [ ] Energy stored in a capacitor

#### `current-electricity` — Current Electricity (8 topics · 10h · since 2078 BS)

- [ ] Electric current, drift velocity, and relaxation time
- [ ] Ohm's law and its limitations
- [ ] Resistance and resistivity — temperature dependence
- [ ] Series and parallel combination of resistors
- [ ] Kirchhoff's laws and their applications
- [ ] Electromotive force (emf), internal resistance, and cells in combination
- [ ] Wheatstone bridge and meter bridge
- [ ] Potentiometer and its applications

#### `magnetism-and-magnetic-effect` — Magnetism and Magnetic Effect of Current (6 topics · 12h · since 2078 BS)

- [ ] Magnetic field and magnetic force on moving charges
- [ ] Lorentz force and motion of charged particles in magnetic fields
- [ ] Biot-Savart law and its applications (straight wire, circular loop, solenoid)
- [ ] Ampere's circuital law and its applications
- [ ] Force between two parallel current-carrying conductors
- [ ] Moving coil galvanometer, ammeter, and voltmeter

#### `electromagnetic-induction` — Electromagnetic Induction (5 topics · 8h · since 2078 BS)

- [ ] Faraday's laws of electromagnetic induction
- [ ] Lenz's law and conservation of energy
- [ ] Self-induction and self-inductance
- [ ] Mutual induction and mutual inductance
- [ ] Growing and decaying current in LR circuits

#### `alternating-current` — Alternating Current (4 topics · 8h · since 2078 BS)

- [ ] AC voltage applied to resistor, inductor, and capacitor
- [ ] LC oscillations and resonance
- [ ] LCR series circuit and power factor
- [ ] Transformer — principle, types, and losses

#### `ray-optics` — Ray Optics (6 topics · 10h · since 2078 BS)

- [ ] Reflection at plane and curved surfaces — mirrors
- [ ] Refraction at plane surfaces — total internal reflection
- [ ] Refraction through prisms — angle of deviation and minimum deviation
- [ ] Thin lenses — lens maker's formula and power of lens
- [ ] Combination of lenses and mirrors
- [ ] Optical instruments — microscope and telescope

#### `wave-optics` — Wave Optics (4 topics · 8h · since 2078 BS)

- [ ] Wavefront and Huygens' principle
- [ ] Interference of light — Young's double slit experiment
- [ ] Diffraction of light — single slit diffraction
- [ ] Polarization — Brewster's law and polaroids

#### `modern-physics` — Modern Physics (6 topics · 12h · since 2078 BS)

- [ ] Photoelectric effect and Einstein's photoelectric equation
- [ ] De Broglie wavelength and matter waves
- [ ] Atom — Bohr's model and hydrogen spectrum
- [ ] Nucleus — binding energy, nuclear fission and fusion
- [ ] Semiconductors — intrinsic and extrinsic, p-n junction, diode, transistor
- [ ] Logic gates — AND, OR, NOT, NAND, NOR

#### `communication-systems` — Communication Systems (3 topics · 4h · since 2078 BS)

- [ ] Elements of a communication system
- [ ] Modulation — amplitude modulation and frequency modulation
- [ ] Bandwidth and propagation of electromagnetic waves

## Mathematics (Math)

### Class 11

#### `algebra` — Algebra (8 topics · 44h · since 2077 BS)

- [ ] Logic and set: statements, logical connectives, truth tables, theorems based on set operations
- [ ] Real numbers: geometric representation of real numbers, interval, absolute value
- [ ] Function: domain and range of a function, inverse function, composite function; algebraic (linear, quadratic and cubic) and transcendental (trigonometric, exponential, logarithmic) functions
- [ ] Curve sketching: odd and even functions, periodicity, symmetry (about origin, X- and Y-axis), monotonicity; graphs of quadratic, cubic and rational functions, trigonometric (asinbx and acosbx), exponential (e^x), logarithmic (lnx)
- [ ] Sequence and series: arithmetic, geometric, harmonic sequences and series and their properties; A.M, G.M, H.M and their relations; sum of infinite geometric series
- [ ] Matrices and determinants: transpose of a matrix and its properties; minors and cofactors, adjoint, inverse matrix, determinant, properties of determinants (without proof)
- [ ] Quadratic equation: nature and roots of a quadratic equation, relation between roots and coefficient, formation of a quadratic equation, symmetric roots, one or both roots common
- [ ] Complex number: imaginary unit, algebra of complex numbers, geometric representation, absolute (modulus) value and conjugate of complex numbers and their properties, square root of a complex number

#### `trigonometry` — Trigonometry (2 topics · 12h · since 2077 BS)

- [ ] Inverse circular functions
- [ ] Trigonometric equations and general values

#### `analytic-geometry` — Analytic Geometry (3 topics · 20h · since 2077 BS)

- [ ] Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines
- [ ] Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines
- [ ] Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line

#### `vectors` — Vectors (2 topics · 12h · since 2077 BS)

- [ ] Collinear and non-collinear vectors, coplanar and non-coplanar vectors
- [ ] Linear combination of vectors, linearly dependent and independent vectors

#### `statistics-and-probability` — Statistics and Probability (2 topics · 12h · since 2077 BS)

- [ ] Measure of dispersion: standard deviation, variance, coefficient of variation, skewness, Karl Pearson's coefficient of skewness
- [ ] Probability: independent cases, mathematical and empirical definition of probability, two basic laws of probability (without proof)

#### `calculus` — Calculus (7 topics · 48h · since 2077 BS)

- [ ] Limits and continuity: limits of a function, indeterminate forms, algebraic properties of limits (without proof), basic theorems on limits of algebraic, trigonometric, exponential and logarithmic functions
- [ ] Continuity of a function, types of discontinuity, graphs of discontinuous function
- [ ] Derivatives: derivative of a function, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions by definition (simple forms)
- [ ] Rules of differentiation; derivatives of parametric and implicit functions; higher order derivatives
- [ ] Geometric interpretation of derivative; monotonicity of a function, interval of monotonicity, extreme values of a function, concavity, points of inflection
- [ ] Anti-derivatives: integration using basic integrals, integration by substitution and by parts methods
- [ ] The definite integral; the definite integral as an area under the given curve; area between two curves

#### `computational-methods-or-mechanics` — Computational Methods or Mechanics (4 topics · 12h · since 2077 BS)

- [ ] Numerical computation: roots of algebraic and transcendental equations (bisection and Newton-Raphson method)
- [ ] Numerical integration: Trapezoidal rule and Simpson's rule
- [ ] Mechanics (optional): Statics — forces and resultant forces, parallelogram law of forces, composition and resolution of forces, resultant of coplanar forces acting on a point
- [ ] Mechanics (optional): Dynamics — motion of particle in a straight line, motion with uniform acceleration, motion under gravity, motion down a smooth inclined plane

### Class 12

#### `limits-and-continuity` — Limits and Continuity (5 topics · 8h · since 2078 BS)

- [ ] Concept of limit — geometric and physical interpretation
- [ ] Standard limits and evaluation (algebraic, trigonometric, exponential, logarithmic)
- [ ] Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0^0, ∞^0
- [ ] Continuity of algebraic, trigonometric, exponential, logarithmic functions
- [ ] Differentiability and its relation with continuity

#### `differentiation` — Differentiation (9 topics · 16h · since 2078 BS)

- [ ] Derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions
- [ ] Rules of differentiation: product rule, quotient rule, chain rule
- [ ] Derivatives of parametric and implicit functions
- [ ] Higher order derivatives
- [ ] Logarithmic differentiation
- [ ] Leibniz's theorem for nth derivative
- [ ] Geometric interpretation — tangent and normal
- [ ] Monotonicity, maxima and minima (first and second derivative tests)
- [ ] Applications: rate of change, approximation, error estimation

#### `integration` — Integration (5 topics · 14h · since 2078 BS)

- [ ] Integration as inverse of differentiation
- [ ] Standard integrals and methods: substitution, parts, partial fractions
- [ ] Definite integrals and properties
- [ ] Integration of trigonometric functions
- [ ] Applications: area under curve, area between two curves

#### `differential-equations` — Differential Equations (3 topics · 8h · since 2078 BS)

- [ ] Formation of differential equations
- [ ] Solving first order, first degree equations: variable separable, homogeneous, linear
- [ ] Applications: growth and decay, population dynamics

#### `vector-algebra` — Vector Algebra (6 topics · 8h · since 2078 BS)

- [ ] Scalar and vector quantities, types of vectors
- [ ] Addition, subtraction and scalar multiplication of vectors
- [ ] Dot product (scalar product) and its applications
- [ ] Cross product (vector product) and its applications
- [ ] Scalar and vector triple products
- [ ] Applications: work, torque, angular momentum

#### `three-dimensional-geometry` — Three Dimensional Geometry (5 topics · 8h · since 2078 BS)

- [ ] Direction cosines and direction ratios of a line
- [ ] Equation of a line in space — standard and general form
- [ ] Equation of a plane — normal form, general form
- [ ] Angle between two lines, two planes, and a line and a plane
- [ ] Distance of a point from a plane and line

#### `linear-programming` — Linear Programming (3 topics · 6h · since 2078 BS)

- [ ] Linear programming — formulation of LPP
- [ ] Graphical method for solving LPP with two variables
- [ ] Maximization and minimization problems

#### `probability` — Probability (7 topics · 10h · since 2078 BS)

- [ ] Conditional probability and multiplication theorem
- [ ] Independent events
- [ ] Bayes' theorem and its applications
- [ ] Random variable and its probability distribution
- [ ] Mean, variance and standard deviation of a random variable
- [ ] Binomial distribution — definition, mean, variance
- [ ] Poisson distribution — definition, mean, variance

## English

### Class 11

#### `language-development` — Section I — Language Development (Units 1–17) (17 topics · since 2077 BS)

- [ ] Unit 1 — Education and Humanity
- [ ] Unit 2 — Communication
- [ ] Unit 3 — Media and Society
- [ ] Unit 4 — History and Culture
- [ ] Unit 5 — Life and Love
- [ ] Unit 6 — Health and Exercise
- [ ] Unit 7 — Ecology and Development
- [ ] Unit 8 — Humour and Satire
- [ ] Unit 9 — Democracy and Human Rights
- [ ] Unit 10 — Home Life and Family Relationship
- [ ] Unit 11 — Arts and Creation
- [ ] Unit 12 — Fantasy
- [ ] Unit 13 — Career and Entrepreneurship
- [ ] Unit 14 — Power and Politics
- [ ] Unit 15 — War and Peace
- [ ] Unit 16 — Critical Thinking
- [ ] Unit 17 — Globalization and Diaspora

#### `language-and-grammar` — Grammar & Vocabulary (integrated across Section I units) (3 topics · since 2077 BS)

- [ ] Grammar and Usage
- [ ] Vocabulary Building
- [ ] Communication Skills

#### `reading-and-comprehension` — Section II — Literature · Short Stories & Poems (12 topics · since 2077 BS)

- [ ] Short Story 1 — The Selfish Giant (Oscar Wilde)
- [ ] Short Story 2 — The Oval Portrait (Edgar Allan Poe)
- [ ] Short Story 3 — God Sees the Truth but Waits (Leo Tolstoy)
- [ ] Short Story 4 — The Wish (Roald Dahl)
- [ ] Short Story 5 — Civil Peace (Chinua Achebe)
- [ ] Short Story 6 — Two Little Soldiers (Guy de Maupassant)
- [ ] Short Story 7 — An Astrologer's Day (R. K. Narayan)
- [ ] Poem 1 — Corona Says (Vishnu S. Rai)
- [ ] Poem 2 — A Red, Red Rose (Robert Burns)
- [ ] Poem 3 — All the World's a Stage (William Shakespeare)
- [ ] Poem 4 — Who are you, little i? (E. E. Cummings)
- [ ] Poem 5 — The Gift in Wartime (Tran Mong Tu)

#### `literature-essays-plays` — Section II — Literature · Essays & One-Act Plays (8 topics · since 2077 BS)

- [ ] Essay 1 — Sharing Tradition (Frank LaPena)
- [ ] Essay 2 — How to Live Before You Die (Steve Jobs)
- [ ] Essay 3 — What I Require From Life (J.B.S. Haldane)
- [ ] Essay 4 — What is Poverty? (Jo Goodwin Parker)
- [ ] Essay 5 — Scientific Research is a Token of Humankind's Survival (Vladimir Keilis-Borok)
- [ ] One-Act Play 1 — Trifles (Susan Glaspell)
- [ ] One-Act Play 2 — A Sunny Morning (Serafín and Joaquín Álvarez Quintero)
- [ ] One-Act Play 3 — Refund (Fritz Karinthy)

#### `writing-and-composition` — Writing and Composition (14 topics · since 2077 BS)

- [ ] Essay Writing — argumentative, descriptive, narrative, expository
- [ ] Paragraph Writing
- [ ] Formal Letter Writing — editor, application, complaint, inquiry
- [ ] Informal Letter Writing
- [ ] Email Writing
- [ ] Report Writing and Summarisation
- [ ] Article Writing
- [ ] Story Writing
- [ ] Speech Writing
- [ ] Dialogue Writing
- [ ] Review Writing — book and film
- [ ] Summary and Note-making
- [ ] Comprehension and Unseen Passage
- [ ] Grammar for Writing — sentences, clauses, punctuation

#### `critical-thinking` — Critical Thinking (2 topics · since 2077 BS)

- [ ] Critical Thinking
- [ ] Literary Analysis and Interpretation

### Class 12

#### `language-development` — Section I — Language Development (Units 1–20) (20 topics · since 2078 BS)

- [ ] Unit 1 — Critical Thinking
- [ ] Unit 2 — Family
- [ ] Unit 3 — Sports
- [ ] Unit 4 — Technology
- [ ] Unit 5 — Education
- [ ] Unit 6 — Money and Economy
- [ ] Unit 7 — Humour
- [ ] Unit 8 — Human Culture
- [ ] Unit 9 — Ecology and Environment
- [ ] Unit 10 — Career Opportunities
- [ ] Unit 11 — Hobbies
- [ ] Unit 12 — Animal World
- [ ] Unit 13 — History
- [ ] Unit 14 — Human Rights
- [ ] Unit 15 — Leisure and Entertainment
- [ ] Unit 16 — Fantasy
- [ ] Unit 17 — War and Peace
- [ ] Unit 18 — Music and Creation
- [ ] Unit 19 — Migration and Diaspora
- [ ] Unit 20 — Power and Politics

#### `literary-analysis` — Section II — Literature (Stories · Poems · Essays · One-Act Plays) (20 topics · since 2078 BS)

- [ ] Short Story 1 — Neighbours (Tim Winton)
- [ ] Short Story 2 — A Respectable Woman (Kate Chopin)
- [ ] Short Story 3 — A Devoted Son (Anita Desai)
- [ ] Short Story 4 — The Treasure in the Forest (H. G. Wells)
- [ ] Short Story 5 — My Old Home (Lu Xun)
- [ ] Short Story 6 — The Half-closed Eyes of the Buddha and the Slowly Sinking Sun (Manjushree Thapa)
- [ ] Short Story 7 — A Very Old Man with Enormous Wings (Gabriel García Márquez)
- [ ] Poem 1 — A Day (Emily Dickinson)
- [ ] Poem 2 — Every Morning I Wake (Dylan Thomas)
- [ ] Poem 3 — I Was My Own Route (Julia de Burgos)
- [ ] Poem 4 — The Awakening Age (Ben Okri)
- [ ] Poem 5 — Soft Storm (Abhi Subedi)
- [ ] Essay 1 — On Libraries (Oliver Sacks)
- [ ] Essay 2 — Marriage as a Social Institution (Stephen L. Carter)
- [ ] Essay 3 — Knowledge and Wisdom (Bertrand Russell)
- [ ] Essay 4 — Humility (Yuval Noah Harari)
- [ ] Essay 5 — Human Rights and the Age of Inequality (Samuel Moyn)
- [ ] One-Act Play 1 — A Matter of Husbands (Ferenc Molnár)
- [ ] One-Act Play 2 — Facing Death (August Strindberg)
- [ ] One-Act Play 3 — The Bull (Bhimnidhi Tiwari)

#### `writing-skills` — Writing Skills (11 topics · 16h · since 2078 BS)

- [ ] Essay writing — argumentative, descriptive, narrative, expository
- [ ] Letter writing — formal and informal
- [ ] Email writing
- [ ] Report writing and summarisation
- [ ] Article writing
- [ ] Note-making and summary
- [ ] Story writing
- [ ] Speech and dialogue writing
- [ ] Review writing — book and film
- [ ] Comprehension and paraphrasing
- [ ] Grammar for writing — sentences, clauses, punctuation

#### `oral-communication` — Oral Communication (4 topics · 8h · since 2078 BS)

- [ ] Conversation and role play
- [ ] Presentation skills
- [ ] Debate and discussion
- [ ] Listening comprehension

#### `grammar` — Grammar (5 topics · 12h · since 2078 BS)

- [ ] Tenses and their uses
- [ ] Clauses and sentence types
- [ ] Voice and narration
- [ ] Modals and conditionals
- [ ] Punctuation and capitalisation

## Nepali

### Class 11

#### `bhasha-ra-vyakarana` — भाषा र व्याकरण (5 topics · since 2077 BS)

- [ ] पदप्रकरण — लिङ्ग, पुरुष, वचन, कारक र विभक्ति
- [ ] क्रियाप्रकरण — धातु, काल, वाच्य र सार्वनामिक क्रिया
- [ ] समास — तत्पुरुष, कर्मधारय, द्वन्द्व र बहुव्रीहि
- [ ] शब्द परिवर्तन — शब्द रूपान्तर, समानार्थक र विपरीतार्थक शब्द
- [ ] राष्ट्रभाषा नेपाली — ऐतिहासिक विकास र भाषा नीति

#### `sahitya-adhyayan` — निर्धारित पाठ — पाठ्यपुस्तक पाठ १–१२ (12 topics · since 2077 BS)

- [ ] पाठ १ — वीर पुर्खा (कविता)
- [ ] पाठ २ — गाउँको माया (सामाजिक कथा)
- [ ] पाठ ३ — संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध)
- [ ] पाठ ४ — योगमाया (राष्ट्रिय जीवनी)
- [ ] पाठ ५ — साथीलाई चिठी (चिठी)
- [ ] पाठ ६ — त्यो फेरि फर्कला? (मनोवैज्ञानिक कथा)
- [ ] पाठ ७ — पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध)
- [ ] पाठ ८ — लौ आयो ताजा खबर (लघु नाटक)
- [ ] पाठ ९ — सफलताको कथा (रिपोर्ताजमूलक रचना)
- [ ] पाठ १० — कृषिशालामा एक दिन (संवाद)
- [ ] पाठ ११ — रारा भ्रमण (दैनिकी)
- [ ] पाठ १२ — जलस्रोत र ऊर्जा (वक्तृता)

#### `lekhan-ra-rachana` — लेखन र रचना (5 topics · since 2077 BS)

- [ ] निबन्ध लेखन — आत्मपरक र वस्तुपरक
- [ ] चिठी लेखन — औपचारिक र अनौपचारिक
- [ ] संवाद लेखन
- [ ] दैनिकी लेखन
- [ ] वक्तृता र रिपोर्ताजमूलक रचना

#### `katha-natak-ra-sanskriti` — साहित्यिक विधा र संस्कृति (4 topics · since 2077 BS)

- [ ] कथा, कविता र नाटकका विधागत विशेषता
- [ ] व्यंग्य र हास्यव्यंग्य
- [ ] नेपाली सांस्कृतिक विविधता, चाडपर्व र परम्परा
- [ ] भाषा-साहित्यमा योगदान पुर्‍याउने साहित्यकार

### Class 12

#### `bhasha-tatha-vyakaran` — भाषा र व्याकरण (5 topics · 16h · since 2078 BS)

- [ ] शब्द-वर्ग, पद-वर्ग र पदबन्ध
- [ ] कारक, विभक्ति र समास (तत्पुरुष, कर्मधारय, द्वन्द्व, बहुव्रीहि)
- [ ] क्रिया — काल, वाच्य र पदबन्ध
- [ ] वाक्य रचना — सरल, मिश्रित र संयुक्त वाक्य; शुद्ध-अशुद्ध वाक्य
- [ ] मुहावरा, लोकोक्ति र शब्द-सम्पदा

#### `sahitya-adhyayan` — निर्धारित पाठ — पाठ्यपुस्तक पाठ १–१२ (12 topics · 24h · since 2078 BS)

- [ ] पाठ १ — आमाको सपना (कविता, गोपालप्रसाद रिमाल)
- [ ] पाठ २ — विरहिणी दमयन्ती (कथा, मदनमणि दीक्षित)
- [ ] पाठ ३ — घनघस्याको उकालो काट्दा (निबन्ध)
- [ ] पाठ ४ — व्यावसायिक पत्र (पत्र लेखन)
- [ ] पाठ ५ — एक चिहान (उपन्यास, पारिजात)
- [ ] पाठ ६ — स्टिफन विलियम हकिङ (जीवनी)
- [ ] पाठ ७ — हामीलाई बोलाउँछन् हिमचुली (कविता, भूपी शेरचन)
- [ ] पाठ ८ — मातृत्व (निबन्ध)
- [ ] पाठ ९ — गोर्खे (कथा)
- [ ] पाठ १० — नेपाली पहिचान (निबन्ध)
- [ ] पाठ ११ — सहकारी (कथा)
- [ ] पाठ १२ — जीवन मार्ग (कविता)

#### `lekhan-koushal` — लेखन कौशल (5 topics · 10h · since 2078 BS)

- [ ] आवधिक निबन्ध लेखन
- [ ] पत्र लेखन — आधिकारिक र अनौपचारिक (व्यावसायिक पत्र सहित)
- [ ] प्रतिवेदन र सम्पादन लेखन
- [ ] समीक्षा र सारांश लेखन
- [ ] सृजनात्मक लेखन — कथा, कविता, संवाद

#### `sanskriti-tatha-samaj` — संस्कृति र समाज (3 topics · 6h · since 2078 BS)

- [ ] नेपाली संस्कृति, रीतिरिवाज र सामाजिक संरचना
- [ ] साहित्यमा सामाजिक वास्तविकताको प्रतिनिधित्व
- [ ] भाषा र पहिचान — नेपाली पहिचानका पाठहरूसँग सम्बन्ध

<!-- KNOWLEDGE-PLAN:INVENTORY:END -->

---

*Plan authored for the platform owner. Questions that this plan cannot resolve are, by
design, `[?]` escalations — report them instead of guessing.*
