import { writeDual } from "./enrich-helper.mjs";
import { ef03 } from "./ef03-part1.mjs";
import { ef03Meta } from "./ef03-meta.mjs";

const fullEf03 = {
  ...ef03,
  ...ef03Meta,
  summary: "Gauss's law enables straightforward derivation of electric fields for symmetric charge systems: an infinite line charge yields E = λ / (2πε₀r) showing inverse distance decay; an infinite planar sheet produces a uniform, distance-independent field E = σ / (2ε₀); and a spherical shell creates an inverse-square field externally (E = Q / (4πε₀r²)) while maintaining strictly zero internal field (E = 0), establishing electrostatic shielding.",
  specialNotes: [
    "The electric field just outside any arbitrarily shaped conductor in electrostatic equilibrium is always perpendicular to the surface and has magnitude E = σ / ε₀.",
    "A graph of E versus r for a thin spherical shell shows zero field for 0 ≤ r < R, a step discontinuity to E_max = kQ/R² at r = R, and smooth 1/r² decay for r > R."
  ],
  importantStatements: [
    "Statement 1: The electric field due to an infinitely long straight wire carrying uniform linear charge density is inversely proportional to distance from the wire (E ∝ 1/r).",
    "Statement 2: The electric field due to an infinite plane sheet of charge is uniform and completely independent of the distance from the sheet.",
    "Statement 3: The electric field inside a uniformly charged conducting spherical shell is identically zero everywhere.",
    "Statement 4: Outside a spherically symmetric charge distribution, the field is identical to that of a point charge located at the sphere's geometric center.",
    "Statement 5: Inside a uniformly charged non-conducting sphere, the electric field increases linearly with radial distance from the center (E ∝ r)."
  ],
  importantNotes: [
    "Contrast the distance dependencies: point charge E ∝ 1/r², dipole E ∝ 1/r³, line charge E ∝ 1/r, infinite plane sheet E ∝ r⁰ (independent of distance)."
  ],
  examShortTricks: [
    "Distance dependency table: Infinite Sheet (E ∝ r⁰), Infinite Line (E ∝ 1/r), Point Charge (E ∝ 1/r²), Dipole (E ∝ 1/r³).",
    "Hollow shell inside: E = 0 always; potential V = constant = kQ/R.",
    "Solid dielectric sphere inside: E(r) = (r / R) · E_surface."
  ],
  examNotes: [
    "Derivations for line charge, plane sheet, and spherical shell using Gauss's law are core long questions (4 to 5 marks each) frequently examined in NEB Class 11 Board Exams."
  ],
  mcs: [
    {
      question: "The electric field intensity at a distance r from an infinitely long straight wire carrying uniform linear charge density λ is proportional to:",
      options: [
        "1 / r²",
        "1 / r",
        "r",
        "1 / r³"
      ],
      answer: "B",
      explanation: "By Gauss's law, E = λ / (2πε₀r), which exhibits an inverse first-power dependence: E ∝ 1/r."
    },
    {
      question: "An infinite plane sheet has a uniform surface charge density σ. The electric field at a distance d from the sheet is:",
      options: [
        "σ / (2ε₀)",
        "σ / ε₀",
        "σ / (2ε₀ d)",
        "2σ / ε₀"
      ],
      answer: "A",
      explanation: "For an infinite non-conducting plane sheet, Gauss's law gives E = σ / (2ε₀), which is independent of distance d."
    },
    {
      question: "The electric field inside a hollow spherical conductor of radius R carrying charge Q is:",
      options: [
        "Q / (4πε₀R²)",
        "Q / (4πε₀r²)",
        "Zero",
        "σ / (2ε₀)"
      ],
      answer: "C",
      explanation: "Any Gaussian surface drawn inside the hollow cavity encloses zero net charge (Q_enc = 0). Therefore, by Gauss's law, E_inside = 0."
    }
  ],
  importantConcepts: [
    "Symmetry analysis: cylindrical, planar, and spherical Gaussian surfaces.",
    "Derivation of line charge field E = λ / (2πε₀r).",
    "Derivation of infinite plane sheet field E = σ / (2ε₀).",
    "Derivation of spherical shell fields (inside, surface, outside) and graph of E vs r.",
    "Electrostatic shielding and conductor boundary conditions."
  ],
  importantTasks: [
    "Derive Gauss's law application for an infinite straight wire.",
    "Derive Gauss's law application for an infinite plane sheet.",
    "Derive Gauss's law application for a spherical shell and sketch E-r and V-r graphs."
  ],
  duplicateType: 1,
  visualType: "gauss-applications"
};

// Write canonical Topic 3
writeDual(
  "physics/electric-field/03-applications-of-gauss-law.json",
  "class-11-notes/physics/electric-field/concepts/03-applications-of-gauss-law.json",
  fullEf03
);

// Write variant duplicateType: 2 files
writeDual(
  "physics/electric-field/03-gauss-law-applications.json",
  "class-11-notes/physics/electric-field/concepts/03-gauss-law-applications.json",
  {
    ...fullEf03,
    title: "Applications of Gauss Law",
    topicSlug: "gauss-law-applications",
    duplicateType: 2,
    tabGroup: "applications-of-gauss-law"
  }
);

writeDual(
  "physics/electric-field/03-gauss-law-applications-2.json",
  "class-11-notes/physics/electric-field/concepts/03-gauss-law-applications.json",
  {
    ...fullEf03,
    title: "Applications of Gauss Law",
    topicSlug: "gauss-law-applications",
    duplicateType: 2,
    tabGroup: "applications-of-gauss-law"
  }
);
