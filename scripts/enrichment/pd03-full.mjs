import { pd03 } from "./pd03-part1.mjs";
import { pd03Meta } from "./pd03-meta.mjs";

export const fullPd03 = {
  ...pd03,
  ...pd03Meta,
  summary: "The potential gradient is the rate of change of potential with distance, K = dV/dl, and equals the electric field in magnitude with opposite sign: E = -dV/dx or in vector form E = -∇V. The negative sign shows the field always points toward decreasing potential. Differentiating the standard potentials (point charge kQ/r, line charge -λ/2πε₀ ln r, plane sheet -σx/2ε₀) recovers the corresponding field expressions exactly. Practically, the potential gradient along a current-carrying wire equals Iρ/A and is the basis of resistivity measurement.",
  specialNotes: [
    "The relation E = -∇V holds only for electrostatic fields. In a time-varying magnetic field, the generalized relation is E = -∇V - dA/dt, so potential alone no longer determines the field (Faraday's law).",
    "Wherever the potential is constant, the potential gradient and hence the electric field are exactly zero. This is why the interior of a conductor in electrostatic equilibrium is field-free even though its potential is finite."
  ],
  importantStatements: [
    "Statement 1: The potential gradient is defined as the rate of change of potential with distance along a specified direction.",
    "Statement 2: The electric field at any point equals the negative of the potential gradient at that point (E = -dV/dx).",
    "Statement 3: The SI unit of potential gradient is volt per metre, which is dimensionally and numerically equal to newton per coulomb.",
    "Statement 4: The electric field always points in the direction of steepest decrease of electric potential.",
    "Statement 5: The potential gradient in a current-carrying conductor equals V/l, which is numerically equal to the electric field existing within that conductor."
  ],
  importantNotes: [
    "The gradient operator ∇V always points in the direction of maximum increase of V; the electric field is its negative, so E points toward maximum decrease."
  ],
  examShortTricks: [
    "Field recovery trick: differentiate the known V(r) and put a minus sign to obtain E(r). E.g. V = kQ/r gives E = kQ/r², and V = -(λ/2πε₀)ln r gives E = λ/(2πε₀r).",
    "Unit trick: 1 V/m = 1 (J/C)/m = 1 N/C = 1 (kg·m/s²)/C, so volt per metre and newton per coulomb are interchangeable.",
    "Resistivity shortcut: K = V/l = Iρ/A, so ρ = (V/l)(A/I)."
  ],
  examNotes: [
    "Deriving the electric field from a given potential function using the gradient, and the numerical determination of resistivity from the potential gradient of a wire, are standard NEB Class 11 examination items."
  ],
  mcs: [
    {
      question: "The SI unit of potential gradient is identical to:",
      options: [
        "J/C",
        "N/C",
        "V",
        "J/C²"
      ],
      answer: "B",
      explanation: "Potential gradient has units of V/m = (J/C)/m = J/(C·m). Since 1 J = 1 N·m, this reduces to N/C, which is exactly the unit of electric field intensity."
    },
    {
      question: "If the potential V = kQ/r, then the electric field obtained from the gradient relation is:",
      options: [
        "−kQ/r²",
        "kQ/r²",
        "2kQ/r",
        "kQ/r"
      ],
      answer: "B",
      explanation: "E = -dV/dr = -d(kQ/r)/dr = -(-kQ/r²) = kQ/r², recovering the standard inverse-square field, directed radially outward for a positive Q."
    },
    {
      question: "A wire of length 2 m has a potential drop of 4 V between its ends. The potential gradient and the electric field in the wire are:",
      options: [
        "2 V/m each",
        "2 V/m and 4 V/m respectively",
        "4 V/m and 2 V/m respectively",
        "8 V/m each"
      ],
      answer: "A",
      explanation: "K = V/l = 4/2 = 2 V/m. Since the potential gradient equals the electric field in the conductor, E = 2 V/m = 2 N/C."
    }
  ],
  importantConcepts: [
    "Definition and SI unit of potential gradient.",
    "Relation E = -∇V and the direction of the field.",
    "Differentiating standard potential functions to recover field expressions.",
    "Graphical slope interpretation of the V–r curve.",
    "Potential gradient in current-carrying conductors and resistivity measurement."
  ],
  importantTasks: [
    "Derive E = -dV/dx from the definition of potential.",
    "Recover standard field expressions by differentiating known potentials.",
    "Determine resistivity of a material from measured potential gradient."
  ],
  duplicateType: 1,
  visualType: "potential-gradient"
};
