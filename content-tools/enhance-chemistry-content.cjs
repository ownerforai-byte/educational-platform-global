const fs = require('fs');
const path = require('path');

// Content data for each topic
const topicContent = {
  "01-dalton-atomic-theory": {
    universalFacts: [
      "Dalton's theory (1803) marked the transition from alchemy to modern chemistry.",
      "The law of multiple proportions was specifically predicted by Dalton's theory.",
      "Dalton's atomic theory is the basis for the modern concept of the mole.",
      "Even though some postulates are outdated, the core idea that matter is composed of discrete atoms remains the cornerstone of chemistry.",
      "Dalton was the first to assign relative atomic masses to elements."
    ],
    examples: [
      "Combination: Carbon + Oxygen → Carbon Monoxide (1:1 ratio) or Carbon Dioxide (1:2 ratio).",
      "Isotope example: Carbon-12 and Carbon-14 are both Carbon atoms but have different masses.",
      "Rearrangement: H₂ + O₂ → H₂O (atoms are rearranged, not created)."
    ],
    practiceQuestions: [
      "State the main postulates of Dalton's atomic theory.",
      "Which of Dalton's postulates were proven incorrect by the discovery of isotopes?",
      "How does Dalton's theory explain the Law of Definite Proportions?",
      "Why is Dalton's theory considered a milestone in the history of chemistry?",
      "What are the limitations of Dalton's atomic theory?"
    ],
    formulas: [
      "No direct mathematical formula, but it underpins: Law of Conservation of Mass (Σm_reactants = Σm_products)",
      "Law of Definite Proportions (mass ratio = constant)"
    ],
    keyPoints: [
      "Matter is made of atoms.",
      "Atoms of an element are identical (mostly).",
      "Compounds are fixed ratios of atoms.",
      "Chemical reactions rearrange atoms.",
      "Dalton's theory explains chemical combination laws."
    ],
    specialNotes: [
      "Dalton's theory is a 'model' — it was useful for its time and still explains basic chemical behavior.",
      "Always distinguish between 'chemical indivisibility' (atoms in reactions) and 'physical divisibility' (subatomic particles).",
      "NEB questions often ask for the postulates and the limitations of the theory."
    ],
    importantStatements: [
      "Atoms are the smallest unit of an element that participates in chemical reactions.",
      "Chemical reactions involve the rearrangement of atoms.",
      "Compounds are formed by the combination of atoms in simple whole-number ratios.",
      "Dalton's theory provided the first scientific explanation for the laws of chemical combination."
    ],
    importantNotes: [
      "Dalton's theory is the starting point for understanding stoichiometry.",
      "Isotopes are the primary reason why Dalton's 'identical mass' postulate is not strictly true.",
      "The theory is still valid for explaining chemical reactions at the macroscopic level."
    ],
    examShortTricks: [
      "Remember: Dalton = Atoms, Indivisible, Fixed Ratios, Rearrangement.",
      "Limitations: Isotopes (mass), Subatomic particles (divisibility), Bonding (forces).",
      "Significance: Laws of chemical combination (Mass, Definite, Multiple proportions)."
    ],
    mcs: [
      {
        question: "Which of the following is NOT a postulate of Dalton's atomic theory?",
        options: ["Matter is made of atoms.", "Atoms are indivisible.", "Atoms of the same element are identical.", "Atoms are composed of protons, neutrons, and electrons."],
        answer: "D"
      },
      {
        question: "Which discovery proved that atoms are divisible?",
        options: ["Discovery of isotopes", "Discovery of subatomic particles", "Law of conservation of mass", "Law of definite proportions"],
        answer: "B"
      },
      {
        question: "Dalton's theory explains which of the following?",
        options: ["Law of conservation of mass", "Law of definite proportions", "Law of multiple proportions", "All of the above"],
        answer: "D"
      }
    ]
  },
  "02-law-of-definite-proportions": {
    universalFacts: [
      "The Law of Definite Proportions was discovered by Joseph Proust in 1794.",
      "This law is also known as the Law of Constant Composition.",
      "It applies to all pure chemical compounds regardless of their source.",
      "This law was crucial for the development of modern atomic theory.",
      "Water from any source always contains hydrogen and oxygen in a 1:8 mass ratio."
    ],
    examples: [
      "Water (H₂O): Always contains H:O = 1:8 by mass (2g H + 16g O).",
      "Carbon dioxide (CO₂): Always contains C:O = 3:8 by mass (12g C + 32g O).",
      "Sodium chloride (NaCl): Always contains Na:Cl = 23:35.5 by mass.",
      "Ammonia (NH₃): Always contains N:H = 14:3 by mass."
    ],
    practiceQuestions: [
      "State the Law of Definite Proportions with examples.",
      "How does this law help in determining the chemical formula of a compound?",
      "Verify the Law of Definite Proportions for water using experimental data.",
      "Explain why this law is important in stoichiometry."
    ],
    formulas: [
      "Mass percent = (Mass of element / Total mass of compound) × 100",
      "For H₂O: %H = (2/18) × 100 = 11.11%, %O = (16/18) × 100 = 88.89%"
    ],
    keyPoints: [
      "Pure compounds have fixed elemental composition by mass.",
      "The ratio is independent of the source or method of preparation.",
      "This law supports the existence of atoms combining in fixed ratios.",
      "Used to verify chemical purity of compounds."
    ],
    specialNotes: [
      "This law holds for all compounds but has exceptions for non-stoichiometric compounds (berthollides).",
      "The law is fundamental to writing and balancing chemical equations.",
      "NEB frequently tests this law with numerical problems on mass percent."
    ],
    importantStatements: [
      "A given chemical compound always contains its constituent elements in fixed ratio by mass.",
      "The composition of a pure compound is constant regardless of its source.",
      "This law is based on the idea that atoms combine in fixed whole-number ratios."
    ],
    importantNotes: [
      "The law applies to ionic and covalent compounds equally.",
      "It is derived from the atomic nature of matter.",
      "Modern quantum chemistry provides the theoretical basis for this law."
    ],
    examShortTricks: [
      "Remember: Proust's Law = Fixed Ratio.",
      "Test: Calculate mass percent of each element in compound.",
      "If two samples give same mass ratio, they are same compound."
    ],
    mcs: [
      {
        question: "Who discovered the Law of Definite Proportions?",
        options: ["Dalton", "Proust", "Lavoisier", "Avogadro"],
        answer: "B"
      },
      {
        question: "In water, the mass ratio of hydrogen to oxygen is:",
        options: ["1:16", "1:8", "2:1", "8:1"],
        answer: "B"
      },
      {
        question: "The Law of Definite Proportions is also known as:",
        options: ["Law of Conservation of Mass", "Law of Constant Composition", "Law of Multiple Proportions", "Law of Reciprocal Proportions"],
        answer: "B"
      },
      {
        question: "Which of the following follows the Law of Definite Proportions?",
        options: ["Air", "Soil", "Pure water", "Sea water"],
        answer: "C"
      }
    ]
  },
  "02-laws-stoichiometry": {
    universalFacts: [
      "The five fundamental laws of stoichiometry form the basis of quantitative chemistry.",
      "These laws were established between 1789 and 1803 by Lavoisier, Proust, Dalton, and Gay-Lussac.",
      "Together, these laws led to the development of the atomic theory.",
      "All stoichiometric calculations are based on these laws."
    ],
    examples: [
      "Law of Conservation of Mass: Burning 12g carbon in 32g oxygen gives exactly 44g CO₂.",
      "Law of Definite Proportions: Water from Ganges river has same H:O ratio as water from Himalayas.",
      "Law of Multiple Proportions: CO and CO₂ show mass ratio of oxygen as 1:2 for fixed carbon.",
      "Law of Reciprocal Proportions: S and O combine with H₂ in ratio 16:1 and 8:1, their reciprocal is 2:1."
    ],
    practiceQuestions: [
      "List all five laws of stoichiometry with their statements.",
      "Explain how each law is verified with suitable examples.",
      "How do these laws collectively support atomic theory?",
      "Calculate the mass of products when 5g of reactant A combines with excess B."
    ],
    formulas: [
      "Law of Conservation of Mass: Σm(reactants) = Σm(products)",
      "Law of Definite Proportions: m₁/m₂ = constant for compound AB",
      "Law of Multiple Proportions: m₁:m₂ = small whole numbers",
      "Law of Reciprocal Proportions: (m_A/m_H) : (m_B/m_H) = (m_A/m_B) in compound",
      "Gay-Lussac's Law of Gaseous Volumes: V₁:V₂ = small whole numbers"
    ],
    keyPoints: [
      "Five laws govern stoichiometry: Conservation, Definite, Multiple, Reciprocal, Gaseous Volumes.",
      "Each law explains a different aspect of chemical combination.",
      "All laws are experimental observations later explained by atomic theory.",
      "These laws are essential for solving stoichiometric problems."
    ],
    specialNotes: [
      "NEB questions often ask students to verify these laws with numerical problems.",
      "Understanding the relationship between these laws is important for exams.",
      "Practice numerical problems on each law separately."
    ],
    importantStatements: [
      "Matter can neither be created nor destroyed in a chemical reaction.",
      "Elements in a compound are always present in fixed mass ratios.",
      "When two elements form more than one compound, the masses of one element combining with fixed mass of the other are in simple whole number ratios."
    ],
    importantNotes: [
      "These laws apply only to pure substances.",
      "They are valid for chemical reactions, not nuclear reactions.",
      "Modern science has provided theoretical basis for these empirical laws."
    ],
    examShortTricks: [
      "Remember: CLM-DP-LMP-LRP-LGV (Conservation, Definite, Multiple, Reciprocal, Gaseous Volumes).",
      "For numerical problems: Always balance equation first.",
      "Check if mass ratio is constant for Definite Proportions."
    ],
    mcs: [
      {
        question: "Which law states that matter is neither created nor destroyed?",
        options: ["Law of Definite Proportions", "Law of Conservation of Mass", "Law of Multiple Proportions", "Law of Reciprocal Proportions"],
        answer: "B"
      },
      {
        question: "The Law of Multiple Proportions is applicable to:",
        options: ["Mixtures", "All compounds", "Compounds with same elements but different ratios", "Only gaseous compounds"],
        answer: "C"
      }
    ]
  },
  "03-avogadro-law": {
    universalFacts: [
      "Avogadro's Law was proposed by Amedeo Avogadro in 1811.",
      "It states that equal volumes of gases contain equal numbers of molecules under similar conditions.",
      "This law is fundamental to understanding gas stoichiometry.",
      "The law helps determine molecular formulas of gases.",
      "One mole of any gas occupies 22.4 L at STP (Standard Temperature and Pressure)."
    ],
    examples: [
      "2L of H₂ and 2L of O₂ at same T,P contain same number of molecules.",
      "1 mole of any gas at STP = 22.4 dm³ = 22400 cm³.",
      "Decomposition: 2H₂O → 2H₂ + O₂ gives volume ratio 2:2:1.",
      "Synthesis: N₂ + 3H₂ → 2NH₃ gives volume ratio 1:3:2."
    ],
    practiceQuestions: [
      "State Avogadro's Law and its significance.",
      "Calculate the volume of 0.5 moles of gas at STP.",
      "How is Avogadro's Law used to determine molecular formula?",
      "Derive the relationship between molecular mass and vapor density."
    ],
    formulas: [
      "V/n = k (constant at constant T and P)",
      "V₁/n₁ = V₂/n₂",
      "1 mole of gas at STP = 22.4 dm³",
      "Molecular mass = 2 × Vapor density",
      "n = V/22.4 (at STP, V in dm³)"
    ],
    keyPoints: [
      "Equal volumes of gases contain equal number of molecules.",
      "Applies only to gases under similar temperature and pressure.",
      "STP: 0°C (273 K) and 1 atm pressure.",
      "Used to find molecular formulas and molar masses."
    ],
    specialNotes: [
      "Avogadro's Law is also called Avogadro's hypothesis.",
      "The law helped resolve confusion between atoms and molecules.",
      "NEB frequently tests this law with numerical problems on gas volumes."
    ],
    importantStatements: [
      "Equal volumes of all gases at same temperature and pressure contain equal number of molecules.",
      "The number of molecules in one mole is called Avogadro's number: N_A = 6.022 × 10²³."
    ],
    importantNotes: [
      "The value of Avogadro's number was determined experimentally by Perrin (1908).",
      "This law is used in conjunction with Gay-Lussac's law for gas reactions.",
      "It is fundamental to the concept of molar volume."
    ],
    examShortTricks: [
      "Remember: 1 mole gas at STP = 22.4 L.",
      "For volume calculations: Use V = n × 22.4.",
      "Molecular mass = 2 × V.D. (Vapor Density)."
    ],
    mcs: [
      {
        question: "Who proposed Avogadro's Law?",
        options: ["Dalton", "Avogadro", "Gay-Lussac", "Lavoisier"],
        answer: "B"
      },
      {
        question: "What is the molar volume of a gas at STP?",
        options: ["22.4 dm³", "224 dm³", "2.24 dm³", "2240 dm³"],
        answer: "A"
      },
      {
        question: "Avogadro's number is:",
        options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²⁴", "6.022 × 10²⁰"],
        answer: "A"
      },
      {
        question: "If molecular mass of a gas is 64, its vapor density is:",
        options: ["32", "64", "128", "16"],
        answer: "A"
      },
      {
        question: "Equal volumes of gases at same T and P contain equal number of:",
        options: ["Atoms", "Molecules", "Grams", "Liters"],
        answer: "B"
      }
    ]
  },
  "03-law-of-multiple-proportions": {
    universalFacts: [
      "The Law of Multiple Proportions was proposed by John Dalton in 1803.",
      "It is also called Dalton's Law of Multiple Proportions.",
      "This law explains why elements form different compounds with each other.",
      "It was the first evidence that atoms combine in whole number ratios.",
      "The law is only applicable when two elements form more than one compound."
    ],
    examples: [
      "Carbon oxides: CO (C:O = 12:16) and CO₂ (C:O = 12:32). Fixed C = 12g, O ratios = 16:32 = 1:2.",
      "Nitrogen oxides: N₂O, NO, NO₂ show oxygen ratios of 1:2:4 for fixed nitrogen.",
      "Sulfur oxides: SO₂ (S:O = 32:32) and SO₃ (S:O = 32:48). Fixed S = 32g, O ratios = 32:48 = 2:3.",
      "Phosphorus chlorides: PCl₃ and PCl₅."
    ],
    practiceQuestions: [
      "State and explain the Law of Multiple Proportions with examples.",
      "Verify the law using data for nitrogen oxides.",
      "Calculate the ratio of masses of oxygen in two compounds of carbon and oxygen.",
      "How does this law support atomic theory?"
    ],
    formulas: [
      "For compounds AX and AY: m_Y(first)/m_Y(second) = small whole number",
      "Ratio = (Mass of B in compound 1) / (Mass of B in compound 2) for fixed mass of A",
      "If compound 1 has formula A_xB_y and compound 2 has A_xB_z, ratio = y:z"
    ],
    keyPoints: [
      "Two elements forming multiple compounds → Law applies.",
      "Fix mass of one element, compare masses of other element.",
      "Ratios are always small whole numbers.",
      "Provides evidence for atomic theory."
    ],
    specialNotes: [
      "This law is only applicable when two elements form MORE THAN ONE compound.",
      "If only one compound is formed, this law cannot be verified.",
      "NEB tests this with numerical problems on oxide/chloride data."
    ],
    importantStatements: [
      "When two elements combine to form more than one compound, the masses of one element that combine with a fixed mass of the other element are in the ratio of small whole numbers.",
      "This law is direct evidence for the existence of atoms."
    ],
    importantNotes: [
      "The law works because atoms combine in discrete, whole-number ratios.",
      "It is a consequence of the particulate nature of matter.",
      "Dalton used this law to support his atomic theory."
    ],
    examShortTricks: [
      "Check: Do two elements form more than one compound? If yes, law applies.",
      "Fix mass of element A, find masses of B in each compound.",
      "Calculate ratio and simplify to whole numbers.",
      "Example: CO and CO₂ → Fix C=12, O ratios = 16:32 = 1:2."
    ],
    mcs: [
      {
        question: "The Law of Multiple Proportions was proposed by:",
        options: ["Proust", "Dalton", "Lavoisier", "Avogadro"],
        answer: "B"
      },
      {
        question: "Which pair of compounds can verify the Law of Multiple Proportions?",
        options: ["H₂O and H₂O₂", "NaCl and KCl", "CO and NaCl", "H₂O and CO₂"],
        answer: "A"
      },
      {
        question: "In CO and CO₂, the ratio of masses of oxygen combining with fixed mass of carbon is:",
        options: ["1:2", "2:1", "1:1", "1:3"],
        answer: "A"
      }
    ]
  },
  "04-law-of-reciprocal-proportions": {
    universalFacts: [
      "The Law of Reciprocal Proportions was proposed by Jeremias Richter in 1792.",
      "It is also called Richter's Law.",
      "This law relates the proportions in which two elements combine with a third element.",
      "It was later incorporated into Dalton's atomic theory.",
      "The law is based on equivalent weights of elements."
    ],
    examples: [
      "Hydrogen combines with sulfur (H₂S: 2g H + 32g S) and oxygen (H₂O: 2g H + 16g O). Fixed H = 2g, S:O = 32:16 = 2:1. In SO₂, S:O = 32:32 = 1:1, which is a simple multiple of 2:1.",
      "Carbon combines with hydrogen (CH₄: 12g C + 4g H) and oxygen (CO₂: 12g C + 32g O). Fixed C = 12g, H:O = 4:32 = 1:8. In CS₂, C:S = 12:64, showing simple proportion.",
      "Nitrogen combines with hydrogen (NH₃: 14g N + 3g H) and oxygen (NO: 14g N + 16g O). Fixed N = 14g, H:O = 3:16."
    ],
    practiceQuestions: [
      "State and explain the Law of Reciprocal Proportions.",
      "Verify the law using data for hydrogen, sulfur, and oxygen.",
      "Explain the significance of this law in chemistry.",
      "Calculate the reciprocal proportion for given data."
    ],
    formulas: [
      "If A combines with B in ratio a:b and A combines with C in ratio a:c, then",
      "B and C should combine in ratio b:c or simple multiple thereof",
      "Equivalent weight = Atomic weight / Valency",
      "For H₂S: Eq. wt. of S = 32/2 = 16",
      "For H₂O: Eq. wt. of O = 16/2 = 8"
    ],
    keyPoints: [
      "Two elements combining separately with a fixed mass of third element.",
      "The ratio of their masses in the first compound is simple multiple of ratio in second compound.",
      "Based on equivalent weights.",
      "Connects the combining capacity of elements."
    ],
    specialNotes: [
      "This law is less commonly tested than other stoichiometric laws.",
      "It is primarily of historical significance.",
      "The law introduces the concept of equivalent weight."
    ],
    importantStatements: [
      "When two elements combine separately with a fixed mass of a third element, the ratio of their masses is either the same or a simple multiple of the ratio of their masses when they combine with each other.",
      "This law is based on the concept of equivalent weights."
    ],
    importantNotes: [
      "The law works because elements combine in fixed ratios of their equivalent weights.",
      "Equivalent weight is the combining capacity relative to hydrogen.",
      "Modern chemistry uses this concept in acid-base and redox reactions."
    ],
    examShortTricks: [
      "Step 1: Find mass ratio of A:B and A:C.",
      "Step 2: Compare ratios of B and C.",
      "Step 3: Check if ratio in B-C compound is simple multiple.",
      "Example: H-S (32:2) and H-O (16:2), ratio S:O = 2:1. In SO₂, S:O = 32:32 = 1:1."
    ],
    mcs: [
      {
        question: "The Law of Reciprocal Proportions was proposed by:",
        options: ["Dalton", "Proust", "Richter", "Avogadro"],
        answer: "C"
      },
      {
        question: "If A combines with B in ratio 1:4 and A combines with C in ratio 1:8, the ratio of B to C in BC compound should be:",
        options: ["1:2", "2:1", "1:8", "4:1"],
        answer: "A"
      }
    ]
  },
  "04-mole-concept": {
    universalFacts: [
      "The mole is the SI unit for amount of substance, defined in 1971.",
      "One mole contains exactly 6.02214076 × 10²³ elementary entities (Avogadro's constant).",
      "The concept was introduced by Wilhelm Ostwald in 1893.",
      "One mole of any substance has a mass equal to its molecular/atomic mass in grams.",
      "At STP, one mole of any ideal gas occupies 22.4 liters."
    ],
    examples: [
      "1 mole of H₂O = 18g = 6.022 × 10²³ molecules = 2 moles H atoms + 1 mole O atoms.",
      "1 mole of NaCl = 58.5g = 6.022 × 10²³ formula units.",
      "1 mole of any gas at STP = 22.4 dm³.",
      "1 mole of electrons = 96485 coulombs (Faraday constant)."
    ],
    practiceQuestions: [
      "Define mole and calculate the number of molecules in 36g of water.",
      "Calculate the mass of 0.5 moles of CO₂.",
      "Find the volume occupied by 2 moles of gas at STP.",
      "Calculate the number of atoms in 24g of carbon."
    ],
    formulas: [
      "n = m/M (moles = mass/molar mass)",
      "n = N/N_A (moles = number of particles/Avogadro's number)",
      "n = V/V_m (moles = volume/molar volume at STP)",
      "N = n × N_A = n × 6.022 × 10²³",
      "M = m/n (molar mass = mass/moles)"
    ],
    keyPoints: [
      "Mole is a bridge between atomic scale and macroscopic scale.",
      "Molar mass = atomic/molecular mass in grams.",
      "Molar volume at STP = 22.4 L/mol.",
      "Avogadro's number = 6.022 × 10²³ particles/mol."
    ],
    specialNotes: [
      "The mole concept is the most important tool in stoichiometry.",
      "Always write units clearly in calculations.",
      "NEB frequently tests mole concept with numerical problems."
    ],
    importantStatements: [
      "One mole of a substance contains Avogadro's number of particles.",
      "The mass of one mole of a substance in grams is its molar mass.",
      "At STP, one mole of any gas occupies 22.4 dm³."
    ],
    importantNotes: [
      "The mole is used for atoms, molecules, ions, electrons, or any elementary entity.",
      "Remember: 1 mol = 6.022 × 10²³ particles.",
      "Molar mass of elements = atomic mass (g/mol); for compounds = sum of atomic masses."
    ],
    examShortTricks: [
      "Remember: n = m/M = N/N_A = V/22.4",
      "Quick calc: moles = given mass ÷ molecular mass.",
      "For gases at STP: Volume = moles × 22.4.",
      "Number of particles = moles × 6.022 × 10²³."
    ],
    mcs: [
      {
        question: "One mole of any substance contains how many particles?",
        options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²⁴", "6.022 × 10²⁰"],
        answer: "A"
      },
      {
        question: "What is the molar mass of water (H₂O)?",
        options: ["18 g/mol", "16 g/mol", "20 g/mol", "2 g/mol"],
        answer: "A"
      },
      {
        question: "What volume does 1 mole of gas occupy at STP?",
        options: ["22.4 dm³", "224 dm³", "2.24 dm³", "2240 dm³"],
        answer: "A"
      },
      {
        question: "Number of moles in 36g of water is:",
        options: ["2", "1", "18", "36"],
        answer: "A"
      },
      {
        question: "Avogadro's number is:",
        options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²⁴", "6.022 × 10²⁰"],
        answer: "A"
      }
    ]
  },
  "05-limiting-reactant": {
    universalFacts: [
      "The limiting reactant determines the maximum amount of product formed.",
      "It is completely consumed in the reaction and limits the extent of reaction.",
      "The concept is fundamental to yield calculations in industrial chemistry.",
      "All reactants other than the limiting reactant are in excess.",
      "Understanding limiting reactant is essential for optimizing chemical processes."
    ],
    examples: [
      "2H₂ + O₂ → 2H₂O: If 4g H₂ reacts with 32g O₂, H₂ is limiting (requires 32g O₂ but has excess).",
      "N₂ + 3H₂ → 2NH₃: If 28g N₂ reacts with 6g H₂, H₂ is limiting (requires 84g N₂).",
      "CaCO₃ → CaO + CO₂: If 50g CaCO₃ is heated, calculate yield.",
      "Zn + 2HCl → ZnCl₂ + H₂: Limiting reactant determines H₂ volume."
    ],
    practiceQuestions: [
      "Define limiting reactant and explain its significance.",
      "Identify the limiting reactant when 10g of A reacts with 15g of B.",
      "Calculate the theoretical yield when 5g of CaCO₃ is heated.",
      "Find the amount of excess reactant remaining after reaction."
    ],
    formulas: [
      "Moles = Mass / Molar mass",
      "Limiting reactant = reactant giving minimum moles of product",
      "Theoretical yield = moles of limiting reactant × stoichiometric ratio × molar mass of product",
      "% Yield = (Actual yield / Theoretical yield) × 100",
      "Excess reactant remaining = Initial - Consumed"
    ],
    keyPoints: [
      "Limiting reactant is completely consumed.",
      "It determines the maximum product formed.",
      "Other reactants are in excess.",
      "Always convert to moles before comparing."
    ],
    specialNotes: [
      "The limiting reactant concept is crucial for yield calculations.",
      "In NEB exams, always show mole ratio comparison.",
      "Industrial processes optimize by controlling limiting reactant."
    ],
    importantStatements: [
      "The limiting reactant is the reactant that is completely consumed first and determines the extent of reaction.",
      "The amount of product formed depends on the limiting reactant.",
      "Reactants in excess remain unconsumed after the reaction."
    ],
    importantNotes: [
      "To find limiting reactant: Convert all masses to moles.",
      "Use mole ratio from balanced equation.",
      "The reactant giving least product is limiting.",
      "Calculate excess reactant remaining."
    ],
    examShortTricks: [
      "Step 1: Write balanced equation.",
      "Step 2: Convert all masses to moles.",
      "Step 3: Divide moles by coefficient.",
      "Step 4: Smallest value = limiting reactant.",
      "Step 5: Calculate product from limiting reactant."
    ],
    mcs: [
      {
        question: "The limiting reactant in a chemical reaction is the one that:",
        options: ["Produces the maximum amount of product", "Is completely consumed first", "Is present in excess", "Is a catalyst"],
        answer: "B"
      },
      {
        question: "In the reaction 2H₂ + O₂ → 2H₂O, if 4g H₂ reacts with 32g O₂, which is limiting?",
        options: ["H₂", "O₂", "Both are limiting", "Neither is limiting"],
        answer: "A"
      },
      {
        question: "The theoretical yield is calculated based on:",
        options: ["Excess reactant", "Limiting reactant", "Catalyst", "Solvent"],
        answer: "B"
      }
    ]
  },
  "05-verifying-whole-number-ratios": {
    universalFacts: [
      "Whole number ratios are fundamental to chemical combination.",
      "This verification supports the atomic theory of matter.",
      "Experimental data consistently shows simple whole number ratios.",
      "The law of multiple proportions is based on this observation.",
      "This principle is used to determine empirical formulas."
    ],
    examples: [
      "H₂O: H:O mass ratio = 1:8 (simple whole number ratio).",
      "CO₂: C:O mass ratio = 3:8.",
      "NH₃: N:H mass ratio = 14:3.",
      "CH₄: C:H mass ratio = 3:1."
    ],
    practiceQuestions: [
      "Verify whole number ratios for water and ammonia.",
      "Calculate the empirical formula from percentage composition data.",
      "Show that the Law of Multiple Proportions is based on whole number ratios."
    ],
    formulas: [
      "Empirical formula: mole ratio of elements in simplest whole numbers",
      "Mole ratio = (Mass of element / Atomic mass) for each element",
      "Divide by smallest mole value to get whole number ratio",
      "Molecular formula = (Empirical formula)_n where n = Molecular mass/Empirical mass"
    ],
    keyPoints: [
      "All compounds have whole number atom ratios.",
      "Empirical formula gives simplest ratio.",
      "Molecular formula may be multiple of empirical formula.",
      "Whole number ratios support atomic theory."
    ],
    specialNotes: [
      "This concept is essential for solving empirical formula problems.",
      "NEB frequently asks to determine empirical formulas from data.",
      "Round ratios to nearest whole numbers (multiply if needed)."
    ],
    importantStatements: [
      "Atoms combine in simple whole number ratios to form compounds.",
      "The empirical formula represents the simplest whole number ratio of atoms in a compound.",
      "Whole number ratios are evidence for the particulate nature of matter."
    ],
    importantNotes: [
      "When calculating empirical formulas, divide mole ratios by the smallest value.",
      "If ratios are not whole numbers, multiply by appropriate factor.",
      "Common multipliers: ×2 for 0.5, ×3 for 0.33 or 0.67, ×4 for 0.25."
    ],
    examShortTricks: [
      "Step 1: Convert % to grams.",
      "Step 2: Convert grams to moles.",
      "Step 3: Divide by smallest mole value.",
      "Step 4: Multiply to get whole numbers if needed.",
      "Step 5: Write empirical formula."
    ],
    mcs: [
      {
        question: "The empirical formula of a compound represents:",
        options: ["Actual number of atoms", "Simplest whole number ratio", "Molecular mass", "Structural arrangement"],
        answer: "B"
      },
      {
        question: "If the mole ratio of elements in a compound is 1:2:3, the empirical formula is:",
        options: ["ABC", "A₁B₂C₃", "A₂B₄C₆", "Cannot be determined"],
        answer: "B"
      }
    ]
  },
  "06-yield-calculations": {
    universalFacts: [
      "Theoretical yield is the maximum product calculated from stoichiometry.",
      "Actual yield is the product actually obtained from experiment.",
      "Percent yield = (Actual yield / Theoretical yield) × 100%.",
      "Yield is always less than 100% due to side reactions, incomplete reactions, and losses.",
      "High yield indicates efficient reaction conditions."
    ],
    examples: [
      "If theoretical yield of CaO from 50g CaCO₃ is 28g and actual yield is 25g, % yield = 89.3%.",
      "Synthesis of NH₃: Theoretical = 34g, Actual = 28g, % yield = 82.4%.",
      "Precipitation reactions often give high yields (>90%).",
      "Organic synthesis may have yields of 50-80%."
    ],
    practiceQuestions: [
      "Calculate the percent yield if 25g of product is obtained from theoretical yield of 30g.",
      "Find the actual yield when % yield is 75% and theoretical yield is 40g.",
      "Calculate theoretical yield of AgCl from 10g NaCl and excess AgNO₃.",
      "Determine % yield if 15g of product is obtained from 18g theoretical."
    ],
    formulas: [
      "% Yield = (Actual yield / Theoretical yield) × 100%",
      "Theoretical yield = moles limiting reactant × stoichiometric ratio × Molar mass",
      "Actual yield = (% Yield × Theoretical yield) / 100",
      "Moles = Mass / Molar mass",
      "Theoretical yield (mass) = n × M"
    ],
    keyPoints: [
      "Theoretical yield = calculated from stoichiometry.",
      "Actual yield = measured experimentally.",
      "% Yield indicates efficiency of reaction.",
      "Yield < 100% is normal due to practical losses."
    ],
    specialNotes: [
      "Percent yield is a key concept in NEB examinations.",
      "Always show units in yield calculations.",
      "Yield calculations require balanced chemical equations."
    ],
    importantStatements: [
      "Percent yield measures the efficiency of a chemical reaction.",
      "Theoretical yield is calculated assuming 100% conversion of limiting reactant.",
      "Actual yield is always less than theoretical yield in practice."
    ],
    importantNotes: [
      "Factors affecting yield: side reactions, incomplete reactions, mechanical losses, evaporation.",
      "Industrial processes aim for high yield to minimize waste.",
      "Yield calculations are fundamental to stoichiometry."
    ],
    examShortTricks: [
      "Remember: % Yield = (Actual/Theoretical) × 100.",
      "Find theoretical from limiting reactant first.",
      "Then apply percentage formula.",
      "Check: % Yield should be ≤ 100%."
    ],
    mcs: [
      {
        question: "Percent yield is calculated as:",
        options: ["(Theoretical/Actual) × 100", "(Actual/Theoretical) × 100", "(Actual - Theoretical) × 100", "(Theoretical - Actual) × 100"],
        answer: "B"
      },
      {
        question: "If theoretical yield is 50g and actual yield is 40g, the percent yield is:",
        options: ["80%", "125%", "50%", "20%"],
        answer: "A"
      },
      {
        question: "Why is percent yield usually less than 100%?",
        options: ["Side reactions and losses", "Reaction goes to completion", "Limiting reactant is excess", "Products are pure"],
        answer: "A"
      }
    ]
  },
  "07-empirical-molecular-formula": {
    universalFacts: [
      "Empirical formula gives simplest whole number ratio of atoms.",
      "Molecular formula gives actual number of atoms in molecule.",
      "Molecular formula = (Empirical formula)_n where n = Molecular mass/Empirical mass.",
      "For ionic compounds, empirical formula is the formula unit.",
      "For covalent compounds, molecular formula may differ from empirical formula."
    ],
    examples: [
      "Glucose: Empirical = CH₂O, Molecular = C₆H₁₂O₆ (n=6).",
      "Water: Empirical = H₂O, Molecular = H₂O (n=1).",
      "Hydrogen peroxide: Empirical = HO, Molecular = H₂O₂ (n=2).",
      "Benzene: Empirical = CH, Molecular = C₆H₆ (n=6)."
    ],
    practiceQuestions: [
      "Calculate empirical formula from % composition data.",
      "Determine molecular formula if empirical formula is CH₂O and molecular mass is 180.",
      "Find both empirical and molecular formulas for a compound with 40% C, 6.7% H, 53.3% O.",
      "Calculate the molecular formula of a hydrocarbon with 85.7% C and molecular mass 84."
    ],
    formulas: [
      "Empirical formula: simplest whole number ratio",
      "Molecular formula = (Empirical formula)_n",
      "n = Molecular mass / Empirical formula mass",
      "% Composition = (Mass of element / Total mass) × 100",
      "Moles = Mass / Atomic mass"
    ],
    keyPoints: [
      "Empirical = simplest ratio, Molecular = actual count.",
      "n = Molecular mass / Empirical mass.",
      "Ionic compounds use empirical formula.",
      "Covalent compounds may have different molecular formulas."
    ],
    specialNotes: [
      "This topic is frequently tested in NEB exams.",
      "Practice converting % composition to empirical formula.",
      "Always verify n is a whole number."
    ],
    importantStatements: [
      "The empirical formula represents the simplest whole-number ratio of atoms in a compound.",
      "The molecular formula gives the actual number of atoms of each element in a molecule.",
      "The relationship: Molecular formula = (Empirical formula) × n."
    ],
    importantNotes: [
      "To find empirical formula: Convert % to grams, grams to moles, divide by smallest.",
      "To find molecular formula: Calculate n = M_molecular / M_empirical.",
      "Common error: Forgetting to multiply subscripts by n."
    ],
    examShortTricks: [
      "Step 1: % → grams → moles → divide by smallest → whole numbers.",
      "Step 2: Calculate empirical mass.",
      "Step 3: n = Molecular mass / Empirical mass.",
      "Step 4: Multiply subscripts by n.",
      "Check: n should be a whole number."
    ],
    mcs: [
      {
        question: "The empirical formula of glucose (C₆H₁₂O₆) is:",
        options: ["C₆H₁₂O₆", "CH₂O", "CHO", "C₃H₆O₃"],
        answer: "B"
      },
      {
        question: "If empirical formula is CH₂O and molecular mass is 180, the molecular formula is:",
        options: ["CH₂O", "C₂H₄O₂", "C₆H₁₂O₆", "C₁₂H₂₄O₁₂"],
        answer: "C"
      },
      {
        question: "The value of n in molecular formula = (empirical formula)_n is calculated as:",
        options: ["Empirical mass/Molecular mass", "Molecular mass/Empirical mass", "Molecular mass + Empirical mass", "Molecular mass - Empirical mass"],
        answer: "B"
      }
    ]
  }
};

// Process each file
const dir = path.join(__dirname, '../content/ravikishan/class-11-notes/chemistry/stoichiometry/concepts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let data;
  
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.log(`Error reading ${file}: ${e.message}`);
    return;
  }
  
  // Extract slug from filename
  const slug = file.replace('.json', '');
  const content = topicContent[slug];
  
  if (!content) {
    console.log(`No content found for ${slug}`);
    return;
  }
  
  // Update enrichedContent
  if (data.enrichedContent) {
    Object.keys(content).forEach(key => {
      if (Array.isArray(content[key]) && content[key].length > 0) {
        data.enrichedContent[key] = content[key];
      }
    });
  }
  
  // Also update originalContent if it exists
  if (data.originalContent) {
    Object.keys(content).forEach(key => {
      if (Array.isArray(content[key]) && content[key].length > 0) {
        data.originalContent[key] = content[key];
      }
    });
  }
  
  // Write back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated: ${file}`);
});

console.log('\nAll Chemistry Stoichiometry files enhanced!');
