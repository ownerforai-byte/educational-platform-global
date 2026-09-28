import { writeDual } from "./enrich-helper.mjs";
import { cap05 } from "./cap05-part1.mjs";
import { cap05Meta } from "./cap05-meta.mjs";

const fullCap05 = {
  ...cap05,
  ...cap05Meta,
  summary: "Dielectrics are insulators classified into non-polar (zero permanent dipole moment) and polar (permanent dipole moment). An applied field induces dipole alignment, generating bound surface charge density σ_p and an opposing field E_p, diminishing the net field to E = E₀/κ. The polarization vector P = χ_e ε₀ E equals σ_p, while electric displacement D = ε₀E + P = κε₀E accounts strictly for free plate charges, leading to the fundamental constitutive relation κ = 1 + χ_e.",
  specialNotes: [
    "Induced bound surface charge density σ_p is always less than free surface charge density σ: σ_p = σ(1 - 1/κ). For an ideal conductor, κ → ∞, so σ_p = σ, completely canceling the electric field inside.",
    "Dielectric breakdown occurs when external electric field strips bound electrons from molecular parent atoms, turning the insulator into a conductor."
  ],
  importantStatements: [
    "Statement 1: In a dielectric placed in an electric field, induced bound charges appear on opposite faces, producing an internal electric field that opposes the applied field.",
    "Statement 2: The electric polarization vector P is defined as the induced electric dipole moment per unit volume of the dielectric.",
    "Statement 3: The magnitude of the polarization vector P is equal to the induced bound surface charge density σ_p.",
    "Statement 4: The electric displacement vector D satisfies Gauss's law for free charges only, independent of the dielectric medium.",
    "Statement 5: The dielectric constant κ and electric susceptibility χ_e are related by the identity κ = 1 + χ_e."
  ],
  importantNotes: [
    "Remember that dielectric constant κ is dimensionless, whereas electric permittivity ε has SI units of Farads per meter (F/m) or C²/(N·m²)."
  ],
  examShortTricks: [
    "Bound charge trick: $\\sigma_p = \\sigma(1 - 1/\\kappa)$; for large $\\kappa$, $\\sigma_p \\approx \\sigma$.",
    "Relative permittivity identity: $\\kappa = 1 + \\chi_e$.",
    "Electric displacement in uniform plate capacitor: $D = \\sigma_{free} = Q/A$, completely unaffected by dielectric insertion."
  ],
  examNotes: [
    "Questions on the distinction between polar and non-polar dielectrics and the derivation of $\\kappa = 1 + \\chi_e$ are standard 3 to 4-mark questions in NEB Class 11 Physics exams."
  ],
  mcs: [
    {
      question: "Which of the following is an example of a polar dielectric?",
      options: [
        "Oxygen (O₂)",
        "Water (H₂O)",
        "Hydrogen (H₂)",
        "Carbon dioxide (CO₂)"
      ],
      answer: "B",
      explanation: "Water (H₂O) possesses an asymmetric bent molecular geometry with a permanent electric dipole moment, making it a polar dielectric."
    },
    {
      question: "The relation between dielectric constant κ and electric susceptibility χ_e is:",
      options: [
        "κ = χ_e - 1",
        "κ = 1 + χ_e",
        "κ = 1 / χ_e",
        "κ = χ_e / ε₀"
      ],
      answer: "B",
      explanation: "From D = ε₀E + P and substituting D = κε₀E and P = χ_e ε₀E, dividing by ε₀E gives κ = 1 + χ_e."
    },
    {
      question: "The SI unit of the electric polarization vector P is:",
      options: [
        "C·m",
        "C/m²",
        "N/C",
        "V/m"
      ],
      answer: "B",
      explanation: "Polarization P is dipole moment per volume: (C·m) / m³ = C/m², identical to surface charge density."
    }
  ],
  importantConcepts: [
    "Molecular distinction between polar and non-polar dielectrics.",
    "Mechanism of polarization and origin of bound surface charges ±σ_p.",
    "Definitions and physical significance of field vectors E, P, and D.",
    "Derivation of constitutive relation κ = 1 + χ_e."
  ],
  importantTasks: [
    "Differentiate between polar and non-polar dielectrics.",
    "Derive the relation κ = 1 + χ_e.",
    "Calculate induced bound surface charge density σ_p from free plate charge and dielectric constant κ."
  ],
  duplicateType: 1,
  visualType: "parallel-plate-capacitor"
};

writeDual(
  "physics/capacitor/05-effect-of-a-dielectric-polarization-and-displacement.json",
  "class-11-notes/physics/capacitor/concepts/05-effect-of-a-dielectric-polarization-and-displacement.json",
  fullCap05
);
writeDual(
  "physics/capacitor/04-dielectric-effect.json",
  "class-11-notes/physics/capacitor/concepts/04-dielectric-effect.json",
  { ...fullCap05, title: "Effect of Dielectric", duplicateType: 2, tabGroup: "effect-of-a-dielectric-polarization-and-displacement" }
);
writeDual(
  "physics/capacitor/04-dielectric-effect-2.json",
  "class-11-notes/physics/capacitor/concepts/04-dielectric-effect.json",
  { ...fullCap05, title: "Effect of Dielectric", duplicateType: 2, tabGroup: "effect-of-a-dielectric-polarization-and-displacement" }
);
