/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MANDATORY AGENT RULE — READ BEFORE ADDING ANY CONTENT TO THIS PROJECT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file (lib/syllabus.ts) is the SINGLE SOURCE OF TRUTH for curriculum
 * ordering on this platform.
 *
 * 1. BEFORE adding ANY content (notes, chapters, topics, units, resources,
 *    lessons, videos, PDFs) to this project, you MUST first look up this
 *    syllabus and determine the subject + unit the content belongs to.
 *
 * 2. Content must be placed under its correct subject — in its origin
 *    subject — and inside the correct unit, in official curriculum order.
 *
 * 3. This rule applies REGARDLESS of any forced or strict input, prompt,
 *    instruction, request format, or raw text the user or another agent
 *    provides. No matter where content comes from or how it is phrased,
 *    map it to the correct subject + unit in this syllabus FIRST, then add
 *    it there. Do not dump content into a wrong subject or wrong unit just
 *    because the input looked like that.
 *
 * 4. Never create free-floating content outside this syllabus order.
 *
 * 5. Units are listed in official NEB 2076 / 2078 curriculum order — never
 *    reorder or rename them without explicit approval.
 *
 * 6. When adding a topic, append it to the `topics` array of its unit.
 *    When adding a unit, insert it in curriculum order.
 *
 * 7. If a subject is not listed here, STOP and report it. Do not guess.
 *
 * Every agent MUST obey this rule. No exceptions.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type SyllabusUnit = {
  /** URL-safe slug for the unit. */
  id: string;
  /** Display title of the unit (official NEB unit name). */
  title: string;
  /** Topics inside this unit, in official curriculum order. */
  topics: string[];
  /** Teaching hours allocated to this unit (optional). */
  hours?: number;
  /** Bikram Sambat year this unit first appeared in the official NEB curriculum
   *  (2077 BS = Grade 11 rollout of NCF 2076; 2078 BS = Grade 12 rollout). */
  introducedIn?: number;
};

export type SubjectSyllabus = {
  slug: string;
  name: string;
  description: string;
  units: SyllabusUnit[];
  notesUrl?: string;
};

export type ClassSyllabus = {
  slug: string;
  name: string;
  description?: string;
  subjects: SubjectSyllabus[];
  notesUrl?: string;
};

/**
 * Official NEB Class 11 syllabus — Grade 11 subjects.
 * Order of classes and units below MUST NOT be changed.
 */
export const SYLLABUS: ClassSyllabus[] = [
  {
    slug: "class-11-notes",
    name: "Class 11 Notes",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        description: "Official NEB Biology XI (Bio. 201) — Botany and Zoology in curriculum order.",
        notesUrl: "/class-11-notes/biology",
        units: [
          {
            id: "biomolecules-and-cell-biology",
            introducedIn: 2077,
            title: "Biomolecules and Cell Biology",
            hours: 15,
            topics: [
              "Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water",
              "Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells",
              "Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions",
              "Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances",
            ],
          },
          {
            id: "floral-diversity",
            introducedIn: 2077,
            title: "Floral Diversity",
            hours: 30,
            topics: [
              "Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)",
              "Status of flora in Nepal and world representation",
              "Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes",
              "Structure and reproduction of Mucor and Yeast",
              "Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi",
              "Lichen: General introduction, characteristic features and economic importance of lichen",
              "Algae: General introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae",
              "Bryophyta: General introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes",
              "Pteridophyta: General introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes",
              "Gymnosperm: General introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm",
              "Angiosperm: Morphology of root, stem, leaves, inflorescences, flowers and fruit",
              "Taxonomic study: Definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms",
              "Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae",
            ],
          },
          {
            id: "introductory-microbiology",
            introducedIn: 2077,
            title: "Introductory Microbiology",
            hours: 5,
            topics: [
              "Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)",
              "Virus: General introduction, structure and importance of virus, bacteriophage",
              "Impacts of biotechnology in the field of microbiology",
            ],
          },
          {
            id: "ecology",
            introducedIn: 2077,
            title: "Ecology",
            hours: 11,
            topics: [
              "Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions",
              "Concept of ecosystem, structural and functional aspects of pond and forest ecosystem",
              "Food chain, food web, trophic level, ecological pyramids, productivity",
              "Biogeochemical cycles: carbon and nitrogen cycles; concept of succession",
              "Ecological adaptation: Concept of adaptation, hydrophytes and xerophytes",
              "Ecological imbalances: Greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion",
            ],
          },
          {
            id: "vegetation",
            introducedIn: 2077,
            title: "Vegetation",
            hours: 3,
            topics: [
              "Vegetation: Introduction, types of vegetation in Nepal",
              "In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation",
              "Natural environment-vegetation and human activities",
            ],
          },
          {
            id: "introduction-to-biology",
            introducedIn: 2077,
            title: "Introduction to Biology",
            hours: 2,
            topics: [
              "Introduction to Biology: Scope and fields of biology",
              "Relation of biology with other sciences",
            ],
          },
          {
            id: "evolutionary-biology",
            introducedIn: 2077,
            title: "Evolutionary Biology",
            hours: 15,
            topics: [
              "Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment",
              "Evidences of evolution: Morphological, Anatomical, Paleontological, Embryological and Biochemical",
              "Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism",
              "Human evolution: Position of man in animal kingdom",
              "Differences between new world monkeys and old-world monkeys, apes and man",
              "Evolution of modern man starting from anthropoid ancestor",
            ],
          },
          {
            id: "faunal-diversity",
            introducedIn: 2077,
            title: "Faunal Diversity",
            hours: 34,
            topics: [
              "Protista: Outline classification. Protozoa: diagnostic features and classification up to class with examples",
              "Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle",
              "Economic importance of P. falciparum",
              "Animalia: Level of organization, body plan, body symmetry, body cavity and segmentation in animals",
              "Diagnostic features and classification of phyla (up to class): Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata",
              "Earthworm (Pheretima posthuma): Habit and habitat, external features; digestive system (alimentary canal and physiology of digestion)",
              "Earthworm: Excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral, working mechanism)",
              "Earthworm: Reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance",
              "Frog (Rana tigrina): Habit and habitat, external features; digestive system (alimentary canal, digestive glands and physiology of digestion)",
              "Frog: Blood vascular system (structure and working mechanism of heart); respiratory system (respiratory organs and physiology of respiration)",
              "Frog: Reproductive system (male and female reproductive organs)",
            ],
          },
          {
            id: "biota-and-environment",
            introducedIn: 2077,
            title: "Biota and Environment",
            hours: 10,
            topics: [
              "Animal adaptation: Aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation",
              "Animal behavior: Reflex action, taxes, dominance and leadership",
              "Fish and bird migration",
              "Environmental pollution: Sources, effects and control measures of air, water and soil pollution",
              "Pesticides and their effects",
            ],
          },
          {
            id: "conservation-biology",
            introducedIn: 2077,
            title: "Conservation Biology",
            hours: 3,
            topics: [
              "Conservation biology: Concept of biodiversity, biodiversity conservation",
              "National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites",
              "Wildlife: Importance, causes of extinction and conservation strategies",
              "IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species",
              "Endangered species in Nepal",
            ],
          },
        ],
      },
      {
        slug: "chemistry",
        name: "Chemistry",
        description: "Official NEB Chemistry XI (Che. 201) — General/Physical, Inorganic, Organic and Applied chemistry in curriculum order.",
        notesUrl: "/class-11-notes/chemistry",
        units: [
          {
            id: "foundation-and-fundamentals",
            introducedIn: 2077,
            title: "Foundation and Fundamentals",
            hours: 2,
            topics: [
              "General introduction of chemistry",
              "Importance and scope of chemistry",
              "Basic concepts of chemistry: atoms, molecules, relative masses of atoms and molecules, atomic mass unit (amu), radicals, molecular formula, empirical formula",
              "Percentage composition from molecular formula",
            ],
          },
          {
            id: "stoichiometry",
            introducedIn: 2077,
            title: "Stoichiometry",
            hours: 8,
            topics: [
              "Dalton's atomic theory and its postulates",
              "Laws of stoichiometry",
              "Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles",
              "Mole and its relation with mass, volume and number of particles",
              "Calculations based on mole concept",
              "Limiting reactant and excess reactant",
              "Theoretical yield, experimental yield and % yield",
              "Calculation of empirical and molecular formula from % composition (solving related numerical problems)",
            ],
          },
          {
            id: "atomic-structure",
            introducedIn: 2077,
            title: "Atomic Structure",
            hours: 8,
            topics: [
              "Rutherford's atomic model and its limitations",
              "Postulates of Bohr's atomic model and its application",
              "Spectrum of hydrogen atom",
              "Defects of Bohr's theory",
              "Elementary idea of quantum mechanical model: de Broglie's wave equation",
              "Heisenberg's Uncertainty Principle and concept of probability",
              "Quantum numbers",
              "Orbitals and shape of s and p orbitals only",
              "Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)",
            ],
          },
          {
            id: "classification-of-elements-and-periodic-table",
            introducedIn: 2077,
            title: "Classification of Elements and Periodic Table",
            hours: 5,
            topics: [
              "Modern periodic law and modern periodic table",
              "Classification of elements into different groups, periods and blocks",
              "IUPAC classification of elements",
              "Nuclear charge and effective nuclear charge",
              "Periodic trend and periodicity: atomic radii, ionic radii, ionization energy, electron affinity, electronegativity, metallic characters (general trend and explanation only)",
            ],
          },
          {
            id: "chemical-bonding-and-shapes-of-molecules",
            introducedIn: 2077,
            title: "Chemical Bonding and Shapes of Molecules",
            hours: 9,
            topics: [
              "Valence shell, valence electron and octet theory",
              "Ionic bond and its properties",
              "Covalent bond and coordinate covalent bond; properties of covalent compounds",
              "Lewis dot structure of some common compounds of s and p block elements",
              "Resonance",
              "VSEPR theory and shapes of simple molecules (BeF2, BF3, CH4, CH3Cl, PCl5, SF6, H2O, NH3, CO2, H2S, PH3)",
              "Elementary idea of Valence Bond Theory",
              "Hybridization involving s and p orbitals only",
              "Bond characteristics: bond length, ionic character, dipole moment",
              "Vander Waal's force and molecular solids; hydrogen bonding and its application",
              "Metallic bonding and properties of metallic solids",
            ],
          },
          {
            id: "oxidation-and-reduction",
            introducedIn: 2077,
            title: "Oxidation and Reduction",
            hours: 5,
            topics: [
              "General and electronic concept of oxidation and reduction",
              "Oxidation number and rules for assigning oxidation number",
              "Balancing redox reactions by oxidation number and ion-electron (half reaction) method",
              "Electrolysis: qualitative aspect",
              "Electrolysis: quantitative aspect (Faraday's laws of electrolysis)",
            ],
          },
          {
            id: "states-of-matter",
            introducedIn: 2077,
            title: "States of Matter",
            hours: 8,
            topics: [
              "Gaseous state: Kinetic theory of gas and its postulates",
              "Gas laws: Boyle's law, Charles' law, Avogadro's law, combined gas equation, Dalton's law of partial pressure, Graham's law of diffusion",
              "Ideal gas and ideal gas equation; universal gas constant and its significance",
              "Deviation of real gas from ideality (solving related numerical problems based on gas laws)",
              "Liquid state: physical properties of liquids — evaporation and condensation, vapour pressure and boiling point, surface tension and viscosity (qualitative idea only)",
              "Liquid crystals and their applications",
              "Solid state: types of solids, amorphous and crystalline solids",
              "Efflorescent, deliquescent and hygroscopic solids; crystallization and crystal growth; water of crystallization",
              "Introduction to unit crystal lattice and unit cell",
            ],
          },
          {
            id: "chemical-equilibrium",
            introducedIn: 2077,
            title: "Chemical Equilibrium",
            hours: 3,
            topics: [
              "Physical and chemical equilibrium; dynamic nature of chemical equilibrium",
              "Law of mass action",
              "Expression for equilibrium constant and its importance",
              "Relationship between Kp and Kc",
              "Le Chatelier's Principle (numericals not required)",
            ],
          },
          {
            id: "chemistry-of-non-metals",
            introducedIn: 2077,
            title: "Chemistry of Non-metals",
            hours: 21,
            topics: [
              "Hydrogen: chemistry of atomic and nascent hydrogen; isotopes of hydrogen and their uses",
              "Application of hydrogen as fuel; heavy water and its applications",
              "Allotropes of oxygen: definition of allotropy and examples; oxygen — types of oxides (acidic, basic, neutral, amphoteric, peroxide and mixed oxides)",
              "Applications of hydrogen peroxide; medical and industrial application of oxygen",
              "Ozone: occurrence, preparation of ozone from oxygen, structure of ozone, test for ozone, uses of ozone",
              "Ozone layer depletion: causes, effects and control measures",
              "Nitrogen: reason for inertness of nitrogen and active nitrogen",
              "Chemical properties of ammonia (action with CuSO4 solution, water, FeCl3 solution, conc. HCl, mercurous nitrate paper, O2); applications and harmful effects of ammonia",
              "Oxy-acids of nitrogen (name and formula)",
              "Chemical properties of nitric acid: HNO3 as an acid and oxidizing agent (action with zinc, magnesium, iron, copper, sulphur, carbon, SO2 and H2S); ring test for nitrate ion",
              "Halogens: general characteristics of halogens; comparative study on preparation, chemical properties (with water, alkali, ammonia, oxidizing character, bleaching action) and uses of Cl2, Br2 and I2",
              "Test for Cl2, Br2 and I2",
              "Haloacids (HCl, HBr and HI): comparative study on preparation, properties (reducing strength, acidic nature and solubility) and uses",
              "Carbon: allotropes of carbon (crystalline and amorphous) including fullerenes (structure, general properties and uses only)",
              "Properties (reducing action, reaction with metals and nonmetals) and uses of carbon monoxide",
              "Phosphorus: allotropes of phosphorus (name only)",
              "Phosphine: preparation, properties (basic nature, reducing nature, action with halogens and oxygen) and uses",
              "Sulphur: allotropes of sulphur (name only) and uses of sulphur",
              "Hydrogen sulphide: preparation from Kipp's apparatus (with diagram), properties (acidic nature, reducing nature, analytical reagent) and uses",
              "Sulphur dioxide: properties (acidic nature, reducing nature, oxidising nature and bleaching action) and uses",
              "Sulphuric acid: properties (acidic nature, oxidising nature, dehydrating nature) and uses",
              "Sodium thiosulphate (formula and uses)",
            ],
          },
          {
            id: "chemistry-of-metals",
            introducedIn: 2077,
            title: "Chemistry of Metals",
            hours: 10,
            topics: [
              "Metals and metallurgical principles: definition of metallurgy and its types (hydrometallurgy, pyrometallurgy, electrometallurgy)",
              "Introduction of ores; gangue or matrix, flux and slag, alloy and amalgam",
              "General principles of extraction of metals: concentration, calcination and roasting, smelting, carbon reduction, thermite and electrochemical reduction",
              "Refining of metals (poling and electro-refinement)",
              "Alkali metals: general characteristics of alkali metals",
              "Sodium: extraction from Down's process, properties (action with oxygen, water, acids, nonmetals and ammonia) and uses",
              "Sodium hydroxide: properties (precipitation reaction and action with carbon monoxide) and uses",
              "Sodium carbonate: properties (action with CO2, SO2, water, precipitation reactions) and uses",
              "Alkaline earth metals: general characteristics of alkaline earth metals",
              "Molecular formula and uses of quick lime, bleaching powder, magnesia, plaster of paris and epsom salt",
              "Solubility of hydroxides, carbonates and sulphates of alkaline earth metals (general trend with explanation)",
              "Stability of carbonate and nitrate of alkaline earth metals (general trend with explanation)",
            ],
          },
          {
            id: "bio-inorganic-chemistry",
            introducedIn: 2077,
            title: "Bio-inorganic Chemistry",
            hours: 3,
            topics: [
              "Introduction to Bio-inorganic Chemistry",
              "Micro and macro nutrients",
              "Importance of metal ions in biological systems (ions of Na, K, Mg, Ca, Fe, Cu, Zn, Ni, Co, Cr)",
              "Ion pumps (sodium-potassium and sodium-glucose pump)",
              "Metal toxicity (toxicity due to iron, arsenic, mercury, lead and cadmium)",
            ],
          },
          {
            id: "basic-concept-of-organic-chemistry",
            introducedIn: 2077,
            title: "Basic Concept of Organic Chemistry",
            hours: 6,
            topics: [
              "Introduction to organic chemistry and organic compounds",
              "Reasons for the separate study of organic compounds from inorganic compounds",
              "Tetra-covalency and catenation properties of carbon",
              "Classification of organic compounds",
              "Alkyl groups, functional groups and homologous series",
              "Idea of structural formula, contracted formula and bond line structural formula",
              "Preliminary idea of cracking and reforming, quality of gasoline, octane number, cetane number and gasoline additive",
            ],
          },
          {
            id: "fundamental-principles-of-organic-chemistry",
            introducedIn: 2077,
            title: "Fundamental Principles of Organic Chemistry",
            hours: 10,
            topics: [
              "IUPAC Nomenclature of Organic Compounds (up to chain having 6-carbon atoms)",
              "Qualitative analysis of organic compounds (detection of N, S and halogens by Lassaigne's test)",
              "Isomerism in organic compounds: definition and classification of isomerism",
              "Structural isomerism and its types: chain isomerism, position isomerism, functional isomerism, metamerism and tautomerism",
              "Concept of geometrical isomerism (cis and trans) and optical isomerism (d and l form)",
              "Preliminary idea of reaction mechanism: homolytic and heterolytic fission",
              "Electrophiles, nucleophiles and free-radicals",
              "Inductive effect: +I and -I effect",
              "Resonance effect: +R and -R effect",
            ],
          },
          {
            id: "hydrocarbons",
            introducedIn: 2077,
            title: "Hydrocarbons",
            hours: 8,
            topics: [
              "Saturated hydrocarbons (Alkanes): preparation from haloalkanes (reduction and Wurtz reaction), decarboxylation, catalytic hydrogenation of alkene and alkyne",
              "Chemical properties of alkanes: substitution reactions (halogenation, nitration and sulphonation only), oxidation of ethane",
              "Unsaturated hydrocarbons (Alkenes): preparation by dehydration of alcohol, dehydrohalogenation, catalytic hydrogenation of alkyne",
              "Chemical properties of alkenes: addition reaction with HX (Markovnikov's addition and peroxide effect), H2O, O3, H2SO4 only",
              "Alkynes: preparation from carbon and hydrogen, 1,2-dibromoethane, chloroform/iodoform only",
              "Chemical properties of alkynes: addition reaction with H2, HX, H2O; acidic nature (action with sodium, ammoniacal AgNO3 and ammoniacal Cu2Cl2)",
              "Test of unsaturation (ethene and ethyne): bromine water test and Baeyer's test",
              "Comparative studies of physical properties of alkane, alkene and alkyne",
              "Kolbe's electrolysis methods for the preparation of alkanes, alkenes and alkynes",
            ],
          },
          {
            id: "aromatic-hydrocarbons",
            introducedIn: 2077,
            title: "Aromatic Hydrocarbons",
            hours: 6,
            topics: [
              "Introduction and characteristics of aromatic compounds",
              "Huckel's rule of aromaticity",
              "Kekule structure of benzene",
              "Resonance and isomerism in benzene",
              "Preparation of benzene from decarboxylation of sodium benzoate, phenol, and ethyne only",
              "Physical properties of benzene",
              "Chemical properties of benzene: addition reactions (hydrogen, halogen); electrophilic substitution reactions: orientation of benzene derivatives (o, m and p), nitration, sulphonation, halogenation, Friedel-Crafts reaction (alkylation and acylation)",
              "Combustion of benzene (free combustion only) and uses",
            ],
          },
          {
            id: "fundamentals-of-applied-chemistry",
            introducedIn: 2077,
            title: "Fundamentals of Applied Chemistry",
            hours: 4,
            topics: [
              "Fundamentals of Applied Chemistry: chemical industry and its importance",
              "Stages in producing a new product",
              "Economics of production; cash flow in the production cycle",
              "Running a chemical plant; designing a chemical plant",
              "Continuous and batch processing",
              "Environmental impact of the chemical industry",
            ],
          },
          {
            id: "modern-chemical-manufactures",
            introducedIn: 2077,
            title: "Modern Chemical Manufactures",
            hours: 11,
            topics: [
              "Manufacture of ammonia by Haber's process (principle and flow sheet diagram only)",
              "Manufacture of nitric acid by Ostwald's process",
              "Manufacture of sulphuric acid by contact process",
              "Manufacture of sodium hydroxide by Diaphragm Cell",
              "Manufacture of sodium carbonate by ammonia soda or Solvay process",
              "Fertilizers: chemical fertilizers, types of chemical fertilizers, production of urea with flow-sheet diagram",
            ],
          },
        ],
      },
      {
        slug: "english",
        name: "English",
        description: "Official NEB English XI (Eng. 003) — Section I: Language Development (17 thematic units); Section II: Literature (7 short stories, 5 poems, 5 essays, 3 one-act plays). CDC textbook first used 2077 BS (2020 AD).",
        notesUrl: "/class-11-notes/english",
        units: [
          {
            id: "language-development",
            introducedIn: 2077,
            title: "Section I — Language Development (Units 1–17)",
            topics: [
              "Unit 1 — Education and Humanity",
              "Unit 2 — Communication",
              "Unit 3 — Media and Society",
              "Unit 4 — History and Culture",
              "Unit 5 — Life and Love",
              "Unit 6 — Health and Exercise",
              "Unit 7 — Ecology and Development",
              "Unit 8 — Humour and Satire",
              "Unit 9 — Democracy and Human Rights",
              "Unit 10 — Home Life and Family Relationship",
              "Unit 11 — Arts and Creation",
              "Unit 12 — Fantasy",
              "Unit 13 — Career and Entrepreneurship",
              "Unit 14 — Power and Politics",
              "Unit 15 — War and Peace",
              "Unit 16 — Critical Thinking",
              "Unit 17 — Globalization and Diaspora",
            ],
          },
          {
            id: "language-and-grammar",
            introducedIn: 2077,
            title: "Grammar & Vocabulary (integrated across Section I units)",
            topics: ["Grammar and Usage", "Vocabulary Building", "Communication Skills"],
          },
          {
            id: "reading-and-comprehension",
            introducedIn: 2077,
            title: "Section II — Literature · Short Stories & Poems",
            topics: [
              "Short Story 1 — The Selfish Giant (Oscar Wilde)",
              "Short Story 2 — The Oval Portrait (Edgar Allan Poe)",
              "Short Story 3 — God Sees the Truth but Waits (Leo Tolstoy)",
              "Short Story 4 — The Wish (Roald Dahl)",
              "Short Story 5 — Civil Peace (Chinua Achebe)",
              "Short Story 6 — Two Little Soldiers (Guy de Maupassant)",
              "Short Story 7 — An Astrologer's Day (R. K. Narayan)",
              "Poem 1 — Corona Says (Vishnu S. Rai)",
              "Poem 2 — A Red, Red Rose (Robert Burns)",
              "Poem 3 — All the World's a Stage (William Shakespeare)",
              "Poem 4 — Who are you, little i? (E. E. Cummings)",
              "Poem 5 — The Gift in Wartime (Tran Mong Tu)",
            ],
          },
          {
            id: "literature-essays-plays",
            introducedIn: 2077,
            title: "Section II — Literature · Essays & One-Act Plays",
            topics: [
              "Essay 1 — Sharing Tradition (Frank LaPena)",
              "Essay 2 — How to Live Before You Die (Steve Jobs)",
              "Essay 3 — What I Require From Life (J.B.S. Haldane)",
              "Essay 4 — What is Poverty? (Jo Goodwin Parker)",
              "Essay 5 — Scientific Research is a Token of Humankind's Survival (Vladimir Keilis-Borok)",
              "One-Act Play 1 — Trifles (Susan Glaspell)",
              "One-Act Play 2 — A Sunny Morning (Serafín and Joaquín Álvarez Quintero)",
              "One-Act Play 3 — Refund (Fritz Karinthy)",
            ],
          },
          {
            id: "writing-and-composition",
            introducedIn: 2077,
            title: "Writing and Composition",
            topics: [
              "Essay Writing — argumentative, descriptive, narrative, expository",
              "Paragraph Writing",
              "Formal Letter Writing — editor, application, complaint, inquiry",
              "Informal Letter Writing",
              "Email Writing",
              "Report Writing and Summarisation",
              "Article Writing",
              "Story Writing",
              "Speech Writing",
              "Dialogue Writing",
              "Review Writing — book and film",
              "Summary and Note-making",
              "Comprehension and Unseen Passage",
              "Grammar for Writing — sentences, clauses, punctuation",
            ],
          },
          {
            id: "critical-thinking",
            introducedIn: 2077,
            title: "Critical Thinking",
            topics: ["Critical Thinking", "Literary Analysis and Interpretation"],
          },
        ],
      },
      {
        slug: "mathematics",
        name: "Mathematics",
        description: "Official NEB Mathematics XI (Mat. 007) in curriculum order.",
        notesUrl: "/class-11-notes/mathematics",
        units: [
          {
            id: "algebra",
            introducedIn: 2077,
            title: "Algebra",
            hours: 44,
            topics: [
              "Logic and set: statements, logical connectives, truth tables, theorems based on set operations",
              "Real numbers: geometric representation of real numbers, interval, absolute value",
              "Function: domain and range of a function, inverse function, composite function; algebraic (linear, quadratic and cubic) and transcendental (trigonometric, exponential, logarithmic) functions",
              "Curve sketching: odd and even functions, periodicity, symmetry (about origin, X- and Y-axis), monotonicity; graphs of quadratic, cubic and rational functions, trigonometric (asinbx and acosbx), exponential (e^x), logarithmic (lnx)",
              "Sequence and series: arithmetic, geometric, harmonic sequences and series and their properties; A.M, G.M, H.M and their relations; sum of infinite geometric series",
              "Matrices and determinants: transpose of a matrix and its properties; minors and cofactors, adjoint, inverse matrix, determinant, properties of determinants (without proof)",
              "Quadratic equation: nature and roots of a quadratic equation, relation between roots and coefficient, formation of a quadratic equation, symmetric roots, one or both roots common",
              "Complex number: imaginary unit, algebra of complex numbers, geometric representation, absolute (modulus) value and conjugate of complex numbers and their properties, square root of a complex number",
            ],
          },
          {
            id: "trigonometry",
            introducedIn: 2077,
            title: "Trigonometry",
            hours: 12,
            topics: [
              "Inverse circular functions",
              "Trigonometric equations and general values",
            ],
          },
          {
            id: "analytic-geometry",
            introducedIn: 2077,
            title: "Analytic Geometry",
            hours: 20,
            topics: [
              "Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines",
              "Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines",
              "Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line",
            ],
          },
          {
            id: "vectors",
            introducedIn: 2077,
            title: "Vectors",
            hours: 12,
            topics: [
              "Collinear and non-collinear vectors, coplanar and non-coplanar vectors",
              "Linear combination of vectors, linearly dependent and independent vectors",
            ],
          },
          {
            id: "statistics-and-probability",
            introducedIn: 2077,
            title: "Statistics and Probability",
            hours: 12,
            topics: [
              "Measure of dispersion: standard deviation, variance, coefficient of variation, skewness, Karl Pearson's coefficient of skewness",
              "Probability: independent cases, mathematical and empirical definition of probability, two basic laws of probability (without proof)",
            ],
          },
          {
            id: "calculus",
            introducedIn: 2077,
            title: "Calculus",
            hours: 48,
            topics: [
              "Limits and continuity: limits of a function, indeterminate forms, algebraic properties of limits (without proof), basic theorems on limits of algebraic, trigonometric, exponential and logarithmic functions",
              "Continuity of a function, types of discontinuity, graphs of discontinuous function",
              "Derivatives: derivative of a function, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions by definition (simple forms)",
              "Rules of differentiation; derivatives of parametric and implicit functions; higher order derivatives",
              "Geometric interpretation of derivative; monotonicity of a function, interval of monotonicity, extreme values of a function, concavity, points of inflection",
              "Anti-derivatives: integration using basic integrals, integration by substitution and by parts methods",
              "The definite integral; the definite integral as an area under the given curve; area between two curves",
            ],
          },
          {
            id: "computational-methods-or-mechanics",
            introducedIn: 2077,
            title: "Computational Methods or Mechanics",
            hours: 12,
            topics: [
              "Numerical computation: roots of algebraic and transcendental equations (bisection and Newton-Raphson method)",
              "Numerical integration: Trapezoidal rule and Simpson's rule",
              "Mechanics (optional): Statics — forces and resultant forces, parallelogram law of forces, composition and resolution of forces, resultant of coplanar forces acting on a point",
              "Mechanics (optional): Dynamics — motion of particle in a straight line, motion with uniform acceleration, motion under gravity, motion down a smooth inclined plane",
            ],
          },
        ],
      },
      {
        slug: "nepali",
        name: "Nepali",
        description: "Official NEB Nepali XI (Nep. 001) — भाषा र व्याकरण, निर्धारित १२ पाठ (कविता, कथा, निबन्ध, नाटक, जीवनी), लेखन र रचना। CDC पाठ्यपुस्तक पहिलो प्रयोग २०७७ वि.सं. (२०२०)।",
        notesUrl: "/class-11-notes/nepali",
        units: [
          {
            id: "bhasha-ra-vyakarana",
            introducedIn: 2077,
            title: "भाषा र व्याकरण",
            topics: [
              "पदप्रकरण — लिङ्ग, पुरुष, वचन, कारक र विभक्ति",
              "क्रियाप्रकरण — धातु, काल, वाच्य र सार्वनामिक क्रिया",
              "समास — तत्पुरुष, कर्मधारय, द्वन्द्व र बहुव्रीहि",
              "शब्द परिवर्तन — शब्द रूपान्तर, समानार्थक र विपरीतार्थक शब्द",
              "राष्ट्रभाषा नेपाली — ऐतिहासिक विकास र भाषा नीति",
            ],
          },
          {
            id: "sahitya-adhyayan",
            introducedIn: 2077,
            title: "निर्धारित पाठ — पाठ्यपुस्तक पाठ १–१२",
            topics: [
              "पाठ १ — वीर पुर्खा (कविता)",
              "पाठ २ — गाउँको माया (सामाजिक कथा)",
              "पाठ ३ — संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध)",
              "पाठ ४ — योगमाया (राष्ट्रिय जीवनी)",
              "पाठ ५ — साथीलाई चिठी (चिठी)",
              "पाठ ६ — त्यो फेरि फर्कला? (मनोवैज्ञानिक कथा)",
              "पाठ ७ — पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध)",
              "पाठ ८ — लौ आयो ताजा खबर (लघु नाटक)",
              "पाठ ९ — सफलताको कथा (रिपोर्ताजमूलक रचना)",
              "पाठ १० — कृषिशालामा एक दिन (संवाद)",
              "पाठ ११ — रारा भ्रमण (दैनिकी)",
              "पाठ १२ — जलस्रोत र ऊर्जा (वक्तृता)",
            ],
          },
          {
            id: "lekhan-ra-rachana",
            introducedIn: 2077,
            title: "लेखन र रचना",
            topics: [
              "निबन्ध लेखन — आत्मपरक र वस्तुपरक",
              "चिठी लेखन — औपचारिक र अनौपचारिक",
              "संवाद लेखन",
              "दैनिकी लेखन",
              "वक्तृता र रिपोर्ताजमूलक रचना",
            ],
          },
          {
            id: "katha-natak-ra-sanskriti",
            introducedIn: 2077,
            title: "साहित्यिक विधा र संस्कृति",
            topics: [
              "कथा, कविता र नाटकका विधागत विशेषता",
              "व्यंग्य र हास्यव्यंग्य",
              "नेपाली सांस्कृतिक विविधता, चाडपर्व र परम्परा",
              "भाषा-साहित्यमा योगदान पुर्‍याउने साहित्यकार",
            ],
          },
        ],
      },
      {
        slug: "physics",
        name: "Physics",
        description: "Official NEB Physics XI (Phy. 101) — Mechanics, Heat, Waves/Optics, Electricity and Modern Physics in curriculum order.",
        notesUrl: "/class-11-notes/physics",
        units: [
          {
            id: "physical-quantities",
            introducedIn: 2077,
            title: "Physical Quantities",
            hours: 3,
            topics: [
              "Precision and significant figures",
              "Dimensions and uses of dimensional analysis",
            ],
          },
          {
            id: "vectors",
            introducedIn: 2077,
            title: "Vectors",
            hours: 4,
            topics: [
              "Triangle, parallelogram and polygon laws of vectors",
              "Resolution of vectors; unit vectors",
              "Scalar and vector products",
            ],
          },
          {
            id: "kinematics",
            introducedIn: 2077,
            title: "Kinematics",
            hours: 5,
            topics: [
              "Instantaneous velocity and acceleration",
              "Relative velocity",
              "Equation of motion (graphical treatment)",
              "Motion of a freely falling body",
              "Projectile motion and its applications",
            ],
          },
          {
            id: "dynamics",
            introducedIn: 2077,
            title: "Dynamics",
            hours: 6,
            topics: [
              "Linear momentum, impulse",
              "Conservation of linear momentum",
              "Application of Newton's laws",
              "Moment, torque and equilibrium",
              "Solid friction: laws of solid friction and their verifications",
            ],
          },
          {
            id: "work-energy-and-power",
            introducedIn: 2077,
            title: "Work, Energy and Power",
            hours: 6,
            topics: [
              "Work done by a constant force and a variable force",
              "Power",
              "Work-energy theorem; kinetic and potential energy",
              "Conservation of energy",
              "Conservative and non-conservative forces",
              "Elastic and inelastic collisions",
            ],
          },
          {
            id: "circular-motion",
            introducedIn: 2077,
            title: "Circular Motion",
            hours: 6,
            topics: [
              "Angular displacement, velocity and acceleration",
              "Relation between angular and linear velocity and acceleration",
              "Centripetal acceleration and centripetal force",
              "Conical pendulum",
              "Motion in a vertical circle",
              "Applications of banking",
            ],
          },
          {
            id: "gravitation",
            introducedIn: 2077,
            title: "Gravitation",
            hours: 10,
            topics: [
              "Newton's law of gravitation",
              "Gravitational field strength",
              "Gravitational potential; gravitational potential energy",
              "Variation in value of 'g' due to altitude and depth",
              "Centre of mass and centre of gravity",
              "Motion of a satellite: orbital velocity and time period of the satellite",
              "Escape velocity",
              "Potential and kinetic energy of the satellite",
              "Geostationary satellite",
              "GPS",
            ],
          },
          {
            id: "elasticity",
            introducedIn: 2077,
            title: "Elasticity",
            hours: 5,
            topics: [
              "Hooke's law: force constant",
              "Stress; strain; elasticity and plasticity",
              "Elastic modulus: Young modulus, bulk modulus, shear modulus",
              "Poisson's ratio",
              "Elastic potential energy",
            ],
          },
          {
            id: "heat-and-temperature",
            introducedIn: 2077,
            title: "Heat and Temperature",
            hours: 3,
            topics: [
              "Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow",
              "Meaning of thermal equilibrium and Zeroth law of thermodynamics",
              "Thermal equilibrium as a working principle of a mercury thermometer",
            ],
          },
          {
            id: "thermal-expansion",
            introducedIn: 2077,
            title: "Thermal Expansion",
            hours: 4,
            topics: [
              "Linear expansion and its measurement",
              "Cubical expansion, superficial expansion and their relation with linear expansion",
              "Liquid expansion: absolute and apparent",
              "Dulong and Petit method of determining expansivity of liquid",
            ],
          },
          {
            id: "quantity-of-heat",
            introducedIn: 2077,
            title: "Quantity of Heat",
            hours: 6,
            topics: [
              "Newton's law of cooling",
              "Measurement of specific heat capacity of solids and liquids",
              "Change of phases: latent heat",
              "Specific latent heat of fusion and vaporization",
              "Measurement of specific latent heat of fusion and vaporization",
              "Triple point",
            ],
          },
          {
            id: "rate-of-heat-flow",
            introducedIn: 2077,
            title: "Rate of Heat Flow",
            hours: 5,
            topics: [
              "Conduction: thermal conductivity and measurement",
              "Convection",
              "Radiation: ideal radiator",
              "Black-body radiation",
              "Stefan-Boltzmann law",
            ],
          },
          {
            id: "ideal-gas",
            introducedIn: 2077,
            title: "Ideal Gas",
            hours: 8,
            topics: [
              "Ideal gas equation",
              "Molecular properties of matter",
              "Kinetic-molecular model of an ideal gas",
              "Derivation of pressure exerted by gas",
              "Average translational kinetic energy of gas molecule",
              "Boltzmann constant, root mean square speed",
              "Heat capacities of gases and solids",
            ],
          },
          {
            id: "reflection-at-curved-mirror",
            introducedIn: 2077,
            title: "Reflection at Curved Mirror",
            hours: 2,
            topics: [
              "Real and virtual images",
              "Mirror formula",
            ],
          },
          {
            id: "refraction-at-plane-surfaces",
            introducedIn: 2077,
            title: "Refraction at Plane Surfaces",
            hours: 4,
            topics: [
              "Laws of refraction: refractive index",
              "Relation between refractive indices",
              "Lateral shift",
              "Total internal reflection",
            ],
          },
          {
            id: "refraction-through-prisms",
            introducedIn: 2077,
            title: "Refraction through Prisms",
            hours: 4,
            topics: [
              "Minimum deviation condition",
              "Relation between the angle of prism, minimum deviation and refractive index",
              "Deviation in small-angle prism",
            ],
          },
          {
            id: "lenses",
            introducedIn: 2077,
            title: "Lenses",
            hours: 3,
            topics: [
              "Spherical lenses, angular magnification",
              "Lens maker's formula",
              "Power of a lens",
            ],
          },
          {
            id: "dispersion",
            introducedIn: 2077,
            title: "Dispersion",
            hours: 3,
            topics: [
              "Pure spectrum and dispersive power",
              "Chromatic and spherical aberration",
              "Achromatism and its applications",
            ],
          },
          {
            id: "electric-charges",
            introducedIn: 2077,
            title: "Electric Charges",
            hours: 3,
            topics: [
              "Electric charges",
              "Charging by induction",
              "Coulomb's law: force between two point charges",
              "Force between multiple electric charges",
            ],
          },
          {
            id: "electric-field",
            introducedIn: 2077,
            title: "Electric Field",
            hours: 3,
            topics: [
              "Electric field due to point charges; field lines",
              "Gauss law: electric flux",
              "Application of Gauss law: field of a charge sphere, line charge, charged plane conductor",
            ],
          },
          {
            id: "potential-potential-difference-and-potential-energy",
            introducedIn: 2077,
            title: "Potential, Potential Difference and Potential Energy",
            hours: 4,
            topics: [
              "Potential difference, potential due to a point charge, potential energy, electron volt",
              "Equipotential lines and surfaces",
              "Potential gradient",
            ],
          },
          {
            id: "capacitor",
            introducedIn: 2077,
            title: "Capacitor",
            hours: 5,
            topics: [
              "Capacitance and capacitor",
              "Parallel plate capacitor",
              "Combination of capacitors",
              "Energy of charged capacitor",
              "Effect of a dielectric: polarization and displacement",
            ],
          },
          {
            id: "dc-circuits",
            introducedIn: 2077,
            title: "DC Circuits",
            hours: 10,
            topics: [
              "Electric currents; drift velocity and its relation with current",
              "Ohm's law; electrical resistance; resistivity; conductivity",
              "Current-voltage relations; ohmic and non-ohmic resistance",
              "Resistances in series and parallel",
              "Potential divider",
              "Electromotive force of a source, internal resistance",
              "Work and power in electrical circuits",
            ],
          },
          {
            id: "nuclear-physics",
            introducedIn: 2077,
            title: "Nuclear Physics",
            hours: 4,
            topics: [
              "Nucleus: discovery of nucleus",
              "Nuclear density; mass number; atomic number",
              "Atomic mass; isotopes",
              "Einstein's mass-energy relation",
              "Mass defect, packing fraction, binding energy per nucleon",
              "Creation and annihilation",
              "Nuclear fission and fusion",
            ],
          },
          {
            id: "solids",
            introducedIn: 2077,
            title: "Solids",
            hours: 3,
            topics: [
              "Energy bands in solids (qualitative ideas)",
              "Difference between metals, insulators and semiconductors using band theory",
              "Intrinsic and extrinsic semiconductors",
            ],
          },
          {
            id: "recent-trends-in-physics",
            introducedIn: 2077,
            title: "Recent Trends in Physics",
            hours: 6,
            topics: [
              "Particle physics: particles and antiparticles, quarks (baryons and mesons) and leptons (neutrinos)",
              "Universe: Big Bang and Hubble law — expansion of the Universe",
              "Dark matter, black hole and gravitational wave",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "class-12-notes",
    name: "Class 12 Notes",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        description: "Official NEB Biology XII (Bio. 202) — Genetics, Evolution, Biotechnology, Human Physiology.",
        notesUrl: "/class-12-notes/biology",
        units: [
          {
            id: "heredity-and-evolution",
            introducedIn: 2078,
            title: "Heredity and Evolution",
            hours: 24,
            topics: [
              "Mendel's laws of inheritance — monohybrid and dihybrid cross",
              "Incomplete dominance and codominance",
              "Linkage and crossing over",
              "Sex determination and sex-linked disorders",
              "Chromosome theory of inheritance",
              "Molecular basis of inheritance: DNA structure, replication, transcription, translation, gene regulation",
              "Human genome project — objectives and significance",
              "Evolution: evidences, adaptive radiation, Hardy-Weinberg equilibrium, human evolution",
            ],
          },
          {
            id: "human-health-and-diseases",
            introducedIn: 2078,
            title: "Human Health and Diseases",
            hours: 10,
            topics: [
              "Pathogens and diseases: malaria, dengue, filariasis, ascariasis, pneumonia, typhoid, tuberculosis, common cold, AIDS, ringworm",
              "Immune system — innate and adaptive immunity",
              "Antigens and antibodies, immune response",
              "Vaccination and immunization",
              "Allergy and autoimmune diseases",
            ],
          },
          {
            id: "strategies-for-food-production",
            introducedIn: 2078,
            title: "Strategies for Enhancement in Food Production",
            hours: 6,
            topics: [
              "Plant breeding — methods and examples",
              "Single cell protein (SCP)",
              "Animal husbandry — breeds and management",
              "Biofertilizers and sustainable agriculture",
            ],
          },
          {
            id: "microbes-in-human-welfare",
            introducedIn: 2078,
            title: "Microbes in Human Welfare",
            hours: 5,
            topics: [
              "Microorganisms in household products",
              "Industrial production of antibiotics, alcoholic beverages, citric acid",
              "Microbes as biocontrol agents and biofertilizers",
              "Bioremediation, biogas",
            ],
          },
          {
            id: "biotechnology-principles",
            introducedIn: 2078,
            title: "Biotechnology — Principles and Processes",
            hours: 8,
            topics: [
              "Principles of biotechnology — recombinant DNA technology",
              "Tools: restriction enzymes, vectors, competent host",
              "Processes: DNA isolation, PCR, gel electrophoresis, gene transfer",
              "Applications of recombinant DNA technology",
            ],
          },
          {
            id: "biotechnology-applications",
            introducedIn: 2078,
            title: "Biotechnology and Its Applications",
            hours: 8,
            topics: [
              "Biotechnological applications in agriculture: Bt cotton, nematode-resistant tobacco",
              "Biotechnological applications in medicine: insulin, gene therapy, therapeutic proteins",
              "Transgenic animals",
              "Biopiracy and patent issues",
            ],
          },
          {
            id: "organisms-and-environment",
            introducedIn: 2078,
            title: "Organisms and Environment",
            hours: 10,
            topics: [
              "Adaptations of organisms to environmental conditions",
              "Population ecology — growth, regulation, interactions",
              "Ecosystem structure and function — productivity, decomposition",
              "Ecological succession",
              "Nutrient cycling — carbon, nitrogen, phosphorus",
              "Ecological pyramids and energy flow",
            ],
          },
          {
            id: "biodiversity-and-conservation",
            introducedIn: 2078,
            title: "Biodiversity and Conservation",
            hours: 6,
            topics: [
              "Biodiversity — genetic, species, and ecosystem levels",
              "Patterns of biodiversity — global and Nepal",
              "Biodiversity loss — causes and consequences",
              "Conservation strategies — in-situ and ex-situ",
              "Red Data Book and IUCN categories",
            ],
          },
          {
            id: "environmental-issues",
            introducedIn: 2078,
            title: "Environmental Issues",
            hours: 8,
            topics: [
              "Air pollution — causes, effects, and control",
              "Water pollution — causes, effects, and control",
              "Solid waste management",
              "Nuclear radiation hazards",
              "Greenhouse effect, global warming, climate change",
              "Ozone layer depletion",
              "Rainwater harvesting and wasteland development",
            ],
          },
        ],
      },
      {
        slug: "chemistry",
        name: "Chemistry",
        description: "Official NEB Chemistry XII (Che. 202) — Physical, Inorganic, Organic chemistry.",
        notesUrl: "/class-12-notes/chemistry",
        units: [
          {
            id: "solutions",
            introducedIn: 2078,
            title: "Solutions",
            hours: 7,
            topics: [
              "Types of solutions and expression of concentration",
              "Solubility of gases and solids in liquids",
              "Vapour pressure of solutions — Raoult's law",
              "Colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure",
              "Van't Hoff factor and abnormal molar masses",
            ],
          },
          {
            id: "electro-chemistry",
            introducedIn: 2078,
            title: "Electrochemistry",
            hours: 8,
            topics: [
              "Oxidation and reduction — electrode reactions",
              "Electrochemical cells — galvanic cell, cell potential, standard electrode potential",
              "Nernst equation and its applications",
              "Conductance of electrolytic solutions",
              "Electrolysis and Faraday's laws",
              "Batteries — primary and secondary cells",
              "Fuel cells",
            ],
          },
          {
            id: "chemical-kinetics",
            introducedIn: 2078,
            title: "Chemical Kinetics",
            hours: 6,
            topics: [
              "Rate of reaction — average and instantaneous rate",
              "Factors affecting rate of reaction",
              "Rate law and order of reaction",
              "Integrated rate equations — zero order and first order reactions",
              "Arrhenius equation and activation energy",
            ],
          },
          {
            id: "general-and-organic-fundamentals",
            introducedIn: 2078,
            title: "General and Fundamental Principles of Organic Chemistry",
            hours: 8,
            topics: [
              "Purification and qualitative/quantitative analysis of organic compounds",
              "Inductive effect, resonance, hyperconjugation",
              "Electrophilic and nucleophilic substitution reactions",
              "Free radical reactions",
              "Important organic reactions: oxidation, reduction, addition, elimination",
            ],
          },
          {
            id: "hydrocarbons",
            introducedIn: 2078,
            title: "Hydrocarbons",
            hours: 7,
            topics: [
              "Alkanes: conformations, combustion, free radical halogenation",
              "Alkenes: preparation, geometrical isomerism, electrophilic addition (Markovnikov, anti-Markovnikov), ozonolysis, polymerisation",
              "Alkynes: preparation, acidic character, addition reactions",
              "Aromatic hydrocarbons: benzene — resonance, aromaticity, electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts)",
            ],
          },
          {
            id: "alcohols-phenols-ethers",
            introducedIn: 2078,
            title: "Alcohols, Phenols and Ethers",
            hours: 7,
            topics: [
              "Alcohols: classification, preparation, physical and chemical properties",
              "Phenols: acidity, electrophilic substitution, Kolbe's reaction, Reimer-Tiemann reaction",
              "Ethers: preparation and chemical reactions (cleavage by HI)",
            ],
          },
          {
            id: "aldehydes-ketones-carboxylic-acids",
            introducedIn: 2078,
            title: "Aldehydes, Ketones and Carboxylic Acids",
            hours: 10,
            topics: [
              "Aldehydes and ketones: preparation, physical properties, nucleophilic addition reactions",
              "Carboxylic acids: preparation, physical properties, acidic character, reactions",
              "Name reactions: Aldol condensation, Cannizzaro reaction, HVZ reaction",
            ],
          },
          {
            id: "amines",
            introducedIn: 2078,
            title: "Amines",
            hours: 6,
            topics: [
              "Classification, nomenclature and preparation",
              "Physical and chemical properties",
              "Basic character of amines",
              "Reactions: diazotisation, coupling reactions, Hinsberg test",
            ],
          },
          {
            id: "biomolecules",
            introducedIn: 2078,
            title: "Biomolecules",
            hours: 5,
            topics: [
              "Carbohydrates: monosaccharides (glucose, fructose), disaccharides, polysaccharides",
              "Proteins: amino acids, peptide bond, primary to quaternary structure, denaturation",
              "Enzymes: definition, classification, enzyme action",
              "Vitamins: classification and functions",
              "Hormones: definition, types, functions",
            ],
          },
          {
            id: "chemistry-in-everyday-life",
            introducedIn: 2078,
            title: "Chemistry in Everyday Life",
            hours: 4,
            topics: [
              "Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, antacids",
              "Chemical cleansers — soaps and detergents",
              "Food additives — preservatives and artificial sweetening agents",
            ],
          },
          {
            id: "chemistry-of-element",
            introducedIn: 2078,
            title: "Chemistry of Element",
            hours: 8,
            topics: [
              "p-block elements (Group 15–18): important compounds, trends in properties",
              "d-block elements: general characteristics, important compounds (KMnO₄, K₂Cr₂O₇)",
              "f-block elements: lanthanoids and actinoids",
              "Coordination compounds: Werner's theory, IUPAC nomenclature, VBT, CFT (qualitative), isomerism",
            ],
          },
        ],
      },
      {
        slug: "english",
        name: "English",
        description: "Official NEB English XII (Eng. 004) — Section I: Language Development (20 thematic units); Section II: Literature (7 short stories, 5 poems, 5 essays, 3 one-act plays). CDC textbook first used 2078 BS (2021 AD).",
        notesUrl: "/class-12-notes/english",
        units: [
          {
            id: "language-development",
            introducedIn: 2078,
            title: "Section I — Language Development (Units 1–20)",
            topics: [
              "Unit 1 — Critical Thinking",
              "Unit 2 — Family",
              "Unit 3 — Sports",
              "Unit 4 — Technology",
              "Unit 5 — Education",
              "Unit 6 — Money and Economy",
              "Unit 7 — Humour",
              "Unit 8 — Human Culture",
              "Unit 9 — Ecology and Environment",
              "Unit 10 — Career Opportunities",
              "Unit 11 — Hobbies",
              "Unit 12 — Animal World",
              "Unit 13 — History",
              "Unit 14 — Human Rights",
              "Unit 15 — Leisure and Entertainment",
              "Unit 16 — Fantasy",
              "Unit 17 — War and Peace",
              "Unit 18 — Music and Creation",
              "Unit 19 — Migration and Diaspora",
              "Unit 20 — Power and Politics",
            ],
          },
          {
            id: "literary-analysis",
            introducedIn: 2078,
            title: "Section II — Literature (Stories · Poems · Essays · One-Act Plays)",
            topics: [
              "Short Story 1 — Neighbours (Tim Winton)",
              "Short Story 2 — A Respectable Woman (Kate Chopin)",
              "Short Story 3 — A Devoted Son (Anita Desai)",
              "Short Story 4 — The Treasure in the Forest (H. G. Wells)",
              "Short Story 5 — My Old Home (Lu Xun)",
              "Short Story 6 — The Half-closed Eyes of the Buddha and the Slowly Sinking Sun (Manjushree Thapa)",
              "Short Story 7 — A Very Old Man with Enormous Wings (Gabriel García Márquez)",
              "Poem 1 — A Day (Emily Dickinson)",
              "Poem 2 — Every Morning I Wake (Dylan Thomas)",
              "Poem 3 — I Was My Own Route (Julia de Burgos)",
              "Poem 4 — The Awakening Age (Ben Okri)",
              "Poem 5 — Soft Storm (Abhi Subedi)",
              "Essay 1 — On Libraries (Oliver Sacks)",
              "Essay 2 — Marriage as a Social Institution (Stephen L. Carter)",
              "Essay 3 — Knowledge and Wisdom (Bertrand Russell)",
              "Essay 4 — Humility (Yuval Noah Harari)",
              "Essay 5 — Human Rights and the Age of Inequality (Samuel Moyn)",
              "One-Act Play 1 — A Matter of Husbands (Ferenc Molnár)",
              "One-Act Play 2 — Facing Death (August Strindberg)",
              "One-Act Play 3 — The Bull (Bhimnidhi Tiwari)",
            ],
          },
          {
            id: "writing-skills",
            introducedIn: 2078,
            title: "Writing Skills",
            hours: 16,
            topics: [
              "Essay writing — argumentative, descriptive, narrative, expository",
              "Letter writing — formal and informal",
              "Email writing",
              "Report writing and summarisation",
              "Article writing",
              "Note-making and summary",
              "Story writing",
              "Speech and dialogue writing",
              "Review writing — book and film",
              "Comprehension and paraphrasing",
              "Grammar for writing — sentences, clauses, punctuation",
            ],
          },
          {
            id: "oral-communication",
            introducedIn: 2078,
            title: "Oral Communication",
            hours: 8,
            topics: [
              "Conversation and role play",
              "Presentation skills",
              "Debate and discussion",
              "Listening comprehension",
            ],
          },
          {
            id: "grammar",
            introducedIn: 2078,
            title: "Grammar",
            hours: 12,
            topics: [
              "Tenses and their uses",
              "Clauses and sentence types",
              "Voice and narration",
              "Modals and conditionals",
              "Punctuation and capitalisation",
            ],
          },
        ],
      },
      {
        slug: "mathematics",
        name: "Mathematics",
        description: "Official NEB Mathematics XII (Mat. 201) — Calculus, Vectors, Probability, Linear Programming.",
        notesUrl: "/class-12-notes/mathematics",
        units: [
          {
            id: "limits-and-continuity",
            introducedIn: 2078,
            title: "Limits and Continuity",
            hours: 8,
            topics: [
              "Concept of limit — geometric and physical interpretation",
              "Standard limits and evaluation (algebraic, trigonometric, exponential, logarithmic)",
              "Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0^0, ∞^0",
              "Continuity of algebraic, trigonometric, exponential, logarithmic functions",
              "Differentiability and its relation with continuity",
            ],
          },
          {
            id: "differentiation",
            introducedIn: 2078,
            title: "Differentiation",
            hours: 16,
            topics: [
              "Derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions",
              "Rules of differentiation: product rule, quotient rule, chain rule",
              "Derivatives of parametric and implicit functions",
              "Higher order derivatives",
              "Logarithmic differentiation",
              "Leibniz's theorem for nth derivative",
              "Geometric interpretation — tangent and normal",
              "Monotonicity, maxima and minima (first and second derivative tests)",
              "Applications: rate of change, approximation, error estimation",
            ],
          },
          {
            id: "integration",
            introducedIn: 2078,
            title: "Integration",
            hours: 14,
            topics: [
              "Integration as inverse of differentiation",
              "Standard integrals and methods: substitution, parts, partial fractions",
              "Definite integrals and properties",
              "Integration of trigonometric functions",
              "Applications: area under curve, area between two curves",
            ],
          },
          {
            id: "differential-equations",
            introducedIn: 2078,
            title: "Differential Equations",
            hours: 8,
            topics: [
              "Formation of differential equations",
              "Solving first order, first degree equations: variable separable, homogeneous, linear",
              "Applications: growth and decay, population dynamics",
            ],
          },
          {
            id: "vector-algebra",
            introducedIn: 2078,
            title: "Vector Algebra",
            hours: 8,
            topics: [
              "Scalar and vector quantities, types of vectors",
              "Addition, subtraction and scalar multiplication of vectors",
              "Dot product (scalar product) and its applications",
              "Cross product (vector product) and its applications",
              "Scalar and vector triple products",
              "Applications: work, torque, angular momentum",
            ],
          },
          {
            id: "three-dimensional-geometry",
            introducedIn: 2078,
            title: "Three Dimensional Geometry",
            hours: 8,
            topics: [
              "Direction cosines and direction ratios of a line",
              "Equation of a line in space — standard and general form",
              "Equation of a plane — normal form, general form",
              "Angle between two lines, two planes, and a line and a plane",
              "Distance of a point from a plane and line",
            ],
          },
          {
            id: "linear-programming",
            introducedIn: 2078,
            title: "Linear Programming",
            hours: 6,
            topics: [
              "Linear programming — formulation of LPP",
              "Graphical method for solving LPP with two variables",
              "Maximization and minimization problems",
            ],
          },
          {
            id: "probability",
            introducedIn: 2078,
            title: "Probability",
            hours: 10,
            topics: [
              "Conditional probability and multiplication theorem",
              "Independent events",
              "Bayes' theorem and its applications",
              "Random variable and its probability distribution",
              "Mean, variance and standard deviation of a random variable",
              "Binomial distribution — definition, mean, variance",
              "Poisson distribution — definition, mean, variance",
            ],
          },
        ],
      },
      {
        slug: "nepali",
        name: "Nepali",
        description: "Official NEB Nepali XII (Nep. 002) — निर्धारित १२ पाठ (कविता, कथा, निबन्ध, उपन्यास, जीवनी), व्याकरण र लेखन कौशल। CDC पाठ्यपुस्तक पहिलो प्रयोग २०७८ वि.सं. (२०२१)।",
        notesUrl: "/class-12-notes/nepali",
        units: [
          {
            id: "bhasha-tatha-vyakaran",
            introducedIn: 2078,
            title: "भाषा र व्याकरण",
            hours: 16,
            topics: [
              "शब्द-वर्ग, पद-वर्ग र पदबन्ध",
              "कारक, विभक्ति र समास (तत्पुरुष, कर्मधारय, द्वन्द्व, बहुव्रीहि)",
              "क्रिया — काल, वाच्य र पदबन्ध",
              "वाक्य रचना — सरल, मिश्रित र संयुक्त वाक्य; शुद्ध-अशुद्ध वाक्य",
              "मुहावरा, लोकोक्ति र शब्द-सम्पदा",
            ],
          },
          {
            id: "sahitya-adhyayan",
            introducedIn: 2078,
            title: "निर्धारित पाठ — पाठ्यपुस्तक पाठ १–१२",
            hours: 24,
            topics: [
              "पाठ १ — आमाको सपना (कविता, गोपालप्रसाद रिमाल)",
              "पाठ २ — विरहिणी दमयन्ती (कथा, मदनमणि दीक्षित)",
              "पाठ ३ — घनघस्याको उकालो काट्दा (निबन्ध)",
              "पाठ ४ — व्यावसायिक पत्र (पत्र लेखन)",
              "पाठ ५ — एक चिहान (उपन्यास, पारिजात)",
              "पाठ ६ — स्टिफन विलियम हकिङ (जीवनी)",
              "पाठ ७ — हामीलाई बोलाउँछन् हिमचुली (कविता, भूपी शेरचन)",
              "पाठ ८ — मातृत्व (निबन्ध)",
              "पाठ ९ — गोर्खे (कथा)",
              "पाठ १० — नेपाली पहिचान (निबन्ध)",
              "पाठ ११ — सहकारी (कथा)",
              "पाठ १२ — जीवन मार्ग (कविता)",
            ],
          },
          {
            id: "lekhan-koushal",
            introducedIn: 2078,
            title: "लेखन कौशल",
            hours: 10,
            topics: [
              "आवधिक निबन्ध लेखन",
              "पत्र लेखन — आधिकारिक र अनौपचारिक (व्यावसायिक पत्र सहित)",
              "प्रतिवेदन र सम्पादन लेखन",
              "समीक्षा र सारांश लेखन",
              "सृजनात्मक लेखन — कथा, कविता, संवाद",
            ],
          },
          {
            id: "sanskriti-tatha-samaj",
            introducedIn: 2078,
            title: "संस्कृति र समाज",
            hours: 6,
            topics: [
              "नेपाली संस्कृति, रीतिरिवाज र सामाजिक संरचना",
              "साहित्यमा सामाजिक वास्तविकताको प्रतिनिधित्व",
              "भाषा र पहिचान — नेपाली पहिचानका पाठहरूसँग सम्बन्ध",
            ],
          },
        ],
      },
      {
        slug: "physics",
        name: "Physics",
        description: "Official NEB Physics XII (Phy. 202) — Electrostatics, Current Electricity, Magnetism, EMI, AC, Optics, Modern Physics.",
        notesUrl: "/class-12-notes/physics",
        units: [
          {
            id: "electrostatics",
            introducedIn: 2078,
            title: "Electrostatics",
            hours: 10,
            topics: [
              "Coulomb's law and its applications",
              "Electric field and electric field intensity due to point charges, line charges, and charged sheets",
              "Electric potential and potential difference",
              "Capacitance and capacitors — parallel plate, series and parallel combination",
              "Dielectric and dielectric constant",
              "Energy stored in a capacitor",
            ],
          },
          {
            id: "current-electricity",
            introducedIn: 2078,
            title: "Current Electricity",
            hours: 10,
            topics: [
              "Electric current, drift velocity, and relaxation time",
              "Ohm's law and its limitations",
              "Resistance and resistivity — temperature dependence",
              "Series and parallel combination of resistors",
              "Kirchhoff's laws and their applications",
              "Electromotive force (emf), internal resistance, and cells in combination",
              "Wheatstone bridge and meter bridge",
              "Potentiometer and its applications",
            ],
          },
          {
            id: "magnetism-and-magnetic-effect",
            introducedIn: 2078,
            title: "Magnetism and Magnetic Effect of Current",
            hours: 12,
            topics: [
              "Magnetic field and magnetic force on moving charges",
              "Lorentz force and motion of charged particles in magnetic fields",
              "Biot-Savart law and its applications (straight wire, circular loop, solenoid)",
              "Ampere's circuital law and its applications",
              "Force between two parallel current-carrying conductors",
              "Moving coil galvanometer, ammeter, and voltmeter",
            ],
          },
          {
            id: "electromagnetic-induction",
            introducedIn: 2078,
            title: "Electromagnetic Induction",
            hours: 8,
            topics: [
              "Faraday's laws of electromagnetic induction",
              "Lenz's law and conservation of energy",
              "Self-induction and self-inductance",
              "Mutual induction and mutual inductance",
              "Growing and decaying current in LR circuits",
            ],
          },
          {
            id: "alternating-current",
            introducedIn: 2078,
            title: "Alternating Current",
            hours: 8,
            topics: [
              "AC voltage applied to resistor, inductor, and capacitor",
              "LC oscillations and resonance",
              "LCR series circuit and power factor",
              "Transformer — principle, types, and losses",
            ],
          },
          {
            id: "ray-optics",
            introducedIn: 2078,
            title: "Ray Optics",
            hours: 10,
            topics: [
              "Reflection at plane and curved surfaces — mirrors",
              "Refraction at plane surfaces — total internal reflection",
              "Refraction through prisms — angle of deviation and minimum deviation",
              "Thin lenses — lens maker's formula and power of lens",
              "Combination of lenses and mirrors",
              "Optical instruments — microscope and telescope",
            ],
          },
          {
            id: "wave-optics",
            introducedIn: 2078,
            title: "Wave Optics",
            hours: 8,
            topics: [
              "Wavefront and Huygens' principle",
              "Interference of light — Young's double slit experiment",
              "Diffraction of light — single slit diffraction",
              "Polarization — Brewster's law and polaroids",
            ],
          },
          {
            id: "modern-physics",
            introducedIn: 2078,
            title: "Modern Physics",
            hours: 12,
            topics: [
              "Photoelectric effect and Einstein's photoelectric equation",
              "De Broglie wavelength and matter waves",
              "Atom — Bohr's model and hydrogen spectrum",
              "Nucleus — binding energy, nuclear fission and fusion",
              "Semiconductors — intrinsic and extrinsic, p-n junction, diode, transistor",
              "Logic gates — AND, OR, NOT, NAND, NOR",
            ],
          },
          {
            id: "communication-systems",
            introducedIn: 2078,
            title: "Communication Systems",
            hours: 4,
            topics: [
              "Elements of a communication system",
              "Modulation — amplitude modulation and frequency modulation",
              "Bandwidth and propagation of electromagnetic waves",
            ],
          },
        ],
      },
    ],
  },
];

export const CLASS_TRACK_SLUGS = [
  "class-11-notes",
  "class-12-notes",
] as const;

export type ClassTrackSlug = (typeof CLASS_TRACK_SLUGS)[number];

export function isClassTrackSlug(value: string): value is ClassTrackSlug {
  return (CLASS_TRACK_SLUGS as readonly string[]).includes(value);
}

export type SyllabusTopicEntry = {
  slug: string;
  title: string;
  index: number;
};

export function slugifySyllabusTopic(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0900-\u097f]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
  return slug || "topic";
}

export function getUnitTopicEntries(unit: SyllabusUnit): SyllabusTopicEntry[] {
  const used = new Set<string>();
  return unit.topics.map((title, index) => {
    const slug = slugifySyllabusTopic(title);
    let unique = slug;
    let n = 2;
    while (used.has(unique)) {
      unique = `${slug}-${n++}`;
    }
    used.add(unique);
    return { slug: unique, title, index };
  });
}

export function getTopicEntryBySlug(
  unit: SyllabusUnit,
  topicSlug: string,
): SyllabusTopicEntry | undefined {
  // 1. Exact match first (fast path for full syllabus slugs).
  const exact = getUnitTopicEntries(unit).find((t) => t.slug === topicSlug);
  if (exact) return exact;

  // 2. Fallback: match by checking that each slug-word appears in the title.
  //    This bridges short manifest slugs (e.g. "biomolecules-functions") to
  //    the full syllabus slugs derived from long topic titles.
  const slugWords = topicSlug.toLowerCase().split(/[-]+/).filter(Boolean);
  if (slugWords.length === 0) return undefined;
  return getUnitTopicEntries(unit).find((t) => {
    const lowerTitle = t.title.toLowerCase();
    return slugWords.every((w) => lowerTitle.includes(w));
  });
}

export function getSyllabusByClass(classSlug: string): ClassSyllabus | undefined {
  return SYLLABUS.find((c) => c.slug === classSlug);
}

export function getSubjectSyllabus(classSlug: string, subjectSlug: string): SubjectSyllabus | undefined {
  const cls = getSyllabusByClass(classSlug);
  if (!cls) return undefined;
  return cls.subjects.find((s) => s.slug === subjectSlug);
}

export function getUnitSyllabus(subject: SubjectSyllabus, unitId: string): SyllabusUnit | undefined {
  return subject.units.find((u) => u.id === unitId);
}

/**
 * Flatten all units of a subject into a single list of topics (curriculum order).
 */
export function getSubjectTopics(subject: SubjectSyllabus): string[] {
  return subject.units.flatMap((unit) => unit.topics);
}