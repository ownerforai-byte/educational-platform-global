import { writeDual } from "./enrich-helper.mjs";
import { cap01 } from "./cap01-part1.mjs";

const fullCap01 = {
  ...cap01,
  examples: [
    "Camera flash unit: Slowly charges a 330 μF capacitor to 300 V from a small battery and discharges the stored energy across a xenon tube in a millisecond pulse.",
    "Tuning circuit: A variable air capacitor changes plate overlap area to match LC resonance frequency with radio transmission frequency f = 1 / (2π√(LC)).",
    "Computer memory (DRAM): Each single dynamic RAM bit stores information as charge (or absence of charge) in a microscopic capacitor."
  ],
  practiceQuestions: [
    "Q1. Define capacitance of a conductor and state its SI unit and dimensional formula.",
    "Q2. Explain the principle of a capacitor with the help of neat schematics.",
    "Q3. Calculate the capacitance of an isolated spherical conductor of radius equal to the Earth (R = 6400 km).",
    "Q4. Why does grounding the second plate drastically increase the capacitance of a parallel plate arrangement?"
  ],
  formulas: [
    "Fundamental definition: $C = \\frac{Q}{V}$",
    "Capacitance of isolated sphere: $C = 4\\pi\\varepsilon_0 \\varepsilon_r R$",
    "Capacitance dimensions: $[M^{-1}L^{-2}T^4I^2]$",
    "Reactance to AC: $X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}$"
  ],
  keyPoints: [
    "Capacitance C = Q/V is an invariant characteristic of conductor shape, area, separation, and dielectric medium.",
    "Grounding the outer plate creates an opposite induced bound charge that depresses potential, allowing far greater charge retention.",
    "1 Farad = 1 Coulomb / Volt; practical values span microfarads to picofarads.",
    "The net charge on any capacitor is zero; stored charge Q refers to magnitude on either plate."
  ],
  summary: "Capacitance measures a conductor's capacity to accumulate electrostatic charge per unit electrical potential (C = Q/V). A capacitor overcomes the geometric limitation of isolated conductors by placing an earthed conductor adjacent to a charged plate, which suppresses potential through induced charges and dramatically multiplies charge storage capacity at low voltages.",
  specialNotes: [
    "Standard dielectric breakdown of dry air occurs at an electric field of E_max ≈ 3 × 10^6 V/m; beyond this, air ionizes and spark discharge neutralizes the plates.",
    "In electrostatic equilibrium, the surface of any conducting capacitor plate is an equipotential surface."
  ],
  importantStatements: [
    "Statement 1: Capacitance is defined as the charge required to raise the electric potential of a conductor by unity.",
    "Statement 2: The capacitance of an isolated conductor is directly proportional to its radius (C = 4πε₀R).",
    "Statement 3: An uncharged earthed conducting body placed near a charged body reduces its potential without altering its charge, multiplying its capacitance.",
    "Statement 4: Capacitance is independent of the metal chosen for the plates, depending solely on geometric configuration and the surrounding dielectric medium.",
    "Statement 5: A capacitor acts as an open circuit for steady direct current (DC) and a finite reactance for alternating current (AC)."
  ],
  importantNotes: [
    "Always check whether a capacitor remains connected to a DC source (V constant, Q variable) or is isolated (Q constant, V variable) before evaluating modifications."
  ],
  examShortTricks: [
    "Isolated conductor: R = 9 mm ⟺ C = 1 pF; multiply radius in meters by 1.11 × 10⁻¹⁰ to get Farads directly.",
    "Remember mnemonic: Q = CV ('Quickly Charged Voltage')."
  ],
  examNotes: [
    "NEB exam frequently asks for the derivation of capacitance of an isolated spherical conductor and the physical principle of a parallel plate capacitor (3 to 4 marks)."
  ],
  mcs: [
    {
      question: "If the charge on a capacitor is doubled, its capacitance:",
      options: [
        "is doubled",
        "is halved",
        "remains unchanged",
        "quadruples"
      ],
      answer: "C",
      explanation: "Capacitance is determined solely by geometry and dielectric medium. When charge Q is doubled, potential difference V doubles proportionally, leaving C = Q/V invariant."
    },
    {
      question: "The dimensional formula of capacitance is:",
      options: [
        "[M⁻¹ L⁻² T⁴ I²]",
        "[M¹ L² T⁻⁴ I⁻²]",
        "[M⁻¹ L⁻² T² I²]",
        "[M¹ L² T⁻² I¹]"
      ],
      answer: "A",
      explanation: "From C = Q/V = Q² / W = (I·T)² / (M·L²·T⁻²) = M⁻¹ L⁻² T⁴ I²."
    },
    {
      question: "The capacitance of the Earth modeled as an isolated conducting sphere of radius 6400 km is approximately:",
      options: [
        "1 F",
        "711 μF",
        "9000 μF",
        "6400 μF"
      ],
      answer: "B",
      explanation: "C = 4πε₀R = (6.4 × 10⁶) / (9 × 10⁹) ≈ 7.11 × 10⁻⁴ F = 711 μF."
    }
  ],
  importantConcepts: [
    "Definition of capacitance as charge per unit potential difference: C = Q/V.",
    "Derivation of capacitance of an isolated spherical conductor C = 4πε₀R.",
    "Principle of capacitor using an earthed complementary conductor."
  ],
  importantTasks: [
    "Derive C = 4πε₀R for an isolated sphere.",
    "State the units, dimensions, and physical factors determining capacitance.",
    "Calculate the capacitance of Earth and explain why 1 Farad is practically unachievable for isolated objects."
  ],
  duplicateType: 1,
  visualType: "parallel-plate-capacitor"
};

writeDual(
  "physics/capacitor/01-capacitance-and-capacitor.json",
  "class-11-notes/physics/capacitor/concepts/01-capacitance-and-capacitor.json",
  fullCap01
);
