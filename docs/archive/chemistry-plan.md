# ⚗️ CHEMISTRY NOTES REBUILD — Master Plan (book-grade)

> **Mission:** raise the Chemistry notes from their current ~3–4% of textbook depth to
> **book-grade, visionary notes** — every topic of every NEB Chemistry unit (**28 units ·
> 188 topics**: Class 11 = 17 units/140 topics, Class 12 = 11 units/48 topics) gets a proper
> introduction, strict hierarchy, **reaction & mechanism blocks**, classified tables with
> examples, structure galleries, solved numericals, and rich English diagrams.
>
> - **Benchmark books:** *Pioneer Chemistry* (A.D. Mishra et al., Dreamland Publication) ·
>   *Pioneer Practical Chemistry* · NEB/CDC Chemistry textbook.
> - **Golden rules:** ① **Simply no removal** — existing notes upgraded in place.
>   ② **All existing CEE / entrance-exam content stays**; new material grows an Exam Zone
>   around it. ③ Order owned by `frontend/lib/syllabus.ts`. ④ Facts valid & sourced —
>   IUPAC nomenclature (Gold/Red/Blue Books), constants (NIST), reaction conditions verified
>   (KNOWLEDGE-PLAN.md §8.2: reaction conditions are the most-wrong facts in chemistry notes).
> - **Method home:** shared method/licensing in [biology-plan.md](biology-plan.md) §3/§7.
> - **Sequencing:** interfaces (all 188 skeletons) first; filling in later sessions.

---

## 0. The gap

Today's Chemistry notes name reactions; *Pioneer Chemistry* **shows** them — conditions,
mechanism arrows, structures, exceptions, and problems. A topic is done when a student can
**name (IUPAC), draw (structure), write (equation), explain (mechanism) and solve (numerical)**.

## 1. Scope
Class 11 (17 units, 140 topics) in syllabus order first, then Class 12 (11 units, 48 topics).
Bachelor-ready architecture (levels are data).

## 2. Benchmarks & sources

| Source | Role |
|---|---|
| `frontend/lib/syllabus.ts` | topic skeleton + order |
| *Pioneer Chemistry* (Mishra et al., Dreamland) | depth & format benchmark |
| NEB/CDC Chemistry textbook | curriculum wording, prescribed experiments |
| IUPAC Gold/Red/Blue Books · NIST WebBook | nomenclature, terms, constants (validity) |
| Google/Wikimedia/open textbooks | diagram intake (license-checked, English labels) |

## 3. The Note Interface v2 — Chemistry

| # | Block | Standard | Schema home |
|---|---|---|---|
| I | **Introduction** | 150–300 words: chemical picture, everyday/Nepal hook (cement, urea, fermentation), learning outcomes | `notes` heading + prose |
| II | **Concepts & definitions** | strict H2→H4; every definition exam-safe; every formula with its **validity condition** (e.g., ideal-gas assumption) | `notes`, `keyPoints` |
| III | **Reaction & equation block** (flagship) | table: reaction → reactants → **conditions (T, P, catalyst)** → products → observation → notes; equations balanced; state symbols | markdown table + `importantStatements` |
| IV | **Mechanism block** (organic) | numbered curved-arrow steps as SVG + step-by-step text (initiation/propagation/termination where relevant) | `blocks`/`figures` |
| V | **IUPAC nomenclature box** | rule → worked example → common name → trap; **structures drawn for every named compound** | `notes`, `confusion` |
| VI | **Solved problems** | ≥ 5 numericals on physical-chemistry topics (mole concept, concentration, pH, colligative, kinetics, electrochem): Given → Formula → Substitution → Answer with units | `numericals`, `examples` |
| VII | **Diagrams** | ≥ 4 per topic (§3.2) | `figures`/`blocks` + visuals registry |
| VIII | **Exam Zone** | named reactions + conversions + "distinguish between" pairs + organic reagents table + **existing CEE lines preserved** + new MCQs (`mcs`) | `mcs`, `practiceQuestions`, `examNotes` |
| IX | **Summary & self-check** | reaction map of the topic, common mistakes (e.g., Markovnikov traps), self-check | `summary`, `confusion`, `practice` |

### 3.1 Table standard
Classification table (family → general formula → example → use) · periodic-trends table
(property → trend → exception) · **reaction table with conditions column (mandatory)** ·
reagent/oxidizing-agent table · physical-constants table · distinguish-between table
(test → X → Y). Every table captioned, ≤ 12 rows, examples mandatory.

### 3.2 Diagram standard
- **A — Authored SVG (≥ 2/topic):** bond-line structures, orbital/hybridization diagrams,
  VSEPR shape gallery, apparatus (Haber tower, Contact plant, electrochemical cell),
  mechanism arrows, phase/graph plots (rate curves, titration curves). 900×640, English labels.
- **B — Curated Google/external (≥ 2/topic):** license-checked, English labels, most
  detailed available; source/author/license recorded (biology-plan.md §3.4 pipeline).

## 4. Book-Grade Bar (Chemistry)
Per topic: **≥ 8 sections · every reaction with conditions + example · structures for every
named compound · ≥ 5 solved numericals on physical-chemistry topics · ≥ 4 diagrams (2 SVG +
2 curated) · nomenclature boxes wherever organic naming occurs · ≥ 10 MCQs (CEE preserved)
+ conversion/distinguish sets · summary + reaction map.** Reaction conditions verified
against references, not remembered.

## 5. Polish track (newer version, no removal)
Additive v2; CEE lines frozen; de-garble (the corpus contains cross-subject filler leaks —
e.g. IUPAC text inside biology files gets routed home, not deleted); merge duplicate stamped
lines (originals kept as "extra points"); every corrected condition logged in the validity ledger.

## 6. Per-unit blueprints (28 units)

### Class 11 (17 units, 140 topics)

| Unit | h | Must produce |
|---|---:|---|
| Foundation and Fundamentals | 2 | branches-of-chemistry table, laws of chemical combination worked set, symbols/units table |
| Stoichiometry | 8 | **mole-concept map SVG**, formula table (n, m, M, V, NA), limiting-reagent/percent-yield worked ladder, empirical-formula table |
| Atomic Structure | 9 | quantum-numbers table, orbital-shapes SVG gallery, spectra-series table + Bohr derivations, photoelectric link |
| Classification of Elements & Periodic Table | 5 | long-form periodic table SVG, **periodic-trends table + graphs** (IE, EA, radius), s/p/d/f block table |
| Chemical Bonding & Shapes of Molecules | 11 | VSEPR **shape gallery SVG + table**, hybridization table, MOT diagrams, H-bond/van der Waals comparison, bond-energy table |
| Oxidation and Reduction | 5 | oxidation-number rules table, balancing-methods table (half-reaction), redox titration numericals |
| States of Matter | 9 | gas-laws table, kinetic-theory derivations, liquid/solid property tables, phase diagram SVG |
| Chemical Equilibrium | 5 | Le-Chatelier applications table, Kc/Kp derivations, pH-scale SVG, buffer table |
| Chemistry of Non-metals | 22 | **the unit's heart:** per-family tables (hydrogen, oxygen, nitrogen, halogens, noble gases, carbon) — occurrence/properties/preparation/uses; **Haber + Contact + lead-chamber process flow SVGs with conditions**; allotrope structures SVG |
| Chemistry of Metals | 12 | **metallurgy flow-chart SVG** (ore → concentrate → extraction), alkali/alkaline-earth comparison table, transition-metal property tables, alloy table |
| Bio-inorganic Chemistry | 5 | haemoglobin/chlorophyll/vitamin-B₁₂ metal-center table, biological role of ions table |
| Basic Concept of Organic Chemistry | 7 | **IUPAC rules ladder + naming worked set**, isomerism decision-tree SVG, functional-group table with structures |
| Fundamental Principles of Organic Chemistry | 9 | effects table (inductive/resonance/hyperconjugation) with stability order, intermediate stability table, arrow-pushing conventions |
| Hydrocarbons | 9 | alkane/alkene/alkyne **prep + properties tables**, mechanism SVGs (Markovnikov, peroxide effect), conformations SVG |
| Aromatic Hydrocarbons | 8 | benzene structure/resonance SVG, electrophilic-substitution mechanism set, Huckel rule table, directive-effects table |
| Fundamentals of Applied Chemistry | 6 | industry tables (cement, glass, paper, soap, polymers) — raw material/process/product, pollution link |
| Modern Chemical Manufactures | 11 | **Haber/Contact/Solvay/Bayer flow SVGs with conditions tables**, fertilizer/plastic/drug manufacture tables |

### Class 12 (11 units, 48 topics)

| Unit | h | Must produce |
|---|---:|---|
| Solutions | 5 | concentration-units table, colligative-property table + worked numericals, Raoult graphs SVG, van't-Hoff factor table |
| Electrochemistry | 7 | cell-representation table, Nernst derivations, conductance tables, electrolysis/Faraday numericals, battery/fuel-cell table |
| Chemical Kinetics | 5 | rate-law tables, order/ molecularity comparison, **concentration-time graphs SVG**, Arrhenius numericals |
| General & Fundamental Principles of Organic | 5 | named-reactions master table, reagent table, mechanism refresh set |
| Hydrocarbons | 4 | alkene/alkyne/aromatic mechanism deep set, industrial-source table |
| Alcohols, Phenols and Ethers | 7 | prep+properties tables, **distinguish-tests table**, Williamson synthesis mechanism, structure gallery |
| Aldehydes, Ketones & Carboxylic Acids | 10 | **tests table (2,4-DNP, Tollen, Fehling, iodoform)** with structures, nucleophilic-addition mechanism, acidity trends table |
| Amines | 4 | classification table, diazotization flow SVG, basicity-order table |
| Biomolecules | 5 | structure tables (carbs/proteins/lipids/nucleic acids) with linkage column, test tables, enzyme table |
| Chemistry in Everyday Life | 3 | drug-classification table, food-additive/polymer table with examples |
| Chemistry of Element | 4 | d-block trends table, lanthanide contraction table, complex-compound nomenclature box |

## 7. Interfaces-first roadmap
**S1 (next):** all 188 skeletons (blocks I–IX, reaction/numerical/table shells, figure slots,
CEE lines seeded) → schema + `check:content` + no-placeholder gates. **S2+:** one unit per
session; Chemistry of Non-metals (22) and Chemical Bonding (11) get two sessions each.
Parallel polish. Final: `npm run check:all` + coverage report.

## 8. Quality gates
`npm run check:schema` · `npm run check:content` · `content:build:check` · `audit:scopes` ·
`audit:visuals` · no-removal diff review · **reaction-conditions spot-audit** (every T/P/
catalyst checked against a reference) per unit.

## 9. Tracking checklist

> `node scripts/subject-plan-inventory.mjs chemistry` regenerates this. Legend: **I** =
> interface · **N** = filled to bar · **D** = diagrams placed · **P** = polished.

<!-- CHEMISTRY-PLAN:TOPICS:START -->

> Regenerated by `node scripts/subject-plan-inventory.mjs chemistry` from `frontend/lib/syllabus.ts`.
> Coverage: **28 units · 188 topics** (Class 11: 17 units, 140 topics; Class 12: 11 units, 48 topics).

## Class 11

### `foundation-and-fundamentals` — Foundation and Fundamentals (4 topics · 2h)

- [x] I · [x] N · [x] D · [ ] P — **General introduction of chemistry**
- [x] I · [x] N · [x] D · [ ] P — **Importance and scope of chemistry**
- [x] I · [x] N · [x] D · [ ] P — **Basic concepts of chemistry: atoms, molecules, relative masses of atoms and molecules, atomic mass unit (amu), radicals, molecular formula, empirical formula**
- [x] I · [x] N · [x] D · [ ] P — **Percentage composition from molecular formula**

### `stoichiometry` — Stoichiometry (8 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Dalton's atomic theory and its postulates**
- [x] I · [ ] N · [ ] D · [ ] P — **Laws of stoichiometry**
- [x] I · [ ] N · [ ] D · [ ] P — **Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles**
- [x] I · [ ] N · [ ] D · [ ] P — **Mole and its relation with mass, volume and number of particles**
- [x] I · [ ] N · [ ] D · [ ] P — **Calculations based on mole concept**
- [x] I · [ ] N · [ ] D · [ ] P — **Limiting reactant and excess reactant**
- [x] I · [ ] N · [ ] D · [ ] P — **Theoretical yield, experimental yield and % yield**
- [x] I · [ ] N · [ ] D · [ ] P — **Calculation of empirical and molecular formula from % composition (solving related numerical problems)**

### `atomic-structure` — Atomic Structure (9 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Rutherford's atomic model and its limitations**
- [x] I · [ ] N · [ ] D · [ ] P — **Postulates of Bohr's atomic model and its application**
- [x] I · [ ] N · [ ] D · [ ] P — **Spectrum of hydrogen atom**
- [x] I · [ ] N · [ ] D · [ ] P — **Defects of Bohr's theory**
- [x] I · [ ] N · [ ] D · [ ] P — **Elementary idea of quantum mechanical model: de Broglie's wave equation**
- [x] I · [ ] N · [ ] D · [ ] P — **Heisenberg's Uncertainty Principle and concept of probability**
- [x] I · [ ] N · [ ] D · [ ] P — **Quantum numbers**
- [x] I · [ ] N · [ ] D · [ ] P — **Orbitals and shape of s and p orbitals only**
- [x] I · [ ] N · [ ] D · [ ] P — **Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)**

### `classification-of-elements-and-periodic-table` — Classification of Elements and Periodic Table (5 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Modern periodic law and modern periodic table**
- [x] I · [ ] N · [ ] D · [ ] P — **Classification of elements into different groups, periods and blocks**
- [x] I · [ ] N · [ ] D · [ ] P — **IUPAC classification of elements**
- [x] I · [ ] N · [ ] D · [ ] P — **Nuclear charge and effective nuclear charge**
- [x] I · [ ] N · [ ] D · [ ] P — **Periodic trend and periodicity: atomic radii, ionic radii, ionization energy, electron affinity, electronegativity, metallic characters (general trend and explanation only)**

### `chemical-bonding-and-shapes-of-molecules` — Chemical Bonding and Shapes of Molecules (11 topics · 9h)

- [x] I · [ ] N · [ ] D · [ ] P — **Valence shell, valence electron and octet theory**
- [x] I · [ ] N · [ ] D · [ ] P — **Ionic bond and its properties**
- [x] I · [ ] N · [ ] D · [ ] P — **Covalent bond and coordinate covalent bond; properties of covalent compounds**
- [x] I · [ ] N · [ ] D · [ ] P — **Lewis dot structure of some common compounds of s and p block elements**
- [x] I · [ ] N · [ ] D · [ ] P — **Resonance**
- [x] I · [ ] N · [ ] D · [ ] P — **VSEPR theory and shapes of simple molecules (BeF2, BF3, CH4, CH3Cl, PCl5, SF6, H2O, NH3, CO2, H2S, PH3)**
- [x] I · [ ] N · [ ] D · [ ] P — **Elementary idea of Valence Bond Theory**
- [x] I · [ ] N · [ ] D · [ ] P — **Hybridization involving s and p orbitals only**
- [x] I · [ ] N · [ ] D · [ ] P — **Bond characteristics: bond length, ionic character, dipole moment**
- [x] I · [ ] N · [ ] D · [ ] P — **Vander Waal's force and molecular solids; hydrogen bonding and its application**
- [x] I · [ ] N · [ ] D · [ ] P — **Metallic bonding and properties of metallic solids**

### `oxidation-and-reduction` — Oxidation and Reduction (5 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **General and electronic concept of oxidation and reduction**
- [x] I · [ ] N · [ ] D · [ ] P — **Oxidation number and rules for assigning oxidation number**
- [x] I · [ ] N · [ ] D · [ ] P — **Balancing redox reactions by oxidation number and ion-electron (half reaction) method**
- [x] I · [ ] N · [ ] D · [ ] P — **Electrolysis: qualitative aspect**
- [x] I · [ ] N · [ ] D · [ ] P — **Electrolysis: quantitative aspect (Faraday's laws of electrolysis)**

### `states-of-matter` — States of Matter (9 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Gaseous state: Kinetic theory of gas and its postulates**
- [x] I · [ ] N · [ ] D · [ ] P — **Gas laws: Boyle's law, Charles' law, Avogadro's law, combined gas equation, Dalton's law of partial pressure, Graham's law of diffusion**
- [x] I · [ ] N · [ ] D · [ ] P — **Ideal gas and ideal gas equation; universal gas constant and its significance**
- [x] I · [ ] N · [ ] D · [ ] P — **Deviation of real gas from ideality (solving related numerical problems based on gas laws)**
- [x] I · [ ] N · [ ] D · [ ] P — **Liquid state: physical properties of liquids — evaporation and condensation, vapour pressure and boiling point, surface tension and viscosity (qualitative idea only)**
- [x] I · [ ] N · [ ] D · [ ] P — **Liquid crystals and their applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Solid state: types of solids, amorphous and crystalline solids**
- [x] I · [ ] N · [ ] D · [ ] P — **Efflorescent, deliquescent and hygroscopic solids; crystallization and crystal growth; water of crystallization**
- [x] I · [ ] N · [ ] D · [ ] P — **Introduction to unit crystal lattice and unit cell**

### `chemical-equilibrium` — Chemical Equilibrium (5 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Physical and chemical equilibrium; dynamic nature of chemical equilibrium**
- [x] I · [ ] N · [ ] D · [ ] P — **Law of mass action**
- [x] I · [ ] N · [ ] D · [ ] P — **Expression for equilibrium constant and its importance**
- [x] I · [ ] N · [ ] D · [ ] P — **Relationship between Kp and Kc**
- [x] I · [ ] N · [ ] D · [ ] P — **Le Chatelier's Principle (numericals not required)**

### `chemistry-of-non-metals` — Chemistry of Non-metals (22 topics · 21h)

- [x] I · [ ] N · [ ] D · [ ] P — **Hydrogen: chemistry of atomic and nascent hydrogen; isotopes of hydrogen and their uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Application of hydrogen as fuel; heavy water and its applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Allotropes of oxygen: definition of allotropy and examples; oxygen — types of oxides (acidic, basic, neutral, amphoteric, peroxide and mixed oxides)**
- [x] I · [ ] N · [ ] D · [ ] P — **Applications of hydrogen peroxide; medical and industrial application of oxygen**
- [x] I · [ ] N · [ ] D · [ ] P — **Ozone: occurrence, preparation of ozone from oxygen, structure of ozone, test for ozone, uses of ozone**
- [x] I · [ ] N · [ ] D · [ ] P — **Ozone layer depletion: causes, effects and control measures**
- [x] I · [ ] N · [ ] D · [ ] P — **Nitrogen: reason for inertness of nitrogen and active nitrogen**
- [x] I · [ ] N · [ ] D · [ ] P — **Chemical properties of ammonia (action with CuSO4 solution, water, FeCl3 solution, conc. HCl, mercurous nitrate paper, O2); applications and harmful effects of ammonia**
- [x] I · [ ] N · [ ] D · [ ] P — **Oxy-acids of nitrogen (name and formula)**
- [x] I · [ ] N · [ ] D · [ ] P — **Chemical properties of nitric acid: HNO3 as an acid and oxidizing agent (action with zinc, magnesium, iron, copper, sulphur, carbon, SO2 and H2S); ring test for nitrate ion**
- [x] I · [ ] N · [ ] D · [ ] P — **Halogens: general characteristics of halogens; comparative study on preparation, chemical properties (with water, alkali, ammonia, oxidizing character, bleaching action) and uses of Cl2, Br2 and I2**
- [x] I · [ ] N · [ ] D · [ ] P — **Test for Cl2, Br2 and I2**
- [x] I · [ ] N · [ ] D · [ ] P — **Haloacids (HCl, HBr and HI): comparative study on preparation, properties (reducing strength, acidic nature and solubility) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Carbon: allotropes of carbon (crystalline and amorphous) including fullerenes (structure, general properties and uses only)**
- [x] I · [ ] N · [ ] D · [ ] P — **Properties (reducing action, reaction with metals and nonmetals) and uses of carbon monoxide**
- [x] I · [ ] N · [ ] D · [ ] P — **Phosphorus: allotropes of phosphorus (name only)**
- [x] I · [ ] N · [ ] D · [ ] P — **Phosphine: preparation, properties (basic nature, reducing nature, action with halogens and oxygen) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Sulphur: allotropes of sulphur (name only) and uses of sulphur**
- [x] I · [ ] N · [ ] D · [ ] P — **Hydrogen sulphide: preparation from Kipp's apparatus (with diagram), properties (acidic nature, reducing nature, analytical reagent) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Sulphur dioxide: properties (acidic nature, reducing nature, oxidising nature and bleaching action) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Sulphuric acid: properties (acidic nature, oxidising nature, dehydrating nature) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Sodium thiosulphate (formula and uses)**

### `chemistry-of-metals` — Chemistry of Metals (12 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Metals and metallurgical principles: definition of metallurgy and its types (hydrometallurgy, pyrometallurgy, electrometallurgy)**
- [x] I · [ ] N · [ ] D · [ ] P — **Introduction of ores; gangue or matrix, flux and slag, alloy and amalgam**
- [x] I · [ ] N · [ ] D · [ ] P — **General principles of extraction of metals: concentration, calcination and roasting, smelting, carbon reduction, thermite and electrochemical reduction**
- [x] I · [ ] N · [ ] D · [ ] P — **Refining of metals (poling and electro-refinement)**
- [x] I · [ ] N · [ ] D · [ ] P — **Alkali metals: general characteristics of alkali metals**
- [x] I · [ ] N · [ ] D · [ ] P — **Sodium: extraction from Down's process, properties (action with oxygen, water, acids, nonmetals and ammonia) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Sodium hydroxide: properties (precipitation reaction and action with carbon monoxide) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Sodium carbonate: properties (action with CO2, SO2, water, precipitation reactions) and uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Alkaline earth metals: general characteristics of alkaline earth metals**
- [x] I · [ ] N · [ ] D · [ ] P — **Molecular formula and uses of quick lime, bleaching powder, magnesia, plaster of paris and epsom salt**
- [x] I · [ ] N · [ ] D · [ ] P — **Solubility of hydroxides, carbonates and sulphates of alkaline earth metals (general trend with explanation)**
- [x] I · [ ] N · [ ] D · [ ] P — **Stability of carbonate and nitrate of alkaline earth metals (general trend with explanation)**

### `bio-inorganic-chemistry` — Bio-inorganic Chemistry (5 topics · 3h)

- [x] I · [ ] N · [ ] D · [ ] P — **Introduction to Bio-inorganic Chemistry**
- [x] I · [ ] N · [ ] D · [ ] P — **Micro and macro nutrients**
- [x] I · [ ] N · [ ] D · [ ] P — **Importance of metal ions in biological systems (ions of Na, K, Mg, Ca, Fe, Cu, Zn, Ni, Co, Cr)**
- [x] I · [ ] N · [ ] D · [ ] P — **Ion pumps (sodium-potassium and sodium-glucose pump)**
- [x] I · [ ] N · [ ] D · [ ] P — **Metal toxicity (toxicity due to iron, arsenic, mercury, lead and cadmium)**

### `basic-concept-of-organic-chemistry` — Basic Concept of Organic Chemistry (7 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Introduction to organic chemistry and organic compounds**
- [x] I · [ ] N · [ ] D · [ ] P — **Reasons for the separate study of organic compounds from inorganic compounds**
- [x] I · [ ] N · [ ] D · [ ] P — **Tetra-covalency and catenation properties of carbon**
- [x] I · [ ] N · [ ] D · [ ] P — **Classification of organic compounds**
- [x] I · [ ] N · [ ] D · [ ] P — **Alkyl groups, functional groups and homologous series**
- [x] I · [ ] N · [ ] D · [ ] P — **Idea of structural formula, contracted formula and bond line structural formula**
- [x] I · [ ] N · [ ] D · [ ] P — **Preliminary idea of cracking and reforming, quality of gasoline, octane number, cetane number and gasoline additive**

### `fundamental-principles-of-organic-chemistry` — Fundamental Principles of Organic Chemistry (9 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **IUPAC Nomenclature of Organic Compounds (up to chain having 6-carbon atoms)**
- [x] I · [ ] N · [ ] D · [ ] P — **Qualitative analysis of organic compounds (detection of N, S and halogens by Lassaigne's test)**
- [x] I · [ ] N · [ ] D · [ ] P — **Isomerism in organic compounds: definition and classification of isomerism**
- [x] I · [ ] N · [ ] D · [ ] P — **Structural isomerism and its types: chain isomerism, position isomerism, functional isomerism, metamerism and tautomerism**
- [x] I · [ ] N · [ ] D · [ ] P — **Concept of geometrical isomerism (cis and trans) and optical isomerism (d and l form)**
- [x] I · [ ] N · [ ] D · [ ] P — **Preliminary idea of reaction mechanism: homolytic and heterolytic fission**
- [x] I · [ ] N · [ ] D · [ ] P — **Electrophiles, nucleophiles and free-radicals**
- [x] I · [ ] N · [ ] D · [ ] P — **Inductive effect: +I and -I effect**
- [x] I · [ ] N · [ ] D · [ ] P — **Resonance effect: +R and -R effect**

### `hydrocarbons` — Hydrocarbons (9 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Saturated hydrocarbons (Alkanes): preparation from haloalkanes (reduction and Wurtz reaction), decarboxylation, catalytic hydrogenation of alkene and alkyne**
- [x] I · [ ] N · [ ] D · [ ] P — **Chemical properties of alkanes: substitution reactions (halogenation, nitration and sulphonation only), oxidation of ethane**
- [x] I · [ ] N · [ ] D · [ ] P — **Unsaturated hydrocarbons (Alkenes): preparation by dehydration of alcohol, dehydrohalogenation, catalytic hydrogenation of alkyne**
- [x] I · [ ] N · [ ] D · [ ] P — **Chemical properties of alkenes: addition reaction with HX (Markovnikov's addition and peroxide effect), H2O, O3, H2SO4 only**
- [x] I · [ ] N · [ ] D · [ ] P — **Alkynes: preparation from carbon and hydrogen, 1,2-dibromoethane, chloroform/iodoform only**
- [x] I · [ ] N · [ ] D · [ ] P — **Chemical properties of alkynes: addition reaction with H2, HX, H2O; acidic nature (action with sodium, ammoniacal AgNO3 and ammoniacal Cu2Cl2)**
- [x] I · [ ] N · [ ] D · [ ] P — **Test of unsaturation (ethene and ethyne): bromine water test and Baeyer's test**
- [x] I · [ ] N · [ ] D · [ ] P — **Comparative studies of physical properties of alkane, alkene and alkyne**
- [x] I · [ ] N · [ ] D · [ ] P — **Kolbe's electrolysis methods for the preparation of alkanes, alkenes and alkynes**

### `aromatic-hydrocarbons` — Aromatic Hydrocarbons (8 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Introduction and characteristics of aromatic compounds**
- [x] I · [ ] N · [ ] D · [ ] P — **Huckel's rule of aromaticity**
- [x] I · [ ] N · [ ] D · [ ] P — **Kekule structure of benzene**
- [x] I · [ ] N · [ ] D · [ ] P — **Resonance and isomerism in benzene**
- [x] I · [ ] N · [ ] D · [ ] P — **Preparation of benzene from decarboxylation of sodium benzoate, phenol, and ethyne only**
- [x] I · [ ] N · [ ] D · [ ] P — **Physical properties of benzene**
- [x] I · [ ] N · [ ] D · [ ] P — **Chemical properties of benzene: addition reactions (hydrogen, halogen); electrophilic substitution reactions: orientation of benzene derivatives (o, m and p), nitration, sulphonation, halogenation, Friedel-Crafts reaction (alkylation and acylation)**
- [x] I · [ ] N · [ ] D · [ ] P — **Combustion of benzene (free combustion only) and uses**

### `fundamentals-of-applied-chemistry` — Fundamentals of Applied Chemistry (6 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Fundamentals of Applied Chemistry: chemical industry and its importance**
- [x] I · [ ] N · [ ] D · [ ] P — **Stages in producing a new product**
- [x] I · [ ] N · [ ] D · [ ] P — **Economics of production; cash flow in the production cycle**
- [x] I · [ ] N · [ ] D · [ ] P — **Running a chemical plant; designing a chemical plant**
- [x] I · [ ] N · [ ] D · [ ] P — **Continuous and batch processing**
- [x] I · [ ] N · [ ] D · [ ] P — **Environmental impact of the chemical industry**

### `modern-chemical-manufactures` — Modern Chemical Manufactures (6 topics · 11h)

- [x] I · [ ] N · [ ] D · [ ] P — **Manufacture of ammonia by Haber's process (principle and flow sheet diagram only)**
- [x] I · [ ] N · [ ] D · [ ] P — **Manufacture of nitric acid by Ostwald's process**
- [x] I · [ ] N · [ ] D · [ ] P — **Manufacture of sulphuric acid by contact process**
- [x] I · [ ] N · [ ] D · [ ] P — **Manufacture of sodium hydroxide by Diaphragm Cell**
- [x] I · [ ] N · [ ] D · [ ] P — **Manufacture of sodium carbonate by ammonia soda or Solvay process**
- [x] I · [ ] N · [ ] D · [ ] P — **Fertilizers: chemical fertilizers, types of chemical fertilizers, production of urea with flow-sheet diagram**

## Class 12

### `solutions` — Solutions (5 topics · 7h)

- [x] I · [ ] N · [ ] D · [ ] P — **Types of solutions and expression of concentration**
- [x] I · [ ] N · [ ] D · [ ] P — **Solubility of gases and solids in liquids**
- [x] I · [ ] N · [ ] D · [ ] P — **Vapour pressure of solutions — Raoult's law**
- [x] I · [ ] N · [ ] D · [ ] P — **Colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure**
- [x] I · [ ] N · [ ] D · [ ] P — **Van't Hoff factor and abnormal molar masses**

### `electro-chemistry` — Electrochemistry (7 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Oxidation and reduction — electrode reactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Electrochemical cells — galvanic cell, cell potential, standard electrode potential**
- [x] I · [ ] N · [ ] D · [ ] P — **Nernst equation and its applications**
- [x] I · [ ] N · [ ] D · [ ] P — **Conductance of electrolytic solutions**
- [x] I · [ ] N · [ ] D · [ ] P — **Electrolysis and Faraday's laws**
- [x] I · [ ] N · [ ] D · [ ] P — **Batteries — primary and secondary cells**
- [x] I · [ ] N · [ ] D · [ ] P — **Fuel cells**

### `chemical-kinetics` — Chemical Kinetics (5 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Rate of reaction — average and instantaneous rate**
- [x] I · [ ] N · [ ] D · [ ] P — **Factors affecting rate of reaction**
- [x] I · [ ] N · [ ] D · [ ] P — **Rate law and order of reaction**
- [x] I · [ ] N · [ ] D · [ ] P — **Integrated rate equations — zero order and first order reactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Arrhenius equation and activation energy**

### `general-and-organic-fundamentals` — General and Fundamental Principles of Organic Chemistry (5 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Purification and qualitative/quantitative analysis of organic compounds**
- [x] I · [ ] N · [ ] D · [ ] P — **Inductive effect, resonance, hyperconjugation**
- [x] I · [ ] N · [ ] D · [ ] P — **Electrophilic and nucleophilic substitution reactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Free radical reactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Important organic reactions: oxidation, reduction, addition, elimination**

### `hydrocarbons` — Hydrocarbons (4 topics · 7h)

- [x] I · [ ] N · [ ] D · [ ] P — **Alkanes: conformations, combustion, free radical halogenation**
- [x] I · [ ] N · [ ] D · [ ] P — **Alkenes: preparation, geometrical isomerism, electrophilic addition (Markovnikov, anti-Markovnikov), ozonolysis, polymerisation**
- [x] I · [ ] N · [ ] D · [ ] P — **Alkynes: preparation, acidic character, addition reactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Aromatic hydrocarbons: benzene — resonance, aromaticity, electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts)**

### `alcohols-phenols-ethers` — Alcohols, Phenols and Ethers (3 topics · 7h)

- [x] I · [ ] N · [ ] D · [ ] P — **Alcohols: classification, preparation, physical and chemical properties**
- [x] I · [ ] N · [ ] D · [ ] P — **Phenols: acidity, electrophilic substitution, Kolbe's reaction, Reimer-Tiemann reaction**
- [x] I · [ ] N · [ ] D · [ ] P — **Ethers: preparation and chemical reactions (cleavage by HI)**

### `aldehydes-ketones-carboxylic-acids` — Aldehydes, Ketones and Carboxylic Acids (3 topics · 10h)

- [x] I · [ ] N · [ ] D · [ ] P — **Aldehydes and ketones: preparation, physical properties, nucleophilic addition reactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Carboxylic acids: preparation, physical properties, acidic character, reactions**
- [x] I · [ ] N · [ ] D · [ ] P — **Name reactions: Aldol condensation, Cannizzaro reaction, HVZ reaction**

### `amines` — Amines (4 topics · 6h)

- [x] I · [ ] N · [ ] D · [ ] P — **Classification, nomenclature and preparation**
- [x] I · [ ] N · [ ] D · [ ] P — **Physical and chemical properties**
- [x] I · [ ] N · [ ] D · [ ] P — **Basic character of amines**
- [x] I · [ ] N · [ ] D · [ ] P — **Reactions: diazotisation, coupling reactions, Hinsberg test**

### `biomolecules` — Biomolecules (5 topics · 5h)

- [x] I · [ ] N · [ ] D · [ ] P — **Carbohydrates: monosaccharides (glucose, fructose), disaccharides, polysaccharides**
- [x] I · [ ] N · [ ] D · [ ] P — **Proteins: amino acids, peptide bond, primary to quaternary structure, denaturation**
- [x] I · [ ] N · [ ] D · [ ] P — **Enzymes: definition, classification, enzyme action**
- [x] I · [ ] N · [ ] D · [ ] P — **Vitamins: classification and functions**
- [x] I · [ ] N · [ ] D · [ ] P — **Hormones: definition, types, functions**

### `chemistry-in-everyday-life` — Chemistry in Everyday Life (3 topics · 4h)

- [x] I · [ ] N · [ ] D · [ ] P — **Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, antacids**
- [x] I · [ ] N · [ ] D · [ ] P — **Chemical cleansers — soaps and detergents**
- [x] I · [ ] N · [ ] D · [ ] P — **Food additives — preservatives and artificial sweetening agents**

### `chemistry-of-element` — Chemistry of Element (4 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **p-block elements (Group 15–18): important compounds, trends in properties**
- [x] I · [ ] N · [ ] D · [ ] P — **d-block elements: general characteristics, important compounds (KMnO₄, K₂Cr₂O₇)**
- [x] I · [ ] N · [ ] D · [ ] P — **f-block elements: lanthanoids and actinoids**
- [x] I · [ ] N · [ ] D · [ ] P — **Coordination compounds: Werner's theory, IUPAC nomenclature, VBT, CFT (qualitative), isomerism**

<!-- CHEMISTRY-PLAN:TOPICS:END -->

## 10. Risks & hard rules
No removal ever · CEE content frozen · syllabus order sacred · IUPAC authority for naming ·
structures drawn, never only named · conditions sourced · diagram licensing recorded ·
skeletons carry real shells · cross-subject filler routed to its own subject · 3-variant
duplication handled consistently until the generator is fixed.
