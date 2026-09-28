import { writeDual } from "./enrich-helper.mjs";
import { ef01 } from "./ef01-part1.mjs";
import { ef01Meta } from "./ef01-meta.mjs";

const fullEf01 = {
  ...ef01,
  ...ef01Meta,
  summary: "The electric field E is a vector field describing electrostatic force per unit test charge (E = F/q₀). Point charges produce radially symmetric fields falling off as 1/r², mapped visually by continuous non-intersecting field lines originating on positive and terminating on negative charges. Electric dipoles (p = 2qa) generate fields decaying as 1/r³, with axial field intensity twice that of the equatorial position at the same large distance, experiencing aligning torque τ = p × E in an external field.",
  specialNotes: [
    "Electrostatic field lines do not form closed loops because electrostatic fields are conservative: the closed loop line integral ∮ E · dr = 0.",
    "A charged particle projected perpendicularly into a uniform electric field follows a parabolic trajectory, analogous to projectile motion in a uniform gravitational field."
  ],
  importantStatements: [
    "Statement 1: The electric field at any point in space is the electrostatic force experienced per unit infinitesimal positive test charge.",
    "Statement 2: Electric field lines originate on positive charges, terminate on negative charges, and cannot intersect at any point.",
    "Statement 3: The electric field due to a point charge obeys an inverse-square distance relationship (E ∝ 1/r²).",
    "Statement 4: The electric field due to a short electric dipole decays inversely with the cube of distance (E ∝ 1/r³).",
    "Statement 5: In a uniform electric field, an electric dipole experiences zero translational net force but a net aligning torque τ = p × E."
  ],
  importantNotes: [
    "Remember that the SI units N/C and V/m are completely interchangeable: 1 N/C = 1 (J/m) / C = 1 (J/C) / m = 1 V/m."
  ],
  examShortTricks: [
    "Dipole field ratio trick: At identical large distance r, E_axial / E_equatorial = 2.",
    "Neutral point between like charges: E_net = 0 lies between them at distance x = d / (√(q₂/q₁) + 1) from q₁.",
    "Acceleration of charged particle in field: a = qE / m (direction along E for positive charge, opposite E for electron)."
  ],
  examNotes: [
    "Derivation of electric field due to an electric dipole at axial and equatorial points is a premier 4-mark question in NEB Class 11 Physics exams."
  ],
  mcs: [
    {
      question: "The electric field intensity at an axial point distance r from a short electric dipole is E. The electric field at an equatorial point at the same distance r is:",
      options: [
        "2E",
        "E / 2",
        "E / 4",
        "4E"
      ],
      answer: "B",
      explanation: "For a short dipole (r ≫ a), E_axial = 2kp/r³ and E_equatorial = kp/r³. Therefore, E_equatorial = E_axial / 2 = E / 2."
    },
    {
      question: "An electric dipole placed in a uniform electric field experiences:",
      options: [
        "both a net force and a torque",
        "a net force only, but no torque",
        "a torque only, but no net force",
        "neither a net force nor a torque"
      ],
      answer: "C",
      explanation: "In a uniform field, equal and opposite forces act on +q and -q (+qE and -qE), so net force is zero. However, their lines of action do not coincide, producing a net torque τ = p × E."
    },
    {
      question: "Electric field lines can never intersect each other because:",
      options: [
        "they are imaginary lines",
        "at the point of intersection, the electric field would have two distinct directions",
        "they always terminate at infinity",
        "they form closed loops in vacuum"
      ],
      answer: "B",
      explanation: "The tangent to a field line gives the direction of E. If two lines intersect, there would be two tangents, meaning two distinct field directions at a single point, which is physically impossible."
    }
  ],
  importantConcepts: [
    "Definition and physical meaning of electric field vector E = F/q₀.",
    "Electric field of a point charge and principle of linear superposition.",
    "Rules governing electric field lines and why they never form closed loops.",
    "Electric dipole moment and derivation of axial and equatorial dipole fields.",
    "Behavior of dipoles in uniform and non-uniform electric fields."
  ],
  importantTasks: [
    "Derive expressions for E_axial and E_equatorial of an electric dipole.",
    "Sketch electric field lines for unlike charges, like charges, and uniform fields.",
    "Calculate the net electric field and neutral point for two collinear point charges."
  ],
  duplicateType: 1,
  visualType: "electric-field"
};

// Write canonical Topic 1
writeDual(
  "physics/electric-field/01-electric-field-due-to-point-charges-and-field-lines.json",
  "class-11-notes/physics/electric-field/concepts/01-electric-field-due-to-point-charges-and-field-lines.json",
  fullEf01
);

// Write variant duplicateType: 2 files
writeDual(
  "physics/electric-field/01-electric-field-point-charges.json",
  "class-11-notes/physics/electric-field/concepts/01-electric-field-point-charges.json",
  {
    ...fullEf01,
    title: "Electric Field due to Point Charges",
    topicSlug: "electric-field-point-charges",
    duplicateType: 2,
    tabGroup: "electric-field-due-to-point-charges-and-field-lines"
  }
);

writeDual(
  "physics/electric-field/01-electric-field-point-charges-2.json",
  "class-11-notes/physics/electric-field/concepts/01-electric-field-point-charges.json",
  {
    ...fullEf01,
    title: "Electric Field due to Point Charges",
    topicSlug: "electric-field-point-charges",
    duplicateType: 2,
    tabGroup: "electric-field-due-to-point-charges-and-field-lines"
  }
);
