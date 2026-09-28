import { writeDual } from "./enrich-helper.mjs";
import { ef02 } from "./ef02-part1.mjs";
import { ef02Meta } from "./ef02-meta.mjs";

const fullEf02 = {
  ...ef02,
  ...ef02Meta,
  summary: "Electric flux Φ_E quantifies the perpendicular penetration of electric field lines across a surface (Φ_E = ∬ E · dA). Gauss's Law states that total net outward electric flux through any arbitrary closed Gaussian surface equals the total enclosed charge divided by vacuum permittivity (∮ E · dA = Q_enc / ε₀). While flux depends exclusively on enclosed charges, local surface field E reflects all charges. In differential form, ∇ · E = ρ / ε₀, serving as Maxwell's first equation.",
  specialNotes: [
    "If a closed surface encloses an electric dipole (charges +q and -q), the net flux through the surface is identically zero because Q_enc = +q - q = 0.",
    "For an area vector of a closed surface, dA points outward by standard mathematical convention, so exiting flux is positive and entering flux is negative."
  ],
  importantStatements: [
    "Statement 1: Electric flux through a surface is defined as the surface integral of the electric field vector over that surface.",
    "Statement 2: The total electric flux through any closed Gaussian surface depends solely on the net charge enclosed within it and is independent of the size or shape of the surface.",
    "Statement 3: Charges located outside a closed Gaussian surface do not contribute to the total net electric flux through that surface.",
    "Statement 4: Gauss's theorem is physically equivalent to the inverse-square law of electrostatic force.",
    "Statement 5: In differential form, Gauss's law states that the divergence of the electric field at any point in space equals the local volume charge density divided by permittivity."
  ],
  importantNotes: [
    "Remember that the SI unit of electric flux is N·m²/C or V·m, with dimensional formula [M L³ T⁻³ I⁻¹]."
  ],
  examShortTricks: [
    "Charge at center of cube: Flux through each of the 6 faces = q / (6ε₀).",
    "Charge at corner of cube: Enclosing it requires 8 identical cubes; total flux through 1 cube = q / (8ε₀); flux through each of the 3 opposite faces = q / (24ε₀).",
    "Charge at center of face of cube: Enclosing requires 2 cubes; flux through cube = q / (2ε₀)."
  ],
  examNotes: [
    "State Gauss's theorem in electrostatics and prove it for a point charge enclosed by a spherical surface (frequent 3-4 mark question in NEB Class 11 Physics)."
  ],
  mcs: [
    {
      question: "If an electric dipole of moment p is enclosed within a closed spherical surface of radius R, the total electric flux emerging from the surface is:",
      options: [
        "p / ε₀",
        "p / (4πε₀R²)",
        "Zero",
        "2p / ε₀"
      ],
      answer: "C",
      explanation: "An electric dipole consists of equal and opposite charges (+q and -q). The net enclosed charge is Q_enc = +q - q = 0. By Gauss's Law, total flux Φ = Q_enc / ε₀ = 0."
    },
    {
      question: "A point charge q is placed at the center of an imaginary sphere of radius R. If the radius of the sphere is doubled, the total electric flux passing through the sphere will:",
      options: [
        "be halved",
        "be doubled",
        "be quadrupled",
        "remain unchanged"
      ],
      answer: "D",
      explanation: "According to Gauss's Law, Φ = Q_enc / ε₀, which depends only on the enclosed charge, not on the surface radius or geometry."
    },
    {
      question: "The SI unit of electric flux is:",
      options: [
        "N / C",
        "N·m² / C",
        "N·m / C",
        "C / (N·m²)"
      ],
      answer: "B",
      explanation: "Flux is E · A, so units are (N/C) · m² = N·m²/C, which is also equivalent to Volt-meters (V·m)."
    }
  ],
  importantConcepts: [
    "Definition and orientation of area vector and elemental flux dΦ = E · dA.",
    "Statement, mathematical formulation, and proof of Gauss's Law.",
    "Independence of Gaussian surface shape and size from net enclosed flux.",
    "Calculation of flux through geometric polyhedra (cubes, cylinders) for various charge placements."
  ],
  importantTasks: [
    "Prove Gauss's Law for a spherical surface enclosing a point charge.",
    "Calculate flux through individual faces of a cube with charges at the center, corner, or edge.",
    "Relate Gauss's law in integral form to differential form ∇ · E = ρ / ε₀."
  ],
  duplicateType: 1,
  visualType: "gauss-law"
};

// Write canonical Topic 2
writeDual(
  "physics/electric-field/02-gauss-law-and-electric-flux.json",
  "class-11-notes/physics/electric-field/concepts/02-gauss-law-and-electric-flux.json",
  fullEf02
);

// Write variant duplicateType: 2 files
writeDual(
  "physics/electric-field/02-gauss-law.json",
  "class-11-notes/physics/electric-field/concepts/02-gauss-law.json",
  {
    ...fullEf02,
    title: "Gauss Law",
    topicSlug: "gauss-law",
    duplicateType: 2,
    tabGroup: "gauss-law-and-electric-flux"
  }
);

writeDual(
  "physics/electric-field/02-gauss-law-2.json",
  "class-11-notes/physics/electric-field/concepts/02-gauss-law.json",
  {
    ...fullEf02,
    title: "Gauss Law",
    topicSlug: "gauss-law",
    duplicateType: 2,
    tabGroup: "gauss-law-and-electric-flux"
  }
);
