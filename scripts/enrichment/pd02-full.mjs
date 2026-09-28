import { pd02 } from "./pd02-part1.mjs";
import { pd02Meta } from "./pd02-meta.mjs";

export const fullPd02 = {
  ...pd02,
  ...pd02Meta,
  summary: "An equipotential surface is a locus of points at identical potential V, so no work is done by the field along it (W = qΔV = 0). Equipotential surfaces can never intersect and are always perpendicular to electric field lines, since dV = -E·dl = 0 forces the displacement along the surface to be normal to E. Their spacing indicates field strength: close spacing means a strong field. For a point charge they are concentric spheres, for a line charge coaxial cylinders, and for an infinite plane sheet parallel planes.",
  specialNotes: [
    "Inside a charged conductor there is no field direction, so the concept of perpendicularity does not apply there; the whole cavity is simply at the constant potential of the conductor's surface.",
    "For a dipole, the V = 0 equipotential surface is the perpendicular bisector plane of the axis — the only region in the dipole's field where V is exactly zero, though E is non-zero there."
  ],
  importantStatements: [
    "Statement 1: No work is done by the electrostatic field in moving a charge along an equipotential surface, since W = qΔV = 0.",
    "Statement 2: Equipotential surfaces are always perpendicular to the electric field lines at the points of intersection.",
    "Statement 3: Two distinct equipotential surfaces can never intersect each other.",
    "Statement 4: The closeness of successive equipotential surfaces is inversely proportional to the strength of the electric field in that region.",
    "Statement 5: The entire surface of a conductor in electrostatic equilibrium is at a single constant potential."
  ],
  importantNotes: [
    "Equipotential surfaces are the two-dimensional analogue of contour lines on a topographic map: equal potential means equal 'height' of the potential field, and gradient magnitude equals field magnitude."
  ],
  examShortTricks: [
    "Shape recall: point charge → concentric spheres; line charge → coaxial cylinders; plane sheet → parallel planes; conducting shell → sphere plus a constant interior region.",
    "Quick check of perpendicularity: if E had a component along the equipotential surface, moving along it would change V, contradicting ΔV = 0."
  ],
  examNotes: [
    "Proving perpendicularity of equipotential surfaces and field lines, along with sketching equipotentials for three standard configurations, is a standard 4-mark question in NEB Class 11 Physics."
  ],
  mcs: [
    {
      question: "The work done in moving a charge q from one equipotential surface to another surface at a higher potential is:",
      options: [
        "zero",
        "qΔV",
        "negative qΔV",
        "independent of q"
      ],
      answer: "B",
      explanation: "W = qΔV where ΔV is the potential difference between the two surfaces. This is non-zero because the surfaces are not equipotential with each other."
    },
    {
      question: "Equipotential surfaces of a point charge are:",
      options: [
        "planes",
        "concentric spheres",
        "cylinders",
        "paraboloids"
      ],
      answer: "B",
      explanation: "Since V = kQ/r, V is constant for a fixed value of r, which is the equation of a sphere centred on the charge. Hence equipotentials are concentric spheres."
    },
    {
      question: "The spacing between two consecutive equipotential surfaces in a region is small. This indicates that the electric field in that region is:",
      options: [
        "zero",
        "very large",
        "moderate and constant",
        "perpendicular to the surfaces"
      ],
      answer: "B",
      explanation: "A small separation for a fixed potential difference means a large gradient, E = -ΔV/Δs, so the field is very large in that region."
    }
  ],
  importantConcepts: [
    "Definition of equipotential surfaces and the zero-work consequence.",
    "Proof of perpendicularity between equipotential surfaces and field lines.",
    "Shapes of equipotential surfaces for point charge, line charge, and plane sheet.",
    "Equipotential behaviour of conductors and the constant interior potential.",
    "Work and potential energy relations between equipotential surfaces."
  ],
  importantTasks: [
    "Derive the proof that E is normal to an equipotential surface.",
    "Sketch equipotential diagrams for the three canonical charge distributions.",
    "Calculate work and potential energy differences between two equipotential surfaces."
  ],
  duplicateType: 1,
  visualType: "equipotential"
};
