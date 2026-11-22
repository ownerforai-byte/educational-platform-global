/**
 * High-Yield Topic Facts — Chemistry: Chemical Bonding & Periodic Classification (Class 11).
 *
 * Three units in the Class 11 chemistry syllabus had NO entry in the chemistry
 * banks, so every topic in them resolved to `null` and the fact-bank sections
 * were hidden:
 *   - chemical-bonding-and-shapes-of-molecules (16 topics — the largest gap)
 *   - classification-of-elements (2 topics)
 *   - classification-of-elements-and-periodic-table (5 topics)
 *
 * Entries are topic-level, not unit-level, because bonding and periodicity are
 * separately examinable blocks. Matching note: `findHighYieldTopicData` prefers
 * an exact `unitSlugs` match and breaks ties by keyword score, so each entry's
 * `topicKeywords` must contain words that appear in its own topic slug or title.
 */

import type { HighYieldTopicData } from "./high-yield-topic-facts-match";

export const HIGH_YIELD_TOPIC_BANK_CHEMISTRY_BONDING: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Chemical bonding and shapes of molecules
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "chemical-bonding",
      "vsepr",
      "hybridization",
      "hybridisation",
      "octet",
      "ionic-bond",
      "covalent-bond",
      "molecular-orbital",
      "resonance",
      "dipole-moment",
      "hydrogen-bonding",
      "metallic-bonding",
    ],
    subject: "chemistry",
    title: "Chemical Bonding — VSEPR, Hybridization, MOT & Bond Characteristics",
    unitSlugs: ["chemical-bonding-and-shapes-of-molecules"],
    category: "Chemical Bonding",
    governingLaws: [
      {
        name: "Octet Rule",
        statement:
          "Atoms tend to gain, lose or share electrons so as to acquire eight electrons in their outermost shell, matching the nearest noble gas configuration.",
        formula: "\\text{valence electrons} \\to 8\\ \\text{(or 2 for H)}",
        conditions:
          "Fails for incomplete octets (BeCl2, BF3), expanded octets (PCl5, SF6) and odd-electron species (NO, NO2).",
      },
      {
        name: "VSEPR Theory",
        statement:
          "Electron pairs around a central atom arrange themselves to minimise repulsion, so the molecular shape is set by the number of bonding pairs and lone pairs.",
        formula:
          "\\text{steric number} = \\text{bonding pairs} + \\text{lone pairs}",
        conditions:
          "Repulsion order: lone pair-lone pair > lone pair-bond pair > bond pair-bond pair. Multiple bonds count as one domain.",
      },
      {
        name: "Bond Order from Molecular Orbital Theory",
        statement:
          "Bond order equals half the difference between the number of electrons in bonding and antibonding molecular orbitals.",
        formula:
          "\\text{B.O.} = \\frac{N_b - N_a}{2}",
        conditions:
          "A bond order of zero means the molecule does not exist. Higher bond order means shorter and stronger bond.",
      },
      {
        name: "Resonance Stabilisation",
        statement:
          "When several valid Lewis structures exist, the real molecule is a hybrid of them, and delocalisation of electrons lowers the energy below any single contributor.",
        formula:
          "\\text{resonance bond order} = \\frac{\\text{total bonds}}{\\text{number of resonance positions}}",
        conditions:
          "Only electrons move between contributors; atomic positions stay fixed and the number of paired electrons is conserved.",
      },
    ],
    speedFormulas: [
      {
        name: "Dipole moment",
        formula: "\\mu = q \\times d",
        description:
          "Charge times separation distance, measured in debye (1 D = 3.336 x 10^-30 C m). A symmetric molecule can have polar bonds yet zero net dipole moment.",
        unit: "debye (D)",
      },
      {
        name: "Percentage ionic character",
        formula:
          "\\%\\ \\text{ionic} = \\frac{\\mu_{\\text{observed}}}{\\mu_{\\text{for full charge}}} \\times 100",
        description:
          "Compares the measured dipole moment with the value expected for complete electron transfer. HF is about 43% ionic despite being called covalent.",
        unit: "%",
      },
      {
        name: "Hybridization from steric number",
        formula:
          "\\text{SN}=2 \\to sp,\\quad \\text{SN}=3 \\to sp^2,\\quad \\text{SN}=4 \\to sp^3",
        description:
          "Steric number counts sigma bonds plus lone pairs on the central atom. It sets the base geometry: 180, 120 and 109.5 degrees respectively.",
        unit: "—",
      },
      {
        name: "Formal charge",
        formula:
          "\\text{FC} = V - \\left(\\frac{L}{2}\\right) - B",
        description:
          "Valence electrons minus half the lone-pair electrons minus the number of bonds. The structure with formal charges nearest zero is preferred.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "109.5°", name: "Tetrahedral bond angle (sp3)", value: "109.5", unit: "degrees" },
      { symbol: "120°", name: "Trigonal planar bond angle (sp2)", value: "120", unit: "degrees" },
      { symbol: "180°", name: "Linear bond angle (sp)", value: "180", unit: "degrees" },
      { symbol: "104.5°", name: "Bond angle in water", value: "104.5", unit: "degrees" },
      { symbol: "107°", name: "Bond angle in ammonia", value: "107", unit: "degrees" },
      { symbol: "1.7", name: "Electronegativity difference above which a bond is mainly ionic", value: "1.7", unit: "Pauling units" },
      { symbol: "139 pm", name: "C-C bond length in benzene (order 1.5)", value: "139", unit: "pm" },
    ],
    entranceTraps: [
      {
        trap: "CO2 is a polar molecule because it has polar C=O bonds.",
        truth:
          "CO2 is non-polar. The molecule is linear and the two bond dipoles are equal and opposite, so they cancel exactly. Polarity needs both polar bonds AND asymmetry.",
        examRef: "NEB / CEE — polarity",
      },
      {
        trap: "Water is sp3 hybridized, so its bond angle is 109.5 degrees.",
        truth:
          "Water is sp3 hybridized but has TWO lone pairs. Lone-pair repulsion compresses the angle to 104.5 degrees. Hybridization sets the base geometry, lone pairs modify it.",
        examRef: "CEE — VSEPR",
      },
      {
        trap: "VSEPR and VBT both predict that O2 is diamagnetic.",
        truth:
          "VBT predicts diamagnetism and is wrong. Molecular orbital theory shows two unpaired electrons in the pi-star orbitals, which is why O2 is paramagnetic.",
        examRef: "CEE — MOT",
      },
      {
        trap: "A coordinate covalent bond is a different kind of bond from a normal covalent bond.",
        truth:
          "Once formed it is indistinguishable. The only difference is the origin: in a coordinate bond one atom donates both electrons of the shared pair.",
        examRef: "NEB — coordinate bonding",
      },
      {
        trap: "Benzene has alternating single and double bonds.",
        truth:
          "All six C-C bonds are identical at 139 pm, between single (154 pm) and double (134 pm). The real structure is a resonance hybrid with bond order 1.5.",
        examRef: "CEE — resonance",
      },
      {
        trap: "Hydrogen bonding is a type of covalent bond.",
        truth:
          "It is an intermolecular force of 10-40 kJ/mol, far weaker than a covalent bond (~400 kJ/mol). It requires H bonded to N, O or F.",
        examRef: "NEB — intermolecular forces",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Determine the hybridization and shape of the central atom in SF6.",
        given: "Sulfur surrounded by 6 fluorine atoms, no lone pairs on S",
        steps: [
          "Count sigma bonds on sulfur: 6 S-F single bonds.",
          "Count lone pairs on sulfur: 0 (all six valence electrons are used in bonding).",
          "Steric number = 6 + 0 = 6.",
          "Steric number 6 corresponds to sp3d2 hybridization and octahedral geometry.",
        ],
        answer: "sp3d2 hybridized, octahedral, bond angles 90 degrees",
      },
      {
        problem:
          "Calculate the bond order of O2 and O2+ using molecular orbital theory, and state which has the shorter bond.",
        given: "O2 has 16 electrons; O2+ has 15",
        steps: [
          "O2 configuration: bonding electrons Nb = 10, antibonding Na = 6.",
          "Bond order = (10 - 6)/2 = 2.",
          "O2+ removes one antibonding electron: Nb = 10, Na = 5.",
          "Bond order = (10 - 5)/2 = 2.5.",
        ],
        answer: "O2 bond order 2, O2+ bond order 2.5 — O2+ has the shorter, stronger bond",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Hybridization",
        definition:
          "The mixing of atomic orbitals of similar energy on the same atom to produce an equal number of equivalent hybrid orbitals with identical shape and energy.",
        significance:
          "Explains why methane has four identical bonds at 109.5 degrees rather than the unequal angles pure s and p orbitals would give.",
      },
      {
        term: "Resonance",
        definition:
          "The representation of a molecule by two or more valid Lewis structures, where the real molecule is a hybrid of all of them.",
        significance:
          "Explains identical bond lengths in benzene and carbonate, and why resonance-stabilised species are more stable and more acidic.",
      },
      {
        term: "Lattice enthalpy",
        definition:
          "The energy released when one mole of a solid ionic compound forms from its gaseous ions.",
        significance:
          "Determines melting point and solubility of ionic solids; MgO's very high value explains its extreme melting point.",
      },
      {
        term: "Effective nuclear charge",
        definition:
          "The net positive charge an outer electron experiences after accounting for shielding by inner electrons.",
        significance:
          "The single quantity that drives atomic radius, ionisation energy and electronegativity trends across the table.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Classification of elements and periodicity
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "classification-of-elements",
      "periodic-table",
      "periodic-trend",
      "periodic-law",
      "periodicity",
      "atomic-radii",
      "ionization-energy",
      "electron-affinity",
      "electronegativity",
      "effective-nuclear-charge",
      "iupac-classification",
    ],
    subject: "chemistry",
    title: "Classification of Elements — Periodic Law, Trends & Effective Nuclear Charge",
    unitSlugs: ["classification-of-elements", "classification-of-elements-and-periodic-table"],
    category: "Periodic Classification",
    governingLaws: [
      {
        name: "Modern Periodic Law (Moseley, 1913)",
        statement:
          "The physical and chemical properties of elements are periodic functions of their atomic numbers.",
        formula:
          "\\text{properties} = f(Z)",
        conditions:
          "Replaced Mendeleev's atomic-mass basis, which placed tellurium and iodine out of chemical order.",
      },
      {
        name: "Effective Nuclear Charge",
        statement:
          "The net positive charge felt by an electron equals the nuclear charge minus the shielding contributed by other electrons.",
        formula: "Z_{\\text{eff}} = Z - \\sigma",
        conditions:
          "Core electrons shield almost completely; same-shell electrons shield poorly. Penetration order is s > p > d > f.",
      },
      {
        name: "Periodic Trend Law",
        statement:
          "Across a period, effective nuclear charge rises and atomic radius falls; down a group, added shells dominate and radius rises.",
        formula:
          "\\text{across period: } r \\downarrow,\\ IE \\uparrow,\\ EN \\uparrow \\quad ; \\quad \\text{down group: } r \\uparrow,\\ IE \\downarrow,\\ EN \\downarrow",
        conditions:
          "Exceptions arise from half-filled and fully-filled subshell stability (Be > B, N > O in ionisation energy).",
      },
    ],
    speedFormulas: [
      {
        name: "Effective nuclear charge",
        formula: "Z_{\\text{eff}} = Z - \\sigma",
        description:
          "Slater's rules estimate sigma. For sodium's 3s electron Zeff is about 2.2, not 11 — which is why sodium's outer electron is so easily lost.",
        unit: "—",
      },
      {
        name: "Isoelectronic radius ordering",
        formula:
          "\\text{more protons} \\Rightarrow \\text{smaller radius}",
        description:
          "For the 10-electron series: Na+ (11p) < F- (9p) < O2- (8p) < N3- (7p). More protons pull the same electron cloud in tighter.",
        unit: "—",
      },
      {
        name: "Group and period from configuration",
        formula:
          "\\text{period} = n_{\\max},\\quad \\text{group} = \\text{valence } s + p\\ \\text{electrons}",
        description:
          "For main-group elements only. d-block group number requires counting (n-1)d plus ns electrons.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "1913", name: "Year Moseley established atomic number as the ordering basis", value: "1913", unit: "year" },
      { symbol: "18", name: "Number of groups in the long-form periodic table", value: "18", unit: "groups" },
      { symbol: "7", name: "Number of periods", value: "7", unit: "periods" },
      { symbol: "3.98", name: "Electronegativity of fluorine (Pauling)", value: "3.98", unit: "Pauling units" },
      { symbol: "0.7", name: "Electronegativity of caesium (Pauling)", value: "0.79", unit: "Pauling units" },
      { symbol: "1312", name: "First ionisation energy of hydrogen", value: "1312", unit: "kJ/mol" },
    ],
    entranceTraps: [
      {
        trap: "Atomic radius increases across a period because more electrons are added.",
        truth:
          "Radius DECREASES across a period. Electrons enter the same shell while nuclear charge rises, so effective nuclear charge pulls the cloud inward.",
        examRef: "NEB / CEE — periodic trends",
      },
      {
        trap: "Ionisation energy always increases smoothly across a period.",
        truth:
          "It does not. Be > B and N > O because a filled 2s2 and a half-filled 2p3 are extra stable, so removing an electron costs more than the trend predicts.",
        examRef: "CEE — ionisation energy anomalies",
      },
      {
        trap: "Fluorine has the highest electron affinity because it is most electronegative.",
        truth:
          "Chlorine has a more negative electron affinity than fluorine. Fluorine's small 2p orbitals cause strong electron-electron repulsion when an extra electron is added.",
        examRef: "CEE — electron affinity",
      },
      {
        trap: "An anion is smaller than its parent atom because it has gained an electron.",
        truth:
          "Anions are LARGER. Added electrons increase repulsion and reduce effective nuclear charge per electron, so the cloud expands. Cations are smaller.",
        examRef: "NEB — ionic radii",
      },
      {
        trap: "Mendeleev arranged elements by atomic number.",
        truth:
          "Mendeleev used atomic MASS. Atomic number as the basis came from Moseley in 1913, which is the modern periodic law.",
        examRef: "NEB — history of the periodic table",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Arrange Na+, Mg2+, F- and O2- in order of increasing ionic radius.",
        given: "All four species are isoelectronic with 10 electrons",
        steps: [
          "All have the same electron configuration (Ne-like, 10 electrons).",
          "Nuclear charge: O = 8, F = 9, Na = 11, Mg = 12.",
          "For isoelectronic species, greater nuclear charge gives smaller radius.",
          "Order of increasing radius therefore runs from highest Z to lowest Z.",
        ],
        answer: "Mg2+ < Na+ < F- < O2-",
      },
      {
        problem:
          "An element has the electron configuration 1s2 2s2 2p6 3s2 3p5. Identify its period, group and block.",
        given: "Configuration ends at 3p5",
        steps: [
          "Highest principal quantum number is 3, so period = 3.",
          "Valence electrons = 2 (3s) + 5 (3p) = 7, so group = 17.",
          "The last electron entered a p orbital, so the element is in the p-block.",
        ],
        answer: "Period 3, group 17, p-block — the element is chlorine",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Ionisation energy",
        definition:
          "The minimum energy required to remove the most loosely bound electron from an isolated gaseous atom in its ground state.",
        significance:
          "Measures how tightly the nucleus holds its outer electron; large jumps between successive values reveal the shell structure.",
      },
      {
        term: "Electron affinity",
        definition:
          "The energy change when one mole of gaseous atoms each gain an electron to form a singly charged anion.",
        significance:
          "Measures how readily an atom accepts an electron; chlorine's value exceeds fluorine's because of fluorine's small size.",
      },
      {
        term: "Electronegativity",
        definition:
          "The tendency of an atom in a molecule to attract the shared pair of electrons toward itself.",
        significance:
          "Determines bond polarity and ionic character; the Pauling scale runs from caesium 0.79 to fluorine 3.98.",
      },
      {
        term: "Lanthanide contraction",
        definition:
          "The gradual decrease in atomic radius across the lanthanide series due to poor shielding by 4f electrons.",
        significance:
          "Explains why the elements after the lanthanides (Hf, Ta, W) have almost the same radii as the elements above them (Zr, Nb, Mo).",
      },
    ],
  },
];
