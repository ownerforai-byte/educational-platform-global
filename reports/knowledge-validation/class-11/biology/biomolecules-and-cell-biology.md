# Validation Card — Biomolecules and Cell Biology (Class 11 · Biology)

**Unit:** `biomolecules-and-cell-biology` · **Date:** 2026-10-28 · **Reviewer:** Buffy (agent,
web-verified sources) · **Role in plan:** Phase 1 calibration unit (KNOWLEDGE-PLAN.md §7)

**Files covered:** all 11 topic-concept JSONs + 5 unit rail JSONs under
`content/notes/concepts|visuals/rails/class-11/biology/biomolecules-and-cell-biology/`
(3 generator variants per topic, 1 canonical per `plan.json`); shipped tree re-synced via
`npm run content:build` (8 mirrored files updated under `frontend/public/data/syllabus-notes/`).

**Method note (calibration finding):** the fact-bearing arrays (`notes`, `universalFacts`,
`confusion`, `examples`, quiz fields) were extracted and checked claim-by-claim; error-family
greps were run across the whole unit so repeated generator-stamped claims were fixed in every
variant. This claim-surface method — not line-by-line prose reading — is the recommended unit
workflow for the remaining 695 topics.

---

### 1. Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water
- status: **[!] corrected** · date: 2026-10-28 · reviewer: Buffy
- claims checked: 31 · corrected: 5 claim families (18 stamped occurrences) · de-garbled: 2 · expanded: 0
- sources:
  - FDA, *100 Years of Insulin* — https://www.fda.gov/about-fda/fda-history-exhibits/100-years-insulin (tier 1)
  - Quianzon & Cheikh, *History of insulin* (2012) — https://pmc.ncbi.nlm.nih.gov/articles/PMC3714061/ (tier 2)
  - Shepherd et al., *J Physiol* (2019) — https://pmc.ncbi.nlm.nih.gov/articles/PMC6697208/ (tier 2)
  - Yalcin & Cabrales, *Am J Physiol* (2012) — https://pmc.ncbi.nlm.nih.gov/articles/PMC3423161/ (tier 2)
  - ICRP Publication 23 (Reference Man) — https://www.icrp.org/publication.asp?id=ICRP%20Publication%2023 (tier 1)
  - FAO, *Calculation of the Energy Content of Foods* — https://www.fao.org/4/y5022e/y5022e04.htm (tier 1)
  - OpenStax Biology 2e §3.4 Proteins — https://openstax.org/books/biology-2e/pages/3-4-proteins (tier 3)
  - Yuan et al., selenocysteine/pyrrolysine review — https://pmc.ncbi.nlm.nih.gov/articles/PMC2795046/ (tier 2)
  - USGS, *Specific Heat Capacity and Water* — https://www.usgs.gov/water-science-school/science/specific-heat-capacity-and-water (tier 1)
- corrections:
  - claim: "…follow -S- (substrate) specificity." → verdict: **garbled text** → action: de-garbled to "show high substrate specificity" (9 occurrences, 3 files)
  - claim: "A typical human body has roughly the same number of carbon atoms as grains of sand on Earth" → verdict: **WRONG** (folk comparison; false by ~8 orders of magnitude) → action: replaced with "Carbon makes up roughly a fifth of human body mass and forms the covalent backbone of every biomolecule." (source: ICRP Reference Man body-composition data)
  - claim: "Insulin (51 amino acids) was the first recombinant protein made for human medicine (1978)" → verdict: **imprecise** → action: "Human insulin (51 amino acids) was produced by recombinant-DNA technology in 1978 and approved in 1982 — the first approved recombinant-DNA pharmaceutical." (sources: FDA; Quianzon & Cheikh)
  - claim: "Hemoglobin carries about 1.4 g of oxygen per 100 mL of fully saturated blood" → verdict: **WRONG** (unit mix-up: 1.34 is mL O₂ per gram Hb) → action: "Hemoglobin binds about 1.34 mL of oxygen per gram; fully saturated blood carries roughly 20 mL of oxygen per 100 mL." (sources: Shepherd; Yalcin & Cabrales)
  - claim: "polymers of 20 L-amino acids" → verdict: **imprecise** (glycine is achiral) → action: "polymers of 20 standard amino acids (L-forms; glycine is achiral)" (sources: OpenStax; Yuan et al.)
  - claim: garbled confusion entry "❌ skip the key fact → ✅ 1 mole = …" → verdict: **garbled scaffolding** → action: de-garbled to a clean Chemistry-link statement (fact itself was true)
- verified VALID unchanged: Atwater 4/4/9 kcal·g⁻¹ (FAO); A=T (2 H-bonds) / G≡C (3 H-bonds); lipids not true polymers; ribose/deoxyribose C-2 difference; peptide condensation; starch=amylose+amylopectin; cellulose structural; denaturation; water specific heat ≈ 4.18 J·g⁻¹·°C⁻¹ (USGS, "thermostat" kept as metaphor); macrominerals/microminerals lists.
- completeness: all 7 syllabus sub-points (carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes, water) covered; 3 files well above thin threshold.
- naturalness: 2 garbled strings repaired; template filler lines retained (see unit findings).

### 2. Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells
- status: **[!] corrected** · date: 2026-10-28 · reviewer: Buffy
- claims checked: 22 · corrected: 5 (14 occurrences) · de-garbled: 1 · expanded: 0
- sources:
  - LibreTexts (Raven Biology 12e §4.2.1 Prokaryotic Structure) — https://bio.libretexts.org/Bookshelves/Introductory_and_General_Biology/Map%3A_Raven_Biology_12th_Edition/04%3A_Cell_Structure/4.02%3A_Prokaryotic_Cells/4.2.1%3A_Prokaryotic_Structure (tier 3)
  - OpenStax Microbiology §8.3 Cellular Respiration — https://openstax.org/books/microbiology/pages/8-3-cellular-respiration (tier 3)
  - Sapp, *The Prokaryote-Eukaryote Dichotomy: Meanings and Mythology* — https://pmc.ncbi.nlm.nih.gov/articles/PMC1197417/ (tier 2)
  - Historical account of Dougherty — https://pmc.ncbi.nlm.nih.gov/articles/PMC4574257/ (tier 2)
  - Harvard BioNumbers (Bianconi et al. cell count; ostrich egg) — https://bionumbers.hms.harvard.edu/ (tier 2)
  - Sender, Fuchs & Milo, *Cell* (2016) — https://pmc.ncbi.nlm.nih.gov/articles/PMC4991899/ (tier 2)
  - Nakai, ultramicroorganisms review — https://pmc.ncbi.nlm.nih.gov/articles/PMC7308576/ (tier 2)
- corrections:
  - claim: "Instead of mitochondria, plasma membrane possesses mesosomes which are the sites for respiration." → verdict: **OUTDATED** (mesosomes are fixation artifacts) → action: "Prokaryotes lack mitochondria: respiratory electron transport occurs across the plasma membrane (mesosomes, once described as respiratory sites, are now known to be fixation artifacts)."
  - claim: "Dougherty (1957) recognized two types of cellular organization…" (garbled lead-in) → verdict: **imprecise attribution + broken text** → action: rewritten with full attribution (Chatton 1925 coined the terms; Dougherty 1957 proposed the dichotomy; Stanier & van Niel 1962 popularised it) (sources: Sapp; PMC4574257)
  - claim: "The largest cell is the ostrich egg; the smallest living cell is Mycoplasma." → verdict: **overstated** → action: "The largest known cell is the unfertilized ostrich ovum; mycoplasmas are among the smallest known free-living cells (~0.2–0.4 µm)."
  - claim: "Mycoplasma … smallest known living cell (0.1-0.3 µm)" → verdict: **range unreliable** → action: "~0.2–0.4 µm, among the smallest known free-living cells" (source: BioNumbers; Nakai)
  - claim: "A human body contains roughly 3.7×10^13 cells." → verdict: **valid estimate** → action: kept, added "(published estimate; counts vary with body size)" (Bianconi 2013; Sender 2016 ≈3.0×10^13)
  - fragment: "They have following properties: 1." (×5) → verdict: **broken scaffolding** → action: "They have the following properties:"
- verified VALID unchanged: cell theory (Schleiden/Schwann/Virchow); 70S vs 80S ribosomes; prokaryote/eukaryote feature contrast; virus acellular; human ovum ≈0.12 mm visible to naked eye; sperm head ≈5 µm; cell-wall distribution (plants/fungi/bacteria, absent in animals).
- completeness: syllabus sub-points (cell introduction; prokaryotic & eukaryotic concepts) fully covered.
- naturalness: 6 broken/garbled strings repaired.

### 3. Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, ER, Golgi, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions
- status: **[!] corrected** · date: 2026-10-28 · reviewer: Buffy
- claims checked: 19 · corrected: 2 families (24 occurrences incl. quiz question + its answer key) · expanded: 0
- sources:
  - *Cilia/flagella axoneme* review (Cold Spring Harbor Perspect Biol) — https://pmc.ncbi.nlm.nih.gov/articles/PMC5287073/ (tier 2)
  - Review of mammalian cilia — https://pmc.ncbi.nlm.nih.gov/articles/PMC2386530/ (tier 2)
  - De la Fuente et al., ribosome abundance (2013) — https://pmc.ncbi.nlm.nih.gov/articles/PMC3598861/ (tier 2)
  - Encyclopaedia Britannica, *Ribosome* — https://www.britannica.com/science/ribosome (tier 4)
- corrections:
  - claim: "9+9 microtubule axoneme" (notes, confusion, tips, quiz question AND answer option) → verdict: **WRONG** (no such standard arrangement; motile axoneme is 9+2; primary cilia 9+0; centrioles 9+0) → action: blanket correction "9+9" → "9+2" across all 3 topic files + 3 rail files; centriole "9+0" strings untouched
  - claim: "Cell inclusions: … (e.g. oil, glycogen, chromosomes when not nuclear)" → verdict: **WRONG** (chromosomes are not inclusions) → action: "Cell inclusions: storage granules and pigments (e.g. oil droplets, glycogen granules, crystal inclusions)."
- verified VALID unchanged: fluid-mosaic model (Singer & Nicolson 1972); cell wall compositions (cellulose/chitin/peptidoglycan, lignin); mitochondrion (cristae, Krebs+ETS); chloroplast (grana/stroma, Chl a & b); RER/SER split of labour; Golgi packaging + lysosome/cell plate; lysosome autophagy; 80S = 60S+40S; organelle 70S + endosymbiotic origin; nuclear envelope–ER continuity; "liver cell may contain over one million ribosomes" (valid order of magnitude; estimates vary).
- completeness: every organelle named in the syllabus topic string covered, incl. cilia/flagella and cell inclusions.
- naturalness: the wrong "9+2 (9 doublets + central pair)" self-consistent phrasing now correct; one factual cleanup in inclusions line.

### 4. Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances
- status: **[!] corrected** · date: 2026-10-28 · reviewer: Buffy
- claims checked: 24 · corrected: 3 families (9 occurrences) · expanded: 0
- sources:
  - OpenStax Biology 2e §11.1 Meiosis — https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis (tier 3)
  - University of Minnesota *Human Biology* 2e §5.2 — https://open.lib.umn.edu/humanbiology2e/chapter/5-2-meiosis/ (tier 3)
  - Oregon State Cell Biology — cell-cycle checkpoints — https://open.oregonstate.education/cellbiology/chapter/cell-cycle-and-mitosis/ (tier 3)
  - MedlinePlus Genetics, TP53 — https://medlineplus.gov/genetics/gene/tp53/ (tier 1)
  - CDC, *Down syndrome and its types* — https://www.cdc.gov/birth-defects/about/down-syndrome.html (tier 1)
  - Trisomy 21 / nondisjunction review (2023) — https://pmc.ncbi.nlm.nih.gov/articles/PMC10183086/ (tier 2)
  - Hepatocyte polyploidization & cytokinesis failure review — https://pmc.ncbi.nlm.nih.gov/articles/PMC3485502/ (tier 2)
- corrections:
  - claim: "Oogenesis … → 1 ovum (n) + 3 polar bodies" → verdict: **oversimplified** (usually 2–3; meiosis II completes only on fertilization) → action: "1 functional ovum (n) + usually 2–3 polar bodies (meiosis II completes only if fertilization occurs)"
  - claim: "Down syndrome = trisomy 21 / results from trisomy-21 non-disjunction" → verdict: **too absolute** (~95% full trisomy 21; translocation & mosaic forms exist) → action: qualified "usually … (~95% of cases; translocation and mosaic forms also occur)" (sources: CDC; 2023 review)
  - claim: "Amitosis … rare (liver cells, some fungi, regenerating tissues)" → verdict: **outdated example** (binucleate hepatocytes more often arise by cytokinesis failure) → action: reworded to "direct splitting of nucleus and cytoplasm without a spindle; rare — described in some protozoans, yeasts/some fungi and certain pathological or regenerating cells"
- verified VALID unchanged: interphase ≈90% + G1/S, G2/M, M checkpoints (p53 link kept); PMAT mechanics; cytokinesis furrow vs cell plate; meiosis I reductional / meiosis II equational; no S phase between divisions; crossing over (Prophase I, non-sister chromatids) + independent assortment (Metaphase I); mitosis 2n→2n vs meiosis 2n→n; non-disjunction mechanism; spermatogenesis 1→4.
- completeness: cell cycle, all three division types and significances covered across 3 files.
- naturalness: no garbled strings; duplicate stamped universalFacts left as-is (template finding).

---

## Unit findings (systemic — escalated, not hand-fixed)

1. **Template filler lines** ("Worked: identify given → …", "answer pattern for …", "Example of X in nature", duplicated universalFacts) are generator-stamped corpus-wide and currently suppressed at the serving layer ("filler counted, not served"). Needs a generator-level cleanup decision — per-file deletion is whack-a-mole and risks test-count drift.
2. **Mesosome error outside this unit:** `introductory-microbiology` (2 concept files, 2 rails, 1 mindmap) still teach mesosomes as functional respiratory structures — queued for that unit's own pass with the same verified correction.
3. **Cross-subject filler leakage:** IUPAC nomenclature text inside `floral-diversity`, a magnetic-force formula inside `ecology` — queued as findings for those units.
4. **3 generator variants per topic** share stamped claims; fixes must be applied to all variants (done here) until the generator emits a single canonical file per topic.

## QA run after repairs
`npm run content:build` (mirror sync: 8 files) · `npm run content:build:check` · `npm run check:content` · `npm run audit:visuals` — see ledger for results.
