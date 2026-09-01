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
  /** Plain-language explanation of what the student will learn and why it matters. */
  meaning?: string;
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
            { slug: "gen-intro-chemistry", title: "General introduction of chemistry", hours: 1, meaning: "What chemistry is and where it fits among the natural sciences. Gives students the big-picture context before diving into specific topics." },
            { slug: "importance-scope-chemistry", title: "Importance and scope of chemistry", hours: 1, meaning: "How chemistry touches everyday life, industry, medicine, and the environment. Shows students why this subject matters beyond the classroom." },
          ],
        },
        {
          id: "basic-concepts",
          title: "Basic Concepts of Chemistry",
          hours: 4,
          topics: [
            { slug: "atoms-molecules", title: "Basic concepts of chemistry: atoms, molecules, relative masses of atoms and molecules, atomic mass unit (amu)", hours: 2, meaning: "The building blocks of matter — what atoms and molecules are, how we measure their masses, and why the atomic mass unit (amu) is the standard. The vocabulary and units every chemistry student needs." },
            { slug: "radicals-formulas", title: "Radicals, molecular formula, empirical formula", hours: 1, meaning: "Polyatomic ions (radicals) and how to write molecular and empirical formulas from them. Essential for reading and writing chemical equations correctly." },
            { slug: "percentage-composition", title: "Percentage composition from molecular formula", hours: 1, meaning: "How to calculate the percent by mass of each element in a compound from its formula. A practical skill used in analytical chemistry and quality control." },
          ],
        },
        {
          id: "stoichiometry",
          title: "Stoichiometry",
          hours: 8,
          topics: [
            { slug: "dalton-atomic-theory", title: "Dalton's atomic theory and its postulates", hours: 1, meaning: "Dalton's postulates about atoms — indivisible particles that combine in fixed ratios. The historical foundation that explains why chemical reactions follow predictable patterns." },
            { slug: "laws-stoichiometry", title: "Laws of stoichiometry", hours: 1, meaning: "The fundamental laws governing chemical combinations: conservation of mass, definite proportions, multiple proportions, and reciprocal proportions. The rules that make stoichiometric calculations possible." },
            { slug: "avogadro-law", title: "Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles", hours: 2, meaning: "Avogadro's law — equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. Lets students convert between gas volume, moles, and particle count." },
            { slug: "mole-concept", title: "Mole and its relation with mass, volume and number of particles", hours: 1, meaning: "The mole as the bridge between the microscopic world (atoms, molecules) and the macroscopic world (grams, liters). The single most important concept for doing chemistry calculations." },
            { slug: "mole-calculations", title: "Calculations based on mole concept", hours: 1, meaning: "Applying the mole concept to solve problems involving mass, volume, and number of particles. Practice turns the abstract concept into a practical calculation tool." },
            { slug: "limiting-reactant", title: "Limiting reactant and excess reactant", hours: 1, meaning: "How to identify which reactant runs out first and limits the amount of product formed. Critical for predicting yields in any real chemical reaction." },
            { slug: "theoretical-experimental-yield", title: "Theoretical yield, experimental yield and % yield", hours: 1, meaning: "The difference between calculated (theoretical) yield and actual (experimental) yield, and how to express efficiency as percent yield. Connects lab work to quantitative expectations." },
          ],
        },
        {
          id: "atomic-structure",
          title: "Atomic Structure",
          hours: 8,
          topics: [
            { slug: "rutherford-model", title: "Rutherford's atomic model and its limitations", hours: 1, meaning: "Rutherford's nuclear model — a dense positively charged nucleus surrounded by electrons. Introduced the concept of the atom having a central nucleus, despite its inability to explain atomic stability." },
            { slug: "bohr-model", title: "Postulates of Bohr's atomic model and its application", hours: 1, meaning: "Bohr's model of the hydrogen atom — electrons orbit in fixed energy levels and emit/absorb light when jumping between them. Explains the hydrogen spectrum and introduces quantized energy." },
            { slug: "hydrogen-spectrum", title: "Spectrum of hydrogen atom", hours: 1, meaning: "The line spectrum of hydrogen and how it arises from electron transitions between energy levels. Provides experimental proof for Bohr's quantized orbits." },
            { slug: "defects-bohr-theory", title: "Defects of Bohr's theory", hours: 1, meaning: "Why Bohr's model fails for multi-electron atoms and cannot explain fine spectral lines or the Zeeman effect. Shows the need for a more complete quantum mechanical description." },
            { slug: "de-broglie-wave", title: "Elementary idea of quantum mechanical model: de Broglie's wave equation", hours: 1, meaning: "De Broglie's hypothesis that matter has wave-like properties — every moving particle has an associated wavelength. Bridges classical and quantum views of the atom." },
            { slug: "heisenberg-uncertainty", title: "Heisenberg's Uncertainty Principle and concept of probability", hours: 1, meaning: "Heisenberg's principle — you cannot simultaneously know both the exact position and momentum of an electron. Replaces Bohr's fixed orbits with probability-based orbitals." },
            { slug: "quantum-numbers", title: "Quantum numbers", hours: 1, meaning: "Four quantum numbers (n, l, m_l, m_s) that describe the energy, shape, orientation, and spin of an electron in an atom. The complete address system for every electron." },
            { slug: "orbitals-shape", title: "Orbitals and shape of s and p orbitals only", hours: 1, meaning: "The shapes of s (spherical) and p (dumbbell) orbitals — the regions where an electron is most likely to be found. Visual tools for understanding chemical bonding." },
            { slug: "electronic-config", title: "Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)", hours: 1, meaning: "Writing electron configurations using the Aufbau principle, Pauli exclusion principle, and Hund's rule (up to atomic number 30). Predicts an element's chemical behavior from its electron arrangement." },
          ],
        },
        {
          id: "classification-elements-periodic-table",
          title: "Classification of Elements and Periodic Table",
          hours: 5,
          topics: [
            { slug: "modern-periodic-law", title: "Modern periodic law and modern periodic table", hours: 1, meaning: "The modern periodic law — properties of elements are periodic functions of their atomic numbers. The organizing principle behind the entire periodic table." },
            { slug: "groups-periods-blocks", title: "Classification of elements into different groups, periods and blocks", hours: 1, meaning: "How the periodic table is divided into groups (columns), periods (rows), and blocks (s, p, d, f) based on electron configuration. Reveals patterns in element behavior." },
            { slug: "iupac-classification", title: "IUPAC classification of elements", hours: 1, meaning: "IUPAC's systematic naming and numbering of groups (1–18) and the structure of the long-form periodic table. The universal language for discussing element positions." },
            { slug: "nuclear-charge-effective", title: "Nuclear charge and effective nuclear charge", hours: 1, meaning: "How the effective nuclear charge (Z_eff) felt by valence electrons determines atomic size and reactivity. Explains why properties change across periods and down groups." },
            { slug: "periodic-trends", title: "Periodic trend and periodicity: atomic radii, ionic radii, ionization energy, electron affinity, electronegativity, metallic characters (general trend and explanation only)", hours: 1, meaning: "Periodic trends in atomic radius, ionic radius, ionization energy, electron affinity, electronegativity, and metallic character — and the reasoning behind each trend. Predicts how elements will behave chemically." },
          ],
        },
        {
          id: "chemical-bonding-shapes",
          title: "Chemical Bonding and Shapes of Molecules",
          hours: 9,
          topics: [
            { slug: "valence-shell-octet", title: "Valence shell, valence electron and octet theory", hours: 1, meaning: "The octet rule — atoms tend to gain, lose, or share electrons to achieve a stable configuration of eight valence electrons. The basic motivation for why bonds form." },
            { slug: "ionic-bond", title: "Ionic bond and its properties", hours: 1, meaning: "Ionic bonding — the electrostatic attraction between oppositely charged ions formed by electron transfer. Explains the properties of salts: high melting points, conductivity in solution." },
            { slug: "covalent-coordinate-bond", title: "Covalent bond and coordinate covalent bond; properties of covalent compounds", hours: 1, meaning: "Covalent bonds (shared electrons) and coordinate bonds (both electrons from one atom). Distinguishes the two main types of intramolecular bonds and their properties." },
            { slug: "lewis-dot-structure", title: "Lewis dot structure of some common compounds of s and p block elements", hours: 1, meaning: "Drawing Lewis dot structures for common s- and p-block compounds to visualize bonding and lone pairs. A foundational diagramming skill for predicting molecular geometry." },
            { slug: "resonance", title: "Resonance", hours: 1, meaning: "Resonance — when a single Lewis structure cannot fully represent a molecule, and multiple structures contribute to the true hybrid. Explains bond lengths and stability in molecules like ozone and benzene." },
            { slug: "vsepr-theory", title: "VSEPR theory and shapes of simple molecules (BeF2, BF3, CH4, CH3Cl, PCl5, SF6, H2O, NH3, CO2, H2S, PH3)", hours: 2, meaning: "VSEPR theory — predicting the 3D shape of molecules from the repulsion between electron pairs around a central atom. Shape determines polarity, reactivity, and biological function." },
            { slug: "valence-bond-theory", title: "Elementary idea of Valence Bond Theory", hours: 1, meaning: "Valence Bond Theory — bonds form when atomic orbitals overlap and electrons pair up. Introduces the quantum mechanical view of bonding before hybridization." },
            { slug: "hybridization", title: "Hybridization involving s and p orbitals only", hours: 1, meaning: "Orbital hybridization (sp, sp², sp³) — mixing atomic orbitals to form new hybrid orbitals that explain molecular geometries. Connects electronic structure to the shapes VSEPR predicts." },
            { slug: "bond-characteristics", title: "Bond characteristics: bond length, ionic character, dipole moment", hours: 1, meaning: "Bond length, ionic character, and dipole moment — measurable properties that describe the strength and polarity of chemical bonds. Quantifies what makes one bond different from another." },
            { slug: "vanderwaals-hydrogen-bond", title: "Vander Waal's force and molecular solids; hydrogen bonding and its application", hours: 1, meaning: "Intermolecular forces — van der Waals forces and hydrogen bonding — and how they determine the properties of molecular solids and liquids. Explains boiling points, solubility, and DNA structure." },
            { slug: "metallic-bonding", title: "Metallic bonding and properties of metallic solids", hours: 1, meaning: "Metallic bonding — a sea of delocalized electrons holding positive metal ions together. Explains why metals conduct electricity, are malleable, and have high luster." },
          ],
        },
        {
          id: "oxidation-reduction",
          title: "Oxidation and Reduction",
          hours: 5,
          topics: [
            { slug: "gen-electronic-ox-red", title: "General and electronic concept of oxidation and reduction", hours: 1, meaning: "Oxidation and reduction defined as loss/gain of oxygen or hydrogen (general concept) and as loss/gain of electrons (electronic concept). The dual definitions students need to recognize both." },
            { slug: "oxidation-number", title: "Oxidation number and rules for assigning oxidation number", hours: 1, meaning: "Oxidation numbers — the hypothetical charge an atom would have if all bonds were ionic. Rules for assigning them are essential for balancing redox reactions and naming compounds." },
            { slug: "balancing-redox", title: "Balancing redox reactions by oxidation number and ion-electron (half reaction) method", hours: 1, meaning: "Balancing redox equations using the oxidation number method and the ion-electron (half-reaction) method. A core skill for working with electrochemistry and titrations." },
            { slug: "electrolysis-qualitative", title: "Electrolysis: qualitative aspect", hours: 1, meaning: "Electrolysis — the decomposition of a substance by passing electric current through it. Qualitative aspects show how different ions discharge at electrodes based on their reactivity." },
            { slug: "electrolysis-quantitative", title: "Electrolysis: quantitative aspect (Faraday's laws of electrolysis)", hours: 1, meaning: "Faraday's laws of electrolysis — the quantitative relationship between electric charge and the amount of substance deposited or liberated. Used in electroplating and industrial processes." },
          ],
        },
        {
          id: "states-of-matter",
          title: "States of Matter",
          hours: 8,
          topics: [
            { slug: "kinetic-theory-gas", title: "Gaseous state: Kinetic theory of gas and its postulates", hours: 1, meaning: "The kinetic theory of gases — gases consist of tiny particles in constant random motion, colliding elastically. Explains gas pressure, temperature, and volume from a particle perspective." },
            { slug: "gas-laws", title: "Gas laws: Boyle's law, Charles' law, Avogadro's law, combined gas equation, Dalton's law of partial pressure, Graham's law of diffusion", hours: 2, meaning: "Boyle's, Charles's, Avogadro's, combined gas equation, Dalton's law of partial pressures, and Graham's law of diffusion. The mathematical relationships that describe gas behavior." },
            { slug: "ideal-gas-equation", title: "Ideal gas and ideal gas equation; universal gas constant and its significance", hours: 1, meaning: "The ideal gas equation PV = nRT and the significance of the universal gas constant R. Connects all gas laws into one equation for ideal gas behavior." },
            { slug: "real-gas-deviation", title: "Deviation of real gas from ideality (solving related numerical problems based on gas laws)", hours: 1, meaning: "How real gases deviate from ideal behavior at high pressure and low temperature, and why. Important for understanding liquefaction of gases and real-world applications." },
            { slug: "liquid-state", title: "Liquid state: physical properties of liquids — evaporation and condensation, vapour pressure and boiling point, surface tension and viscosity (qualitative idea only)", hours: 1, meaning: "Physical properties of liquids — evaporation, condensation, vapor pressure, boiling point, surface tension, and viscosity. Explains everyday phenomena like why water beads on surfaces." },
            { slug: "liquid-crystals", title: "Liquid crystals and their applications", hours: 1, meaning: "Liquid crystals — substances that flow like liquids but have ordered structures like crystals. Their application in display technology (LCD screens) makes this relevant to daily life." },
            { slug: "solid-state", title: "Solid state: types of solids, amorphous and crystalline solids", hours: 1, meaning: "Types of solids — crystalline (ordered) versus amorphous (disordered) — and their distinguishing properties. Sets the foundation for understanding crystal structures and X-ray diffraction." },
            { slug: "efflorescent-deliquescent", title: "Efflorescent, deliquescent and hygroscopic solids; crystallization and crystal growth; water of crystallization", hours: 1, meaning: "Efflorescence, deliquescence, and hygroscopy — how solids interact with atmospheric moisture. Explains why some chemicals crumble or dissolve in humid air, important for storage." },
            { slug: "unit-cell", title: "Introduction to unit crystal lattice and unit cell", hours: 1, meaning: "Unit cells and crystal lattices — the repeating building blocks of crystalline solids. The foundation for understanding X-ray crystallography and material properties." },
          ],
        },
        {
          id: "chemical-equilibrium",
          title: "Chemical Equilibrium",
          hours: 3,
          topics: [
            { slug: "phys-chem-equilibrium", title: "Physical and chemical equilibrium; dynamic nature of chemical equilibrium", hours: 1, meaning: "Physical and chemical equilibrium — the state where forward and reverse reactions occur at equal rates. Introduces the dynamic nature of equilibrium." },
            { slug: "law-mass-action", title: "Law of mass action", hours: 1, meaning: "The law of mass action — the rate of a reaction is proportional to the product of active masses of reactants. The basis for writing equilibrium constant expressions." },
            { slug: "equilibrium-constant", title: "Expression for equilibrium constant and its importance", hours: 1, meaning: "The equilibrium constant (K) — a numerical value that describes the extent of a reaction at equilibrium. Its importance in predicting whether a reaction favors products or reactants." },
            { slug: "kp-kc", title: "Relationship between Kp and Kc", hours: 1, meaning: "The relationship between Kp (pressure-based) and Kc (concentration-based) equilibrium constants. Allows conversion between gas-phase pressure and molar concentration expressions." },
            { slug: "le-chatelier", title: "Le Chatelier's Principle (numericals not required)", hours: 1, meaning: "Le Chatelier's Principle — how a system at equilibrium responds to changes in concentration, temperature, or pressure. Predicts the direction of shift without doing calculations." },
          ],
        },
        {
          id: "chemistry-of-non-metals",
          title: "Chemistry of Non-metals",
          hours: 21,
          topics: [
            { slug: "hydrogen-intro", title: "Hydrogen: chemistry of atomic and nascent hydrogen; isotopes of hydrogen and their uses", hours: 2, meaning: "The chemistry of hydrogen — atomic and nascent hydrogen, isotopes (protium, deuterium, tritium), and their uses. Hydrogen as the most abundant element and a potential clean fuel." },
            { slug: "hydrogen-fuel", title: "Application of hydrogen as fuel; heavy water and its applications", hours: 1, meaning: "Hydrogen as a fuel source and the applications of heavy water (D₂O) in nuclear reactors. Connects hydrogen chemistry to energy and nuclear technology." },
            { slug: "allotropes-oxygen", title: "Allotropes of oxygen: definition of allotropy and examples; oxygen — types of oxides (acidic, basic, neutral, amphoteric, peroxide and mixed oxides)", hours: 2, meaning: "Allotropes of oxygen (O₂ and O₃) and the classification of oxides — acidic, basic, neutral, amphoteric, peroxide, and mixed. Fundamental for understanding oxygen chemistry." },
            { slug: "hydrogen-peroxide-ozone", title: "Applications of hydrogen peroxide; medical and industrial application of oxygen", hours: 1, meaning: "Applications of hydrogen peroxide as an oxidizer and bleaching agent, and the medical/industrial uses of oxygen. Practical chemistry with real-world impact." },
            { slug: "ozone", title: "Ozone: occurrence, preparation of ozone from oxygen, structure of ozone, test for ozone, uses of ozone", hours: 1, meaning: "Ozone — its occurrence in the atmosphere, preparation from oxygen, structure, tests, and uses. The molecule that protects life on Earth from UV radiation." },
            { slug: "ozone-depletion", title: "Ozone layer depletion: causes, effects and control measures", hours: 1, meaning: "How CFCs and other chemicals destroy the ozone layer, the consequences (increased UV, skin cancer), and international efforts to control it. A major environmental chemistry topic for Nepal." },
            { slug: "nitrogen", title: "Nitrogen: reason for inertness of nitrogen and active nitrogen", hours: 1, meaning: "Why nitrogen gas is inert (strong triple bond) and how active nitrogen is produced. Explains why nitrogen fixation is essential for life and agriculture." },
            { slug: "ammonia", title: "Chemical properties of ammonia (action with CuSO4 solution, water, FeCl3 solution, conc. HCl, mercurous nitrate paper, O2); applications and harmful effects of ammonia", hours: 2, meaning: "Chemical properties of ammonia — its reactions with metal salts, acids, and oxygen, plus its industrial applications and harmful effects. Ammonia is one of the most produced chemicals worldwide." },
            { slug: "oxyacids-nitrogen", title: "Oxy-acids of nitrogen (name and formula)", hours: 1, meaning: "Oxyacids of nitrogen — HNO₂ (nitrous acid) and HNO₃ (nitric acid) — their names and formulas. Introduces the nitrogen oxoacid series." },
            { slug: "nitric-acid", title: "Chemical properties of nitric acid: HNO3 as an acid and oxidizing agent (action with zinc, magnesium, iron, copper, sulphur, carbon, SO2 and H2S); ring test for nitrate ion", hours: 2, meaning: "Chemical properties of nitric acid as an acid and strong oxidizing agent, plus the ring test for nitrate ions. Nitric acid is essential for fertilizers, explosives, and laboratory reagents." },
            { slug: "halogens", title: "Halogens: general characteristics of halogens; comparative study on preparation, chemical properties (with water, alkali, ammonia, oxidizing character, bleaching action) and uses of Cl2, Br2 and I2", hours: 3, meaning: "General characteristics of halogens and comparative study of Cl₂, Br₂, and I₂ — their preparation, reactions with water/alkali/ammonia, oxidizing power, and bleaching actions. The most reactive group of non-metals." },
            { slug: "halogen-tests", title: "Test for Cl2, Br2 and I2", hours: 1, meaning: "Qualitative tests to identify chlorine, bromine, and iodine — spot tests used in analytical chemistry labs. Directly applicable for board exam practicals." },
            { slug: "haloacids", title: "Haloacids (HCl, HBr and HI): comparative study on preparation, properties (reducing strength, acidic nature and solubility) and uses", hours: 1, meaning: "Haloacids (HCl, HBr, HI) — comparative study of their preparation, properties, reducing strength, acidity, and uses. Shows the trend of increasing reducing power down the group." },
            { slug: "carbon-allotropes", title: "Carbon: allotropes of carbon (crystalline and amorphous) including fullerenes (structure, general properties and uses only)", hours: 1, meaning: "Allotropes of carbon — crystalline (diamond, graphite, fullerene) and amorphous (coal, coke, charcoal). Same element, wildly different properties based on structure." },
            { slug: "carbon-monoxide", title: "Properties (reducing action, reaction with metals and nonmetals) and uses of carbon monoxide", hours: 1, meaning: "Properties and uses of carbon monoxide — its reducing action in metal extraction, reactions with metals/nonmetals, and why it is dangerously toxic. Relevant to industrial safety." },
            { slug: "phosphorus-allotropes", title: "Phosphorus: allotropes of phosphorus (name only)", hours: 1, meaning: "Allotropes of phosphorus — white and red phosphorus (names only). White phosphorus is highly reactive and stored underwater; red is stable and used in matches." },
            { slug: "phosphine", title: "Phosphine: preparation, properties (basic nature, reducing nature, action with halogens and oxygen) and uses", hours: 1, meaning: "Phosphine (PH₃) — its preparation, basic and reducing nature, reactions with halogens and oxygen, and uses. A toxic gas with important laboratory and industrial applications." },
            { slug: "sulphur-allotropes", title: "Sulphur: allotropes of sulphur (name only) and uses of sulphur", hours: 1, meaning: "Allotropes of sulphur — rhombic and monoclinic sulphur (names only), and the uses of sulphur in rubber vulcanization, pesticides, and sulfuric acid production." },
            { slug: "hydrogen-sulphide", title: "Hydrogen sulphide: preparation from Kipp's apparatus (with diagram), properties (acidic nature, reducing nature, analytical reagent) and uses", hours: 1, meaning: "Hydrogen sulphide (H₂S) — preparation using Kipp's apparatus, its acidic and reducing nature, use as an analytical reagent, and its characteristic rotten egg smell. A key qualitative analysis gas." },
            { slug: "sulphur-dioxide", title: "Sulphur dioxide: properties (acidic nature, reducing nature, oxidising nature and bleaching action) and uses", hours: 1, meaning: "Sulphur dioxide (SO₂) — its acidic, reducing, and oxidizing properties plus bleaching action, and its industrial uses. A major air pollutant and important chemical intermediate." },
            { slug: "sulphuric-acid", title: "Sulphuric acid: properties (acidic nature, oxidising nature, dehydrating nature) and uses", hours: 1, meaning: "Sulphuric acid (H₂SO₄) — its acidic, oxidizing, and dehydrating properties, and its vast industrial uses. Called the 'king of chemicals' — essential for fertilizers, batteries, and synthesis." },
            { slug: "sodium-thiosulphate", title: "Sodium thiosulphate (formula and uses)", hours: 1, meaning: "Sodium thiosulphate (Na₂S₂O₃) — its formula and uses in photography (fixer) and iodometric titrations. Connects sulphur chemistry to analytical methods." },
          ],
        },
        {
          id: "chemistry-of-metals",
          title: "Chemistry of Metals",
          hours: 10,
          topics: [
            { slug: "metallurgy-principles", title: "Metals and metallurgical principles: definition of metallurgy and its types (hydrometallurgy, pyrometallurgy, electrometallurgy)", hours: 1, meaning: "Metallurgy — the science of extracting metals from ores — and its three main types: hydrometallurgy, pyrometallurgy, and electrometallurgy. The bridge between mining and usable metal." },
            { slug: "ores-gangue-flux", title: "Introduction of ores; gangue or matrix, flux and slag, alloy and amalgam", hours: 1, meaning: "Ores, gangue (impurities), flux, slag, alloys, and amalgams — the vocabulary and terminology of metallurgy. Students need these terms to follow extraction processes." },
            { slug: "extraction-principles", title: "General principles of extraction of metals: concentration, calcination and roasting, smelting, carbon reduction, thermite and electrochemical reduction", hours: 2, meaning: "Principles of metal extraction — concentration, calcination, roasting, smelting, carbon reduction, thermite process, and electrochemical reduction. The step-by-step pathway from ore to pure metal." },
            { slug: "refining-metals", title: "Refining of metals (poling and electro-refinement)", hours: 1, meaning: "Refining of metals by poling (impure copper) and electro-refinement (purifying metals using electricity). Achieves the high purity required for industrial and electrical applications." },
            { slug: "alkali-metals", title: "Alkali metals: general characteristics of alkali metals", hours: 1, meaning: "General characteristics of alkali metals (Group 1) — their reactivity, softness, and flame colors. The most reactive metal group, stored under oil to prevent reactions with air and moisture." },
            { slug: "sodium-extraction", title: "Sodium: extraction from Down's process, properties (action with oxygen, water, acids, nonmetals and ammonia) and uses", hours: 1, meaning: "Extraction of sodium by Down's process, its reactions with oxygen/water/acids/nonmetals/ammonia, and its uses in Na-Hg amalgam and sodium vapor lamps. Demonstrates extreme reactivity of Group 1." },
            { slug: "sodium-hydroxide", title: "Sodium hydroxide: properties (precipitation reaction and action with carbon monoxide) and uses", hours: 1, meaning: "Sodium hydroxide (caustic soda) — its precipitation reactions, reaction with CO, and industrial uses in soap and paper making. One of the most important industrial bases." },
            { slug: "sodium-carbonate", title: "Sodium carbonate: properties (action with CO2, SO2, water, precipitation reactions) and uses", hours: 1, meaning: "Sodium carbonate (washing soda) — its reactions with CO₂, SO₂, water, and precipitation reactions, and uses in glass and detergent manufacturing. A versatile industrial chemical." },
            { slug: "alkaline-earth-metals", title: "Alkaline earth metals: general characteristics of alkaline earth metals", hours: 1, meaning: "General characteristics of alkaline earth metals (Group 2) — less reactive than Group 1 but still important for construction, biology, and industry." },
            { slug: "alkaline-earth-compounds", title: "Molecular formula and uses of quick lime, bleaching powder, magnesia, plaster of paris and epsom salt", hours: 1, meaning: "Molecular formulas and uses of quick lime, bleaching powder, magnesia, plaster of Paris, and Epsom salt. Everyday compounds with names students must know for the board exam." },
            { slug: "solubility-trends", title: "Solubility of hydroxides, carbonates and sulphates of alkaline earth metals (general trend with explanation)", hours: 1, meaning: "Solubility trends of hydroxides, carbonates, and sulphates of alkaline earth metals down the group, with explanations. Shows the inverse solubility trend unique to Group 2." },
            { slug: "stability-carbonate-nitrate", title: "Stability of carbonate and nitrate of alkaline earth metals (general trend with explanation)", hours: 1, meaning: "Thermal stability trends of carbonates and nitrates of alkaline earth metals down the group, with reasoning. Relates ionic size to polarization and decomposition temperature." },
          ],
        },
        {
          id: "bio-inorganic-chemistry",
          title: "Bio-inorganic Chemistry",
          hours: 3,
          topics: [
            { slug: "bio-inorg-intro", title: "Introduction to Bio-inorganic Chemistry", hours: 1, meaning: "An introduction to bio-inorganic chemistry — how inorganic elements interact with living systems. Connects chemistry to biology and medicine." },
            { slug: "micro-macro-nutrients", title: "Micro and macro nutrients", hours: 1, meaning: "Macro and micro nutrients — the elements organisms need in large vs. small amounts (e.g., Ca vs. Fe). Explains dietary requirements from a chemical perspective." },
            { slug: "metal-ions-bio", title: "Importance of metal ions in biological systems (ions of Na, K, Mg, Ca, Fe, Cu, Zn, Ni, Co, Cr)", hours: 1, meaning: "The biological importance of metal ions — Na⁺, K⁺, Mg²⁺, Ca²⁺, Fe²⁺/³⁺, Cu²⁺, Zn²⁺, Ni²⁺, Co²⁺, Cr³⁺. Each ion has specific roles in enzymes, nerve signaling, and oxygen transport." },
            { slug: "ion-pumps", title: "Ion pumps (sodium-potassium and sodium-glucose pump)", hours: 1, meaning: "Sodium-potassium pumps and sodium-glucose co-transporters — how cells actively move ions and molecules across membranes. Explains nerve impulse transmission at a molecular level." },
            { slug: "metal-toxicity", title: "Metal toxicity (toxicity due to iron, arsenic, mercury, lead and cadmium)", hours: 1, meaning: "Toxicity of heavy metals — iron overload, arsenic, mercury, lead, and cadmium poisoning. Environmentally relevant for Nepal, where water and soil contamination are growing concerns." },
          ],
        },
        {
          id: "basic-concept-organic-chemistry",
          title: "Basic Concept of Organic Chemistry",
          hours: 6,
          topics: [
            { slug: "organic-intro", title: "Introduction to organic chemistry and organic compounds", hours: 1, meaning: "What organic chemistry studies — carbon-containing compounds — and why it is a vast, distinct branch of chemistry. Carbon's unique ability to form millions of compounds." },
            { slug: "reasons-organic-study", title: "Reasons for the separate study of organic compounds from inorganic compounds", hours: 1, meaning: "Why organic compounds are studied separately from inorganic ones — differences in bonding, reactivity, and the sheer number of carbon compounds. Sets up the organizational logic of the course." },
            { slug: "tetra-covalency-catenation", title: "Tetra-covalency and catenation properties of carbon", hours: 1, meaning: "Carbon's tetravalency (four bonds) and catenation (ability to bond to itself) — the two properties that make carbon the backbone of all organic chemistry and life itself." },
            { slug: "classification-organic", title: "Classification of organic compounds", hours: 1, meaning: "How organic compounds are classified — by functional group and by structure (open chain vs. closed chain). The organizing system that makes organic chemistry manageable." },
            { slug: "alkyl-functional-groups", title: "Alkyl groups, functional groups and homologous series", hours: 1, meaning: "Alkyl groups (derivatives of alkanes), functional groups (the reactive part of a molecule), and homologous series (compounds differing by CH₂). The vocabulary for naming and categorizing organics." },
            { slug: "structural-formulae", title: "Idea of structural formula, contracted formula and bond line structural formula", hours: 1, meaning: "Structural formula, contracted formula, and bond-line (skeletal) formula — different ways to draw organic molecules concisely. Bond-line notation is used extensively in higher chemistry." },
            { slug: "cracking-reforming", title: "Preliminary idea of cracking and reforming, quality of gasoline, octane number, cetane number and gasoline additive", hours: 1, meaning: "Cracking and reforming of petroleum — breaking large hydrocarbons into smaller ones and rearranging them for better fuel quality. Octane and cetane numbers measure fuel performance." },
          ],
        },
        {
          id: "fundamental-principles-organic",
          title: "Fundamental Principles of Organic Chemistry",
          hours: 10,
          topics: [
            { slug: "iupac-nomenclature", title: "IUPAC Nomenclature of Organic Compounds (up to chain having 6-carbon atoms)", hours: 2, meaning: "IUPAC naming rules for organic compounds with up to 6 carbon atoms. The systematic naming system that lets any chemist worldwide know a compound's structure from its name." },
            { slug: "qualitative-analysis", title: "Qualitative analysis of organic compounds (detection of N, S and halogens by Lassaigne's test)", hours: 2, meaning: "Lassaigne's test — detecting nitrogen, sulfur, and halogens in organic compounds by converting them to ionic forms. The standard qualitative analysis technique taught in NEB labs." },
            { slug: "isomerism-intro", title: "Isomerism in organic compounds: definition and classification of isomerism", hours: 1, meaning: "Isomerism — when compounds have the same molecular formula but different structures. The concept that one formula can represent many distinct substances." },
            { slug: "structural-isomerism", title: "Structural isomerism and its types: chain isomerism, position isomerism, functional isomerism, metamerism and tautomerism", hours: 2, meaning: "Types of structural isomerism — chain, position, functional, metamerism, and tautomerism. Each type produces compounds with different physical and chemical properties." },
            { slug: "geometrical-optical", title: "Concept of geometrical isomerism (cis and trans) and optical isomerism (d and l form)", hours: 1, meaning: "Geometrical isomerism (cis/trans) and optical isomerism (d/l forms) — spatial arrangements that give rise to different properties despite identical connectivity. Foundation for stereochemistry." },
            { slug: "reaction-mechanism", title: "Preliminary idea of reaction mechanism: homolytic and heterolytic fission", hours: 1, meaning: "Homolytic and heterolytic bond fission — how bonds break to form free radicals or ions. The starting point for understanding every organic reaction mechanism." },
            { slug: "electrophiles-nucleophiles", title: "Electrophiles, nucleophiles and free-radicals", hours: 1, meaning: "Electrophiles (electron-loving), nucleophiles (nucleus-loving), and free radicals — the three types of reactive species that drive organic reactions. Recognizing them is key to predicting reaction pathways." },
            { slug: "inductive-effect", title: "Inductive effect: +I and -I effect", hours: 1, meaning: "The inductive effect (+I and -I) — the permanent displacement of sigma electrons along a carbon chain. Explains how substituents affect acidity, basicity, and reactivity." },
            { slug: "resonance-effect", title: "Resonance effect: +R and -R effect", hours: 1, meaning: "The resonance effect (+R and -R) — the delocalization of pi electrons or lone pairs across a conjugated system. Explains stabilization and reactivity patterns in aromatic and conjugated compounds." },
          ],
        },
        {
          id: "hydrocarbons",
          title: "Hydrocarbons",
          hours: 8,
          topics: [
            { slug: "alkanes-prep", title: "Saturated hydrocarbons (Alkanes): preparation from haloalkanes (reduction and Wurtz reaction), decarboxylation, catalytic hydrogenation of alkene and alkyne", hours: 2, meaning: "Preparation of alkanes — reduction of haloalkanes, Wurtz reaction, decarboxylation, and catalytic hydrogenation of alkenes/alkynes. Multiple routes to the same saturated hydrocarbons." },
            { slug: "alkanes-prop", title: "Chemical properties of alkanes: substitution reactions (halogenation, nitration and sulphonation only), oxidation of ethane", hours: 2, meaning: "Chemical properties of alkanes — substitution reactions (halogenation, nitration, sulphonation) and oxidation of ethane. Alkanes are relatively unreactive but undergo radical substitution." },
            { slug: "alkenes-prep", title: "Unsaturated hydrocarbons (Alkenes): preparation by dehydration of alcohol, dehydrohalogenation, catalytic hydrogenation of alkyne", hours: 1, meaning: "Preparation of alkenes — dehydration of alcohols, dehydrohalogenation, and catalytic hydrogenation of alkynes. Different routes to form carbon-carbon double bonds." },
            { slug: "alkenes-prop", title: "Chemical properties of alkenes: addition reaction with HX (Markovnikov's addition and peroxide effect), H2O, O3, H2SO4 only", hours: 1, meaning: "Chemical properties of alkenes — electrophilic addition with HX (Markovnikov's rule and peroxide effect), water, ozone, and sulfuric acid. The hallmark reactions of the alkene functional group." },
            { slug: "alkynes-prep", title: "Alkynes: preparation from carbon and hydrogen, 1,2-dibromoethane, chloroform/iodoform only", hours: 1, meaning: "Preparation of alkynes — from carbon and hydrogen, from 1,2-dibromoethane, and from chloroform/iodoform. Routes to introduce carbon-carbon triple bonds." },
            { slug: "alkynes-prop", title: "Chemical properties of alkynes: addition reaction with H2, HX, H2O; acidic nature (action with sodium, ammoniacal AgNO3 and ammoniacal Cu2Cl2)", hours: 1, meaning: "Chemical properties of alkynes — addition reactions with H₂, HX, H₂O, and their acidic nature (reaction with Na, ammoniacal AgNO₃, and Cu₂Cl₂). Terminal alkynes are uniquely acidic." },
            { slug: "test-unsaturation", title: "Test of unsaturation (ethene and ethyne): bromine water test and Baeyer's test", hours: 1, meaning: "Bromine water test and Baeyer's test — simple lab tests to distinguish unsaturated hydrocarbons (alkenes/alkynes) from saturated ones. Standard practical exam techniques." },
            { slug: "comparative-phy-prop", title: "Comparative studies of physical properties of alkane, alkene and alkyne", hours: 1, meaning: "Comparing physical properties (boiling point, melting point, solubility) of alkanes, alkenes, and alkynes. Shows how molecular structure affects physical behavior." },
            { slug: "kolbe-electrolysis", title: "Kolbe's electrolysis methods for the preparation of alkanes, alkenes and alkynes", hours: 1, meaning: "Kolbe's electrolysis — preparing alkanes, alkenes, and alkynes by electrolyzing carboxylate salts. An electrochemical route to hydrocarbons, connecting organic and electrochemistry." },
          ],
        },
        {
          id: "aromatic-hydrocarbons",
          title: "Aromatic Hydrocarbons",
          hours: 6,
          topics: [
            { slug: "aromatic-intro", title: "Introduction and characteristics of aromatic compounds", hours: 1, meaning: "What makes a compound aromatic — the special stability and reactivity pattern of benzene and related rings. Aromatic compounds are a distinct class with unique chemistry." },
            { slug: "huckel-rule", title: "Huckel's rule of aromaticity", hours: 1, meaning: "Hückel's rule (4n+2 π electrons) — the criterion for aromaticity. A simple rule that predicts whether a cyclic conjugated system will be aromatic, antiaromatic, or nonaromatic." },
            { slug: "kekule-benzene", title: "Kekule structure of benzene", hours: 1, meaning: "Kekulé's structure of benzene — the alternating double-bond model and its historical significance. Introduced the concept of a ring structure for benzene." },
            { slug: "resonance-isomerism-benzene", title: "Resonance and isomerism in benzene", hours: 1, meaning: "Resonance in benzene (two equivalent Kekulé structures) and isomerism in disubstituted benzenes (ortho, meta, para). Explains why all C-C bonds in benzene are equal in length." },
            { slug: "benzene-prep", title: "Preparation of benzene from decarboxylation of sodium benzoate, phenol, and ethyne only", hours: 1, meaning: "Preparation of benzene — from sodium benzoate (decarboxylation), phenol, and ethyne (trimerization). Connecting benzene synthesis to reactions learned in earlier units." },
            { slug: "benzene-phys-prop", title: "Physical properties of benzene", hours: 1, meaning: "Physical properties of benzene — colorless liquid, sweet smell, immiscible with water, good solvent. Benzene's physical properties make it useful industrially but also a health hazard." },
            { slug: "benzene-chem-prop", title: "Chemical properties of benzene: addition reactions (hydrogen, halogen); electrophilic substitution reactions: orientation of benzene derivatives (o, m and p), nitration, sulphonation, halogenation, Friedel-Crafts reaction (alkylation and acylation)", hours: 2, meaning: "Chemical properties of benzene — addition reactions (hydrogenation, halogenation) and electrophilic substitution reactions (nitration, sulphonation, halogenation, Friedel-Crafts). The defining reactions of aromatic chemistry." },
            { slug: "benzene-combustion", title: "Combustion of benzene (free combustion only) and uses", hours: 1, meaning: "Combustion of benzene — sooty flame due to high carbon content, and uses of benzene in industry. The smoky flame is a test for aromaticity." },
          ],
        },
        {
          id: "fundamentals-applied-chemistry",
          title: "Fundamentals of Applied Chemistry",
          hours: 4,
          topics: [
            { slug: "chem-industry", title: "Fundamentals of Applied Chemistry: chemical industry and its importance", hours: 1, meaning: "The chemical industry — what it is, what it produces, and why it is vital to the economy. Chemistry as an engine of industrial and national development." },
            { slug: "new-product-stages", title: "Stages in producing a new product", hours: 1, meaning: "The stages in developing a new chemical product — from research and design through pilot plant to full-scale production. The lifecycle of bringing a chemical from lab to market." },
            { slug: "economics-production", title: "Economics of production; cash flow in the production cycle", hours: 1, meaning: "Economics of chemical production — cash flow in the production cycle, cost analysis, and profitability. Understanding the financial side of chemistry for industry careers." },
            { slug: "chem-plant", title: "Running a chemical plant; designing a chemical plant; Continuous and batch processing", hours: 1, meaning: "Designing and running a chemical plant — continuous vs. batch processing, equipment selection, and operational considerations. Bridges lab-scale chemistry to industrial-scale production." },
            { slug: "env-impact", title: "Environmental impact of the chemical industry", hours: 1, meaning: "Environmental impact of the chemical industry — pollution, waste management, and sustainability challenges. Critical for understanding the responsibility that comes with chemical production." },
          ],
        },
        {
          id: "modern-chemical-manufactures",
          title: "Modern Chemical Manufactures",
          hours: 11,
          topics: [
            { slug: "ammonia-haber", title: "Manufacture of ammonia by Haber's process (principle and flow sheet diagram only)", hours: 2, meaning: "Haber's process for ammonia manufacture — principle and flow sheet diagram. Ammonia is the starting point for fertilizers, explosives, and countless nitrogen compounds." },
            { slug: "nitric-acid-ostwald", title: "Manufacture of nitric acid by Ostwald's process", hours: 2, meaning: "Ostwald's process for nitric acid manufacture. Nitric acid is essential for fertilizers (ammonium nitrate), explosives, and metal processing." },
            { slug: "sulphuric-acid-contact", title: "Manufacture of sulphuric acid by contact process", hours: 2, meaning: "Contact process for sulphuric acid manufacture. The most produced industrial chemical — used in fertilizers, batteries, detergents, and petrochemical refining." },
            { slug: "sodium-hydroxide-diaphragm", title: "Manufacture of sodium hydroxide by Diaphragm Cell", hours: 2, meaning: "Diaphragm cell process for sodium hydroxide manufacture. Caustic soda is essential for soap, paper, rayon, and water treatment industries." },
            { slug: "sodium-carbonate-solvay", title: "Manufacture of sodium carbonate by ammonia soda or Solvay process", hours: 2, meaning: "Solvay (ammonia-soda) process for sodium carbonate manufacture. Washing soda is used in glass, soap, and water softening industries." },
            { slug: "fertilizers-urea", title: "Fertilizers: chemical fertilizers, types of chemical fertilizers, production of urea with flow-sheet diagram", hours: 1, meaning: "Chemical fertilizers — types and the production of urea with a flow sheet diagram. Urea is the most widely used nitrogen fertilizer globally and in Nepal." },
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
            { slug: "gen-intro-chemistry", title: "General introduction of chemistry", hours: 1, meaning: "What chemistry is and where it fits among the natural sciences. Gives students the big-picture context before diving into specific topics." },
            { slug: "importance-scope-chemistry", title: "Importance and scope of chemistry", hours: 1, meaning: "How chemistry touches everyday life, industry, medicine, and the environment. Shows students why this subject matters beyond the classroom." },
          ],
        },
        {
          id: "basic-concepts",
          title: "Basic Concepts of Chemistry",
          hours: 4,
          topics: [
            { slug: "atoms-molecules", title: "Basic concepts of chemistry: atoms, molecules, relative masses of atoms and molecules, atomic mass unit (amu)", hours: 2, meaning: "The building blocks of matter — what atoms and molecules are, how we measure their masses, and why the atomic mass unit (amu) is the standard. The vocabulary and units every chemistry student needs." },
            { slug: "radicals-formulas", title: "Radicals, molecular formula, empirical formula", hours: 1, meaning: "Polyatomic ions (radicals) and how to write molecular and empirical formulas from them. Essential for reading and writing chemical equations correctly." },
            { slug: "percentage-composition", title: "Percentage composition from molecular formula", hours: 1, meaning: "How to calculate the percent by mass of each element in a compound from its formula. A practical skill used in analytical chemistry and quality control." },
          ],
        },
        {
          id: "stoichiometry",
          title: "Stoichiometry",
          hours: 8,
          topics: [
            { slug: "dalton-atomic-theory", title: "Dalton's atomic theory and its postulates", hours: 1, meaning: "Dalton's postulates about atoms — indivisible particles that combine in fixed ratios. The historical foundation that explains why chemical reactions follow predictable patterns." },
            { slug: "laws-stoichiometry", title: "Laws of stoichiometry", hours: 1, meaning: "The fundamental laws governing chemical combinations: conservation of mass, definite proportions, multiple proportions, and reciprocal proportions. The rules that make stoichiometric calculations possible." },
            { slug: "avogadro-law", title: "Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles", hours: 2, meaning: "Avogadro's law — equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. Lets students convert between gas volume, moles, and particle count." },
            { slug: "mole-concept", title: "Mole and its relation with mass, volume and number of particles", hours: 1, meaning: "The mole as the bridge between the microscopic world (atoms, molecules) and the macroscopic world (grams, liters). The single most important concept for doing chemistry calculations." },
            { slug: "mole-calculations", title: "Calculations based on mole concept", hours: 1, meaning: "Applying the mole concept to solve problems involving mass, volume, and number of particles. Practice turns the abstract concept into a practical calculation tool." },
            { slug: "limiting-reactant", title: "Limiting reactant and excess reactant", hours: 1, meaning: "How to identify which reactant runs out first and limits the amount of product formed. Critical for predicting yields in any real chemical reaction." },
            { slug: "theoretical-experimental-yield", title: "Theoretical yield, experimental yield and % yield", hours: 1, meaning: "The difference between calculated (theoretical) yield and actual (experimental) yield, and how to express efficiency as percent yield. Connects lab work to quantitative expectations." },
          ],
        },
        {
          id: "atomic-structure",
          title: "Atomic Structure",
          hours: 8,
          topics: [
            { slug: "rutherford-model", title: "Rutherford's atomic model and its limitations", hours: 1, meaning: "Rutherford's nuclear model — a dense positively charged nucleus surrounded by electrons. Introduced the concept of the atom having a central nucleus, despite its inability to explain atomic stability." },
            { slug: "bohr-model", title: "Postulates of Bohr's atomic model and its application", hours: 1, meaning: "Bohr's model of the hydrogen atom — electrons orbit in fixed energy levels and emit/absorb light when jumping between them. Explains the hydrogen spectrum and introduces quantized energy." },
            { slug: "hydrogen-spectrum", title: "Spectrum of hydrogen atom", hours: 1, meaning: "The line spectrum of hydrogen and how it arises from electron transitions between energy levels. Provides experimental proof for Bohr's quantized orbits." },
            { slug: "defects-bohr-theory", title: "Defects of Bohr's theory", hours: 1, meaning: "Why Bohr's model fails for multi-electron atoms and cannot explain fine spectral lines or the Zeeman effect. Shows the need for a more complete quantum mechanical description." },
            { slug: "de-broglie-wave", title: "Elementary idea of quantum mechanical model: de Broglie's wave equation", hours: 1, meaning: "De Broglie's hypothesis that matter has wave-like properties — every moving particle has an associated wavelength. Bridges classical and quantum views of the atom." },
            { slug: "heisenberg-uncertainty", title: "Heisenberg's Uncertainty Principle and concept of probability", hours: 1, meaning: "Heisenberg's principle — you cannot simultaneously know both the exact position and momentum of an electron. Replaces Bohr's fixed orbits with probability-based orbitals." },
            { slug: "quantum-numbers", title: "Quantum numbers", hours: 1, meaning: "Four quantum numbers (n, l, m_l, m_s) that describe the energy, shape, orientation, and spin of an electron in an atom. The complete address system for every electron." },
            { slug: "orbitals-shape", title: "Orbitals and shape of s and p orbitals only", hours: 1, meaning: "The shapes of s (spherical) and p (dumbbell) orbitals — the regions where an electron is most likely to be found. Visual tools for understanding chemical bonding." },
            { slug: "electronic-config", title: "Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)", hours: 1, meaning: "Writing electron configurations using the Aufbau principle, Pauli exclusion principle, and Hund's rule (up to atomic number 30). Predicts an element's chemical behavior from its electron arrangement." },
          ],
        },
        {
          id: "classification-elements-periodic-table",
          title: "Classification of Elements and Periodic Table",
          hours: 5,
          topics: [
            { slug: "modern-periodic-law", title: "Modern periodic law and modern periodic table", hours: 1, meaning: "The modern periodic law — properties of elements are periodic functions of their atomic numbers. The organizing principle behind the entire periodic table." },
            { slug: "groups-periods-blocks", title: "Classification of elements into different groups, periods and blocks", hours: 1, meaning: "How the periodic table is divided into groups (columns), periods (rows), and blocks (s, p, d, f) based on electron configuration. Reveals patterns in element behavior." },
            { slug: "iupac-classification", title: "IUPAC classification of elements", hours: 1, meaning: "IUPAC's systematic naming and numbering of groups (1–18) and the structure of the long-form periodic table. The universal language for discussing element positions." },
            { slug: "nuclear-charge-effective", title: "Nuclear charge and effective nuclear charge", hours: 1, meaning: "How the effective nuclear charge (Z_eff) felt by valence electrons determines atomic size and reactivity. Explains why properties change across periods and down groups." },
            { slug: "periodic-trends", title: "Periodic trend and periodicity: atomic radii, ionic radii, ionization energy, electron affinity, electronegativity, metallic characters (general trend and explanation only)", hours: 1, meaning: "Periodic trends in atomic radius, ionic radius, ionization energy, electron affinity, electronegativity, and metallic character — and the reasoning behind each trend. Predicts how elements will behave chemically." },
          ],
        },
        {
          id: "chemical-bonding-shapes",
          title: "Chemical Bonding and Shapes of Molecules",
          hours: 9,
          topics: [
            { slug: "valence-shell-octet", title: "Valence shell, valence electron and octet theory", hours: 1, meaning: "The octet rule — atoms tend to gain, lose, or share electrons to achieve a stable configuration of eight valence electrons. The basic motivation for why bonds form." },
            { slug: "ionic-bond", title: "Ionic bond and its properties", hours: 1, meaning: "Ionic bonding — the electrostatic attraction between oppositely charged ions formed by electron transfer. Explains the properties of salts: high melting points, conductivity in solution." },
            { slug: "covalent-coordinate-bond", title: "Covalent bond and coordinate covalent bond; properties of covalent compounds", hours: 1, meaning: "Covalent bonds (shared electrons) and coordinate bonds (both electrons from one atom). Distinguishes the two main types of intramolecular bonds and their properties." },
            { slug: "lewis-dot-structure", title: "Lewis dot structure of some common compounds of s and p block elements", hours: 1, meaning: "Drawing Lewis dot structures for common s- and p-block compounds to visualize bonding and lone pairs. A foundational diagramming skill for predicting molecular geometry." },
            { slug: "resonance", title: "Resonance", hours: 1, meaning: "Resonance — when a single Lewis structure cannot fully represent a molecule, and multiple structures contribute to the true hybrid. Explains bond lengths and stability in molecules like ozone and benzene." },
            { slug: "vsepr-theory", title: "VSEPR theory and shapes of simple molecules (BeF2, BF3, CH4, CH3Cl, PCl5, SF6, H2O, NH3, CO2, H2S, PH3)", hours: 2, meaning: "VSEPR theory — predicting the 3D shape of molecules from the repulsion between electron pairs around a central atom. Shape determines polarity, reactivity, and biological function." },
            { slug: "valence-bond-theory", title: "Elementary idea of Valence Bond Theory", hours: 1, meaning: "Valence Bond Theory — bonds form when atomic orbitals overlap and electrons pair up. Introduces the quantum mechanical view of bonding before hybridization." },
            { slug: "hybridization", title: "Hybridization involving s and p orbitals only", hours: 1, meaning: "Orbital hybridization (sp, sp², sp³) — mixing atomic orbitals to form new hybrid orbitals that explain molecular geometries. Connects electronic structure to the shapes VSEPR predicts." },
            { slug: "bond-characteristics", title: "Bond characteristics: bond length, ionic character, dipole moment", hours: 1, meaning: "Bond length, ionic character, and dipole moment — measurable properties that describe the strength and polarity of chemical bonds. Quantifies what makes one bond different from another." },
            { slug: "vanderwaals-hydrogen-bond", title: "Vander Waal's force and molecular solids; hydrogen bonding and its application", hours: 1, meaning: "Intermolecular forces — van der Waals forces and hydrogen bonding — and how they determine the properties of molecular solids and liquids. Explains boiling points, solubility, and DNA structure." },
            { slug: "metallic-bonding", title: "Metallic bonding and properties of metallic solids", hours: 1, meaning: "Metallic bonding — a sea of delocalized electrons holding positive metal ions together. Explains why metals conduct electricity, are malleable, and have high luster." },
          ],
        },
        {
          id: "oxidation-reduction",
          title: "Oxidation and Reduction",
          hours: 5,
          topics: [
            { slug: "gen-electronic-ox-red", title: "General and electronic concept of oxidation and reduction", hours: 1, meaning: "Oxidation and reduction defined as loss/gain of oxygen or hydrogen (general concept) and as loss/gain of electrons (electronic concept). The dual definitions students need to recognize both." },
            { slug: "oxidation-number", title: "Oxidation number and rules for assigning oxidation number", hours: 1, meaning: "Oxidation numbers — the hypothetical charge an atom would have if all bonds were ionic. Rules for assigning them are essential for balancing redox reactions and naming compounds." },
            { slug: "balancing-redox", title: "Balancing redox reactions by oxidation number and ion-electron (half reaction) method", hours: 1, meaning: "Balancing redox equations using the oxidation number method and the ion-electron (half-reaction) method. A core skill for working with electrochemistry and titrations." },
            { slug: "electrolysis-qualitative", title: "Electrolysis: qualitative aspect", hours: 1, meaning: "Electrolysis — the decomposition of a substance by passing electric current through it. Qualitative aspects show how different ions discharge at electrodes based on their reactivity." },
            { slug: "electrolysis-quantitative", title: "Electrolysis: quantitative aspect (Faraday's laws of electrolysis)", hours: 1, meaning: "Faraday's laws of electrolysis — the quantitative relationship between electric charge and the amount of substance deposited or liberated. Used in electroplating and industrial processes." },
          ],
        },
        {
          id: "states-of-matter",
          title: "States of Matter",
          hours: 8,
          topics: [
            { slug: "kinetic-theory-gas", title: "Gaseous state: Kinetic theory of gas and its postulates", hours: 1, meaning: "The kinetic theory of gases — gases consist of tiny particles in constant random motion, colliding elastically. Explains gas pressure, temperature, and volume from a particle perspective." },
            { slug: "gas-laws", title: "Gas laws: Boyle's law, Charles' law, Avogadro's law, combined gas equation, Dalton's law of partial pressure, Graham's law of diffusion", hours: 2, meaning: "Boyle's, Charles's, Avogadro's, combined gas equation, Dalton's law of partial pressures, and Graham's law of diffusion. The mathematical relationships that describe gas behavior." },
            { slug: "ideal-gas-equation", title: "Ideal gas and ideal gas equation; universal gas constant and its significance", hours: 1, meaning: "The ideal gas equation PV = nRT and the significance of the universal gas constant R. Connects all gas laws into one equation for ideal gas behavior." },
            { slug: "real-gas-deviation", title: "Deviation of real gas from ideality (solving related numerical problems based on gas laws)", hours: 1, meaning: "How real gases deviate from ideal behavior at high pressure and low temperature, and why. Important for understanding liquefaction of gases and real-world applications." },
            { slug: "liquid-state", title: "Liquid state: physical properties of liquids — evaporation and condensation, vapour pressure and boiling point, surface tension and viscosity (qualitative idea only)", hours: 1, meaning: "Physical properties of liquids — evaporation, condensation, vapor pressure, boiling point, surface tension, and viscosity. Explains everyday phenomena like why water beads on surfaces." },
            { slug: "liquid-crystals", title: "Liquid crystals and their applications", hours: 1, meaning: "Liquid crystals — substances that flow like liquids but have ordered structures like crystals. Their application in display technology (LCD screens) makes this relevant to daily life." },
            { slug: "solid-state", title: "Solid state: types of solids, amorphous and crystalline solids", hours: 1, meaning: "Types of solids — crystalline (ordered) versus amorphous (disordered) — and their distinguishing properties. Sets the foundation for understanding crystal structures and X-ray diffraction." },
            { slug: "efflorescent-deliquescent", title: "Efflorescent, deliquescent and hygroscopic solids; crystallization and crystal growth; water of crystallization", hours: 1, meaning: "Efflorescence, deliquescence, and hygroscopy — how solids interact with atmospheric moisture. Explains why some chemicals crumble or dissolve in humid air, important for storage." },
            { slug: "unit-cell", title: "Introduction to unit crystal lattice and unit cell", hours: 1, meaning: "Unit cells and crystal lattices — the repeating building blocks of crystalline solids. The foundation for understanding X-ray crystallography and material properties." },
          ],
        },
        {
          id: "chemical-equilibrium",
          title: "Chemical Equilibrium",
          hours: 3,
          topics: [
            { slug: "phys-chem-equilibrium", title: "Physical and chemical equilibrium; dynamic nature of chemical equilibrium", hours: 1, meaning: "Physical and chemical equilibrium — the state where forward and reverse reactions occur at equal rates. Introduces the dynamic nature of equilibrium." },
            { slug: "law-mass-action", title: "Law of mass action", hours: 1, meaning: "The law of mass action — the rate of a reaction is proportional to the product of active masses of reactants. The basis for writing equilibrium constant expressions." },
            { slug: "equilibrium-constant", title: "Expression for equilibrium constant and its importance", hours: 1, meaning: "The equilibrium constant (K) — a numerical value that describes the extent of a reaction at equilibrium. Its importance in predicting whether a reaction favors products or reactants." },
            { slug: "kp-kc", title: "Relationship between Kp and Kc", hours: 1, meaning: "The relationship between Kp (pressure-based) and Kc (concentration-based) equilibrium constants. Allows conversion between gas-phase pressure and molar concentration expressions." },
            { slug: "le-chatelier", title: "Le Chatelier's Principle (numericals not required)", hours: 1, meaning: "Le Chatelier's Principle — how a system at equilibrium responds to changes in concentration, temperature, or pressure. Predicts the direction of shift without doing calculations." },
          ],
        },
        {
          id: "chemistry-of-non-metals",
          title: "Chemistry of Non-metals",
          hours: 21,
          topics: [
            { slug: "hydrogen-intro", title: "Hydrogen: chemistry of atomic and nascent hydrogen; isotopes of hydrogen and their uses", hours: 2, meaning: "The chemistry of hydrogen — atomic and nascent hydrogen, isotopes (protium, deuterium, tritium), and their uses. Hydrogen as the most abundant element and a potential clean fuel." },
            { slug: "hydrogen-fuel", title: "Application of hydrogen as fuel; heavy water and its applications", hours: 1, meaning: "Hydrogen as a fuel source and the applications of heavy water (D₂O) in nuclear reactors. Connects hydrogen chemistry to energy and nuclear technology." },
            { slug: "allotropes-oxygen", title: "Allotropes of oxygen: definition of allotropy and examples; oxygen — types of oxides (acidic, basic, neutral, amphoteric, peroxide and mixed oxides)", hours: 2, meaning: "Allotropes of oxygen (O₂ and O₃) and the classification of oxides — acidic, basic, neutral, amphoteric, peroxide, and mixed. Fundamental for understanding oxygen chemistry." },
            { slug: "hydrogen-peroxide-ozone", title: "Applications of hydrogen peroxide; medical and industrial application of oxygen", hours: 1, meaning: "Applications of hydrogen peroxide as an oxidizer and bleaching agent, and the medical/industrial uses of oxygen. Practical chemistry with real-world impact." },
            { slug: "ozone", title: "Ozone: occurrence, preparation of ozone from oxygen, structure of ozone, test for ozone, uses of ozone", hours: 1, meaning: "Ozone — its occurrence in the atmosphere, preparation from oxygen, structure, tests, and uses. The molecule that protects life on Earth from UV radiation." },
            { slug: "ozone-depletion", title: "Ozone layer depletion: causes, effects and control measures", hours: 1, meaning: "How CFCs and other chemicals destroy the ozone layer, the consequences (increased UV, skin cancer), and international efforts to control it. A major environmental chemistry topic for Nepal." },
            { slug: "nitrogen", title: "Nitrogen: reason for inertness of nitrogen and active nitrogen", hours: 1, meaning: "Why nitrogen gas is inert (strong triple bond) and how active nitrogen is produced. Explains why nitrogen fixation is essential for life and agriculture." },
            { slug: "ammonia", title: "Chemical properties of ammonia (action with CuSO4 solution, water, FeCl3 solution, conc. HCl, mercurous nitrate paper, O2); applications and harmful effects of ammonia", hours: 2, meaning: "Chemical properties of ammonia — its reactions with metal salts, acids, and oxygen, plus its industrial applications and harmful effects. Ammonia is one of the most produced chemicals worldwide." },
            { slug: "oxyacids-nitrogen", title: "Oxy-acids of nitrogen (name and formula)", hours: 1, meaning: "Oxyacids of nitrogen — HNO₂ (nitrous acid) and HNO₃ (nitric acid) — their names and formulas. Introduces the nitrogen oxoacid series." },
            { slug: "nitric-acid", title: "Chemical properties of nitric acid: HNO3 as an acid and oxidizing agent (action with zinc, magnesium, iron, copper, sulphur, carbon, SO2 and H2S); ring test for nitrate ion", hours: 2, meaning: "Chemical properties of nitric acid as an acid and strong oxidizing agent, plus the ring test for nitrate ions. Nitric acid is essential for fertilizers, explosives, and laboratory reagents." },
            { slug: "halogens", title: "Halogens: general characteristics of halogens; comparative study on preparation, chemical properties (with water, alkali, ammonia, oxidizing character, bleaching action) and uses of Cl2, Br2 and I2", hours: 3, meaning: "General characteristics of halogens and comparative study of Cl₂, Br₂, and I₂ — their preparation, reactions with water/alkali/ammonia, oxidizing power, and bleaching actions. The most reactive group of non-metals." },
            { slug: "halogen-tests", title: "Test for Cl2, Br2 and I2", hours: 1, meaning: "Qualitative tests to identify chlorine, bromine, and iodine — spot tests used in analytical chemistry labs. Directly applicable for board exam practicals." },
            { slug: "haloacids", title: "Haloacids (HCl, HBr and HI): comparative study on preparation, properties (reducing strength, acidic nature and solubility) and uses", hours: 1, meaning: "Haloacids (HCl, HBr, HI) — comparative study of their preparation, properties, reducing strength, acidity, and uses. Shows the trend of increasing reducing power down the group." },
            { slug: "carbon-allotropes", title: "Carbon: allotropes of carbon (crystalline and amorphous) including fullerenes (structure, general properties and uses only)", hours: 1, meaning: "Allotropes of carbon — crystalline (diamond, graphite, fullerene) and amorphous (coal, coke, charcoal). Same element, wildly different properties based on structure." },
            { slug: "carbon-monoxide", title: "Properties (reducing action, reaction with metals and nonmetals) and uses of carbon monoxide", hours: 1, meaning: "Properties and uses of carbon monoxide — its reducing action in metal extraction, reactions with metals/nonmetals, and why it is dangerously toxic. Relevant to industrial safety." },
            { slug: "phosphorus-allotropes", title: "Phosphorus: allotropes of phosphorus (name only)", hours: 1, meaning: "Allotropes of phosphorus — white and red phosphorus (names only). White phosphorus is highly reactive and stored underwater; red is stable and used in matches." },
            { slug: "phosphine", title: "Phosphine: preparation, properties (basic nature, reducing nature, action with halogens and oxygen) and uses", hours: 1, meaning: "Phosphine (PH₃) — its preparation, basic and reducing nature, reactions with halogens and oxygen, and uses. A toxic gas with important laboratory and industrial applications." },
            { slug: "sulphur-allotropes", title: "Sulphur: allotropes of sulphur (name only) and uses of sulphur", hours: 1, meaning: "Allotropes of sulphur — rhombic and monoclinic sulphur (names only), and the uses of sulphur in rubber vulcanization, pesticides, and sulfuric acid production." },
            { slug: "hydrogen-sulphide", title: "Hydrogen sulphide: preparation from Kipp's apparatus (with diagram), properties (acidic nature, reducing nature, analytical reagent) and uses", hours: 1, meaning: "Hydrogen sulphide (H₂S) — preparation using Kipp's apparatus, its acidic and reducing nature, use as an analytical reagent, and its characteristic rotten egg smell. A key qualitative analysis gas." },
            { slug: "sulphur-dioxide", title: "Sulphur dioxide: properties (acidic nature, reducing nature, oxidising nature and bleaching action) and uses", hours: 1, meaning: "Sulphur dioxide (SO₂) — its acidic, reducing, and oxidizing properties plus bleaching action, and its industrial uses. A major air pollutant and important chemical intermediate." },
            { slug: "sulphuric-acid", title: "Sulphuric acid: properties (acidic nature, oxidising nature, dehydrating nature) and uses", hours: 1, meaning: "Sulphuric acid (H₂SO₄) — its acidic, oxidizing, and dehydrating properties, and its vast industrial uses. Called the 'king of chemicals' — essential for fertilizers, batteries, and synthesis." },
            { slug: "sodium-thiosulphate", title: "Sodium thiosulphate (formula and uses)", hours: 1, meaning: "Sodium thiosulphate (Na₂S₂O₃) — its formula and uses in photography (fixer) and iodometric titrations. Connects sulphur chemistry to analytical methods." },
          ],
        },
        {
          id: "chemistry-of-metals",
          title: "Chemistry of Metals",
          hours: 10,
          topics: [
            { slug: "metallurgy-principles", title: "Metals and metallurgical principles: definition of metallurgy and its types (hydrometallurgy, pyrometallurgy, electrometallurgy)", hours: 1, meaning: "Metallurgy — the science of extracting metals from ores — and its three main types: hydrometallurgy, pyrometallurgy, and electrometallurgy. The bridge between mining and usable metal." },
            { slug: "ores-gangue-flux", title: "Introduction of ores; gangue or matrix, flux and slag, alloy and amalgam", hours: 1, meaning: "Ores, gangue (impurities), flux, slag, alloys, and amalgams — the vocabulary and terminology of metallurgy. Students need these terms to follow extraction processes." },
            { slug: "extraction-principles", title: "General principles of extraction of metals: concentration, calcination and roasting, smelting, carbon reduction, thermite and electrochemical reduction", hours: 2, meaning: "Principles of metal extraction — concentration, calcination, roasting, smelting, carbon reduction, thermite process, and electrochemical reduction. The step-by-step pathway from ore to pure metal." },
            { slug: "refining-metals", title: "Refining of metals (poling and electro-refinement)", hours: 1, meaning: "Refining of metals by poling (impure copper) and electro-refinement (purifying metals using electricity). Achieves the high purity required for industrial and electrical applications." },
            { slug: "alkali-metals", title: "Alkali metals: general characteristics of alkali metals", hours: 1, meaning: "General characteristics of alkali metals (Group 1) — their reactivity, softness, and flame colors. The most reactive metal group, stored under oil to prevent reactions with air and moisture." },
            { slug: "sodium-extraction", title: "Sodium: extraction from Down's process, properties (action with oxygen, water, acids, nonmetals and ammonia) and uses", hours: 1, meaning: "Extraction of sodium by Down's process, its reactions with oxygen/water/acids/nonmetals/ammonia, and its uses in Na-Hg amalgam and sodium vapor lamps. Demonstrates extreme reactivity of Group 1." },
            { slug: "sodium-hydroxide", title: "Sodium hydroxide: properties (precipitation reaction and action with carbon monoxide) and uses", hours: 1, meaning: "Sodium hydroxide (caustic soda) — its precipitation reactions, reaction with CO, and industrial uses in soap and paper making. One of the most important industrial bases." },
            { slug: "sodium-carbonate", title: "Sodium carbonate: properties (action with CO2, SO2, water, precipitation reactions) and uses", hours: 1, meaning: "Sodium carbonate (washing soda) — its reactions with CO₂, SO₂, water, and precipitation reactions, and uses in glass and detergent manufacturing. A versatile industrial chemical." },
            { slug: "alkaline-earth-metals", title: "Alkaline earth metals: general characteristics of alkaline earth metals", hours: 1, meaning: "General characteristics of alkaline earth metals (Group 2) — less reactive than Group 1 but still important for construction, biology, and industry." },
            { slug: "alkaline-earth-compounds", title: "Molecular formula and uses of quick lime, bleaching powder, magnesia, plaster of paris and epsom salt", hours: 1, meaning: "Molecular formulas and uses of quick lime, bleaching powder, magnesia, plaster of Paris, and Epsom salt. Everyday compounds with names students must know for the board exam." },
            { slug: "solubility-trends", title: "Solubility of hydroxides, carbonates and sulphates of alkaline earth metals (general trend with explanation)", hours: 1, meaning: "Solubility trends of hydroxides, carbonates, and sulphates of alkaline earth metals down the group, with explanations. Shows the inverse solubility trend unique to Group 2." },
            { slug: "stability-carbonate-nitrate", title: "Stability of carbonate and nitrate of alkaline earth metals (general trend with explanation)", hours: 1, meaning: "Thermal stability trends of carbonates and nitrates of alkaline earth metals down the group, with reasoning. Relates ionic size to polarization and decomposition temperature." },
          ],
        },
        {
          id: "bio-inorganic-chemistry",
          title: "Bio-inorganic Chemistry",
          hours: 3,
          topics: [
            { slug: "bio-inorg-intro", title: "Introduction to Bio-inorganic Chemistry", hours: 1, meaning: "An introduction to bio-inorganic chemistry — how inorganic elements interact with living systems. Connects chemistry to biology and medicine." },
            { slug: "micro-macro-nutrients", title: "Micro and macro nutrients", hours: 1, meaning: "Macro and micro nutrients — the elements organisms need in large vs. small amounts (e.g., Ca vs. Fe). Explains dietary requirements from a chemical perspective." },
            { slug: "metal-ions-bio", title: "Importance of metal ions in biological systems (ions of Na, K, Mg, Ca, Fe, Cu, Zn, Ni, Co, Cr)", hours: 1, meaning: "The biological importance of metal ions — Na⁺, K⁺, Mg²⁺, Ca²⁺, Fe²⁺/³⁺, Cu²⁺, Zn²⁺, Ni²⁺, Co²⁺, Cr³⁺. Each ion has specific roles in enzymes, nerve signaling, and oxygen transport." },
            { slug: "ion-pumps", title: "Ion pumps (sodium-potassium and sodium-glucose pump)", hours: 1, meaning: "Sodium-potassium pumps and sodium-glucose co-transporters — how cells actively move ions and molecules across membranes. Explains nerve impulse transmission at a molecular level." },
            { slug: "metal-toxicity", title: "Metal toxicity (toxicity due to iron, arsenic, mercury, lead and cadmium)", hours: 1, meaning: "Toxicity of heavy metals — iron overload, arsenic, mercury, lead, and cadmium poisoning. Environmentally relevant for Nepal, where water and soil contamination are growing concerns." },
          ],
        },
        {
          id: "basic-concept-organic-chemistry",
          title: "Basic Concept of Organic Chemistry",
          hours: 6,
          topics: [
            { slug: "organic-intro", title: "Introduction to organic chemistry and organic compounds", hours: 1, meaning: "What organic chemistry studies — carbon-containing compounds — and why it is a vast, distinct branch of chemistry. Carbon's unique ability to form millions of compounds." },
            { slug: "reasons-organic-study", title: "Reasons for the separate study of organic compounds from inorganic compounds", hours: 1, meaning: "Why organic compounds are studied separately from inorganic ones — differences in bonding, reactivity, and the sheer number of carbon compounds. Sets up the organizational logic of the course." },
            { slug: "tetra-covalency-catenation", title: "Tetra-covalency and catenation properties of carbon", hours: 1, meaning: "Carbon's tetravalency (four bonds) and catenation (ability to bond to itself) — the two properties that make carbon the backbone of all organic chemistry and life itself." },
            { slug: "classification-organic", title: "Classification of organic compounds", hours: 1, meaning: "How organic compounds are classified — by functional group and by structure (open chain vs. closed chain). The organizing system that makes organic chemistry manageable." },
            { slug: "alkyl-functional-groups", title: "Alkyl groups, functional groups and homologous series", hours: 1, meaning: "Alkyl groups (derivatives of alkanes), functional groups (the reactive part of a molecule), and homologous series (compounds differing by CH₂). The vocabulary for naming and categorizing organics." },
            { slug: "structural-formulae", title: "Idea of structural formula, contracted formula and bond line structural formula", hours: 1, meaning: "Structural formula, contracted formula, and bond-line (skeletal) formula — different ways to draw organic molecules concisely. Bond-line notation is used extensively in higher chemistry." },
            { slug: "cracking-reforming", title: "Preliminary idea of cracking and reforming, quality of gasoline, octane number, cetane number and gasoline additive", hours: 1, meaning: "Cracking and reforming of petroleum — breaking large hydrocarbons into smaller ones and rearranging them for better fuel quality. Octane and cetane numbers measure fuel performance." },
          ],
        },
        {
          id: "fundamental-principles-organic",
          title: "Fundamental Principles of Organic Chemistry",
          hours: 10,
          topics: [
            { slug: "iupac-nomenclature", title: "IUPAC Nomenclature of Organic Compounds (up to chain having 6-carbon atoms)", hours: 2, meaning: "IUPAC naming rules for organic compounds with up to 6 carbon atoms. The systematic naming system that lets any chemist worldwide know a compound's structure from its name." },
            { slug: "qualitative-analysis", title: "Qualitative analysis of organic compounds (detection of N, S and halogens by Lassaigne's test)", hours: 2, meaning: "Lassaigne's test — detecting nitrogen, sulfur, and halogens in organic compounds by converting them to ionic forms. The standard qualitative analysis technique taught in NEB labs." },
            { slug: "isomerism-intro", title: "Isomerism in organic compounds: definition and classification of isomerism", hours: 1, meaning: "Isomerism — when compounds have the same molecular formula but different structures. The concept that one formula can represent many distinct substances." },
            { slug: "structural-isomerism", title: "Structural isomerism and its types: chain isomerism, position isomerism, functional isomerism, metamerism and tautomerism", hours: 2, meaning: "Types of structural isomerism — chain, position, functional, metamerism, and tautomerism. Each type produces compounds with different physical and chemical properties." },
            { slug: "geometrical-optical", title: "Concept of geometrical isomerism (cis and trans) and optical isomerism (d and l form)", hours: 1, meaning: "Geometrical isomerism (cis/trans) and optical isomerism (d/l forms) — spatial arrangements that give rise to different properties despite identical connectivity. Foundation for stereochemistry." },
            { slug: "reaction-mechanism", title: "Preliminary idea of reaction mechanism: homolytic and heterolytic fission", hours: 1, meaning: "Homolytic and heterolytic bond fission — how bonds break to form free radicals or ions. The starting point for understanding every organic reaction mechanism." },
            { slug: "electrophiles-nucleophiles", title: "Electrophiles, nucleophiles and free-radicals", hours: 1, meaning: "Electrophiles (electron-loving), nucleophiles (nucleus-loving), and free radicals — the three types of reactive species that drive organic reactions. Recognizing them is key to predicting reaction pathways." },
            { slug: "inductive-effect", title: "Inductive effect: +I and -I effect", hours: 1, meaning: "The inductive effect (+I and -I) — the permanent displacement of sigma electrons along a carbon chain. Explains how substituents affect acidity, basicity, and reactivity." },
            { slug: "resonance-effect", title: "Resonance effect: +R and -R effect", hours: 1, meaning: "The resonance effect (+R and -R) — the delocalization of pi electrons or lone pairs across a conjugated system. Explains stabilization and reactivity patterns in aromatic and conjugated compounds." },
          ],
        },
        {
          id: "hydrocarbons",
          title: "Hydrocarbons",
          hours: 8,
          topics: [
            { slug: "alkanes-prep", title: "Saturated hydrocarbons (Alkanes): preparation from haloalkanes (reduction and Wurtz reaction), decarboxylation, catalytic hydrogenation of alkene and alkyne", hours: 2, meaning: "Preparation of alkanes — reduction of haloalkanes, Wurtz reaction, decarboxylation, and catalytic hydrogenation of alkenes/alkynes. Multiple routes to the same saturated hydrocarbons." },
            { slug: "alkanes-prop", title: "Chemical properties of alkanes: substitution reactions (halogenation, nitration and sulphonation only), oxidation of ethane", hours: 2, meaning: "Chemical properties of alkanes — substitution reactions (halogenation, nitration, sulphonation) and oxidation of ethane. Alkanes are relatively unreactive but undergo radical substitution." },
            { slug: "alkenes-prep", title: "Unsaturated hydrocarbons (Alkenes): preparation by dehydration of alcohol, dehydrohalogenation, catalytic hydrogenation of alkyne", hours: 1, meaning: "Preparation of alkenes — dehydration of alcohols, dehydrohalogenation, and catalytic hydrogenation of alkynes. Different routes to form carbon-carbon double bonds." },
            { slug: "alkenes-prop", title: "Chemical properties of alkenes: addition reaction with HX (Markovnikov's addition and peroxide effect), H2O, O3, H2SO4 only", hours: 1, meaning: "Chemical properties of alkenes — electrophilic addition with HX (Markovnikov's rule and peroxide effect), water, ozone, and sulfuric acid. The hallmark reactions of the alkene functional group." },
            { slug: "alkynes-prep", title: "Alkynes: preparation from carbon and hydrogen, 1,2-dibromoethane, chloroform/iodoform only", hours: 1, meaning: "Preparation of alkynes — from carbon and hydrogen, from 1,2-dibromoethane, and from chloroform/iodoform. Routes to introduce carbon-carbon triple bonds." },
            { slug: "alkynes-prop", title: "Chemical properties of alkynes: addition reaction with H2, HX, H2O; acidic nature (action with sodium, ammoniacal AgNO3 and ammoniacal Cu2Cl2)", hours: 1, meaning: "Chemical properties of alkynes — addition reactions with H₂, HX, H₂O, and their acidic nature (reaction with Na, ammoniacal AgNO₃, and Cu₂Cl₂). Terminal alkynes are uniquely acidic." },
            { slug: "test-unsaturation", title: "Test of unsaturation (ethene and ethyne): bromine water test and Baeyer's test", hours: 1, meaning: "Bromine water test and Baeyer's test — simple lab tests to distinguish unsaturated hydrocarbons (alkenes/alkynes) from saturated ones. Standard practical exam techniques." },
            { slug: "comparative-phy-prop", title: "Comparative studies of physical properties of alkane, alkene and alkyne", hours: 1, meaning: "Comparing physical properties (boiling point, melting point, solubility) of alkanes, alkenes, and alkynes. Shows how molecular structure affects physical behavior." },
            { slug: "kolbe-electrolysis", title: "Kolbe's electrolysis methods for the preparation of alkanes, alkenes and alkynes", hours: 1, meaning: "Kolbe's electrolysis — preparing alkanes, alkenes, and alkynes by electrolyzing carboxylate salts. An electrochemical route to hydrocarbons, connecting organic and electrochemistry." },
          ],
        },
        {
          id: "aromatic-hydrocarbons",
          title: "Aromatic Hydrocarbons",
          hours: 6,
          topics: [
            { slug: "aromatic-intro", title: "Introduction and characteristics of aromatic compounds", hours: 1, meaning: "What makes a compound aromatic — the special stability and reactivity pattern of benzene and related rings. Aromatic compounds are a distinct class with unique chemistry." },
            { slug: "huckel-rule", title: "Huckel's rule of aromaticity", hours: 1, meaning: "Hückel's rule (4n+2 π electrons) — the criterion for aromaticity. A simple rule that predicts whether a cyclic conjugated system will be aromatic, antiaromatic, or nonaromatic." },
            { slug: "kekule-benzene", title: "Kekule structure of benzene", hours: 1, meaning: "Kekulé's structure of benzene — the alternating double-bond model and its historical significance. Introduced the concept of a ring structure for benzene." },
            { slug: "resonance-isomerism-benzene", title: "Resonance and isomerism in benzene", hours: 1, meaning: "Resonance in benzene (two equivalent Kekulé structures) and isomerism in disubstituted benzenes (ortho, meta, para). Explains why all C-C bonds in benzene are equal in length." },
            { slug: "benzene-prep", title: "Preparation of benzene from decarboxylation of sodium benzoate, phenol, and ethyne only", hours: 1, meaning: "Preparation of benzene — from sodium benzoate (decarboxylation), phenol, and ethyne (trimerization). Connecting benzene synthesis to reactions learned in earlier units." },
            { slug: "benzene-phys-prop", title: "Physical properties of benzene", hours: 1, meaning: "Physical properties of benzene — colorless liquid, sweet smell, immiscible with water, good solvent. Benzene's physical properties make it useful industrially but also a health hazard." },
            { slug: "benzene-chem-prop", title: "Chemical properties of benzene: addition reactions (hydrogen, halogen); electrophilic substitution reactions: orientation of benzene derivatives (o, m and p), nitration, sulphonation, halogenation, Friedel-Crafts reaction (alkylation and acylation)", hours: 2, meaning: "Chemical properties of benzene — addition reactions (hydrogenation, halogenation) and electrophilic substitution reactions (nitration, sulphonation, halogenation, Friedel-Crafts). The defining reactions of aromatic chemistry." },
            { slug: "benzene-combustion", title: "Combustion of benzene (free combustion only) and uses", hours: 1, meaning: "Combustion of benzene — sooty flame due to high carbon content, and uses of benzene in industry. The smoky flame is a test for aromaticity." },
          ],
        },
        {
          id: "fundamentals-applied-chemistry",
          title: "Fundamentals of Applied Chemistry",
          hours: 4,
          topics: [
            { slug: "chem-industry", title: "Fundamentals of Applied Chemistry: chemical industry and its importance", hours: 1, meaning: "The chemical industry — what it is, what it produces, and why it is vital to the economy. Chemistry as an engine of industrial and national development." },
            { slug: "new-product-stages", title: "Stages in producing a new product", hours: 1, meaning: "The stages in developing a new chemical product — from research and design through pilot plant to full-scale production. The lifecycle of bringing a chemical from lab to market." },
            { slug: "economics-production", title: "Economics of production; cash flow in the production cycle", hours: 1, meaning: "Economics of chemical production — cash flow in the production cycle, cost analysis, and profitability. Understanding the financial side of chemistry for industry careers." },
            { slug: "chem-plant", title: "Running a chemical plant; designing a chemical plant; Continuous and batch processing", hours: 1, meaning: "Designing and running a chemical plant — continuous vs. batch processing, equipment selection, and operational considerations. Bridges lab-scale chemistry to industrial-scale production." },
            { slug: "env-impact", title: "Environmental impact of the chemical industry", hours: 1, meaning: "Environmental impact of the chemical industry — pollution, waste management, and sustainability challenges. Critical for understanding the responsibility that comes with chemical production." },
          ],
        },
        {
          id: "modern-chemical-manufactures",
          title: "Modern Chemical Manufactures",
          hours: 11,
          topics: [
            { slug: "ammonia-haber", title: "Manufacture of ammonia by Haber's process (principle and flow sheet diagram only)", hours: 2, meaning: "Haber's process for ammonia manufacture — principle and flow sheet diagram. Ammonia is the starting point for fertilizers, explosives, and countless nitrogen compounds." },
            { slug: "nitric-acid-ostwald", title: "Manufacture of nitric acid by Ostwald's process", hours: 2, meaning: "Ostwald's process for nitric acid manufacture. Nitric acid is essential for fertilizers (ammonium nitrate), explosives, and metal processing." },
            { slug: "sulphuric-acid-contact", title: "Manufacture of sulphuric acid by contact process", hours: 2, meaning: "Contact process for sulphuric acid manufacture. The most produced industrial chemical — used in fertilizers, batteries, detergents, and petrochemical refining." },
            { slug: "sodium-hydroxide-diaphragm", title: "Manufacture of sodium hydroxide by Diaphragm Cell", hours: 2, meaning: "Diaphragm cell process for sodium hydroxide manufacture. Caustic soda is essential for soap, paper, rayon, and water treatment industries." },
            { slug: "sodium-carbonate-solvay", title: "Manufacture of sodium carbonate by ammonia soda or Solvay process", hours: 2, meaning: "Solvay (ammonia-soda) process for sodium carbonate manufacture. Washing soda is used in glass, soap, and water softening industries." },
            { slug: "fertilizers-urea", title: "Fertilizers: chemical fertilizers, types of chemical fertilizers, production of urea with flow-sheet diagram", hours: 1, meaning: "Chemical fertilizers — types and the production of urea with a flow sheet diagram. Urea is the most widely used nitrogen fertilizer globally and in Nepal." },
            { slug: "green-chemistry-intro", title: "Introduction to Green Chemistry and its 12 principles", hours: 1, addedInYear: 2081, meaning: "Green chemistry and its 12 principles — designing chemical products and processes that reduce or eliminate hazardous substances. Added in 2081 BS to promote sustainable chemistry practices." },
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
            { slug: "types-solutions-concentration", title: "Types of solutions and expression of concentration", hours: 2, meaning: "Types of solutions and ways to express concentration — molarity, molality, mole fraction, percentage. Different units are used in different contexts (lab vs. industry vs. theory)." },
            { slug: "solubility-gases-solids", title: "Solubility of gases and solids in liquids", hours: 1, meaning: "Solubility of gases (Henry's law) and solids in liquids — how temperature and pressure affect how much solute dissolves. Explains why soda goes flat and why sugar dissolves better in hot tea." },
            { slug: "vapour-pressure-raoult", title: "Vapour pressure of solutions — Raoult's law", hours: 1, meaning: "Raoult's law — the vapor pressure of a solution is proportional to the mole fraction of the solvent. The foundation for understanding colligative properties." },
            { slug: "colligative-properties", title: "Colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure", hours: 2, meaning: "Colligative properties — relative lowering of vapor pressure, boiling point elevation, freezing point depression, and osmotic pressure. Properties that depend on the NUMBER of particles, not their identity." },
            { slug: "vants-hoff-factor", title: "Van't Hoff factor and abnormal molar masses", hours: 1, meaning: "Van't Hoff factor — correcting colligative property calculations for substances that dissociate or associate in solution. Explains why NaCl lowers freezing point twice as much as glucose." },
          ],
        },
        {
          id: "electro-chemistry",
          title: "Electrochemistry",
          hours: 8,
          topics: [
            { slug: "ox-red-electrode", title: "Oxidation and reduction — electrode reactions", hours: 1, meaning: "Electrode reactions — oxidation at the anode, reduction at the cathode. The fundamental half-reactions that make electrochemical cells work." },
            { slug: "electrochemical-cells", title: "Electrochemical cells — galvanic cell, cell potential, standard electrode potential", hours: 2, meaning: "Galvanic cells, cell potential, and standard electrode potential — how chemical energy is converted to electrical energy. The principle behind batteries and corrosion." },
            { slug: "nernst-equation", title: "Nernst equation and its applications", hours: 2, meaning: "Nernst equation — calculating cell potential under non-standard conditions. Essential for understanding how concentration affects battery voltage and for solving electrochemistry problems." },
            { slug: "conductance-electrolytes", title: "Conductance of electrolytic solutions", hours: 1, meaning: "Conductance of electrolytic solutions — how well ionic solutions conduct electricity and the factors affecting it. Used in water quality testing and industrial process monitoring." },
            { slug: "electrolysis-faraday", title: "Electrolysis and Faraday's laws", hours: 1, meaning: "Electrolysis and Faraday's laws — using electricity to drive chemical reactions. Applications include electroplating, metal refining, and chlorine production." },
            { slug: "batteries", title: "Batteries — primary and secondary cells", hours: 1, meaning: "Primary and secondary cells — single-use batteries vs. rechargeable batteries. The chemistry behind AA cells, car batteries, and lithium-ion cells." },
            { slug: "fuel-cells", title: "Fuel cells", hours: 1, meaning: "Fuel cells — devices that convert chemical energy directly to electricity using hydrogen and oxygen. A clean energy technology with applications in vehicles and space missions." },
          ],
        },
        {
          id: "chemical-kinetics",
          title: "Chemical Kinetics",
          hours: 6,
          topics: [
            { slug: "rate-reaction", title: "Rate of reaction — average and instantaneous rate", hours: 1, meaning: "Rate of reaction — average rate (over a time interval) and instantaneous rate (at a specific moment). Measuring how fast reactions proceed is fundamental to controlling industrial processes." },
            { slug: "factors-rate", title: "Factors affecting rate of reaction", hours: 1, meaning: "Factors affecting reaction rate — concentration, temperature, catalysts, and surface area. Understanding these lets chemists speed up or slow down reactions as needed." },
            { slug: "rate-law-order", title: "Rate law and order of reaction", hours: 1, meaning: "Rate law and order of reaction — the mathematical relationship between reaction rate and reactant concentrations. Determined experimentally, not from the balanced equation." },
            { slug: "integrated-rate-eq", title: "Integrated rate equations — zero order and first order reactions", hours: 2, meaning: "Integrated rate equations for zero-order and first-order reactions — relating concentration to time. Used to calculate half-lives and predict how long reactions take." },
            { slug: "arrhenius-equation", title: "Arrhenius equation and activation energy", hours: 1, meaning: "Arrhenius equation and activation energy — how temperature affects reaction rate constants. Explains why reactions speed up dramatically with small temperature increases." },
          ],
        },
        {
          id: "general-organic-fundamentals",
          title: "General and Fundamental Principles of Organic Chemistry",
          hours: 8,
          topics: [
            { slug: "purification-analysis", title: "Purification and qualitative/quantitative analysis of organic compounds", hours: 2, meaning: "Purification and qualitative/quantitative analysis of organic compounds — distillation, crystallization, chromatography, and elemental analysis. The lab skills needed to isolate and identify organic products." },
            { slug: "inductive-resonance-hyperconj", title: "Inductive effect, resonance, hyperconjugation", hours: 2, meaning: "Inductive effect, resonance, and hyperconjugation — the three electronic effects that stabilize carbocations, carbanions, and free radicals. Key to understanding reactivity patterns in organic chemistry." },
            { slug: "elec-nuc-subst", title: "Electrophilic and nucleophilic substitution reactions", hours: 2, meaning: "Electrophilic and nucleophilic substitution reactions — the two fundamental reaction types in organic chemistry. Most organic synthesis involves one or the other." },
            { slug: "free-radical-reactions", title: "Free radical reactions", hours: 1, meaning: "Free radical reactions — chain reactions involving radical intermediates (initiation, propagation, termination). Explains alkane halogenation and polymerization mechanisms." },
            { slug: "important-org-reactions", title: "Important organic reactions: oxidation, reduction, addition, elimination", hours: 1, meaning: "Important organic reaction types — oxidation, reduction, addition, and elimination. The four reaction categories that cover most organic transformations." },
          ],
        },
        {
          id: "hydrocarbons-12",
          title: "Hydrocarbons",
          hours: 7,
          topics: [
            { slug: "alkanes-conformations", title: "Alkanes: conformations, combustion, free radical halogenation", hours: 2, meaning: "Alkanes — conformations (rotation around C-C bonds), combustion, and free radical halogenation. Conformational analysis explains the 3D flexibility of hydrocarbon chains." },
            { slug: "alkenes-prep-12", title: "Alkenes: preparation, geometrical isomerism, electrophilic addition (Markovnikov, anti-Markovnikov), ozonolysis, polymerisation", hours: 2, meaning: "Alkenes — preparation, geometrical isomerism, electrophilic addition (Markovnikov and anti-Markovnikov), ozonolysis, and polymerization. The reactions that build polymers and break molecules for analysis." },
            { slug: "alkynes-prep-12", title: "Alkynes: preparation, acidic character, addition reactions", hours: 1, meaning: "Alkynes — preparation, acidic character of terminal alkynes, and addition reactions. Terminal alkynes are unique among hydrocarbons in being acidic enough to react with bases." },
            { slug: "aromatic-hydrocarbons-12", title: "Aromatic hydrocarbons: benzene — resonance, aromaticity, electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts)", hours: 2, meaning: "Aromatic hydrocarbons — benzene resonance, aromaticity, and electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts). The cornerstone reactions of aromatic chemistry." },
          ],
        },
        {
          id: "alcohols-phenols-ethers",
          title: "Alcohols, Phenols and Ethers",
          hours: 7,
          topics: [
            { slug: "alcohols-class", title: "Alcohols: classification, preparation, physical and chemical properties", hours: 2, meaning: "Alcohols — classification (primary, secondary, tertiary), preparation methods, and physical and chemical properties. Alcohol reactivity depends strongly on which carbon bears the -OH group." },
            { slug: "phenols", title: "Phenols: acidity, electrophilic substitution, Kolbe's reaction, Reimer-Tiemann reaction", hours: 2, meaning: "Phenols — their acidity (why phenol is more acidic than alcohol), electrophilic substitution, Kolbe's reaction, and Reimer-Tiemann reaction. Phenol is a key industrial chemical and precursor." },
            { slug: "ethers", title: "Ethers: preparation and chemical reactions (cleavage by HI)", hours: 1, meaning: "Ethers — preparation and chemical reactions, especially cleavage by HI. Ethers are important solvents and starting materials in organic synthesis." },
            { slug: "testing-alcohols-phenols", title: "Tests to distinguish alcohols, phenols and ethers", hours: 2, meaning: "Tests to distinguish alcohols, phenols, and ethers — Lucas test, FeCl₃ test, and Victor Meyer test. Standard qualitative analysis techniques for the board exam practical." },
          ],
        },
        {
          id: "aldehydes-ketones-carboxylic-acids",
          title: "Aldehydes, Ketones and Carboxylic Acids",
          hours: 10,
          topics: [
            { slug: "ald-ket-prep", title: "Aldehydes and ketones: preparation, physical properties, nucleophilic addition reactions", hours: 3, meaning: "Aldehydes and ketones — preparation, physical properties, and nucleophilic addition reactions. The carbonyl group (C=O) is one of the most reactive functional groups in organic chemistry." },
            { slug: "carboxylic-acids", title: "Carboxylic acids: preparation, physical properties, acidic character, reactions", hours: 3, meaning: "Carboxylic acids — preparation, physical properties, acidic character, and reactions. Carboxylic acids are central to biochemistry (amino acids, fatty acids) and industry." },
            { slug: "name-reactions", title: "Name reactions: Aldol condensation, Cannizzaro reaction, HVZ reaction", hours: 2, meaning: "Name reactions — Aldol condensation, Cannizzaro reaction, and HVZ (Hell-Volhard-Zelinsky) reaction. Named reactions are high-yield topics for board exams." },
            { slug: "acid-derivatives", title: "Acid derivatives: acyl chlorides, acid anhydrides, esters and amides — preparation and reactions", hours: 2, meaning: "Acid derivatives — acyl chlorides, acid anhydrides, esters, and amides — their preparation and interconversion reactions. These derivatives link carboxylic acid chemistry to polymer and peptide synthesis." },
          ],
        },
        {
          id: "amines",
          title: "Amines",
          hours: 6,
          topics: [
            { slug: "amine-class-nom", title: "Classification, nomenclature and preparation", hours: 2, meaning: "Amines — classification (primary, secondary, tertiary), IUPAC nomenclature, and preparation methods. Amines are derivatives of ammonia and are fundamental to biochemistry." },
            { slug: "amine-phys-prop", title: "Physical and chemical properties", hours: 2, meaning: "Amines — physical and chemical properties. Lower amines are gases with fishy smells; higher ones are liquids or solids. Their basicity and nucleophilicity drive their reactivity." },
            { slug: "basic-character-amine", title: "Basic character of amines", hours: 1, meaning: "Basic character of amines — why amines are basic (lone pair on nitrogen), factors affecting basicity, and comparisons between aliphatic and aromatic amines. Critical for understanding amine reactivity." },
            { slug: "amine-reactions", title: "Reactions: diazotisation, coupling reactions, Hinsberg test", hours: 1, meaning: "Amine reactions — diazotisation, coupling reactions, and Hinsberg test. Diazonium salts from aromatic amines are versatile intermediates in organic synthesis." },
          ],
        },
        {
          id: "biomolecules",
          title: "Biomolecules",
          hours: 5,
          topics: [
            { slug: "carbohydrates", title: "Carbohydrates: monosaccharides (glucose, fructose), disaccharides, polysaccharides", hours: 2, meaning: "Carbohydrates — monosaccharides (glucose, fructose), disaccharides, and polysaccharides (starch, cellulose, glycogen). The most abundant biomolecules and the primary energy source for living organisms." },
            { slug: "proteins", title: "Proteins: amino acids, peptide bond, primary to quaternary structure, denaturation", hours: 1, meaning: "Proteins — amino acids, peptide bonds, and primary to quaternary structure, plus denaturation. Proteins are the workhorses of cells — enzymes, structures, and signals." },
            { slug: "enzymes", title: "Enzymes: definition, classification, enzyme action", hours: 1, meaning: "Enzymes — definition, classification, and enzyme action (lock-and-key vs. induced fit model). Enzymes are biological catalysts that make life-sustaining reactions fast enough to matter." },
            { slug: "vitamins", title: "Vitamins: classification and functions", hours: 1, meaning: "Vitamins — classification (fat-soluble A, D, E, K and water-soluble B-complex and C) and their functions. Vitamin deficiencies are common health issues in Nepal, making this topic practically relevant." },
            { slug: "hormones", title: "Hormones: definition, types, functions", hours: 1, meaning: "Hormones — definition, types (steroid, peptide, amine), and functions. Hormones are chemical messengers that regulate growth, metabolism, and reproduction." },
          ],
        },
        {
          id: "chemistry-everyday-life",
          title: "Chemistry in Everyday Life",
          hours: 4,
          topics: [
            { slug: "medicinal-chemicals", title: "Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, antacids", hours: 2, meaning: "Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, and antacids. Understanding how these drugs work helps students make informed health decisions." },
            { slug: "chemical-cleansers", title: "Chemical cleansers — soaps and detergents", hours: 1, meaning: "Chemical cleansers — soaps (fatty acid salts) and detergents (synthetic surfactants), their structures, and how they remove grease. Explains why soap doesn't work in hard water." },
            { slug: "food-additives", title: "Food additives — preservatives and artificial sweetening agents", hours: 1, meaning: "Food additives — preservatives (prevent spoilage) and artificial sweetening agents (low-calorie sugar substitutes). Relevant to food safety and public health in Nepal." },
          ],
        },
        {
          id: "chemistry-element",
          title: "Chemistry of Element",
          hours: 8,
          topics: [
            { slug: "p-block-elements", title: "p-block elements (Group 15–18): important compounds, trends in properties", hours: 2, meaning: "p-block elements (Groups 15–18) — important compounds and periodic trends in their properties. These elements include N, O, S, Cl, and the noble gases — all essential to life and industry." },
            { slug: "d-block-elements", title: "d-block elements: general characteristics, important compounds (KMnO₄, K₂Cr₂O₇)", hours: 2, meaning: "d-block elements (transition metals) — general characteristics and important compounds like KMnO₄ and K₂Cr₂O₇. Transition metals are catalysts, pigments, and essential nutrients." },
            { slug: "f-block-elements", title: "f-block elements: lanthanoids and actinoids", hours: 1, meaning: "f-block elements — lanthanoids and actinoids. Lanthanoids are used in magnets and lasers; actinoids are radioactive and include uranium and plutonium." },
            { slug: "coordination-compounds", title: "Coordination compounds: Werner's theory, IUPAC nomenclature, VBT, CFT (qualitative), isomerism", hours: 3, meaning: "Coordination compounds — Werner's theory, IUPAC nomenclature, Valence Bond Theory, Crystal Field Theory (qualitative), and isomerism. Coordination chemistry explains hemoglobin, chlorophyll, and industrial catalysts." },
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
            { slug: "types-solutions-concentration", title: "Types of solutions and expression of concentration", hours: 2, meaning: "Types of solutions and ways to express concentration — molarity, molality, mole fraction, percentage. Different units are used in different contexts (lab vs. industry vs. theory)." },
            { slug: "solubility-gases-solids", title: "Solubility of gases and solids in liquids", hours: 1, meaning: "Solubility of gases (Henry's law) and solids in liquids — how temperature and pressure affect how much solute dissolves. Explains why soda goes flat and why sugar dissolves better in hot tea." },
            { slug: "vapour-pressure-raoult", title: "Vapour pressure of solutions — Raoult's law", hours: 1, meaning: "Raoult's law — the vapor pressure of a solution is proportional to the mole fraction of the solvent. The foundation for understanding colligative properties." },
            { slug: "colligative-properties", title: "Colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure", hours: 2, meaning: "Colligative properties — relative lowering of vapor pressure, boiling point elevation, freezing point depression, and osmotic pressure. Properties that depend on the NUMBER of particles, not their identity." },
            { slug: "vants-hoff-factor", title: "Van't Hoff factor and abnormal molar masses", hours: 1, meaning: "Van't Hoff factor — correcting colligative property calculations for substances that dissociate or associate in solution. Explains why NaCl lowers freezing point twice as much as glucose." },
          ],
        },
        {
          id: "electro-chemistry",
          title: "Electrochemistry",
          hours: 8,
          topics: [
            { slug: "ox-red-electrode", title: "Oxidation and reduction — electrode reactions", hours: 1, meaning: "Electrode reactions — oxidation at the anode, reduction at the cathode. The fundamental half-reactions that make electrochemical cells work." },
            { slug: "electrochemical-cells", title: "Electrochemical cells — galvanic cell, cell potential, standard electrode potential", hours: 2, meaning: "Galvanic cells, cell potential, and standard electrode potential — how chemical energy is converted to electrical energy. The principle behind batteries and corrosion." },
            { slug: "nernst-equation", title: "Nernst equation and its applications", hours: 2, meaning: "Nernst equation — calculating cell potential under non-standard conditions. Essential for understanding how concentration affects battery voltage and for solving electrochemistry problems." },
            { slug: "conductance-electrolytes", title: "Conductance of electrolytic solutions", hours: 1, meaning: "Conductance of electrolytic solutions — how well ionic solutions conduct electricity and the factors affecting it. Used in water quality testing and industrial process monitoring." },
            { slug: "electrolysis-faraday", title: "Electrolysis and Faraday's laws", hours: 1, meaning: "Electrolysis and Faraday's laws — using electricity to drive chemical reactions. Applications include electroplating, metal refining, and chlorine production." },
            { slug: "batteries", title: "Batteries — primary and secondary cells", hours: 1, meaning: "Primary and secondary cells — single-use batteries vs. rechargeable batteries. The chemistry behind AA cells, car batteries, and lithium-ion cells." },
            { slug: "fuel-cells", title: "Fuel cells", hours: 1, meaning: "Fuel cells — devices that convert chemical energy directly to electricity using hydrogen and oxygen. A clean energy technology with applications in vehicles and space missions." },
          ],
        },
        {
          id: "chemical-kinetics",
          title: "Chemical Kinetics",
          hours: 6,
          topics: [
            { slug: "rate-reaction", title: "Rate of reaction — average and instantaneous rate", hours: 1, meaning: "Rate of reaction — average rate (over a time interval) and instantaneous rate (at a specific moment). Measuring how fast reactions proceed is fundamental to controlling industrial processes." },
            { slug: "factors-rate", title: "Factors affecting rate of reaction", hours: 1, meaning: "Factors affecting reaction rate — concentration, temperature, catalysts, and surface area. Understanding these lets chemists speed up or slow down reactions as needed." },
            { slug: "rate-law-order", title: "Rate law and order of reaction", hours: 1, meaning: "Rate law and order of reaction — the mathematical relationship between reaction rate and reactant concentrations. Determined experimentally, not from the balanced equation." },
            { slug: "integrated-rate-eq", title: "Integrated rate equations — zero order and first order reactions", hours: 2, meaning: "Integrated rate equations for zero-order and first-order reactions — relating concentration to time. Used to calculate half-lives and predict how long reactions take." },
            { slug: "arrhenius-equation", title: "Arrhenius equation and activation energy", hours: 1, meaning: "Arrhenius equation and activation energy — how temperature affects reaction rate constants. Explains why reactions speed up dramatically with small temperature increases." },
          ],
        },
        {
          id: "general-organic-fundamentals",
          title: "General and Fundamental Principles of Organic Chemistry",
          hours: 8,
          topics: [
            { slug: "purification-analysis", title: "Purification and qualitative/quantitative analysis of organic compounds", hours: 2, meaning: "Purification and qualitative/quantitative analysis of organic compounds — distillation, crystallization, chromatography, and elemental analysis. The lab skills needed to isolate and identify organic products." },
            { slug: "inductive-resonance-hyperconj", title: "Inductive effect, resonance, hyperconjugation", hours: 2, meaning: "Inductive effect, resonance, and hyperconjugation — the three electronic effects that stabilize carbocations, carbanions, and free radicals. Key to understanding reactivity patterns in organic chemistry." },
            { slug: "elec-nuc-subst", title: "Electrophilic and nucleophilic substitution reactions", hours: 2, meaning: "Electrophilic and nucleophilic substitution reactions — the two fundamental reaction types in organic chemistry. Most organic synthesis involves one or the other." },
            { slug: "free-radical-reactions", title: "Free radical reactions", hours: 1, meaning: "Free radical reactions — chain reactions involving radical intermediates (initiation, propagation, termination). Explains alkane halogenation and polymerization mechanisms." },
            { slug: "important-org-reactions", title: "Important organic reactions: oxidation, reduction, addition, elimination", hours: 1, meaning: "Important organic reaction types — oxidation, reduction, addition, and elimination. The four reaction categories that cover most organic transformations." },
          ],
        },
        {
          id: "hydrocarbons-12",
          title: "Hydrocarbons",
          hours: 7,
          topics: [
            { slug: "alkanes-conformations", title: "Alkanes: conformations, combustion, free radical halogenation", hours: 2, meaning: "Alkanes — conformations (rotation around C-C bonds), combustion, and free radical halogenation. Conformational analysis explains the 3D flexibility of hydrocarbon chains." },
            { slug: "alkenes-prep-12", title: "Alkenes: preparation, geometrical isomerism, electrophilic addition (Markovnikov, anti-Markovnikov), ozonolysis, polymerisation", hours: 2, meaning: "Alkenes — preparation, geometrical isomerism, electrophilic addition (Markovnikov and anti-Markovnikov), ozonolysis, and polymerization. The reactions that build polymers and break molecules for analysis." },
            { slug: "alkynes-prep-12", title: "Alkynes: preparation, acidic character, addition reactions", hours: 1, meaning: "Alkynes — preparation, acidic character of terminal alkynes, and addition reactions. Terminal alkynes are unique among hydrocarbons in being acidic enough to react with bases." },
            { slug: "aromatic-hydrocarbons-12", title: "Aromatic hydrocarbons: benzene — resonance, aromaticity, electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts)", hours: 2, meaning: "Aromatic hydrocarbons — benzene resonance, aromaticity, and electrophilic substitution (halogenation, nitration, sulphonation, Friedel-Crafts). The cornerstone reactions of aromatic chemistry." },
          ],
        },
        {
          id: "alcohols-phenols-ethers",
          title: "Alcohols, Phenols and Ethers",
          hours: 7,
          topics: [
            { slug: "alcohols-class", title: "Alcohols: classification, preparation, physical and chemical properties", hours: 2, meaning: "Alcohols — classification (primary, secondary, tertiary), preparation methods, and physical and chemical properties. Alcohol reactivity depends strongly on which carbon bears the -OH group." },
            { slug: "phenols", title: "Phenols: acidity, electrophilic substitution, Kolbe's reaction, Reimer-Tiemann reaction", hours: 2, meaning: "Phenols — their acidity (why phenol is more acidic than alcohol), electrophilic substitution, Kolbe's reaction, and Reimer-Tiemann reaction. Phenol is a key industrial chemical and precursor." },
            { slug: "ethers", title: "Ethers: preparation and chemical reactions (cleavage by HI)", hours: 1, meaning: "Ethers — preparation and chemical reactions, especially cleavage by HI. Ethers are important solvents and starting materials in organic synthesis." },
            { slug: "testing-alcohols-phenols", title: "Tests to distinguish alcohols, phenols and ethers", hours: 2, meaning: "Tests to distinguish alcohols, phenols, and ethers — Lucas test, FeCl₃ test, and Victor Meyer test. Standard qualitative analysis techniques for the board exam practical." },
          ],
        },
        {
          id: "aldehydes-ketones-carboxylic-acids",
          title: "Aldehydes, Ketones and Carboxylic Acids",
          hours: 10,
          topics: [
            { slug: "ald-ket-prep", title: "Aldehydes and ketones: preparation, physical properties, nucleophilic addition reactions", hours: 3, meaning: "Aldehydes and ketones — preparation, physical properties, and nucleophilic addition reactions. The carbonyl group (C=O) is one of the most reactive functional groups in organic chemistry." },
            { slug: "carboxylic-acids", title: "Carboxylic acids: preparation, physical properties, acidic character, reactions", hours: 3, meaning: "Carboxylic acids — preparation, physical properties, acidic character, and reactions. Carboxylic acids are central to biochemistry (amino acids, fatty acids) and industry." },
            { slug: "name-reactions", title: "Name reactions: Aldol condensation, Cannizzaro reaction, HVZ reaction", hours: 2, meaning: "Name reactions — Aldol condensation, Cannizzaro reaction, and HVZ (Hell-Volhard-Zelinsky) reaction. Named reactions are high-yield topics for board exams." },
            { slug: "acid-derivatives", title: "Acid derivatives: acyl chlorides, acid anhydrides, esters and amides — preparation and reactions", hours: 2, meaning: "Acid derivatives — acyl chlorides, acid anhydrides, esters, and amides — their preparation and interconversion reactions. These derivatives link carboxylic acid chemistry to polymer and peptide synthesis." },
          ],
        },
        {
          id: "amines",
          title: "Amines",
          hours: 6,
          topics: [
            { slug: "amine-class-nom", title: "Classification, nomenclature and preparation", hours: 2, meaning: "Amines — classification (primary, secondary, tertiary), IUPAC nomenclature, and preparation methods. Amines are derivatives of ammonia and are fundamental to biochemistry." },
            { slug: "amine-phys-prop", title: "Physical and chemical properties", hours: 2, meaning: "Amines — physical and chemical properties. Lower amines are gases with fishy smells; higher ones are liquids or solids. Their basicity and nucleophilicity drive their reactivity." },
            { slug: "basic-character-amine", title: "Basic character of amines", hours: 1, meaning: "Basic character of amines — why amines are basic (lone pair on nitrogen), factors affecting basicity, and comparisons between aliphatic and aromatic amines. Critical for understanding amine reactivity." },
            { slug: "amine-reactions", title: "Reactions: diazotisation, coupling reactions, Hinsberg test", hours: 1, meaning: "Amine reactions — diazotisation, coupling reactions, and Hinsberg test. Diazonium salts from aromatic amines are versatile intermediates in organic synthesis." },
          ],
        },
        {
          id: "biomolecules",
          title: "Biomolecules",
          hours: 5,
          topics: [
            { slug: "carbohydrates", title: "Carbohydrates: monosaccharides (glucose, fructose), disaccharides, polysaccharides", hours: 2, meaning: "Carbohydrates — monosaccharides (glucose, fructose), disaccharides, and polysaccharides (starch, cellulose, glycogen). The most abundant biomolecules and the primary energy source for living organisms." },
            { slug: "proteins", title: "Proteins: amino acids, peptide bond, primary to quaternary structure, denaturation", hours: 1, meaning: "Proteins — amino acids, peptide bonds, and primary to quaternary structure, plus denaturation. Proteins are the workhorses of cells — enzymes, structures, and signals." },
            { slug: "enzymes", title: "Enzymes: definition, classification, enzyme action", hours: 1, meaning: "Enzymes — definition, classification, and enzyme action (lock-and-key vs. induced fit model). Enzymes are biological catalysts that make life-sustaining reactions fast enough to matter." },
            { slug: "vitamins", title: "Vitamins: classification and functions", hours: 1, meaning: "Vitamins — classification (fat-soluble A, D, E, K and water-soluble B-complex and C) and their functions. Vitamin deficiencies are common health issues in Nepal, making this topic practically relevant." },
            { slug: "hormones", title: "Hormones: definition, types, functions", hours: 1, meaning: "Hormones — definition, types (steroid, peptide, amine), and functions. Hormones are chemical messengers that regulate growth, metabolism, and reproduction." },
          ],
        },
        {
          id: "chemistry-everyday-life",
          title: "Chemistry in Everyday Life",
          hours: 5,
          topics: [
            { slug: "medicinal-chemicals", title: "Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, antacids", hours: 2, meaning: "Medicinal chemicals — analgesics, tranquilizers, antipyretics, antibiotics, antihistamines, and antacids. Understanding how these drugs work helps students make informed health decisions." },
            { slug: "chemical-cleansers", title: "Chemical cleansers — soaps and detergents", hours: 1, meaning: "Chemical cleansers — soaps (fatty acid salts) and detergents (synthetic surfactants), their structures, and how they remove grease. Explains why soap doesn't work in hard water." },
            { slug: "food-additives", title: "Food additives — preservatives and artificial sweetening agents", hours: 1, meaning: "Food additives — preservatives (prevent spoilage) and artificial sweetening agents (low-calorie sugar substitutes). Relevant to food safety and public health in Nepal." },
            { slug: "polymer-chemistry", title: "Polymers: classification, polymerisation mechanisms (addition and condensation), examples of important polymers (PE, PP, PVC, nylon, terylene)", hours: 1, addedInYear: 2081, meaning: "Polymers — classification, addition and condensation polymerization mechanisms, and examples (PE, PP, PVC, nylon, terylene). Plastics and synthetic fibers are ubiquitous in modern life." },
          ],
        },
        {
          id: "chemistry-element",
          title: "Chemistry of Element",
          hours: 9,
          topics: [
            { slug: "p-block-elements", title: "p-block elements (Group 15–18): important compounds, trends in properties", hours: 2, meaning: "p-block elements (Groups 15–18) — important compounds and periodic trends in their properties. These elements include N, O, S, Cl, and the noble gases — all essential to life and industry." },
            { slug: "d-block-elements", title: "d-block elements: general characteristics, important compounds (KMnO₄, K₂Cr₂O₇)", hours: 2, meaning: "d-block elements (transition metals) — general characteristics and important compounds like KMnO₄ and K₂Cr₂O₇. Transition metals are catalysts, pigments, and essential nutrients." },
            { slug: "f-block-elements", title: "f-block elements: lanthanoids and actinoids", hours: 1, meaning: "f-block elements — lanthanoids and actinoids. Lanthanoids are used in magnets and lasers; actinoids are radioactive and include uranium and plutonium." },
            { slug: "coordination-compounds", title: "Coordination compounds: Werner's theory, IUPAC nomenclature, VBT, CFT (qualitative), isomerism", hours: 3, meaning: "Coordination compounds — Werner's theory, IUPAC nomenclature, Valence Bond Theory, Crystal Field Theory (qualitative), and isomerism. Coordination chemistry explains hemoglobin, chlorophyll, and industrial catalysts." },
            { slug: "nanomaterials-intro", title: "Introduction to nanomaterials and their applications in chemistry", hours: 1, addedInYear: 2081, meaning: "Introduction to nanomaterials and their applications in chemistry — materials with at least one dimension in the nanometer range. A cutting-edge topic added in 2081 BS reflecting modern materials science." },
          ],
        },
        {
          id: "environmental-chemistry",
          title: "Environmental Chemistry",
          hours: 3,
          topics: [
            { slug: "air-water-pollution", title: "Air and water pollution — causes, effects, and control measures", hours: 1, meaning: "Air and water pollution — causes (industrial emissions, vehicle exhaust, agricultural runoff), effects (smog, acid rain, eutrophication), and control measures. Directly relevant to Nepal's growing urban pollution problems." },
            { slug: "soil-pollution", title: "Soil pollution and solid waste management", hours: 1, meaning: "Soil pollution and solid waste management — causes of soil contamination and strategies for waste disposal and recycling. Critical for agricultural communities and urban planning in Nepal." },
            { slug: "green-chemistry-app", title: "Green chemistry principles and applications in industrial chemistry", hours: 1, addedInYear: 2081, meaning: "Green chemistry principles and their application in industrial chemistry — designing sustainable processes that minimize waste and hazard. Added in 2081 BS to connect theoretical principles to real-world practice." },
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
