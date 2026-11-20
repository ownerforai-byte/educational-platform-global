# NEB Grade 11 Biology — Conceptual Mastery Notes Plan

> Working plan and progress tracker for upgrading every Class 11 Biology topic note
> from surface-level summaries to full conceptual-mastery notes (deep explanations,
> classification tables, comparison tables, processes, examples, PYQs, mastery checks).

## Source of truth

- Syllabus order and topic list: `frontend/lib/core/syllabus.ts` (NEB Biology XI, Bio. 201 — 10 units, 58 topics).
- **Canonical note files — verified rule:** the file the topic page serves is chosen by
  `noteMatchesTopic` (`frontend/lib/note-topic-match.ts`) + `selectCanonicalNoteEntry`
  (lowest `duplicateType`, missing counts as 1). In practice the **full-syllabus-slug
  filename wins** even when a short-slug `duplicateType: 2` file exists. Always verify
  with the manifest before editing (`frontend/public/data/syllabus-notes/<subject>/_manifest.json`).
- Render pipeline: notes strings render as full markdown (headings, GFM tables, `$math$`) via `MathMarkdown`.
- After editing any note JSON run: `npx tsx frontend/scripts/content/build.ts biology` then `npm run check`.

## Per-topic structure (the mastery template)

Every upgraded topic note fills the note JSON with:

1. `notes[]` — ordered markdown sections: Topic introduction → Fundamental conceptual
   understanding → Scientific definitions & terminology → Detailed explanation of every
   subtopic (with classification tables, comparison tables, step-by-step processes) →
   Conceptual relationships → Exam orientation.
2. `confusion[]` — common conceptual confusions and frequently misunderstood points.
3. `keyPoints[]`, `importantConcepts[]`, `importantStatements[]`, `importantNotes[]`,
   `specialNotes[]` — distilled mastery content.
4. `examples[]`, `universalFacts[]` — classified, explained examples and facts.
5. `practiceQuestions[]` — short-answer, long-answer, conceptual and application questions
   **with full model answers**.
6. `mcs[]` + top-level `mcqs[]` — MCQs with explanations.
7. `examShortTricks[]`, `examNotes[]`, `formulas[]`, `summary`.
8. PYQ tables inside `notes[]` use only questions from the authored solved-paper bank
   (`content/practice/questions/class-11/biology/**`) — never fabricated years or wording.

## Syllabus roadmap (58 topics, official NEB order)

| # | Unit (hours) | Topic | Canonical file | Status |
|---|---|---|---|---|
| 1 | Biomolecules and Cell Biology (15) | Biomolecules: introduction and functions | `01-biomolecules-introduction-and-functions-of-carbohydrates-proteins-lipids-nucleic-acids-minerals-.json` | **Completed** |
| 2 | Biomolecules and Cell Biology | Cell: introduction, prokaryotic vs eukaryotic | `02-cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells.json` | **Completed** |
| 3 | Biomolecules and Cell Biology | Detail structure of eukaryotic cells | `03-detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r.json` | **Completed** |
| 4 | Biomolecules and Cell Biology | Cell division (cell cycle, amitosis, mitosis, meiosis) | `04-cell-division-concept-of-cell-cycle-types-of-cell-division-and-significances.json` | **Completed** |
| 5 | Floral Diversity (30) | Three domains, binomial nomenclature, five kingdoms | `01-life-classification.json` | Not started |
| 6 | Floral Diversity | Status of flora in Nepal | `02-fungi.json` (merged) | Not started |
| 7 | Floral Diversity | Fungi: phycomycetes → deuteromycetes | `02-fungi-general-introduction-and-characteristic-features.json` | Not started |
| 8 | Floral Diversity | Mucor and Yeast | `02-fungi.json` (merged) | Not started |
| 9 | Floral Diversity | Mushrooms; economic importance of fungi | `02-fungi.json` (merged) | Not started |
| 10 | Floral Diversity | Lichen | `03-algae.json` (merged) | Not started |
| 11 | Floral Diversity | Algae (green/brown/red); Spirogyra | `03-algae.json` | Not started |
| 12 | Floral Diversity | Bryophyta; Marchantia | `04-bryophytes.json` | Not started |
| 13 | Floral Diversity | Pteridophyta; Dryopteris | `05-pteridophytes.json` | Not started |
| 14 | Floral Diversity | Gymnosperm; Pinus | `06-gymnosperms.json` | Not started |
| 15 | Floral Diversity | Angiosperm morphology | `07-angiosperm-morphology-and-taxonomic-study.json` | Not started |
| 16 | Floral Diversity | Taxonomic study | `07-angiosperm-morphology-and-taxonomic-study.json` | Not started |
| 17 | Floral Diversity | Angiosperm families (Brassicaceae, Fabaceae, Solanaceae, Liliaceae) | `07-angiosperm-morphology-and-taxonomic-study.json` | Not started |
| 18 | Introductory Microbiology (5) | Monera: bacteria, cyanobacteria | `01-monera-bacteria.json` | Not started |
| 19 | Introductory Microbiology | Virus, bacteriophage | `02-virus.json` | Not started |
| 20 | Introductory Microbiology | Biotechnology impacts in microbiology | `03-biotech-microbiology.json` | Not started |
| 21 | Ecology (11) | Ecosystem ecology; species interactions | `01-ecosystem-ecology.json` | Not started |
| 22 | Ecology | Pond and forest ecosystem | `01-ecosystem-ecology.json` (merged) | Not started |
| 23 | Ecology | Food chain, food web, pyramids, productivity | `02-food-chain-web.json` | Not started |
| 24 | Ecology | Carbon and nitrogen cycles; succession | `03-biogeochemical-cycles.json` | Not started |
| 25 | Ecology | Hydrophytes and xerophytes | `04-ecological-adaptation.json` | Not started |
| 26 | Ecology | Ecological imbalances | `05-ecological-imbalances.json` | Not started |
| 27 | Vegetation (3) | Vegetation types in Nepal | `01-vegetation-types.json` | Not started |
| 28 | Vegetation | In-situ and ex-situ conservation | `02-conservation-in-situ-ex-situ.json` | Not started |
| 29 | Vegetation | Vegetation and human activities | `02-conservation-in-situ-ex-situ.json` (merged) | Not started |
| 30 | Introduction to Biology (2) | Scope and fields of biology | `01-scope-fields-biology.json` | Not started |
| 31 | Introduction to Biology | Relation with other sciences | `02-relation-other-sciences.json` | Not started |
| 32 | Evolutionary Biology (15) | Origin of life; Oparin-Haldane; Miller-Urey | `01-origin-life.json` | Not started |
| 33 | Evolutionary Biology | Evidences of evolution | `02-evidences-evolution.json` | Not started |
| 34 | Evolutionary Biology | Lamarckism, Darwinism, Neo-Darwinism | `03-theories-evolution.json` | Not started |
| 35 | Evolutionary Biology | Human evolution; position of man | `04-human-evolution.json` | Not started |
| 36 | Evolutionary Biology | New vs old world monkeys, apes, man | `04-human-evolution.json` (merged) | Not started |
| 37 | Evolutionary Biology | Evolution of modern man | `04-human-evolution.json` (merged) | Not started |
| 38 | Faunal Diversity (34) | Protista; Protozoa classification | `01-protista-protozoa.json` | Not started |
| 39 | Faunal Diversity | Paramecium and Plasmodium | `01-protista-protozoa.json` (merged) | Not started |
| 40 | Faunal Diversity | Economic importance of P. falciparum | `01-protista-protozoa.json` (merged) | Not started |
| 41 | Faunal Diversity | Animalia: organization, symmetry, body plans | `02-animalia-phyla.json` | Not started |
| 42 | Faunal Diversity | Phyla classification (Porifera → Chordata) | `02-animalia-phyla.json` (merged) | Not started |
| 43 | Faunal Diversity | Earthworm: external + digestive | `03-earthworm.json` | Not started |
| 44 | Faunal Diversity | Earthworm: excretory, nervous, reproductive | `04-earthworm-excretory-nervous-and-reproductive-systems.json` | Not started |
| 45 | Faunal Diversity | Frog: external + digestive | `05-frog-habit-and-habitat-external-features.json` | Not started |
| 46 | Faunal Diversity | Frog: circulatory + respiratory | `06-frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration.json` | Not started |
| 47 | Faunal Diversity | Frog: reproductive system | `04-frog.json` (merged) | Not started |
| 48 | Biota and Environment (10) | Animal adaptation | `01-animal-adaptation-aquatic-terrestrial-and-volant-adaptation.json` | Not started |
| 49 | Biota and Environment | Animal behaviour; fish and bird migration | `02-animal-behavior.json` | Not started |
| 50 | Biota and Environment | Environmental pollution | `03-environmental-pollution.json` | Not started |
| 51 | Biota and Environment | Pesticides and their effects | `03-environmental-pollution.json` (merged) | Not started |
| 52 | Conservation Biology (3) | Biodiversity concept and conservation | `01-biodiversity-conservation.json` | Not started |
| 53 | Conservation Biology | Protected areas, hotspots, Ramsar | `02-protected-areas.json` | Not started |
| 54 | Conservation Biology | Wildlife; IUCN categories; endangered species of Nepal | `02-protected-areas.json` (merged) | Not started |
| 55 | Conservation Biology | Endangered species in Nepal | `02-protected-areas.json` (merged) | Not started |

*(Rows 6/8/9, 10, 22, 29, 36/37, 39/40, 47, 51, 54/55 are syllabus topics served by merged
canonical files — their upgrade must cover every mapped syllabus topic.)*

## Progress log

- Session 1 — Unit 1, Topics 1–4 (Biomolecules, Cell introduction, Eukaryotic cell structure, Cell division) upgraded to mastery depth. Unit 1 complete (4/4 topics).
- Lesson learned: canonical files are the full-syllabus-slug ones (d1/missing), not the short dup-2 files; Topics 1–2 content was transferred to the canonical files and the dup-2 files restored.
- Next: Unit 2 Floral Diversity (13 topics) — verify each topic's canonical file via the manifest matcher before editing.
