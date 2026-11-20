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
| 5 | Floral Diversity (30) | Three domains, binomial nomenclature, five kingdoms | `01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system-mone.json` | **Completed** |
| 6 | Floral Diversity | Status of flora in Nepal | `02-status-of-flora-in-nepal-and-world-representation.json` | **Completed** |
| 7 | Floral Diversity | Fungi: phycomycetes → deuteromycetes | `03-fungi-general-introduction-and-characteristic-features-of-phycomycetes-ascomycetes-basidiomycetes-and-deuteromycetes.json` | **Completed** |
| 8 | Floral Diversity | Mucor and Yeast | `04-structure-and-reproduction-of-mucor-and-yeast.json` | **Completed** |
| 9 | Floral Diversity | Mushrooms; economic importance of fungi | `05-introduction-of-mushrooms-poisonous-and-non-poisonous-mushrooms-economic-importance-of-fungi.json` | **Completed** |
| 10 | Floral Diversity | Lichen | `06-lichen-general-introduction-characteristic-features-and-economic-importance-of-lichen.json` | **Completed** |
| 11 | Floral Diversity | Algae (green/brown/red); Spirogyra | `07-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spiro.json` | **Completed** |
| 12 | Floral Diversity | Bryophyta; Marchantia | `08-bryophyta-general-introduction-and-characteristic-features-of-liverworts-hornworts-and-moss-morphological-str.json` | **Completed** |
| 13 | Floral Diversity | Pteridophyta; Dryopteris | `09-pteridophyta-general-introduction-and-characteristic-features-of-pteridophytes-morphological-structure-and-r.json` | **Completed** |
| 14 | Floral Diversity | Gymnosperm; Pinus | `10-gymnosperm-general-introduction-and-characteristic-features-of-gymnosperms-morphology-and-reproduction-of-pi.json` | **Completed** |
| 15 | Floral Diversity | Angiosperm morphology | `11-angiosperm-morphology-of-root-stem-leaves-inflorescences-flowers-and-fruit.json` | **Completed** |
| 16 | Floral Diversity | Taxonomic study | `12-taxonomic-study-definition-taxonomic-hierarchy-classification-systems-artificial-natural-and-phylogenetic-o.json` | **Completed** |
| 17 | Floral Diversity | Angiosperm families | `13-angiosperm-families-with-economic-importance-brassicaceae-fabaceae-solanaceae-and-liliaceae.json` | **Completed** |
| 18 | Introductory Microbiology (5) | Monera: bacteria, cyanobacteria | `01-monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyano.json` | **Completed** |
| 19 | Introductory Microbiology | Virus, bacteriophage | `02-virus-general-introduction-structure-and-importance-of-virus-bacteriophage.json` | **Completed** |
| 20 | Introductory Microbiology | Biotechnology impacts in microbiology | `02-impacts-of-biotechnology-in-the-field-of-microbiology.json` | **Completed** |
| 21 | Ecology (11) | Ecosystem ecology; species interactions | `01-ecosystem-ecology.json` | Not started |
| 22 | Ecology | Pond and forest ecosystem | `01-ecosystem-ecology.json` (merged) | **Completed** |
| 23 | Ecology | Food chain, food web, pyramids, productivity | `02-food-chain-web.json` | **Completed** |
| 24 | Ecology | Carbon and nitrogen cycles; succession | `03-biogeochemical-cycles.json` | **Completed** |
| 25 | Ecology | Hydrophytes and xerophytes | `04-ecological-adaptation.json` | **Completed** |
| 26 | Ecology | Ecological imbalances | `05-ecological-imbalances.json` | **Completed** |
| 27 | Vegetation (3) | Vegetation types in Nepal | `01-vegetation-types.json` | Not started |
| 28 | Vegetation | In-situ and ex-situ conservation | `02-conservation-in-situ-ex-situ.json` | **Completed** |
| 29 | Vegetation | Vegetation and human activities | `02-conservation-in-situ-ex-situ.json` (merged) | **Completed** |
| 30 | Introduction to Biology (2) | Scope and fields of biology | `01-scope-fields-biology.json` | Not started |
| 31 | Introduction to Biology | Relation with other sciences | `02-relation-other-sciences.json` | **Completed** |
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
- Session 2 — Unit 2, Topics 5–6 (Three domains/binomial nomenclature/five kingdoms; Status of flora in Nepal) upgraded. Canonical files resolved via the manifest matcher: Floral Diversity topics 5–17 map to full-syllabus-slug files `01-…` to `13-…` (not the short dup-2 files).
- Next: Unit 2 Floral Diversity (13 topics) — verify each topic's canonical file via the manifest matcher before editing.
- Session 3 — Unit 2, Topics 7–17 (Fungi; Mucor/Yeast; Mushrooms; Lichen; Algae/Spirogyra; Bryophyta/Marchantia; Pteridophyta/Dryopteris; Gymnosperm/Pinus; Angiosperm morphology; Taxonomic study; Angiosperm families) upgraded. Unit 2 complete. Verified PYQs used: 2024 fungi (2m), 2024 algae classes (3m), 2024 gymnosperm vs angiosperm (3m), 2021 bryophytes-amphibians (2m), 2022+2024 Bryophyta characteristics (3m), 2024 Pteridophyta characteristics (3m), 2022 dicot vs monocot (2m). All other practice questions labelled NEB-style. Build (134 entries) + validate-content (4627 files, 0 broken) passed.
- Next: Unit 3 Introductory Microbiology (3 topics) — resolve canonical files via the manifest matcher first.
- Session 4 — Unit 3 Introductory Microbiology (Topics 18–20: Monera/bacteria; Virus/bacteriophage; Biotechnology impacts) upgraded. Verified PYQs used: 2023+2024 bacteria characteristics (3m), 2024 Gram staining (3m), 2024 cyanobacteria N-fixation (3m), 2024 microbial economics (2m), 2022 T2 phage structure/reproduction (3m), 2024 borderline-of-life (3m), 2024 lytic cycle (4m). Canonical files: unit 3 maps to full-slug files 01-monera-general-introduction…, 02-virus-general-introduction…, 02-impacts-of-biotechnology… (dup short files 01-monera-bacteria, 02-virus, 03-biotech-microbiology are NOT canonical). Remaining-unit canonical mapping resolved for ecology, vegetation, introduction-to-biology, evolutionary-biology, faunal-diversity, biota-and-environment, conservation-biology (matcher replicated standalone: filename/topicSlug match + lowest duplicateType wins).
- Next: Unit 4 Ecology (6 topics) — canonical files 01-ecosystem-ecology…, 02-food-chain-food-web…, 02-concept-of-ecosystem…, 04-biogeochemical-cycles…, 04-ecological-adaptation…, 06-ecological-imbalances….
- Session 5 — Unit 4 Ecology (Topics 21–26: concept/biotic-abiotic/interactions; food chain-web-pyramids-productivity; ecosystem structure pond/forest; biogeochemical cycles + succession; ecological adaptation hydrophytes/xerophytes; ecological imbalances + eutrophication) upgraded. Verified PYQs used: 2024 interactions (3m), 2024 food chain vs web + 10% law (3m), 2024 energy pyramid upright (3m), 2023 numbers vs biomass inversion (2m), 2022 NPP numerical (3m), 2023+2024 ecosystem structure 5m, 2022+2024 succession/xerosere (3m), 2024 eutrophication (3m).
- Next: Unit 5 Vegetation (3 topics) — canonical files 01-vegetation-introduction…, 02-in-situ-protected-areas…, 03-natural-environment-vegetation-and-human-activities.
- Session 6 — Unit 5 Vegetation (Topics 27–29: vegetation zones of Nepal; in-situ/ex-situ conservation; natural environment-vegetation-human activities) upgraded. Verified PYQs used: 2023 zones 5m, 2024 zones 3m + deciduous vs evergreen 3m + sal 2m + deforestation 2m + community forestry 3m + in-situ vs ex-situ 3m, 2022 Terai/Bhabar 3m, 2021 conifer vs broad-leaved 2m.
- Next: Unit 6 Introduction to Biology (2 topics) — canonical files 01-introduction-to-biology-scope-and-fields-of-biology, 02-relation-of-biology-with-other-sciences.
- Session 7 — Unit 6 Introduction to Biology (Topics 30–31: scope and fields of biology; relation with other sciences + biological method) upgraded. Verified PYQs used: 2021 five branches 3m, 2023 basic vs applied 2m, 2024 four branches 2m, 2022 method 5m, 2024 method 2m.
- Next: Unit 7 Evolutionary Biology (7 topics) — canonical files 01-life-and-its-origin…, 02-evidences-of-evolution…, 03-theories-of-evolution…, 04-human-evolution-position-of-man-in-animal-kingdom, 05-differences-between-new-world-monkeys…, 06-evolution-of-modern-man….
