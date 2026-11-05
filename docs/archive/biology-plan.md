# 🧬 BIOLOGY NOTES REBUILD — Master Plan (book-grade)

> **Mission:** raise the Biology notes from their current ~3–4% of textbook depth to
> **book-grade, visionary notes** — every topic of every unit of the NEB Biology syllabus
> (Class 11 + Class 12 = **19 units · 105 topics**) gets: a proper introduction, a strict
> hierarchy, highly classified/organized tables with examples, and rich English diagrams
> (authored SVG + curated Google-sourced figures).
>
> - **Scope ladder:** NEB platform — Class 11 → Class 12 → (architecture stays open for
>   Bachelor level later). Biology is the pilot subject; other subjects follow this playbook.
> - **Benchmark book:** *Pioneer Basic Biology: Grade XI* (Tek Raj Gurung, Tirth Raj Ghimire
>   et al.) and the NEB/CDC Grade 11 Biology textbook — step-by-step points, diagrams on
>   every concept, topic-wise MCQs, simple precise language.
> - **Golden rules:** ① **Simply no removal** — existing notes are upgraded in place to a
>   newer version, never deleted. ② **All existing CEE / entrance-exam information stays**
>   in the notes section; new notes grow an Exam Zone around it. ③ Curriculum order is
>   owned by `frontend/lib/syllabus.ts` — never reorder or rename. ④ Facts must stay
>   valid and sourced (KNOWLEDGE-PLAN.md §4) — the 15 already-corrected claim families
>   must never regress.
> - **This document is the plan.** Next session creates **all interfaces** (skeletons);
>   note-filling happens in later sessions (§7).

---

## 0. The gap, stated plainly

A student opening today's topic files finds ~3–7 summary lines, a few MCQs and filler.
Opening *Pioneer Biology* they find: a chapter introduction, hierarchical sections with
step-by-step points, characteristic tables for every group, labelled diagrams for every
structure and life cycle, worked examples, and chapter-end MCQs + past questions.
**Coverage today ≈ 3–4% of that.** This plan closes the gap topic by topic, with a
measurable "Book-Grade Bar" (§4) so "done" means done.

---

## 1. Scope & ladder

| Level | Units | Topics | Status |
|---|---:|---:|---|
| Biology Class 11 (10 units, Botany + Zoology) | 10 | 58 | **this plan — first** |
| Biology Class 12 (9 units) | 9 | 47 | this plan — second |
| Bachelor-level Biology | — | — | later; the file/schema hierarchy (class → subject → unit → topic) already scales — design notes must not assume Grade 11 only |

---

## 2. Benchmarks & sources

| Source | Role |
|---|---|
| `frontend/lib/syllabus.ts` | **Topic skeleton + order** (single source of truth) |
| *Pioneer Basic Biology: Grade XI* (Gurung/Ghimire, Pioneer/Dreamland) | **Depth & format benchmark** — step-by-step points, diagrams, topic-wise MCQs, CEE angle |
| NEB/CDC Biology textbook Grade 11 & 12 (CDC Nepal PDFs) | Curriculum wording, figures, activities |
| Google / Wikimedia / open textbooks | **Diagram intake** (§3.4) — license-checked, English labels |
| Web research (Scholar/PubMed/authority sites) | Fact validity — per KNOWLEDGE-PLAN.md §4 rules |
| Existing corpus (`content/notes/concepts/**`) | The v2 upgrade base — **nothing is removed** |

---

## 3. The Note Interface v2 — mandatory anatomy of every topic note

This is the **interface** to be created for all 105 topics first (§7). A topic note is not
"complete" until every block below exists. Blocks map onto the repo's `ConceptNoteSchema`
(`frontend/lib/content/schema/concept.ts`) so files stay valid.

### 3.1 Anatomy (fixed order)

| # | Block | Content standard | Schema home |
|---|---|---|---|
| I | **Introduction** | 150–300 words: what the topic is, why it matters, real-world hook (Nepal where possible), the chapter map (what the reader will learn), learning outcomes | `notes[0]` heading + prose |
| II | **Hierarchy body** | Strict H2→H4 structure covering **every sub-point of the syllabus topic string**; step-by-step numbered points (Pioneer style), each concept defined → explained → exemplified | `notes`, `keyPoints` |
| III | **Classified tables** | ≥ 3 per topic (§3.3): classification / comparison / characteristics / process / summary tables — **every table has an Example column or example rows** | markdown tables in `notes`/`blocks` |
| IV | **Diagrams** | ≥ 4 per topic (§3.4): ≥ 2 authored SVG + ≥ 2 curated Google/external, all **English labels**, numbered + captioned (Fig. x.y) | `figures` (new, §3.6) / `blocks` / visuals registry |
| V | **Worked examples & applications** | ≥ 6: solved steps, live examples, Nepal-context applications | `examples`, `numericals` |
| VI | **Key terms & statements** | every new term defined once; exam-grade definitions verbatim-safe | `keyPoints`, `importantStatements` |
| VII | **Exam Zone** | NEB past-question map (long/short), **all existing CEE/entrance MCQs preserved** + new topic-wise MCQs with explanations, short tricks | `mcs`, `practiceQuestions`, `examNotes`, `examShortTricks` |
| VIII | **Summary & self-check** | 5–10 line chapter summary + self-check questions + "common confusions" | `summary`, `confusion`, `practice` |

### 3.2 Hierarchy rules (proper hierarchy)

1. One H1 (topic title) → H2 blocks in the fixed order I–VIII → H3 per sub-concept → H4 for detail.
   No skipped levels; no orphan headings.
2. Every syllabus sub-point of the topic string gets its own H3 — coverage is mechanical, not artistic.
3. Definition → structure → process → significance is the default concept order (biology's logic).
4. English is the note language; Nepali terms appear in parentheses where they aid students
   (e.g., "alternation of generations (पुस्पी तथा जनन पीढीको आदानप्रदान)").
5. 2026 validity baseline: corrected facts from the pilot unit (mesosomes, 9+2 axoneme,
   hemoglobin units, etc.) are part of the interface content, not optional polish.

### 3.3 Table standard — "highly classified/organized tables with examples"

| Table type | Required for | Column rule |
|---|---|---|
| **Classification table** | every diversity/taxonomy topic | Group → Diagnostic features → Examples (≥ 2) → Economic importance |
| **Comparison table** | every "difference between X and Y" syllabus point | Feature → X → Y (one row per distinguishing feature, ≤ 10 rows) |
| **Characteristics table** | every organism/system topic (Marchantia, Dryopteris, Pinus, earthworm, frog…) | Part → Structure → Function → Exam note |
| **Process table** | every cycle/pathway (cell cycle, Krebs, PCR, nitrogen cycle…) | Step → What happens → Where → Key enzyme/number |
| **Summary/marks table** | every topic end | Sub-topic → One-line essence → NEB marks trend |

Rules: numbered captions (Table 1, Table 2…), bold header row, ≤ 12 rows, **examples in
every classification/characteristics table**, and each table referenced from the body text.

### 3.4 Diagram standard — "svg/google detailed diagrams in english, try to get more from google"

| Kind | Source | Standard |
|---|---|---|
| **A — Authored SVG** | created for the platform (≥ 2/topic) | viewBox 900×640, `role="img"`, `<title>` + `aria-label` in English, labelled parts with leader lines, subject colour tokens (`frontend/lib/ui/subject-visuals.ts`), caption "Fig. x.y — …". Kinds: structure, life-cycle, process-flow, comparison, graph. |
| **B — Curated external** (≥ 2/topic) | Google Images / Wikimedia Commons / open textbooks | **License check mandatory** (CC-BY / CC-BY-SA / public domain / textbook-with-attribution); record source URL + author + license in the figure entry; English labels only (non-English figures are redrawn or caption-translated); prefer the *most detailed* figure available (the user asked to "get more from google") |
| **C — AI/Studio figures** | platform's diagram studio / rails | allowed as supplements, never as the only figure for a structure topic |

Every topic declares its figure slots up front in the interface skeleton (e.g.,
`D1 thallus structure (SVG)`, `D2 life cycle (SVG)`, `D3 gemma cup photo/plate (Google)`,
`D4 comparison with moss (Google/SVG)`), so filling is mechanical.

### 3.5 Exam Zone (CEE content lives here — never removed)

- Existing "Entrance Exam Focus" / CEE MCQ lines **stay in place**; the zone grows around them.
- New: topic-wise MCQs (≥ 10, with explanations, `mcs` schema), NEB past-question pointers,
  short tricks (`examShortTricks`), and a marks-trend line.

### 3.6 Schema contract (the interface as code)

- All blocks fit today's `ConceptNoteSchema` tiers: Required (`title`, `unitSlug`,
  `topicSlug`, `topicTitle`, `notes`) + Authored (`keyPoints`, `summary`, `confusion`,
  `examples`, `mcs`, `numericals`, `formulaSpecs`, `blocks`, …).
- **One proposed opt-in extension:** `figures: FigureSchema[]` — `{ id, caption, kind:
  "svg" | "external", svg?: string, url?: string, source, author, license, alt }` —
  following the `formulaSpecs` precedent ("opt-in, absent from every note today").
  Per `AGENT_RULES.md`, this schema change is recorded in `PROJECT_STATUS.md` +
  `CORE_FILES.md` and approved before merging. Until then, figures ship through
  `blocks` + the visuals registry so nothing is blocked.
- Files stay at `content/notes/concepts/{class}/biology/{unit}/NN-slug.json`; the shipped
  mirror is regenerated with `npm run content:build` (byte-parity gate).

---

## 4. The Book-Grade Bar (measurable "done")

Per topic: **≥ 8 hierarchical sections · ≥ 3 classified tables with examples · ≥ 4 diagrams
(2 SVG + 2 curated) · ≥ 6 examples · all terms defined · ≥ 10 MCQs (CEE preserved) ·
≥ 5 NEB short questions · ≥ 2 long questions · summary + self-check · zero broken/garbled
strings.** Per unit: 100% of topics at the bar. Measured by `audit:scopes` (no new thin
files), schema tests, and the interface checklist in §9.

---

## 5. Existing-notes polish track (newer version, simply no removal)

1. **Additive upgrade only:** v2 content is added around existing fields; existing strings
   are never deleted. Corrections of wrong facts are edits in place (allowed — validity),
   not removals.
2. **CEE/entrance content is preserved verbatim** in its section.
3. Polish checklist per existing file: de-garble broken strings · merge duplicate stamped
   lines into one strong line (original kept in a collapsed "extra points" list) · upgrade
   3–7 summary lines into the §3.1 hierarchy · attach table/diagram slots · re-scan with
   the KNOWLEDGE-PLAN claim method.
4. Version marker: `"source": "skeleton-v2" / "authored-v2"` + `generatedAt` retained;
   git history is the audit trail.
5. Known offenders to fix early in polish: template filler lines (generator-level ticket
   exists), cross-subject filler leaks, the 3-variants-per-topic duplication (fill each
   variant consistently; generator fix tracked separately).

---

## 6. Per-unit blueprints (19 units — the visionary layer)

Depth directives beyond the standard interface. All units: §3.1–3.5 + Book-Grade Bar.

### Class 11 (58 topics)

| Unit | h | Blueprint (tables & diagrams that unit MUST produce) |
|---|---:|---|
| **Introduction to Biology** (2) | 2 | Scope map of biology as a discipline (SVG mind-map), fields-of-biology classification table (field → scope → example career), biology–other-sciences Venn/flow SVG. |
| **Biomolecules & Cell Biology** (4) | 15 | Biomolecule master table (class → monomer → linkage → function → example); 4-level protein structure SVG set; organelle characteristics table (organelle → structure → function → example cell); **cell-cycle wheel SVG + mitosis/meiosis comparison table + PMAT plate diagrams** (already validity-corrected — keep). |
| **Floral Diversity** (13) | 30 | The table-heavy heart: one **classification/characteristics table per group** (algae classes, fungal classes, bryophyte groups, pteridophyte groups, gymnosperm examples, NEB families), **life-cycle SVG for Marchantia, Dryopteris, Pinus, and angiosperm flower**, family floral-diagram + floral-formula table (Brassicaceae/Fabaceae/Solanaceae/Liliaceae), Nepal-flora data table (this unit owns the "status of flora" data + correct Ericaceae placement for Rhododendron). |
| **Introductory Microbiology** (3) | 5 | Bacterial cell structure SVG (Gram +ve vs Gram −ve comparison table + plates), bacterial growth-curve graph SVG, virus/bacteriophage structure SVG (T4 vs TMV table), cyanobacteria table; biotech-impact table. |
| **Vegetation** (3) | 3 | Nepal vegetation-belt table (belt → altitude → indicator species) + zonation SVG, in-situ vs ex-situ comparison table with Nepal examples (protected-area list table). |
| **Evolutionary Biology** (6) | 15 | Miller–Urey apparatus SVG + Oparin–Haldane steps table; evidence-of-evolution master table (type → example → significance); Lamarck vs Darwin vs Neo-Darwin comparison table; **human-evolution timeline SVG** (anthropoid → man) + hominid comparison table (old/new world monkeys, apes, man). |
| **Faunal Diversity** (11) | 34 | The second table-heavy heart: **phylum classification table up to class** (phylum → diagnostic features → examples), body-plan/symmetry/coelom decision-table + cladogram SVG; **Paramecium & Plasmodium structure + life-cycle SVGs** (Plasmodium life-cycle is the flagship diagram); **earthworm system-by-system characteristic tables** (digestive/excretory/nervous/reproductive) + alimentary canal SVG; **frog system tables** (digestive, blood-vascular — heart structure SVG with working-mechanism flow, respiratory, reproductive). |
| **Ecology** (6) | 11 | Ecosystem structure/flow SVG (pond + forest), food-chain/web diagram set, trophic pyramid set (3 shapes + productivity table), **carbon & nitrogen cycle SVGs** + process tables, succession series (hydrosere) SVG, hydrophyte/xerophyte adaptation comparison table, greenhouse/ozone/acid-rain cause–effect–control tables. |
| **Biota & Environment** (5) | 10 | Adaptation type table (aquatic/terrestrial/volant → feature → example animal), behaviour reflex-arc SVG + taxes table, migration map/table (fish & bird), pollution source–effect–control master table (air/water/soil), pesticide-effects table. |
| **Conservation Biology** (5) | 3 | Biodiversity concept diagram + levels table, **Nepal protected-areas table** (park → type → flagship species), IUCN Red-List category table (category → definition → Nepal example), endangered-species-of-Nepal profile table with figures. |

### Class 12 (47 topics)

| Unit | h | Blueprint |
|---|---:|---|
| **Heredity & Evolution** (8) | 24 | Cross-diagram set (mono/dihybrid, incomplete dominance, codominance) with **worked ratio tables**; linkage/crossing-over SVG; sex-determination chart set (XY, ZW) + disorder table; DNA structure/replication/transcription/translation **process SVGs + step tables** (the molecular flagship unit); operon SVG; HGP facts table; Hardy–Weinberg worked numericals (`numericals`); adaptive-radiation examples table. |
| **Human Health & Diseases** (5) | 10 | Pathogen master table (disease → pathogen → vector → symptoms → prevention) — the unit's core asset; immune-system tree SVG (innate/adaptive) + antibody structure SVG; antigen–antibody response flow; vaccination schedule/notes table; allergy vs autoimmune comparison table. |
| **Strategies for Food Production** (4) | 6 | Plant-breeding methods table (method → crop → achievement), SCP table (organism → product), **breeds tables** (cattle/poultry), biofertilizer table (organism → crop benefit). |
| **Microbes in Human Welfare** (4) | 5 | Household-product table (product → microbe → role), industrial table (product → microbe → process), biocontrol/biofertilizer comparison table, biogas digester SVG + bioremediation examples table. |
| **Biotechnology — Principles** (4) | 8 | **rDNA workflow SVG** (the unit flagship), restriction-enzyme table (enzyme → source → cut site), vector anatomy SVG + table, PCR cycle SVG + step table, gel-electrophoresis SVG, tools/processes summary table. |
| **Biotechnology & Applications** (4) | 8 | Application table (crop/trait → mechanism → example: Bt cotton, RNAi tobacco), medicine table (product → technique → benefit: insulin, gene therapy), transgenic-animal table, biopiracy/patent case table. |
| **Organisms & Environment** (6) | 10 | Adaptation table, population-growth curves SVG (J vs S) + parameter table, productivity table (GPP/NPP), decomposition process table, succession table, **C/N/P cycle SVGs**, energy-flow + pyramid SVGs. |
| **Biodiversity & Conservation** (5) | 6 | Biodiversity-levels diagram, global-vs-Nepal pattern table, loss-causes table, in-situ/ex-situ strategy table, **Red Data Book / IUCN table with Nepal examples** (shares assets with Class 11 conservation unit — reuse, don't duplicate). |
| **Environmental Issues** (7) | 8 | Pollution cause–effect–control tables (air/water/solid), nuclear-hazard table, greenhouse/gw numbers table (current CO₂ ppm — validity-checked), ozone-depletion SVG (ozone hole), rainwater-harvesting + wasteland development flow SVGs. |

---

## 7. Interfaces-first roadmap (sessions)

| Session | Deliverable | Exit gate |
|---|---|---|
| **S1 — Interfaces (next session)** | **All 105 topic skeleton files created** from the §3 interface: headings I–VIII in place, empty table shells with declared columns, figure slots declared, Exam Zone seeded with the existing CEE lines (copied, not moved), `source: skeleton-v2` | every file passes `ConceptNoteSchema`; `npm run check:content` + `npm run audit:scopes` green (no placeholder rise); §9 checklist all "interface" boxes ticked |
| **S2–S21 — Filling** | one **unit** per session, Class 11 in syllabus order (start: Introduction to Biology & Biomolecules & Cell Biology), then Class 12; each session writes tables + diagrams + body to the Book-Grade Bar | per-unit bar (§4); `check:content` green; figures license-recorded |
| **Parallel — Polish track** | existing non-skeleton notes upgraded (§5) as their unit comes up for filling | no-removal diff review; CEE lines present |
| **Final — Gate** | `npm run check:all`, coverage report, tracker sign-off | 105/105 at the bar |

Diagram batches run per session: "get more from Google" = a dedicated curation pass per unit
(search → license-check → record → place), not an afterthought.

---

## 8. Quality gates & verification

1. **Schema:** every file parses against `ConceptNoteSchema` (`npm run check:schema`).
2. **Corpus:** `npm run check:content` · `npm run content:build:check` (byte parity).
3. **Coverage:** `npm run audit:scopes` (thin/placeholder must not rise; skeletons carry
   real headings and shells, not emptiness) + §9 checklist.
4. **Visuals:** `npm run audit:visuals` · `npm run audit:mindmap`.
5. **No-removal proof:** each polish/fill PR shows `git diff` with zero deletions of
   existing knowledge lines (corrections excepted, and recorded in the validity ledger).
6. **Validity:** new claims follow KNOWLEDGE-PLAN.md §4–§5; corrected claim families stay corrected.

---

## 9. Tracking — per-topic interface & fill checklist

> Regenerated by `node scripts/subject-plan-inventory.mjs biology` from `frontend/lib/syllabus.ts`.
> Legend: **I** = interface skeleton created · **N** = notes filled to the Book-Grade Bar ·
> **D** = diagrams all placed & license-recorded · **P** = polished (existing content upgraded).

<!-- BIOLOGY-PLAN:TOPICS:START -->

> Regenerated by `node scripts/subject-plan-inventory.mjs biology` from `frontend/lib/syllabus.ts`.
> Coverage: **19 units · 105 topics** (Class 11: 10 units, 58 topics; Class 12: 9 units, 47 topics).

## Class 11

### `biomolecules-and-cell-biology` — Biomolecules and Cell Biology (4 topics · 15h)

- [x] I · [x] N · [x] D · [ ] P — **Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water**
- [x] I · [x] N · [x] D · [ ] P — **Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells**
- [x] I · [x] N · [x] D · [ ] P — **Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions**
- [x] I · [x] N · [x] D · [ ] P — **Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances**

### `floral-diversity` — Floral Diversity (13 topics · 30h)

- [x] I · [ ] N · [ ] D · [ ] P — **Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)**
- [x] I · [ ] N · [ ] D · [ ] P — **Status of flora in Nepal and world representation**
- [x] I · [ ] N · [ ] D · [ ] P — **Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes**
- [x] I · [ ] N · [ ] D · [ ] P — **Structure and reproduction of Mucor and Yeast**
- [x] I · [ ] N · [ ] D · [ ] P — **Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi**
- [x] I · [ ] N · [ ] D · [ ] P — **Lichen: General introduction, characteristic features and economic importance of lichen**
- [x] I · [ ] N · [ ] D · [ ] P — **Algae: General introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae**
- [x] I · [ ] N · [ ] D · [ ] P — **Bryophyta: General introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes**
- [x] I · [ ] N · [ ] D · [ ] P — **Pteridophyta: General introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes**
- [x] I · [ ] N · [ ] D · [ ] P — **Gymnosperm: General introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm**
- [x] I · [ ] N · [ ] D · [ ] P — **Angiosperm: Morphology of root, stem, leaves, inflorescences, flowers and fruit**
- [x] I · [ ] N · [ ] D · [ ] P — **Taxonomic study: Definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms**
- [x] I · [ ] N · [ ] D · [ ] P — **Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae**

### `introductory-microbiology` — Introductory Microbiology (3 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)**
- [x] I · [ ] N · [ ] D · [ ] P — **Virus: General introduction, structure and importance of virus, bacteriophage**
- [x] I · [ ] N · [ ] D · [ ] P — **Impacts of biotechnology in the field of microbiology**

### `ecology` — Ecology (6 topics · 11h)

- [x] I · [ ] N · [ ] D · [ ] P — **Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Concept of ecosystem, structural and functional aspects of pond and forest ecosystem**
- [x] I · [ ] N · [ ] D · [ ] P — **Food chain, food web, trophic level, ecological pyramids, productivity**
- [x] I · [ ] N · [ ] D · [ ] P — **Biogeochemical cycles: carbon and nitrogen cycles; concept of succession**
- [x] I · [ ] N · [ ] D · [ ] P — **Ecological adaptation: Concept of adaptation, hydrophytes and xerophytes**
- [x] I · [ ] N · [ ] D · [ ] P — **Ecological imbalances: Greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion**

### `vegetation` — Vegetation (3 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Vegetation: Introduction, types of vegetation in Nepal**
- [x] I · [ ] N · [ ] D · [ ] P — **In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation**
- [x] I · [ ] N · [ ] D · [ ] P — **Natural environment-vegetation and human activities**

### `introduction-to-biology` — Introduction to Biology (2 topics · 2h)

- [x] I · [x] N · [x] D · [ ] P — **Introduction to Biology: Scope and fields of biology**
- [x] I · [x] N · [x] D · [ ] P — **Relation of biology with other sciences**

### `evolutionary-biology` — Evolutionary Biology (6 topics · 15h)

- [x] I · [ ] N · [ ] D · [ ] P — **Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment**
- [x] I · [ ] N · [ ] D · [ ] P — **Evidences of evolution: Morphological, Anatomical, Paleontological, Embryological and Biochemical**
- [x] I · [ ] N · [ ] D · [ ] P — **Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism**
- [x] I · [ ] N · [ ] D · [ ] P — **Human evolution: Position of man in animal kingdom**
- [x] I · [ ] N · [ ] D · [ ] P — **Differences between new world monkeys and old-world monkeys, apes and man**
- [x] I · [ ] N · [ ] D · [ ] P — **Evolution of modern man starting from anthropoid ancestor**

### `faunal-diversity` — Faunal Diversity (11 topics · 34h)

- [x] I · [ ] N · [ ] D · [ ] P — **Protista: Outline classification. Protozoa: diagnostic features and classification up to class with examples**
- [x] I · [ ] N · [ ] D · [ ] P — **Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle**
- [x] I · [ ] N · [ ] D · [ ] P — **Economic importance of P. falciparum**
- [x] I · [ ] N · [ ] D · [ ] P — **Animalia: Level of organization, body plan, body symmetry, body cavity and segmentation in animals**
- [x] I · [ ] N · [ ] D · [ ] P — **Diagnostic features and classification of phyla (up to class): Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata**
- [x] I · [ ] N · [ ] D · [ ] P — **Earthworm (Pheretima posthuma): Habit and habitat, external features; digestive system (alimentary canal and physiology of digestion)**
- [x] I · [ ] N · [ ] D · [ ] P — **Earthworm: Excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral, working mechanism)**
- [x] I · [ ] N · [ ] D · [ ] P — **Earthworm: Reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance**
- [x] I · [ ] N · [ ] D · [ ] P — **Frog (Rana tigrina): Habit and habitat, external features; digestive system (alimentary canal, digestive glands and physiology of digestion)**
- [x] I · [ ] N · [ ] D · [ ] P — **Frog: Blood vascular system (structure and working mechanism of heart); respiratory system (respiratory organs and physiology of respiration)**
- [x] I · [ ] N · [ ] D · [ ] P — **Frog: Reproductive system (male and female reproductive organs)**

### `biota-and-environment` — Biota and Environment (5 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Animal adaptation: Aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation**
- [x] I · [ ] N · [ ] D · [ ] P — **Animal behavior: Reflex action, taxes, dominance and leadership**
- [x] I · [ ] N · [ ] D · [ ] P — **Fish and bird migration**
- [x] I · [ ] N · [ ] D · [ ] P — **Environmental pollution: Sources, effects and control measures of air, water and soil pollution**
- [x] I · [ ] N · [ ] D · [ ] P — **Pesticides and their effects**

### `conservation-biology` — Conservation Biology (5 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Conservation biology: Concept of biodiversity, biodiversity conservation**
- [x] I · [ ] N · [ ] D · [ ] P — **National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites**
- [x] I · [ ] N · [ ] D · [ ] P — **Wildlife: Importance, causes of extinction and conservation strategies**
- [x] I · [ ] N · [ ] D · [ ] P — **IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species**
- [x] I · [ ] N · [ ] D · [ ] P — **Endangered species in Nepal**

## Class 12

### `heredity-and-evolution` — Heredity and Evolution (8 topics · 24h)

- [x] I · [ ] N · [ ] D · [ ] P — **Mendel's laws of inheritance — monohybrid and dihybrid cross**
- [x] I · [ ] N · [ ] D · [ ] P — **Incomplete dominance and codominance**
- [x] I · [ ] N · [ ] D · [ ] P — **Linkage and crossing over**
- [x] I · [ ] N · [ ] D · [ ] P — **Sex determination and sex-linked disorders**
- [x] I · [ ] N · [ ] D · [ ] P — **Chromosome theory of inheritance**
- [x] I · [ ] N · [ ] D · [ ] P — **Molecular basis of inheritance: DNA structure, replication, transcription, translation, gene regulation**
- [x] I · [ ] N · [ ] D · [ ] P — **Human genome project — objectives and significance**
- [x] I · [ ] N · [ ] D · [ ] P — **Evolution: evidences, adaptive radiation, Hardy-Weinberg equilibrium, human evolution**

### `human-health-and-diseases` — Human Health and Diseases (5 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Pathogens and diseases: malaria, dengue, filariasis, ascariasis, pneumonia, typhoid, tuberculosis, common cold, AIDS, ringworm**
- [x] I · [ ] N · [ ] D · [ ] P — **Immune system — innate and adaptive immunity**
- [x] I · [ ] N · [ ] D · [ ] P — **Antigens and antibodies, immune response**
- [x] I · [ ] N · [ ] D · [ ] P — **Vaccination and immunization**
- [x] I · [ ] N · [ ] D · [ ] P — **Allergy and autoimmune diseases**

### `strategies-for-food-production` — Strategies for Enhancement in Food Production (4 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Plant breeding — methods and examples**
- [x] I · [ ] N · [ ] D · [ ] P — **Single cell protein (SCP)**
- [x] I · [ ] N · [ ] D · [ ] P — **Animal husbandry — breeds and management**
- [x] I · [ ] N · [ ] D · [ ] P — **Biofertilizers and sustainable agriculture**

### `microbes-in-human-welfare` — Microbes in Human Welfare (4 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Microorganisms in household products**
- [x] I · [ ] N · [ ] D · [ ] P — **Industrial production of antibiotics, alcoholic beverages, citric acid**
- [x] I · [ ] N · [ ] D · [ ] P — **Microbes as biocontrol agents and biofertilizers**
- [x] I · [ ] N · [ ] D · [ ] P — **Bioremediation, biogas**

### `biotechnology-principles` — Biotechnology — Principles and Processes (4 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Principles of biotechnology — recombinant DNA technology**
- [x] I · [ ] N · [ ] D · [ ] P — **Tools: restriction enzymes, vectors, competent host**
- [x] I · [ ] N · [ ] D · [ ] P — **Processes: DNA isolation, PCR, gel electrophoresis, gene transfer**
- [x] I · [ ] N · [ ] D · [ ] P — **Applications of recombinant DNA technology**

### `biotechnology-applications` — Biotechnology and Its Applications (4 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Biotechnological applications in agriculture: Bt cotton, nematode-resistant tobacco**
- [x] I · [ ] N · [ ] D · [ ] P — **Biotechnological applications in medicine: insulin, gene therapy, therapeutic proteins**
- [x] I · [ ] N · [ ] D · [ ] P — **Transgenic animals**
- [x] I · [ ] N · [ ] D · [ ] P — **Biopiracy and patent issues**

### `organisms-and-environment` — Organisms and Environment (6 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Adaptations of organisms to environmental conditions**
- [x] I · [ ] N · [ ] D · [ ] P — **Population ecology — growth, regulation, interactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Ecosystem structure and function — productivity, decomposition**
- [x] I · [ ] N · [ ] D · [ ] P — **Ecological succession**
- [x] I · [ ] N · [ ] D · [ ] P — **Nutrient cycling — carbon, nitrogen, phosphorus**
- [x] I · [ ] N · [ ] D · [ ] P — **Ecological pyramids and energy flow**

### `biodiversity-and-conservation` — Biodiversity and Conservation (5 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Biodiversity — genetic, species, and ecosystem levels**
- [x] I · [ ] N · [ ] D · [ ] P — **Patterns of biodiversity — global and Nepal**
- [x] I · [ ] N · [ ] D · [ ] P — **Biodiversity loss — causes and consequences**
- [x] I · [ ] N · [ ] D · [ ] P — **Conservation strategies — in-situ and ex-situ**
- [x] I · [ ] N · [ ] D · [ ] P — **Red Data Book and IUCN categories**

### `environmental-issues` — Environmental Issues (7 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Air pollution — causes, effects, and control**
- [x] I · [ ] N · [ ] D · [ ] P — **Water pollution — causes, effects, and control**
- [x] I · [ ] N · [ ] D · [ ] P — **Solid waste management**
- [x] I · [ ] N · [ ] D · [ ] P — **Nuclear radiation hazards**
- [x] I · [ ] N · [ ] D · [ ] P — **Greenhouse effect, global warming, climate change**
- [x] I · [ ] N · [ ] D · [ ] P — **Ozone layer depletion**
- [x] I · [ ] N · [ ] D · [ ] P — **Rainwater harvesting and wasteland development**

<!-- BIOLOGY-PLAN:TOPICS:END -->

---

## 10. Risks & hard rules

1. **No removal, ever** (user mandate) — additive v2; corrections are edits with ledger entries.
2. **CEE content frozen in place** — the Exam Zone grows around it.
3. **Syllabus order sacred** (`AGENT_RULES.md`) — files map to `syllabus.ts` topics; no
   free-floating notes.
4. **Diagram licensing** — external figures need recorded source/author/license; unlicensed
   material is redrawn as SVG or skipped.
5. **Skeletons must not read as placeholders** — real headings, real table shells, real
   figure slots; the content-scope gate watches placeholder counts.
6. **One interface, three variants** — the corpus currently stamps 2–3 files per topic;
   S1 creates/updates skeletons consistently across variants until the generator is fixed.
7. **Bachelor-readiness** — no hard-coded "Grade 11" structure in the schema; levels are data.

---

*Plan for the platform owner. S1 (all interfaces) is the single next step; note-filling is
a later session per §7. Existing notes are polished in newer versions — simply no removal.*
