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
  subjects: SubjectSyllabus[];
  notesUrl?: string;
};

/**
 * Official NEB Class 11 syllabus — Grade 11 subjects.
 * Order of classes and units below MUST NOT be changed.
 */
export const SYLLABUS: ClassSyllabus[] = [
  {
    slug: "class-11e",
    name: "Class 11E",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        description: "NEB Biology XI (Bio. 201) — Botany (Biomolecules, Floral Diversity, Microbiology, Ecology, Vegetation) and Zoology (Intro, Evolution, Faunal Diversity, Biota, Conservation).",
        notesUrl: "/r-notes?subject=biology",
        units: [
          {
            id: "biomolecules-and-cell-biology",
            title: "Biomolecules and Cell Biology",
            hours: 15,
            topics: [
              "Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water",
              "Cell: introduction of cell, concepts of prokaryotic and eukaryotic cells",
              "Detail structure of eukaryotic cells: composition, structure and functions of cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions",
              "Cell division: concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances",
            ],
          },
          {
            id: "floral-diversity",
            title: "Floral Diversity",
            hours: 30,
            topics: [
              "Introduction: three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)",
              "Status of flora in Nepal and world representation",
              "Fungi: general introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes",
              "Structure and reproduction of Mucor and Yeast",
              "Introduction of Mushrooms, poisonous and non-poisonous mushrooms, economic importance of fungi",
              "Lichen: general introduction, characteristic features and economic importance of lichen",
              "Algae: general introduction and characteristic features of green, brown and red algae; structure and reproduction of Spirogyra; economic importance of algae",
              "Bryophyta: general introduction and characteristic features of liverworts, hornworts and moss; morphological structure and reproduction of Marchantia; economic importance of bryophytes",
              "Pteridophyta: general introduction and characteristic features of pteridophytes; morphological structure and reproduction of Dryopteris; economic importance of pteridophytes",
              "Gymnosperm: general introduction and characteristic features of Gymnosperms; morphology and reproduction of Pinus; economic importance of gymnosperm",
              "Angiosperm: morphology of root, stem, leaves, inflorescences, flowers and fruit",
              "Taxonomic study: definition, taxonomic hierarchy, classification systems (artificial, natural and phylogenetic) of angiosperms",
              "Angiosperm families with economic importance: Brassicaceae, Fabaceae, Solanaceae and Liliaceae",
            ],
          },
          {
            id: "introductory-microbiology",
            title: "Introductory Microbiology",
            hours: 5,
            topics: [
              "Monera: general introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)",
              "Virus: general introduction, structure and importance of virus, bacteriophage",
              "Impacts of biotechnology in the field of microbiology",
            ],
          },
          {
            id: "ecology",
            title: "Ecology",
            hours: 11,
            topics: [
              "Ecosystem ecology: concept of ecology, biotic and abiotic factors, species interactions",
              "Concept of ecosystem, structural and functional aspects of pond and forest ecosystem",
              "Food chain, food web, trophic level, ecological pyramids, productivity",
              "Biogeochemical cycles: carbon and nitrogen cycles; concept of succession",
              "Ecological adaptation: concept of adaptation, hydrophytes and xerophytes",
              "Ecological imbalances: greenhouse effects and climate change, depletion of ozone layer, acid rain and biological invasion",
            ],
          },
          {
            id: "vegetation",
            title: "Vegetation",
            hours: 3,
            topics: [
              "Vegetation: introduction, types of vegetation in Nepal",
              "In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation",
              "Natural environment-vegetation and human activities",
            ],
          },
          {
            id: "introduction-to-biology",
            title: "Introduction to Biology",
            hours: 2,
            topics: [
              "Introduction to Biology: scope and fields of biology",
              "Relation of biology with other sciences",
            ],
          },
          {
            id: "evolutionary-biology",
            title: "Evolutionary Biology",
            hours: 15,
            topics: [
              "Life and its origin: Oparin-Haldane theory, Miller and Urey's experiment",
              "Evidences of evolution: morphological, anatomical, paleontological, embryological and biochemical",
              "Theories of evolution: Lamarckism, Darwinism and concept of Neo-Darwinism",
              "Human evolution: position of man in animal kingdom",
              "Differences between new world monkeys and old-world monkeys, apes and man",
              "Evolution of modern man starting from anthropoid ancestor",
            ],
          },
          {
            id: "faunal-diversity",
            title: "Faunal Diversity",
            hours: 34,
            topics: [
              "Protista: outline classification. Protozoa: diagnostic features and classification up to class with examples",
              "Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle",
              "Economic importance of P. falciparum",
              "Animalia: level of organization, body plan, body symmetry, body cavity and segmentation in animals",
              "Diagnostic features and classification of phyla (up to class) with examples: Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata",
              "Earthworm (Pheretima posthuma): habit and habitat, external features; digestive system (alimentary canal and physiology of digestion)",
              "Earthworm: excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral nervous system, working mechanism); reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance",
              "Frog (Rana tigrina): habit and habitat, external features; digestive system (alimentary canal, digestive glands and physiology of digestion); blood vascular system (structure and working mechanism of heart); respiratory system (respiratory organs and physiology of respiration); reproductive system (male and female reproductive organs)",
            ],
          },
          {
            id: "biota-and-environment",
            title: "Biota and Environment",
            hours: 10,
            topics: [
              "Animal adaptation: aquatic (primary and secondary), terrestrial (cursorial, fossorial and arboreal) and volant adaptation",
              "Animal behavior: reflex action, taxes, dominance and leadership; fish and bird migration",
              "Environmental pollution: sources, effects and control measures of air, water and soil pollution; pesticides and their effects",
            ],
          },
          {
            id: "conservation-biology",
            title: "Conservation Biology",
            hours: 3,
            topics: [
              "Conservation biology: concept of biodiversity, biodiversity conservation",
              "National parks, wildlife reserves, conservation areas, biodiversity hotspots, wetland and Ramsar sites",
              "Wildlife: importance, causes of extinction and conservation strategies",
              "IUCN categories of threatened species: meaning of extinct, endangered, vulnerable, rare and threatened species",
              "Endangered species in Nepal",
            ],
          },
        ],
      },
      {
        slug: "chemistry",
        name: "Chemistry",
        description: "NEB Chemistry XI (Che. 201) — General/Physical, Inorganic, Organic and Applied chemistry.",
        notesUrl: "/r-notes?subject=chemistry",
        units: [
          {
            id: "foundation-and-fundamentals",
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
            title: "States of Matter",
            hours: 8,
            topics: [
              "Gaseous state: kinetic theory of gas and its postulates",
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
            title: "Fundamentals of Applied Chemistry",
            hours: 4,
            topics: [
              "Chemical industry and its importance",
              "Stages in producing a new product",
              "Economics of production",
              "Cash flow in the production cycle",
              "Running a chemical plant",
              "Designing a chemical plant",
              "Continuous and batch processing",
              "Environmental impact of the chemical industry",
            ],
          },
          {
            id: "modern-chemical-manufactures",
            title: "Modern Chemical Manufactures",
            hours: 11,
            topics: [
              "Manufacture of ammonia by Haber's process",
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
        description: "NEB English XI — Listening, Speaking, Reading, Writing and Literature.",
        notesUrl: "/r-notes?subject=english",
        units: [
          {
            id: "listening-and-speaking",
            title: "Listening and Speaking",
            hours: 20,
            topics: [
              "Listening comprehension: understanding instructions, conversations, speeches and presentations",
              "Speaking skills: self-introduction, giving directions, role play, group discussion, debate",
              "Pronunciation, intonation and stress",
              "Functional language: making requests, giving advice, expressing opinions, agreeing and disagreeing",
            ],
          },
          {
            id: "reading-and-vocabulary",
            title: "Reading and Vocabulary",
            hours: 20,
            topics: [
              "Reading comprehension: fiction and non-fiction passages",
              "Skimming and scanning techniques",
              "Vocabulary building: synonyms, antonyms, homonyms, word formation",
              "Contextual meaning of words",
            ],
          },
          {
            id: "writing-skills",
            title: "Writing Skills",
            hours: 20,
            topics: [
              "Paragraph writing: unity, coherence, unity of purpose",
              "Letter writing: formal and informal letters",
              "Email and message writing",
              "Summary writing and note-making",
              "Article and report writing",
              "Caption writing and visual response",
            ],
          },
          {
            id: "grammar",
            title: "Grammar",
            hours: 20,
            topics: [
              "Tenses: present, past and future tenses and their uses",
              "Voice: active and passive voice",
              "Narration: direct and indirect speech",
              "Clauses: noun, adjective and adverb clauses",
              "Modals and their uses",
              "Prepositions and conjunctions",
              "Punctuation and capitalisation",
            ],
          },
          {
            id: "literature",
            title: "Literature",
            hours: 20,
            topics: [
              "Prose: comprehension, analysis and appreciation of prescribed prose passages",
              "Poetry: poetic devices, themes and interpretation of prescribed poems",
              "Drama: understanding dramatic elements and characters",
              "Short stories: plot, characterisation and theme",
            ],
          },
        ],
      },
      {
        slug: "mathematics",
        name: "Mathematics",
        description: "NEB Mathematics XI (Mat. 101) — Sets, Trigonometry, Analytic Geometry, Vectors, Statistics and Calculus.",
        notesUrl: "/r-notes?subject=mathematics",
        units: [
          {
            id: "set-theory",
            title: "Set Theory",
            hours: 8,
            topics: [
              "Sets and its types: empty set, finite and infinite sets, equal sets",
              "Subset, power set and universal set",
              "Union, intersection, difference and complement of sets",
              "Venn diagram and its applications",
              "Cardinality of sets and application to word problems",
            ],
          },
          {
            id: "logarithm",
            title: "Logarithm",
            hours: 6,
            topics: [
              "Exponent and its laws",
              "Logarithm: definition and fundamental laws",
              "Change of base and application",
              "Solving exponential and logarithmic equations",
            ],
          },
          {
            id: "complex-numbers",
            title: "Complex Numbers",
            hours: 6,
            topics: [
              "Need of complex numbers and its definition",
              "Algebraic operations on complex numbers",
              "Conjugate and modulus of a complex number",
              "Representation on Argand plane",
              "Square root of a complex number",
            ],
          },
          {
            id: "matrices-and-determinants",
            title: "Matrices and Determinants",
            hours: 12,
            topics: [
              "Matrix: types of matrices, operations on matrices",
              "Transpose, symmetric and skew-symmetric matrices",
              "Determinant of a matrix: properties and applications",
              "Inverse of a matrix and its application in solving system of linear equations",
            ],
          },
          {
            id: "factorisation-and-remainder-theorem",
            title: "Factorisation and Remainder Theorem",
            hours: 6,
            topics: [
              "Factor theorem and its application",
              "Remainder theorem and its application",
              "Factorisation of polynomials",
              "Applications in solving equations",
            ],
          },
          {
            id: "linear-equations-and-inequalities",
            title: "Linear Equations and Inequalities",
            hours: 8,
            topics: [
              "Solution of linear equations in two variables",
              "Graphical solution of linear equations",
              "Linear inequalities: solution and graphical representation",
              "System of linear inequalities",
            ],
          },
          {
            id: "permutation-and-combination",
            title: "Permutation and Combination",
            hours: 10,
            topics: [
              "Fundamental principles of counting: multiplication and addition rules",
              "Permutation: definition, formula and application",
              "Combination: definition, formula and application",
              "Difference between permutation and combination",
            ],
          },
          {
            id: "binomial-theorem",
            title: "Binomial Theorem",
            hours: 8,
            topics: [
              "Binomial theorem for positive integral index",
              "General term and middle term",
              "Properties of binomial coefficients",
              "Applications of binomial theorem",
            ],
          },
          {
            id: "sequence-and-series",
            title: "Sequence and Series",
            hours: 10,
            topics: [
              "Sequence: arithmetic progression (AP) and geometric progression (GP)",
              "nth term and sum of n terms of AP and GP",
              "Arithmetic mean and geometric mean",
              "Sum of special series: sum of first n natural numbers, squares and cubes",
            ],
          },
          {
            id: "trigonometry",
            title: "Trigonometry",
            hours: 20,
            topics: [
              "Trigonometric ratios and their reciprocals",
              "Trigonometric identities and their proofs",
              "General solution of trigonometric equations",
              "Properties of triangles: sine rule, cosine rule and projection rule",
              "Inverse trigonometric functions: definition, domain, range and graphical representation",
              "Trigonometric equations and their solutions",
            ],
          },
          {
            id: "analytic-geometry",
            title: "Analytic Geometry",
            hours: 20,
            topics: [
              "Straight line: slope, various forms of equation of a line, angle between two lines",
              "Distance of a point from a line",
              "Pair of straight lines: general equation, angle between them",
              "Coordinates in space: distance between two points, direction cosines and ratios",
            ],
          },
          {
            id: "vectors",
            title: "Vectors",
            hours: 12,
            topics: [
              "Scalar and vector quantities",
              "Addition and subtraction of vectors",
              "Scalar (dot) product and its applications",
              "Vector (cross) product and its applications",
              "Scalar and vector triple products",
              "Collinear and non-collinear vectors, coplanar and non-coplanar vectors",
            ],
          },
          {
            id: "statistics-and-probability",
            title: "Statistics and Probability",
            hours: 12,
            topics: [
              "Data presentation: frequency distribution, histograms and frequency polygons",
              "Measures of central tendency: mean, median and mode",
              "Measure of dispersion: range, standard deviation, variance, coefficient of variation",
              "Correlation: Pearson's coefficient of correlation",
              "Probability: sample space, events, addition and multiplication theorems",
            ],
          },
          {
            id: "calculus",
            title: "Calculus",
            hours: 48,
            topics: [
              "Limits: definition, standard limits, evaluation of limits",
              "Continuity: definition, types of discontinuity, continuity of algebraic, trigonometric, exponential and logarithmic functions",
              "Differentiation: definition, geometric interpretation, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions",
              "Rules of differentiation: product rule, quotient rule, chain rule",
              "Derivatives of parametric and implicit functions",
              "Higher order derivatives",
              "Applications of derivatives: rate of change, maxima and minima, monotonicity",
              "Integration: indefinite integral, standard integrals, integration by substitution and by parts",
              "Definite integral and its properties",
              "Applications of integration: area under curve, area between two curves",
            ],
          },
          {
            id: "mathematical-reasoning",
            title: "Mathematical Reasoning",
            hours: 6,
            topics: [
              "Statement and its negation",
              "Compound statements: conjunction, disjunction, implication and biconditional",
              "Quantifiers: universal and existential",
              "Valid arguments and counterexamples",
            ],
          },
        ],
      },
      {
        slug: "nepali",
        name: "Nepali",
        description: "NEB Nepali XI — भान्सा, व्यायरन, सान्हित्य, लेखन र सान्सकृति।",
        notesUrl: "/r-notes?subject=nepali",
        units: [
          {
            id: "bhasha-ra-vyakaran",
            title: "भान्सा र व्यायरन",
            hours: 30,
            topics: [
              "शब्द र उसको विभान्ग — नाम, सर्वनाम, विशेषण, क्रियා, विभकृति, अव्यय",
              "समास — तत्पुरुष, बहुव्ररीहि, करमधाय, दवन्द्व र अव्ययीभाव समास",
              "वाक्य र उसको विध — सरल, योजित र संकर वाक्य",
              "मुहांवा र वाङ्मय प्रयोग",
              "शब्दकोश, समानार्थी र विरुतार्थी शब्द",
            ],
          },
          {
            id: "sahitya-adhyayan",
            title: "साहित्य अध्ययन",
            hours: 40,
            topics: [
              "कविता र गीत: रस, अलंकार, छन्दको अवधारणा",
              "निरूपित पाठ: कथा, उपन्यास, नाटकको अध्ययन",
              "व्यंग्य साहित्यको अध्ययन",
              "आधुनिक नेपाली साहित्यको इतिहान",
              "सान्स्कृतिक साहित्य र त्यसको प्रभाव",
            ],
          },
          {
            id: "lekhan-koushal",
            title: "लेखन कौशल",
            hours: 20,
            topics: [
              "आवधिक निबन्ध लेखन",
              "पत्र लेखन (आधिकारिक र अनौपचारिक)",
              "प्रेषणातमक लेखन",
              "समावेशक लेखन",
              "अनुवाद कौशल",
            ],
          },
          {
            id: "sanskriti-tatha-samaj",
            title: "सान्सकृति र सामान",
            hours: 10,
            topics: [
              "नेपाली सान्सकृति र परम्परा",
              "भारतीय सान्सकृतिक प्रभाव",
              "सामाजिक परिवर्तन र नेपाली साहित्य",
            ],
          },
        ],
      },
      {
        slug: "physics",
        name: "Physics",
        description: "NEB Physics XI (Phy. 101) — Mechanics, Heat, Waves/Optics, Electricity & Modern Physics.",
        notesUrl: "/r-notes?subject=physics",
        units: [
          {
            id: "physical-quantities",
            title: "Physical Quantities",
            hours: 3,
            topics: [
              "Precision and significant figures",
              "Dimensions and uses of dimensional analysis",
            ],
          },
          {
            id: "vectors",
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
            title: "Reflection at Curved Mirror",
            hours: 2,
            topics: [
              "Real and virtual images",
              "Mirror formula",
            ],
          },
          {
            id: "refraction-at-plane-surfaces",
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
        notesUrl: "/r-notes?subject=biology",
        units: [
          {
            id: "heredity-and-evolution",
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
        notesUrl: "/r-notes?subject=chemistry",
        units: [
          {
            id: "solutions",
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
        description: "Official NEB English XII — Literature, language skills, and critical analysis.",
        notesUrl: "/r-notes?subject=english",
        units: [
          {
            id: "literary-analysis",
            title: "Literary Analysis",
            hours: 20,
            topics: [
              "Prose: comprehension, analysis, and appreciation",
              "Poetry: poetic devices, themes, and interpretation",
              "Drama: structure, characters, and dramatic devices",
              "Novel study: plot, characterisation, and narrative techniques",
            ],
          },
          {
            id: "writing-skills",
            title: "Writing Skills",
            hours: 16,
            topics: [
              "Essay writing — argumentative, descriptive, narrative, expository",
              "Letter writing — formal and informal",
              "Report writing and summarisation",
              "Note-making and article writing",
            ],
          },
          {
            id: "oral-communication",
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
        notesUrl: "/r-notes?subject=mathematics",
        units: [
          {
            id: "limits-and-continuity",
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
        description: "Official NEB Nepali XII — भाषा, साहित्य, व्यङ्ग्य, र लेखन कौशल।",
        notesUrl: "/r-notes?subject=nepali",
        units: [
          {
            id: "bhasha-tatha-vyakaran",
            title: "भाषा र व्यायरन",
            hours: 16,
            topics: [
              "शब्द र उसको विभाग",
              "पद विभक्त र तत्पुरुष समास",
              "बहुव्रीहि, कर्मधारय, द्वन्द्व समास",
              "क्रिया र तत्सम्बन्धी विषय",
              "वाक्य र उसको विध",
              "मुहावा र वाङ्मय प्रयोग",
            ],
          },
          {
            id: "sahitya-adhyayan",
            title: "साहित्य अध्‍ययन",
            hours: 24,
            topics: [
              "कविता र गीत: रस, अलङ्कार, छन्द",
              "निर्धारित पाठ: कथा, उपन्यास, नाटक",
              "व्यङ्ग्य साहित्यको अध्‍ययन",
              "आधुनिक नेपाली साहित्यको इतिहास",
              "निबन्ध र लेखन कौशल",
            ],
          },
          {
            id: "lekhan-koushal",
            title: "लेखन कौशल",
            hours: 10,
            topics: [
              "आवधिव निबन्ध लेखन",
              "पत्र लेखन (आधिकारिक र अनौपचारिक)",
              "प्रेषणात्मक लेखन",
              "समावेशक लेखन",
            ],
          },
          {
            id: "sanskriti-tatha-samaj",
            title: "संस्कृति र सामाज",
            hours: 6,
            topics: [
              "नेपाली संस्कृति र परम्परा",
              "भारतीय सांस्कृतिक प्रभाव",
              "सामाजिक परिवर्तन र नेपाली साहित्य",
            ],
          },
        ],
      },
      {
        slug: "physics",
        name: "Physics",
        description: "Official NEB Physics XII (Phy. 202) — Electrostatics, Current Electricity, Magnetism, EMI, AC, Optics, Modern Physics.",
        notesUrl: "/r-notes?subject=physics",
        units: [
          {
            id: "electrostatics",
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
  {
    slug: "class-12e",
    name: "Class 12E",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        description: "NEB Biology XII extended — same core syllabus with advanced topics.",
        notesUrl: "/r-notes?subject=biology",
        units: [
          {
            id: "heredity-and-evolution",
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
        description: "NEB Chemistry XII extended — same core syllabus with advanced problem sets.",
        notesUrl: "/r-notes?subject=chemistry",
        units: [
          {
            id: "solutions",
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
        description: "NEB English XII extended — same core syllabus.",
        notesUrl: "/r-notes?subject=english",
        units: [
          {
            id: "literary-analysis",
            title: "Literary Analysis",
            hours: 20,
            topics: [
              "Prose: comprehension, analysis, and appreciation",
              "Poetry: poetic devices, themes, and interpretation",
              "Drama: structure, characters, and dramatic devices",
              "Novel study: plot, characterisation, and narrative techniques",
            ],
          },
          {
            id: "writing-skills",
            title: "Writing Skills",
            hours: 16,
            topics: [
              "Essay writing — argumentative, descriptive, narrative, expository",
              "Letter writing — formal and informal",
              "Report writing and summarisation",
              "Note-making and article writing",
            ],
          },
          {
            id: "oral-communication",
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
        description: "NEB Mathematics XII extended — same core syllabus with advanced problem sets.",
        notesUrl: "/r-notes?subject=mathematics",
        units: [
          {
            id: "limits-and-continuity",
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
        description: "NEB Nepali XII extended — same core syllabus.",
        notesUrl: "/r-notes?subject=nepali",
        units: [
          {
            id: "bhasha-tatha-vyakaran",
            title: "भान्सा र व्यायरन",
            hours: 16,
            topics: [
              "शब्द र उसको विभाग",
              "पद विभक्ति र तत्पुरुष समास",
              "बहुव्रीहि, कर्मधारय, द्वन्द्व समास",
              "क्रिया र तत्सम्बन्धी विषय",
              "वाक्य र उसको विध",
              "मुहावा र वाङ्मय प्रयोग",
            ],
          },
          {
            id: "sahitya-adhyayan",
            title: "साहित्य अध्ययन",
            hours: 24,
            topics: [
              "कविता र गीत: रस, अलङ्कार, छन्द",
              "निरूपित पाठ: कथा, उपन्यास, नाटक",
              "व्यंग्य साहित्यको अध्ययन",
              "आधुनिक नेपाली साहित्यको इतिहास",
              "निबन्ध र लेखन कौशल",
            ],
          },
          {
            id: "lekhan-koushal",
            title: "लेखन कौशल",
            hours: 10,
            topics: [
              "आवधिक निबन्ध लेखन",
              "पत्र लेखन (आधिकारिक र अनौपचारिक)",
              "प्रेषणात्मक लेखन",
              "समावेशक लेखन",
            ],
          },
          {
            id: "sanskriti-tatha-samaj",
            title: "संस्कृति र सामाज",
            hours: 6,
            topics: [
              "नेपाली संस्कृति र परम्परा",
              "भारतीय सांस्कृतिक प्रभाव",
              "सामाजिक परिवर्तन र नेपाली साहित्य",
            ],
          },
        ],
      },
      {
        slug: "physics",
        name: "Physics",
        description: "NEB Physics XII extended — same core syllabus with advanced problem sets and lab extensions.",
        notesUrl: "/r-notes?subject=physics",
        units: [
          {
            id: "electrostatics",
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
  {
    slug: "class-12-more",
    name: "Class 12 More",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        description: "Supplementary biology resources and advanced practical work.",
        units: [
          {
            id: "general-topics",
            title: "General Topics",
            topics: ["Advanced Concept Maps", "Diagram Practice and Labeling", "Case Studies", "Research Projects", "Field Work and Surveys", "Recent Scientific Advances", "Quick Revision Notes", "Medical Entrance Prep", "Laboratory Skills Enhancement"],
          },
        ],
      },
      {
        slug: "chemistry",
        name: "Chemistry",
        description: "Supplementary chemistry resources and advanced practice problems.",
        units: [
          {
            id: "general-topics",
            title: "General Topics",
            topics: ["Advanced Problem Solving", "Reaction Mechanisms", "Inorganic Chemistry Trends", "Organic Synthesis", "Analytical Techniques", "Chemistry Projects", "Laboratory Manual", "Quick Revision Notes", "Medical Entrance Prep"],
          },
        ],
      },
      {
        slug: "english",
        name: "English",
        description: "Supplementary English language and advanced literature resources.",
        units: [
          {
            id: "general-topics",
            title: "General Topics",
            topics: ["Advanced Vocabulary", "Writing Mastery", "Literature Circles", "Debate and Oratory", "Drama and Performance", "Research Projects", "Quick Revision Notes", "Grammar and Style", "Reading Marathon"],
          },
        ],
      },
      {
        slug: "mathematics",
        name: "Mathematics",
        description: "Supplementary mathematics resources and advanced practice problems.",
        units: [
          {
            id: "general-topics",
            title: "General Topics",
            topics: ["Advanced Problem Solving", "Graphical Methods", "Mathematical Modeling", "Puzzle and Logic", "Math Projects", "Engineering Mathematics", "Quick Revision Notes", "Formula Handbook", "Competitive Mathematics"],
          },
        ],
      },
      {
        slug: "nepali",
        name: "Nepali",
        description: "Supplementary Nepali language and advanced literature resources.",
        units: [
          {
            id: "general-topics",
            title: "General Topics",
            topics: ["उन्नत शब्द जगत", "लेखन कौशल", "साहित्यिक चर्चा", "वाद-विवाद र भाषण", "नाटक र प्रदर्शन", "अनुसन्धान परियोजना", "द्रुत पुनरावृत्ति", "शैली र व्याकरण", "पाठ महोत्सव"],
          },
        ],
      },
      {
        slug: "physics",
        name: "Physics",
        description: "Supplementary physics resources and advanced practice problems.",
        units: [
          {
            id: "general-topics",
            title: "General Topics",
            topics: ["Advanced Numerical Problems", "Conceptual Deep Dive", "Previous Year Board Questions", "Mock Tests and Solutions", "Physics Projects and Models", "Laboratory Manual", "Formula and Constants", "Quick Revision Notes", "Engineering Entrance Prep"],
          },
        ],
      },
    ],
  },
];

export const CLASS_TRACK_SLUGS = [
  "class-11e",
  "class-12-notes",
  "class-12e",
  "class-12-more",
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
    // eslint-disable-next-line no-misleading-character-class -- class intentionally covers Devanagari incl. combining marks (Mn); excluding them would change matching
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
  return getUnitTopicEntries(unit).find((t) => t.slug === topicSlug);
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