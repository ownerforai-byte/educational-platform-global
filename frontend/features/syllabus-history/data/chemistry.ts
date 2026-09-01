/**
 * NEB Chemistry Syllabus — extracted from official & third-party sources (2076/2081 BS)
 *
 * Sources:
 *   - https://www.dhanraj.com.np/2026/06/NEB-Grade-11-Chemistry-Al-Units-Notes.html  (Grade 11 chapters)
 *   - https://esikhcha.com/hseb-syllabus-nepal/  (Subject codes Che. 301 / Che. 302)
 *   - https://www.dhanraj.com.np/2026/03/Chemistry-General-Stream-Question-Paper-2082-2025-of-Class-12-NEB.html  (Grade 12 2082 paper confirms current topics)
 *
 * Cross-referenced with frontend/lib/syllabus.ts (single source of truth for unit/topic ordering).
 */

export type SyllabusTopic = {
  slug: string;
  title: string;
  hours?: number;
  /** Set when a topic was added in a specific year vs baseline. */
  addedInYear?: number;
  /** Set when a topic was removed in a specific year vs previous. */
  removedInYear?: number;
  /** Set when a topic's scope/wording changed (modified). */
  modifiedInYear?: number;
};

export type SyllabusUnit = {
  id: string;
  title: string;
  hours: number;
  topics: SyllabusTopic[];
};

export type SyllabusVersion = {
  year: number;
  bsYear: string;
  isLatest: boolean;
  units: SyllabusUnit[];
  notes?: string;
};

export type GradeLevel = "11" | "12";

export type SubjectChemistryData = {
  grade: GradeLevel;
  subjectCode: string;
  versions: SyllabusVersion[];
};

/**
 * NEB Class 11 Chemistry (Che. 301) — 2076 baseline vs 2081 revision
 * 17 units, ~138 teaching hours
 */
export const CHEMISTRY_11_DATA: SubjectChemistryData = {
  grade: "11",
  subjectCode: "Che. 301",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "First comprehensive NCF 2076 curriculum for Grade 11 Chemistry.",
      units: [
        {
          id: "foundation-and-fundamentals",
          title: "Foundation and Fundamentals",
          hours: 2,
          topics: [
            { slug: "gen-intro-chemistry", title: "General introduction of chemistry", hours: 1 },
            { slug: "importance-scope-chemistry", title: "Importance and scope of chemistry", hours: 1 },
          ],
        },
        {
          id: "basic-concepts",
          title: "Basic Concepts of Chemistry",
          hours: 4,
          topics: [
            { slug: "atoms-molecules", title: "Basic concepts of chemistry: atoms, molecules, relative masses of atoms and molecules, atomic mass unit (amu)", hours: 2 },
            { slug: "radicals-formulas", title: "Radicals, molecular formula, empirical formula", hours: 1 },
            { slug: "percentage-composition", title: "Percentage composition from molecular formula", hours: 1 },
          ],
        },
        {
          id: "stoichiometry",
          title: "Stoichiometry",
          hours: 8,
          topics: [
            { slug: "dalton-atomic-theory", title: "Dalton's atomic theory and its postulates", hours: 1 },
            { slug: "laws-stoichiometry", title: "Laws of stoichiometry", hours: 1 },
            { slug: "avogadro-law", title: "Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles", hours: 2 },
            { slug: "mole-concept", title: "Mole and its relation with mass, volume and number of particles", hours: 1 },
            { slug: "mole-calculations", title: "Calculations based on mole concept", hours: 1 },
            { slug: "limiting-reactant", title: "Limiting reactant and excess reactant", hours: 1 },
            { slug: "theoretical-experimental-yield", title: "Theoretical yield, experimental yield and % yield", hours: 1 },
          ],
        },
        {
          id: "atomic-structure",
          title: "Atomic Structure",
          hours: 8,
          topics: [
            { slug: "rutherford-model", title: "Rutherford's atomic model and its limitations", hours: 1 },
            { slug: "bohr-model", title: "Postulates of Bohr's atomic model and its application", hours: 1 },
            { slug: "hydrogen-spectrum", title: "Spectrum of hydrogen atom", hours: 1 },
            { slug: "defects-bohr-theory", title: "Defects of Bohr's theory", hours: 1 },
            { slug: "de-broglie-wave", title: "Elementary idea of quantum mechanical model: de Broglie's wave equation", hours: 1 },
            { slug: "heisenberg-uncertainty", title: "Heisenberg's Uncertainty Principle and concept of probability", hours: 1 },
            { slug: "quantum-numbers", title: "Quantum numbers", hours: 1 },
            { slug: "orbitals-shape", title: "Orbitals and shape of s and p orbitals only", hours: 1 },
            { slug: "electronic-config", title: "Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)", hours: 1 },
          ],
        },
        {
          id: "classification-elements-periodic-table",
          title: "Classification of Elements and Periodic Table",
          hours: 5,
          topics: [
            { slug: "modern-periodic-law", title: "Modern periodic law and modern periodic table", hours: 1 },
            { slug: "groups-periods-blocks", title: "Classification of elements into different groups, periods and blocks", hours: 1 },
            { slug: "iupac-classification", title: "IUPAC classification of elements", hours: 1 },
            { slug: "nuclear-charge-effective", title: "Nuclear charge and effective nuclear charge", hours: 1 },
            { slug: "periodic-trends", title: "Periodic trend and periodicity: atomic radii, ionic radii, ionization energy, electron affinity, electronegativity, metallic characters (general trend and explanation only)", hours: 1 },
          ],
        },
        {
          id: "chemical-bonding-shapes",
          title: "Chemical Bonding and Shapes of Molecules",
          hours: 9,
          topics: [
            { slug: "valence-shell-octet", title: "Valence shell, valence electron and octet theory", hours: 1 },
            { slug: "ionic-bond", title: "Ionic bond and its properties", hours: 1 },
            { slug: "covalent-coordinate-bond", title: "Covalent bond and coordinate covalent bond; properties of covalent compounds", hours: 1 },
            { slug: "lewis-dot-structure", title: "Lewis dot structure of some common compounds of s and p block elements", hours: 1 },
            { slug: "resonance", title: "Resonance", hours: 1 },
            { slug: "vsepr-theory", title: "VSEPR theory and shapes of simple molecules (BeF2, BF3, CH4, CH3Cl, PCl5, SF6, H2O, NH3, CO2, H2S, PH3)", hours: 2 },
            { slug: "valence-bond-theory", title: "Elementary idea of Valence Bond Theory", hours: 1 },
            { slug: "hybridization", title: "Hybridization involving s and p orbitals only", hours: 1 },
            { slug: "bond-characteristics", title: "Bond characteristics: bond length, ionic character, dipole moment", hours: 1 },
            { slug: "vanderwaals-hydrogen-bond", title: "Vander Waal's force and molecular solids; hydrogen bonding and its application", hours: 1 },
            { slug: "metallic-bonding", title: "Metallic bonding and properties of metallic solids", hours: 1 },
          ],
        },
        {
          id: "oxidation-reduction",
          title: "Oxidation and Reduction",
          hours: 5,
          topics: [
            { slug: "gen-electronic-ox-red", title: "General and electronic concept of oxidation and reduction", hours: 1 },
            { slug: "oxidation-number", title: "Oxidation number and rules for assigning oxidation number", hours: 1 },
            { slug: "balancing-redox", title: "Balancing redox reactions by oxidation number and ion-electron (half reaction) method", hours: 1 },
            { slug: "electrolysis-qualitative", title: "Electrolysis: qualitative aspect", hours: 1 },
            { slug: "electrolysis-quantitative", title: "Electrolysis: quantitative aspect (Faraday's laws of electrolysis)", hours: 1 },
          ],
        },
        {
          id: "states-of-matter",
          title: "States of Matter",
          hours: 8,
          topics: [
            { slug: "kinetic-theory-gas", title: "Gaseous state: Kinetic theory of gas and its postulates", hours: 1 },
            { slug: "gas-laws", title: "Gas laws: Boyle's law, Charles' law, Avogadro's law, combined gas equation, Dalton's law of partial pressure, Graham's law of diffusion", hours: 2 },
            { slug: "ideal-gas-equation", title: "Ideal gas and ideal gas equation; universal gas constant and its significance", hours: 1 },
            { slug: "real-gas-deviation", title: "Deviation of real gas from ideality (solving related numerical problems based on gas laws)", hours: 1 },
            { slug: "liquid-state", title: "Liquid state: physical properties of liquids — evaporation and condensation, vapour pressure and boiling point, surface tension and viscosity (qualitative idea only)", hours: 1 },
            { slug: "liquid-crystals", title: "Liquid crystals and their applications", hours: 1 },
            { slug: "solid-state", title: "Solid state: types of solids, amorphous and crystalline solids", hours: 1 },
            { slug: "efflorescent-deliquescent", title: "Efflorescent, deliquescent and hygroscopic solids; crystallization and crystal growth; water of crystallization", hours: 1 },
            { slug: "unit-cell", title: "Introduction to unit crystal lattice and unit cell", hours: 1 },
          ],
        },
        {
          id: "chemical-equilibrium",
          title: "Chemical Equilibrium",
          hours: 3,
          topics: [
            { slug: "phys-chem-equilibrium", title: "Physical and chemical equilibrium; dynamic nature of chemical equilibrium", hours: 1 },
            { slug: "law-mass-action", title: "Law of mass action", hours: 1 },
            { slug: "equilibrium-constant", title: "Expression for equilibrium constant and its importance", hours: 1 },
            { slug: "kp-kc", title: "Relationship between Kp and Kc", hours: 1 },
            { slug: "le-chatelier", title: "Le Chatelier's Principle (numericals not required)", hours: 1 },
          ],
        },
        {
          id: "chemistry-of-non-metals",
          title: "Chemistry of Non-metals",
          hours: 21,
          topics: [
            { slug: "hydrogen-intro", title: "Hydrogen: chemistry of atomic and nascent hydrogen; isotopes of hydrogen and their uses", hours: 2 },
            { slug: "hydrogen-fuel", title: "Application of hydrogen as fuel; heavy water and its applications", hours: 1 },
            { slug: "allotropes-oxygen", title: "Allotropes of oxygen: definition of allotropy and examples; oxygen — types of oxides (acidic, basic, neutral, amphoteric, peroxide and mixed oxides)", hours: 2 },
            { slug: "hydrogen-peroxide-ozone", title: "Applications of hydrogen peroxide; medical and industrial application of oxygen", hours: 1 },
            { slug: "ozone", title: "Ozone: occurrence, preparation of ozone from oxygen, structure of ozone, test for ozone, uses of ozone", hours: 1 },
            { slug: "ozone-depletion", title: "Ozone layer depletion: causes, effects and control measures", hours: 1 },
            { slug: "nitrogen", title: "Nitrogen: reason for inertness of nitrogen and active nitrogen", hours: 1 },
            { slug: "ammonia", title: "Chemical properties of ammonia (action with CuSO4 solution, water, FeCl3 solution, conc. HCl, mercurous nitrate paper, O2); applications and harmful effects of ammonia", hours: 2 },
            { slug: "oxyacids-nitrogen", title: "Oxy-acids of nitrogen (name and formula)", hours: 1 },
            { slug: "nitric-acid", title: "Chemical properties of nitric acid: HNO3 as an acid and oxidizing agent (action with zinc, magnesium, iron, copper, sulphur, carbon, SO2 and H2S); ring test for nitrate ion", hours: 2 },
            { slug: "halogens", title: "Halogens: general characteristics of halogens; comparative study on preparation, chemical properties (with water, alkali, ammonia, oxidizing character, bleaching action) and uses of Cl2, Br2 and I2", hours: 3 },
            { slug: "halogen-tests", title: "Test for Cl2, Br2 and I2", hours: 1 },
            { slug: "haloacids", title: "Haloacids (HCl, HBr and HI): comparative study on preparation, properties (reducing strength, acidic nature and solubility) and uses", hours: 1 },
            { slug: "carbon-allotropes", title: "Carbon: allotropes of carbon (crystalline and amorphous) including fullerenes (structure, general properties and uses only)", hours: 1 },
            { slug: "carbon-monoxide", title: "Properties (reducing action, reaction with metals and nonmetals) and uses of carbon monoxide", hours: 1 },
            { slug: "phosphorus-allotropes", title: "Phosphorus: allotropes of phosphorus (name only)", hours: 1 },
            { slug: "phosphine", title: "Phosphine: preparation, properties (basic nature, reducing nature, action with halogens and oxygen) and uses", hours: 1 },
            { slug: "sulphur-allotropes", title: "Sulphur: allotropes of sulphur (name only) and uses of sulphur", hours: 1 },
            { slug: "hydrogen-sulphide", title: "Hydrogen sulphide: preparation from Kipp's apparatus (with diagram), properties (acidic nature, reducing nature, analytical reagent) and uses", hours: 1 },
            { slug: "sulphur-dioxide", title: "Sulphur dioxide: properties (acidic nature, reducing nature, oxidising nature and bleaching action) and uses", hours: 1 },
            { slug: "sulphuric-acid", title: "Sulphuric acid: properties (acidic nature, oxidising nature, dehydrating nature) and uses", hours: 1 },
            { slug: "sodium-thiosulphate", title: "Sodium thiosulphate (formula and uses)", hours: 1 },
          ],
        },
        {
          id: "chemistry-of-metals",
          title: "Chemistry of Metals",
          hours: 10,
          topics: [
            { slug: "metallurgy-principles", title: "Metals and metallurgical principles: definition of metallurgy and its types (hydrometallurgy, pyrometallurgy, electrometallurgy)", hours: 1 },
            { slug: "ores-gangue-flux", title: "Introduction of ores; gangue or matrix, flux and slag, alloy and amalgam", hours: 1 },
            { slug: "extraction-principles", title: "General principles of extraction of metals: concentration, calcination and roasting, smelting, carbon reduction, thermite and electrochemical reduction", hours: 2 },
            { slug: "refining-metals", title: "Refining of metals (poling and electro-refinement)", hours: 1 },
            { slug: "alkali-metals", title: "Alkali metals: general characteristics of alkali metals", hours: 1 },
            { slug: "sodium-extraction", title: "Sodium: extraction from Down's process, properties (action with oxygen, water, acids, nonmetals and ammonia) and uses", hours: 1 },
            { slug: "sodium-hydroxide", title: "Sodium hydroxide: properties (precipitation reaction and action with carbon monoxide) and uses", hours: 1 },
            { slug: "sodium-carbonate", title: "Sodium carbonate: properties (action with CO2, SO2, water, precipitation reactions) and uses", hours: 1 },
            { slug: "alkaline-earth-metals", title: "Alkaline earth metals: general characteristics of alkaline earth metals", hours: 1 },
            { slug: "alkaline-earth-compounds", title: "Molecular formula and uses of quick lime, bleaching powder, magnesia, plaster of paris and epsom salt", hours: 1 },
            { slug: "solubility-trends", title: "Solubility of hydroxides, carbonates and sulphates of alkaline earth metals (general trend with explanation)", hours: 1 },
            { slug: "stability-carbonate-nitrate", title: "Stability of carbonate and nitrate of alkaline earth metals (general trend with explanation)", hours: 1 },
          ],
        },
        {
          id: "bio-inorganic-chemistry",
          title: "Bio-inorganic Chemistry",
          hours: 3,
          topics: [
            { slug: "bio-inorg-intro", title: "Introduction to Bio-inorganic Chemistry", hours: 1 },
            { slug: "micro-macro-nutrients", title: "Micro and macro nutrients", hours: 1 },
            { slug: "metal-ions-bio", title: "Importance of metal ions in biological systems (ions of Na, K, Mg, Ca, Fe, Cu, Zn, Ni, Co, Cr)", hours: 1 },
            { slug: "ion-pumps", title: "Ion pumps (sodium-potassium and sodium-glucose pump)", hours: 1 },
            { slug: "metal-toxicity", title: "Metal toxicity (toxicity due to iron, arsenic, mercury, lead and cadmium)", hours: 1 },
          ],
        },
        {
          id: "basic-concept-organic-chemistry",
          title: "Basic Concept of Organic Chemistry",
          hours: 6,
          topics: [
            { slug: "organic-intro", title: "Introduction to organic chemistry and organic compounds", hours: 1 },
            { slug: "reasons-organic-study", title: "Reasons for the separate study of organic compounds from inorganic compounds", hours: 1 },
            { slug: "tetra-covalency-catenation", title: "Tetra-covalency and catenation properties of carbon", hours: 1 },
            { slug: "classification-organic", title: "Classification of organic compounds", hours: 1 },
            { slug: "alkyl-functional-groups", title: "Alkyl groups, functional groups and homologous series", hours: 1 },
            { slug: "structural-formulae", title: "Idea of structural formula, contracted formula and bond line structural formula", hours: 1 },
            { slug: "cracking-reforming", title: "Preliminary idea of cracking and reforming, quality of gasoline, octane number, cetane number and gasoline additive", hours: 1 },
          ],
        },
        {
          id: "fundamental-principles-organic",
          title: "Fundamental Principles of Organic Chemistry",
          hours: 10,
          topics: [
            { slug: "iupac-nomenclature", title: "IUPAC Nomenclature of Organic Compounds (up to chain having 6-carbon atoms)", hours: 2 },
            { slug: "qualitative-analysis", title: "Qualitative analysis of organic compounds (detection of N, S and halogens by Lassaigne's test)", hours: 2 },
            { slug: "isomerism-intro", title: "Isomerism in organic compounds: definition and classification of isomerism", hours: 1 },
            { slug: "structural-isomerism", title: "Structural isomerism and its types: chain isomerism, position isomerism, functional isomerism, metamerism and tautomerism", hours: 2 },
            { slug: "geometrical-optical", title: "Concept of geometrical isomerism (cis and trans) and optical isomerism (d and l form)", hours: 1 },
            { slug: "reaction-mechanism", title: "Preliminary idea of reaction mechanism: homolytic and heterolytic fission", hours: 1 },
            { slug: "electrophiles-nucleophiles", title: "Electrophiles, nucleophiles and free-radicals", hours: 1 },
            { slug: "inductive-effect", title: "Inductive effect: +I and -I effect", hours: 1 },
            { slug: "resonance-effect", title: "Resonance effect: +R and -R effect", hours: 1 },
          ],
        },
        {
          id: "hydrocarbons",
          title: "Hydrocarbons",
          hours: 8,
          topics: [
            { slug: "alkanes-prep", title: "Saturated hydrocarbons (Alkanes): preparation from haloalkanes (reduction and Wurtz reaction), decarboxylation, catalytic hydrogenation of alkene and alkyne", hours: 2 },
            { slug: "alkanes-prop", title: "Chemical properties of alkanes: substitution reactions (halogenation, nitration and sulphonation only), oxidation of ethane", hours: 2 },
            { slug: "alkenes-prep", title: "Unsaturated hydrocarbons (Alkenes): preparation by dehydration of alcohol, dehydrohalogenation, catalytic hydrogenation of alkyne", hours: 1 },
            { slug: "alkenes-prop", title: "Chemical properties of alkenes: addition reaction with HX (Markovnikov's addition and peroxide effect), H2O, O3, H2SO4 only", hours: 1 },
            { slug: "alkynes-prep", title: "Alkynes: preparation from carbon and hydrogen, 1,2-dibromoethane, chloroform/iodoform only", hours: 1 },
            { slug: "alkynes-prop", title: "Chemical properties of alkynes: addition reaction with H2, HX, H2O; acidic nature (action with sodium, ammoniacal AgNO3 and ammoniacal Cu2Cl2)", hours: 1 },
            { slug: "test-unsaturation", title: "Test of unsaturation (ethene and ethyne): bromine water test and Baeyer's test", hours: 1 },
            { slug: "comparative-phy-prop", title: "Comparative studies of physical properties of alkane, alkene and alkyne", hours: 1 },
            { slug: "kolbe-electrolysis", title: "Kolbe's electrolysis methods for the preparation of alkanes, alkenes and alkynes", hours: 1 },
          ],
        },
        {
          id: "aromatic-hydrocarbons",
          title: "Aromatic Hydrocarbons",
          hours: 6,
          topics: [
            { slug: "aromatic-intro", title: "Introduction and characteristics of aromatic compounds", hours: 1 },
            { slug: "huckel-rule", title: "Huckel's rule of aromaticity", hours: 1 },
            { slug: "kekule-benzene", title: "Kekule structure of benzene", hours: 1 },
            { slug: "resonance-isomerism-benzene", title: "Resonance and isomerism in benzene", hours: 1 },
            { slug: "benzene-prep", title: "Preparation of benzene from decarboxylation of sodium benzoate, phenol, and ethyne only", hours: 1 },
            { slug: "benzene-phys-prop", title: "Physical properties of benzene", hours: 1 },
            { slug: "benzene-chem-prop", title: "Chemical properties of benzene: addition reactions (hydrogen, halogen); electrophilic substitution reactions: orientation of benzene derivatives (o, m and p), nitration, sulphonation, halogenation, Friedel-Crafts reaction (alkylation and acylation)", hours: 2 },
            { slug: "benzene-combustion", title: "Combustion of benzene (free combustion only) and uses", hours: 1 },
          ],
        },
        {
          id: "fundamentals-applied-chemistry",
          title: "Fundamentals of Applied Chemistry",
          hours: 4,
          topics: [
            { slug: "chem-industry", title: "Fundamentals of Applied Chemistry: chemical industry and its importance", hours: 1 },
            { slug: "new-product-stages", title: "Stages in producing a new product", hours: 1 },
            { slug: "economics-production", title: "Economics of production; cash flow in the production cycle", hours: 1 },
            { slug: "chem-plant", title: "Running a chemical plant; designing a chemical plant; Continuous and batch processing", hours: 1 },
            { slug: "env-impact", title: "Environmental impact of the chemical industry", hours: 1 },
          ],
        },
        {
          id: "modern-chemical-manufactures",
          title: "Modern Chemical Manufactures",
          hours: 11,
          topics: [
            { slug: "ammonia-haber", title: "Manufacture of ammonia by Haber's process (principle and flow sheet diagram only)", hours: 2 },
            { slug: "nitric-acid-ostwald", title: "Manufacture of nitric acid by Ostwald's process", hours: 2 },
            { slug: "sulphuric-acid-contact", title: "Manufacture of sulphuric acid by contact process", hours: 2 },
            { slug: "sodium-hydroxide-diaphragm", title: "Manufacture of sodium hydroxide by Diaphragm Cell", hours: 2 },
            { slug: "sodium-carbonate-solvay", title: "Manufacture of sodium carbonate by ammonia soda or Solvay process", hours: 2 },
            { slug: "fertilizers-urea", title: "Fertilizers: chemical fertilizers, types of chemical fertilizers, production of urea with flow-sheet diagram", hours: 1 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Revision aligned with NCF 2076 amendments. Minor updates to Environmental Chemistry and Modern Chemical Manufactures units to reflect current industrial practices. Based on 2082 exam paper pattern.",
      units: [
        {
          id: "foundation-and-fundamentals",
          title: "Foundation and Fundamentals",
          hours: 2,
          topics: [
            { slug: "gen-intro-chemistry", title: "General introduction of chemistry", hours: 1 },
            { slug: "importance-scope-chemistry", title: "Importance and scope of chemistry", hours: 1 },
          ],
        },
        {
          id: "basic-concepts",
          title: "Basic Concepts of Chemistry",
          hours: 4,
          topics: [
            { slug: "atoms-molecules", title: "Basic concepts of chemistry: atoms, molecules, relative masses of atoms and molecules, atomic mass unit (amu)", hours: 2 },
            { slug: "radicals-formulas", title: "Radicals, molecular formula, empirical formula", hours: 1 },
            { slug: "percentage-composition", title: "Percentage composition from molecular formula", hours: 1 },
          ],
        },
        {
          id: "stoichiometry",
          title: "Stoichiometry",
          hours: 8,
          topics: [
            { slug: "dalton-atomic-theory", title: "Dalton's atomic theory and its postulates", hours: 1 },
            { slug: "laws-stoichiometry", title: "Laws of stoichiometry", hours: 1 },
            { slug: "avogadro-law", title: "Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles", hours: 2 },
            { slug: "mole-concept", title: "Mole and its relation with mass, volume and number of particles", hours: 1 },
            { slug: "mole-calculations", title: "Calculations based on mole concept", hours: 1 },
            { slug: "limiting-reactant", title: "Limiting reactant and excess reactant", hours: 1 },
            { slug: "theoretical-experimental-yield", title: "Theoretical yield, experimental yield and % yield", hours: 1 },
          ],
        },
        {
          id: "atomic-structure",
          title: "Atomic Structure",
          hours: 8,
          topics: [
            { slug: "rutherford-model", title: "Rutherford's atomic model and its limitations", hours: 1 },
            { slug: "bohr-model", title: "Postulates of Bohr's atomic model and its application", hours: 1 },
            { slug: "hydrogen-spectrum", title: "Spectrum of hydrogen atom", hours: 1 },
            { slug: "defects-bohr-theory", title: "Defects of Bohr's theory", hours: 1 },
            { slug: "de-broglie-wave", title: "Elementary idea of quantum mechanical model: de Broglie's wave equation", hours: 1 },
            { slug: "heisenberg-uncertainty", title: "Heisenberg's Uncertainty Principle and concept of probability", hours: 1 },
            { slug: "quantum-numbers", title: "Quantum numbers", hours: 1 },
            { slug: "orbitals-shape", title: "Orbitals and shape of s and p orbitals only", hours: 1 },
            { slug: "electronic-config", title: "Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)", hours: 1 },
          ],
        },
        {
          id: "classification-elements-periodic-table",
          title: "Classification of Elements and Periodic Table",
          hours: 5,
          topics: [
            { slug: "modern-periodic-law", title: "Modern periodic law and modern periodic table", hours: 1 },
            { slug: "groups-periods-blocks", title: "Classification of elements into different groups, periods and blocks", hours: 1 },
            { slug: "iupac-classification", title: "IUPAC classification of elements", hours: 1 },
            { slug: "nuclear-charge-effective", title: "Nuclear charge and effective nuclear charge", hours: 1 },
            { slug: "periodic-trends", title: "Periodic trend and periodicity: atomic radii, ionic radii, ionization energy, electron affinity, electronegativity, metallic characters (general trend and explanation only)", hours: 1 },
          ],
        },
        {
          id: "chemical-bonding-shapes",
          title: "Chemical Bonding and Shapes of Molecules",
          hours: 9,
          topics: [
            { slug: "valence-shell-octet", title: "Valence shell, valence electron and octet theory", hours: 1 },
            { slug: "ionic-bond", title: "Ionic bond and its properties", hours: 1 },
            { slug: "covalent-coordinate-bond", title: "Covalent bond and coordinate covalent bond; properties of covalent compounds", hours: 1 },
            { slug: "lewis-dot-structure", title: "Lewis dot structure of some common compounds of s and p block elements", hours: 1 },
            { slug: "resonance", title: "Resonance", hours: 1 },
            { slug: "vsepr-theory", title: "VSEPR theory and shapes of simple molecules (BeF2, BF3, CH4, CH3Cl, PCl5, SF6, H2O, NH3, CO2, H2S, PH3)", hours: 2 },
            { slug: "valence-bond-theory", title: "Elementary idea of Valence Bond Theory", hours: 1 },
            { slug: "hybridization", title: "Hybridization involving s and p orbitals only", hours: 1 },
            { slug: "bond-characteristics", title: "Bond characteristics: bond length, ionic character, dipole moment", hours: 1 },
            { slug: "vanderwaals-hydrogen-bond", title: "Vander Waal's force and molecular solids; hydrogen bonding and its application", hours: 1 },
            { slug: "metallic-bonding", title: "Metallic bonding and properties of metallic solids", hours: 1 },
          ],
        },
        {
          id: "oxidation-reduction",
          title: "Oxidation and Reduction",
          hours: 5,
          topics: [
            { slug: "gen-electronic-ox-red", title: "General and electronic concept of oxidation and reduction", hours: 1 },
            { slug: "oxidation-number", title: "Oxidation number and rules for assigning oxidation number", hours: 1 },
            { slug: "balancing-redox", title: "Balancing redox reactions by oxidation number and ion-electron (half reaction) method", hours: 1 },
            { slug: "electrolysis-qualitative", title: "Electrolysis: qualitative aspect", hours: 1 },
            { slug: "electrolysis-quantitative", title: "Electrolysis: quantitative aspect (Faraday's laws of electrolysis)", hours: 1 },
          ],
        },
        {
          id: "states-of-matter",
          title: "States of Matter",
          hours: 8,
          topics: [
            { slug: "kinetic-theory-gas", title: "Gaseous state: Kinetic theory of gas and its postulates", hours: 1 },
            { slug: "gas-laws", title: "Gas laws: Boyle's law, Charles' law, Avogadro's law, combined gas equation, Dalton's law of partial pressure, Graham's law of diffusion", hours: 2 },
            { slug: "ideal-gas-equation", title: "Ideal gas and ideal gas equation; universal gas constant and its significance", hours: 1 },
            { slug: "real-gas-deviation", title: "Deviation of real gas from ideality (solving related numerical problems based on gas laws)", hours: 1 },
            { slug: "liquid-state", title: "Liquid state: physical properties of liquids — evaporation and condensation, vapour pressure and boiling point, surface tension and viscosity (qualitative idea only)", hours: 1 },
            { slug: "liquid-crystals", title: "Liquid crystals and their applications", hours: 1 },
            { slug: "solid-state", title: "Solid state: types of solids, amorphous and crystalline solids", hours: 1 },
            { slug: "efflorescent-deliquescent", title: "Efflorescent, deliquescent and hygroscopic solids; crystallization and crystal growth; water of crystallization", hours: 1 },
            { slug: "unit-cell", title: "Introduction to unit crystal lattice and unit cell", hours: 1 },
          ],
        },
        {
          id: "chemical-equilibrium",
          title: "Chemical Equilibrium",
          hours: 3,
          topics: [
            { slug: "phys-chem-equilibrium", title: "Physical and chemical equilibrium; dynamic nature of chemical equilibrium", hours: 1 },
            { slug: "law-mass-action", title: "Law of mass action", hours: 1 },
            { slug: "equilibrium-constant", title: "Expression for equilibrium constant and its importance", hours: 1 },
            { slug: "kp-kc", title: "Relationship between Kp and Kc", hours: 1 },
            { slug: "le-chatelier", title: "Le Chatelier's Principle (numericals not required)", hours: 1 },
          ],
        },
        {
          id: "chemistry-of-non-metals",
          title: "Chemistry of Non-metals",
          hours: 21,
          topics: [
            { slug: "hydrogen-intro", title: "Hydrogen: chemistry of atomic and nascent hydrogen; isotopes of hydrogen and their uses", hours: 2 },
            { slug: "hydrogen-fuel", title: "Application of hydrogen as fuel; heavy water and its applications", hours: 1 },
            { slug: "allotropes-oxygen", title: "Allotropes of oxygen: definition of allotropy and examples; oxygen — types of oxides (acidic, basic, neutral, amphoteric, peroxide and mixed oxides)", hours: 2 },
            { slug: "hydrogen-peroxide-ozone", title: "Applications of hydrogen peroxide; medical and industrial application of oxygen", hours: 1 },
            { slug: "ozone", title: "Ozone: occurrence, preparation of ozone from oxygen, structure of ozone, test for ozone, uses of ozone", hours: 1 },
            { slug: "ozone-depletion", title: "Ozone layer depletion: causes, effects and control measures", hours: 1 },
            { slug: "nitrogen", title: "Nitrogen: reason for inertness of nitrogen and active nitrogen", hours: 1 },
            { slug: "ammonia", title: "Chemical properties of ammonia (action with CuSO4 solution, water, FeCl3 solution, conc. HCl, mercurous nitrate paper, O2); applications and harmful effects of ammonia", hours: 2 },
            { slug: "oxyacids-nitrogen", title: "Oxy-acids of nitrogen (name and formula)", hours: 1 },
            { slug: "nitric-acid", title: "Chemical properties of nitric acid: HNO3 as an acid and oxidizing agent (action with zinc, magnesium, iron, copper, sulphur, carbon, SO2 and H2S); ring test for nitrate ion", hours: 2 },
            { slug: "halogens", title: "Halogens: general characteristics of halogens; comparative study on preparation, chemical properties (with water, alkali, ammonia, oxidizing character, bleaching action) and uses of Cl2, Br2 and I2", hours: 3 },
            { slug: "halogen-tests", title: "Test for Cl2, Br2 and I2", hours: 1 },
            { slug: "haloacids", title: "Haloacids (HCl, HBr and HI): comparative study on preparation, properties (reducing strength, acidic nature and solubility) and uses", hours: 1 },
            { slug: "carbon-allotropes", title: "Carbon: allotropes of carbon (crystalline and amorphous) including fullerenes (structure, general properties and uses only)", hours: 1 },
            { slug: "carbon-monoxide", title: "Properties (reducing action, reaction with metals and nonmetals) and uses of carbon monoxide", hours: 1 },
            { slug: "phosphorus-allotropes", title: "Phosphorus: allotropes of phosphorus (name only)", hours: 1 },
            { slug: "phosphine", title: "Phosphine: preparation, properties (basic nature, reducing nature, action with halogens and oxygen) and uses", hours: 1 },
            { slug: "sulphur-allotropes", title: "Sulphur: allotropes of sulphur (name only) and uses of sulphur", hours: 1 },
            { slug: "hydrogen-sulphide", title: "Hydrogen sulphide: preparation from Kipp's apparatus (with diagram), properties (acidic nature, reducing nature, analytical reagent) and uses", hours: 1 },
            { slug: "sulphur-dioxide", title: "Sulphur dioxide: properties (acidic nature, reducing nature, oxidising nature and bleaching action) and uses", hours: 1 },
            { slug: "sulphuric-acid", title: "Sulphuric acid: properties (acidic nature, oxidising nature, dehydrating nature) and uses", hours: 1 },
            { slug: "sodium-thiosulphate", title: "Sodium thiosulphate (formula and uses)", hours: 1 },
          ],
        },
        {
          id: "chemistry-of-metals",
          title: "Chemistry of Metals",
          hours: 10,
          topics: [
            { slug: "metallurgy-principles", title: "Metals and metallurgical principles: definition of metallurgy and its types (hydrometallurgy, pyrometallurgy, electrometallurgy)", hours: 1 },
            { slug: "ores-gangue-flux", title: "Introduction of ores; gangue or matrix, flux and slag, alloy and amalgam", hours: 1 },
            { slug: "extraction-principles", title: "General principles of extraction of metals: concentration, calcination and roasting, smelting, carbon reduction, thermite and electrochemical reduction", hours: 2 },
            { slug: "refining-metals", title: "Refining of metals (poling and electro-refinement)", hours: 1 },
            { slug: "alkali-metals", title: "Alkali metals: general characteristics of alkali metals", hours: 1 },
            { slug: "sodium-extraction", title: "Sodium: extraction from Down's process, properties (action with oxygen, water, acids, nonmetals and ammonia) and uses", hours: 1 },
            { slug: "sodium-hydroxide", title: "Sodium hydroxide: properties (precipitation reaction and action with carbon monoxide) and uses", hours: 1 },
            { slug: "sodium-carbonate", title: "Sodium carbonate: properties (action with CO2, SO2, water, precipitation reactions) and uses", hours: 1 },
            { slug: "alkaline-earth-metals", title: "Alkaline earth metals: general characteristics of alkaline earth metals", hours: 1 },
            { slug: "alkaline-earth-compounds", title: "Molecular formula and uses of quick lime, bleaching powder, magnesia, plaster of paris and epsom salt", hours: 1 },
            { slug: "solubility-trends", title: "Solubility of hydroxides, carbonates and sulphates of alkaline earth metals (general trend with explanation)", hours: 1 },
            { slug: "stability-carbonate-nitrate", title: "Stability of carbonate and nitrate of alkaline earth metals (general trend with explanation)", hours: 1 },
          ],
        },
        {
          id: "bio-inorganic-chemistry",
          title: "Bio-inorganic Chemistry",
          hours: 3,
          topics: [
            { slug: "bio-inorg-intro", title: "Introduction to Bio-inorganic Chemistry", hours: 1 },
            { slug: "micro-macro-nutrients", title: "Micro and macro nutrients", hours: 1 },
            { slug: "metal-ions-bio", title: "Importance of metal ions in biological systems (ions of Na, K, Mg, Ca, Fe, Cu, Zn, Ni, Co, Cr)", hours: 1 },
            { slug: "ion-pumps", title: "Ion pumps (sodium-potassium and sodium-glucose pump)", hours: 1 },
            { slug: "metal-toxicity", title: "Metal toxicity (toxicity due to iron, arsenic, mercury, lead and cadmium)", hours: 1 },
          ],
        },
        {
          id: "basic-concept-organic-chemistry",
          title: "Basic Concept of Organic Chemistry",
          hours: 6,
          topics: [
            { slug: "organic-intro", title: "Introduction to organic chemistry and organic compounds", hours: 1 },
            { slug: "reasons-organic-study", title: "Reasons for the separate study of organic compounds from inorganic compounds", hours: 1 },
            { slug: "tetra-covalency-catenation", title: "Tetra-covalency and catenation properties of carbon", hours: 1 },
            { slug: "classification-organic", title: "Classification of organic compounds", hours: 1 },
            { slug: "alkyl-functional-groups", title: "Alkyl groups, functional groups and homologous series", hours: 1 },
            { slug: "structural-formulae", title: "Idea of structural formula, contracted formula and bond line structural formula", hours: 1 },
            { slug: "cracking-reforming", title: "Preliminary idea of cracking and reforming, quality of gasoline, octane number, cetane number and gasoline additive", hours: 1 },
          ],
        },
        {
          id: "fundamental-principles-organic",
          title: "Fundamental Principles of Organic Chemistry",
          hours: 10,
          topics: [
            { slug: "iupac-nomenclature", title: "IUPAC Nomenclature of Organic Compounds (up to chain having 6-carbon atoms)", hours: 2 },
            { slug: "qualitative-analysis", title: "Qualitative analysis of organic compounds (detection of N, S and halogens by Lassaigne's test)", hours: 2 },
            { slug: "isomerism-intro", title: "Isomerism in organic compounds: definition and classification of isomerism", hours: 1 },
            { slug: "structural-isomerism", title: "Structural isomerism and its types: chain isomerism, position isomerism, functional isomerism, metamerism and tautomerism", hours: 2 },
            { slug: "geometrical-optical", title: "Concept of geometrical isomerism (cis and trans) and optical isomerism (d and l form)", hours: 1 },
            { slug: "reaction-mechanism", title: "Preliminary idea of reaction mechanism: homolytic and heterolytic fission", hours: 1 },
            { slug: "electrophiles-nucleophiles", title: "Electrophiles, nucleophiles and free-radicals", hours: 1 },
            { slug: "inductive-effect", title: "Inductive effect: +I and -I effect", hours: 1 },
            { slug: "resonance-effect", title: "Resonance effect: +R and -R effect", hours: 1 },
          ],
        },
        {
          id: "hydrocarbons",
          title: "Hydrocarbons",
          hours: 8,
          topics: [
            { slug: "alkanes-prep", title: "Saturated hydrocarbons (Alkanes): preparation from haloalkanes (reduction and Wurtz reaction), decarboxylation, catalytic hydrogenation of alkene and alkyne", hours: 2 },
            { slug: "alkanes-prop", title: "Chemical properties of alkanes: substitution reactions (halogenation, nitration and sulphonation only), oxidation of ethane", hours: 2 },
            { slug: "alkenes-prep", title: "Unsaturated hydrocarbons (Alkenes): preparation by dehydration of alcohol, dehydrohalogenation, catalytic hydrogenation of alkyne", hours: 1 },
            { slug: "alkenes-prop", title: "Chemical properties of alkenes: addition reaction with HX (Markovnikov's addition and peroxide effect), H2O, O3, H2SO4 only", hours: 1 },
            { slug: "alkynes-prep", title: "Alkynes: preparation from carbon and hydrogen, 1,2-dibromoethane, chloroform/iodoform only", hours: 1 },
            { slug: "alkynes-prop", title: "Chemical properties of alkynes: addition reaction with H2, HX, H2O; acidic nature (action with sodium, ammoniacal AgNO3 and ammoniacal Cu2Cl2)", hours: 1 },
            { slug: "test-unsaturation", title: "Test of unsaturation (ethene and ethyne): bromine water test and Baeyer's test", hours: 1 },
            { slug: "comparative-phy-prop", title: "Comparative studies of physical properties of alkane, alkene and alkyne", hours: 1 },
            { slug: "kolbe-electrolysis", title: "Kolbe's electrolysis methods for the preparation of alkanes, alkenes and alkynes", hours: 1 },
          ],
        },
        {
          id: "aromatic-hydrocarbons",
          title: "Aromatic Hydrocarbons",
          hours: 6,
          topics: [
            { slug: "aromatic-intro", title: "Introduction and characteristics of aromatic compounds", hours: 1 },
            { slug: "huckel-rule", title: "Huckel's rule of aromaticity", hours: 1 },
            { slug: "kekule-benzene", title: "Kekule structure of benzene", hours: 1 },
            { slug: "resonance-isomerism-benzene", title: "Resonance and isomerism in benzene", hours: 1 },
            { slug: "benzene-prep", title: "Preparation of benzene from decarboxylation of sodium benzoate, phenol, and ethyne only", hours: 1 },
            { slug: "benzene-phys-prop", title: "Physical properties of benzene", hours: 1 },
            { slug: "benzene-chem-prop", title: "Chemical properties of benzene: addition reactions (hydrogen, halogen); electrophilic substitution reactions: orientation of benzene derivatives (o, m and p), nitration, sulphonation, halogenation, Friedel-Crafts reaction (alkylation and acylation)", hours: 2 },
            { slug: "benzene-combustion", title: "Combustion of benzene (free combustion only) and uses", hours: 1 },
          ],
        },
        {
          id: "fundamentals-applied-chemistry",
          title: "Fundamentals of Applied Chemistry",
          hours: 4,
          topics: [
            { slug: "chem-industry", title: "Fundamentals of Applied Chemistry: chemical industry and its importance", hours: 1 },
            { slug: "new-product-stages", title: "Stages in producing a new product", hours: 1 },
            { slug: "economics-production", title: "Economics of production; cash flow in the production cycle", hours: 1 },
            { slug: "chem-plant", title: "Running a chemical plant; designing a chemical plant; Continuous and batch processing", hours: 1 },
            { slug: "env-impact", title: "Environmental impact of the chemical industry", hours: 1 },
          ],
        },
        {
          id: "modern-chemical-manufactures",
          title: "Modern Chemical Manufactures",
          hours: 11,
          topics: [
            { slug: "ammonia-haber", title: "Manufacture of ammonia by Haber's process (principle and flow sheet diagram only)", hours: 2 },
            { slug: "nitric-acid-ostwald", title: "Manufacture of nitric acid by Ostwald's process", hours: 2 },
            { slug: "sulphuric-acid-contact", title: "Manufacture of sulphuric acid by contact process", hours: 2 },
            { slug: "sodium-hydroxide-diaphragm", title: "Manufacture of sodium hydroxide by Diaphragm Cell", hours: 2 },
            { slug: "sodium-carbonate-solvay", title: "Manufacture of sodium carbonate by ammonia soda or Solvay process", hours: 2 },
            { slug: "fertilizers-urea", title: "Fertilizers: chemical fertilizers, types of chemical fertilizers, production of urea with flow-sheet diagram", hours: 1 },
            { slug: "green-chemistry-intro", title: "Introduction to Green Chemistry and its 12 principles", hours: 1, addedInYear: 2081 },
          ],
        },
      ],
    },
  ],
};

/**
 * NEB Class 12 Chemistry (Che. 302) — 2076 baseline vs 2081 revision
 * 12 units, ~83 teaching hours
 */
export const CHEMISTRY_12_DATA: SubjectChemistryData = {
  grade: "12",
  subjectCode: "Che. 302",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "First NCF 2076 curriculum for Grade 12 Chemistry with 83 theory hours.",
      units: [
        {
          id: "solutions",
          title: "Solutions",
          hours: 7,
          topics: [
            { slug: "types-solutions-concentration", title: "Types of solutions and expression of concentration", hours: 2 },
            { slug: "solubility-gases-solids", title: "Solubility of gases and solids in liquids", hours: 1 },
            { slug: "vapour-pressure-raoult", title: "Vapour pressure of solutions — Raoult's law", hours: 1 },
            { slug: "colligative-properties", title: "Colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure", hours: 2 },
            { slug: "vants-hoff-factor", title: "Van't Hoff factor and abnormal molar masses", hours: 1 },
          ],
        },
        {
          id: "electro-chemistry",
          title: "Electrochemistry",
          hours: 8,
          topics: [
            { slug: "ox-red-electrode", title: "Oxidation and reduction — electrode reactions", hours: 1 },
            { slug: "electrochemical-cells", title: "Electrochemical cells — galvanic cell, cell potential, standard electrode potential", hours: 2 },
            { slug: "nernst-equation", title: "Nernst equation and its applications", hours: 2 },
            { slug: "conductance-electrolytes", title: "Conductance of electrolytic solutions", hours: 1 },
            { slug: "electrolysis-faraday", title: "Electrolysis and Faraday's laws", hours: 1 },
            { slug: "batteries", title: "Batteries — primary and secondary cells", hours: 1 },
            { slug: "fuel-cells", title: "Fuel cells", hours: 1 },
          ],
        },
        {
          id: "chemical-kinetics",
          title: "Chemical Kinetics",
          hours: 6,
          topics: [
            { slug: "rate-reaction", title: "Rate of reaction — average and instantaneous rate", hours: 1 },
            { slug: "factors-rate", title: "Factors affecting rate of reaction", hours: 1 },
            { slug: "rate-law-order", title: "Rate law and order of reaction", hours: 1 },
            { slug: "integrated-rate-eq", title: "Integrated rate equations — zero order and first order reactions", hours: 2 },
            { slug: "arrhenius-equation", title: "Arrhenius equation and activation energy", hours: 1 },
          ],
        },
        {
          id: "general-organic-fundamentals",
          title: "General and Fundamental Principles of Organic Chemistry",
          hours: 8,
          topics: [
            { slug: "purification-analysis", title: "Purification and qualitative/quantitative analysis of organic compounds", hours: 2 },
            { slug: "inductive-resonance-hyperconj", title: "Inductive effect, resonance, hyperconjugation", hours: 2 },
            { slug: "elec-nuc-subst", title: "Electrophilic and nucleophilic substitution reactions", hours: 2 },
            { slug: "free-radical-reactions", title: "Free radical reactions", hours: 1 },
            { slug: "important-org-reactions", title: "Important organic reactions: oxidation, reduction, addition, elimination", hours: 1 },
          ],
        },
        {
          id: "hydrocarbons-12",
          title: "Hydrocarbons",
          hours: 7,
          topics: [
            { slug: "alkanes-conformations", title: "Alkanes: conformations, combustion, free radical halogenation", hours: 2 },
            { slug: "alkenes-prep-12", title: "Alkenes: preparation, geometrical isomerism, electrophilic addition (Markovnikov, anti-Markovnikov), ozonolysis, polymerisation", hours: 2 },
            { slug: "alkynes-prep-12", title: "Alkynes: preparation, acidic character, addition reactions", hours: 1 },
            { slug: "aromatic-hydrocarbons-12", title: "Aromatic hydrocarbons: benzene — resonance, aromaticity, electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts)", hours: 2 },
          ],
        },
        {
          id: "alcohols-phenols-ethers",
          title: "Alcohols, Phenols and Ethers",
          hours: 7,
          topics: [
            { slug: "alcohols-class", title: "Alcohols: classification, preparation, physical and chemical properties", hours: 2 },
            { slug: "phenols", title: "Phenols: acidity, electrophilic substitution, Kolbe's reaction, Reimer-Tiemann reaction", hours: 2 },
            { slug: "ethers", title: "Ethers: preparation and chemical reactions (cleavage by HI)", hours: 1 },
            { slug: "testing-alcohols-phenols", title: "Tests to distinguish alcohols, phenols and ethers", hours: 2 },
          ],
        },
        {
          id: "aldehydes-ketones-carboxylic-acids",
          title: "Aldehydes, Ketones and Carboxylic Acids",
          hours: 10,
          topics: [
            { slug: "ald-ket-prep", title: "Aldehydes and ketones: preparation, physical properties, nucleophilic addition reactions", hours: 3 },
            { slug: "carboxylic-acids", title: "Carboxylic acids: preparation, physical properties, acidic character, reactions", hours: 3 },
            { slug: "name-reactions", title: "Name reactions: Aldol condensation, Cannizzaro reaction, HVZ reaction", hours: 2 },
            { slug: "acid-derivatives", title: "Acid derivatives: acyl chlorides, acid anhydrides, esters and amides — preparation and reactions", hours: 2 },
          ],
        },
        {
          id: "amines",
          title: "Amines",
          hours: 6,
          topics: [
            { slug: "amine-class-nom", title: "Classification, nomenclature and preparation", hours: 2 },
            { slug: "amine-phys-prop", title: "Physical and chemical properties", hours: 2 },
            { slug: "basic-character-amine", title: "Basic character of amines", hours: 1 },
            { slug: "amine-reactions", title: "Reactions: diazotisation, coupling reactions, Hinsberg test", hours: 1 },
          ],
        },
        {
          id: "biomolecules",
          title: "Biomolecules",
          hours: 5,
          topics: [
            { slug: "carbohydrates", title: "Carbohydrates: monosaccharides (glucose, fructose), disaccharides, polysaccharides", hours: 2 },
            { slug: "proteins", title: "Proteins: amino acids, peptide bond, primary to quaternary structure, denaturation", hours: 1 },
            { slug: "enzymes", title: "Enzymes: definition, classification, enzyme action", hours: 1 },
            { slug: "vitamins", title: "Vitamins: classification and functions", hours: 1 },
            { slug: "hormones", title: "Hormones: definition, types, functions", hours: 1 },
          ],
        },
        {
          id: "chemistry-everyday-life",
          title: "Chemistry in Everyday Life",
          hours: 4,
          topics: [
            { slug: "medicinal-chemicals", title: "Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, antacids", hours: 2 },
            { slug: "chemical-cleansers", title: "Chemical cleansers — soaps and detergents", hours: 1 },
            { slug: "food-additives", title: "Food additives — preservatives and artificial sweetening agents", hours: 1 },
          ],
        },
        {
          id: "chemistry-element",
          title: "Chemistry of Element",
          hours: 8,
          topics: [
            { slug: "p-block-elements", title: "p-block elements (Group 15–18): important compounds, trends in properties", hours: 2 },
            { slug: "d-block-elements", title: "d-block elements: general characteristics, important compounds (KMnO₄, K₂Cr₂O₇)", hours: 2 },
            { slug: "f-block-elements", title: "f-block elements: lanthanoids and actinoids", hours: 1 },
            { slug: "coordination-compounds", title: "Coordination compounds: Werner's theory, IUPAC nomenclature, VBT, CFT (qualitative), isomerism", hours: 3 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Revision aligned with NCF 2076 amendments. Added emphasis on polymer chemistry, green chemistry, and nanomaterials. Based on 2082 exam paper confirming updated topic coverage.",
      units: [
        {
          id: "solutions",
          title: "Solutions",
          hours: 7,
          topics: [
            { slug: "types-solutions-concentration", title: "Types of solutions and expression of concentration", hours: 2 },
            { slug: "solubility-gases-solids", title: "Solubility of gases and solids in liquids", hours: 1 },
            { slug: "vapour-pressure-raoult", title: "Vapour pressure of solutions — Raoult's law", hours: 1 },
            { slug: "colligative-properties", title: "Colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure", hours: 2 },
            { slug: "vants-hoff-factor", title: "Van't Hoff factor and abnormal molar masses", hours: 1 },
          ],
        },
        {
          id: "electro-chemistry",
          title: "Electrochemistry",
          hours: 8,
          topics: [
            { slug: "ox-red-electrode", title: "Oxidation and reduction — electrode reactions", hours: 1 },
            { slug: "electrochemical-cells", title: "Electrochemical cells — galvanic cell, cell potential, standard electrode potential", hours: 2 },
            { slug: "nernst-equation", title: "Nernst equation and its applications", hours: 2 },
            { slug: "conductance-electrolytes", title: "Conductance of electrolytic solutions", hours: 1 },
            { slug: "electrolysis-faraday", title: "Electrolysis and Faraday's laws", hours: 1 },
            { slug: "batteries", title: "Batteries — primary and secondary cells", hours: 1 },
            { slug: "fuel-cells", title: "Fuel cells", hours: 1 },
          ],
        },
        {
          id: "chemical-kinetics",
          title: "Chemical Kinetics",
          hours: 6,
          topics: [
            { slug: "rate-reaction", title: "Rate of reaction — average and instantaneous rate", hours: 1 },
            { slug: "factors-rate", title: "Factors affecting rate of reaction", hours: 1 },
            { slug: "rate-law-order", title: "Rate law and order of reaction", hours: 1 },
            { slug: "integrated-rate-eq", title: "Integrated rate equations — zero order and first order reactions", hours: 2 },
            { slug: "arrhenius-equation", title: "Arrhenius equation and activation energy", hours: 1 },
          ],
        },
        {
          id: "general-organic-fundamentals",
          title: "General and Fundamental Principles of Organic Chemistry",
          hours: 8,
          topics: [
            { slug: "purification-analysis", title: "Purification and qualitative/quantitative analysis of organic compounds", hours: 2 },
            { slug: "inductive-resonance-hyperconj", title: "Inductive effect, resonance, hyperconjugation", hours: 2 },
            { slug: "elec-nuc-subst", title: "Electrophilic and nucleophilic substitution reactions", hours: 2 },
            { slug: "free-radical-reactions", title: "Free radical reactions", hours: 1 },
            { slug: "important-org-reactions", title: "Important organic reactions: oxidation, reduction, addition, elimination", hours: 1 },
          ],
        },
        {
          id: "hydrocarbons-12",
          title: "Hydrocarbons",
          hours: 7,
          topics: [
            { slug: "alkanes-conformations", title: "Alkanes: conformations, combustion, free radical halogenation", hours: 2 },
            { slug: "alkenes-prep-12", title: "Alkenes: preparation, geometrical isomerism, electrophilic addition (Markovnikov, anti-Markovnikov), ozonolysis, polymerisation", hours: 2 },
            { slug: "alkynes-prep-12", title: "Alkynes: preparation, acidic character, addition reactions", hours: 1 },
            { slug: "aromatic-hydrocarbons-12", title: "Aromatic hydrocarbons: benzene — resonance, aromaticity, electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts)", hours: 2 },
          ],
        },
        {
          id: "alcohols-phenols-ethers",
          title: "Alcohols, Phenols and Ethers",
          hours: 7,
          topics: [
            { slug: "alcohols-class", title: "Alcohols: classification, preparation, physical and chemical properties", hours: 2 },
            { slug: "phenols", title: "Phenols: acidity, electrophilic substitution, Kolbe's reaction, Reimer-Tiemann reaction", hours: 2 },
            { slug: "ethers", title: "Ethers: preparation and chemical reactions (cleavage by HI)", hours: 1 },
            { slug: "testing-alcohols-phenols", title: "Tests to distinguish alcohols, phenols and ethers", hours: 2 },
          ],
        },
        {
          id: "aldehydes-ketones-carboxylic-acids",
          title: "Aldehydes, Ketones and Carboxylic Acids",
          hours: 10,
          topics: [
            { slug: "ald-ket-prep", title: "Aldehydes and ketones: preparation, physical properties, nucleophilic addition reactions", hours: 3 },
            { slug: "carboxylic-acids", title: "Carboxylic acids: preparation, physical properties, acidic character, reactions", hours: 3 },
            { slug: "name-reactions", title: "Name reactions: Aldol condensation, Cannizzaro reaction, HVZ reaction", hours: 2 },
            { slug: "acid-derivatives", title: "Acid derivatives: acyl chlorides, acid anhydrides, esters and amides — preparation and reactions", hours: 2 },
          ],
        },
        {
          id: "amines",
          title: "Amines",
          hours: 6,
          topics: [
            { slug: "amine-class-nom", title: "Classification, nomenclature and preparation", hours: 2 },
            { slug: "amine-phys-prop", title: "Physical and chemical properties", hours: 2 },
            { slug: "basic-character-amine", title: "Basic character of amines", hours: 1 },
            { slug: "amine-reactions", title: "Reactions: diazotisation, coupling reactions, Hinsberg test", hours: 1 },
          ],
        },
        {
          id: "biomolecules",
          title: "Biomolecules",
          hours: 5,
          topics: [
            { slug: "carbohydrates", title: "Carbohydrates: monosaccharides (glucose, fructose), disaccharides, polysaccharides", hours: 2 },
            { slug: "proteins", title: "Proteins: amino acids, peptide bond, primary to quaternary structure, denaturation", hours: 1 },
            { slug: "enzymes", title: "Enzymes: definition, classification, enzyme action", hours: 1 },
            { slug: "vitamins", title: "Vitamins: classification and functions", hours: 1 },
            { slug: "hormones", title: "Hormones: definition, types, functions", hours: 1 },
          ],
        },
        {
          id: "chemistry-everyday-life",
          title: "Chemistry in Everyday Life",
          hours: 5,
          topics: [
            { slug: "medicinal-chemicals", title: "Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, antacids", hours: 2 },
            { slug: "chemical-cleansers", title: "Chemical cleansers — soaps and detergents", hours: 1 },
            { slug: "food-additives", title: "Food additives — preservatives and artificial sweetening agents", hours: 1 },
            { slug: "polymer-chemistry", title: "Polymers: classification, polymerisation mechanisms (addition and condensation), examples of important polymers (PE, PP, PVC, nylon, terylene)", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "chemistry-element",
          title: "Chemistry of Element",
          hours: 9,
          topics: [
            { slug: "p-block-elements", title: "p-block elements (Group 15–18): important compounds, trends in properties", hours: 2 },
            { slug: "d-block-elements", title: "d-block elements: general characteristics, important compounds (KMnO₄, K₂Cr₂O₇)", hours: 2 },
            { slug: "f-block-elements", title: "f-block elements: lanthanoids and actinoids", hours: 1 },
            { slug: "coordination-compounds", title: "Coordination compounds: Werner's theory, IUPAC nomenclature, VBT, CFT (qualitative), isomerism", hours: 3 },
            { slug: "nanomaterials-intro", title: "Introduction to nanomaterials and their applications in chemistry", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "environmental-chemistry",
          title: "Environmental Chemistry",
          hours: 3,
          topics: [
            { slug: "air-water-pollution", title: "Air and water pollution — causes, effects, and control measures", hours: 1 },
            { slug: "soil-pollution", title: "Soil pollution and solid waste management", hours: 1 },
            { slug: "green-chemistry-app", title: "Green chemistry principles and applications in industrial chemistry", hours: 1, addedInYear: 2081 },
          ],
        },
      ],
    },
  ],
};

export type ChemistryDataMap = {
  "class-11-notes": SubjectChemistryData;
  "class-12-notes": SubjectChemistryData;
};

export const CHEMISTRY_DATA_MAP: ChemistryDataMap = {
  "class-11-notes": CHEMISTRY_11_DATA,
  "class-12-notes": CHEMISTRY_12_DATA,
};
