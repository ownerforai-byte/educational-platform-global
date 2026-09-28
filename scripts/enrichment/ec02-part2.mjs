import { writeDual } from "./enrich-helper.mjs";
import { ec02 } from "./ec02-part1.mjs";
import { ec02Meta } from "./ec02-meta.mjs";

const fullEc02 = {
  ...ec02,
  ...ec02Meta,
  summary: "Coulomb's Law quantifies the electrostatic force between two stationary point charges as directly proportional to the product of charges and inversely proportional to the square of their separation: F = k|q₁q₂|/r². In vector form, forces obey Newton's third law (F₁₂ = -F₂₁). When immersed in a dielectric medium of relative permittivity κ, the force reduces to F₀/κ. For multiple charges, the net force is determined via the principle of linear superposition by vector addition of all individual pairwise interactions.",
  specialNotes: [
    "Coulomb's law is strictly valid only for stationary point charges in an inertial reference frame. Accelerating charges radiate electromagnetic energy.",
    "Definition of 1 Coulomb: That charge which, when placed in vacuum at a distance of 1 meter from an identical charge, repels it with a force of 9 × 10⁹ N."
  ],
  importantStatements: [
    "Statement 1: The electrostatic force between two stationary point charges varies inversely with the square of the distance between them.",
    "Statement 2: Electrostatic forces are central forces acting strictly along the straight line joining the centers of two interacting charges.",
    "Statement 3: Electrostatic forces satisfy Newton's third law: the force on charge 1 by charge 2 is equal in magnitude and opposite in direction to the force on charge 2 by charge 1.",
    "Statement 4: The electrostatic force between two charges is independent of the presence of any other surrounding charges.",
    "Statement 5: In any dielectric medium with relative permittivity κ, the electrostatic force between two charges is attenuated by a factor of κ."
  ],
  importantNotes: [
    "Remember that the permittivity of free space ε₀ has SI units of C²/(N·m²) or F/m, with value 8.854 × 10⁻¹² F/m."
  ],
  examShortTricks: [
    "Equilibrium between like charges q₁ and q₂ at distance L: Third charge of opposite sign placed at x = L / (√(q₂/q₁) + 1) from q₁ achieves equilibrium.",
    "Ratio of forces in dielectric medium: F_air / F_medium = κ.",
    "Two identical charges in symmetrical polygons: Net electrostatic force at the geometric center of any regular polygon with equal vertices charges is identically ZERO."
  ],
  examNotes: [
    "State Coulomb's law in vector form and derive the condition for third charge equilibrium along a line joining two point charges (frequent 3-4 mark NEB question)."
  ],
  mcs: [
    {
      question: "Two point charges placed at a distance r in air experience a force F. If they are immersed in a medium of dielectric constant κ = 4 at the same distance, the new force is:",
      options: [
        "4F",
        "2F",
        "F / 4",
        "F / 2"
      ],
      answer: "C",
      explanation: "In a dielectric medium, the force is reduced by the relative permittivity: F_medium = F_air / κ = F / 4."
    },
    {
      question: "Which of the following represents the correct vector form of Coulomb's law for force on q₁ due to q₂?",
      options: [
        "F₁₂ = (1 / 4πε₀) · (q₁ q₂ / r²) r̂₁₂",
        "F₁₂ = (1 / 4πε₀) · (q₁ q₂ / r³) r⃗₂₁",
        "F₁₂ = (1 / 4πε₀) · (q₁ q₂ / r²) r̂₂₁",
        "F₁₂ = (1 / 4πε₀) · (q₁ q₂ / r) r̂₂₁"
      ],
      answer: "C",
      explanation: "The force on charge 1 due to charge 2 acts along the unit vector from charge 2 to charge 1 (r̂₂₁): F⃗₁₂ = (1/4πε₀) · (q₁q₂/r²) r̂₂₁."
    },
    {
      question: "Four equal positive charges +q are fixed at the four corners of a square of side a. The net force on a test charge placed at the center of the square is:",
      options: [
        "4kq² / a²",
        "2kq² / a²",
        "Zero",
        "√2 kq² / a²"
      ],
      answer: "C",
      explanation: "By diagonal symmetry, forces exerted by pairs of charges located at opposite corners are equal in magnitude and oppositely directed, canceling to exactly zero."
    }
  ],
  importantConcepts: [
    "Inverse-square law and electrostatic proportionality constant k = 1/(4πε₀).",
    "Coulomb's law in vector form satisfying Newton's third law (central force).",
    "Dielectric screening effect and definition of relative permittivity κ = ε/ε₀.",
    "Principle of linear superposition for discrete charge distributions."
  ],
  importantTasks: [
    "Express Coulomb's law in vector notation with positional unit vectors.",
    "Solve problems calculating net force at a polygon vertex using vector components.",
    "Determine position and magnitude of a third charge for complete electrostatic equilibrium."
  ],
  duplicateType: 1,
  visualType: "coulomb-law"
};

// Write canonical Topic 2
writeDual(
  "physics/electric-charges/02-coulomb-s-law-and-force-between-multiple-charges.json",
  "class-11-notes/physics/electric-charges/concepts/02-coulomb-s-law-and-force-between-multiple-charges.json",
  fullEc02
);

// Write variant duplicateType: 2 files
writeDual(
  "physics/electric-charges/02-coulomb-law.json",
  "class-11-notes/physics/electric-charges/concepts/02-coulomb-law.json",
  {
    ...fullEc02,
    title: "Coulomb's Law",
    topicSlug: "coulomb-law",
    duplicateType: 2,
    tabGroup: "coulomb-s-law-and-force-between-multiple-charges"
  }
);

writeDual(
  "physics/electric-charges/02-coulomb-law-2.json",
  "class-11-notes/physics/electric-charges/concepts/02-coulomb-law.json",
  {
    ...fullEc02,
    title: "Coulomb's Law",
    topicSlug: "coulomb-law",
    duplicateType: 2,
    tabGroup: "coulomb-s-law-and-force-between-multiple-charges"
  }
);
